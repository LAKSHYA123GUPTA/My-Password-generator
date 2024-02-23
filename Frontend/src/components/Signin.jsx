import { useNavigate } from "react-router-dom";
// import { useRecoilState} from "recoil";
// import { pass, user } from "../Atoms/UserAtom";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { browserPermit, browserPermitstore, firstCount, genAvail, pass, permit, remember, uname } from "../Atoms/UserAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Fabicon from "./FAB";
import CheckboxRemember from "./Checkbox";
import Alert from "./Alert";
import PermissionBanner from "./PermissionBanner";
import convert from "./convert";
import PasswordText from "./PasswordText";
export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const password = useRecoilValue(pass);
  const [count, setCount] = useState(0);
  const ref1 = useRef();
  const ref2 = useRef();
  const mess = useRef();
  const [message, setMessage] = useState();
  const [token, setToken] = useState({});
  const [salted, setSalt] = useState();
  const setUname = useSetRecoilState(uname);
  const [genavail, setGenAvail] = useRecoilState(genAvail);
  const setFirstCount = useSetRecoilState(firstCount);
  const [rememberme,setRemember] = useRecoilState(remember);
  const permited=useRecoilValue(permit);
  const browserpermit=useRecoilValue(browserPermitstore);
  const [browserAllow, setbrowserAllow] = useRecoilState(browserPermit);
  async function finalFetch(){
    try {
      if(salted){
        const converted= await convert(password,salted);
      const res = await fetch(
        "http://localhost:3000/user/signin",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            pass: converted,
            deviceId:deviceID,
            remember:rememberme

          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setMessage(data.msg);
      setToken({ finalToken: data.token });
      setSalt(undefined);
      setRemember(false);
      }
    } catch (error) {
      console.error("this is by signin:    "+error);
    }
  }
  useEffect(()=>{
    
    if(browserpermit===false)
    {
     return setbrowserAllow(true);
    }

  
  },[permited])
  useEffect(()=>{
    
   finalFetch();
  
  
  },[salted])
  const deviceID=browserpermit;
  setFirstCount((c) => c + 1);
  useEffect(() => {
    if (message) {
      console.log(message);
      return;
    }

    if (count !== 0) {
      setUname(username);
      setGenAvail((c) => c + 1);
      localStorage.setItem("tokendata", JSON.stringify(token));
      navigate("/generator");
    } else return setCount(count + 1);
  }, [token]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        margin: 0,
        backgroundImage: "linear-gradient(to left, #ccffaa, #ffe5ef)",
        padding: 0,
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        Welcome to our Signin page
      </Typography>
      <Card
        sx={{
          maxWidth: 345,
          backgroundImage: "linear-gradient(to top, #ccffaa, #ffe5ef)",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item sm={12}>
              <TextField
                inputRef={ref1}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2%",
                }}
                style={{ borderRadius: "5px" }}
                autoFocus
                autoComplete="off"
              />
              <PasswordText />
            </Grid>
            <CheckboxRemember />
            <Grid
              item
              sm={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant={"contained"}
                onClick={async () => {
                  if (username === "") {
                    // ref1.current.style.border = '2px solid red';

                    // ref1.current.setAttribute('autofocus', true);
                    ref1.current.setAttribute(
                      "placeholder",
                      "Missing Username!!"
                    );

                    ref1.current.setAttribute(
                      "style",
                      `border: solid red 2px; border-radius: 5px;`
                    );
                    setTimeout(() => {
                      // ref1.current.setAttribute("style","outlineColor:'red'")
                      ref1.current.focus();
                      ref1.current.setAttribute("style", " ");
                    }, 1000);

                    return;
                  }
                  if (password === "") {
                    ref2.current.setAttribute(
                      "placeholder",
                      "Missing Password !!"
                    );

                    ref2.current.setAttribute(
                      "style",
                      `border: solid red 2px; border-radius: 5px;`
                    );
                    setTimeout(() => {
                      // ref1.current.setAttribute("style","outlineColor:'red'")
                      ref2.current.focus();
                      ref2.current.setAttribute("style", "");
                    }, 1000);

                    return;
                  }
                  try {
                    const res = await fetch(
                      "http://localhost:3000/user/data",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          username: username,
                          

                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const data = await res.json();
                    if(data.msg)
                    setMessage(data.msg);
                    else
                    setSalt(data.salt);
                    
                    
                  } catch (error) {
                    console.error("This is by data:   "+error);
                  }
                  
                }}
              >
                Signin
              </Button>
            </Grid>
            <Typography ref={mess} style={{ color: "red" }} component="div">
              {message}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
      <div style={{ position: "fixed", bottom: "80px", right: "90px" }}>
        {genavail !== 0 ? <Fabicon /> : null}
      </div>
      {browserAllow? <Alert /> : null}
      {(permited===0)? <PermissionBanner /> : null}
    </div>
  );
}

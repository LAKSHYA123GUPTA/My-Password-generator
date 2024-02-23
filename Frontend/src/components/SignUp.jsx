import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { browserPermit, browserPermitstore, firstCount, genAvail, pass, permit, remember, uname, user } from "../Atoms/UserAtom";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Fabicon from "./FAB";
import Alert from "./Alert";
import PermissionBanner from "./PermissionBanner";
import CheckboxRemember from "./Checkbox";
import convert, { generateSalt } from "./convert";
import PasswordText from "./PasswordText";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(user);
  const [password, setPassword] = useRecoilState(pass);
  const ref1 = useRef();
  const ref2 = useRef();
  const mess = useRef();
  const [message, setMessage] = useState();
  const setUname = useSetRecoilState(uname);
  const setFirstCount = useSetRecoilState(firstCount);
  const [genavail, setGenAvail] = useRecoilState(genAvail);
  const [browserAllow, setbrowserAllow] = useRecoilState(browserPermit);
  const [token, setToken] = useState({});
  const permited=useRecoilValue(permit);
  const browserpermit=useRecoilValue(browserPermitstore);
  const rememberme = useRecoilValue(remember);


 
  useEffect(()=>{
    
    if(browserpermit===false)
    {
     return setbrowserAllow(true);
    }

  
  },[permited])
  
  const deviceID=browserpermit;
  setFirstCount((c) => c + 1);
  useEffect(() => {
    if (message === "Invalid inputs!!") {
      console.log(message);
      return;
    }
    if (
      message ===
      "User or the same username already exists!!, choose another username or try Signing in"
    ) {
      console.log(message);
      mess.current.innerHTML +=
        " " +
        `<a href="/signin" style="text-decoration:none color:blue">Sign in.</a>`;
      return;
    }

    if (message === "User created successfully") {
      //  console.log(message);

      setTimeout(() => {
        setUname(username);
        localStorage.setItem("tokendata", JSON.stringify(token));
        setGenAvail((c) => c + 1);
        navigate("/generator");
      }, 2000);
    }
  }, [message]);
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
        Welcome to our Signup page
      </Typography>
      <Card
        sx={{
          maxWidth: 345,
          backgroundImage: "linear-gradient(to bottom, #ccffaa, #ffe5ef)",
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
                    const salt= generateSalt();
                   const resulted =await convert(password,salt);
                    console.log("here is salt   "+salt);
                    console.log("here is password:    "+resulted);
                    const res = await fetch(
                      "http://localhost:3000/user/signup",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          username: username,
                          pass: resulted,
                          salt: salt,
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
                  } catch (error) {
                    console.error("here");
                  }
                }}
              >
                Signup
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

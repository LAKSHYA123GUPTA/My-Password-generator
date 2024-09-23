import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  browserPermit,
  browserPermitstore,
  firstCount,
  firstTimer,
  genAvail,
  pass,
  permit,
  remember,
  tabArray,
  tempToken,
  tokenData,
  uname,
} from "../atoms/UserAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Fabicon from "./FAB";
import CheckboxRemember from "./Checkbox";
import Alert from "./Alert";
import PermissionBanner from "./PermissionBanner";
import convert from "./convert";
import PasswordText from "./PasswordText";
import { SERVER_URL } from "../constants";
export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const password = useRecoilValue(pass);
  const ref1 = useRef();
  const ref2 = useRef();
  const mess = useRef();
  const [message, setMessage] = useState();
  const [token, setToken] = useRecoilState(tokenData);
  const [salted, setSalt] = useState();
  const setUname = useSetRecoilState(uname);
  const [genavail, setGenAvail] = useRecoilState(genAvail);
  const setFirstCount = useSetRecoilState(firstCount);
  const rememberme = useRecoilValue(remember);
  const permited = useRecoilValue(permit);
  const browserpermit = useRecoilValue(browserPermitstore);
  const [browserAllow, setbrowserAllow] = useRecoilState(browserPermit);
  const setArray = useSetRecoilState(tabArray);
  const [temptoken, setTempToken] = useRecoilState(tempToken);
  const [first, setFirst] = useRecoilState(firstTimer);

  const remove = "tempData";

  if (
    (localStorage.getItem(remove) !== null &&
      localStorage.getItem(remove) !== undefined) &&
    first === false
  ) {
    localStorage.removeItem(remove);
    setFirst(true);
  }
  async function finalFetch() {
    try {
      if (salted) {
        const converted = await convert(password, salted);
        const res = await fetch(SERVER_URL+"/user/signin", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            pass: converted,
            deviceId: deviceID,
            remember: rememberme,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setMessage(data.msg);
        if (rememberme === true) setToken({ finalToken: data.token });
        if (rememberme === false) setTempToken({ finalToken: data.token });
        setArray(data.array);
        setSalt(undefined);
        // setRemember(false);  ////////
        setFirstCount((c) => c + 1);
      }
      // return console.log("error here!!");
    } catch (error) {
      console.error("this is by signin:    " + error);
    }
  }
  useEffect(() => {
    if (browserpermit === false) {
      return setbrowserAllow(true);
    }
  }, [permited]);
  useEffect(() => {
    finalFetch();
  }, [salted]);
  const deviceID = browserpermit;
  // useEffect(() => {
  //   if (message) {
  //     console.log(message);
  //     return;
  //   }

  //   if (count !== 0) {
  //     setUname(username);
      
  //     if (rememberme === true)
  //       localStorage.setItem("tokendata", JSON.stringify(token));
  //     if (rememberme === false && (temptoken!==undefined &&temptoken!==null))
  //       localStorage.setItem("tempData", JSON.stringify(temptoken));
  //       setGenAvail((c) => c + 1);
  //     // navigate("/generator");
  //   } else return setCount(count + 1);
  // }, [token, temptoken]);
  useEffect(() => {
   
    if (message === "User signed in successfully") {
      
        setUname(username);
        if (rememberme === true)
          localStorage.setItem("tokendata", JSON.stringify(token));
        if (rememberme === false &&( temptoken!==undefined&& temptoken!==null))
          localStorage.setItem("tempData", JSON.stringify(temptoken));
        setGenAvail((c) => c + 1);
        navigate("/generator");
      
    }
  }, [message]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "92.8vh",
        margin: 0,
        backgroundImage:'url(/lock-key-best-password.png)',
        backgroundSize:'cover',
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
                    ref1.current.setAttribute(
                      "placeholder",
                      "Missing Username!!"
                    );

                    ref1.current.setAttribute(
                      "style",
                      `border: solid red 2px; border-radius: 5px;`
                    );
                    setTimeout(() => {
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
                      ref2.current.focus();
                      ref2.current.setAttribute("style", "");
                    }, 1000);

                    return;
                  }
                  try {
                    const res = await fetch(SERVER_URL+"/user/data", {
                      method: "POST",
                      body: JSON.stringify({
                        username: username,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    const data = await res.json();
                    if (data.msg) setMessage(data.msg);
                    else setSalt(data.salt);
                  } catch (error) {
                    console.error("This is by data:   " + error);
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
      {browserAllow ? <Alert /> : null}
      {permited === 0 ? <PermissionBanner /> : null}
    </div>
  );
}

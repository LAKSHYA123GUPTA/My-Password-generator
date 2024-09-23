import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, CardContent } from "@mui/material";
import { firstTimer, tempToken, uname } from "../atoms/UserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import CopyPass from "./Copypass";
import WarningComponent from "./WarningComponent";
export default function Generate() {
  const [token, setToken] = useState(false);
  const [size, setSize] = useState(4);
  const [sp, setSp] = useState(1);
  const [val, setVal] = useState("");
  const inp = useRef();
  const button = useRef();
  const [vai, setVai] = useState();
  const [m, setm] = useState(0);
  const [regen, setRegen] = useState(0);
  const pname = useRecoilValue(uname);
  const [showWarning, setShowWarning] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const temptoken = useRecoilValue(tempToken);
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
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function valueSize(value) {
    setTimeout(() => {
      setSize(value);
    }, 100);
  }
  function valueSp(value) {
    setTimeout(() => {
      setSp(value);
    }, 100);
  }
  const notify = () =>
    toast.info(`Welcome ${pname}`, {
      position: "bottom-left",
      autoClose: 1500,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      escapeHtml: false,
    });

  useEffect(() => {
    if (token) {
      
      func();
    }
  }, [token, regen]);
  useEffect(() => {
    if (pname) notify();
  }, []);
  
  async function func() {
    try {
      const res = await fetch("http://localhost:3000/user/password", {
        method: "POST",

        body: JSON.stringify({
          token: token,
          size: size,
          sp: sp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const passData = await res.json();
      setVal(passData.Generated_Password);
    } catch (error) {
      console.log("Error is taken  :    " + error);
    }
  }
  async function copy() {
    setVai(vai + 1);

    if (inp.current) {
      try {
        await navigator.clipboard.writeText(val);
        button.current.innerHTML = "Password copied!";

        setm(m + 1);
        setTimeout(() => {
          button.current.innerHTML = "Copy";
        }, 5000);
      } catch (error) {
        console.log("Failed to copy the text.    " + error);
      }
    } else console.log("not copied");
  }
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
      <Card
        sx={{
          maxWidth: 400,
          backgroundImage: "linear-gradient(to right, #ee8a65, #dad5ef)",
        }}
      >
        <CardContent>
          
          <FormControl sx={{ m: 1, width: "27ch" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: "#6666ff", zIndex: 0 }}
            >
              Generated Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={val}
              readOnly={true}
              autoFocus={val !== ""}
              ref={inp}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                "&:focus fieldset": {
                  borderColor: "#0000FF", 
                },
              }}
              label="Generated Password"
            />
          </FormControl>
          <br />
          <Button
            ref={button}
            variant="contained"
            onClick={() => {
              copy();
              setShowWarning(true);
            }}
            disabled={!val}
          >
            Copy
          </Button>

          <Box
            sx={{
              width: 300,
              margin: "20px",
              backgroundImage: "linear-gradient(to right, #aaaaff,#ffaaaa)",
              padding: "14px",
              paddingTop: 0,
              paddingBottom: 0,
              borderRadius: "5px",
            }}
          >
            <div>Length of Password(number of characters)</div>
            <Slider
              aria-label="Length of Password(number of characters)"
              defaultValue={4}
              getAriaValueText={valueSize}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={1}
              marks
              min={4}
              max={16}
              sx={{
                "& .MuiSlider-thumb": {
                  backgroundColor: "lightgreen", 
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: 300,
              margin: "20px",
              backgroundImage: "linear-gradient(to right, #eefa65, #ffaaaa)",
              padding: "14px",
              paddingTop: 0,
              paddingBottom: 0,
              borderRadius: "5px",
            }}
          >
            <div>Number of special characters to be included</div>
            <Slider
              aria-label="number of special characters to be included"
              defaultValue={0}
              getAriaValueText={valueSp}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={1}
              marks
              min={0}
              max={5}
              sx={{
                "& .MuiSlider-thumb": {
                  backgroundColor: "skyblue",
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              if (temptoken !== undefined&& temptoken!==null) {
                const data = localStorage.getItem("tempData");

                if (data) {
                  setToken(JSON.parse(data).finalToken);
                }
                setRegen(regen + 1);
                setShowWarning(false);
              } else {
                const data = localStorage.getItem("tokendata");

                if (data) {
                  setToken(JSON.parse(data).finalToken);
                }
                setRegen(regen + 1);
                setShowWarning(false);
              }
            }}
          >
            Generate Password
          </Button>
          
          {showWarning && <WarningComponent />}
        </CardContent>
      </Card>

      <div>{m > 0 ? <CopyPass /> : null}</div>
      <ToastContainer />
    </div>
  );
}

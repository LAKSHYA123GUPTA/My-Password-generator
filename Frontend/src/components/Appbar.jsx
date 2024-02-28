import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { genAvail, isOpen} from "../Atoms/UserAtom";
export default function Appbar() {
  const navigate = useNavigate();
  const setIsOpen = useSetRecoilState(isOpen);
  const genavail = useRecoilValue(genAvail);
  return (
    <div
      style={{
        backgroundColor: " #20c997",
        margin: "0px",
        padding: 0,
        width: "",
        height: "50px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "7px",
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
      >
        <div style={{ order: 0 }}>
          <Link to={"/Webos"} style={{ textDecoration: "none" }}>
            <Typography color={"green"} variant="h4">
              WebOS
            </Typography>
          </Link>
        </div>
        <div style={{ order: 1 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Landing
          </Button>
          &nbsp;
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
              setIsOpen(true);
            }}
          >
            Password Manager
          </Button>
          &nbsp;
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
          &nbsp;
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
          {genavail!==0? 
          <div style={{display:'inline-flex', paddingLeft:'4px'}}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/logout");
            }}
          >
            Logout
          </Button>
          </div>
          :null}
        </div>
      </div>
    </div>
  );
}

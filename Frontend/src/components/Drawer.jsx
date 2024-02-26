import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addOpen,
  isOpen,
  tabArray,
  tempToken,
  tokenData,
} from "../Atoms/UserAtom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Addpass from "./Addpass";
import Tabs from "./Tabs";
import { useEffect } from "react";
export default function DrawerCompo() {
  const [isopen, setIsOpen] = useRecoilState(isOpen);
  const setAddOpen = useSetRecoilState(addOpen);
  const Array = useRecoilValue(tabArray);
  const token = useRecoilValue(tokenData);
  const temptoken = useRecoilValue(tempToken);
  
  async function uploadingArray() {
    let finaldata;

    if (token && (temptoken === undefined || temptoken===null)) {
      // console.log(token.finalToken+"    from drawer.jsx");
      try {
        const res = await fetch("http://localhost:3000/user/manager", {
          method: "POST",
          body: JSON.stringify({
            token: token.finalToken,
            Array,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        finaldata = await res.json();
        console.log("in right condition from drawer.jsx"+Array);    ////////
      } catch (error) {
        return console.log(
          "Error in either res.json resolve or uploading /manager resolve:   from token" +
            error
        );
      }
      if (finaldata.msg === "Array inserted!!!") {
        return console.log("Array loaded! (/manager)");
      }
      if (finaldata.msg === "re-login, either token is expired or invalid") {
        return console.log(
          "re-login, something wrong happened in middle of passes uploading"
        );
      }

      if (finaldata.msg === "Array haven't inserted yet!!!") {
        return console.log(
          "it is taking longer than usual to upload array (/manager), there might be an error, on serverside"
        );
      }
      if (finaldata.msg === "Oops! serever down, can't upload user data!!!") {
        return console.log(
          "Please try later (/manager), i think server is down, can't fetch your passwords right now!!"
        );
      }
    }
    if (temptoken !== undefined && temptoken!==null) {
      try {
        const res = await fetch("http://localhost:3000/user/manager", {
          method: "POST",
          body: JSON.stringify({
            token: temptoken.finalToken,
            Array,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        finaldata = await res.json();
      } catch (error) {
        return console.log(
          "Error in either res.json resolve or uploading /manager resolve:   from temptoken" +
            error
        );
      }
      if (finaldata.msg === "Array inserted!!!") {
        return console.log("Array loaded! (/manager)");
      }
      if (finaldata.msg === "re-login, either token is expired or invalid") {
        return console.log(
          "re-login, something wrong happened in middle of passes uploading"
        );
      }

      if (finaldata.msg === "Array haven't inserted yet!!!") {
        return console.log(
          "it is taking longer than usual to upload array (/manager), there might be an error, on serverside"
        );
      }
      if (finaldata.msg === "Oops! serever down, can't upload user data!!!") {
        return console.log(
          "Please try later (/manager), i think server is down, can't fetch your passwords right now!!"
        );
      }
    }
  }
  useEffect(() => {
    if (Array.length !== 0) 
    { console.log("putme in");
      uploadingArray();}
  }, [Array]);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };
  const actions = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={"30px"}
          height={"30px"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      ),
      name: "Save new",
    },
    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       width={"30px"}
    //       height={"30px"}
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    //   name: "Delete",
    // },
  ];

  const list = (
    <div>
      <Box
        sx={{
          height: 320,
          width: 500,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
        role="presentation"
      >
        <Tabs />
      </Box>
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "400px",
          zIndex: "9999",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width={"25px"}
              height={"25px"}
              style={{ paddingTop: "4px", paddingLeft: "3.5px" }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm14.47 3.97a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L18 10.81V21a.75.75 0 0 1-1.5 0V10.81l-2.47 2.47a.75.75 0 1 1-1.06-1.06l3.75-3.75ZM2.25 9A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm0 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              sx={
                action.name !== "Delete"
                  ? { backgroundColor: "skyblue" }
                  : { backgroundColor: "lightpink" }
              }
              onClick={() => {
                setAddOpen(true);
                toggleDrawer(true);
              }}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
  return (
    <div>
      <Drawer anchor="left" open={isopen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      <Addpass />
    </div>
  );
}

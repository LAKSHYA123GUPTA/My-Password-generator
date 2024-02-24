import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  browserPermit,
  browserPermitstore,
  firstCount,
  firstTimer,
  genAvail,
  permit,
  tabArray,
  tokenData,
  uname,
} from "../Atoms/UserAtom";
import Fabicon from "./FAB";
import PermissionBanner from "./PermissionBanner";
import Alert from "./Alert";
import DrawerCompo from "./Drawer";
export default function Landing() {
  const [n, setn] = useState(0);
  const setUname = useSetRecoilState(uname);
  const setArray = useSetRecoilState(tabArray);
  const [FirstCount, setFirstCount] = useRecoilState(firstCount);
  const setData = useSetRecoilState(tokenData);
  const genavail = useRecoilValue(genAvail);
  const permited = useRecoilValue(permit);
  const browserpermit = useRecoilValue(browserPermitstore);
  const [browserAllow, setbrowserAllow] = useRecoilState(browserPermit);
  const [first, setFirst] = useRecoilState(firstTimer);

  const remove = "tempData";

  if (
    (localStorage.getItem(remove) !== null ||
      localStorage.getItem(remove) !== undefined) &&
    first === false
  ) {
    localStorage.removeItem(remove);
    setFirst(true);
  }
  useEffect(() => {
    if (browserpermit === false) {
      return setbrowserAllow(true);
    }
  }, [permited]);
  async function fetching(info) {
    const token = JSON.parse(info).finalToken;

    let finaldata;
    try {
      const res = await fetch("http://localhost:3000/user/auto", {
        method: "POST",
        body: JSON.stringify({
          token,
          deviceId: browserpermit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      finaldata = await res.json();
    } catch (error) {
      return console.log(
        "Error in either res.json resolve or fetching /auto resolve:   " + error
      );
    }
    if (finaldata.msg === "Allow auto-login") {
      setUname(finaldata.username);
      setArray(finaldata.array);
      setn(n + 2);

      return;
    }
    if (finaldata.msg === "re-login, either token is expired or invalid") {
      return console.log(
        "Please re-login /auto, either token expired or 'hello Hacker!!'"
      );
    }
    if (finaldata.msg === "re-login, nice try hacker") {
      return console.log("Please re-login /auto, nice try Hacker!!");
    }
    if (finaldata.msg === "Oops! serever down, can't fetch user data!!!") {
      return console.log("Please re-login /auto, I think server is down!!");
    }
    if (finaldata.msg === "Nice try hacker, quite good one") {
      return console.log("Nice try hacker, quite good one");
    }
    if (finaldata.msg === "DeviceId not reached") {
      return console.log("DeviceId not reached");
    }
    return console.log("Another error!");
  }

  useEffect(() => {
    if (FirstCount === 0 && permited === true) {
      const info = localStorage.getItem("tokendata");

      if (info) {
        setTimeout(() => {
          fetching(info);
          setData(info);
        }, 400);
      }
      setFirstCount((c) => c + 1);
      return;
    }
  }, [permited]);

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
      Hi Mommy on Landing page.
      <DrawerCompo />
      <div style={{ position: "fixed", bottom: "80px", right: "90px" }}>
        {genavail !== 0 ? <Fabicon /> : null}
      </div>
      {n > 0 && permited === true ? <Dialog /> : null}
      {browserAllow ? <Alert /> : null}
      {permited === 0 ? <PermissionBanner /> : null}
    </div>
  );
}

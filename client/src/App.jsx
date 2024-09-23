import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
const Landing = lazy(() => import("./components/Landing"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/SignUp"));
const Generate = lazy(() => import("./components/Generator"));
const Logout = lazy(() => import("./components/Logout"));

import { RecoilRoot } from "recoil";
import Appbar from "./components/Appbar";


function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          backgroundImage: "linear-gradient(to left, #ccffaa, #ffe5ef)",
          height: "100vh",
        }}
      >
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={"loading..."}>{<Landing />}</Suspense>
              }
            />

            <Route
              path="/signin"
              element={
                <Suspense fallback={"loading..."}>{<Signin />}</Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={"loading..."}>{<Signup />}</Suspense>
              }
            />
            <Route
              path="/generator"
              element={
                <Suspense fallback={"loading..."}>{<Generate />}</Suspense>
              }
            />
            <Route
              path="/logout"
              element={
                <Suspense fallback={"loading..."}>{<Logout />}</Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;

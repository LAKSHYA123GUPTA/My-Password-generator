import { Suspense, lazy } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
const Landing = lazy(() => import("./components/Landing"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/SignUp"));
const Generate = lazy(() => import("./components/Generator"));

import { RecoilRoot } from "recoil";
import Appbar from "./components/Appbar";

// import { ChakraProvider } from '@chakra-ui/react'
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
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
    
  );
}

export default App;

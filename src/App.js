import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentSignup from "./StudentSignup.js";
import CompanySignup from "./CompanySignup.js";
import "./App.css";
import Routes from "./Routes";
import Company_Home from "./Company/Company_Home";
import Authentication from "./Authentication.js";
import Landing from "./Landing.js"

function App() {
  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;

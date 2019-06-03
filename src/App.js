import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentSignup from "./StudentSignup.js";
import CompanySignup from "./CompanySignup.js";

function App() {
  return (
    <div className="App">
      <StudentSignup />
      {/* <CompanySignup /> */}
    </div>
  );
}

export default App;

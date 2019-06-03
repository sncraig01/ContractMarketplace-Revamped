import React from "react";
import "./App.css";
import Routes from "./Routes";
import Company_Home from "./Company/Company_Home";
import Authentication from "./Authentication.js"

function App() {
  return (
    <div className="App">
      <Routes />
      <Authentication/>
    </div>
  );
}

export default App;

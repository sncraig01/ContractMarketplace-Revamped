import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import "./Admin_ManageContracts.css";
import Admin_NavBar from "./Admin_NavBar";

class Admin_ManageContracts extends React.Component {
  render() {
    return (
      <div className="Admin-contracts-whole">
        <Admin_NavBar title={"Manage Contracts"} />
      </div>
    );
  }
}

export default Admin_ManageContracts;

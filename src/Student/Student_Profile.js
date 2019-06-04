import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import "./Admin_ManageContracts.css";
import Student_NavBar from "./Student_NavBar";

class Student_Profile extends React.Component {
  render() {
    return (
      <div className="Admin-contracts-whole">
        <Student_NavBar title={"My Profile"} />
      </div>
    );
  }
}

export default Student_Profile;

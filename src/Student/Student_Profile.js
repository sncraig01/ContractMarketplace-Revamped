import React from "react";
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

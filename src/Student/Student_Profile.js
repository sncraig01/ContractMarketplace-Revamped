import React from "react";
import StudentNavBar from "./Student_NavBar";

class Student_Profile extends React.Component {
  render() {
    return (
      <div className="Admin-contracts-whole">
        <StudentNavBar title={"My Profile"} />
      </div>
    );
  }
}

export default Student_Profile;

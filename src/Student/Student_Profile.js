import React from "react";
import StudentNavBar from "./Student_NavBar";

class Student_Profile extends React.Component {
  render() {
    return (
      <div className="Admin-contracts-whole">
        <StudentNavBar history={this.props.history} />
      </div>
    );
  }
}

export default Student_Profile;

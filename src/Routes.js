import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Company_Home from "./Company/Company_Home";
import New_Contract from "./Company/New_Contract";
import Company_Profile from "./Company/Company_Profile.js";
import Student_Home from "./Student/Student_Home";

let mountNode = document.getElementById("root");

class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // loggedIn: false,
      // registered: false
    };
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Student_Home} />

        <Route path="/companyhome" component={Company_Home} />

        <Route path="/newcontract" component={New_Contract} />

        <Route path="/companyprofile" component={Company_Profile} />
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, mountNode);
export default Routes;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Company_Home from "./Company/Company_Home";
import New_Contract from "./Company/New_Contract";
import Company_Profile from "./Company/Company_Profile.js";
import Student_Home from "./Student/Student_Home";
import Landing from "./Landing.js"
import Authentication from "./Authentication.js"
import StudentSignup from "./StudentSignup.js"
import CompanySignup from "./CompanySignup.js"
import Company_Marketplace from "./Company/Company_Marketplace"
import Admin_Home from "./Admin/Admin_Home"
import Admin_Manage from "./Admin/Admin_Manage"
import Admin_Profile from "./Admin/Admin_Profile"

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
        <Route exact path="/" component={Landing} />

        <Route path="/signin" component={Authentication} />
        <Route path="/signupstudent" component={StudentSignup} />
        <Route path="/signupcompany" component={CompanySignup} />

        {/* Admin Routes */}
        <Route path="/adminhome" component={Admin_Home} />
        <Route path="/adminmanage" component={Admin_Manage} />
        <Route path="/adminprofile" component={Admin_Profile} />

        {/* Company Routes */}
        <Route path="/companyhome" component={Company_Home} />
        <Route path="/companymarketplace" component={Company_Marketplace} />
        <Route path="/newcontract" component={New_Contract} />
        <Route path="/companyprofile" component={Company_Profile} />

        {/* Student Routes */}
        <Route path="/studenthome" component={Student_Home} />

      </Router>
    );
  }
}

ReactDOM.render(<Routes />, mountNode);
export default Routes;

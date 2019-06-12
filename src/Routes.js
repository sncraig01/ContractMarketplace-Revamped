import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Company_Home from "./Company/Company_Home";
import New_Contract from "./Company/New_Contract";
import Student_Home from "./Student/Student_Home";
import Landing from "./Landing.js";
import Authentication from "./Authentication.js";
import StudentSignup from "./StudentSignup.js";
import CompanySignup from "./CompanySignup.js";
import Marketplace from "./Student/Marketplace";
import Submit_Bid from "./Student/Submit_Bid";
import Company_SearchStudents from "./Company/Company_SearchStudents";
import Admin_Home from "./Admin/Admin_Home";
import Admin_ManageContracts from "./Admin/Admin_ManageContracts";
import Admin_ManageUsers from "./Admin/Admin_ManageUsers";
import Student_Profile from "./Student/Student_Profile";
import Company_ViewBids from "./Company/Company_ViewBids.js";
import Student_EditProfile from "./Student/Student_EditProfile";

let mountNode = document.getElementById("root");

class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Landing} />

        <Route path="/signin" component={Authentication} />
        <Route path="/signupstudent" component={StudentSignup} />
        <Route path="/signupcompany" component={CompanySignup} />

        {/* Admin Routes */}
        <Route path="/admindashboard" component={Admin_Home} />
        <Route path="/managecontracts" component={Admin_ManageContracts} />
        <Route path="/manageusers" component={Admin_ManageUsers} />

        {/* Company Routes */}
        <Route path="/companydashboard" component={Company_Home} />
        <Route path="/searchstudents" component={Company_SearchStudents} />
        <Route path="/newcontract" component={New_Contract} />
        <Route path="/viewbids" component={Company_ViewBids} />

        {/* Student Routes */}
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/submitbid" component={Submit_Bid} />
        <Route path="/studentdashboard" component={Student_Home} />
        <Route path="/studentprofile" component={Student_Profile} />
        <Route path="/editstudentprofile" component={Student_EditProfile} />
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, mountNode);
export default Routes;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CompanyHome from "./Company/Company_Home";
import NewContract from "./Company/New_Contract";
import StudentHome from "./Student/Student_Home";
import Landing from "./Landing.js";
import Authentication from "./Authentication.js";
import StudentSignup from "./StudentSignup.js";
import CompanySignup from "./CompanySignup.js";
import Marketplace from "./Student/Marketplace";
import SubmitBid from "./Student/Submit_Bid";
import StudentSearchStudents from "./Student/Student_SearchStudents";
import AdminHome from "./Admin/Admin_Home";
import AdminManageContracts from "./Admin/Admin_ManageContracts";
import AdminManageUsers from "./Admin/Admin_ManageUsers";
import StudentProfile from "./Student/Student_Profile";
import CompanyViewBids from "./Company/Company_ViewBids.js";
import StudentEditProfile from "./Student/Student_EditProfile";
import RevTekHome from "./RevTekHome";

class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={RevTekHome} />
        <Route exact path="/SignUp" component={Landing} />
        <Route path="/signin" component={Authentication} />
        <Route path="/signupstudent" component={StudentSignup} />
        <Route path="/signupcompany" component={CompanySignup} />

        {/* Admin Routes */}
        <Route path="/admindashboard" component={AdminHome} />
        <Route path="/managecontracts" component={AdminManageContracts} />
        <Route path="/manageusers" component={AdminManageUsers} />

        {/* Company Routes */}
        <Route path="/companydashboard" component={CompanyHome} />
        <Route path="/studentcommunity" component={StudentSearchStudents} />
        <Route path="/newcontract" component={NewContract} />
        <Route path="/viewbids" component={CompanyViewBids} />

        {/* Student Routes */}
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/submitbid" component={SubmitBid} />
        <Route path="/studentdashboard" component={StudentHome} />
        <Route path="/studentprofile" component={StudentProfile} />
        <Route path="/editstudentprofile" component={StudentEditProfile} />
      </Router>
    );
  }
}
export default Routes;

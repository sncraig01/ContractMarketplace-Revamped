import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Admin_Home.css";
import Admin_NavBar from "./Admin_NavBar";

class Admin_Home extends React.Component {
  render() {
    return (
      <div className="Admin-dash-whole">
        <Admin_NavBar title={"Dashboard"} />
        <div className="Admin-Cards">
          <Card className="Admin-header">
            <div>
              <b>Profile:</b>
            </div>
            <CardContent className="Admin-Content">
              Welcome Admin:
              <div />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Admin_Home;

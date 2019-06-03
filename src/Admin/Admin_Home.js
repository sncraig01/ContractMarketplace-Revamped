import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "./Admin_Home.css";
import Admin_NavBar from "./Admin_NavBar";

class Admin_Home extends React.Component {
  render() {
    return (
      <div className="Admin-whole">
        <Admin_NavBar title={"Home"} />
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

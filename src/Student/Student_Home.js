import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Student_NavBar from "./Student_NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import "./Student_Home.css";

class Student_Home extends React.Component {

  goToMarketplace = () => {
    // from stackoverflow: this.props.router.push
    this.props.history.push({
      pathname: "/marketplace",
      state: {
        id: 7,
        color: "green"
      }
    });
  };

  
  render() {
    return (
      <div className="Student-whole">
        <Student_NavBar title={"Dashboard"} />
        <div className="Student-Card-Holder">
          <div className="State-Cards">
            <List>
              {/** Implemented a scrollbar */}
              <Card
                className="Student-studentholder"
                style={{ maxHeight: 40, overflow: "auto" }}
              >
                <div>
                  <b>Profile:</b>
                  <Divider />
                </div>
                <div className="Student-Searchbarholder" />
                <CardContent />
              </Card>
            </List>
          </div>
          <div className="Student-Cards">
            {/** Implemented a scrollbar */}
            <Card
              className="Student-contactholder"
              style={{ maxHeight: 200, overflow: "auto" }}
            >
              <div>
                <b>Current Bids:</b>
                <Divider />
              </div>
              <div className="Student-Searchbarholder">
                <SearchIcon />
                <InputBase placeholder="Search Bids" />
              </div>
              <CardContent />
            </Card>
          </div>
        </div>
        <button onClick={() => this.goToMarketplace()}>
          Go To Marketplace
        </button>

      </div>
    );
  }
}

export default Student_Home;

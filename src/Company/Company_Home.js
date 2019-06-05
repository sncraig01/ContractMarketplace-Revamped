import React from "react";
import Company_NavBar from "./Company_NavBar";
import firebase from "../firebase.js";
import List from "@material-ui/core/List";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

class Company_Home extends React.Component {
  state = {
    companyName: "",
    email: ""
  };

  componentDidMount() {
    //find the user and save the information
    let curEmail = "";
    var user = firebase.auth().currentUser;
    if (user !== null) {
      curEmail = user.email; // save the email we are looking for

      const usersRef = firebase.database().ref("users"); //reference to the database "users" key

      usersRef.on("value", snapshot => {
        //console.log( snapshot.val() )

        let info = [];
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          if (item.email === curEmail) {
            //if we've found the right folder
            info.push(item.name);
            info.push(item.email);
          }
        });
        this.setState({ companyName: info[0], email: info[1] });
      });
    } else {
      console.log("user not set up");
    }
  }

  routeNewContract = () => {
    this.props.history.push("/newcontract");
  };

  render() {
    return (
      <div className="App">
        <Company_NavBar title={"Home"} />
        <h1> {this.state.companyName} </h1>
        <div> {this.state.email} </div>
        <button onClick={() => this.routeNewContract()}>
          {" "}
          add new contract{" "}
        </button>
        <List>
          <Card style={{ maxHeight: 60, maxWidth: 400, overflow: "auto" }}>
            <div>
              <b>Your Contracts in Progress:</b>
              <Divider />
            </div>
            <CardContent />
          </Card>
        </List>

        <List>
          <Card style={{ maxHeight: 60, maxWidth: 400, overflow: "auto" }}>
            <div>
              <b>Pending Contracts:</b>
              <Divider />
            </div>
            <div>
              <SearchIcon />
              <InputBase placeholder="Search Bids" />
            </div>
            <CardContent />
          </Card>
        </List>
      </div>
    );
  }
}

export default Company_Home;

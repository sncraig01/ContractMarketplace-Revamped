import React from "react";
import List from "@material-ui/core/List";
import CardContent from "@material-ui/core/CardContent";
import StudentNavBar from "./Student_NavBar";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import firebase from "../firebase.js";
import "./Student_Home.css";
import { Button } from "@material-ui/core";

class StudentHome extends React.Component {
  state = {
    student_email: "",
    student_name: "",
    skill_arr: [],
    contract_arr: [],
    bid_arr: [],
    assigned_search: "",
    bid_search: ""
  };

  componentDidMount = () => {
    //Finds the users email through Firebase authentication
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user is signed in");
        console.log(user.email);
        this.setState({ student_email: user.email });
        //let uid=currentUser[user].uid;
        //console.log(uid);
        //let data = this.getData(currentUser);
      } else {
        // No user is signed in.
        console.log("Invalid Username or Password");
      }
    });

    //Finds the matching Name and Listed skills from Firebase
    const userRef = firebase.database().ref("users"); // access all users
    userRef.on("value", snapshot => {
      let users = snapshot.val();
      for (let itr in users) {
        if (this.state.student_email === users[itr].email) {
          // check for a user with a matching email
          this.setState({ student_name: users[itr].name });
          break;
        }
      }
    });

    ///Finds all of the contractsS

    this.getSkills();
  };

  getSkills() {
    let temp = this.state.student_email;
    let temp_arr = [];
    //Finds the matching Name and Listed skills from Firebase
    this.setState({ skill_arr: [] });
    const userRef = firebase.database().ref("users"); // access all users
    userRef.on("value", snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        console.log("ITEM: " + item.email);
        if (temp === item.email) {
          // check for a user with a matching email
          if (item.skills !== undefined) {
            for (let itr2 in item.skills) {
              temp_arr.push(item.skills[itr2]);
            }
          }
        }
      });
      this.setState({ skill_arr: temp_arr });
    });
  }

  getContracts() {
    let temp = this.state.student_email;
    let temp_contract = [];
    //Finds the matching Name and Listed skills from Firebase
    const referenceUsers = firebase.database().ref("users"); // access all users
    referenceUsers.on("value", snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        console.log("ITEM: " + item.email);
        if (temp === item.email) {
          // check for a user with a matching email
          //Iterates through all of the items in the user
          if (item.bids !== undefined) {
            console.log("bids in contracts is not undefined");
            for (let itr in item.bids) {
              if (item.bids[itr].Accepted === true) {
                console.log("BIDS" + item.bids[itr].Company);
                temp_contract.push(item.bids[itr]);
              }
            }
          }
        }
      });
      this.setState({ contract_arr: temp_contract });
    });
  }

  getBids() {
    let temp = this.state.student_email;
    let temp_bid = [];
    //Finds the matching Name and Listed skills from Firebase
    const referenceUsers = firebase.database().ref("users"); // access all users
    referenceUsers.on("value", snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        console.log("ITEM: " + item.email);
        if (temp === item.email) {
          // check for a user with a matching email
          //Iterates through all of the items in the user
          if (item.bids !== undefined) {
            console.log("bids in bids is not undefined");
            for (let itr in item.bids) {
              console.log(itr + " in bids");
              console.log("status: " + item.bids[itr].Accepted);
              if (item.bids[itr].Accepted === false) {
                console.log("BIDS" + item.bids[itr].Company);
                temp_bid.push(item.bids[itr]);
              }
            }
          }
        }
      });

      this.setState({ bid_arr: temp_bid });
    });
  }

  //Updates the state of assigned search
  updatingAssignedSearch = assigned_search => {
    this.setState({ assigned_search });
    console.log(assigned_search);
  };

  //Updates the state of bid search
  updatingBidSearch = bid_search => {
    this.setState({ bid_search });
    console.log(bid_search);
  };

  //Routes to edit profile when clicked
  editProfileClicked = e => {
    // Redirects to marketplace page
    return (window.location = "/editstudentprofile");
  };

  //The render method
  render() {
    return (
      <div className="Student-whole">
        <StudentNavBar title={"Dashboard"} />

        <div className="Student-Profile">
          <List>
            {/** Implemented a scrollbar */}
            <Card
              className="Student-studentholder"
              style={{ maxHeight: 300, overflow: "auto" }}
            >
              <div>
                <b>Profile:</b>
                <Divider />
              </div>
              <CardContent>
                <div>
                  <b> Name:</b> {this.state.student_name}
                </div>
                <div>
                  <b>Email:</b> {this.state.student_email}
                </div>
                <div>
                  <b>Listed Skills:</b>
                  <Button onClick={() => this.getSkills()}>Show Skills</Button>
                  {this.state.skill_arr.map(itr => itr + ", ")}
                </div>
                <div>
                  <Button onClick={() => this.editProfileClicked()}>
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </List>
        </div>
        <div className="Student-ContractBids">
          {/** Implemented a scrollbar */}
          <Card
            className="Student-contractholder"
            style={{ maxHeight: 200, overflow: "auto" }}
          >
            <div>
              <b>Current Contracts Assigned:</b>
              <Divider />
            </div>
            <div className="Student-Searchbarholder">
              <SearchIcon />
              <InputBase
                placeholder="Search Contracts Assigned"
                onChange={e => {
                  this.updatingAssignedSearch(e.target.value);
                }}
              />
            </div>
            <CardContent>
              <Button onClick={() => this.getContracts()}>
                Show Contracts
              </Button>
              {this.state.contract_arr.map(itr => {
                return itr.Company.includes(this.state.assigned_search) ||
                  itr.Contract.includes(this.state.assigned_search) ||
                  itr.Cost.includes(this.state.assigned_search) ||
                  itr.Details.includes(this.state.assigned_search) ||
                  itr.Hours.includes(this.state.assigned_search) ||
                  itr.Info.includes(this.state.assigned_search) ||
                  itr.Rate.includes(this.state.assigned_search) ||
                  itr.sCompany.includes(this.state.assigned_search) ? (
                  <div>
                    <div> Company: {itr.Company} </div>
                    <div> Contract: {itr.Contract} </div>
                    <div> Cost: {itr.Cost} </div>
                    <div> Hours: {itr.Hours} </div>
                    <div> ------------------ </div>
                  </div>
                ) : (
                  <div />
                );
              })}
            </CardContent>
          </Card>
          <Card
            className="Student-bidholder"
            style={{ maxHeight: 200, overflow: "auto" }}
          >
            <div>
              <b>Current Bids:</b>
              <Divider />
            </div>
            <div className="Student-Searchbarholder">
              <SearchIcon />
              <InputBase
                placeholder="Search Bids"
                onChange={e => {
                  this.updatingBidSearch(e.target.value);
                }}
              />
            </div>
            <CardContent>
              <Button onClick={() => this.getBids()}>Show Bids</Button>

              {this.state.bid_arr.map(itr2 => {
                return itr2.Company.includes(this.state.bid_search) ||
                  itr2.Contract.includes(this.state.bid_search) ||
                  itr2.Cost.toString().includes(this.state.bid_search) ||
                  itr2.Details.includes(this.state.bid_search) ||
                  itr2.Hours.toString().includes(this.state.bid_search) ||
                  itr2.Info.includes(this.state.bid_search) ||
                  itr2.Rate.includes(this.state.bid_search) ||
                  itr2.Company.includes(this.state.bid_search) ? (
                  <div>
                    <div> Company: {itr2.Company} </div>
                    <div> Contract: {itr2.Contract} </div>
                    <div> Cost: {itr2.Cost} </div>
                    <div> Hours: {itr2.Hours} </div>
                    <div> ------------------ </div>
                  </div>
                ) : (
                  <div> </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default StudentHome;

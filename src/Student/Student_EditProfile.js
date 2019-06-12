import React from "react";
import List from "@material-ui/core/List";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase.js";
import "./Student_EditProfile.css";
import StudentNavBar from "./Student_NavBar";

class StudentEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_email: "",
      student_name: "",
      skill: "",
      skill_arr: [],
      bio: ""
    };
  }

  componentDidMount() {
    //Finds the users email through Firebase authentication
    console.log(" component did mount");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user is signed in");
        console.log(user.email);
        this.setState({ student_email: user.email });
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

    this.getBio();
  }

  //Gets Skills from firebase
  getSkills() {
    console.log("getting Skills");
    let temp = this.state.student_email;
    let temp_arr = this.state.skill_arr;
    //Finds the matching Name and Listed skills from Firebase
    this.setState({skill_arr: []});
    const skillUserRef = firebase.database().ref("users"); // access all users
    skillUserRef.on("value", snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        console.log("ITEM: " + item.email);
        if (temp === item.email) {
          // check for a user with a matching email
          if (item.skills !== undefined) {
            console.log("Skills is not undefined");
            //     temp_arr.forEach(function(childTemp){
            //     var itr2 = childTemp.val();
            //     console.log("Value of itr2: " + itr2)

            // })

            for (let skill_itr in item.skills) {
              temp_arr.push(item.skills[skill_itr]);
            }
          }
        }
      });
      this.setState({ skill_arr: temp_arr });
    });
  }

  //Gets bio from firebase
  getBio() {
    //Finds the matching Name and Listed skills from Firebase
    const userObj = firebase.database().ref("users"); // access all users
    userObj.on("value", snapshot => {
      let users_snap = snapshot.val();
      for (let itr in users_snap) {
        if (this.state.student_email === users_snap[itr].email) {
          // check for a user with a matching email
          if (users_snap[itr].bio !== undefined) {
            for (let itr3 in users_snap[itr].bio) {
              this.setState({ bio: users_snap[itr].bio[itr3] });
            }
          }
          break;
        }
      }
    });
  }

  //Adds skill to the users profile in firebase
  addSkill() {
    console.log("adding skill");
    this.state.skill_arr.push(this.state.skill);
    this.updateFirebase();
    this.getSkills();
  }

  //Adds a new skill to firebase
  updateFirebase = () => {
    let currentUser = firebase.auth().currentUser;
    console.log(currentUser);
    console.log(currentUser.email);
    const email_id = currentUser.email;
    console.log(this.state.activity);

    var usersRef = firebase.database().ref("/users");
    console.log(usersRef);
    let userID = "";
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      console.log(users);
      for (let user in users) {
        if (email_id === users[user].email) {
          console.log(user);
        }
      }
    });
    var logRef = firebase.database().ref(`/users/${userID}/skills/`);
    console.log(logRef);
    logRef.push(this.state.skill);
  };

  //Removes Skill from firebase and the list
  removeSkill(delete_skill) {
    const userRef = firebase.database().ref("users"); // access all users
    userRef.on("value", snapshot => {
      let users = snapshot.val();
      // let keys = snapshot.key();
      for (let itr in users) {
        if (this.state.student_email === users[itr].email) {
          // check for a user with a matching email
          for (let itr2 in users[itr].skills) {
            if (users[itr].skills[itr2] === delete_skill) {
              console.log("The key for " + delete_skill);
              console.log(itr2);
              firebase
                .database()
                .ref("users")
                .child(itr)
                .child("skills")
                .child(itr2)
                .remove();
            }
          }
          this.getSkills();
          break;
        }
      }
    });
  }

  //Updates the state of skill everytime the add skill input box changes
  updatingSkill = skill => {
    this.setState({ skill });
  };

  saveBio(e) {
    //e.preventDefault()
    console.log("adding bio");
    let Bio_currentUser = firebase.auth().currentUser;
    console.log(Bio_currentUser);
    console.log(Bio_currentUser.email);
    const email_id = Bio_currentUser.email;
    console.log(this.state.activity);

    var Bio_usersRef = firebase.database().ref("/users");
    console.log(Bio_usersRef);
    let userID = "";
    Bio_usersRef.on("value", snapshot => {
      let Bio_users = snapshot.val();
      console.log(Bio_users);
      for (let Bio_user in Bio_users) {
        if (email_id === Bio_users[Bio_user].email) {
          console.log(Bio_user);
          userID = Bio_user;
        }
      }
    });
    var Bio_logRef = firebase.database().ref(`/users/${userID}/bio/`);
    console.log(Bio_logRef);
    Bio_logRef.push(this.state.bio);
  }

  handleChange(event) {
    this.setState({ bio: event.target.value });
  }

  displaySkills() {
    return this.state.skill_arr.map(itr => (
      <div>
        {itr}
        <Button onClick={() => this.removeSkill(itr)}>Delete</Button>
      </div>
    ));
  }

  render() {
    return (
      <div className="StudentEdit-whole">
        <StudentNavBar title={"Dashboard"} />

        <div className="StudentEdit-Profile">
          <List>
            {/** Implemented a scrollbar */}
            <Card
              className="StudentEdit-studentholder"
              style={{ maxHeight: 300, overflow: "auto" }}
            >
              <div>
                <b>EDIT PROFILE Profile:</b>
                <Divider />
              </div>
              <CardContent>
                <div>
                  <b> Name:</b> {this.state.student_name}
                </div>
                <div>
                  <b>Email:</b> {this.state.student_email}
                </div>
              </CardContent>
            </Card>
          </List>
        </div>
        <div className="StudentEdit-ContractBids">
          {/** Implemented a scrollbar */}
          <Card
            className="StudentEdit-contractholder"
            style={{ maxHeight: 200, overflow: "auto" }}
          >
            <div>
              <b>Add/Remove Skills</b>
              <Divider />
            </div>
            <div className="StudentEdit-Searchbarholder">
              <SearchIcon />
              <InputBase
                placeholder="Add Skill"
                onChange={skill => {
                  this.updatingSkill(skill.target.value);
                }}
              />
              <Button onClick={() => this.addSkill()}>Add</Button>
            </div>
            <CardContent>{this.displaySkills()}</CardContent>
          </Card>
          <Card
            className="StudentEdit-bidholder"
            style={{ maxHeight: 200, overflow: "auto" }}
          >
            <div>
              <b>Bio:</b>
              <Divider />
            </div>
            <div className="StudentEdit-Searchbarholder">
              <div />
            </div>
            <CardContent className="StudentEdit-bidholder">
              <TextField
                id="outlined-multiline-flexible"
                label="Current Bio"
                multiline
                rows="24"
                value={this.state.bio}
                onChange={e => this.handleChange(e)}
                //className={classes.textField}
                margin="normal"
                helperText="Be sure to save your edits"
                variant="outlined"
                width="100"
              />
              <Button onClick={e => this.saveBio(e)}>Save</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default StudentEditProfile;

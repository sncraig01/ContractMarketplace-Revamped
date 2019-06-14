import React from "react";
import CompanyNavBar from "./Company_NavBar.js";
import "./Company.css";
import firebase from "../firebase.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class CompanyViewBids extends React.Component {
  state = {
    company_name: "",
    contract_name: "",
    contract_details: "",
    bids: [],
    student_name: "",
    notification: ""
  };

  async componentDidMount() {
    document.title = "RevTek";
    let curEmail = "";
    var user = firebase.auth().currentUser;
    if (user !== null) {
      curEmail = user.email; // save the email we are looking for
      console.log(curEmail);
      let company_name = this.props.location.state.company_name;
      let contract_name = this.props.location.state.contract_name;
      //reference to the database "contracts" key, the specific company, and the specific contract
      const contractsRef = firebase
        .database()
        .ref("contracts/" + company_name + "/" + contract_name + "/bids");
      // HANDLE WHAT HAPPENS IF THERE ARE NO BIDS YET, BECAUSE THIS REF WOULD BE INVALID

      let bidsArr = []; //we will fill this array with all the bids
      let companyName = "";
      let contractName = "";
      let contractDetails = "";
      const waiter = await contractsRef.on("value", snapshot => {
        console.log(snapshot.val());
        if (snapshot.val() === null) {
          //add some kind of notification that there are no bids yet
          this.setState({
            notification: "There are no bids for this contract yet"
          });
        } else {
          this.setState({ notification: "" });
          snapshot.forEach(function(childSnapshot) {
            var bid = childSnapshot.val();
            console.log(bid);
            companyName = bid.Company;
            contractName = bid.Contract;
            contractDetails = bid.Details;
            let item = {
              cost: bid.Cost,
              hours: bid.Hours,
              studentInfo: bid.Info,
              rate: bid.Rate,
              student: bid.Student, 
              student_name: "Student Name", 
            };
            bidsArr.push(item);
          });

          //set all the info
            this.setState({
            bids: bidsArr,
            company_name: companyName,
            contract_name: contractName,
            contract_details: contractDetails
          })
        }
      });
    } else {
      console.log("did not get the user info ");
    }

    const userRef = firebase.database().ref("users"); // access all users
    userRef.on("value", snapshot => {
      console.log("enter snapshot")
      let temp_arr = this.state.bids;
      // let users = snapshot.val();
      // console.log("users" + users)
      snapshot.forEach(function(users)
      {
        console.log(users.val().name)
        console.log("Users emails" + users.val().email)
        console.log("Bids array: " + temp_arr)
        for(let itr in temp_arr)
        {

          console.log("bids arr " + temp_arr[itr].student_name);
          if(users.val().email == temp_arr[itr].student)
          {
            console.log("emails are equal")
            temp_arr[itr].student_name = users.val().name; 
          }
        }
      
      })
      this.setState({bids : temp_arr})



      // for(let itr1 in this.state.bidsArr)
      // {
      //   console.log("in itr1")
      //   console.log("User email from ids" + this.state.bidsArr[itr1].student); 
      //   for (let itr in users) 
      //   {
      //     console.log("User email from users: " + users[itr].email) ; 
      //     console.log("User email from ids" + this.state.bidsArr[itr1].student); 
      //     if (this.state.bidsArr[itr1].student === users[itr].email)
      //     {
      //       // check for a user with a matching email
      //       this.state.bidsArr[itr1].student_name = users[itr].name; 
      //     }
      //   }
      // }
    });

  }

  acceptBidClicked = (cost, student, student_info) => {
    //change "Accepted" to "true" for the actual bid in firebase in the Contracts folder
    let refString =
      "contracts/" +
      this.state.company_name +
      "/" +
      this.state.contract_name +
      "/bids";
    const bidsRef = firebase.database().ref(refString);
    bidsRef.on("value", snapshot => {
      //console.log( snapshot.val() )
      snapshot.forEach(function(childSnapshot) {
        var bid = childSnapshot.val();
        if (
          bid.Cost === cost &&
          bid.Student === student &&
          bid.Info === student_info
        ) {
          let curKey = childSnapshot.key;
          //update the "Accepted" field
          //UPDATE
          firebase
            .database()
            .ref(refString + "/" + curKey + "/Accepted")
            .set(true);
          console.log("updated!");
        }
      });
    });

    //change "available" to "false" for the actual contract in firebase && set the email for the student assigned to it
    let refString2 =
      "contracts/" + this.state.company_name + "/" + this.state.contract_name;
    const contractsRef = firebase.database().ref(refString2);
    contractsRef.on("value", snapshot => {
      //console.log( snapshot.val() )
      let count = 1; //use this variable to only access the FIRST thing
      snapshot.forEach(function(childSnapshot) {
        if (count === 1) {
          //UPDATE
          firebase
            .database()
            .ref(refString2 + "/" + childSnapshot.key + "/available")
            .set(false); //mark it not available
          firebase
            .database()
            .ref(refString2 + "/" + childSnapshot.key + "/assignedTo")
            .set(student);
        }
        count++;
      });
    });

    let name = this.state.contract_name;
    let details = this.state.contract_details;

    //change "Accepted" to "true" for the bid in the users folder
    let usersRef = firebase.database().ref("users/");
    usersRef.on("value", snapshot => {
      //console.log( snapshot.val())
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().email === student) {
          //console.log( childSnapshot.val() )
          let curKey = childSnapshot.key;
          //console.log( curKey )
          childSnapshot.forEach(function(folder) {
            if (folder.key == "bids") {
              //console.log( folder.val() )
              folder.forEach(function(bid) {
                console.log(bid.val());

                if (
                  bid.val().Cost === cost &&
                  bid.val().Contract === name &&
                  bid.val().Details === details
                ) {
                  console.log("found the bid!");
                  let bidKey = bid.key;
                  //UPDATE
                  firebase
                    .database()
                    .ref("users/" + curKey + "/bids/" + bidKey + "/Accepted")
                    .set(true);
                }
              });
            }
          });
        }
      });
    });

    //route back to home
    this.props.history.push("/companydashboard");
  };

  mapBids = () => {
    const classes = useStyles;
    return this.state.bids.map(item => {
      return (
        <div className="bidCard">
          <Card>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {item.student_name}
              </Typography>
              <Typography variant="h5" component="h2">
                {" "}
                {item.student}{" "}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {" "}
                {item.studentInfo}{" "}
              </Typography>
              <Typography variant="body2">
                <div>Hourly Rate: ${item.rate}</div>
                <div>Expencted time: {item.hours}</div>
                <div>Total Cost: ${item.cost}</div>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() =>
                  this.acceptBidClicked(
                    item.cost,
                    item.student,
                    item.studentInfo
                  )
                }
              >
                Accept This Bid
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="App">
        <CompanyNavBar history={this.props.history} />
        <h1>View Bids</h1>
        <h2> {this.props.location.state.contract_name} </h2>
        <div> {this.state.notification} </div>
        <div className="allBidCards"> {this.mapBids()} </div>
      </div>
    );
  }
}

export default CompanyViewBids;

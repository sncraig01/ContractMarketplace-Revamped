import React from "react";
import CompanyNavBarNew from "./Company_NavBar_New.js";
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

    notification: ""
  };

  componentDidMount() {
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
      contractsRef.on("value", snapshot => {
        console.log(snapshot.val());
        if (snapshot.val() === null) {
          //add some kind of notification that there are no bids yet
          this.setState({
            notification: "There are no bids for this conract yet"
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
              student: bid.Student
            };
            bidsArr.push(item);
          });

          //set all the info
          this.setState({
            bids: bidsArr,
            company_name: companyName,
            contract_name: contractName,
            contract_details: contractDetails
          });
        }
      });
    } else {
      console.log("did not get the user info ");
    }
  }

  acceptBidClicked = (cost, student, student_info) => {
    //change "Accepted" to "true" for the actual bid in firebase
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
          //console.log( childSnapshot.val() )
          //console.log( childSnapshot.key )
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
                (name will go here)
              </Typography>
              <Typography variant="h5" component="h2">
                {" "}
                {item.student}{" "}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {" "}
                {item.studentInfo}{" "}
              </Typography>
              <Typography variant="body2" component="p">
                <div>Hourly Rate: ${item.rate}</div>
                <div>Expencted time: {item.hours}</div>
                <div>Total Cost: ${item.cost}</div>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
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
        <CompanyNavBarNew history={this.props.history} title={"Bids"} />
        <div> Displaying bids for your contract: </div>
        <h1> {this.props.location.state.contract_name} </h1>
        <div> {this.state.notification} </div>
        <div className="allBidCards"> {this.mapBids()} </div>
      </div>
    );
  }
}

export default CompanyViewBids;

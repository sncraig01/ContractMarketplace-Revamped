import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Admin_NavBar from "../Admin/Admin_NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import firebase from "../firebase.js";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Submit_Bid extends React.Component {
  // In marketplace, want to show all contracts with status of available
  // Also want search bar to refine results
  // Each contract needs a "Submit Bid" button, which will take user to new page where they can enter
  //    bid details for that specific contract

  constructor(props) {
    super(props);

    this.state = {
      bidRate: 0,
      bidHours: 0,
      bidTotalCost: 0,
      otherInfo: ""
    };
  }

  componentDidMount = () => {
    // retrieve contract details
    // const usersRef = firebase
    //   .database()
    //   .ref("contracts/" + this.props.location.state.key);
    // usersRef.on("value", snapshot => {
    //   let data = snapshot.val();
    //   console.log("data = " + data);
    // });

    console.log("SUBMITBIDKEY = " + this.props.location.state.key);
  };

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
    console.log(newValue);
  }

  submitBid = () => {
    let user = firebase.auth().getCurrentUser();
    if (user != null) {
      // student is signed in, do stuff
      let newBid = {
        Student: user,
        Rate: this.state.bidRate,
        Hours: this.state.bidHours,
        Cost: this.state.bidTotalCost,
        Info: this.state.otherInfo
      };

      const contractRef = firebase
        .database()
        .ref("contracts/" + this.props.location.state.key + "/bids");

      contractRef.push(newBid);
    }
  };

  render() {
    return (
      <div>
        <p>Welcome to Submit Bid Page</p>

        <p>Contract Details:</p>
        {this.props.location.state.company}
        <br />
        {this.props.location.state.contract}
        <br />
        {this.props.location.state.details}
        <br />

        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div /*className={classes.paper}*/>
              <Typography component="h1" variant="h5">
                Submit bid
              </Typography>
              <form /*className={classes.form}*/ noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="filled-number"
                      name="hourlyRate"
                      label="Hourly Rate"
                      onChange={e =>
                        this.updateField("bidRate", e.target.value)
                      }
                      type="number"
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="hours"
                      name="hours"
                      label="Total Hours to Complete"
                      onChange={e =>
                        this.updateField("bidHours", e.target.value)
                      }
                      type="number"
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <p>
                      {this.state.bidHours && this.state.bidRate
                        ? "Total Price of Bid: $" +
                          this.state.bidHours * this.state.bidRate
                        : "Enter details above to calculate total cost"}
                    </p>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="info"
                      label="Other Information"
                      id="info"
                      autoComplete="info"
                      onChange={e =>
                        this.updateField("otherInfo", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid />
                </Grid>
              </form>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                onClick={() => this.submitBid()}
              >
                Submit Bid
              </Button>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Submit_Bid;

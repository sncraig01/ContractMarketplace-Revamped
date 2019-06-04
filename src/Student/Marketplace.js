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

class Marketplace extends React.Component {
  // In marketplace, want to show all contracts with status of available
  // Also want search bar to refine results
  // Each contract needs a "Submit Bid" button, which will take user to new page where they can enter
  //    bid details for that specific contract

  retrieveAllContracts = () => {
    const contractsRef = firebase.database().ref("contracts");
    contractsRef.on("value", snapshot => {
      //console.log( snapshot.val() )

      snapshot.forEach(function(childSnapshot) {
        var individualContract = childSnapshot.val();
        console.log(individualContract);
      });
    });
  };

  submitBidOnContract = contractKey => {
    // from stackoverflow: this.props.router.push
    this.props.history.push({
      pathname: "/submitbid",
      state: {
        key: contractKey
      }
    });
  };

  goToSubmitBid = () => {
    this.props.history.push("/submitbid");
  };

  render() {
    return (
      <div>
        <p>Welcome to Marketplace</p>
        <button onClick={() => this.goToSubmitBid()}>Go to submit bid</button>
      </div>
    );
  }

  //   render() {
  //     return (
  //       <div className="Student-whole">
  //         <Admin_NavBar />
  //         <div className="Student-Card-Holder">
  //           <div className="State-Cards">
  //             <List>
  //               {/** Implemented a scrollbar */}
  //               <Card
  //                 className="Student-studentholder"
  //                 style={{ maxHeight: 40, overflow: "auto" }}
  //               >
  //                 <div>
  //                   <b>Profile:</b>
  //                   <Divider />
  //                 </div>
  //                 <div className="Student-Searchbarholder" />
  //                 <CardContent />
  //               </Card>
  //             </List>
  //           </div>
  //           <div className="Student-Cards">
  //             {/** Implemented a scrollbar */}
  //             <Card
  //               className="Student-contactholder"
  //               style={{ maxHeight: 200, overflow: "auto" }}
  //             >
  //               <div>
  //                 <b>Current Bids:</b>
  //                 <Divider />
  //               </div>
  //               <div className="Student-Searchbarholder">
  //                 <SearchIcon />
  //                 <InputBase placeholder="Search Bids" />
  //               </div>
  //               <CardContent />
  //             </Card>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
}

export default Marketplace;

import React from "react";
import MUIDataTable from "mui-datatables";
import AdminNavBar from "./Admin_NavBar";
import firebase from "../firebase.js";

export default class AdminManageUsers extends React.Component {
  state = {
    initialized: false,
    emails: [],
    names: [],
    types: []
    // companyNames: [],
    // contractTitles: [],
    // contractDetails: [],
    // areAvailable: []
  };

  componentDidMount() {
    let newEmails = [];
    let newNames = [];
    let newTypes = [];

    if (!this.state.initialized) {
      const usersRef = firebase.database().ref("users"); //reference to the database "users" key
      usersRef.on("value", snapshot => {
        snapshot.forEach(usersSnapshot => {
          var userField = usersSnapshot.val();

          newEmails.push(userField.email);
          newNames.push(userField.name);
          newTypes.push(userField.type);

          this.setState({
            emails: newEmails,
            names: newNames,
            types: newTypes
          });
        });
      });
      this.setState({ initialized: true });
    }
  }

  deleteClicked = deletedRows => {
    // figure out which rows were deleted
    const deletedIndexes = Object.keys(deletedRows.lookup);
    //console.log( deletedIndexes )

    //find which contract name they refer to and remove it
    for (let i = 0; i < deletedIndexes.length; i++) {
      console.log(deletedIndexes[i]);
      let compName = this.state.companyNames[deletedIndexes[i]];
      let contractName = this.state.contractTitles[deletedIndexes[i]];
      console.log("deleting " + compName + " " + contractName);
      var contractRef = firebase
        .database()
        .ref("contracts/" + compName + "/" + contractName);
      contractRef.remove(); //actually remove it
    }

    /*
    //remove all bids that pertain to that contract
    for( let i = 0; i < deletedIndexes.length; i++ ){
      console.log( deletedIndexes[i] )
      let compName = this.state.companyNames[ deletedIndexes[i] ]
      let contractName = this.state.contractTitles[ deletedIndexes[i] ]
      console.log( "deleting bids for " + compName + " " + contractName )

    }
    */

    window.location.reload();
  };

  render() {
    const columns = ["Name", "User Type", "Email"];

    const data = [];
    for (var i = 0; i < this.state.names.length; i++) {
      data.push([
        this.state.names[i],
        this.state.types[i],
        this.state.emails[i]
      ]);
    }

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowsDelete: this.deleteClicked
    };

    return (
      <div>
        <AdminNavBar history={this.props.history} />
        <h1>Manage Users</h1>
        <div>
          <MUIDataTable
            title={"Users"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

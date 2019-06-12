import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import Admin_NavBar from "./Admin_NavBar";
import firebase from "../firebase.js";

export default class Admin_ManageContracts extends React.Component {
  state = {
    initialized: false,
    companyNames: [],
    contractTitles: [],
    contractDetails: [],
    areAvailable: []
  };

  componentDidMount() {
    if (!this.state.initialized) {
      const contractsRef = firebase.database().ref("contracts"); //reference to the database "contracts" key

      contractsRef.on("value", snapshot => {
        snapshot.forEach(contractsSnapshot => {
          contractsSnapshot.forEach(detailsSnapshot => {
            detailsSnapshot.forEach(async contractFieldsSnapshot => {
              var contractField = contractFieldsSnapshot.val();
              if (!(contractField === "bids")) {
                let newNames = this.state.companyNames;
                let newTitles = this.state.contractTitles;
                let newDetails = this.state.contractDetails;
                let newAvailable = this.state.areAvailable;

                newNames.push(contractField.name);
                newTitles.push(contractField.contractName);
                newDetails.push(contractField.contractDetails);
                if (contractField.available === true) {
                  newAvailable.push("Yes");
                } else if (contractField.available === false) {
                  newAvailable.push("No");
                }

                await this.setState({ companyNames: newNames });
                await this.setState({ contractTitles: newTitles });
                await this.setState({ contractDetails: newDetails });
                await this.setState({ areAvailable: newAvailable });
              }
            });
          });
        });
      });
      this.setState({ initialized: true });
    }
  }


  deleteClicked= (deletedRows) => {
    console.log( "deleting" )
    console.log( deletedRows )
    const deletedIndexes = Object.keys(deletedRows.lookup);
  }

  render() {
    const columns = [
      "Company",
      "Contract Title",
      "Contract Details",
      "Available"
    ];

    const data = [];
    for (var i = 0; i < this.state.companyNames.length; i++) {
      data.push([
        this.state.companyNames[i],
        this.state.contractTitles[i],
        this.state.contractDetails[i],
        this.state.areAvailable[i]
      ]);
    }

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      //onRowsSelect: ()=>this.selectRowsClicked(),
      onRowsDelete: this.deleteClicked,
    };

    return (
      <div>
        <Admin_NavBar title={"Manage Contracts"} />
        <div>
          <MUIDataTable
            title={"Contracts"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<Admin_ManageContracts />, document.getElementById("root"));
import React from "react";
import Company_NavBar_New from "./Company_NavBar_New.js";
import "./Company.css"
import firebase from "../firebase.js"


class Company_ViewBids extends React.Component {

  state = {
    company_name : "",
    contract_name : "",
    contract_details : "",
    bids: [],
  }



  componentDidMount() {
    let curEmail = "";
    var user = firebase.auth().currentUser;
    if ( user !== null ){
      curEmail = user.email; // save the email we are looking for
      console.log( curEmail )
      let company_name =  this.props.location.state.company_name;
      let contract_name = this.props.location.state.contract_name
      //reference to the database "contracts" key, the specific company, and the specific contract
      const contractsRef = firebase.database().ref( "contracts/" +  company_name +"/"+ contract_name + "/bids" ); 
      // HANDLE WHAT HAPPENS IF THERE ARE NO BIDS YET, BECAUSE THIS REF WOULD BE INVALID

      let bidsArr = []; //we will fill this array with all the bids
      let companyName = "" ;
      let contractName = "" ;
      let contractDetails = "" ;
      contractsRef.on("value", (snapshot) => {
        console.log( snapshot.val() )

        snapshot.forEach(function(childSnapshot) {
          var bid = childSnapshot.val();
          console.log( bid )
          companyName = bid.Company;
          contractName = bid.Contract;
          contractDetails = bid.Details;
          let item = {
            cost: bid.Cost,
            hours: bid.Hours,
            studentInfo: bid.Info,
            rate: bid.Rate,
            student: bid.Student,
          }
          bidsArr.push( item )
        })

        //set all the info
        this.setState({ bids: bidsArr, company_name: companyName, contract_name: contractName, contract_details : contractDetails }) 
      });     


    } else {
      console.log( "did not get the user info " )
    }
  }

  mapBids = () => {
    return this.state.bids.map( 
      (item) => 
      {return <div> 
          {item.student}: {item.studentInfo }
        </div>
      }
    )
  }


  render(){
    return (
      <div className="App">
        <Company_NavBar_New history={this.props.history} title={"Bids"} />
        <div>  Displaying bids for your contract: </div>
        <h1> {this.props.location.state.contract_name} </h1>
        <div> { this.mapBids() } </div>
      </div>
    );

  }

}

export default Company_ViewBids;

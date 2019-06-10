import React from "react";
import Company_NavBar from "./Company_NavBar";
import Company_NavBar_New from "./Company_NavBar_New.js";
import firebase from "../firebase.js"
import List from '@material-ui/core/List';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import "./Company.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({ //for material UI button
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

class Company_Home extends React.Component {
  state = {
    companyName: "",
    email: "",

    allContracts: [],
    availableContracts: [],
    assignedContracts: [],

  }

componentDidMount(){ //find the user and save the information
  let curEmail = "";
  var user = firebase.auth().currentUser;
  if ( user !== null ){
    curEmail = user.email; // save the email we are looking for

    const usersRef = firebase.database().ref( "users" ); //reference to the database "users" key
    let info = [] //for returning info
    usersRef.on("value", (snapshot) => {
      //console.log( snapshot.val() )
      
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        if( item.email === curEmail ){ //if we've found the right folder
          info.push(item.name);
          info.push(item.email);
        }
      })
      this.setState( {companyName: info[0], email: info[1] });
    });  

     //get its contracts
     const contractRef= firebase.database().ref("contracts/" + info[0] ) ; 
     contractRef.on("value", (snapshot) => {
      //console.log( snapshot.val() )
      let contractArr = [];
      let available = [];
      let assigned = [];
      snapshot.forEach(function(contracts) {
        contracts.forEach( function( individContract ){
          /* // MAKES AN ARRAY OF ALL CONTRACTS, NOT SEGREGATED BY AVAILIBILITY
          let contract = {
            contract_name : individContract.val().contractName,
            contract_details :individContract.val().contractDetails,
            availibility :individContract.val().available,
          }

          contractArr.push( contract )
          */
          if( individContract.val().available){
            let contract = {
              contract_name : individContract.val().contractName,
              contract_details :individContract.val().contractDetails,
            }
            available.push( contract )
          } 
          else {
            let contract = {
              contract_name : individContract.val().contractName,
              contract_details :individContract.val().contractDetails,
            }
            assigned.push( contract )
          }
        })
         
       })
       //this.setState( { allContracts: contractArr });
       this.setState( {availableContracts: available, assignedContracts: assigned });       
     });  
  }
  else{
    console.log( "user not set up")
  }
}

viewBidsClicked = ( contract_name ) => { 
  console.log( "about to route to bids for: " + contract_name )
  this.props.history.push({
    pathname: "/viewbids",
    state: {
      contract_name: contract_name,
      company_name: this.state.companyName
    }
  });
}

  render () {

    const classes = useStyles;

    return (
      <div className="App">
        <Company_NavBar_New history={this.props.history} title={"Home"} />
        <h1> {this.state.companyName} </h1>
        <div> {this.state.email} </div>
        <div type="dashinfo">
        <List className="individual">
          <Card style={{maxHeight: 800, overflow: 'auto'}}> 
              <div>
                <b>Assigned Contracts: </b>
                 <Divider/>
              </div>
              <CardContent>
                {this.state.assignedContracts.map((con) => 
                  <div> <b> {con.contract_name} </b> {con.contract_details} </div> ) }
                    
              </CardContent>
                    
           </Card>   
          </List>
          
          <List className="individual"> 
            <Card style={{maxHeight: 800, overflow: 'auto'}}> 
                <div>
                    <b> Pending Contracts: </b>
                    <Divider/>
                </div>
                <div>
                  <SearchIcon />
                  <InputBase 
                  placeholder="Search Bids"
                  />
                </div>
                  <CardContent>
                    {this.state.availableContracts.map((con) => 
                        <div> 
                          <b> {con.contract_name} </b> 
                          <div> {con.contract_details}  </div>
                          <Button color="primary" 
                            className={classes.button} 
                            onClick={ ()=> this.viewBidsClicked( con.contract_name ) }> 
                            SEE BIDS </Button> 
                          </div>)}
                  </CardContent>
              
              </Card>   
          </List>
          </div>
      </div>
    );
  }

}

export default Company_Home;


//<Company_NavBar title={"Home"} />

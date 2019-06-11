import React from "react";
import Company_NavBar_New from "./Company_NavBar_New";
import firebase from "../firebase.js"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

class New_Contract extends React.Component {

  state = {
    companyName: "",
    email: "",

    contractName: "",
    contractDetails: "",

  }

  componentDidMount(){ //find the user and save the information
    let curEmail = "";
    var user = firebase.auth().currentUser;
    if ( user !== null ){
      curEmail = user.email; // save the email we are looking for
      const usersRef = firebase.database().ref( "users" ); //reference to the database "users" key

      usersRef.on("value", (snapshot) => {
        //console.log( snapshot.val() )

        let info = []
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          if( item.email === curEmail ){ //if we've found the right folder
            info.push(item.name);
            info.push(item.email);
          }
        })
        this.setState( {companyName: info[0], email: info[1] });
      });     
    }
    else{
      console.log( "user not set up")
    }
  }

  //for material UI
  OutlinedTextFields = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
    });
  }
  
    
    
  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }
    
  submitContract = () => {
    const contractRef= firebase.database().ref("contracts/" + this.state.companyName + "/" + this.state.contractName); 
    const contract = {
      contractName: this.state.contractName,
      contractDetails: this.state.contractDetails,
      available: true,
      assignedTo: "", //when the contract is assigned, this field will hold the username of who it's assigned to
      name: this.state.companyName,
    };
    contractRef.push(contract);  

    this.props.history.push("/companydashboard");
  }

  render(){
    const classes = useStyles;
    return (
      <div className="App">
        <Company_NavBar_New title={"Create New Contract"} history={this.props.history}/>
        <h1> {this.state.companyName}: Submit a new Contract </h1>
        <div> {this.state.email} </div>
        <form className={classes.container} noValidate autoComplete="off"> 
            <TextField
            label="Contract Name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.updateField("contractName", e.target.value) }
          />
          <div> 
            <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="10"
            style={{ margin: 8 }}
            placeholder="Details"
            helperText="Provide some more details about your contract"

            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e =>
              this.updateField("contractDetails", e.target.value) }
          />
          </div>
          <Button variant="contained" color="secondary" className={classes.button} onClick={()=> this.submitContract()} >
            Submit contract!
          </Button>
        </form>
        
      </div>
    );
  }

}

export default New_Contract;

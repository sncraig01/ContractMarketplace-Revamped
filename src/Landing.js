import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

class Landing extends React.Component{
  
    
    signInClicked = e => {
        // Redirects to profile page
        this.props.history.push("/signin");
    };
    
    signUpStudClicked = e => {
        // Redirects to profile page
        this.props.history.push("/signupstudent");
    };

    signUpCompClicked = e => {
        // Redirects to profile page
        this.props.history.push("/signupcompany");
    };

    render() {
        const classes = useStyles;

        return (
            <div className="App">
                <h1> Welcome to RevTek Contract Marketplace! </h1>
                <p> Select how you would like to sign in</p>
                <div> 
                    <Button variant="contained" className={classes.button} onClick={ ()=> this.signInClicked()}>
                        Sign In
                    </Button>
                </div>
                <br/>
                <div>
                    <Button variant="contained" color="primary" className={classes.button} onClick={()=> this.signUpStudClicked()} >
                        Sign Up as Student
                    </Button>
                </div>
                <br/>
                <div>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={()=> this.signUpCompClicked()} >
                        Sign Up as Company
                    </Button>
                </div>
            </div>
          );
    }

}

export default Landing;

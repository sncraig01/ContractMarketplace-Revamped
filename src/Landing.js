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




    render() {
        const classes = useStyles();

        return (
            <div className="App">
                <h1> Welcome to RevTek Contract Marketplace! </h1>
                <div>
                <Button variant="contained" className={classes.button}>
                    Sign In
                </Button>
                <Button variant="contained" color="primary" className={classes.button}>
                    Sign Up as Student
                </Button>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Sign Up as Company
                </Button>
                </div>
            </div>
          );
    }

}

export default Landing;

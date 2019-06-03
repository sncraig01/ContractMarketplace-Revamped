import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "./firebase.js";
require('firebase/auth')

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Authentication extends React.Component {
  state = {
    email: "",
    password: "",
  }

   //change state as user inputs something
   changeEmail = text => {
    this.setState({ email: text });
  };
   //change state as user inputs something
   changePassword = text => {
    this.setState({ password: text });
  };


  onSignIn=()=>{
    console.log( "here")
    
///// MAKE IT SO IT FINDS THE TYPE AND ROUTES TO THAT HOME PAGE!!!

    firebase.auth().signInWithEmailAndPassword( this.state.email, this.state.password)
    .then(() => {
      // sign in successful
      console.log( "SIGN IN SUCCESS")
      //find what kind of account it is
      const usersRef = firebase.database().ref( "users"); //reference to the database "users" key
      usersRef.on("value", (snapshot) => {
        //console.log( snapshot.val() )

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            console.log( item )
        })
      });
       
      this.props.history.push("/studenthome")
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log( "there was an error")
    });
    
  }


  render() {
    const classes = useStyles;

    return (
      <div className="App">
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="black">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => this.changeEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => this.changePassword(e.target.value)}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>this.onSignIn()}
          >
            Sign In
          </Button>
      </div>
    </Container>

       </div>
    )
  }
}

export default Authentication;

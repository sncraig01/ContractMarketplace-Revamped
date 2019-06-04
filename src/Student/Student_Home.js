
import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Student_NavBar from './Student_NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import firebase from '../firebase.js'
import './Student_Home.css';

class Student_Home extends React.Component 
{
    state = {
    student_email: "",
    student_name: "",
}

    componentDidMount=()=>{

        //Finds the users email through Firebase authentication
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user is signed in")
                console.log(user.email);
                this.setState({student_email : user.email})
                //let uid=currentUser[user].uid;
                //console.log(uid);
              //let data = this.getData(currentUser);
            } else {
              // No user is signed in.
              console.log("Invalid Username or Password")
            }
          });

          //Finds the matching Name and Listed skills from Firebase
          const userRef = firebase.database().ref("users"); // access all users
          userRef.on('value', (snapshot) => {
          let users = snapshot.val();
          for(let itr in users){
              if(this.state.student_email == users[itr].email) // check for a user with a matching email
              {   
                this.setState({student_name : users[itr].name}) 
                break;
              }
            }
            })

        //     //Finds all of the contracts
        //   const userRef = firebase.database().ref("users"); // access all users
        //   userRef.on('value', (snapshot) => {
        //   let users = snapshot.val();
        //   for(let itr in users){
        //       if(this.state.student_email == users[itr].email) // check for a user with a matching email
        //       {   
        //         this.setState({student_name : users[itr].name}) 
        //         break;
        //       }
        //     }
        //     })


    }

    render()
    {
        return (
          <div className= 'Student-whole'>
                  <Student_NavBar title={"Dashboard"} />

           <div className = 'Student-Profile'>
       
               <List>
                   {/** Implemented a scrollbar */}
               <Card className='Student-studentholder' style={{maxHeight: 300, overflow: 'auto'}}> 
                   <div>
                       <b>
                          Profile: 
                       </b>
                       <Divider/>
                   </div>
                   <CardContent>
                        <div>
                            <b> Name:</b> {this.state.student_name}
                        </div>
                        <div>
                            <b>Email:</b> {this.state.student_email}
                        </div>
                        <div>
                            <b>Listed Skills:</b>
                        </div>

                   </CardContent>
                   
               </Card>   
               </List>
       
           </div>
           <div className = 'Student-ContractBids'>
               {/** Implemented a scrollbar */}
               <Card className='Student-contractholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                   <div>
                   <b>
                       Current Contracts:
                   </b>
                   <Divider/>
                   </div>
                   <div className = "Student-Searchbarholder">
                       <SearchIcon />
                       <InputBase 
                       placeholder="Current Contracts"
                       />
                   </div>
                   <CardContent>
                   
                   </CardContent>
               
               </Card>   
               <Card className='Student-bidholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                   <div>
                   <b>
                       Current Bids:
                   </b>
                   <Divider/>
                   </div>
                   <div className = "Student-Searchbarholder">
                       <SearchIcon />
                       <InputBase 
                       placeholder="Search Bids"
                       />
                   </div>
                   <CardContent>
                   
                   </CardContent>
               
               </Card>   
           </div>
   </div>
          );
    }

}

export default Student_Home;

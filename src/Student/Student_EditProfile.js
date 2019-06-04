import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Admin_NavBar from '../Admin/Admin_NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js'
import './Student_Home.css';


class Student_EditProfile extends React.Component 
{
    state = {
    student_email: "",
    student_name: "",
    skill: "", 
    skill_arr: []
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
    }

    //Gets Skills from firebase
    getSkills()
    {

    }

    //Adds skill to the users profile in firebase
    addSkill()
    {
        console.log("adding skill")
        this.state.skill_arr.push(this.state.skill);



    }


    updateFirebase = () => {
        let currentUser = firebase.auth().currentUser;
        console.log(currentUser)
        console.log(currentUser.uid);
        const authUid = currentUser.uid;
        console.log(this.state.activity);
    
        var usersRef = firebase.database().ref("/users" );
        console.log(usersRef)
        let userID="";
        let log=[];
        usersRef.on('value', (snapshot) => {
            let users = snapshot.val();
            console.log(users);
            for (let user in users) {
                if( authUid == users[user].uid){
                    console.log(user);
                    userID=user;
                    log=users[user].log;
                }
            }
        })

        let newItem={
                    skill: this.state.skill    
            }
        var logRef = firebase.database().ref(`/users/${userID}/skills/`);
        console.log(logRef);
        logRef.push(newItem);
    }

    //Removes Skill from firebase and the list
    removeSkill()
    {

    }

    //Updates the state of skill everytime the add skill input box changes
    updatingSkill=(skill)=>
    {
        this.setState({skill})
    }



    render()
    {
        return (
          <div className= 'Student-whole'>
          <Admin_NavBar/>

           <div className = 'Student-Profile'>
       
               <List>
                   {/** Implemented a scrollbar */}
               <Card className='Student-studentholder' style={{maxHeight: 300, overflow: 'auto'}}> 
                   <div>
                       <b>
                         EDIT PROFILE Profile: 
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
                   </CardContent>     
               </Card>   
               </List>
       
           </div>
           <div className = 'Student-ContractBids'>
               {/** Implemented a scrollbar */}
               <Card className='Student-contractholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                   <div>
                   <b>
                      Add/Remove Skills
                   </b>
                   <Divider/>
                   </div>
                   <div className = "Student-Searchbarholder">
                       <SearchIcon />
                       <InputBase 
                       placeholder="Add Skill"
                       onChange={(skill)=>{this.updatingSkill(skill.target.value)}}
                       />
                        <Button  onClick={()=>this.addSkill()}>Add</Button>
                   </div>
                   <CardContent> 
                   
                       {this.state.skill_arr.map((itr) =><li>{itr}</li>)}
                   
                   </CardContent>
               
               </Card>   
               <Card className='Student-bidholder' style={{maxHeight: 200, overflow: 'auto'}}> 
                   <div>
                   <b>
                       Bio:
                   </b>
                   <Divider/>
                   </div>
                   <div className = "Student-Searchbarholder">
                       <SearchIcon />
                       <InputBase 
                       placeholder="Edit Bio"
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

export default Student_EditProfile;


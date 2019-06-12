import React from "react";
import MUIDataTable from "mui-datatables";
import CompanyNavBarNew from "./Company_NavBar_New";
import firebase from "../firebase.js";

export default class CompanySearchStudents extends React.Component {
  state = {
    initialized: false,
    studentNames: [],
    emails: [],
    bios: [],
    skills: [],
    individualSkills: []
  };

  componentDidMount() {
    let newNames = [];
    let newEmails = [];
    // let newBios = [];
    // let newSkills = [];

    if (!this.state.initialized) {
      const usersRef = firebase.database().ref("users"); //reference to the database "users" key
      usersRef.on("value", snapshot => {
        snapshot.forEach(userSnapshot => {
          var user = userSnapshot.val();
          if (user.type === "student") {
            newNames.push(user.name);
            newEmails.push(user.email);
            // let key = userSnapshot.key;

            // const studentRef = firebase.database().ref("users/" + key);
            // studentRef.on("value", snapshot => {
            //   var user = snapshot.val();
            //   var bioObject = user.bio;
            //   var skillObject = user.skills;

            //   // bioObject.forEach(function(bioLine){
                
            //   // })

            //   console.log(bioObject);
            //   // snapshot.forEach(userSnapshot => {
            //   //   console.log(userSnapshot.val());
            //   // userSnapshot.forEach(arraySnapshot => {
            //   //   console.log(arraySnapshot.val());
            //   // })
            //   // })
            // });

            // console.log(newEmails);
            // console.log(newBios);

            // userSnapshot.forEach(detailsSnapshot => {
            //   // console.log(detailsSnapshot.val());
            //   detailsSnapshot.forEach(arraySnapshot => {
            //     // console.log(arraySnapshot.val());
            //   });
            //   // let mySkills = [];
            //   // mySkills.push(skillsSnapshot.val());
            //   // this.setState({ inidividualSkills: mySkills });

            //   // newBios.push(user.bio);
            //   // newSkills.push(mySkills);
            // });
          }
        });
        this.setState({
          studentNames: newNames,
          emails: newEmails
          // bios: newBios
          // skills: newSkills
        });
      });
      this.setState({ initialized: true });
    }
  }

  render() {
    const columns = ["Name", "Email", "Bio", "Skills"];

    const data = [];
    for (var i = 0; i < this.state.studentNames.length; i++) {
      data.push([
        this.state.studentNames[i],
        this.state.emails[i],
        this.state.bios[i]
        // this.state.skills[i]
      ]);
    }

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    return (
      <div>
        <CompanyNavBarNew
          history={this.props.history}
          title={"Search Students"}
        />
        <div>
          <MUIDataTable
            title={"Students"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<Company_SearchStudents />, document.getElementById("root"));

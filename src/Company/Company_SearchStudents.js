import React from "react";
import MUIDataTable from "mui-datatables";
import CompanyNavBarNew from "./Company_NavBar_New";
import firebase from "../firebase.js";

export default class CompanySearchStudents extends React.Component {
  state = {
    initialized: false,
    studentNames: ["Me"],
    emails: ["me@gmail.com"],
    bios: ["It's me"],
    skills: [],
    individualSkills: []
  };

  componentDidMount() {
    if (!this.state.initialized) {
      const usersRef = firebase.database().ref("users"); //reference to the database "users" key

      usersRef.on("value", snapshot => {
        snapshot.forEach(async userSnapshot => {
          var user = userSnapshot.val();
          // console.log(user);
          if (user.type === "student") {
            console.log(user);
            let newNames = this.state.studentNames;
            let newEmails = this.state.emails;
            let newBios = this.state.bios;
            // let newSkills = this.state.skills;

            newNames.push(user.name);
            // console.log(newNames);
            newEmails.push(user.email);
            newBios.push(user.bio);

            // let mySkills = [];

            // userSnapshot.forEach(async skillsSnapshot => {
            //   let mySkills = [];
            //   mySkills.push(skillsSnapshot.val());
            //   await this.setState({ inidividualSkills: mySkills });
            // });

            // newSkills.push(mySkills);

            await this.setState({
              studentNames: newNames,
              emails: newEmails,
              bios: newBios
              // skills: newSkills
            });
          }
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

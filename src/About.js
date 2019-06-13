import React from "react";
import Card from '@material-ui/core/Card';
import RevTekHomeNavBar from "./RevTekHomeNavBar";
import StudentNavBar from "./Student/Student_NavBar";
import AdminNavBar from "./Admin/Admin_NavBar";
import CompanyNavBar from "./Company/Company_NavBar.js";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import "./About.css";

class About extends React.Component {

    componentDidMount(){
        console.log(  this.props.location.state.type )
    }

    render() {
    let type = this.props.location.state.type
    return (
        <div>
            { type === "student" 
                ? <StudentNavBar history={this.props.history} /> 
                : type === "company"
                ? <CompanyNavBar history={this.props.history} />
                : type === "admin"
                ? <AdminNavBar history={this.props.history} />
                : null }
            <div className="RevTekHome-Header">
                About RevTek
                <br/>
                <br/>     
            </div>
            <div className="RevTekHome-Body">
                <br/>
                <br/>
                <br/>
                <Card className='RevTekHome-Info'style={{maxHeight: 200, maxWidth: 100, overflow: 'auto'}}>
                <div className="RevTekHome-Title">
                   <b>About us</b>
                </div>
                   <Divider/>
                   <br/>
                    <div>
                        Here at RevTek we are dedicated to connecting companies and students in order to foster
                        both individual, community and company growth. By joining our community you will
                        include yourself in an opportunity filled network of highly capabable and skilled proffesionals.
                    </div>
                </Card>
                <br/>
                <Card className='RevTekHome-Info'style={{maxHeight: 600, maxWidth: 100, overflow: 'auto'}}>
                   <div className="RevTekHome-Title">
                    <b>How it Works</b>
                   </div>
                   <Divider/>
                   <br/>
                   <div>
                        <div className="RevTekHome-TextHeader">
                            <b> Company Services </b>
                        </div>
                    </div>
                    {/* <Divider/> */}
                    <br/>
                    <div>
                        Registering as a Company will give your business access to our pool of highly motivated and 
                        skilled students. The RevTek Student pool is highly collaborative allowing it to exist as an evergrowing 
                        network. The RevTek quick connection technology allows for Contracts to find suitable students 
                        in real time, allowing for efficient completion of your companies needs. 
                    </div>

                    <br/>
                    <div>
                        <div className="RevTekHome-TextHeader">
                        <b> Student Services </b>
                        </div>
                    </div>
                    {/* <Divider/> */}
                    <br/>
                    <div>
                        Registering as a Student within RevTek will open countless oportunities for you to grow.
                        Registering will give you the ability to connect with any other students registered students within RevTek.
                        In addition to connecting with Students, you will be able to view Contracts posted by Companies. Here, you
                        will be able to bid on and complete Contracts that test your skills and grow your resume.  
                    </div>
                </Card>
            {/* </div> */}
            <br/>
            <br/>
                <br/>
            </div>
        </div>
    )
    }
}

export default About;
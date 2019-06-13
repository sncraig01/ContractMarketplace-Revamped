import React from "react";
import Card from "@material-ui/core/Card";
import RevTekHomeNavBar from "./RevTekHomeNavBar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./RevTekHome.css";

class RevTekHome extends React.Component {
  componentDidMount() {
    document.title = "RevTek";
  }

  joinClicked() {
    return (window.location = "/signUp");
  }

  render() {
    return (
      <div>
        <RevTekHomeNavBar />
        <div className="RevTekHome-Header">
          Welcome to RevTek
          <br />
          <br />
          <div className="RevTekHome-Button">
            <Button
              style={{
                maxWidth: "200px",
                maxHeight: "60px",
                minWidth: "200px",
                minHeight: "60px"
              }}
              variant="contained"
              color="secondary"
              onClick={() => this.joinClicked()}
            >
              {" "}
              Join Today!{" "}
            </Button>
            <br />
          </div>
        </div>
        {/* <div className="RevTekHome-Image"> */}
        {/*            
            <div className="RevTekHome-ImageContainer">
                <br/>
                <br/>
                <br/>
                 <img src="https://media.istockphoto.com/photos/business-people-using-pentabletnotebook-are-planning-a-marketing-plan-picture-id881542122?k=6&m=881542122&s=612x612&w=0&h=Sc70smgI-QSn1gLFO2UdAZIb8F9LKptDH8AujitIXBk=" alt="Business"></img>
            </div> */}
        <div className="RevTekHome-Body">
          <br />
          <br />
          <br />
          <Card
            className="RevTekHome-Info"
            style={{ maxHeight: 200, maxWidth: 100, overflow: "auto" }}
          >
            <div className="RevTekHome-Title">
              <b>About us</b>
            </div>
            <Divider />
            <br />
            <div>
              Here at RevTek we are dedicated to connecting companies and
              students in order to foster both individual, community and company
              growth. By joining our community you will include yourself in an
              opportunity filled network of highly capabable and skilled
              proffesionals.
            </div>
          </Card>
          <br />
          <Card
            className="RevTekHome-Info"
            style={{ maxHeight: 600, maxWidth: 100, overflow: "auto" }}
          >
            <div className="RevTekHome-Title">
              <b>How it Works</b>
            </div>
            <Divider />
            <br />
            <div>
              <div className="RevTekHome-TextHeader">
                <b> Company Services </b>
              </div>
            </div>
            {/* <Divider/> */}
            <br />
            <div>
              Registering as a Company will give your business access to our
              pool of highly motivated and skilled students. The RevTek Student
              pool is highly collaborative allowing it to exist as an
              evergrowing network. The RevTek quick connection technology allows
              for Contracts to find suitable students in real time, allowing for
              efficient completion of your companies needs.
            </div>

            <br />
            <div>
              <div className="RevTekHome-TextHeader">
                <b> Student Services </b>
              </div>
            </div>
            {/* <Divider/> */}
            <br />
            <div>
              Registering as a Student within RevTek will open countless
              oportunities for you to grow. Registering will give you the
              ability to connect with any other students registered students
              within RevTek. In addition to connecting with Students, you will
              be able to view Contracts posted by Companies. Here, you will be
              able to bid on and complete Contracts that test your skills and
              grow your resume.
            </div>
          </Card>
          {/* </div> */}
          <br />
          <br />
          <div className="RevTekHome-Button">
            <Button
              style={{
                maxWidth: "200px",
                maxHeight: "80px",
                minWidth: "200px",
                minHeight: "80px"
              }}
              variant="contained"
              color="secondary"
              onClick={() => this.joinClicked()}
            >
              Join Today!
            </Button>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default RevTekHome;

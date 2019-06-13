import React from "react";
import Card from "@material-ui/core/Card";
import RevTekHomeNavBar from "./RevTekHomeNavBar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./RevTekHome.css";

class RevTekHome extends React.Component {
  componentDidMount() {}

  joinClicked() {
    return (window.location = "/signUp");
  }

  render() {
    return (
      <div>
        <RevTekHomeNavBar history={this.props.history} />
        <div className="RevTekHome-Header">
          <Button
            variant="text"
            noWrap
            style={{
              fontSize: "calc(40px + 2vmin)",
              backgroundColor: "transparent",
              color: "white",
              textTransform: "none",
              boxShadow: "none"
            }}
            href="/"
          >
            Welcome to RevTek
          </Button>
          <br />
          <br />
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
          <Card
            className="RevTekHome-Info"
            style={{ maxHeight: 200, maxWidth: 100, overflow: "auto" }}
          >
            <div className="RevTekHome-Title">
              <b>About us</b>
            </div>
            <Divider />
            <br />
            <div style={{ fontSize: "18px" }}>
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
              <b>Our Services</b>
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
            <div style={{ fontSize: "18px" }}>
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
            <div style={{ fontSize: "18px" }}>
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
                maxWidth: "175px",
                maxHeight: "60px",
                minWidth: "175px",
                minHeight: "60px",
                fontSize: "16px"
              }}
              variant="contained"
              color="primary"
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

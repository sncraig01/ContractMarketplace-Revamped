import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Home from "@material-ui/icons/Home";
import Contracts from "@material-ui/icons/Assignment";
import Users from "@material-ui/icons/AssignmentInd";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import firebase from "../firebase.js";
import Logo from "../revteklogo.png";


const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  company: {
    marginRight: theme.spacing(5)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

function AdminNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    />
  );

  const adminDashboardClicked = e => {
    // Redirects to admin home page
    props.history.push("/admindashboard");
  };

  const manageContractsClicked = e => {
    // Redirects to marketplace page
    props.history.push("/managecontracts");
  };

  const manageUsersClicked = e => {
    // Redirects to marketplace page
    props.history.push("/manageusers");
  };

  const logoutClicked = e => {
    // Redirects to landing page
    let user = firebase.auth().currentUser;
    if (user != null) {
      firebase
        .auth()
        .signOut()
        .then(res => {
          console.log("logged " + user.email + " out");
        })
        .catch(function(error) {});
    }

    props.history.push("/");
  };

  const routeToAbout = () => {
    props.history.push({
      pathname: "/about",
      state: {
        type: "admin"
      }
    });
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit" onClick={() => adminDashboardClicked()}>
          <Home />
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit" onClick={() => manageContractsClicked()}>
          <Contracts />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit" onClick={() => manageUsersClicked()}>
          <Users />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit" onClick={() => logoutClicked()}>
          <ExitToApp />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ height: "60px" }}>
        <Toolbar style={{ marginTop: "-2px" }}>
          <Button
            variant="text"
            style={{
              fontSize: "26px",
              backgroundColor: "transparent",
              color: "white",
              textTransform: "none",
              boxShadow: "none"
            }}
            onClick={() => routeToAbout()}
          >
            <img className="navBarLogo" src={Logo} />
          </Button>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            align="center"
            style={{ fontSize: "20px" }}
          >
            {props.title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="Dashboard">
              <IconButton
                color="inherit"
                onClick={() => adminDashboardClicked()}
              >
                <Home />
              </IconButton>
            </Tooltip>
            <Tooltip title="Manage Contracts">
              <IconButton
                color="inherit"
                onClick={() => manageContractsClicked()}
              >
                <Contracts />
              </IconButton>
            </Tooltip>
            <Tooltip title="Manage Users">
              <IconButton color="inherit" onClick={() => manageUsersClicked()}>
                <Users />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={() => logoutClicked()}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
}

export default AdminNavBar;

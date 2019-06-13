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
import AddCircle from "@material-ui/icons/AddCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";


/**
 * 
 * 
 * NOT BEING USED
 * 
 */

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

/*
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


*/

class CompanyNavBarNew extends React.Component {
  constructor(props) {
    super(props);
    this.newContractClicked = this.newContractClicked.bind(this);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setMobileMoreAnchorEl(event.currentTarget);
  };

  companyDashboardClicked = e => {
    // Redirects to marketplace page
    this.props.history.push("/companydashboard");
    //return (window.location = "/companydashboard");
  };

  newContractClicked = () => {
    // Redirects to new contract page
    this.props.history.push("/newcontract");
    //return (window.location = "/newcontract");
  };

  logoutClicked = e => {
    // Redirects to landing page
    this.props.history.push("/");
    //return (window.location = "/");
  };

  render() {
    const classes = useStyles;

    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={() => this.handleMobileMenuClose()}
      >
        <MenuItem>
          <IconButton
            color="inherit"
            onClick={() => this.companyDashboardClicked()}
          >
            <Home />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={() => this.handleProfileMenuOpen()}>
          <IconButton color="inherit" onClick={() => this.newContractClicked()}>
            <AddCircle />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={() => this.handleProfileMenuOpen()}>
          <IconButton color="inherit" onClick={() => this.logoutClicked()}>
            <ExitToApp />
          </IconButton>
        </MenuItem>
      </Menu>
    );
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={() => this.handleMenuClose()}
      />
    );
    return (
      <div className={classes.grow}>
        <AppBar position="static" style={{ height: "60px" }}>
          <Toolbar style={{ marginTop: "-2px" }}>
            <Typography
              className={classes.company}
              variant="h5"
              noWrap
              style={{ fontSize: "26px" }}
            >
              RevTek
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              align="center"
              style={{ fontSize: "20px" }}
            >
              {this.props.title}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title="Dashboard">
                <IconButton
                  color="inherit"
                  onClick={() => this.companyDashboardClicked()}
                >
                  <Home />
                </IconButton>
              </Tooltip>
              <Tooltip title="Post New Contract">
                <IconButton
                  color="inherit"
                  onClick={() => this.newContractClicked()}
                >
                  <AddCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  onClick={() => this.logoutClicked()}
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

export default CompanyNavBarNew;

import React from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import "./Admin_ManageUsers.css";
import AdminNavBar from "./Admin_NavBar";

class AdminManageUsers extends React.Component {
  render() {
    return (
      <div className="Admin-users-whole">
        <AdminNavBar title={"Manage Users"} />
        <div className="Admin-Card-Holder">
          <div className="Admin-Cards">
            <List>
              {/** Implemented a scrollbar */}
              <Card
                className="Admin-studentholder"
                style={{ maxHeight: 200, overflow: "auto" }}
              >
                <div>
                  <b>Students:</b>
                  <Divider />
                </div>
                <div className="Admin-Searchbarholder">
                  <SearchIcon />
                  <InputBase placeholder="Search Students" width="50%" />
                </div>
                <CardContent />
              </Card>
            </List>
          </div>
          <div className="Admin-Cards">
            {/** Implemented a scrollbar */}
            <Card
              className="Admin-contactholder"
              style={{ maxHeight: 200, overflow: "auto" }}
            >
              <div>
                <b>Companies:</b>
                <Divider />
              </div>
              <div className="Admin-Searchbarholder">
                <SearchIcon />
                <InputBase color="white" placeholder="Search Companies" />
              </div>
              <CardContent />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminManageUsers;

import React from "react";

var admin = require("firebase-admin");
var serviceAccountKey = process.env.REACT_APP_SERVICE_ACCOUNT_KEY;
var serviceAccount = require(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://contractmarket-aa272.firebaseio.com"
});

class Authentication extends React.Component {
  render() {
    return <div className="App" />;
  }
}

export default Authentication;

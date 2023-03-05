import React from 'react';
import Login from "../../assets/Login.png"
import LogInCard from './log-in-card/log-in-card';
class LogInPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", background: "azure" }}>
        <div style={{ width: "50%", height: "100%" }}>
          <img style={{ width: "100%", height: "100vh" }} src={Login} alt="log-in-image" />
        </div>
        <div style={{ width: "50%", height: "100%", textAlign: "center", margin: "auto", padding: "70px" }}>
          <LogInCard />
        </div>
      </div>
    );
  }
}
export default LogInPage;





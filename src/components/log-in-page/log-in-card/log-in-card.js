import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import Cookies from "js-cookie";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBInputGroup, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserLoggedIn } from '../../../redux/users/userLoggedInSlice';

const mapStateToProps = (state) => ({
  userLoggedIn: state.userLoggedInSlice.userLoggedIn,
  usersData: state.userLoggedInSlice.usersData,

});
class LogInCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      showPass: false,
      typeOfUser: "",
    }
  }

  onSignIn = ({ name, password, message }) => {
    let checkUser = this.props.usersData.find((item) => item.name === name);
    if (checkUser) {
      if (checkUser.password === password) {
        if (checkUser.role === "admin") {
          this.setState({ typeOfUser: "admin" })
          this.props.dispatch(setUserLoggedIn(checkUser))
          Cookies.set('userName', checkUser.name);
        }
        if (checkUser.role === "monitor") {
          this.setState({ typeOfUser: "monitor" })
          this.props.dispatch(setUserLoggedIn(checkUser))
          Cookies.set('userName', checkUser.name);
        }
        else {
          this.setState({ typeOfUser: "user" })
          this.props.dispatch(setUserLoggedIn(checkUser))
          Cookies.set('userName', checkUser.name);
        }
      }
      else {
        this.setState({ typeOfUser: "passwordError", })
        this.props.dispatch(setUserLoggedIn(false))
        toast.error(message)
      }
    }
    else {
      this.setState({ typeOfUser: "undefined", })
      this.props.dispatch(setUserLoggedIn(false))
      toast.error(message)
    }
  }
  
  render() {
    return (
      <div style={{ borderRadius: "12px" }}>
        <MDBCard >
          <MDBCardBody>
            <MDBCardTitle style={{ fontSize: "35px", marginBottom: "20px" }}>Sign In</MDBCardTitle>
            <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
              Name
            </MDBTypography>
            <MDBInput value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} size="lg" style={{ marginBottom: "30px" }} label='' id='typeText' type='text' placeholder='Name' />
            <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
              Password
            </MDBTypography>
            <MDBInputGroup className='mb-3'>
              <input className='form-control' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} size="lg" style={{ marginBottom: "30px", padding: "20px 0px 20px 12px" }} label='' id='typePassword' type={this.state.showPass ? 'text' : 'password'} placeholder='Password' />
              {this.state.showPass ?
                <>
                  <IconButton style={{ margin: "0px 0px 25px 0px", border: "1px solid", height: "42px" }} onClick={() => this.setState({ showPass: !this.state.showPass })} >
                  <RemoveRedEyeIcon />
                  </IconButton>
                </>
                :
                <>
                  <IconButton style={{ margin: "0px 0px 25px 0px", border: "1px solid", height: "42px" }} onClick={() => this.setState({ showPass: !this.state.showPass })}>
                    <VisibilityOffIcon />

                  </IconButton>
                </>
              }

            </MDBInputGroup>
            <div style={{ textAlign: "center" }}>
              <MDBBtn type="submit" onClick={() => { this.onSignIn({ name: this.state.name, password: this.state.password, message: "Incorrect name or password !" }) }} disabled={!this.state.name.trim() || !this.state.password.trim()} style={{ background: "#3B71CA", padding: "11px", width: "25%", fontSize: "15px" }}>
                Login
              </MDBBtn>
              <ToastContainer
                position="top-right"
                autoClose={2000}
              />
              {(this.state.typeOfUser === "user" || this.state.typeOfUser === "admin" || this.state.typeOfUser === "monitor") && <Navigate replace={true} to={`/dashboard/${this.props.userLoggedIn.name}/analytics`} />}
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    )
  }
}
export default connect(mapStateToProps)(LogInCard);

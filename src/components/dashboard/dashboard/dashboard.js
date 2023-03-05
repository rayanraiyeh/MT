import React from 'react';
import FaceIcon from '@mui/icons-material/Face';
import Cookies from "js-cookie";
import { MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBListGroup, MDBListGroupItem, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBRipple, MDBTypography } from 'mdb-react-ui-kit';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
import './dashboard.css';

const mapStateToProps = (state) => ({
  userLoggedIn: state.userLoggedInSlice.userLoggedIn,
  usersData: state.userLoggedInSlice.usersData,
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isActive: { analytics: false, users: false, page3: false, page4: false },
      roleOfUserSignIn: this.props.usersData && this.props.usersData.find((item) => item.name === window.location.href.split("/")[4]).role,
    }
  }
  toggleShow = () => this.setState({ show: !this.state.show })

  handleActiveTab = (name) => {
    Object.keys(this.state.isActive).forEach((key) => {
      this.setState({ isActive: { [key]: false, [name]: true } })
    }
    )
  }

  render() {
    return (
      <div>
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
        <MDBNavbar expand='lg' light bgColor='light' className='headerNav' >
          <MDBContainer fluid>
            <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
              <MDBNavbarToggler
                type='button'
                aria-label='Toggle navigation'
                onClick={() => this.setState({ show: !this.state.show })}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>
              <MDBNavbarBrand style={{ marginLeft: " 15px" }} >
                <img
                  src={Logo}
                  width="45px"
                  alt=''
                  loading='lazy'
                />
              </MDBNavbarBrand>
              <MDBTypography style={{ margin: "3px 0px 0px -15px" }}>
                Hola!
              </MDBTypography>
            </MDBNavbarNav>
            <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
              <MDBDropdown>
                <MDBDropdownToggle style={{ background: "transparent", borderRadius: "15px", border: "2px solid #35A2EB" }}
                  className="hidden-arrow nav-link">
                  <FaceIcon fontSize="medium" color="secondary" />
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <Link to="/">
                    <MDBDropdownItem style={{ margin: "10px" }}  >
                      Sign Out
                    </MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
        <div className='divDash' >
          <MDBCollapse show={this.state.show} tag="nav" className="d-lg-block bg-white sidebar">
            <div className="position-sticky">
              <MDBListGroup className="mx-3 mt-4">
                <Link to={`/dashboard/${Cookies.get('userName')}/analytics`}>
                  <MDBRipple rippleTag='span'>
                    <MDBListGroupItem style={{ marginRight: "82px" }} onClick={() => this.handleActiveTab("analytics")} tag='a' id="b" action className='border-0 border-bottom rounded rounded' active={this.state.isActive.analytics === true} aria-current='true'>
                      <MDBIcon fas icon="chart-line me-3" />
                      Analytics
                    </MDBListGroupItem>
                  </MDBRipple>
                </Link>
                <Link to={`/dashboard/${Cookies.get('userName')}/users`}>
                  <MDBRipple rippleTag='span'>
                    <MDBListGroupItem style={{ marginRight: "105px" }} onClick={() => this.handleActiveTab("users")} tag='a' active={this.state.isActive.users === true} id="a" aria-current='step' action className='border-0 border-bottom rounded' >
                      <MDBIcon fas icon="users me-3" />
                      Users
                    </MDBListGroupItem>
                  </MDBRipple>
                </Link>
                <Link to={`/dashboard/${Cookies.get('userName')}/jobsDetails`}>
                  <MDBRipple rippleTag='span'>
                    <MDBListGroupItem style={{ marginRight: "105px" }} onClick={() => this.handleActiveTab("jobsDetails")} tag='a' active={this.state.isActive.jobsDetails === true} id="a" aria-current='step' action className='border-0 border-bottom rounded' >
                      <MDBIcon style={{marginRight:"20px"}} fas icon="file-alt" />
                      Jobs Details
                    </MDBListGroupItem>
                  </MDBRipple>
                </Link>
                {(this.state.roleOfUserSignIn && (this.state.roleOfUserSignIn === "admin" || this.state.roleOfUserSignIn === "monitor")) &&
                  <Link to={`/dashboard/${Cookies.get('userName')}/userdata`}>
                    <MDBRipple rippleTag='span'>
                      <MDBListGroupItem type="submit" style={{ marginRight: "118px" }} onClick={() => this.handleActiveTab("userLoggedIn")} tag='a' active={this.state.isActive.userLoggedIn === true} id="a" aria-current='step' action className='border-0 border-bottom rounded' >
                        <MDBIcon style={{marginRight:"14px"}} fas icon="users-cog" />
                        User Data
                      </MDBListGroupItem>
                    </MDBRipple>
                  </Link>
                }
              </MDBListGroup>
            </div>
          </MDBCollapse>
          <div className='outletComponent'  >
            <Outlet />
          </div>
        </div >
      </div >
    )
  }

}
export default connect(mapStateToProps)(Dashboard);

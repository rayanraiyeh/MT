import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBInputGroup,
    MDBRow,
    MDBTypography
} from 'mdb-react-ui-kit';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setAddUser } from '../../../redux/users/userSlice';
import CountrySelect from './nationality-drop-down';

const mapStateToProps = (state) => ({
    usersList: state.userSlice.addUser
});

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewUser: { firstName: "", lastName: "", nationality: "", phoneNumber: "+", lastMonthBill: "", additionAddress: "", age: "", "OfServicesSubscribe": "" },

        }
    }
    validateAllDataAndAddUser = () => {
        let user = this.state.addNewUser
        if (!!Object.keys(user).find((item) => !user[item].trim())) {
            toast.error("Please fill all fields")

        }
        else {
            this.props.dispatch(setAddUser(this.state.addNewUser))
            toast.success("User Added successfully")
            this.setState({
                addNewUser: { firstName: "", lastName: "", nationality: "", phoneNumber: "+", lastMonthBill: "", additionAddress: "", age: "", "OfServicesSubscribe": "" },
            })

        }
    }

    render() {
        return (
            <div >
                <MDBCard style={{ marginBottom: "3%" }} >
                    <MDBCardBody>
                        <MDBCardTitle style={{ fontSize: "35px", marginBottom: "20px" }}>Add User</MDBCardTitle>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        First Name<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <MDBInput
                                        required
                                        value={this.state.addNewUser.firstName}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, firstName: e.target.value } })}
                                        style={{ marginBottom: "30px" }}
                                        label=''
                                        id='firstName'
                                        type='text'
                                        placeholder='First Name'
                                    />
                                </MDBCol>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        Last Name<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <MDBInput
                                        required
                                        value={this.state.addNewUser.lastName}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, lastName: e.target.value } })}
                                        style={{ marginBottom: "30px" }}
                                        label=''
                                        id='lastName'
                                        type='text'
                                        placeholder='Last Name'
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        From<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <CountrySelect
                                        value={this.state.addNewUser.nationality}
                                        onChange={(newValue) => this.setState({ addNewUser: { ...this.state.addNewUser, nationality: newValue.label } })}
                                    />
                                </MDBCol>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        Phone Number<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <PhoneInput
                                        style={{ marginBottom: "30px" }}
                                        country={'us'}
                                        inputStyle={{ width: '100%', height: "41px" }}
                                        value={this.state.addNewUser.phoneNumber}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, phoneNumber: e } })} />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        Last Month Bill<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>

                                    <MDBInputGroup required className='mb-3' textAfter='$' style={{ marginBottom: "30px" }}>
                                        <input className='form-control' type='number'
                                            onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, lastMonthBill: e.target.value } })}
                                            value={this.state.addNewUser.lastMonthBill}
                                        />
                                    </MDBInputGroup>                                        </MDBCol>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        Addition Address<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <MDBInput
                                        required
                                        value={this.state.addNewUser.additionAddress}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, additionAddress: e.target.value } })}
                                        style={{ marginBottom: "30px" }}
                                        label=''
                                        id='additionAddress'
                                        type='text'
                                        placeholder='Addition Address'
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        Age<span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <MDBInput
                                        required
                                        value={this.state.addNewUser.age}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, age: e.target.value } })}
                                        style={{ marginBottom: "30px" }}
                                        label=''
                                        id='age'
                                        type='number'
                                        placeholder='Age'
                                    />
                                </MDBCol>
                                <MDBCol size='md'>
                                    <MDBTypography style={{ textAlign: "initial", fontWeight: "bold" }} >
                                        # of Services Subscribed <span style={{ color: "red" }}>*</span>
                                    </MDBTypography>
                                    <MDBInput
                                        required
                                        value={this.state.addNewUser.OfServicesSubscribe}
                                        onChange={(e) => this.setState({ addNewUser: { ...this.state.addNewUser, OfServicesSubscribe: e.target.value } })}
                                        style={{ marginBottom: "30px" }}
                                        label=''
                                        id='OfServicesSubscribe'
                                        type='number'
                                        placeholder='# of Services Subscribed' />

                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <div style={{ textAlign: "end" }}>
                            <MDBBtn type='submit' style={{ marginRight: "25px" }} onClick={() => this.validateAllDataAndAddUser()
                                // this.props.dispatch(setAddUser(this.state.addNewUser))
                            }>
                                Add user
                            </MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard >
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                />

            </div>
        );
    }
}
export default connect(mapStateToProps)(AddUser);


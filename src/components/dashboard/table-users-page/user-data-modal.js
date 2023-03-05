import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBTypography
} from 'mdb-react-ui-kit';
import { connect } from 'react-redux';
import { setShowUserDataModal } from '../../../redux/users/userSlice';
const mapStateToProps = (state) => ({
    isShowUserDataModal: state.userSlice.isShowUserDataModal,
    rowData: state.userSlice.rowData

});

class UserDataModal extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <MDBModal show={this.props.isShowUserDataModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>User Data</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={() => this.props.dispatch(setShowUserDataModal({ selected: false }))}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                {this.props.rowData && Object.keys(this.props.rowData).map((item, i) => {
                                    let rowDataNew = this.props.rowData
                                    return (
                                        <div key={i}>
                                            {item !== "tableData" &&
                                            <div style={{display:"flex"}}>
                                                <MDBTypography style={{fontWeight:"bold",marginRight:"20px"} }>
                                                    {item} : 
                                                </MDBTypography>
                                                <MDBTypography>
                                                    {rowDataNew[item]}
                                                </MDBTypography>
                                                </div>

                                            }
                                        </div>
                                    )
                                })}
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={() => this.props.dispatch(setShowUserDataModal({ selected: false }))}>
                                    Close
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div>
        );
    }
}
export default connect(mapStateToProps)(UserDataModal);


import { IconButton } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { setListUsers, setShowUserDataModal } from '../../../redux/users/userSlice';
import AddUser from './add-user';
import CountrySelect from './nationality-drop-down';
import UserDataModal from './user-data-modal';

const mapStateToProps = (state) => ({
    usersList: state.userSlice.usersList,
    isShowUserDataModal: state.userSlice.isShowUserDataModal,

});
class TableUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableIcons: {
                Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                Check: forwardRef((props, ref) => <Check {...props} color="primary" ref={ref} />),
                Clear: forwardRef((props, ref) => <Clear {...props} color="error" ref={ref} />),
                Delete: forwardRef((props, ref) => <DeleteOutline color="error" {...props} ref={ref} />),
                DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                Edit: forwardRef((props, ref) => <Edit color="primary"{...props} ref={ref} />),
                Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
                Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
                FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
                ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
            },
            showModalUserData: "",
            columns:
                [
                    { title: 'First Name', field: 'firstName' },
                    { title: 'Last Name', field: 'lastName' },
                    {
                        title: "From",
                        field: "nationality",
                        editComponent: ({ value, onChange }) => (
                            <div key={value}>
                                <CountrySelect
                                    value={value}
                                    onChange={newValue=>onChange(newValue.label)} />
                            </div>

                        )
                    },
                    { title: 'Phone Number', field: 'phoneNumber' },
                    { title: 'Last Month Bill', field: 'lastMonthBill' },


                ],
            //dont freez redux toolkit
            data: structuredClone(this.props.usersList)
        }
    }
    onChangeToggle = () => this.setState({ showAddUserModal: !this.state.showAddUserModal });

    render() {
        return (
            <div style={{ marginBottom: "3%" }}>
                <AddUser />
                <UserDataModal />
                <MaterialTable
                    icons={this.state.tableIcons}
                    title="Users Data"
                    columns={
                        [
                            {
                                title: "View Row",
                                render: (rowData) => {
                                    const button = (
                                        <IconButton
                                            color="inherit"
                                            onClick={() => {
                                                this.props.dispatch(setShowUserDataModal({ selected: true, rowData }))
                                            }}
                                        >
                                            <VisibilityIcon color="warning" />
                                        </IconButton>
                                    );
                                    return button;
                                }
                            },
                            ...this.state.columns,
                        ]}
                    data={structuredClone(this.props.usersList)}

                    options={{
                        actionsColumnIndex: -1
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...this.state.data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    this.props.dispatch(setListUsers([...dataUpdate]))
                                    this.setState({ data: [...dataUpdate] })
                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...this.state.data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    this.props.dispatch(setListUsers([...dataDelete]))
                                    this.setState({ data: [...dataDelete] })
                                    resolve()
                                }, 1000)
                            }),
                    }
                    }
                />
            </div>
        )

    }

}

export default connect(mapStateToProps)(TableUsers);






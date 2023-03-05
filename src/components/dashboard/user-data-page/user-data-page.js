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
import { Autocomplete, Box, TextField } from '@mui/material';
import MaterialTable from 'material-table';
import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { setUsersData } from '../../../redux/users/userLoggedInSlice';

const mapStateToProps = (state) => ({
    userLoggedIn: state.userLoggedInSlice.userLoggedIn,
    usersData: state.userLoggedInSlice.usersData,
});
const roleList = [
    { value: "user", label: "user" },
    { value: "admin", label: "admin" },
    { value: "monitor", label: "monitor" }
]
class UserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            data: this.props.usersData,
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
        }
    }

    render() {
        return (
            <div style={{ borderRadius: "12px" }}>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        title="Editable Preview"
                        icons={this.state.tableIcons}

                        columns={[
                            { title: "Name", field: "name" },
                            { title: "Password", field: "password" },
                            {
                                title: "Role",
                                field: "role",
                                editComponent: ({ value, onChange }) => (
                                    <Autocomplete
                                        sx={{ width: "50%" }}
                                        options={roleList}
                                        value={value}
                                        onChange={(event, newValue) => {
                                            onChange(newValue.label)
                                        }}
                                        autoHighlight
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                                {option.label}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Choose a role"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />


                                )
                            }

                        ]}
                        data={structuredClone(this.state.data)}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        this.setState({ data: [...this.state.data, newData] });
                                        this.props.dispatch(setUsersData([...this.state.data, newData]))

                                        resolve();
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...this.state.data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        this.setState({ data: [...dataUpdate] });
                                        this.props.dispatch(setUsersData([...dataUpdate]))

                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...this.state.data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        this.setState({ data: [...dataDelete] });
                                        this.props.dispatch(setUsersData([...dataDelete]))
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(UserData);





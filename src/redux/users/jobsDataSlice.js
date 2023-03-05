import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
export const employeesData = [
    {
        id: '1',
        type: 'employee 1',
        isEmployee: true
    },
    {
        id: '2',
        type: 'employee 2',
        isEmployee: true
    },
    {
        id: '3',
        type: 'employee 3',
        isEmployee: true
    },
    {
        id: '4',
        type: 'employee 4',
        isEmployee: true
    },
    {
        id: '5',
        type: 'employee 5',
        isEmployee: true
    },
];
export const carsData = [
    {
        id: '6',
        type: 'car 1',
        isCar: true
    },
    {
        id: '7',
        type: 'car 2',
        isCar: true
    },
    {
        id: '8',
        type: 'car 3',
        isCar: true
    },
    {
        id: '9',
        type: 'car 4',
        isCar: true

    },
    {
        id: '10',
        type: 'car 5',
        isCar: true
    },
];
export const jobsDataSlice = createSlice({
    name: "jobsDataSlice",
    initialState: {
        columnsData: {
            [uuidv4()]: {
                title: 'Employees',
                items: employeesData,
            },
            [uuidv4()]: {
                title: 'Job1',
                items: [],
            },
            [uuidv4()]: {
                title: 'Job2',
                items: [],
            },
            [uuidv4()]: {
                title: 'Job3',
                items: [],
            },
            [uuidv4()]: {
                title: 'Job4',
                items: [],
            },
            [uuidv4()]: {
                title: 'Job5',
                items: [],
            },
            [uuidv4()]: {
                title: 'Cars',
                items: carsData,
            },
        },
    },
    reducers: {
        setColumnsData: (state, action) => {
            state.columnsData = action.payload
        },
    },
});

export const { setColumnsData } = jobsDataSlice.actions;
export default jobsDataSlice.reducer;

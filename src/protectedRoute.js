import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userName, children }) => {
    const isLoggedIn = useSelector(state => state.userLoggedInSlice.userLoggedIn);
    if (userName && isLoggedIn) {
        return children;

    }
    return <Navigate to="/" replace />;
};
export default ProtectedRoute;
import Cookies from "js-cookie";
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Analytics from './components/dashboard/analytics-page/analytics-page';
import Dashboard from './components/dashboard/dashboard/dashboard';
import JobsDetails from './components/dashboard/jobs-details/jobs-details';
import TableUsers from './components/dashboard/table-users-page/table-users-page';
import UserData from './components/dashboard/user-data-page/user-data-page';
import LogInPage from './components/log-in-page/log-in-page';
import ProtectedRoute from './protectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="dashboard/:userName" element=
            {
              <ProtectedRoute userName={Cookies.get('userName')}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<TableUsers />} />
            <Route path="jobsDetails" element={<JobsDetails />} />
            <Route path="userdata" element={<UserData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


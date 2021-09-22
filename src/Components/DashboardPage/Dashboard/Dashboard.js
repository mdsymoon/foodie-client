import React from 'react';
import DashboardAppBar from '../DashboardAppBar/DashboardAppBar';
import Navigation from './../../HomePage/Navigation/Navigation';
import { Route } from 'react-router-dom';
import AddProduct from './../AddProduct/AddProduct';

const Dashboard = () => {
    return (
        <div >
            
            <DashboardAppBar></DashboardAppBar>
            <Route path="/dashboard/addProduct">
                <AddProduct></AddProduct>
            </Route>
        </div>
    );
};

export default Dashboard;
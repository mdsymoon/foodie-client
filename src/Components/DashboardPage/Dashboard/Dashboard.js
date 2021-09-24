import React from 'react';
import DashboardAppBar from '../DashboardAppBar/DashboardAppBar';
import { Route } from 'react-router-dom';
import AddProduct from './../AddProduct/AddProduct';
import OrderItem from '../OrderItem/OrderItem';
import AllItem from '../AllItem/AllItem';

const Dashboard = () => {
    return (
        <div >
            
            <DashboardAppBar></DashboardAppBar>
            <Route path="/dashboard/addProduct">
                <AddProduct></AddProduct>
            </Route>
            <Route path="/dashboard/orderItem">
                <OrderItem></OrderItem>
            </Route>
            <Route path="/dashboard/allItem">
                <AllItem></AllItem>
            </Route>
        </div>
    );
};

export default Dashboard;
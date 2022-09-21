import React from 'react';
import DashboardAppBar from '../DashboardAppBar/DashboardAppBar';
import { Route } from 'react-router-dom';
import AddProduct from './../AddProduct/AddProduct';
import OrderItem from '../OrderItem/OrderItem';
import AllItem from '../AllItem/AllItem';
import { UserContext } from '../../../App';
import { useContext } from 'react';

const Dashboard = () => {
    const [loggedInUser] = useContext(UserContext);

    return (
        <div >
            
            <DashboardAppBar></DashboardAppBar>
            <Route path="/dashboard/orderItem">
                <OrderItem></OrderItem>
            </Route>
            <Route path="/dashboard/addProduct">
                <AddProduct></AddProduct>
            </Route>
            <Route path="/dashboard/allItem">
                <AllItem></AllItem>
            </Route>
        </div>
    );
};

export default Dashboard;
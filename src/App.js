import React, {Component} from 'react';
// import {Link, Switch, Route, Redirect} from 'react-router-dom';
import { Link, Switch,Router, Route, browserHistory, Redirect } from 'react-router';
import {Container} from 'reactstrap';
import Header from './common/Layouts/Header/';
import Sidebar from './common/Layouts/Sidebar/';
import Breadcrumb from './common/Layouts/Breadcrumb/';
import Aside from './common/Layouts/Aside/';
import Footer from './common/Layouts/Footer/';
import Login from './pages/Login/Login.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Product from './pages/ManageProduct/ProductDetails.js';
import Appointment from './pages/Appointment/Appointment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Register from './pages/Register/Register.js';

import Experiences from './pages/Experiences/Experiences.js';
import Items from './pages/Items/Items.js';
import Users from './pages/Users/Users.js';
import PromoCode from './pages/PromoCode/PromoCode.js';

class Full extends Component {
    render() {

        var path = window.location.href;
        var n = path.indexOf("/product");
        var m = path.indexOf("/appointment");
        var p = path.indexOf("/login");
        var q = path.indexOf("/register");


        if( p > -1 || q > -1 || n > -1 || m > -1 ){
            return (
                <Container fluid>
                    <Switch>
                        <Route path ="/login" name="Login" component={Login}/>
                        <Route path ="/register" name="Register" component={Register}/>
                        <Route path="/product" name="Product" component={Product}/>

                        <MuiThemeProvider>
                            <Route path="/appointment" name="Appointment" component={Appointment}/>
                        </MuiThemeProvider>
                    </Switch>
                </Container>
            );
        }

        else{
            return (
                <div className="app">
                    <Header />
                    <div className="app-body">
                        <Sidebar {...this.props}/>
                        <main className="main">
                            <Breadcrumb />
                            <Container fluid>
                                <Switch>
                                    <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                    <Route path="/experiences" name="Experiences" component={Experiences}/>
                                    <Route path="/items" name="Items" component={Items}/>
                                    <Route path="/users" name="Users" component={Users}/>
                                    <Route path="/promoCode" name="PromoCode" component={PromoCode}/>



                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>

                            </Container>
                        </main>
                        <Aside />
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

export default Full;
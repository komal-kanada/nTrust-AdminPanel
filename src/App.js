import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import {Container} from 'reactstrap';
import Header from './common/Layouts/Header/';
import Sidebar from './common/Layouts/Sidebar/';
import Aside from './common/Layouts/Aside/';
import Footer from './common/Layouts/Footer/';
import Login from './pages/Login/Login.js';
import Product from './pages/ManageProduct/ProductDetails.js';
import Appointment from './pages/Appointment/Appointment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Register from './pages/Register/Register.js';
import ExperienceForm from './pages/Experiences/ExperienceForm.js';
import Experiences from './pages/Experiences/Experiences.js';
import Items from './pages/Items/Items.js';
import ItemsForm from './pages/Items/ItemsForm.js';
import Users from './pages/Users/Users.js';
import PromoCode from './pages/PromoCode/PromoCode.js';
import PromoCodeForm from './pages/PromoCode/PromoCodeForm.js';

class Full extends Component {
    render() {

        var path = window.location.href;
        var p = path.indexOf("/login");
        var q = path.indexOf("/register");


        if( p > -1 || q > -1 ){
            return (
                <Container fluid>
                    <Switch>
                        <Route path ="/login" name="Login" component={Login}/>
                        <Route path ="/register" name="Register" component={Register}/>
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
                            <Container fluid>
                                <Switch>
                                    <Route path="/experiences" name="Experiences" component={Experiences}/>
                                    <Route path='/experienceForm' name='Experience Form' component={ExperienceForm}/>
                                    <Route path='/experienceForm/:_id' name='Experience Form' component={ExperienceForm}/>
                                    <Route path="/items" name="Items" component={Items}/>
                                    <Route path='/itemsForm/:_id' name='Items Form' component={ItemsForm}/>
                                    <Route path="/users" name="Users" component={Users}/>
                                    <Route path="/promoCode" name="PromoCode" component={PromoCode}/>
                                    <Route path='/promoCodeForm/:_id' name='Promo Code Form' component={PromoCodeForm}/>
                                    <Redirect from="/" to="/login"/>
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
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import {Container} from 'reactstrap';
import Header from './common/Layouts/Header/';
import Sidebar from './common/Layouts/Sidebar/';
import Aside from './common/Layouts/Aside/';
import Footer from './common/Layouts/Footer/';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import ExperienceForm from './pages/Experiences/ExperienceForm.js';
import Experiences from './pages/Experiences/Experiences.js';
import Items from './pages/Items/Items.js';
import Users from './pages/Users/Users.js';
import ItemList from './pages/Users/ItemList.js';
import PromoCode from './pages/PromoCode/PromoCode.js';
import PromoCodeForm from './pages/PromoCode/PromoCodeForm.js';
import ItemsForm from "./pages/Items/ItemsForm";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                              
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                          
                                {/* <MuiThemeProvider > */}
                                    <Route path="/experiences" name="Experiences" component={Experiences}/>
                                
                                    <Route path='/experienceForm/edit/:_id' name='ExperienceFormEdit' component={ExperienceForm}/>

                                    <Route path='/experienceForm/add' name='ExperienceFormAdd' component={ExperienceForm}/>
                                    {/* </MuiThemeProvider>    */}
                                  

                                    <Route path="/items" name="Items" component={Items}/>
                                    <Route path='/itemsForm/edit/:_id' name='ItemsFormEdit' component={ItemsForm}/>
                                    <Route path='/itemsForm/add' name='ItemsFormAdd' component={ItemsForm}/>

                                    <Route path="/users" name="Users" component={Users}/>

                                    <Route path='/itemList/:_id' name='ItemList' component={ItemList}/>

                                    <Route path="/promoCode" name="PromoCode" component={PromoCode}/>
                                    
                                    <Route path='/promoCodeForm/edit/:_id' name='PromoCodeFormEdit' component={PromoCodeForm}/>
                                    
                                    <Route path='/promoCodeForm/add' name='PromoCodeFormAdd' component={PromoCodeForm}/>
                                    

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
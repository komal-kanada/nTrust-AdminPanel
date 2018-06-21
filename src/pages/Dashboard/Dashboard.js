import React, {Component} from 'react';
import {AsyncStorage} from 'AsyncStorage';

class Dashboard extends Component {

    componentWillMount = async () => {
        if (await AsyncStorage.getItem('Login') === undefined || JSON.parse(await AsyncStorage.getItem('Login')).token === '') {
            this.props.history.push({pathname: `/login`});
        }
    };

    render() {
        return (

            <div className="animated fadeIn dashboard-img">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="img/image/events.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/gaming.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/inthewater.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/onwheels.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/outdoors.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/parenting.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/projects.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/thelens.png"/>
                        </div>

                        <div className="col-md-4">
                            <img src="img/image/time.png"/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Dashboard;

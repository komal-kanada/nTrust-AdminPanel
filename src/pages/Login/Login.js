import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
import API from "../../utils/AppUtil";
import {AsyncStorage} from 'AsyncStorage';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: 'admin',
            password: 'admin123'
        };

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    _login = async () => {
        if (
            this.state.userName !== '' &&
            this.state.userName.trim() !== '' &&
            this.state.password !== '' &&
            this.state.password.trim() !== ''
        ) {
            let data = {
                adminname: this.state.userName,
                password: this.state.password
            };
            API.Login(data)
                .then((resp) => {
                    if (resp.Error === false) {
                        AsyncStorage.setItem('Login', JSON.stringify(resp.Data));
                        this.props.history.push({pathname: `/experiences`});
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            alert('Please enter all values')
        }
    };

    handleChangeUserName(event) {
        this.setState({
            userName: event.target.value,
        });
    };

    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Login</h1>

                                        <p className="text-muted">Sign In to your account</p>

                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"/>
                                                </span>
                                            </div>

                                            <Input
                                                type="text"
                                                placeholder="Username"
                                                value={this.state.userName}
                                                onChange={this.handleChangeUserName}
                                                required
                                            />
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-lock"/>
                                                </span>

                                            </div>

                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.handleChangePassword}
                                                required
                                            />
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4"
                                                        onClick={this._login}>Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>If not a user already.. Register!</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active>Register Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;

import React, {Component} from 'react'
import API from "../../utils/AppUtil";
import {Row, Col, Card, CardBody, FormGroup, Label} from 'reactstrap';
import {Link} from 'react-router-dom';

class ItemsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            name: '',
            icon: '',
            expId: '',
            experiences: [{_id: 'aa', name: 'aa'}],
            modalType: '',
            value: '',
            validateName: '',
            validateValue: '',
            disableSubmit: true,
            disableCancel: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIcon = this.handleChangeIcon.bind(this);
        this.handleChangeExpId = this.handleChangeExpId.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount() {
        this._getExperience();
        const {_id} = this.props.match.params;
        if (_id !== '' && _id !== undefined && _id !== null) {
            API.ItemList()
                .then((response) => {
                    response.Data.map((value) => {
                        if (value._id === _id) {
                            this.setState({
                                name: value.name,
                                _id: value._id,
                                icon: value.icon,
                                expId: value.expId._id,
                                value: value.value,
                                modalType: 'edit',
                                disableSubmit: false
                            });
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else {
            this.setState({
                modalType: 'add'
            });
        }
    }

    _getExperience = () => {
        API.ExperienceList()
            .then((response) => {
                this.setState({
                    experiences: response.Data,
                    expId: response.Data[0]._id
                });
            })
            .catch((err) => {
                console.log(err)
            })
    };

    _submit = (e) => {
        e.preventDefault();
        this.setState({
            disableSubmit: true,
            disableCancel: true
        });
        if (this.state.modalType === 'edit') {
            if (this.state.name !== '' && this.state.name.trim() !== '' && this.state.icon !== '' && this.state.expId !== '') {
                let data = {
                    name: this.state.name,
                    expId: this.state.expId,
                    icon: this.state.icon,
                    subExpId: this.state._id,
                    value: this.state.value
                };
                API.EditItem(data)
                    .then(() => {
                        this.setState({
                            modalType: '',
                            _id: '',
                            name: '',
                            icon: '',
                            expId: '',
                            value: ''
                        });
                        this.props.history.push({pathname: `/items`});
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
            else {
                alert("Enter all values");
            }
        }
        else if (this.state.modalType === 'add') {
            if (this.state.name !== '' && this.state.name.trim() !== '' && this.state.icon !== '' && this.state.expId !== '') {
                let data = {
                    name: this.state.name,
                    icon: this.state.icon,
                    expId: this.state.expId,
                    value: this.state.value
                };
                API.AddItem(data)
                    .then(() => {
                        this.setState({
                            modalType: '',
                            _id: '',
                            name: '',
                            icon: '',
                            expId: '',
                            value: ''
                        });
                        this.props.history.push({pathname: `/items`});
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                alert("Enter all values");
            }
        }
    };

    handleChangeName(event) {
        const check = /^\s*$/;
        if(!check.test(event.target.value)){
            this.setState({
                name: event.target.value,
                validateName: ''
            });
            if(
                this.state.name !== '' &&
                this.state.name.trim() !== '' &&
                this.state.icon !== '' &&
                this.state.expId !== ''
            ){
                this.setState({
                    disableSubmit: false
                })
            }
        }
        else if (this.state.name.length === 1) {
            this.setState({
                name: event.target.value,
                validateName: ''
            });
        }
        else {
            this.setState({
                validateName: 'Enter value'
            })
        }
    };

    handleChangeIcon(event) {
        this.setState({
            icon: event.target.files[0],
        });
        setTimeout(() => {
            if(
                this.state.name !== '' &&
                this.state.name.trim() !== '' &&
                this.state.icon !== '' &&
                this.state.expId !== ''
            ){
                this.setState({
                    disableSubmit: false
                })
            }
        }, 10);
    };

    handleChangeExpId(event) {
        this.setState({expId: event.target.value});
        if(
            this.state.name !== '' &&
            this.state.name.trim() !== '' &&
            this.state.icon !== '' &&
            this.state.expId !== ''
        ){
            this.setState({
                disableSubmit: false
            })
        }
    };

    handleChangeValue(event) {
        const check = /^[0-9]*$/;
        if(check.test(event.target.value)){
            this.setState({
                value: event.target.value,
                validateValue: ''
            });
            if(
                this.state.name !== '' &&
                this.state.name.trim() !== '' &&
                this.state.icon !== '' &&
                this.state.expId !== ''
            ){
                this.setState({
                    disableSubmit: false
                })
            }
        }
        else {
            this.setState({
                validateValue: 'Enter only numbers'
            })
        }
    };

    _cancel = () => {
        this.setState({
            modalType: '',
            name: '',
            expHeader: '',
            expSubHeader: ''
        })
    };

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
                                <form onSubmit={this._submit} encType='multipart/form-data'>
                                    <div className="form_Items">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input"><h5>Name:</h5></Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Label>
                                                    <input
                                                        type="text"
                                                        value={this.state.name}
                                                        onChange={this.handleChangeName}
                                                        required="true"
                                                    />
                                                    <div style={{fontSize: 10, color: 'red', paddingTop: 5}}>{this.state.validateName}</div>
                                                </Label>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label><h5>Icon:</h5></Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Label> <input
                                                    type="file"
                                                    name="icon"
                                                    onChange={this.handleChangeIcon}
                                                />
                                                </Label>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label><h5>Item Value:</h5></Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Label>
                                                    <input
                                                        type="text"
                                                        name="value"
                                                        value={this.state.value}
                                                        onChange={this.handleChangeValue}
                                                        required="true"
                                                    />
                                                    <div style={{fontSize: 10, color: 'red', paddingTop: 5}}>{this.state.validateValue}</div>
                                                </Label>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label><h5>Experience:</h5></Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Label>
                                                    <select
                                                        name="expId"
                                                        value={this.state.expId}
                                                        onChange={this.handleChangeExpId}
                                                    >
                                                        {
                                                            this.state.experiences.map((val) => {
                                                                return <option value={val._id}>{val.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </Label>
                                            </Col>
                                        </FormGroup>
                                        <div>
                                            <Link to='/items'>
                                                <button className="btn-bck" onClick={this._cancel} disabled={this.state.disableCancel}>
                                                    Cancel
                                                </button>
                                            </Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <input className="btn-bck" type="submit" value="Submit" disabled={this.state.disableSubmit}/>
                                        </div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ItemsForm;
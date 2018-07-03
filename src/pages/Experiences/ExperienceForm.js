import React, {Component} from 'react';
import API from "../../utils/AppUtil";
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody, FormGroup, Label, Input} from 'reactstrap';

class ExperienceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            expHeader: '',
            expSubHeader: '',
            _id: '',
            modalType: '',
            validateName: '',
            validateExpHeader: '',
            validateSubExpHeader: '',
            disableSubmit: true,
            disableCancel: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeHeader = this.handleChangeHeader.bind(this);
        this.handleChangeSubHeader = this.handleChangeSubHeader.bind(this);
        this._submit = this._submit.bind(this);
        this._cancel = this._cancel.bind(this);
    };

    componentWillMount() {
        const {_id} = this.props.match.params;
        if (_id !== '' && _id !== undefined && _id !== null) {
            API.ExperienceList()
                .then((response) => {
                    response.Data.map((value) => {
                        if (value._id === _id) {
                            this.setState({
                                name: value.name,
                                _id: value._id,
                                expHeader: value.expHeader,
                                expSubHeader: value.expSubHeader,
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

    _submit = (e) => {
        e.preventDefault();
        this.setState({
            disableSubmit: true,
            disableCancel: true
        });
        if (this.state.modalType === 'edit') {
            let data = {
                name: this.state.name,
                header: this.state.expHeader,
                subheader: this.state.expSubHeader,
                expId: this.state._id
            };
            API.EditExperience(data)
                .then(() => {
                    this.setState({
                        modalType: '',
                        _id: '',
                        name: '',
                        expHeader: '',
                        expSubHeader: ''
                    });
                    this.props.history.push({pathname: `/experiences`});
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if (this.state.modalType === 'add') {
            if (
                this.state.name !== '' &&
                this.state.name.trim() !== '' &&
                this.state.expHeader !== '' &&
                this.state.expSubHeader !== ''
            ) {
                let data = {
                    "name": this.state.name,
                    'header': this.state.expHeader,
                    'subheader': this.state.expSubHeader
                };
                API.AddExperience(data)
                    .then((resp) => {
                        this.setState({
                            modalType: '',
                            name: '',
                            expHeader: '',
                            expSubHeader: ''
                        });
                        this.props.history.push({pathname: `/experiences`});
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else {
                alert("Enter all values")
            }
        }
    };

    handleChangeName(event) {
        const check = /^\s*$/;
        if (!check.test(event.target.value)) {
            this.setState({
                name: event.target.value,
                validateName: ''
            });
            if (this.state.name !== '' &&
                this.state.name.trim() !== '' &&
                this.state.expHeader !== '' &&
                this.state.expSubHeader !== ''
            ) {
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
                validateName: 'Enter values'
            })
        }
    };

    handleChangeHeader(event) {
        let file_list = event.target.files;

        for (let i = 0, file; file = file_list[i]; i++) {
            let sFileName = file.name;
            let sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();

            if (
                sFileExtension === "jpeg" ||
                sFileExtension === "tiff" ||
                sFileExtension === "bmp" ||
                sFileExtension === "jpg" ||
                sFileExtension === "png"
            ) {
                this.setState({
                    expHeader: event.target.files[0],
                    validateExpHeader: ''
                });
                setTimeout(() => {
                    if (
                        this.state.name !== '' &&
                        this.state.name.trim() !== '' &&
                        this.state.expHeader !== '' &&
                        this.state.expSubHeader !== ''
                    ) {
                        this.setState({
                            disableSubmit: false
                        })
                    }
                }, 10);
            }
            else {
                this.setState({
                    expHeader: '',
                    validateExpHeader: 'Please Enter Valid Image',
                });
                alert('Please upload image of extension .jpg, .tiff, .bmp, .jpeg or .png');
            }
        }
    }

    handleChangeSubHeader(event) {
        let file_list = event.target.files;

        for (let i = 0, file; file = file_list[i]; i++) {
            let sFileName = file.name;
            let sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
            if (
                sFileExtension === "jpeg" ||
                sFileExtension === "tiff" ||
                sFileExtension === "bmp" ||
                sFileExtension === "jpg" ||
                sFileExtension === "png"
            ) {
                this.setState({
                    expSubHeader: event.target.files[0],
                    validateExpSubHeader: ''
                });
                setTimeout(() => {
                    if (
                        this.state.name !== '' &&
                        this.state.name.trim() !== '' &&
                        this.state.expHeader !== '' &&
                        this.state.expSubHeader !== ''
                    ) {
                        this.setState({
                            disableSubmit: false,
                            validateSubExpHeader: ''
                        })
                    }
                }, 10);
            }
            else {
                this.setState({
                    expSubHeader: '',
                    validateSubExpHeader: 'Please Enter Valid Image',
                });
                alert('Please upload image of extension .jpg, .tiff, .bmp, .jpeg or .png');
            }
        }
    }

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
                                    <div className="form">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">
                                                    <h5>Name:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <input
                                                    type="text"
                                                    value={this.state.name}
                                                    onChange={this.handleChangeName}
                                                />

                                                <div style={{fontSize: 10, color: 'red', paddingTop: 5}}>
                                                    {this.state.validateName}
                                                </div>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="file-input">
                                                    <h5>Header:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Input
                                                    type="file"
                                                    name="expHeader"
                                                    onChange={this.handleChangeHeader}
                                                    style={{
                                                        color: (this.state.expHeader === '') ? 'transparent' : 'black'
                                                    }}
                                                />

                                                <div style={{fontSize: 10, color: 'red', paddingTop: 5}}>
                                                    {this.state.validateExpHeader}
                                                </div>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="file-multiple-input">
                                                    <h5>Sub-Header:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Input
                                                    type="file"
                                                    name="expSubHeader"
                                                    onChange={this.handleChangeSubHeader}
                                                    style={{
                                                        color: (this.state.expSubHeader === '') ? 'transparent' : 'black'
                                                    }}
                                                />

                                                <div style={{fontSize: 10, color: 'red', paddingTop: 5}}>
                                                    {this.state.validateSubExpHeader}
                                                </div>
                                            </Col>
                                        </FormGroup>
                                    </div>

                                    <div style={{paddingTop: 20, paddingLeft: 270}}>
                                        <Link to='/experiences'>
                                            <button
                                                className="btn-bck"
                                                onClick={this._cancel}
                                                disabled={this.state.disableCancel}
                                            > Cancel
                                            </button>
                                        </Link>

                                        &nbsp;&nbsp;&nbsp;

                                        <input
                                            className="btn-bck"
                                            type="submit"
                                            value="Submit"
                                            disabled={this.state.disableSubmit}
                                        />
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ExperienceForm);
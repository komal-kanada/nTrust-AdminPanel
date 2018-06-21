import React, {Component} from 'react'
import API from "../../utils/AppUtil";
import {Row, Col, Card, CardBody, FormGroup, Label} from 'reactstrap';
import {Link} from 'react-router-dom';

class PromoCodeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promoCode: '',
            disPrice: '',
            subExpId: '',
            subExperience: [{_id: 'aa', name: 'aa'}],
            _id: '',
            modalType: '',
            validateName: '',
            validateDisPrice: '',
            disableSubmit: true,
            disableCancel: false
        };

        this.handleChangePromoCode = this.handleChangePromoCode.bind(this);
        this.handleChangeDisPrice = this.handleChangeDisPrice.bind(this);
        this.handleChangeSubExpId = this.handleChangeSubExpId.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount() {
        this._getSubExperience();
        const {_id} = this.props.match.params;
        if (_id !== '' && _id !== undefined && _id !== null) {
            API.PromoCodeList()
                .then((response) => {
                    response.Data.map((value) => {
                        if (value._id === _id) {
                            this.setState({
                                promoCode: value.promocode,
                                _id: value._id,
                                disPrice: value.disPrice,
                                subExpId: value.subExp_id._id,
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
                modalType: 'add',
            });
        }
    }

    _getSubExperience = () => {
        API.ItemList()
            .then((response) => {
                this.setState({
                    subExperience: response.Data,
                    subExpId: response.Data[0]._id
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
            let data = {
                disPrice: this.state.disPrice,
                subExp_id: this.state.subExpId,
                promocode: this.state.promoCode,
                promocodeId: this.state._id
            };
            API.EditPromoCode(data)
                .then(() => {
                    this.setState({
                        promoCode: '',
                        disPrice: '',
                        subExpId: '',
                        _id: '',
                        modalType: '',
                    });
                    this.props.history.push({pathname: `/promoCode`});
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if (this.state.modalType === 'add') {
            if (
                this.state.disPrice !== '' &&
                this.state.disPrice.trim() !== '' &&
                this.state.subExpId !== '' &&
                this.state.promoCode.trim() !== '' &&
                this.state.promoCode !== '') {
                let data = {
                    disPrice: this.state.disPrice.trim(),
                    subExp_id: this.state.subExpId,
                    promocode: this.state.promoCode,
                };
                API.AddPromoCode(data)
                    .then(() => {
                        this.props.history.push({pathname: `/promoCode`});
                        this.setState({
                            promoCode: '',
                            disPrice: '',
                            subExpId: '',
                            _id: '',
                            modalType: '',
                        });
                        this.props.history.push({pathname: `/promoCode`});
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    };

    handleChangePromoCode(event) {
        const check = /^[a-zA-Z0-9]*$/;
        if (check.test(event.target.value)) {
            this.setState({
                promoCode: event.target.value,
                validateName: ''
            });
            if (
                this.state.disPrice !== '' &&
                this.state.disPrice.trim() !== '' &&
                this.state.subExpId !== '' &&
                this.state.subExpId.trim() !== '' &&
                this.state.promoCode !== ''
            ) {
                this.setState({
                    disableSubmit: false
                })
            }
        }
        else {
            this.setState({
                validateName: 'Enter numbers or alphabets'
            })
        }
    };

    handleChangeDisPrice(event) {
        const check = /^[0-9]*$/;
        if (check.test(event.target.value)) {
            this.setState({
                disPrice: event.target.value,
                validateDisPrice: ''
            });
            if (
                this.state.disPrice !== '' &&
                this.state.disPrice.trim() !== '' &&
                this.state.subExpId !== '' &&
                this.state.subExpId.trim() !== '' &&
                this.state.promoCode !== ''
            ) {
                this.setState({
                    disableSubmit: false
                })
            }
        }
        else {
            this.setState({
                validateDisPrice: 'Enter only numbers'
            })
        }
    };

    handleChangeSubExpId(event) {
        this.setState({subExpId: event.target.value, validateSubExpId: ''});
        if (
            this.state.disPrice !== '' &&
            this.state.disPrice.trim() !== '' &&
            this.state.subExpId !== '' &&
            this.state.subExpId.trim() !== '' &&
            this.state.promoCode !== ''
        ) {
            this.setState({
                disableSubmit: false,
                validateDisPrice: ''
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
                                    <div className="form_promo">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>
                                                    <h5>Name:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={this.state.promoCode}
                                                        onChange={this.handleChangePromoCode}
                                                        required="true"
                                                    />

                                                    <div
                                                        style={{
                                                            fontSize: 10,
                                                            color: 'red',
                                                            paddingTop: 5
                                                        }}
                                                    >
                                                        {this.state.validateName}
                                                    </div>
                                                </Label>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>
                                                    <h5>Discount Price:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Label>
                                                    <input
                                                        type="text"
                                                        name="disPrice"
                                                        value={this.state.disPrice}
                                                        onChange={this.handleChangeDisPrice}
                                                        required="true"
                                                    />

                                                    <div
                                                        style={{
                                                            fontSize: 10,
                                                            color: 'red',
                                                            paddingTop: 5
                                                        }}
                                                    >
                                                        {this.state.validateDisPrice}
                                                    </div>
                                                </Label>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>
                                                    <h5>Sub-Experience:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <select name="subExpId" value={this.state.subExpId}
                                                        onChange={this.handleChangeSubExpId}>
                                                    {
                                                        this.state.subExperience.map((val) => {
                                                            return <option value={val._id}>{val.name}</option>
                                                        })
                                                    }
                                                </select>
                                            </Col>
                                        </FormGroup>

                                        <div>
                                            <Link to='/promoCode'>
                                                <button className="btn-bck" onClick={this._cancel}
                                                        disabled={this.state.disableCancel}>
                                                    Cancel
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

export default PromoCodeForm;
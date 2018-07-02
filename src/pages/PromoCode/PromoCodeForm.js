import React, {Component} from 'react'
import API from "../../utils/AppUtil";
import {Row, Col, Card, CardBody, FormGroup, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import DatePicker from 'react-date-picker';

class PromoCodeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promoCode: '',
            subExpId: '',
            subExperience: [{_id: 'aa', name: 'aa'}],
            _id: '',
            modalType: '',
            validateName: '',
            fromDate: 'Select Date',
            toDate: 'Select Date',
            disableSubmit: true,
            disableCancel: false
        };

        this.handleChangePromoCode = this.handleChangePromoCode.bind(this);
        this.handleChangeSubExpId = this.handleChangeSubExpId.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount = async () => {
        await API.ItemList()
            .then((response) => {
                this.setState({
                    subExperience: response.Data,
                    subExpId: response.Data[0]._id
                });
            })
            .catch((err) => {
                console.log(err)
            });

        const {_id} = this.props.match.params;
        if (_id !== '' && _id !== undefined && _id !== null) {
            API.PromoCodeList()
                .then((response) => {
                    response.Data.map((value) => {
                        if (value._id === _id) {
                            this.setState({
                                promoCode: value.promocode,
                                _id: value._id,
                                subExpId: value.subExp_id._id,
                                modalType: 'edit',
                                disableSubmit: false,
                                fromDate: new Date(value.from),
                                toDate: new Date(value.to)
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
    };

    _submit = (e) => {
        e.preventDefault();
        this.setState({
            disableSubmit: true,
            disableCancel: true
        });
        if (this.state.modalType === 'edit') {
            let data = {
                subExp_id: this.state.subExpId,
                promocode: this.state.promoCode,
                promocodeId: this.state._id,
                from: this.state.fromDate.valueOf(),
                to: this.state.toDate.valueOf(),
            };
            API.EditPromoCode(data)
                .then((resp) => {
                    if(resp.Error === true){
                        if(resp.Message === 'Promocode already exist.'){
                            alert('Please enter another PromoCode Name')
                        }
                    }
                    else{
                        this.props.history.push({pathname: `/promoCode`});
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if (this.state.modalType === 'add') {
            if (
                this.state.subExpId !== '' &&
                this.state.subExpId.trim() !== '' &&
                this.state.promoCode !== '' &&
                this.state.fromDate !== '' &&
                this.state.toDate !== ''
            ) {
                let data = {
                    subExp_id: this.state.subExpId,
                    promocode: this.state.promoCode,
                    from: this.state.fromDate.valueOf(),
                    to: this.state.toDate.valueOf(),
                };
                API.AddPromoCode(data)
                    .then((resp) => {
                        if(resp.Error === true){
                            if(resp.Message === 'Promocode already exist.'){
                                alert('Please enter another PromoCode Name');
                                this.setState({
                                    disableSubmit: true,
                                    disableCancel: false
                                });
                            }
                        }
                        else{
                            this.props.history.push({pathname: `/promoCode`});
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    };

    handleChangePromoCode = async (event) => {
        const check = /^[A-Z0-9]*$/;
        if (check.test(event.target.value)) {
            await this.setState({
                promoCode: event.target.value,
                validateName: ''
            });
            if (
                this.state.promoCode !== '' &&
                this.state.fromDate !== '' &&
                this.state.toDate !== '' &&
                this.state.promoCode.length === 8
            ) {
                this.setState({
                    disableSubmit: false
                })
            }
            else {
                this.setState({
                    validateName: 'and length should be 8 characters'
                })
            }
        }
        else{
            this.setState({
                validateName: 'Enter numbers or capital alphabets'
            })
        }
    };

    handleChangeSubExpId(event) {
        this.setState({subExpId: event.target.value, validateSubExpId: ''});
        if (
            this.state.subExpId !== '' &&
            this.state.subExpId.trim() !== '' &&
            this.state.promoCode !== '' &&
            this.state.fromDate !== '' &&
            this.state.toDate !== ''
        ) {
            this.setState({
                disableSubmit: false,
                validateDisPrice: ''
            })
        }
    };

    handleFromDateChange(date) {
        this.setState({fromDate: date});
        this.setState({fromDate: date});
        if (
            this.state.subExpId !== '' &&
            this.state.subExpId.trim() !== '' &&
            this.state.promoCode !== '' &&
            this.state.fromDate !== '' &&
            this.state.toDate !== ''
        ) {
            this.setState({
                disableSubmit: false,
                validateDisPrice: ''
            })
        }
    };

    handleToDateChange(date) {
        this.setState({toDate: date});
        this.setState({toDate: date});
        if (
            this.state.subExpId !== '' &&
            this.state.subExpId.trim() !== '' &&
            this.state.promoCode !== '' &&
            this.state.fromDate !== '' &&
            this.state.toDate !== ''
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
                                                    <h5>Items:</h5>
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

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>
                                                    <h5>Valid From:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Label>
                                                    <DatePicker
                                                        onChange={this.handleFromDateChange}
                                                        value={(this.state.fromDate === 'Select Date')? new Date() : new Date(this.state.fromDate)}
                                                        minDate={new Date()}
                                                        maxDate={(this.state.toDate === 'Select Date') ? '' : new Date(this.state.toDate)}
                                                    />
                                                </Label>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>
                                                    <h5>Valid To:</h5>
                                                </Label>
                                            </Col>

                                            <Col xs="12" md="9">
                                                <Label>
                                                    <DatePicker
                                                        onChange={this.handleToDateChange}
                                                        value={(this.state.toDate === 'Select Date')? new Date() : new Date(this.state.toDate)}
                                                        minDate={(this.state.fromDate === 'Select Date') ? new Date() : new Date(this.state.fromDate)}
                                                    />
                                                </Label>
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
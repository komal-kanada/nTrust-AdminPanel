import React, { Component } from 'react'
import API from "../../utils/AppUtil";

class PromoCodeForm extends Component {

    constructor(props){
        super(props);

        this.state={
            promoCode: '',
            disPrice:'',
            subExpId: '',
            subExperience: [{_id: 'aa', name: 'aa'}],
            _id: '',
            modalType: ''
        };

        this.handleChangePromoCode = this.handleChangePromoCode.bind(this);
        this.handleChangeDisPrice = this.handleChangeDisPrice.bind(this);
        this.handleChangeSubExpId = this.handleChangeSubExpId.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount(){
        this._getSubExperience();
        const { _id } = this.props.match.params;
        if(_id !== '' && _id !== undefined && _id !== null) {
            API.PromoCodeList()
                .then((response) => {
                    response.Data.map((value) => {
                        if(value._id === _id){
                            this.setState({
                                promoCode: value.promocode,
                                _id: value._id,
                                disPrice: value.disPrice,
                                subExpId: value.subExp_id._id,
                                modalType: 'edit'
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
        if(this.state.modalType === 'edit') {
            let data = {
                disPrice: this.state.disPrice,
                subExp_id: this.state.subExpId,
                promocode: this.state.promoCode,
                promocodeId: this.state._id
            };
            API.EditPromoCode(data)
                .then((resp) => {
                    this.setState({
                        promoCode: '',
                        disPrice:'',
                        subExpId: '',
                        _id: '',
                        modalType: ''
                    });
                    this.props.history.push({ pathname: `/promoCode`});
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if(this.state.modalType === 'add') {
            if(this.state.disPrice !== '' && this.state.subExpId !== '' && this.state.promoCode !== ''){
                let data = {
                    disPrice: this.state.disPrice,
                    subExp_id: this.state.subExpId,
                    promocode: this.state.promoCode,
                };
                API.AddPromoCode(data)
                    .then((resp) => {
                        this.setState({
                            promoCode: '',
                            disPrice:'',
                            subExpId: '',
                            _id: '',
                            modalType: ''
                        });
                        this.props.history.push({ pathname: `/promoCode`});
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            else{
                alert("Enter all values");
            }
        }
        else{
        }
    };

    handleChangePromoCode(event){
        this.setState({promoCode: event.target.value});
    };

    handleChangeDisPrice(event){
        this.setState({disPrice: event.target.value});
    };

    handleChangeSubExpId(event){
        this.setState({subExpId: event.target.value});
    };

    render(){
        return (
            <form onSubmit={this._submit} encType='multipart/form-data'>
                <label>
                    <h5>Name:</h5>
                    <input type="text" name="name" value={this.state.promoCode} onChange={this.handleChangePromoCode}/>
                </label>
                <label>
                    <h5>Discount Price:</h5>
                    <input type="text" name="disPrice" value={this.state.disPrice} onChange={this.handleChangeDisPrice}/>
                </label>
                <label>
                    <h5>Sub-Experience:</h5>
                    <select name="subExpId" value={this.state.subExpId} onChange={this.handleChangeSubExpId}>
                        {
                            this.state.subExperience.map((val) => {
                                return <option value={val._id}>{val.name}</option>
                            })
                        }
                    </select>
                </label>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

export default PromoCodeForm
import React, { Component } from 'react'
import API from "../../utils/AppUtil";

class ItemsForm extends Component {

    constructor(props){
        super(props);
        this.state={
            _id: '',
            name: '',
            icon: '',
            expId: '',
            experiences: [{_id: 'aa', name: 'aa'}],
            modalType: '',
            itemValue: '',
            updateImage: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIcon = this.handleChangeIcon.bind(this);
        this.handleChangeExpId = this.handleChangeExpId.bind(this);
        this.handleChangeItemValue = this.handleChangeItemValue.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount(){
        this._getExperience();
        console.log('edit');
        const { _id } = this.props.match.params;
        if(_id !== '' && _id !== undefined && _id !== null) {
            API.SubExperienceList()
                .then((response) => {
                    response.Data.map((value) => {
                        if(value._id === _id){
                            this.setState({
                                name: value.name,
                                _id: value._id,
                                icon: value.icon,
                                expId: value.expId._id,
                                modalType: 'edit'
                            });
                            console.log(this.state);
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else {
            console.log('add');
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
                console.log(this.state.expId)
            })
            .catch((err) => {
                console.log(err)
            })
    };


    _submit = (e) => {
        e.preventDefault();
        if(this.state.modalType === 'edit') {
            console.log('edit');
            let data = {
                    name: this.state.name,
                    expId: this.state.expId,
                    icon: this.state.icon,
                    subExpId: this.state._id
                };
            API.EditSubExperience(data)
                .then((resp) => {
                    console.log('resp' + resp);
                    this.setState({
                        modalType: '',
                        _id: '',
                        name: '',
                        icon: '',
                        expId: '',
                    });
                    this.props.history.push({ pathname: `/items`});
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if(this.state.modalType === 'add') {
            console.log('add');
            if(this.state.name !== '' && this.state.icon !== '' && this.state.expId !== ''){
                let data = {
                    name: this.state.name,
                    icon: this.state.icon,
                    expId: this.state.expId
                };
                API.AddSubExperience(data)
                    .then((resp) => {
                        console.log(JSON.stringify(resp.Data));
                        this.setState({
                            modalType: '',
                            _id: '',
                            name: '',
                            icon: '',
                            expId: '',
                        });
                        this.props.history.push({ pathname: `/items`});
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
            console.log('aaa')
        }
    };

    handleChangeName(event){
        this.setState({name: event.target.value});
    };

    handleChangeIcon(event){
        console.log(this.state.updateImage);
        this.setState({
            icon: event.target.files[0],
        });
        console.log(this.state.updateImage);
        setTimeout(() => {
            console.log(this.state)
        }, 10);
    };

    handleChangeExpId(event){
        this.setState({expId: event.target.value});
    };

    handleChangeItemValue(event){
        this.setState({itemValue: event.target.itemValue});

    }

    render(){
        return (
            <form onSubmit={this._submit} encType='multipart/form-data'>
                <label>
                    <h5>Name:</h5>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/>
                </label>
                <label>
                    <h5>Icon:</h5>
                    <input type="file" name="icon" onChange={this.handleChangeIcon}/>
                </label>
                <label>
                    <h5>Item Value:</h5>
                    <input type="text" name="itemValue" value={this.state.itemValue} onChange={this.handleChangeItemValue}/>
                </label>
                <label>
                    <h5>Experience:</h5>
                    <select name="expId" value={this.state.expId} onChange={this.handleChangeExpId}>
                        {
                            this.state.experiences.map((val) => {
                                return <option value={val._id}>{val.name}</option>
                            })
                        }
                    </select>
                </label>
                <div style={{paddingTop: 20, paddingLeft: 270}}>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

export default ItemsForm;
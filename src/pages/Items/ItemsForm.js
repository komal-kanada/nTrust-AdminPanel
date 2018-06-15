import React, { Component } from 'react'
import API from "../../utils/AppUtil";
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    Label,
    Input,
  
  } from 'reactstrap';

class ItemsForm extends Component {

    constructor(props){
        super(props);
        this.state={
            _id: '',
            name: '',
            icon: '',
            expId: '',
            experiences: [{_id: 'aa', name: 'aa'}],
            modalType: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIcon = this.handleChangeIcon.bind(this);
        this.handleChangeExpId = this.handleChangeExpId.bind(this);
       
    }

    componentWillMount(){
        this._getExperience();
        const { _id } = this.props.match.params;
        console.log(_id);
        if(_id !== '' && _id !== undefined && _id !== null) {
            API.SubExperienceList()
                .then((response) => {
                    response.Data.map((value) => {
                        if(value._id === _id){
                            this.setState({
                                name: value.name,
                                _id: value._id,
                                icon: value.icon,
                                expId: value.expId,
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
            console.log('add');
            this.setState({
                modalType: 'add'
            });
        }
    }

    _getExperience = () => {
        console.log('aaa');
        API.ExperienceList()
            .then((response) => {
                console.log(response);
                this.setState({
                    experiences: response.Data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };


    _submit = (e) => {
        e.preventDefault();
        if(this.state.modalType === 'edit') {
            console.log(this.state);
            let data = {
                name: this.state.name,
                expId: this.state.expId,
                icon: this.state.icon,
                subExpId: this.state._id
            };
            console.log('data ' + JSON.stringify(data));
            API.EditSubExperience(data)
                .then((resp) => {
                    console.log(resp);
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
        this.setState({icon: event.target.files[0]});
        setTimeout(() => {
            console.log(this.state)
        }, 10);
    };

    handleChangeExpId(event){
        this.setState({expId: event.target.value});
    };

    render(){
        return (
            <form onSubmit={this._submit} encType='multipart/form-data'>
              <div className="form_Items">
              <FormGroup row>
                <Col md="3">
                    <Label  htmlFor="text-input"> <h5>Name:</h5></Label>
                </Col>
                <Col xs="12" md="9">
                    <Label>  <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                    </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                    <Col md="3">  
                        <Label><h5>Icon:</h5></Label>
                    </Col>
                    <Col xs="12" md="9">
                            <Label>  <input type="file" name="icon" onChange={this.handleChangeIcon}/>
                            </Label>
                    </Col>
              </FormGroup>
              <FormGroup row>
                    <Col md="3">  
                        <Label><h5>Experience:</h5></Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Label>
                        <select  name="expId" value={this.state.expId} onChange={this.handleChangeExpId}>
                            {
                                this.state.experiences.map((val) => {
                                    return <option value={val._id}>{val.name}</option>
                                })
                            }
                        </select>
                    </Label>
                    </Col>
             </FormGroup>
                <div style={{paddingTop: 20, paddingLeft: 270}}>
                    <input  className="btn-bck" type="submit" value="Submit"/>
                </div>
            </div>
            </form>
        );
    }
}

export default ItemsForm;
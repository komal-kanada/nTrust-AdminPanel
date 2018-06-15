import React, { Component } from 'react';
import API from "../../utils/AppUtil";
import { withRouter } from 'react-router-dom';
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

class ExperienceForm extends Component {

    constructor(props) {
                 super(props);

                 this.state = {
                     name: '',
                     expHeader:'',
                     expSubHeader: '',
                     _id: '',
                     modalType: ''
                 };

                 this.handleChangeName = this.handleChangeName.bind(this);
                 this.handleChangeHeader = this.handleChangeHeader.bind(this);
                 this.handleChangeSubHeader = this.handleChangeSubHeader.bind(this);
                 this._submit = this._submit.bind(this);
             };

        componentWillMount () {
                 const { _id } = this.props.match.params;
                 if(_id !== '' && _id !== undefined && _id !== null) {
                     API.ExperienceList()
                         .then((response) => {
                             response.Data.map((value) => {
                                 if(value._id === _id){
                                     this.setState({
                                         name: value.name,
                                         _id: value._id,
                                         expHeader: value.expHeader,
                                         expSubHeader: value.expSubHeader,
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
             _submit = (e) => {
                 e.preventDefault();
                 if(this.state.modalType === 'edit') {
                     console.log(this.state.expHeader);
                     let data = {
                         name: this.state.name,
                         header: this.state.expHeader,
                         subheader: this.state.expSubHeader,
                         expId: this.state._id
                     };
                     console.log('data ' + JSON.stringify(data));
                     API.EditExperience(data)
                         .then((resp) => {
                             console.log(resp);
                             this.setState({
                                 modalType: '',
                                 _id: '',
                                 name: '',
                                 expHeader:'',
                                 expSubHeader: ''
                            })
                             this.props.history.push({ pathname: `/experiences`});
                         })
                        .catch((err) => {
                            console.log(err)
                        });
                }
                else if(this.state.modalType === 'add') {
                    console.log('add');
                    if(this.state.name !== '' && this.state.expHeader !== '' && this.state.expSubHeader !== ''){
                        let data = {
                            "name": this.state.name,
                            'header': this.state.expHeader,
                            'subheader': this.state.expSubHeader
                        };
                        API.AddExperience(data)
                            .then((resp) => {
                                console.log(JSON.stringify(resp.Data));
                                this.setState({
                                    modalType: '',
                                    name: '',
                                    expHeader:'',
                                    expSubHeader: ''
                                })
                                this.props.history.push({ pathname: `/experiences`});
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                    else{
                        alert("Enter all values")
                    }
                }
            };

            handleChangeName(event){
                this.setState({name: event.target.value});
                console.log(this.state)
            };

            handleChangeHeader(event){
                this.setState({expHeader: event.target.files[0]});
                setTimeout(() => {
                    console.log(this.state)
                }, 10);
            }

            handleChangeSubHeader(event){
                this.setState({expSubHeader: event.target.files[0]});
                setTimeout(() => {
                    console.log(this.state)
                }, 10);
            }


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
                      <Label htmlFor="text-input"><h5>Name:</h5></Label>
                    </Col>
                    <Col xs="12" md="9">
                    <input type="text" value={this.state.name} onChange={this.handleChangeName}/>

                    </Col>
                  </FormGroup>
             <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input"><h5>Header:</h5></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" name="expHeader" onChange={this.handleChangeHeader}/>
                    </Col>
            </FormGroup>
            <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input"><h5>Sub-Header:</h5></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" name="expSubHeader" onChange={this.handleChangeSubHeader} />
                    </Col>
            </FormGroup>




             </div>
               {/* <div style={{paddingTop: 20, paddingLeft: 270 ,Position:'center'}}> */}
               <input className="btn-bck" type="submit" value="Submit"/>
                 {/* </div> */}
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
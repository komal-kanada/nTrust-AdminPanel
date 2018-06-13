import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReactModal from 'react-modal';



const style = {
    content: {
        borderRadius: '4px',
        bottom: 'auto',
        left: '25%',
        position: 'fixed',
        right: '25%',
        top: '12%', // start from center
    }
};

function onAfterInsertRow(row) {
    let newRowStr = '';
    for (const prop in row) {
      newRowStr += prop + ': ' + row[prop] + ' \n';
    }
}

export default class Experiences extends Component {

    constructor(props) {
        super(props);

        this.state = {
            table: '',
            modalEditOpen: false,
            name: '',
            expHeader:'',
            expSubHeader: '',
            _id: '',
            modalType: ''
        };

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
            afterInsertRow: onAfterInsertRow,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeHeader = this.handleChangeHeader.bind(this);
        this.handleChangeSubHeader = this.handleChangeSubHeader.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount () {
        this._getData()
    }

    imageFormatter = (cell) => {
        return "<img height= '100px' src='"+cell+"'/>" ;
    };

    _getData = () => {
        API.ExperienceList()
            .then((response) => {
                this.setState({
                    table: response.Data,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    _editCell = (cell) => {
        return <button className="btn-bck"  onClick={() => this._edit(cell)}>Edit</button>
    };

    _edit = (id) => {
        API.ExperienceList()
            .then((response) => {
                response.Data.map((value) => {
                    if(value._id === id){
                        this.setState({
                            modalEditOpen: true,
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
    };

    _deleteCell = (cell) => {
        return <button  className="btn-bck" onClick={() => this._delete(cell)}>Delete</button>
    };

    _delete = (id) => {
        let data = {
            expId: id
        };

        API.DeleteExperience(data)
            .then((resp) => {
                console.log('del ' + resp.Data.length);
                if(resp.Data.length === 0){
                    alert('Cannot delete this user.')
                }
                else{
                    this._getData();
                    alert('User deleted')
                }
            })
            .catch((err) => {
                console.log(err)
            });
    };

    _submit = () => {
        console.log('submit');
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
                        modalEditOpen: false,
                        modalType: '',
                        _id: '',
                        name: '',
                        expHeader:'',
                        expSubHeader: ''
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        else if(this.state.modalType === 'add') {
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
                            modalEditOpen: false,
                            modalType: '',
                            name: '',
                            expHeader:'',
                            expSubHeader: ''
                        })
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
        console.log(this.state)
    }

    handleChangeSubHeader(event){
        console.log(event.target.files);
        this.setState({expSubHeader: event.target.files[0]});
        setTimeout(() => {
            console.log(this.state)
        }, 10);
    }

    _addExp = () =>{
        this.setState({
            modalEditOpen: true,
            modalType: 'add'
        });
    };

    render() {

        // API.ExperienceList()
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });
        //
        // let data = {
        //     "name": "test-admin",
        //     'header': this.state.header,
        //     'subheader': this.state.header
        // };
        // API.AddExperience(data)
        //     .then((resp) => {
        //         console.log(JSON.stringify(resp.Data))
        //     });
        //
        // let data = {
        //         name: 'aaaaaaaaa',
        //         expId: '5b1a62eed9b3f80e72db4ad6'
        //     };
        // API.EditExperience(data)
        //     .then((resp) => {
        //         console.log(resp)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });
        //
        // let data = {
        //     expId: '5b1a5cac37de61021e4a2eeb'
        // };
        // API.DeleteExperience(data)
        //     .then((resp) => {
        //         console.log(resp)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });

        return (
            <div className="animated">
                <ReactModal
                    isOpen={this.state.modalEditOpen}
                    style={style}
                    ariaHideApp={false}
                >
                    <form onSubmit={this._submit} encType='multipart/form-data'>
                        <label>
                            <h5>Name:</h5>
                        <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                        </label>
                        <div>
                        <label>
                            <h5>Header:</h5>
                            <input  type="file" name="expHeader" onChange={this.handleChangeHeader}/>
                        </label>
                        </div>
                        <label>
                            <h5>Sub-Header:</h5>
                            <input type="file" name="expSubHeader" onChange={this.handleChangeSubHeader}/>
                        </label>
                        <div style={{paddingTop: 20, paddingLeft: 270}}>
                        <input    className="btn-bck"   type="submit" value="Submit"/>
                        </div>
                    </form>
                </ReactModal>
                <Card>
                    <CardHeader>
                        Experiences
                    </CardHeader>
                    <CardBody>
                        <button className="btn-bck" onClick={this._addExp}>Add</button>
                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"
                            version="4"
                            striped
                            hover
                            pagination
                            refresh={true}
                            options={this.options}
                            serverSide={ true }
                        >

                            <TableHeaderColumn dataField="_id" dataSort hidden={true} isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" >Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="expHeader" dataFormat={this.imageFormatter} >Header</TableHeaderColumn>

                            <TableHeaderColumn dataField="expSubHeader" dataFormat={this.imageFormatter }  >Sub-Header</TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._editCell } dataAlign="center" width="130"> Edit </TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._deleteCell } dataAlign="center" width="130"> Delete </TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }

}








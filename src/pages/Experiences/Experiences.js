import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';

export default class Experiences extends Component {

    constructor(props) {
        super(props);

        this.state = {
            table: '',
            modalEditOpen: false,
        };

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
        };
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
        return (
            <Link to={`experienceForm/edit/${cell}`}>
                <button className="btn-bck" >Edit</button>
            </Link>
        )
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
                <Card>
                    <CardHeader>
                        Experiences
                    </CardHeader>
                    <CardBody>
                        <Link to={`experienceForm/add`}>
                            <button className="btn-bck" onClick={this._addExp}>Add</button>
                        </Link>
                        
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
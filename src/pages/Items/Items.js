import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import API from "../../utils/AppUtil";
import { Link } from 'react-router-dom';

class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            table: '',
        };

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
        }
    }

    componentWillMount () {
        this._getData();
    };

    imageFormatter = (cell) => {
        return "<img height= '100px' src='"+cell+"'/>" ;
    };

    _getData = () => {
        API.SubExperienceList()
            .then((response) => {
                this.setState({
                    table: response.Data
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    _editCell = (cell) => {
        return (
            <Link to={`itemsForm/edit/${cell}`}>
                <button className="btn-bck">Edit</button>
            </Link>
        )
    };

    expFormatter = (cell) => {
        return cell.name
    };

    _deleteCell = (cell) => {
        return <button  className="btn-bck" onClick={() => this._delete(cell)}>Delete</button>
    };

    _delete = (id) => {
        let data = {
            subExpId: id
        };

        API.DeleteSubExperience(data)
            .then((resp) => {
                if(resp.Error === true) {
                    if(resp.Message === "Contain Items can't be deleted.") {
                        alert("This Item contains products, It can't be deleted")
                    }
                    else{
                        alert(resp.Message)
                    }
                }
                else {
                    alert('The Item is deleted.');
                    this._getData()
                }

            })
            .catch((err) => {
                console.log(err)
            });
    };

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        Items
                    </CardHeader>

                    <CardBody>

                        <Link to={`itemsForm/add`}>
                            <button className="btn-bck">Add</button>
                        </Link>

                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"
                            version="4"
                            striped
                            hover
                            pagination
                            options={this.options}
                            refresh = { true }
                        >

                            <TableHeaderColumn dataField="_id" isKey hidden={true}>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name"dataSot>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="icon" dataFormat={this.imageFormatter}>Icon</TableHeaderColumn>

                            <TableHeaderColumn dataField="expId" dataFormat={this.expFormatter}>Experience</TableHeaderColumn>

                            <TableHeaderColumn dataField="value">Item Value</TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._editCell } dataAlign="center" width="130"> Edit </TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._deleteCell } dataAlign="center" width="130"> Delete </TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Items;

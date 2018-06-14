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
        }
    }

    componentWillMount () {
        API.SubExperienceList()
            .then((response) => {
                this.setState({
                    table: response.Data
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    imageFormatter = (cell) => {
        return "<img height= '100px' src='"+cell+"'/>" ;
    };

    expFormatter = (cell) => {
        return cell.name
    };

    _editCell = (cell) => {
        return (
            <Link to={`experienceForm/edit/${cell}`}>
                <button className="btn-bck">Edit</button>
            </Link>
        )
    };

    _deleteCell = (cell) => {
        return <button  className="btn-bck" onClick={() => this._delete(cell)}>Delete</button>
    };

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                         Items
                    </CardHeader>                
                    <CardBody>
                    <Link to={`experienceForm/add`}>
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

                            <TableHeaderColumn dataField="deposit">Deposit Amount</TableHeaderColumn>

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

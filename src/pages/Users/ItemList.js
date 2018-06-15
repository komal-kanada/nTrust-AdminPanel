import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';

class ItemList extends Component {

    constructor (props) {
        super(props);

        this.state={
            table: '',
        };

        this.options={
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
        }
    }

    componentWillMount () {
        const { _id } = this.props.match.params;
        API.ItemsByUser(_id)
            .then((response) => {
                this.setState({
                    table: response.Data
                });
            })
            .catch((err) => {
                console.log(err)
            })
    };

    render () {
        return(
            <div className="animated">
                <Card>
                    <CardHeader>
                        Product List
                    </CardHeader>
                    <CardBody>
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

                            <TableHeaderColumn dataField="_id" hidden={true} isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name">Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="subExperiences">Sub-Experience</TableHeaderColumn>

                            <TableHeaderColumn dataField="description">Description</TableHeaderColumn>

                            <TableHeaderColumn dataField="deposit" dataFormat={ this._items }>Deposit</TableHeaderColumn>

                            <TableHeaderColumn dataField="price">Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="priceType">Proce Type</TableHeaderColumn>

                            <TableHeaderColumn dataField="experiences">Experience</TableHeaderColumn>

                        </BootstrapTable>

                        <Link to='/users'>
                            <button align="center" className="btn-bck" >OK</button>
                        </Link>

                    </CardBody>

                </Card>
            </div>
        );
    }
}

export default ItemList;
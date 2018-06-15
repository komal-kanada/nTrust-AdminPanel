import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import API from '../../utils/AppUtil';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props);

         this.state = {
             data: '',
             toggle: ''
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

    componentDidMount() {
        this._getData();
    }

    _getData = () => {
        API.UserList()
        .then((response) => {
            this.setState({ data: response.Data })
        })
        .catch((err) => {
            console.log(err)
        });
    };

    _blockUnblock = (cell, key) => {
        return <button className="btn-bck"  onClick={() => this._toggle(cell, key._id) }> {cell ? 'Un-Block' : 'Block'} </button>
    };

    _toggle = (isBlock, id) => {
        API.UserList()
            .then((response) => {
                response.Data.map((val) => {
                    if(val._id === id){
                        if(isBlock === false) {
                            API.UserBlockUnblock({
                                'command': 'block',
                                'userId': id
                            })
                                .then((response) => {
                                    this._getData();
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                        else {
                            API.UserBlockUnblock({
                                'command': 'unblock',
                                'userId': id
                            })
                                .then((response) => {
                                    this._getData();
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            });
        if(this.state.toggle === 'Block') {
            this.setState({
                toggle: 'Un-Block'
            })
        }
        else if(this.state.toggle === 'Un-Block') {
            this.setState({
                toggle: 'Block'
            })
        }
    };

    _items = (cell, key) => {
        return (
            <Link to={`/itemList/:${key._id}`}>{cell}</Link>
        )
    };

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        Users
                    </CardHeader>

                    <CardBody>

                        <BootstrapTable data={this.state.data}
                                        version="4"

                                        striped hover pagination search options={this.options}
                                        className="experiences-table"
                                        refresh={true}
                                      >

                            <TableHeaderColumn dataField="_id" hidden={true} dataSort isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" >User Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="rating" >Rating</TableHeaderColumn>

                            <TableHeaderColumn dataField="ItemCount" dataFormat={ this._items } >Item Count</TableHeaderColumn>

                            <TableHeaderColumn dataField="totalEarnings" >Lifetime Earnings</TableHeaderColumn>

                            <TableHeaderColumn dataField="isBlock" dataFormat={ this._blockUnblock } dataAlign="center" >Access</TableHeaderColumn>

                        </BootstrapTable>
               
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Users;


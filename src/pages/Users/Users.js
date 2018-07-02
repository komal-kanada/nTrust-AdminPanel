import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import API from '../../utils/AppUtil';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Link} from 'react-router-dom';
import Rating from 'react-rating';
import {AsyncStorage} from "AsyncStorage";

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

    componentWillMount = async () => {
        if (await AsyncStorage.getItem('Login') === undefined || JSON.parse(await AsyncStorage.getItem('Login')).token === '') {
            this.props.history.push({pathname: `/login`});
        }
        else {
            this._getData();
        }
    };

    _getData = () => {
        API.UserList()
            .then((response) => {
                const tableData = _.orderBy(response.Data, [user => user.name],['asc']);
                this.setState({
                    table: tableData,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    _toggle = (isBlock, id) => {
        API.UserList()
            .then((response) => {
                response.Data.map((val) => {
                    if (val._id === id) {
                        if (isBlock === false) {
                            API.UserBlockUnblock({
                                'command': 'block',
                                'userId': id
                            })
                                .then(() => {
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
                                .then(() => {
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
        if (this.state.toggle === 'Block') {
            this.setState({
                toggle: 'Un-Block'
            })
        }
        else if (this.state.toggle === 'Un-Block') {
            this.setState({
                toggle: 'Block'
            })
        }
    };

    render() {

        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        Users
                    </CardHeader>

                    <CardBody>
                        <BootstrapTable
                            data={this.state.table}
                            version="4"
                            striped
                            hover
                            pagination
                            options={this.options}
                            className="experiences-table"
                            refresh={true}
                        >
                            <TableHeaderColumn
                                dataField="_id"
                                hidden={true}
                                isKey
                            >
                                Id.
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="name"
                            >
                                User Name
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="rating"
                                dataFormat={(cell) => {
                                    return (
                                        <Rating
                                            placeholderRating={cell}
                                            readonly={true}
                                            emptySymbol={<img src="img/star-empty.png" height={20}/>}
                                            placeholderSymbol={<img src="img/star-full.png" height={20}/>}
                                        />
                                    )
                                }}
                            >
                                Rating
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="ItemCount"
                                dataFormat={(cell, key) => {
                                    return (
                                        <Link to={`/itemList/:${key._id}`}>{cell}</Link>
                                    )
                                }}
                            >
                                Product Count
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="totalEarnings"
                            >
                                Lifetime Earnings
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="isBlock"
                                dataFormat={(cell, key) => {
                                    return <button
                                        className="btn-bck"
                                        onClick={() => this._toggle(cell, key._id)}
                                    >
                                        {cell ? 'Un-Block' : 'Block'}
                                    </button>
                                }}
                                dataAlign="center"
                            >
                                Access
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Users;
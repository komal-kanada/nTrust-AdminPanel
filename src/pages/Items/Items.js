import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import API from "../../utils/AppUtil";
import { Link } from 'react-router-dom';
import {AsyncStorage} from "AsyncStorage";

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
            btnGroup: this.createCustomButtonGroup
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
        API.ItemList()
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

    _delete = (id) => {
        let data = {
            subExpId: id
        };

        API.DeleteItem(data)
            .then((resp) => {
                if(resp.Error === true) {
                    if(resp.Message === "Contain Items can't be deleted.") {
                        alert("This Item contains Products, it can't be deleted")
                    }
                    else{
                        alert(resp.Message)
                    }
                }
                else {
                    this._getData();
                    setTimeout(() => {
                        alert('Item deleted')
                    }, 50);
                }

            })
            .catch((err) => {
                console.log(err)
            });
    };

    createCustomButtonGroup = () => {
        return (
            <ButtonGroup>
                <Link to={`itemsForm/add`}>
                    <button className="btn-bck">Add</button>
                </Link>
            </ButtonGroup>
        );
    };

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        Items
                    </CardHeader>

                    <CardBody>


                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"
                            version="4"
                            striped
                            search
                            hover
                            pagination
                            options={this.options}
                            refresh = { true }
                        >
                            <TableHeaderColumn
                                dataField="_id"
                                isKey
                                hidden={true}
                            >
                                Id.
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="name"
                            >
                                Name
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="icon"
                                dataFormat={(cell) => {
                                    return "<img height= '100px' src='"+cell+"'/>"
                                }}
                            >
                                Icon
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="expId"
                                dataFormat={(cell) => {
                                    return cell.name
                                }}
                            >
                                Experience
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="value"
                            >
                                Item Value
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField='_id'
                                dataFormat={(cell) => {
                                    return (
                                        <Link to={`itemsForm/edit/${cell}`}>
                                            <button className="btn-bck">Edit</button>
                                        </Link>
                                    )
                                }}
                                dataAlign="center"
                                width="130"
                            >
                                Edit
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField='_id'
                                dataFormat={(cell) => {
                                    return <button
                                        className="btn-bck"
                                        onClick={() => {
                                            return window.confirm('Are you sure?')?this._delete(cell):'';
                                        }}
                                    >
                                        Delete
                                    </button>
                                }}
                                dataAlign="center"
                                width="130"
                            >
                                Delete
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Items;

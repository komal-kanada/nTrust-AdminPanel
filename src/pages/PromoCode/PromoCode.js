import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Link} from 'react-router-dom';
import {AsyncStorage} from "AsyncStorage";

class PromoCode extends Component {
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
            btnGroup: this.createCustomButtonGroup
        };
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
        API.PromoCodeList()
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
            promocodeId: id
        };

        API.DeletePromoCode(data)
            .then((resp) => {
                if (resp.Error === true) {
                    alert(resp.Message)
                }
                else {
                    this._getData();
                    setTimeout(() => {
                        alert('Promo Code deleted')
                    }, 300);
                }

            })
            .catch((err) => {
                console.log(err)
            });
    };

    createCustomButtonGroup = () => {
        return (
            <ButtonGroup>
                <Link to={`promoCodeForm/add`}>
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
                        PromoCode
                    </CardHeader>

                    <CardBody>

                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"
                            version="4"
                            striped
                            hover
                            pagination
                            options={this.options}
                        >
                            <TableHeaderColumn
                                dataField="_id"
                                isKey
                                hidden={true}
                            >
                                Id.
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="promocode"
                                data-formatter="nameFormatter"
                            >
                                Name
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="subExp_id"
                                dataFormat={(cell) => {
                                    return cell.name
                                }}
                            >
                                Items
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="from"
                                dataFormat={(cell) => {
                                    return (cell === '') ? '' : new Date(cell).toLocaleDateString();
                                }}
                            >
                                Valid From
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="to"
                                dataFormat={(cell) => {
                                    return (cell === '') ? '' : new Date(cell).toLocaleDateString();
                                }}
                            >
                                Valid To
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField='_id'
                                dataFormat={(cell) => {
                                    return (
                                        <Link to={`promoCodeForm/edit/${cell}`}>
                                            <button className="btn-bck">Edit</button>
                                        </Link>
                                    )
                                }}
                                dataAlign="center"
                            >
                                Edit
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField='_id'
                                dataFormat={(cell) => {
                                    return <button
                                        className="btn-bck"
                                        onClick={() => {
                                            return window.confirm('Are you sure?') ? this._delete(cell) : '';
                                        }}
                                    >
                                        Delete
                                    </button>
                                }}
                                dataAlign="center"
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

export default PromoCode;
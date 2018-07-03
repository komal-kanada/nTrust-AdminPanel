import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Link} from 'react-router-dom';
import {AsyncStorage} from "AsyncStorage";
import _ from 'lodash'

class Experiences extends Component {
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
        API.ExperienceList()
            .then((response) => {
                let tableData = _.orderBy(response.Data, [user => user.name],['asc']);
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
            expId: id
        };
        API.DeleteExperience(data)
            .then((resp) => {
                if (resp.Message === "Contain SubExp can't be deleted.") {
                    alert("This Experience contains Items, it can't be deleted.")
                }
                else {
                    this._getData();
                    setTimeout(() => {
                        alert('Experience deleted')
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
                <Link to={`experienceForm/add`}>
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
                        Experiences
                    </CardHeader>
                    <CardBody>

                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"s
                            version="4"
                            striped
                            hover
                            search
                            pagination
                            refresh={true}
                            options={this.options}
                            serverSide={true}
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
                                Name
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="expHeader"
                                dataFormat={(cell) => {
                                    return "<img height= '100px' src='" + cell + "'/>";
                                }}
                            >
                                Header
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField="expSubHeader"
                                dataFormat={(cell) => {
                                    return "<img height= '100px' src='" + cell + "'/>";
                                }}
                            >
                                Sub-Header
                            </TableHeaderColumn>

                            <TableHeaderColumn
                                dataField='_id'
                                dataFormat={(cell) => {
                                    return (
                                        <Link to={`experienceForm/edit/${cell}`}>
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
                                    return <button className="btn-bck" onClick={() => {
                                        return window.confirm('Are you sure?') ? this._delete(cell) : '';
                                    }}>Delete</button>
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

export default Experiences
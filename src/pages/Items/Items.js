import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import API from "../../utils/AppUtil";
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

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                    Sub-Experience
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
                            refresh = { true }
                        >

                            <TableHeaderColumn dataField="_id" isKey hidden={true}>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name"dataSot>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="icon" dataFormat={this.imageFormatter}>Icon</TableHeaderColumn>

                            <TableHeaderColumn dataField="expId" dataFormat={this.expFormatter}>Experience</TableHeaderColumn>

                            <TableHeaderColumn dataField="deposit">Deposit Amount</TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Items;

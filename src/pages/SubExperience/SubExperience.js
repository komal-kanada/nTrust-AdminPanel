import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import API from "../../utils/AppUtil";


function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);

    rowKeys.map((val) => {

        let data = {
            subExpId: val
        };

        API.DeleteSubExperience(data)
            .then((resp) => {
                console.log('del ' + resp)
            })
            .catch((err) => {
                console.log(err)
            });
    })
}

const selectRowProp = {
    mode: 'checkbox'
};

function onAfterInsertRow(row) {
    let newRowStr = '';
    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    alert('The new row is:\n ' + newRowStr);
}

class SubExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: ''
        };

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow
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
                            version="4"
                            striped
                            hover
                            pagination
                            search
                            options={this.options}
                            deleteRow={ true }
                            insertRow={ true }
                            selectRow={ selectRowProp }
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

export default SubExperience;

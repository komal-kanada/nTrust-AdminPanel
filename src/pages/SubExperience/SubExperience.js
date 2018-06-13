import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
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

  const options = {
    afterInsertRow: onAfterInsertRow ,
   afterDeleteRow: onAfterDeleteRow
  };






class SubExperience extends Component {
    constructor(props) {
        super(props);

        this.table = '';
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }

    }
    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                    Items
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={this.table}
                         version="4" 
                         striped hover pagination search options={this.options} deleteRow={ true }  
                         insertRow={ true }  
                         selectRow={ selectRowProp } >


                            <TableHeaderColumn dataField="sr" isKey>Sr No.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" dataSot>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="icon"  >Icon</TableHeaderColumn>

                            <TableHeaderColumn dataField="price">
                            Daily Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="deposit">
                            Deposit Amount</TableHeaderColumn>


                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default SubExperience;

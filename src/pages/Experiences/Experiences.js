import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from './data';

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




class Experiences extends Component {
    constructor(props) {
        super(props);

        this.table = data.rows;
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
            <div>
                <Card>

                    <CardHeader>
                    Experiences
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options} deleteRow={ true }  insertRow={ true }  selectRow={ selectRowProp } >


                            <TableHeaderColumn dataField="sr"  width='5%' isKey>Sr No.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name"  width='8%'>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="front"  width='4%' >FrontSide</TableHeaderColumn>

                            <TableHeaderColumn dataField="back"   width='4%'>
                                BackSide</TableHeaderColumn>

                            
                        </BootstrapTable>
                    </CardBody>
                </Card>
                </div>
            </div>
        )
    }
}

export default Experiences;


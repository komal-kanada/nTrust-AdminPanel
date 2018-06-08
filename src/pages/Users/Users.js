import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from './data';

function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
}

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

const selectRowProp = {
    mode: 'checkbox'
  };

const cellEditProp = {
    mode: 'click',
    blurToSave: true
  };

function onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }


  function createCustomInsertButton(openModal){
    return (
      <button style={ { color: 'red' } } onClick={ openModal }>Add rows</button>
    );
  }

class Users extends Component {
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

        const options = {
            insertBtn: this.createCustomInsertButton
          };
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                    Users
                    </CardHeader>
                        {/* <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
                           <button type='button'
                            className={ `btn btn-primary` }>
                            Edit
                            </button>
                        </ButtonGroup> */}
                    <CardBody>
                   
                        <BootstrapTable data={this.table}
                                        version="4" 
                                        striped hover pagination search options={this.options}
                                        deleteRow={ true } 
                                        insertRow={ true }  
                                        selectRow={ selectRowProp }
                                        cellEdit={ cellEditProp } 
                                        insertRow>


                            <TableHeaderColumn dataField="sr" dataSort isKey>Sr No.</TableHeaderColumn>

                            <TableHeaderColumn dataField="rating"  >Rating </TableHeaderColumn>

                            <TableHeaderColumn dataField="items" >Items</TableHeaderColumn>

                            <TableHeaderColumn dataField="lifetime"  >Lifetime Earnings</TableHeaderColumn>

                           <TableHeaderColumn dataField="block"  >Access</TableHeaderColumn>


                          
                            
                            
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Users;


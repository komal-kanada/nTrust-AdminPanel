import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import API from '../../utils/AppUtil';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

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

         this.state = {data: ''};

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

                        <BootstrapTable data={this.state.data}
                                        version="4"
                                        striped hover pagination search options={this.options}
                                        deleteRow={ true }
                                        insertRow={ true }
                                        refresh={true}
                                        selectRow={ selectRowProp }
                                       // cellEdit={ cellEditProp }
                                        insertRow>

                            <TableHeaderColumn dataField="_id" hidden={true}  isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" >User Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="rating" >Rating</TableHeaderColumn>

                            <TableHeaderColumn dataField="itemCount" >Items Count</TableHeaderColumn>

                            <TableHeaderColumn dataField="totalEarnings" >Lifetime Earnings</TableHeaderColumn>

                            <TableHeaderColumn dataField="isBlock" >Access</TableHeaderColumn>
                          
                        </BootstrapTable>
               
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Users;


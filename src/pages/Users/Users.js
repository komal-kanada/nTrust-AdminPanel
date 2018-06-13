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

  function createCustomInsertButton(openModal){
    return (
      <button style={ { color: 'red' } } onClick={ openModal }>Add rows</button>
    );
  }

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
    };

    _blockUnblock = (cell, key) => {
        console.log(cell);
        return <button onClick={() => this._toggle(cell, key._id)}> {cell} </button>
    };

    _toggle = (isBlock, id) => {
        // console.log(id);
        // API.UserList()
        //     .then((response) => {
        //         response.Data.map((val) => {
        //             if(val._id === id){
        //
        //             }
        //         })
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });
        // if(this.state.toggle === 'Block') {
        //     this.setState({
        //         toggle: 'Un-Block'
        //     })
        // }
        // else if(this.state.toggle === 'Un-Block') {
        //     this.setState({
        //         toggle: 'Block'
        //     })
        // }
    };

    render() {

        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        Users
                    </CardHeader>
                    <CardBody>

                        <BootstrapTable data={this.state.data}
                                        version="4"
                                        striped
                                        hover
                                        pagination
                                        options={this.options}
                                        refresh={true}
                                        selectRow={ selectRowProp }
                        >

                            <TableHeaderColumn dataField="_id" hidden={true} dataSort isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" dataSort>User Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="rating" dataSort>Rating</TableHeaderColumn>

                            <TableHeaderColumn dataField="itemCount" dataSort>Items Count</TableHeaderColumn>

                            <TableHeaderColumn dataField="totalEarnings" dataSort>Lifetime Earnings</TableHeaderColumn>

                            <TableHeaderColumn dataField="isBlock" dataFormat={ this._blockUnblock } dataAlign="center" dataSort>Access</TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Users;


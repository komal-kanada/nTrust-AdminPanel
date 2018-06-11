import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);

    rowKeys.map((val) => {

        console.log(val);
        let data = {
            promocodeId: val
        };

        API.DeletepromoCode(data)
            .then((resp) => {
                console.log('del ' + resp);
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


class PromoCode extends Component {

    constructor(props) {
        super(props);

        this.state={table: ''};
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

    _getData  = () => {
        API.promoCodeList()
            .then((response) => {
                this.setState({
                    table: response.Data
                });
            })
            .catch((err) => {
                console.log(err)
            });
    };

    componentWillMount () {
        this._getData();
    }

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                    Items
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={this.state.table} version="4" striped hover pagination search options={this.options} deleteRow={ true }  insertRow={ true }  selectRow={ selectRowProp }  >

                            <TableHeaderColumn dataField="_id" isKey hidden={true}>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="promocode" dataSort>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="disPrice">Discount Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="subExperience" dataFormat={this.expFormatter}>Experience</TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


export default PromoCode;

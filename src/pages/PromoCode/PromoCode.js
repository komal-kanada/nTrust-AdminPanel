import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';

class PromoCode extends Component {

    constructor(props) {
        super(props);

        this.state={
            table: '',
        };

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
        };
    }

    componentWillMount () {
        this._getData();
    }

    _getData  = () => {
        API.PromoCodeList()
            .then((response) => {
                this.setState({
                    table: response.Data
                });
                console.log(response.Data)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    _editCell = (cell) => {
        return (
            <Link to={`promoCodeForm/edit/${cell}`}>
                <button className="btn-bck">Edit</button>
            </Link>
        )
    };

    _deleteCell = (cell) => {
        return <button className="btn-bck" onClick={() => this._delete(cell)}>Delete</button>
    };

    _delete = (id) => {
        let data = {
            promocodeId: id
        };

        API.DeletePromoCode(data)
            .then((resp) => {
                if(resp.Error === true) {
                    alert(resp.Message)
                }
                else {
                    alert('The Promo Code is deleted.');
                    this._getData()
                }

            })
            .catch((err) => {
                console.log(err)
            });
    };

    _addExp = () =>{
        this.setState({
            modalType: 'add'
        });
    };

    expFormatter = (cell) => {
        return cell.name
    };

    render() {
        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        PromoCode
                    </CardHeader>
                    <CardBody>
                        <Link to={`promoCodeForm/add`}>
                            <button className="btn-bck" onClick={this._addExp}>Add</button>
                        </Link>
                        <BootstrapTable
                            data={this.state.table}
                            className="experiences-table"
                            version="4"
                            striped
                            hover
                            pagination
                            options={this.options}
                        >

                            <TableHeaderColumn dataField="_id" isKey hidden={true}>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="promocode" >Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="disPrice">Discount Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="subExp_id" dataFormat={this.expFormatter} >Sub-Experience</TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._editCell } dataAlign="center"> Edit </TableHeaderColumn>

                            <TableHeaderColumn dataField='_id' dataFormat={ this._deleteCell } dataAlign="center"> Delete </TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


export default PromoCode;

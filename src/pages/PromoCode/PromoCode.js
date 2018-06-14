import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReactModal from 'react-modal';

const selectRowProp = {
    mode: 'checkbox'
};

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

function onAfterInsertRow(row) {
    let newRowStr = '';
    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
}

class PromoCode extends Component {

    constructor(props) {
        super(props);

        this.state={
            table: '',
            modalEditOpen: false,
            promocode: '',
            disPrice:'',
            subExperience: '',
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
            afterInsertRow: onAfterInsertRow,
        };

        this._submit = this._submit.bind(this);
        this._cancel = this._cancel.bind(this);

    }

    componentWillMount () {
        this._getData();
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

    _editCell = (cell) => {
        return <button onClick={() => this._edit(cell)}>Edit</button>
    };

    _edit = (id) => {

    };

    _deleteCell = (cell) => {
        return <button onClick={() => this._delete(cell)}>Delete</button>
    };

    _delete = (id) => {

    };

    _submit = () => {
        if(this.state.modalType === 'edit') {

        }
        else if(this.state.modalType === 'add') {

        }
    };

    handleChangeName(event){
        this.setState({name: event.target.value});
        console.log(this.state)
    };

    handleChangeHeader(event){
        this.setState({expHeader: event.target.files[0]});
        console.log(this.state)
    }

    handleChangeSubHeader(event){
        console.log(event.target.files);
        this.setState({expSubHeader: event.target.files[0]});
        setTimeout(() => {
            console.log(this.state)
        }, 10);
    }

    _addExp = () =>{
        this.setState({
            modalEditOpen: true,
            modalType: 'add'
        });
    };

    _cancel = () => {
        this.setState({
            modalEditOpen: false,
            modalType: '',
            name: '',
            expHeader:'',
            expSubHeader: ''
        })
    };


    render() {
        return (
            <div className="animated">
                <ReactModal
                    isOpen={this.state.modalEditOpen}
                    style={style}
                    ariaHideApp={false}
                >
                    <form onSubmit={this._submit}>
                        <label>
                            <h5>Name:</h5>
                            <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                        </label>
                        <div>
                        <label>
                            <h5>Discount Price:</h5>
                            <input type="file" name="disPrice" onChange={this.handleChangeHeader}/>
                        </label>
                    </div>
                        <label>
                            <h5>Sub-Experience:</h5>
                            <input type="file" name="subExperience" onChange={this.handleChangeSubHeader}/>
                        </label>
                        <div style={{paddingTop: 20, paddingLeft: 270}}>
                            <button  className="btn-bck" onClick={this._cancel}> Cancel </button>
                            &nbsp;&nbsp;&nbsp;
                            <input  className="btn-bck" type="submit" value="Submit"/>
                        </div>
                    </form>
                </ReactModal>
                <Card>
                    <CardHeader>
                    Items
                    </CardHeader>
                    <CardBody>
                        <button className="btn-bck" onClick={this._addExp}>Add</button>
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

                            <TableHeaderColumn dataField="subExperience" dataFormat={this.expFormatter}>Sub-Experience</TableHeaderColumn>

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

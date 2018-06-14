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
            modalEditOpen: false,
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
                <ReactModal
                    isOpen={this.state.modalEditOpen}
                    style={style}
                    ariaHideApp={false}
                >
                    <form onSubmit={this._submit} encType='multipart/form-data'>
                        <label>
                            <h5>Name:</h5>
                            <input type="text" value={this.state.name} onChange={this.handleChangeName}/>
                        </label>
                        <label>
                            <h5>Icon:</h5>
                            <input type="file" name="icon" onChange={this.handleChangeIcon}/>
                        </label>
                        <label>
                            <h5>Sub-Header:</h5>
                            <input type="file" name="expSubHeader" onChange={this.handleChangeSubHeader}/>
                        </label>
                        <div style={{paddingTop: 20, paddingLeft: 270}}>
                            <button onClick={this._cancel}> Cancel </button>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </ReactModal>
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

export default Items;

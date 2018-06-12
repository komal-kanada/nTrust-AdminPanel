import React, {Component} from 'react';
import API from '../../utils/AppUtil';
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

export default class Experiences extends Component {
    constructor(props) {
        super(props);

        this.state = {table: ''};

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

    componentWillMount () {
        API.ExperienceList()
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

     render() {


        // API.ExperienceList()
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });

        // let data = {
        //     "name": "test-admin",
        //     'header': this.state.header,
        //     'subheader': this.state.header
        // };
        // API.AddExperience(data)
        //     .then((resp) => {
        //         console.log(JSON.stringify(resp.Data))
        //     });
        // alert('A name was submitted: ' + this.state.header);
        // event.preventDefault();

        // let data = {
        //         name: 'aaaaaaaaa',
        //         expId: '5b1a62eed9b3f80e72db4ad6'
        //     };
        // API.EditExperience(data)
        //     .then((resp) => {
        //         console.log(resp)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });

        // let data = {
        //     expId: '5b1a5cac37de61021e4a2eeb'
        // };
        // API.DeleteExperience(data)
        //     .then((resp) => {
        //         console.log(resp)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     });

        return (
            <div className="animated">
            
                <Card>
                    <CardHeader>
                        Experiences
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable
                            data={this.state.table}
                            version="4"
                            striped
                            hover
                            pagination
                            refresh={true}
                            search
                            options={this.options}
                            deleteRow={ true }
                            insertRow={ true }
                            selectRow={ selectRowProp }
                            serverSide={ true }
                        >

                            <TableHeaderColumn dataField="_id" dataSort hidden={true} isKey>Id.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" >Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="expHeader" dataFormat={this.imageFormatter} 
                            width="150"
                            >Header</TableHeaderColumn>

                            <TableHeaderColumn dataField="expSubHeader" dataFormat={this.imageFormatter} 
                            width="230"
                            >Sub-Header</TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
import React, {Component} from 'react';


class SubExperience extends Component {
  render() {
    return (
      <div className="animated fadeIn">
         In SubExperience page
      </div>
    )
  }
class SubExperience extends Component {
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
                <Card>
                    <CardHeader>
                    Items
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options} deleteRow={ true }  insertRow={ true }  selectRow={ selectRowProp } >


                            <TableHeaderColumn dataField="sr" isKey>Sr No.</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" dataSot>Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="icon"  >Icon</TableHeaderColumn>

                            <TableHeaderColumn dataField="price"  >
                            Daily Price</TableHeaderColumn>

                            <TableHeaderColumn dataField="deposit"  >
                            Deposit Amount</TableHeaderColumn>


                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default SubExperience;

import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from './data';
import API from '../../utils/AppUtil';
import {API_BASE_URL} from "../../common/global";

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
  afterDeleteRow: onAfterDeleteRow , // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow
};

const selectRowProp = {
  mode: 'checkbox'
};


const cellEditProp = {
  mode: 'click'
};


class Experiences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({header: event.target.value});
    }

    handleSubmit(event) {
        var formData = new FormData();
        formData.append("name", "test-admin");
        formData.append('header', this.state.header);
        formData.append('subHeader', this.state.header);
        console.log(formData);
        console.log(this.state.header);

        fetch(API_BASE_URL+'/admin/insertExp', {
            method: 'POST',
            headers: {
                'Content-Type': '*/*',
            },
            body: formData
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log('apputil' + err)
            });

        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

  // constructor(props) {
  //   super(props);
  //
  //   this.table = data.rows;
  //   this.options = {
  //     sortIndicator: true,
  //     hideSizePerPage: true,
  //     paginationSize: 3,
  //     hidePageListOnlyOnePage: true,
  //     clearSearch: true,
  //     alwaysShowAllBtns: false,
  //     withFirstAndLast: false
  //   }

  // }
  render() {
      console.log(this.state);

      // let formData = new FormData();
      // formData.append("name", "test-admin");
      // formData.append('header', "https://png2.kisspng.com/sh/f9f712ddea5c8c4bd1b74e0e18db075f/L0KzQYm3UsI2N6h1j5H0aYP2gLBuTfNmepJygdU2c3BkgH7rigNpNZdxhAlucoDyhH77ggVzfaQyeAd9ZT3mdcPojflkNaF0jOU2NXG8Q4TtVvIxP2oAfKI3MEW5RoW7VsYyPWIATasENEa6QIS4Ub5xdpg=/kisspng-ceramic-soap-dish-flowerpot-taurus-cute-ceramic-pots-5a933f6b0799d0.0566446615195994670311.png");
      // formData.append('subHeader', "https://ae01.alicdn.com/kf/HTB1wsxWJXXXXXXPapXXq6xXFXXXT/Lotus-Chrysanthemum-Rose-China-100-FLOWER-Rob-TATTOO-FLASH-SKETCH-Reference-BOOK.jpg_640x640.jpg");
      // console.log(formData);
      //
      // API.ExperienceList()
      //     .then((resp) => {
      //     })
      //     .catch((err) => {
      //         console.log(err);
      //     });
      //
      // API.AddExperience(formData)
      //     .then((resp) => {
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

    return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <label>
                  header:
                  <input type="file" name="header" value={this.state.header} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
        </div>
    )
  }
}

export default Experiences;

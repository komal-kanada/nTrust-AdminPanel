import React, {Component} from 'react';
import API from '../../utils/AppUtil';
import {API_BASE_URL} from "../../common/global";

export default class Experiences extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event);
        this.setState({header: event.target.files[0]});
    }

    handleSubmit(event) {



    }

    render() {

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

        let data = {
            expId: '5b1a62eed9b3f80e72db4ad6'
        };
        API.DeleteExperience(data)
            .then((resp) => {
                console.log(resp)
            })
            .catch((err) => {
                console.log(err)
            });

        return (
            <div>
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <label>
                        header:
                        <input type="file" name="header" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

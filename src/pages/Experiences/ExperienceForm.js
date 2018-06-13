import React, { Component } from 'react';
// import API from "../../utils/AppUtil";

class ExperienceForm extends Component {
    //
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         name: '',
    //         expHeader:'',
    //         expSubHeader: '',
    //         _id: '',
    //         modalType: ''
    //     };
    //
    //     this.options = {
    //         sortIndicator: true,
    //         hideSizePerPage: true,
    //         paginationSize: 3,
    //         hidePageListOnlyOnePage: true,
    //         clearSearch: true,
    //         alwaysShowAllBtns: false,
    //         withFirstAndLast: false,
    //     };
    //
    //     this.handleChangeName = this.handleChangeName.bind(this);
    //     this.handleChangeHeader = this.handleChangeHeader.bind(this);
    //     this.handleChangeSubHeader = this.handleChangeSubHeader.bind(this);
    //     this._submit = this._submit.bind(this);
    // };
    //
    // // componentWillMount () {
    // //     API.ExperienceList()
    // //         .then((response) => {
    // //             response.Data.map((value) => {
    // //                 if(value._id === id){
    // //                     this.setState({
    // //                         modalEditOpen: true,
    // //                         name: value.name,
    // //                         _id: value._id,
    // //                         expHeader: value.expHeader,
    // //                         expSubHeader: value.expSubHeader,
    // //                         modalType: 'edit'
    // //                     });
    // //                 }
    // //             })
    // //         })
    // //         .catch((err) => {
    // //             console.log(err)
    // //         });
    // // }
    //
    // _submit = () => {
    //     console.log('submit');
    //     if(this.state.modalType === 'edit') {
    //         console.log(this.state.expHeader);
    //         let data = {
    //             name: this.state.name,
    //             header: this.state.expHeader,
    //             subheader: this.state.expSubHeader,
    //             expId: this.state._id
    //         };
    //         console.log('data ' + JSON.stringify(data));
    //         API.EditExperience(data)
    //             .then((resp) => {
    //                 console.log(resp);
    //                 this.setState({
    //                     modalType: '',
    //                     _id: '',
    //                     name: '',
    //                     expHeader:'',
    //                     expSubHeader: ''
    //                 })
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             });
    //     }
    //     else if(this.state.modalType === 'add') {
    //         if(this.state.name !== '' && this.state.expHeader !== '' && this.state.expSubHeader !== ''){
    //             let data = {
    //                 "name": this.state.name,
    //                 'header': this.state.expHeader,
    //                 'subheader': this.state.expSubHeader
    //             };
    //             API.AddExperience(data)
    //                 .then((resp) => {
    //                     console.log(JSON.stringify(resp.Data));
    //                     this.setState({
    //                         modalType: '',
    //                         name: '',
    //                         expHeader:'',
    //                         expSubHeader: ''
    //                     })
    //                 })
    //                 .catch((err) => {
    //                     console.log(err)
    //                 })
    //         }
    //         else{
    //             alert("Enter all values")
    //         }
    //     }
    // };
    //
    // handleChangeName(event){
    //     this.setState({name: event.target.value});
    //     console.log(this.state)
    // };
    //
    // handleChangeHeader(event){
    //     this.setState({expHeader: event.target.files[0]});
    //     setTimeout(() => {
    //         console.log(this.state)
    //     }, 10);
    // }
    //
    // handleChangeSubHeader(event){
    //     this.setState({expSubHeader: event.target.files[0]});
    //     setTimeout(() => {
    //         console.log(this.state)
    //     }, 10);
    // }

    render(){
        const { _id } = this.props.match.params;
        console.log(_id);

        return null
            {/*<form onSubmit={this._submit} encType='multipart/form-data'>*/}
                {/*<label>*/}
                    {/*<h5>Name:</h5>*/}
                    {/*<input type="text" value={this.state.name} onChange={this.handleChangeName}/>*/}
                {/*</label>*/}
                {/*<label>*/}
                    {/*<h5>Header:</h5>*/}
                    {/*<input type="file" name="expHeader" onChange={this.handleChangeHeader}/>*/}
                {/*</label>*/}
                {/*<label>*/}
                    {/*<h5>Sub-Header:</h5>*/}
                    {/*<input type="file" name="expSubHeader" onChange={this.handleChangeSubHeader}/>*/}
                {/*</label>*/}
                {/*<div style={{paddingTop: 20, paddingLeft: 270}}>*/}
                    {/*<input type="submit" value="Submit"/>*/}
                {/*</div>*/}
            {/*</form>*/}

    }
}

export default ExperienceForm
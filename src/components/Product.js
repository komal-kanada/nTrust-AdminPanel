import React, { Component } from 'react';
import { withRouter } from 'react-router';
var $ = require("jquery");

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
           products : props.productDetails
        }
      }

    componentWillReceiveProps(props){
        /*getting props from productDetails.js in pages > ManageProduct */
        if(props.productDetails){
            let products = props.productDetails;
            this.setState({products})
        }  
    }

    render() {
        const {products} = this.state;
        const attributes = products[0].attributes;
        if(products !== ""){
            return (
                <div className="row main-class">
                    <div className="col-md-12">
                        <div className="product">
                            <img id="productImage" className="img-responsive" src={products[0].image.thumbnail1} />
                            <div className="mainProductDes">
                                <b><h4>{products[0].name}</h4></b>
                                <div className="productDes">{products[0].description}</div>   
                            </div>
                        </div>
                        <div> Price: {products[0].price} </div>                    
                        <div>
                            {
                                Object.keys(attributes).map(function(key){
                                    var attr = attributes[key];
                                    var arr = [];
                                    if(attr && $.isArray(attr)) {
                                        for(var i=0; i < attr.length; i++){
                                            arr.push(attr[i])
                                        }
                                        return (arr && arr.map((a,c) => {
                                                return (<div> {a} </div>)
                                            })
                                        )
                                    }  
                                    else {
                                        return ( <div> {attr} </div> )
                                    } 
                                })
                            }
                        </div>
                        <button className="col-md-12 close productBtn" onClick={() => this.props.history.push('/dashboard')}>Close</button>
                    </div>
                </div>
            )
        } 
    }
}

export default withRouter(Product);



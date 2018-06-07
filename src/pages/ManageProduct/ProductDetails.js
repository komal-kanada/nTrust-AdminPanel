import React, { Component } from 'react';
import Product from '../../components/Product.js';
import CommonUtils from '../../utils/CommonUtils';

class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
       products : ""
    }
  }

  componentWillMount(){
  
  CommonUtils.getProduct()
    .then((response) => {
      this.setState({products:response.products})
    })
    .catch((error) => {
      console.log("error:"+JSON.stringify(error))
    })
  }

  render() {
    const {products} = this.state;
    return (
      <div className="animated fadeIn">
        { products!="" ? <Product productDetails={products}/> : "" }
      </div>
    )
  }
}

export default ProductDetails;

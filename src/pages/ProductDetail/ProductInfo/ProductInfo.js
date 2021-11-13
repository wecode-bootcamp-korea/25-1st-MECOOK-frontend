import React from 'react';
import './ProductInfo.scss';
import Btn from './Btn/Btn';
class ProductInfo extends React.Component {
  render() {
    return (
      <div className="productInfoBox">
        <h1>{this.props.dataDetail ? this.props.dataDetail[0].text : null}</h1>
        <Btn
          productId={this.props.productId}
          cccccccc
          productResult={this.props.productResult}
        />
      </div>
    );
  }
}
export default ProductInfo;

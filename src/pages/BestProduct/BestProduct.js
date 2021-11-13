import React, { Component } from 'react';
import './BestProduct.scss';
import ProductPreview from '../ProductList/ProductPreview/ProductPreview';

class BestProduct extends Component {
  constructor() {
    super();
    this.state = {
      menuList: [],
    };
  }

  componentDidMount() {
    fetch('http://10.58.2.208:8000/product/?limit=6&sort=priority', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          menuList: data.result,
        });
      });
  }

  render() {
    return (
      <div className="bestMenuContainer">
        <h3 className="bestMenuTitle">MONTHLY BEST</h3>
        <ul className="bestMenuList">
          {this.state.menuList &&
            this.state.menuList.map(menu => {
              const {
                productId,
                thumbImg,
                thumbImgHover,
                category,
                name,
                cookingTime,
                serving,
                like,
              } = menu;
              return (
                <ProductPreview
                  key={productId}
                  productId={productId}
                  thumbImg={thumbImg}
                  thumbImgHover={thumbImgHover}
                  category={category}
                  name={name}
                  cookingTime={cookingTime}
                  serving={serving}
                  like={like}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}

export default BestProduct;

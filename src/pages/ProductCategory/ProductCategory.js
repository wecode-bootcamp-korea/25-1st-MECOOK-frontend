import React from 'react';
import ProductCategoryList from './ProductCategoryList/ProductCategoryList';
import ProductList from '../ProductList/ProductList';
import CATEGORY_DATA from './ProductCategoryData';
import './ProductCategory.scss';

// Header와 연결시 헤더에서 누른 카테고리값 props로 받아올 부분
class ProductCategory extends React.Component {
  state = {
    isVisible: false,
    listId:
      CATEGORY_DATA[this.props.location.state.category.toLowerCase()][0].id,
  };

  handleShowProductList = e => {
    this.setState({ isVisible: true });
  };

  handleMouseOverList = e => {
    this.setState({ listId: e.target.id });
  };

  handleCloseProductList = () => {
    this.setState({ isVisible: false });
  };

  goToDetail = productId => {
    this.props.history.push(`/product-detail/${productId}`);
  };

  render() {
    const category = this.props.location.state.category.toLowerCase();
    return (
      <div className={`categoryContainer image${this.state.listId}`}>
        <div className="cover">
          <p className="categoryListTitle">
            <span>{category.toUpperCase()}</span>
          </p>
          <ul className="categoryListContainer">
            {CATEGORY_DATA[category].map(category => {
              return (
                <ProductCategoryList
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  handleShowProductList={this.handleShowProductList}
                  handleMouseOverList={this.handleMouseOverList}
                />
              );
            })}
          </ul>
        </div>
        <ProductList
          listId={this.state.listId}
          isVisible={this.state.isVisible}
          handleCloseProductList={this.handleCloseProductList}
          goToDetail={this.goToDetail}
        />
      </div>
    );
  }
}

export default ProductCategory;

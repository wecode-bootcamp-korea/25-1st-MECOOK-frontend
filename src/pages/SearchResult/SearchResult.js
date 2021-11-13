import React, { Component } from 'react';
import ProductPreview from '../ProductList/ProductPreview/ProductPreview';
import './SearchResult.scss';

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      inputData: '',
      searchResult: [],
    };
  }

  componentDidMount() {
    this.props.location.state &&
      this.setState({
        searchResult: this.props.location.state.searchResult.result,
        inputData: this.props.location.state.keyword,
      });
  }

  handleInput = e => {
    this.setState({ inputData: e.target.value });
  };

  refreshInput = () => {
    this.setState({ inputData: '' });
  };

  render() {
    return (
      <div className="result">
        <div className="resultHeader">
          <div className="resultHeaderBox">
            <p>
              <em className="resultContent">{this.state.inputData}</em>에 대해
              <em className="resultContent">
                총 {this.state.searchResult && this.state.searchResult.length}건
              </em>
              의 검색결과가 있습니다.
            </p>
          </div>
        </div>
        <div className="resultList">
          {this.state.searchResult &&
            this.state.searchResult.map(list => {
              const {
                id,
                thumbImg,
                thumbImgHover,
                category,
                name,
                cookingTime,
                serving,
                like,
                this_user_like,
              } = list;
              return (
                <ProductPreview
                  key={id}
                  productId={id}
                  thumbImg={thumbImg}
                  thumbImgHover={thumbImgHover}
                  category={category}
                  name={name}
                  cookingTime={cookingTime}
                  serving={serving}
                  like={like}
                  userLike={this_user_like}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default SearchResult;

import React from 'react';
import './ProductPreview.scss';

class ProductPreview extends React.Component {
  state = {
    isLiked: 0,
    likeCount: 0,
    imageSrc: '',
  };

  componentDidMount() {
    const { userLike, like, thumbImg } = this.props;
    this.setState({
      isLiked: userLike === 1 ? true : false,
      likeCount: like,
      imageSrc: thumbImg,
    });
  }

  toggleBtnLike = () => {
    if (localStorage.getItem('token')) {
      this.setState({
        isLiked: !this.state.isLiked,
        likeCount: this.state.isLiked
          ? this.state.likeCount - 1
          : this.state.likeCount + 1,
      });

      fetch('http://10.58.2.208:8000/like/user', {
        method: 'POST',
        headers: {
          Authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTB9.dGGBB6a5tL-ZKovnfH-OV1W7tvgMhozGluag6Pqt6ww',
        },
        body: JSON.stringify({
          product: this.props.productId,
        }),
      })
        .then(res => res.json())
        .then(data => console.log(data));
    } else {
      alert('로그인 해주십시오');
    }
  };

  handleImageMouseOver = src => {
    this.setState({
      imageSrc: src,
    });
  };

  handleImageMouseOut = src => {
    this.setState({
      imageSrc: src,
    });
  };

  render() {
    const {
      productId,
      thumbImg,
      thumbImgHover,
      category,
      name,
      cookingTime,
      serving,
      goToDetail,
    } = this.props;
    return (
      <div className="productPreviewContainer">
        <img
          className="productPreviewImage"
          src={this.state.imageSrc}
          alt="food"
          onClick={() =>
            goToDetail(productId, this.state.isLiked, this.state.likeCount)
          }
          onMouseOut={() => this.handleImageMouseOut(thumbImg)}
          onMouseOver={() => this.handleImageMouseOver(thumbImgHover)}
        />
        <h3 className="productType">{category}</h3>
        <p className="productName">{name}</p>
        <div className="productInfo">
          <i className="far fa-clock"></i>
          <span>{cookingTime}</span>
          <i className="far fa-user"></i>
          <span>{serving}</span>
          <i
            className={`btnLike fa-heart ${this.state.isLiked ? 'fas' : 'far'}`}
            onClick={this.toggleBtnLike}
          ></i>
          <span>{this.state.likeCount}</span>
        </div>
      </div>
    );
  }
}

export default ProductPreview;

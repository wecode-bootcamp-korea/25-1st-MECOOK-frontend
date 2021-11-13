import React, { Component } from 'react';
import './Review.scss';
import Repl from './Repl/Repl';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      review: '',
      product: '상품 id',
      replList: [],
      page: 1,
    };
  }

  addRepl = e => {
    if (e.target.value.length > 100) {
      return e.target.value.substring(0, 100);
    }
    this.setState({
      review: e.target.value,
    });
  };

  enterBtn = e => {
    const { review } = this.state;
    if (e.key === 'Enter' && review.trim()) {
      this.addComment();
      e.target.value = null;
    } else if (e.key === 'Enter' && !review.trim()) {
      alert('리뷰를 입력해주세요.');
      e.target.value = '';
      e.target.focus();
    }
  };

  addComment = () => {
    const TOKEN = localStorage.getItem('token');

    fetch('http://10.58.2.208:8000/review/comment', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        product: 1,
        review: this.state.review,
      }),
    })
      .then(res => res.json())
      .then(() => {
        fetch(
          'http://10.58.2.208:8000/review/list?product=1&limit=1&offset=0',
          {
            method: 'GET',
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log('add data===>', data);
            this.setState({
              replList: [...data.review_by_product, ...this.state.replList],
            });
          });
      });
  };

  clearInput = () => {
    this.setState({
      review: '',
    });
  };

  // addReplCnt = () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });

  //   fetch(
  //     `http://10.58.2.208:8000/review/comment/1?limit=3&offset=${
  //       this.state.page * 3
  //     }`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         replList: [...this.state.replList, ...data.review_by_product],
  //       });
  //     });
  // };

  componentDidMount() {
    fetch(`http://10.58.2.208:8000/review/list?product=1&limit=3&offset=0`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log('컴디마 data===>', data);
        this.setState({
          replList: data.review_by_product,
        });
      });
  }

  render() {
    console.log('state-->', this.state);
    console.log('props-->', this.props);
    const { review, replList } = this.state;
    return (
      <section className="review">
        <div className="reviewTop">
          <label className="reviewTitle">
            REVIEW
            <span>({replList ? replList.length : 0})</span>
          </label>
          <div className="textArea">
            <div className="textInputBox">
              <textarea
                className="textInput"
                placeholder="통신예절에 어긋나는 글이나 상업적인 글, 타 사이트에 관련된 글은 관리자에 의해 사전 통보없이 삭제될 수 있습니다"
                onChange={this.addRepl}
                onKeyPress={this.enterBtn}
                value={review}
              />
              <div className="textInputLimit">{review.length}/100</div>
            </div>
            <button className="textInputBtn" onClick={this.addComment}>
              등록
            </button>
          </div>
          <ul className="reviewList">
            {replList &&
              replList.map(repl => {
                const { user, review, userDate, review_id, product } = repl;
                return (
                  <Repl
                    key={review_id}
                    review_id={review_id}
                    user={user}
                    review={review}
                    userDate={userDate}
                    product={product}
                  />
                );
              })}
          </ul>
        </div>
        <div className="viewMore">
          <button className="viewMoreBtn" onClick={this.addReplCnt}>
            &nbsp;&nbsp;VIEW MORE&#8314;&nbsp;&nbsp;
          </button>
          <span>1</span>
          <span>/10</span>
        </div>
      </section>
    );
  }
}

export default Review;

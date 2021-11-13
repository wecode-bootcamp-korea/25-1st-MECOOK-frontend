import React, { Component } from 'react';
import './Repl.scss';

class Repl extends Component {
  // deleteR = () => {
  //   const TOKEN = localStorage.getItem('token');
  //   const { review_id } = this.props;
  //   fetch(`http://10.58.2.208:8000/review/list/${review_id}`, {
  //     // fetch(`http://f960-211-106-114-186.ngrok.io/review/comment/${review_id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: TOKEN,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(() => {
  //       // fetch('http://f960-211-106-114-186.ngrok.io/review/list/1')
  //       fetch('http://10.58.2.208:8000/review/comment/1?offset=0')
  //         .then(res => {
  //           console.log('res===>', res);
  //           res.json();
  //         })
  //         .then(this.fetchData);
  //     });
  // };

  // fetchData = () => {
  //   fetch('http://10.58.2.208:8000/review/comment/1?offset=0')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         feeds: data.results[0].feeds,
  //       });
  //     })
  //     .catch(err => console.log('feeds', err));
  // };

  // // 통신할때만

  // componentDidMount() {
  //   const TOKEN = localStorage.getItem('token');

  //   // fetch('http://f960-211-106-114-186.ngrok.io/review/list/1', {
  //   fetch('http://10.58.2.208:8000/review/comment/1?offset=0', {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: TOKEN,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         replList: data.review_by_product,
  //       });
  //     });
  // }

  render() {
    const { review_id, user, product, review, userDate } = this.props;
    return (
      <li key={review_id}>
        <div className="reviewContent">{review}</div>
        <div className="deleteReview">
          <button className="deleteBtn" onClick={this.deleteR}>
            X
          </button>
        </div>
        <div className="reviewInfo">
          <p id="userId">{user}</p>
          <p id="userDate">{userDate}</p>
        </div>
      </li>
    );
  }
}

export default Repl;

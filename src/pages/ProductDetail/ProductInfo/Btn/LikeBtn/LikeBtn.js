import React from 'react';
import './LikeBtn.scss';
class LikeBtn extends React.Component {
  constructor() {
    super();
    this.state = {
      isToggleOn: 0,
      likeCount: [],
    };
  }
  handleLikeBtn = () => {
    const TOKEN = localStorage.getItem('token');
    fetch('http://10.58.2.208:8000/like/user', {
      method: 'POST',
      headers: {
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        product: this.props.productId,
      }),
    });
    this.setState({
      isToggleOn: !this.state.isToggleOn,
      likeCount: this.state.isToggleOn
        ? this.state.likeCount + 1
        : this.state.likeCount - 1,
    });
    console.log(this.state.likeCount);
  };
  componentDidMount() {
    fetch(`http://10.58.2.208:8000/product/?product=1&detail=1`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          likeCount: data.result[0].like,
        });
      });
  }
  render() {
    const { isToggleOn } = this.state;
    return (
      <button className="likeBtn" onClick={this.handleLikeBtn}>
        <i className={`fas fa-heart ${isToggleOn ? '' : 'colorIcon'}`}></i>
        <span>{this.state.likeCount}</span>
      </button>
    );
  }
}
export default LikeBtn;

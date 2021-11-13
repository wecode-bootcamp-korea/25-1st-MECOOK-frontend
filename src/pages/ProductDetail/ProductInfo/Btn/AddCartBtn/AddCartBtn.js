import React from 'react';
import './AddCartBtn.scss';

class AddCartBtn extends React.Component {
  clickCartBtn = () => {
    fetch('http://10.58.2.208:8000/cart', {
      method: 'POST',
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTB9.dGGBB6a5tL-ZKovnfH-OV1W7tvgMhozGluag6Pqt6ww',
      },
      body: JSON.stringify({
        product: '3',
        quantity: this.props.quantity,
      }),
    })
      .then(res => res.json())
      .then(data => data);
  };

  render() {
    // console.log(this.props.quantity);
    return (
      <form>
        <button onClick={this.clickCartBtn} className="addCartBtn">
          ADD TO MY MENU
        </button>
      </form>
    );
  }
}

export default AddCartBtn;

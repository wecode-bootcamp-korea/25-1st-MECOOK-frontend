import React, { Component } from 'react';
import ProductPreview from '../../ProductList/ProductPreview/ProductPreview';
import { Link } from 'react-router-dom';
import '../Best/Best.scss';

class Best extends Component {
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
        console.log(data);
        this.setState({
          menuList: data.result,
        });
      });
  }

  render() {
    const { menuList } = this.state;
    return (
      <section className="bestBox">
        <div className="bestTitle">
          <img alt="dish" src="/images/Main/dish.png" />
          <div className="topTitle">
            <p>MECOOK</p>
            <p id="best">BEST</p>
          </div>
          <div className="botTitle">
            <p>미쿡에서</p>
            <p>잘 나가는 메뉴를 한눈에!</p>
          </div>
        </div>
        <div className="bestList">
          <p id="viewBest">
            <Link to="/best">
              <i className="fas fa-award" />
              &nbsp;BEST ITEMS
            </Link>
          </p>
          <ul className="listItems">
            {menuList &&
              menuList.map(list => {
                const {
                  id,
                  name,
                  like,
                  category,
                  thumbImg,
                  thumbImgHover,
                  cookingTime,
                  serving,
                } = list;
                return (
                  <ProductPreview
                    key={id}
                    productId={id}
                    name={name}
                    like={like}
                    thumbImg={thumbImg}
                    thumbImgHover={thumbImgHover}
                    cookingTime={cookingTime}
                    category={category}
                    serving={serving}
                  />
                );
              })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Best;

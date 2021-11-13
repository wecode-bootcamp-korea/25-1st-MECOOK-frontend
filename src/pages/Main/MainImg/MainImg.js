import React, { Component } from 'react';
import '../MainImg/MainImg.scss';

class MainImg extends Component {
  render() {
    return (
      <section className="mainImg">
        <img
          className="mySlides"
          alt="hamburger"
          src="/images/Main/hamburger.jpg"
        />
        <a href="https://namu.wiki/w/%ED%94%84%EB%A6%B0%EC%84%B8%EC%8A%A4%20%EB%A9%94%EC%9D%B4%EC%BB%A4">
          <p>
            VIEW MORE&nbsp;<i className="far fa-play-circle"></i>
          </p>
        </a>
      </section>
    );
  }
}

export default MainImg;

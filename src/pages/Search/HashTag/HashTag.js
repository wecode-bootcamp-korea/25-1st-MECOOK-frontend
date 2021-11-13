import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HashTag extends Component {
  constructor() {
    super();
    this.state = {
      hashtagList: [],
      searchResult: [],
    };
  }

  componentDidMount() {
    fetch('http://10.58.2.208:8000/product/?product=1&detail=1', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          hashtagList: data.result[0].hashtag,
        });
      });
  }

  handleSearch = hashTag => {
    fetch(`http://10.58.2.208:8000/product/?search=${hashTag}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          searchResult: result.result,
        });
      })
      .then(() => {
        console.log('setstate: ' + this.state.searchResult);
        this.state.searchResult &&
          this.props.history.push({
            pathname: '/search-result',
            state: {
              searchResult: this.state.searchResult,
              keyword: hashTag,
            },
          });
      });
  };

  render() {
    const { hashtagList } = this.state;
    return (
      <>
        <span className="span">당신의 맛있는 하루를 위한</span>
        <ul className="ul">
          {hashtagList &&
            hashtagList.map(tag => {
              return (
                <li className="li" key={tag}>
                  <Link
                    to="/search-result"
                    onClick={() => this.handleSearch(tag)}
                  >
                    #{tag}
                  </Link>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

export default HashTag;

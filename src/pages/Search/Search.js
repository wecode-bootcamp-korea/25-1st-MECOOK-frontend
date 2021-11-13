import React, { Component } from 'react';
import HashTag from './HashTag/HashTag';
import './Search.scss';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputData: '',
      searchResult: [],
    };
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleInput = e => {
    this.setState({
      inputData: e.target.value,
    });
  };

  isEnter = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleReset = () => {
    this.setState({
      inputData: '',
    });
  };

  handleSearch = () => {
    const searchWords = this.state.inputData.split(' ');

    let query = '';
    for (let i = 0; i < searchWords.length; i++) {
      query += `search=${searchWords[i]}&`;
    }

    fetch(
      `http://10.58.2.208:8000/product/?${query.slice(0, query.length - 1)}`,
      {
        method: 'GET',
      }
    )
      .then(response => response.json())
      .then(result =>
        this.setState({
          searchResult: result,
        })
      )
      .then(() => {
        this.props.history.push({
          pathname: '/search-result',
          state: {
            searchResult: this.state.searchResult,
            keyword: this.state.inputData,
          },
        });
        this.setState({
          inputData: '',
        });
      });
  };

  render() {
    return (
      <div className="searchArea">
        <div className="searchBox">
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="searchInput"
              placeholder="SEARCH"
              onChange={this.handleInput}
              value={this.state.inputData}
              onKeyPress={this.isEnter}
            />
            <i className="fas fa-ban" onClick={this.handleReset}></i>
            <i className="fas fa-search" onClick={this.handleSearch}></i>
          </form>
          <HashTag />
        </div>
      </div>
    );
  }
}

export default Search;

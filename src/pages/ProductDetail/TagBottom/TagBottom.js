import React from 'react';
import { Link } from 'react-router-dom';
import './TagBottom.scss';
class TagBottom extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredList: [],
    };
  }
  handleClick = hashTag => {
    fetch(`http://10.58.2.208:8000/product/search=${hashTag}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          filteredList: result,
        });
      });
    console.log(hashTag);
  };
  render() {
    return (
      <div className="tagBottom">
        <div className="recommandTag">
          <h1>당신을 위한 추천 태그</h1>
        </div>
        <ul className="tagList">
          {this.props.dataResult.result &&
            this.props.dataResult.result[0].hashtag.map((tag, i) => {
              return (
                <li className="li" key={i}>
                  <Link
                    to={{
                      pathname: '/search-result',
                      state: { filteredList: this.state.filteredList },
                    }}
                    onClick={() => this.handleClick(tag)}
                  >
                    {`#${tag}`}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default TagBottom;

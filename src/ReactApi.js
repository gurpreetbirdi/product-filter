import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

class ReactApi extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: `https://itunes.apple.com/search?term=${this.state.searchQuery}&country=us&entity=movie`,
      success: data => {
        const movies = data.results.map(movie => movie.trackName);
        this.setState({
          results: movies
        });
      }
    });
    // console.log('handleClick');
  }

  handleChange(e){
    this.setState({
      searchQuery: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Search
          searchQuery={this.state.searchQuery}
          handleChange={this.handleChange}
          handleClick={this.handleClick} />
        <Results results={this.state.results} />
      </div>
    );

  }
}

class Search extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.searchQuery}
          onChange={this.props.handleChange} />
          <Button bsStyle="primary" onClick={this.props.handleClick}>Bootstrap Send</Button>
        </div>
    );
  }
}

class Results extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.results.map((item, i) => <ResultItem item={item} key={i} />)
        }
      </ul>
    );
  }
}

class ResultItem extends React.Component {
  render() {
    return (
      <li>{this.props.item}</li>
    );
  }
}

export default ReactApi;

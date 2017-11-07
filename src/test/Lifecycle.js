import React, { Component } from 'react';
import { render } from 'react-dom';

class Experiment extends Component {

  componentWillMount() {
    console.log("This will mount");
  }

  componentDidMount() {
    console.log("This did mount");
  }

  componentWillUnmount() {
    console.log("This will unmount");
  }

  render() {
    console.log("I am just rendering like a boss");
    return <div>I got rendered!</div>;
  }

}

export default Experiment;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ParallaxComponent from 'react-parallax-component';
import background from './icons/background.jpg';

class App extends Component {
  render() {
    return (
      <ParallaxComponent
  speed="0.003"
  width="300"
  top="40%"
  left="100"
>
  <div>
    <div className="Test">
      <p>ddsfgsdd</p>
    </div>
  </div>
</ParallaxComponent>
    );
  }
}

export default App;

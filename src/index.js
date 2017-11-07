import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import FilterableProductTable from './product';
// import ReactSelect from './test/ReactSelect';
// import Activity from './test/Activity';
// import AppComponent from './test/test';
// import Input from './test/InputTest'
// import Shift from './test/Shift';
// import Production from './test/Production';
// import Login from './test/Login';
// import BasicExample from './test/ReactRouterBasic';
import Translate from './parallax/Translate';
import AuthExample from './test/ReactRouter';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(<AuthExample />, document.getElementById('root'));
registerServiceWorker();
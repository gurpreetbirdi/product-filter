import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ReactApi from './ReactApi';
import Activity from './Activity';
import Shift from './Shift';
import RechartsBasic from './RechartsBasic';
import FetchDemo from './AxiosTest';
import ReactSelectEx from './ReactSelectEx';
import CustomTextInput from './RefEx';
import Form from './Form';
import DataList from './DataList';
import Login from './Login';
import DataTable from './DataTable';

import menuBar from '../icons/menuBar.png';

import '../css/Test.css';

class BasicExample extends React.Component{
  constructor(props){
    super(props);
    this.state={
      menuDisplay:"block",
      displayView: true
    };
  }
handleClick=()=>{
let menuDisplay = this.state.displayView ? "none":"block";
let displayView = this.state.displayView ? false:true;
this.setState({
  menuDisplay:menuDisplay,
  displayView:displayView
});
// console.log(menuDisplay);
}
render(){
  return(
    <Router>
      <div>
        <a onClick={this.handleClick}>
          <img id="menuBar" src={menuBar} alt="menuBar" />
        </a>
        <div className="MenuBar" style={{display:this.state.menuDisplay}}>
          <Link to="/about" className="Link">Activity</Link><span>  </span>
          <Link to="/topics" className="Link">Topics</Link><span>  </span>
          <Link to="/shift" className="Link">Shift</Link><span>  </span>
          <Link to="/charts" className="Link">Recharts</Link><span>  </span>
          <Link to="/axios" className="Link">Axios</Link><span>  </span>
          <Link to="/ReactSelectEx" className="Link">ReactSelectEx</Link><span>  </span>
          <Link to="/RefEx" className="Link">RefEx</Link><span>  </span>
          <Link to="/Form" className="Link">Form</Link><span>  </span>
          <Link to="/DataList" className="Link">DataList</Link><span>  </span>
          <Link to="/Login" className="Link">Login</Link><span>  </span>
          <Link to="/DataTable" className="Link">DataTable</Link><span>  </span>
        </div>
        <hr/>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
        <Route path="/shift" component={Shift1}/>
        <Route path="/charts" component={Recharts}/>
        <Route path="/axios" component={Axios}/>
        <Route path="/ReactSelectEx" component={ReactSelectEx1}/>
        <Route path="/RefEx" component={RefEx1}/>
        <Route path="/Form" component={Form1}/>
        <Route path="/DataList" component={DataList1}/>
        <Route path="/Login" component={Login1} />
        <Route path="/DataTable" component={DataTable1}/>
      </div>
    </Router>
  );
}
}

    function Home(){
    return(
<div>
      <ReactApi />
    </div>
      );
    }

    const About = () => (
    <div>
      <Activity />
    </div>
    );

    const Shift1 = () => (
    <div>
      <Shift />
    </div>
    );

    const Recharts = () => (
    <div>
      <RechartsBasic />
    </div>
    );

    const Axios = () => (
    <div>
      <FetchDemo subreddit="reactjs"/>,
    </div>
    );
    const ReactSelectEx1 = () => (
    <div>
      <ReactSelectEx />,
    </div>
    );
    const RefEx1 = () => (
    <div>
      <CustomTextInput />,
    </div>
    );
    const Form1 = () => (
    <div>
      <Form />,
    </div>
    );
    const DataList1 = () => (
    <div>
      <DataList />,
    </div>
    );
    const Login1 = () => (
    <div className="BackgroundImg">
      <Login />,
    </div>
    );
    const DataTable1 = () => (
      <div>
        <DataTable />,
    </div>
    );
    const Topics = ({ match }) => (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
    )

    const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
    )

    export default BasicExample

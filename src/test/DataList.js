import React from 'react';

import '../css/Test.css';

class DataList extends React.Component{
constructor(props){
  super(props);
  this.state={
    plant:''
  };
}

handleInputChange=(e)=>{
this.setState({
  plant:e.target.value
});
}
handleClick=(e)=>{
  e.preventDefault();
console.log(this.state);
}
  iframeLoaded = () => {
    let iframeWin = document.getElementById('bfFrame').contentWindow;
    iframeWin.postMessage('jwtToken', 'http://localhost:3000/');
  }
  componentDidMount = () => {
    let checkSender = (e) => {
      // if (e.origin !== "http://localhost:3000")
      // return;
      console.log(e.data);
      console.log(e.origin);
    }
    window.addEventListener('message', checkSender);
  }
render(){
  return(
    <div className="container">
      <form><input className="Uppercase" name="plant" list="plant_name" onChange={this.handleInputChange} />
      <datalist id="plant_name">
        <option value="Plant I" />
        <option value="Plant II" />
        <option value="Plant III" />
        <option value="Plant IV" />
        <option value="Plant V" />
        <option value="Plant VI" />
      </datalist>
      <input type="button" value="Save Shift" onClick={this.handleClick} />
      </form>
      <div>
        <iframe className='ssc-iframe' name='bfFrame' id='bfFrame' onLoad={this.iframeLoaded}
          title='BluefinIFrame' src={'http://localhost:3000/'}></iframe>
      </div>
    </div>
  );
}
}

export default DataList;

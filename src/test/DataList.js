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
    </div>
  );
}
}

export default DataList;

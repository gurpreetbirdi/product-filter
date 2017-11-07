import React from 'react';

class InputValue extends React.Component{
handleChange=(e)=>{
  this.props.onInputChange(e.target.name,e.target.value);
}
render (){
  return(
    <div>
      <form>
        <input name="input1" type="text" value={this.props.inputValue.input1} onChange={this.handleChange} />
        <input name="date1" type="date" value={this.props.inputValue.date1} onChange={this.handleChange} />
        <input name="time1" type="time" value={this.props.inputValue.time1} onChange={this.handleChange} />
        <select name="option1" value={this.props.inputValue.option1} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <input type="button" value="click" onClick={this.props.onBtnClick} />
      </form>
    </div>
  );
}
}

class Input extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input1:'',
      date1:'',
      time1:'',
      option1:''
    };
  }

  handleInputChange=(name,input1)=>{
    this.setState({[name]:input1});
  }

  handleClick=()=>{
    console.log(this.state.input1,this.state.date1,this.state.time1,this.state.option1);
  }
render(){
  return(
    <div>{<InputValue inputValue={this.state} onInputChange={this.handleInputChange} onBtnClick={this.handleClick} />}</div>
  );
}
}

export default Input;

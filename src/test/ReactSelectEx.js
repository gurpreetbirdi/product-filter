import SelectSearch from 'react-select-search';
import React from 'react';

class ReactSelectEx extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activityList:[
          {name: 'BREAK DOWN TIME', value: '1'},
          {name: 'CHANGE OVER', value: '2'},
          {name: 'COOLING TANK CLEANING', value: '3'},
          {name: 'DOWN TIME', value: '4'},
          {name: 'PRODUCTION', value: '5'},
          {name: 'PROFILE CORRECTION', value: '6'},
          {name: 'PROFILE PLATE CLEANING', value: '7'},
          {name: 'SCREW/ADOPTER CLEANING', value: '8'},
          {name: 'SET UP', value: '9'},
          {name: 'SIZER FAIL', value: '10'},
          {name: 'TRAINING', value: '11'}
      ],
      activity:''
    };
  }
  handleChange=(selectedVal,nameVal)=>{
    this.setState({
      [nameVal]:selectedVal.name
    });
    console.log(selectedVal);
  }
  showValue=()=>{
    console.log(this.state.activity);
  }
  render(){
    return(
      <div>
        <SelectSearch name="activity" options={this.state.activityList} multiple={true} height={2}
          onChange={(obj)=>{this.handleChange(obj,"activity")}} />
        <input type="button" onClick={this.showValue} value="Click"/>
      </div>
        );
  }
}

export default ReactSelectEx;

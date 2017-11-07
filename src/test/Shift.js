import React from 'react';
import SelectSearch from 'react-select-search';
import dateFormat from 'dateformat'; //var dateFormat = require('dateformat');
import axios from 'axios';

let now=new Date();
const shiftDate= dateFormat(now,"dd/mm/yyyy");

class Shift extends React.Component{
constructor(props){
  super(props);
  this.state={
    groupList:[
        {name: 'GREEN', value: 'green'},
        {name: 'RED', value: 'red'},
        {name: 'YELLOW', value: 'yellow'}
    ],
    shiftList:[
        {name: 'A', value: 'a'},
        {name: 'B', value: 'b'},
        {name: 'C', value: 'c'},
        {name: 'General Shift', value: 'generalShift'},
        {name: '6 PM to 6 AM', value: '6pm'},
        {name: '6 AM to 6 PM', value: '6am'}
    ],
    lineList:[
        {name: 'Line 1', value: 'l1'},
        {name: 'Line 2', value: 'l2'},
        {name: 'Line 3', value: 'l3'},
        {name: 'Line 4', value: 'l4'},
        {name: 'Line 5', value: 'l5'},
        {name: 'Line 6', value: 'l6'},
        {name: 'Line 7', value: 'l7'}
    ],
    groupLeaderList:[
        {name: 'SARAD MISHRA', value: 'sm'},
        {name: 'RAJESH KUMAR', value: 'rk'}
    ],
    group:'',
    shift:'',
    line:'',
    shiftDate:shiftDate,
    groupLeader:'',
    teamLeader:'Gurpreet Singh',
    teamMember:''
  };
}
handleChange=(selectedVal,stateName)=>{
this.setState({
  [stateName]:selectedVal.name
});
}
handleInputChange=(e)=>{
this.setState({
  teamMember:e.target.value
});
}
handleClick=(e)=>{
  e.preventDefault();
console.log("clicked");
axios.post('http://localhost:1977/SPRWebService/SPRService/shift', {
  group:this.state.group,shift:this.state.shift,line:this.state.line,shiftDate:this.state.shiftDate,
  groupLeader:this.state.groupLeader,teamLeader:this.state.teamLeader,teamMember:this.state.teamMember
})
.then(function (response) {
  console.log(response);
  alert(response.data);
})
.catch(function (error) {
  console.log(error);
});
}
render(){
  return(
    <div className="container">
      <form>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="group">Group</label>
              <SelectSearch name="group" options={this.state.groupList} onChange={(e)=>{this.handleChange(e,"group")}} /></td>
              <td><label htmlFor="shift">Shift</label>
              <SelectSearch name="shift" options={this.state.shiftList} onChange={(e)=>{this.handleChange(e,"shift")}} /></td>
              <td><label htmlFor="line">Line</label>
              <SelectSearch name="line" options={this.state.lineList} onChange={(e)=>{this.handleChange(e,"line")}} /></td>
            </tr>
            <tr>
              <td><input value={shiftDate} disabled/></td>
              <td><label htmlFor="groupLeader">Group Leader</label>
              <SelectSearch name="groupLeader" options={this.state.groupLeaderList} onChange={(e)=>{this.handleChange(e,"groupLeader")}} /></td>
              <td><label htmlFor="teamLeader">Team Leader</label><input className="Uppercase" type="text" value={this.state.teamLeader} disabled /></td>
              <td><label htmlFor="teamMember">Team Members</label>
              <input className="Uppercase" type="text" value={this.state.teamMember} onChange={this.handleInputChange} /></td>
            </tr>
            <tr>
              <td><input type="button" value="Save Shift" onClick={this.handleClick} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
}

export default Shift;

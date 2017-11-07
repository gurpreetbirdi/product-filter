import React from 'react';
import { LineChart, Line, CartesianGrid,XAxis,YAxis,Tooltip, Legend } from 'recharts';
import axios from 'axios';

class RechartsBasic extends React.Component{
constructor(props){
  super(props);
this.state={
  data:[]
};
}
componentDidMount(){
  var a = axios.get(`http://localhost:1977/UserManagement/UserService/users`)
    .then(res => {
      console.log(res);
      let  data = res.data;
      this.setState({ data });
    }).catch(error=>{
      console.log(error);
    });
    console.log(a);

}
  render(){
    return(
<div>
  <LineChart width={600} height={300} data={this.state.data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip/>
    <Legend />
    <Line type="monotone" dataKey="id" stroke="#8884d8" activeDot={{r: 8}}/>
    { /*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/ }
    {/* <Line type="monotone" dataKey="amt" stroke="#e68a00" /> */}
  </LineChart>
</div>
    );
  }
}

export default RechartsBasic;

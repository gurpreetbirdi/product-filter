import React from 'react';
import axios from 'axios';

class Form extends React.Component{

handleClick=(e)=>{
  e.preventDefault();
console.log("clicked");
axios.post('http://localhost:1977/UserManagement/UserService/plant', {
  plant: "B-45"
})
.then(function (response) {
  console.log(response);
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
}
  render(){
    return(
<div>
    <label htmlFor="id">ID</label>
    <input name="id" />
    <br/>
    <label htmlFor="summary">Summary</label>
    <input name="summary" />
    <br/>
    Description:
    <textarea name="description" cols="40" rows="6"></textarea>
    <br/>
    <input type="button" value="Click" onClick={this.handleClick} />
</div>
    );
  }
}

export default Form;

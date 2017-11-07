import React from 'react';
import logoTp from '../icons/logoTp.png';
import sprTp from '../icons/sprTp.png';
import '../css/Test.css';

class Login extends React.Component {
handleChange=(e)=>{

}
  render() {
    return (
      <div>
        <div>
          <img src={logoTp} alt="ppapLogo" width="105" height="59" />
          <h2>SHIFT PERFORMANCE REPORT (EXTRUSION)</h2>
          <img src={sprTp} alt="sprLogo" width="105" height="59"/>
        </div>
        <div className="GreyBox">
          <div className="BlackBox">
          <form id="userLogin">
            <fieldset>
              <legend>User Login</legend>
              <label htmlFor="role">Role:</label>
              <select name="role" id="role">
                <option>Team Leader</option>
                <option>Group Leader</option>
              </select>
              <div>
                <label htmlFor="comp">Plant:</label>
              <select name="plant" id="comp">
                <option>Plant-I (B-45)</option>
                <option>Plant-II(B-206)</option>
                <option>Plant-III (B-4)</option>
                <option>Plant-IV (Pathredi)</option>
                <option>Plant-V (Chennai)</option>
              </select>
              </div>
            <div>
              <label htmlFor="emp">Employee Code:</label>
              <input id="emp" type="text" name="empcd" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="pwd">Password:</label>
              <input id="pwd" type="password" name="password"/>
            </div>
            <div>
              <button type="submit" name="Login" id="Login" form="userLogin"><span>Login</span></button>
            </div>
          </fieldset>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

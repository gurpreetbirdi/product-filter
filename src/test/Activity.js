import React from 'react';
import ReactSelect from './ReactSelect';

class ActivityRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [
        { name: 'BREAK DOWN TIME', value: '1' },
        { name: 'CHANGE OVER', value: '2' },
        { name: 'COOLING TANK CLEANING', value: '3' },
        { name: 'DOWN TIME', value: '4' },
        { name: 'PRODUCTION', value: '5' },
        { name: 'PROFILE CORRECTION', value: '6' },
        { name: 'PROFILE PLATE CLEANING', value: '7' },
        { name: 'SCREW/ADOPTER CLEANING', value: '8' },
        { name: 'SET UP', value: '9' },
        { name: 'SIZER FAIL', value: '10' },
        { name: 'TRAINING', value: '11' }
      ]
    };
  }
  handleChange = (e) => {
    this.props.onInputChange(e.target.name, e.target.value, this.props.rowIndex);
    // console.log(e.target.name);
  }
  render() {
    return (
      <tr>
        <td><input name="from1" type="time" onChange={this.handleChange} /></td>
        <td><input name="to1" type="time" onChange={this.handleChange} /></td>
        <td>{<ReactSelect name="select1" options={this.state.activityList} value="9" />}</td>
        <td><input className="Uppercase" name="varAnly" type="text" onChange={this.handleChange} /></td>
        <td><input className="Uppercase" name="actTaken" type="text" onChange={this.handleChange} /></td>
        <td><input type="button" onClick={this.props.onClickPlus} value="Add" />
        </td>
        <td><input type="button" onClick={this.props.onClickMinus} value="Remove" />
        </td>
      </tr>
    );
  }
}

class ActivityTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityNum: 1,
      activityRow: [<ActivityRow rowIndex={0} onInputChange={this.handleInputChange}
        onClickPlus={this.handleAddNewActClick} key={1} />],
      data: [{
        from1: "", to1: "", select1: "", varAnly: "", actTaken: ""
      }]
    };
  }
  handleInputChange = (name, value1, rwIndex) => {
    this.setState(prevState => {
      let newData = prevState.data
      newData[rwIndex][name] = value1;
      return { data: newData };
    });
  }
  componentDidUpdate = () => {
    console.log(this.state.data);
  }

  handleRemoveNewAct = () => {
    let removeAct = this.state.activityRow;
    removeAct.pop();
    this.setState({
      activityNum: this.state.activityNum - 1,
      activityRow: removeAct
    });
    console.log("removed");
  }
  handleAddNewActClick = () => {
    let newAct = this.state.activityRow;
    let newData = this.state.data;
    newAct.push(<ActivityRow rowIndex={newAct.length} onInputChange={this.handleInputChange}
      onClickPlus={this.handleAddNewActClick}
      onClickMinus={this.handleRemoveNewAct} key={this.state.activityNum + 1} />);
    newData.push({
      from1: "", to1: "", select1: "", varAnly: "", actTaken: ""
    });
    this.setState({
      activityNum: this.state.activityNum + 1,
      activityRow: newAct,
      data: newData
    });
    console.log("added");
  }
  render() {
    return (
      <div>
        <form>
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Activity</th>
                <th>Variance Analysis</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {this.state.activityRow}
              <tr>
                <td>
                  <input type="button" value="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

class Activity extends React.Component {
  render() {
    return (
      <div>{< ActivityTable />}</div>
    );
  }
}

export default Activity;

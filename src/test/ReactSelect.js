import React from 'react';
import SelectSearch from 'react-select-search';
import '../css/example.css';

class ReactSelect extends React.Component {

  /**
   * The options array should contain objects.
   * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
   */
  render() {
    return (
      <div>
        <SelectSearch options={this.props.options} value={this.props.value} />
      </div>
    );
  }
}

export default ReactSelect;

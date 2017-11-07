import React from 'react';
import SelectSearch from 'react-select-search'

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'}
];

/* Simple example */

class SelectDropdown extends React.Component{
  render(){
    return(
      <div>
<SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" />
      </div>
    );
  }
}

export default SelectDropdown;

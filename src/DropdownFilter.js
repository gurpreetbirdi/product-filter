import React from 'react';

class SelectItem extends React.Component{
  render(){
    var dropdowmItem=[];
    this.props.items.forEach((item)=>{
dropdowmItem.push(<option key={item.name}>{item.name}</option>);
    });
    return(
<div>
  <select>{dropdowmItem}</select>
</div>
    );
  }
}

class DropdownFilter extends React.Component{
  render(){
    return(
      <SelectItem items={this.props.products}/>
    );
  }
}

export default DropdownFilter;

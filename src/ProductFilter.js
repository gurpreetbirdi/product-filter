import React from 'react';

class ProductCategoryRow extends React.Component{
  render(){
    return(
      <tr><th colSpan="2">
        {this.props.category}
      </th></tr>
    );
  }
}

class ProductRow extends React.Component{
  render(){
    var name=this.props.product.stocked ? this.props.product.name:<span style={{color:'red'}}>{this.props.product.name}</span>;
    return(
      <tr>
        <td>{name}</td>
      <td>{this.props.product.price}</td>
    </tr>
    );
  }
}

class ProductTable extends React.Component{
  render(){
    var rows=[];
    var lastCategory= null;
    this.props.products.forEach((product)=>{
if(product.name.indexOf(this.props.filterText)===-1 || (!product.stocked && this.props.inStockOnly)){
  return;
}
      if(product.category!==lastCategory){
rows.push(<ProductCategoryRow key={product.category} category={product.category}/>);
      }
      rows.push(<ProductRow key={product.name} product={product}/>);
      lastCategory=product.category;
    });
    return(
      <div>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th></tr>
  </thead>
<tbody>
{rows}
</tbody>
</table>
      </div>
    );
  }
}

class SearchBar extends React.Component{
constructor(props){
  super(props);
  this.handleTextChange=this.handleTextChange.bind(this);
  this.handleCheckChange=this.handleCheckChange.bind(this);
}
handleTextChange(e){
this.props.onTextChange(e.target.value);
}
handleCheckChange(e){
this.props.onCheckChange(e.target.checked);
}
  render(){
    return(
      <div>
<form>
  <input type="text" placeholder="Search.." value={this.props.filterText} onChange={this.handleTextChange}/>
<p>
  <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleCheckChange}/>
Only show products in stock
</p>
</form>
      </div>
    );
  }
}

class ProductFilter extends React.Component{
constructor(props){
  super(props);
  this.state={
    filterText:'',
    inStockOnly:false,
    };
    this.handleText=this.handleText.bind(this);
    this.handleCheck=this.handleCheck.bind(this);
}
handleText(filterText){
this.setState({filterText:filterText});
}
handleCheck(inStockOnly){
this.setState({inStockOnly:inStockOnly});
}
render(){
return(
<div>
<SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}
  onTextChange={this.handleText} onCheckChange={this.handleCheck}/>
<ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
</div>
);
}
}

export default ProductFilter;

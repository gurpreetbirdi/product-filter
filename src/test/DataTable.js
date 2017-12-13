import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var products = [{
    id: 1,
    name: "Product1",
    price: 100
    }, {
    id: 2,
    name: "Product2",
    price: 80
    }, {
        id: 3,
        name: "Product3",
        price: 180
    },{
        id: 4,
        name: "Product4",
        price: 380
    }, {
        id: 1,
        name: "Product1",
        price: 100
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }, {
        id: 3,
        name: "Product3",
        price: 180
    }, {
        id: 4,
        name: "Product4",
        price: 380
    }, {
        id: 1,
        name: "Product1",
        price: 100
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }, {
        id: 3,
        name: "Product3",
        price: 180
    }, {
        id: 4,
        name: "Product4",
        price: 380
    }
];
class ActiveFormatter extends React.Component {
    render() {
        return (
            <input type='checkbox' checked={this.props.active} />
        );
    }
}

class DataTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hideCol: false
        }
    }
    handleClick = () => {
        this.setState((prevState) => ({
            hideCol: prevState.hideCol ? false : true
        }));
    }
    activeFormatter = (cell, row) => {
        return (
            <ActiveFormatter active={cell} />
        );
    }
    onAfterDeleteRow = (rowKeys) => {
        alert('The rowkey you drop: ' + rowKeys);
    }
    afterSearch = (searchText, result) => {
        console.log('Your search text is ' + searchText);
        console.log('Result is:');
    }
    render(){
        const options = {
            paginationPosition: 'both',  // default is bottom, top and both is all available
            afterDeleteRow: this.onAfterDeleteRow,  // A hook for after droping rows.
            afterSearch: this.afterSearch  // define a after search hook
        };
        const selectRowProp = {
            mode: 'checkbox'
        };
        return(
            <div>
            <button onClick={this.handleClick}>hide col</button>
            <BootstrapTable data={products} deleteRow={true} selectRow={selectRowProp} striped hover 
                    pagination={true} options={options} search={true}>
                    <TableHeaderColumn width='100' dataField='id' isKey dataSort={true} searchable={false} 
                    hidden={this.state.hideCol}>ProductID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>ProductName</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort={true}>ProductPrice</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataFormat={ this.activeFormatter }>Active</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DataTable;

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
        id: 2,
        name: "Product2",
        price: 80
    },
    {
        id: 2,
        name: "Product2",
        price: 80
    }
];
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
    render(){
        return(
            <div>
            <button onClick={this.handleClick}>hide col</button>
                <BootstrapTable data={products} height='200' scrollTop={'Bottom'} striped hover>
                    <TableHeaderColumn width='50' dataField='id' isKey dataSort={true}>ProductID</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='name' dataSort={true}>ProductName</TableHeaderColumn>
                    <TableHeaderColumn width='50' dataField='price' hidden ={this.state.hideCol}>ProductPrice</TableHeaderColumn>
                    <TableHeaderColumn width='50' dataField='name'>ProductName</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='price'>ProductPrice</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='name'>ProductName</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='price'>ProductPrice</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='name'>ProductName</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default DataTable;

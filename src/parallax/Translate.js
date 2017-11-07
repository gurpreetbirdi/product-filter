import React, {Component} from 'react';
import '../css/parallax.css';

class Translate extends Component{
	constructor(props){
		super(props);
		this.state={
			id:""
		};
	}
componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
}

handleScroll=(event)=> {
	this.setState(prevState=>{
		console.log(prevState.id);
		return{id:'animate'};
	});
}
render(){
	return(
		<div className="background">
			<div id={this.state.id} className="Box"></div>
		</div>
		);
}
}

export default Translate;
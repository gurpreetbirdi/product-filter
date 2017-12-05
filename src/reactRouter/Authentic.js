import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link, Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import Login from '../test/Login';

const User = ({match, location, history}) => {
    return(
    <div>
        <h3>{match.params.username}</h3>
        {console.log(match)}
        {console.log(location)}
        {console.log(history)}
        {history.listen((location, action) => {
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
        })}
    </div>
);
}
const List = ({ to }) => (<Route path={to} children={({match}) => <div>listitem</div>}/>);
const Authentic = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/user/:username' component={User}/>
                <Route path='/home' render={()=><div>HOME</div>}/>
                <Route exact strict path="/about" render={() => <div>ABOUT</div>}/>
                <Redirect from='/contact' to='/home'/>
                <List to='/1'/>
                <List to='/2'/>
                <Route component={Login} />
            </Switch>
        </Router>
    );
}

export default Authentic;

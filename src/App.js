// App.js
import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import DragScreen from './Components/DragScreen/DragScreen';
import Home from './Components/Home/Home';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <>
        <div>
          {JSON.stringify(this.props.reduxState)}
          <Router>
          
            <Link to='/'>Home</Link>
            <Link to='/dragScreen'>DragScreen</Link>

            <Route exact path='/' component={Home}/>
            <Route path='/dragScreen' component={DragScreen}/>

          </Router>
        </div>
      </>
    );
  }
}

const mapStateToProps = (reduxState)=>({
  reduxState
});

export default connect(mapStateToProps)(App);
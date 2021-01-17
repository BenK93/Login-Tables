
import './App.css';
import 'antd/dist/antd.css';
import InfoPage from './components/Pages/InfoPage';
import LoginPage from './components/Pages/LoginPage';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = (props) =>{
  return (
        <Router>
          <Switch>
              <Route path="/" component={LoginPage} exact/>
              { props.isLoggedIn ?              
              <Route path="/info" component={InfoPage} exact/>
              : 
              <Route path="/info" component={LoginPage} exact/>
              }
          </Switch>            
        </Router>    
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}


export default connect(mapStateToProps, null)(App);

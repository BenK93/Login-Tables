import './App.css';
import 'antd/dist/antd.css';
import LoginPage from './components/Pages/LoginPage';
import InfoPage from './components/Pages/InfoPage';
import GlobalStateProvider from "./store/GlobalStateProvider";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <GlobalStateProvider> 
        <Router>
          <Switch>
              <Route path="/" component={LoginPage} exact/>
              <Route path="/info" component={InfoPage} exact/>
          </Switch>            
        </Router>    
    </GlobalStateProvider>
  );
}

export default App;

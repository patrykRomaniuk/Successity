import React,{ useEffect } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';
import './styles/App.css';
import setAuthToken from './middleware/setAuthToken';
import { loadUser } from './actions/auth';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);
  return (
    <Provider store={store}>
      <Router>
        <Navbar/> 
        <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/register" component={ Register }/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App


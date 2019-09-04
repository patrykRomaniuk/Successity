import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Navbar/> 
      <Switch>
       <Route exact path="/" component={ Landing } />
       <Route exact path="/register" component={ Register }/>
      </Switch>
    </Router>
  )
}

export default App


import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Navbar/> 
      <Switch>
       <Route exact path="/" component={ Landing } />
      </Switch>
    </Router>
  )
}

export default App


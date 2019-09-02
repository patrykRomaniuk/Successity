import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Switch>
       <Route path="/" component={ Landing } />
      </Switch>
    </Router>
  )
}

export default App


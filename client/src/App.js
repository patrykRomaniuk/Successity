import React,{ useEffect } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import PostPage from './pages/PostPage';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './middleware/setAuthToken';
import { loadUser } from './actions/auth';
import Account from './pages/Account';
import AddPost from './pages/AddPost';
import Topics from './pages/Topics';
import './styles/App.css';
import './styles/AddPostPage.css';
import './styles/RegisterPage.css';
import './styles/Topics.css';
import './styles/Users.css';

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
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/account" component={ Account }/>
        <Route exact path="/add-post" component={ AddPost }/>
        <Route exact path="/topics" component={ Topics }/>
        <Route exact path="/topics/topic/:id" component={ PostPage } />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App


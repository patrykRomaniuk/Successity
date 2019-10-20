import React,{ useEffect } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import PostPage from './pages/PostPage';
import Dashboard from './pages/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './middleware/setAuthToken';
import { loadUser } from './actions/auth';
import Account from './pages/Account';
import AddPost from './pages/AddPost';
import Topics from './pages/Topics';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import ContactPage from './pages/ContactPage';
import './styles/Dashboard.css';
import './styles/App.css';
import './styles/AddPostPage.css';
import './styles/RegisterPage.css';
import './styles/Topics.css';
import './styles/ChangeProfile.css';

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
        <Route exact path="/dashboard" component={ Dashboard }/>
        <Route exact path="/users" component={ Users }/>
        <Route exact path="/topics/topic/:id" component={ PostPage } />
        <Route exact path="/users/user/:user_id" component={ UserProfile }/>
        <Route exact path="/change-password" component={ ChangePassword }/>
        <Route exact path="/change-profile" component={ ChangeProfile }/>
        <Route exact path="/contact-us" component={ ContactPage }/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App


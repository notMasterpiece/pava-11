import React, {Component} from 'react';

import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../components/layout/Navbar';
import RightBar from '../components/layout/RightBar';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import MessagesIndex from './pages/messages/MessagesIndex';
import PostFeedIndex from './pages/feed/PostFeedIndex';
import AllPosts from './pages/posts/AllPosts';
import SinglePostWrap from './pages/posts/SinglePostWrap';
import AddEducation from './pages/add-education/AddEducation';
import AddExperiense from './pages/add-experiense/AddExperiense';
import EditProfile from './pages/edit-profile/EditProfile';
import CreateProfile from './pages/create-profile/CreateProfile';
import AllProfiles from './pages/profiles/AllProfilesIndex';
import CustomeUserProfile from './pages/custome-user-profile/CustomeUserIndex';
import Gallery from './pages/Gallery/GalleryIndex';



// blogArticles
import PostCreate from './pages/blog/post-create/PostCreate';
import BlogIndex from './pages/blog/blogArticles/BlogIndex';
import BlogSingleIndex from './pages/blog/blogSingle/BlogSingleIndex';


import FakeIndex from './pages/fake/fakeIndex';
import Test from './pages/test';

import Content from './pages/profile/Content';
import Admin from './pages/Admin/Admin';
import store from "../store/store";

import Proggres from './Tools/Progres/Progress';


import jwt_decode from "jwt-decode";
import { setAuthToken } from '../helpers/helpers';
import { setCurrentUser, logoutUser } from '../actions/actions';
import { clearProfile } from '../actions/profileActions';


if(localStorage.jwtToken) {
    //Set auth token
    setAuthToken(localStorage.jwtToken);
    //Decode token
    const decode = jwt_decode(localStorage.jwtToken);
    //Set user and isAuthenticated
    store.dispatch( setCurrentUser( decode ) );

    // logout user
    const currentTime = Date.now() / 1000;
    if(decode.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearProfile());
        window.location.href = '/login';
    }
}





class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMobileMenu: false
        };
    }

    funcShowMobileMenu = () => {
        const { showMobileMenu } = this.state;
        this.setState({showMobileMenu: !showMobileMenu});
    };

  render() {
    const { showMobileMenu } = this.state;
    const {auth, dom:{smallRightBar}} = this.props;

      // if(errors.global_error) {
      //     return <Redirect to='/error' />
      // }

      if( auth.isAuthenticated !== true ) {
      return <Redirect to='/login' />
    }

    return (

      <div className={`theme-black ${smallRightBar ? 'menu_sm' : ''}`} >
        <Proggres />
        <Navbar
            funcShowMobileMenu={this.funcShowMobileMenu}

        />
        <RightBar
            showMobileMenu={showMobileMenu}
        />

        <section className="content">
          <div className="container-fluid">
              <Switch>
                  <Route exact path='/' component={ Content } />
                  <Route exact path='/dashboard' component={ Content } />
                  <Route exact path='/messages' component={ MessagesIndex } />
                  <Route exact path='/settings' component={ Settings } />
                  <Route exact path='/not-found' component={ NotFound } />
                  <Route exact path='/feed' component={ PostFeedIndex } />
                  <Route exact path='/posts' component={ AllPosts } />
                  <Route exact path='/post/:id' component={ SinglePostWrap } />
                  <Route exact path='/add-education' component={ AddEducation } />
                  <Route exact path='/add-experience' component={ AddExperiense } />
                  <Route exact path='/edit-profile' component={ EditProfile } />
                  <Route exact path='/create-profile' component={ CreateProfile } />
                  <Route exact path='/profiles' component={ AllProfiles } />
                  <Route exact path='/profile/:handle' component={ CustomeUserProfile } />
                  <Route exact path='/admin' component={ Admin } />
                  <Route exact path='/gallery/:_id' component={ Gallery } />

                  <Route exact path='/blog' component={ BlogIndex } />
                  <Route exact path='/blog/post-create' component={ PostCreate } />
                  <Route exact path='/blog/:_id' component={ BlogSingleIndex } />



                  {/* for testing */}
                  <Route exact path='/fake' component={ FakeIndex } />
                  <Route exact path='/test' component={ Test } />

                  <Route path='*' render={ () => <Redirect to='/not-found' /> } />
              </Switch>
          </div>
        </section>

      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  dom: state.dom,
  errors: state.errors
}))(Dashboard);

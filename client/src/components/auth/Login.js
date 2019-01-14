import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {loginUser, loginUserbyFacebook} from '../../actions/actions';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import bg from '../../assets/images/matrix.gif';
import Register from './Register';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    }

  }


  onchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  registerSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
      errors: {}
    };

    this.props.loginUser(user);
  };


  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }


  componentWillReceiveProps(nextPpops) {
    if(nextPpops.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }


    if(nextPpops.errors) {
      this.setState({
        errors: nextPpops.errors
      })
    }
  }


  responseFacebook = user => {

    const newUser = {
      name: user.name,
      email: user.email,
      avatar: user.picture.data.url,
      id: user.id,
      provider: 'facebook'
    };

    this.props.loginUserbyFacebook(newUser);
  };


  responseGoogle = user => {

    const newUser = {
      name: user.profileObj.name,
      email: user.profileObj.email,
      avatar: user.profileObj.imageUrl,
      id: user.googleId,
      provider: 'google'
    };

    this.props.loginUserbyFacebook(newUser);
  };


  render() {

    const { email, password, errors } = this.state;


    return (
      <div className="theme-black">

        <div className="authentication" style={{backgroundImage: `url(${bg})`}}>
          <div className="container">
            <div className="col-md-12 content-center">
              <div className="row row-center">
                <div className="col-lg-6 col-md-12">
                  <div className="company_detail">
                    {/*<h4 className="logo"><img src="assets/images/logo.svg" alt="" /></h4>*/}
                    <h3>Pava</h3>
                    <p>Some network</p>
                    <div className="footer">
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 offset-lg-1">
                  <div className="card-plain">
                    <div className="header">
                      <h5>Увійти на P.A.V.A</h5>
                    </div>
                    <form className="form form-group" onSubmit={ this.registerSubmit }>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Ваше ім'я"
                          name="email"
                          value={email}
                          onChange={ this.onchange }
                        />
                        <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-account-circle" /></span></div>
                      </div>
                      {
                        errors.email &&
                        <div className="help-info">{errors.email}</div>
                      }
                      <div className="input-group">
                        <input
                          type="password"
                          placeholder="Ваш пароль"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          name="password"
                          value={password}
                          onChange={ this.onchange }
                        />
                        <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-lock" /></span></div>
                      </div>
                      {
                        errors.password &&
                        <div className="help-info">{errors.password}</div>
                      }
                      <div className="footer pb-0">
                        <button className="btn btn-primary btn-round btn-block">Увійти</button>
                      </div>
                    </form>
                    <div className="footer pt-0">
                      <NavLink to="register" className="btn btn-primary btn-simple btn-round btn-block">Зареєструватися</NavLink>
                    </div>
                    <NavLink to='forgot' className="link">Забули пароль</NavLink>

                    <br/>

                    <div className="social-login">
                      <FacebookLogin
                          appId="488196955039549"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={this.responseFacebook}
                          textButton = "Увійти через Facebook"
                          cssClass="btnFacebook"
                          icon={<i className="zmdi zmdi-facebook" />}
                      />

                      <GoogleLogin
                          clientId="320137920290-a7t5q94gd22h0ktkn5k9qeq8n0nq2eo5.apps.googleusercontent.com"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          buttonText="Увійти через Google"
                          className={'btnGoogle'}
                      />

                      {/*<LinkedIn*/}
                          {/*clientId='777cbc1gfof8yk'*/}
                          {/*callback={this.callbackLinkedIn}*/}
                          {/*className={'btnLinkedin'}*/}
                          {/*text='LinkedIn' />*/}


                      {/*<LinkedinSDK*/}
                          {/*clientId="777cbc1gfof8yk"*/}
                          {/*callBack={this.responseLinkedin}*/}
                          {/*fields=":(id,num-connections,picture-url)"*/}
                          {/*className={'className'}*/}
                          {/*loginButtonText={'Login with Linkedin'}*/}
                          {/*logoutButtonText={'Logout from Linkedin'}*/}
                          {/*buttonType={'button'}*/}
                          {/*// icon={<Icon />}*/}
                          {/*getOAuthToken*/}
                      {/*/>,*/}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



Register.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


export default connect(state => ({
  auth: state.auth,
  errors: state.errors
}), {loginUser, loginUserbyFacebook})(Login);

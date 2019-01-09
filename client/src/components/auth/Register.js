import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { goToLogin } from '../../actions/actions';


import zxcvbn from 'zxcvbn';



import bg from '../../assets/images/bg2.jpg';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      score: 'null',
      type: 'password',
      name: '',
      email: '',
      password: '',
      password2: '',
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
    const { name, email, password, password2 } = this.state;
    const user = {
      name,
      email,
      password,
      password2
    };


    this.props.goToLogin(user, this.props.history);

  };


  showHide = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  };




  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextPpops) {
    if(nextPpops.errors) {
      this.setState({
        errors: nextPpops.errors
      })
    }
  }

  passwordStrength = e => {
    this.setState({
      password: e.target.value,
    });

    if(e.target.value === ''){
      this.setState({
        score: 'null'
      })
    }
    else{
      const pw = zxcvbn(e.target.value);
      this.setState({
        score: pw.score
      });
    }

  };




  render() {

    const { name, email, password, password2, errors, type, score } = this.state;

    return (
      <div className="theme-black">

        <div className="authentication" style={{backgroundImage: `url(${bg})`}}>
          <div className="container">
            <div className="col-md-12 content-center">
              <div className="row row-center">
                <div className="col-lg-6 col-md-12">
                  <div className="company_detail">
                    <h3>Pava</h3>
                    <p>Register a new membership in my network :)</p>
                    <div className="footer">
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 offset-lg-1">
                  {/*register*/}
                    <div className="card-plain">
                      <div className="header">
                        <h5>Реєстрація</h5>
                        <span>Register a new membership</span>
                      </div>
                      <form className="form form-group" onSubmit={ this.registerSubmit }>
                        <div className="input-group">
                          <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Введіть Ім'я"
                            name="name"
                            value={name}
                            onChange={ this.onchange }
                          />
                          <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-account-circle" /></span></div>
                        </div>
                        {
                          errors.name &&
                          <div className="help-info">{errors.name}</div>
                        }

                        <div className="input-group">
                          <input
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            onChange={this.onchange}
                          />
                          <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-email" /></span></div>
                        </div>
                        {
                          errors.email &&
                          <div className="help-info">{errors.email}</div>
                        }
                        <br/>
                        <div className="input-group">
                          <input
                            type={type}
                            placeholder="Password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            value={password}
                            onChange={this.passwordStrength}
                          />
                            <div className="input-group-append">
                              <span className="input-group-text">
                                {
                                  type === 'input'
                                    ?
                                    <i className="zmdi zmdi-lock-open" style={{color: '#f96332'}} onClick={this.showHide} />
                                    :
                                    <i className="zmdi zmdi-lock" onClick={this.showHide} />
                                }
                              </span>
                            </div>
                        </div>
                        <span className="password__strength" data-score={score} />
                        {
                          errors.password &&
                          <div className="help-info">{errors.password}</div>
                        }
                        <div className="input-group">
                          <input
                            type={type}
                            placeholder="Confirm Password"
                            className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                            name="password2"
                            value={password2}
                            onChange={this.onchange}
                          />
                          <div className="input-group-append">
                              <span className="input-group-text">
                                {
                                  type === 'input'
                                    ?
                                    <i className="zmdi zmdi-lock-open" style={{color: '#f96332'}} onClick={this.showHide} />
                                    :
                                    <i className="zmdi zmdi-lock" onClick={this.showHide} />
                                }
                              </span>
                          </div>
                        </div>
                        {
                          errors.password2 &&
                          <div className="help-info">{errors.password2}</div>
                        }
                        <div className="footer">
                          <button type='submit' className="btn btn-primary btn-round btn-block">Зареєструватися</button>
                        </div>
                      </form>

                      <Link className='register_link' to={'/login'}>You already have a membership?</Link>
                    </div>
                  {/*register*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Register.propTypes = {
  goToLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(state => ({
  auth: state.auth,
  errors: state.errors
}), {goToLogin})(withRouter(Register));

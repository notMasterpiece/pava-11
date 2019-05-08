import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, loginSocial} from '../../actions/auth-action';


import MatrixRein from '../Tools/MatrixReain';
import Register from './Register';

import Social from './Social';

const providers = ['google', 'facebook', 'github', 'linkedin'];


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
        const {email, password} = this.state;
        this.props.login(email, password);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.runMatrixRain);
    }

    runMatrixRain = () => {
        const canvas = new MatrixRein(document.querySelector('#matixRain'));
        canvas.init()
    };


    componentDidMount() {

        window.addEventListener('resize', this.runMatrixRain);
        this.runMatrixRain();

        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        // if (nextProps.errors) {
        //     this.setState({
        //         errors: nextProps.errors
        //     })
        // }
    }

    render() {

        const {email, password, errors} = this.state;

        return (
            <div className="theme-black">
                <div className="authentication">
                    <canvas id="matixRain" className="u-matrix-rain"/>
                    <div className="container">
                        <div className="col-md-12 content-center">
                            <div className="row row-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="company_detail">
                                        <h3>Pava</h3>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 offset-lg-1">
                                    <div className="card-plain">
                                        <div className="header">
                                            <h5>Увійти на P.A.V.A</h5>
                                        </div>
                                        <form className="form form-group" onSubmit={this.registerSubmit}>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    placeholder="Ваше ім'я"
                                                    name="email"
                                                    value={email}
                                                    onChange={this.onchange}
                                                />
                                                <div className="input-group-append"><span
                                                    className="input-group-text"><i
                                                    className="zmdi zmdi-account-circle"/></span></div>
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
                                                    onChange={this.onchange}
                                                />
                                                <div className="input-group-append"><span
                                                    className="input-group-text"><i className="zmdi zmdi-lock"/></span>
                                                </div>
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
                                            <NavLink to="register"
                                                     className="btn btn-primary btn-simple btn-round btn-block">Зареєструватися</NavLink>
                                        </div>
                                        <NavLink to='forgot' className="link">Забули пароль</NavLink>

                                        <div className="social">
                                            <div className="social_title">Через социальные сети</div>
                                            <div className="social_btn">
                                                {providers.map(provider =>
                                                    <Social
                                                        loginSocial={this.props.loginSocial}
                                                        provider={provider}
                                                        loginUserBySocial={this.props.loginUserBySocial}
                                                        key={provider}
                                                    />
                                                )}
                                            </div>
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
}), {login, loginSocial})(Login);

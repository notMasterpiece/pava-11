import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { resetPassword } from '../../actions/actions';
import { validateEmail } from '../../helpers/helpers';


class Forgot extends Component {

    static propTypes = {
        resetPassword: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    };

    state = {
        email: '',
        errors: null
    };

    onchange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    registerSubmit = e => {
        e.preventDefault();

        const { email } = this.state;

        if (!validateEmail(email) ) {
            return this.setState({
                errors: 'Неправильний E-mail'
            });
        }
        const user = {
            email
        }
        this.setState({errors: null});
        this.props.resetPassword(user);

    };


    loadFbLoginApi() {

        window.fbAsyncInit = function() {
            console.log(1);
            window.FB.init({
                appId: '100035900420838', //FB App ID
                autoLogAppEvents : true,
                xfbml            : true,
                version: 'v3.2' //use this graph api version 3.2
            });
        };

        console.log("Loading fb api");
        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }


    componentDidMount() {

        this.loadFbLoginApi();


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


    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);

            window.FB.api(
                '/me/friends',
                {scope: 'user_friends'},
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        console.log(response);
                    }
                },
            );


            window.FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    // The user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire.
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;

                    console.log(accessToken);

                } else if (response.status === 'not_authorized') {
                    // The user hasn't authorized your application.  They
                    // must click the Login button, or you must call FB.login
                    // in response to a user gesture, to launch a login dialog.
                } else {
                    // The user isn't logged in to Facebook. You can launch a
                    // login dialog with a user gesture, but the user may have
                    // to log in to Facebook before authorizing your application.
                }
            });
        });
    }

    statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
    }

    checkLoginState = () => {
        window.FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    };

    handleFBLogin = () => {
        window.FB.login(this.checkLoginState());
    };


    FB = () => {
        window.FB.login( response => {
            if (response.authResponse) {
                // Get and display the user profile data
                window.FB.api('/me',
                    'GET',
                    {
                        locale: 'en_US',
                        fields: 'id,first_name,last_name,email,link,gender,locale,picture',
                        'height': 500
                    },
                        res => {
                            console.log(res);
                            window.FB.api(
                                `/${res.id}/picture`,
                                'GET',
                                {
                                    "redirect":"false",
                                    "height": "500"
                                },
                                function(response) {
                                    console.log(response);
                                    // Insert your code here
                                }
                            );
                            window.FB.api(
                                `/${res.id}/friends`,
                                'GET',
                                {},
                                function(response) {
                                    console.log(response);
                                    // Insert your code here
                                }
                            );
                })
            } else {
                console.log('cansel');
            }
        }, {scope: 'email, public_profile'});
    };


    render() {

        const { email, errors } = this.state;


        return (
            <div className="theme-black">

                <div className="authentication reset-pass">
                    <div className="container">
                        <div className="col-md-12 content-center">
                            <div className="row row-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="company_detail">
                                        <h3>Pava</h3>
                                        <p>Some network</p>
                                        <div className="footer">
                                            <hr />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="card-plain">
                                        <div className="header">
                                            <h5>Скинути пароль</h5>
                                        </div>
                                        <form className="form form-group" onSubmit={ this.registerSubmit }>
                                            <p style={{textAlign: 'left'}}>Введіть свою адресу електронної пошти, і ми надішлемо вам посилання для скидання пароля.</p>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors ? 'is-invalid' : ''}`}
                                                    placeholder="Введіть адресу вашої електронної пошти"
                                                    name="email"
                                                    value={email}
                                                    onChange={ this.onchange }
                                                />
                                                <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-email" /></span></div>
                                            </div>
                                            {
                                                errors &&
                                                <div className="help-info">{errors.email || errors}</div>
                                            }
                                            <div className="footer pb-0">
                                                <button style={{textTransform: 'uppercase'}} className="btn btn-primary btn-round btn-block">Надіслати листа</button>
                                            </div>


                                            <button onClick={this.handleFBLogin}></button>
                                        </form>
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



export default connect(state => ({
    auth: state.auth,
    errors: state.errors
}), {resetPassword})(Forgot);

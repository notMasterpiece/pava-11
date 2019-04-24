import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { resetPassword } from '../../actions/actions';

import bg from '../../assets/images/matrix.gif';
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


    render() {

        const { email, errors } = this.state;


        return (
            <div className="theme-black">

                <div className="authentication reset-pass" style={{backgroundImage: `url(${bg})`}}>
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

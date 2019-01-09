import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewPass } from '../../actions/actions';

import bg from '../../assets/images/matrix.gif';


class PasswordReset extends Component {

    state = {
        r_email: '',
        rc_email: ''
    };

    onchange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    changePass = e => {
        e.preventDefault();
        const {token}  = this.props.match.params;
        const {r_email} = this.state;

        const newPassData = {
            token,
            r_email
        };

        this.props.getNewPass(newPassData, this.props.history);
    };


    render() {

        const { r_email, rc_email, errors } = this.state;


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
                                            <h5>Enter new password</h5>
                                        </div>
                                        <form className="form form-group" onSubmit={ this.changePass }>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors ? 'is-invalid' : ''}`}
                                                    placeholder="Enter new password"
                                                    name="r_email"
                                                    value={r_email}
                                                    onChange={ this.onchange }
                                                />
                                                <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-shield-security" /></span></div>
                                            </div>

                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors ? 'is-invalid' : ''}`}
                                                    placeholder="comfirm new password"
                                                    name="rc_email"
                                                    value={rc_email}
                                                    onChange={ this.onchange }
                                                />
                                                <div className="input-group-append"><span className="input-group-text"><i className="zmdi zmdi-shield-security" /></span></div>
                                            </div>
                                            {
                                                errors &&
                                                <div className="help-info">{errors.email || errors}</div>
                                            }
                                            <div className="footer pb-0">
                                                <button style={{textTransform: 'uppercase'}} className="btn btn-primary btn-round btn-block">Change password</button>
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



PasswordReset.PropTypes = {
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


export default connect(state => ({
    errors: state.errors
}), {getNewPass})(PasswordReset);

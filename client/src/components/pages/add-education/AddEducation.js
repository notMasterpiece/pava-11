import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import TextFieldGroup from '../../Form/TextFieldGroup';
import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup';

import {addEducation} from '../../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school : '',
      degree: '',
      city: '',
      from: '',
      to: '',
      description : '',
      disabled: false,
      current: false,
      errors: {}
    }


  }


  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  };

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
      to: ''
    })
  };

  handleSubmit = e => {
    e.preventDefault();

    const addEducationData = {
      school : this.state.school,
      degree: this.state.degree,
      city: this.state.city,
      from: this.state.from,
      to: this.state.to,
      description : this.state.description,
      current: this.state.current
    };
    this.props.addEducation(addEducationData, this.props.history);
  };


  componentWillReceiveProps(nextProps) {

    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {

    const {school, errors, degree, city, from, to, disabled, current, description} = this.state;

    return (
          <form onSubmit={this.handleSubmit}>
            <div className="block-header">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12">
                  <h2>Додати досвід навчання</h2>
                  <br/>
                  <ul className="breadcrumb padding-0">
                    <li className="breadcrumb-item">
                      <Link to='dashboard'><i className="zmdi zmdi-home"></i></Link>
                    </li>
                    <li className="breadcrumb-item active">Опишіть де Ви навчалися</li>
                  </ul>
                </div>
              </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 ">
              <div className="card">
                <div className="body">
                  <h2 className="card-inside-title">Загальна інформація</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <TextFieldGroup
                        placeholder={'Школа'}
                        name='school'
                        value={school}
                        onChange={this.onChange}
                        error={errors.school}
                      />
                      <TextFieldGroup
                        placeholder={'degree'}
                        name='degree'
                        value={degree}
                        onChange={this.onChange}
                        error={errors.degree}
                      />
                      <TextFieldGroup
                        placeholder={'Місто'}
                        name='city'
                        value={city}
                        onChange={this.onChange}
                        error={errors.city}
                      />
                      <h6>З</h6>
                      <TextFieldGroup
                        type='date'
                        name='from'
                        value={from}
                        onChange={this.onChange}
                        error={errors.from}
                      />
                      {
                        !disabled &&
                        <Fragment>
                          <h6>По</h6>
                          <TextFieldGroup
                            type={'date'}
                            name='to'
                            value={to}
                            onChange={this.onChange}
                          />
                        </Fragment>
                      }

                      <div className="checkbox">
                        <input
                          id="current"
                          type="checkbox"
                          name='current'
                          value={current}
                          checked={current}
                          onChange={this.onCheck}
                        />
                        <label htmlFor="current">
                          По теперішній час
                        </label>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 m-t-10">
              <div className="card">
                <div className="body">
                  <h2 className="card-inside-title">Детальна інформація</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <div className="form-line">
                          <TextAreaFieldGroup
                            placeholder={'Введіть коротку інформацію ... '}
                            name='description'
                            value={description}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix m-b-15">
            <div className="col-lg-12 align-right">
              <button className="btn btn-primary">Додати</button>
            </div>
          </div>
        </form>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(state => ({
  profile: state.profile,
  errors: state.errors
}), {addEducation})(withRouter(AddEducation));

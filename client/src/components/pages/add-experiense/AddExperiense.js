import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import TextFieldGroup from '../../Form/TextFieldGroup';
import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup';

import {addExperiense} from '../../../actions/profile-action';

class AddExperiense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company : '',
      title: '',
      location: '',
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
      to : ''
    })
  };

  handleSubmit = e => {
    e.preventDefault();

    const ExperienseData = {
      company : this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      description : this.state.description,
      current: this.state.current
    };
    this.props.addExperiense(ExperienseData, this.props.history);
  };


  componentWillReceiveProps(nextProps) {

    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {

    const {company, errors, title, location, from, to, disabled, current, description} = this.state;

    return (
      <div className="container-fluid">

        <form onSubmit={this.handleSubmit}>
          <div className="block-header">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <h2>Додати досвід роботи</h2>
                <br/>
                <ul className="breadcrumb padding-0">
                  <li className="breadcrumb-item">
                    <Link to='dashboard'><i className="zmdi zmdi-home"></i></Link>
                  </li>
                  <li className="breadcrumb-item active">Опишіть де Ви працювали</li>
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
                        placeholder={'Компанія'}
                        name='company'
                        value={company}
                        onChange={this.onChange}
                        error={errors.company}
                      />
                      <TextFieldGroup
                        placeholder={'Професія'}
                        name='title'
                        value={title}
                        onChange={this.onChange}
                        error={errors.title}
                      />
                      <TextFieldGroup
                        placeholder={'Місто'}
                        name='location'
                        value={location}
                        onChange={this.onChange}
                      />
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
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
                          disabled={this.state.disabled ? 'disabled' : ''}
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

      </div>
    );
  }
}

AddExperiense.propTypes = {
  addExperiense: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(state => ({
  profile: state.profile,
  errors: state.errors
}), {addExperiense})(withRouter(AddExperiense));

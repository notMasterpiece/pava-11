import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Link, withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import TextFieldGroup from '../../Form/TextFieldGroup';
import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup';

import {addExperiense} from '../../../actions/profile-action';

import DayPickerWithYear from '../../Tools/Calendar/YearMonthForm';

import Button from '../../Tools/LoadingBtn/Button';

class AddExperiense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            description: '',
            disabled: false,
            current: false,
            errors: {},
            loading: false
        }


    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
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

        const ExperienseData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
            current: this.state.current,
            loading: true
        };
        this.props.addExperiense(ExperienseData, this.props.history);
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loading: false
            })
        }
    }

    onDayFromChange = e => {
        this.setState({from: e})
    };
    onDayToChange = e => {
        this.setState({to: e})
    };


    render() {
        const {company, errors, title, location, disabled, current, description, loading} = this.state;

        return (
            <div className="container-fluid">

                <div>
                    <div className="block-header">
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <h2>Додати досвід роботи</h2>
                                <br/>
                                <ul className="breadcrumb padding-0">
                                    <li className="breadcrumb-item">
                                        <Link to='dashboard'><i className="zmdi zmdi-home"/></Link>
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
                                            <DaysList>
                                                <DaysWrap>
                                                    <DayPickerWithYear onChange={this.onDayFromChange} placeholder={'Виберіть початкову дату'}/>
                                                </DaysWrap>
                                                    {
                                                        !disabled &&
                                                        <DaysWrap>
                                                            <DaysText> - </DaysText>
                                                            <DayPickerWithYear onChange={this.onDayToChange} placeholder={'Виберіть дату закінчення'}/>
                                                        </DaysWrap>
                                                    }
                                            </DaysList>

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
                            <Button
                                loadingBtn={loading}
                                text={'Додати'}
                                onClick={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


const DaysWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const DaysText = styled.span`
  margin: 0 15px;
`;

const DaysList = styled.div`
  display: flex;

`;

AddExperiense.propTypes = {
    addExperiense: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(state => ({
    profile: state.profile,
    errors: state.errors
}), {addExperiense})(withRouter(AddExperiense));

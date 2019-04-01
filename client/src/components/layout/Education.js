import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import {deleteEdu} from '../../actions/profileActions';

import { connect } from 'react-redux';

class Education extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }

  }

  showMenuFunc = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  };

  deleteEducationClick = id => {
    this.props.deleteEdu(id);
  };

  render() {
    const {school, degree, city, description, from, to, current, _id } = this.props.education;
    const { showMenu } = this.state;

    function showCurrentExp() {
      if( current ) {
        return ' - По Теперішній час';
      }
      if( to ) {
        return (
          <Fragment>
            {' - '}
            <span className="m-b-0"><Moment format='YYYY-MM-DD'>{to}</Moment></span>
          </Fragment>
        )
      }
    }

  return (
    <Fragment>
      <div className="header">
        <ul className="header-dropdown">
          <li className="dropdown show">
            <button className="dropdown-toggle 123123123" onClick={this.showMenuFunc}>
              <i className="zmdi zmdi-more" />
            </button>
            {
              showMenu &&
              <ul className="dropdown-menu show">
                <li><button className='delete-education' onClick={() => this.deleteEducationClick(_id)}>Видалити</button></li>
              </ul>
            }

          </li>
        </ul>
      </div>
      <div className="body">
        { school &&
        <Fragment>
          <small className="text-muted">Навчальний заклад:</small>
          <p>{school}</p>
          <hr/>
        </Fragment>
        }
        { degree &&
        <Fragment>
          <small className="text-muted">Рівень освіти:</small>
          <p>{degree}</p>
          <hr/>
        </Fragment>
        }
        {
          city &&
          <Fragment>
            <small className="text-muted">Місто:</small>
            <p>{city}</p>
            <hr/>
          </Fragment>
        }
        {
          description &&
          <Fragment>
            <small className="text-muted">Опис:</small>
            <p className="m-b-0">{description}</p>
            <hr/>
          </Fragment>
        }
        {
          from &&
          <span className="m-b-0"><Moment format='YYYY-MM-DD'>{from}</Moment></span>
        }
        { showCurrentExp() }
      </div>
    </Fragment>
  );
  }
}

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEdu: PropTypes.func.isRequired
};

export default connect( null, {deleteEdu})(Education);

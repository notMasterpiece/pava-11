import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import {connect} from 'react-redux';
import {deleteExp} from '../../actions/profile-action';

class Experince extends React.Component {
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

  deleteExperienceClick = id => {
    this.props.deleteExp(id);
  };


  render() {

    const {location, title, company, description, from, to, current, _id} = this.props.experience;
    const {showMenu} = this.state;

    function showCurrentExp() {
      if (current) {
        return ' - По Теперішній час';
      }
      if (to) {
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
              <button className="dropdown-toggle" onClick={this.showMenuFunc}>
                <i className="zmdi zmdi-more" />
              </button>
              {
                showMenu &&
                <ul className="dropdown-menu show">
                  <li><button onClick={() => this.deleteExperienceClick(_id)}>Видалити</button></li>
                </ul>
              }

            </li>
          </ul>
        </div>
        <div className="body m-b-10">
          {location &&
          <Fragment>
            <small className="text-muted">Адреса:</small>
            <p>{location}</p>
            <hr/>
          </Fragment>
          }
          {title &&
          <Fragment>
            <small className="text-muted">Посада:</small>
            <p>{title}</p>
            <hr/>
          </Fragment>
          }
          {
            company &&
            <Fragment>
              <small className="text-muted">Компанія:</small>
              <p>{company}</p>
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
          {showCurrentExp()}
        </div>
      </Fragment>
    );
  }
}

Experince.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExp: PropTypes.func.isRequired
};

export default connect(null, {deleteExp})(Experince);

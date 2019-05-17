import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ref = React.createRef();

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      showMenu: false
    };
  }


  showMenuFunc = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  };

  deleteEducation = id => {
    if (window.confirm('Are you really?')) {
      this.props.deleteEdu(id);
    }
  };


  changeEducation = () => {
    window.confirm("doesn't work yet")
  };


  hideShowMenu = e => {
    const {current} = this.myRef;
    const {showMenu} = this.state;
    if (showMenu && current && !current.contains(e.target)) {
      this.setState({ showMenu: false });
    }
  };

  componentDidMount() {
    document.body.addEventListener('click', this.hideShowMenu);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideShowMenu);
  }

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
            <span className="m-b-0"><Moment format='DD-MM-YYYY'>{to}</Moment></span>
          </Fragment>
        )
      }
    }

  return (
    <Fragment>
      <div className="header">
        <ul className="header-dropdown">
          <li className="dropdown show" ref={this.myRef}>
            <button className="dropdown-toggle" onClick={this.showMenuFunc}>
              <i className="zmdi zmdi-more" />
            </button>
            {
              showMenu &&
              <ul className="dropdown-menu show">
                <li><button onClick={() => this.deleteEducation(_id)}>Видалити</button></li>
                <li><button onClick={() => this.changeEducation(_id)}>Редагувати</button></li>
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
          <span className="m-b-0"><Moment format='DD-MM-YYYY'>{from}</Moment></span>
        }
        { showCurrentExp() }
      </div>
    </Fragment>
  );
  }
}

Education.propTypes = {
  education: PropTypes.object.isRequired
};

export default Education;

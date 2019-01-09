import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import moment from 'moment';
import {setAuthToken} from '../../../helpers/helpers';

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: null
    }
  }

  componentDidMount() {
    const {github} = this.props;
    axios.defaults.headers.common['Authorization'] = '';
    axios.get(`https://api.github.com/users/${github}/repos?client_id=bf06202cf02893afdf81&client_secret=a588c7f83dee5840e0572e55fe452f2d3515ca8a&sort=created:asc`)
      .then(user => {
        setAuthToken(localStorage.getItem('jwtToken'));
        this.setState({github: user.data})
      });
  }

  componentWillUnmount() {
    this.setState({ github: null })
  }


  render() {
    const {github} = this.state;
    const githubUser = this.props.github;

    if( !github) return <Spinner />;

    if ( !github.length ) return false;

    return (
      <div className="col-lg-12">
        <div className="card">
          <div className="body table-responsive">
            <span><i className="zmdi zmdi-github-alt" /> Github Профіль - <mark>{githubUser}</mark></span>

            <table className="table table-hover">
              <thead>
              <tr>
                <th>#</th>
                <th>Назва</th>
                <th>Мова програмування</th>
                <th>Дата створення</th>
              </tr>
              </thead>
              <tbody>
              {
                github.map((g, i) => {
                  return (
                    <tr key={i + 1}>
                      <th scope="row">{i + 1}</th>
                      <td><a target={'_blank'} href={g.html_url}>{g.full_name}</a></td>
                      <td>{g.language}</td>
                      <td>{moment(g.created_at).format('DD-MM-YYYY')}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    )
  }
}

Github.propTypes = {
  github: PropTypes.string
};


export default Github;

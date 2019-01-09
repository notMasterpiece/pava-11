import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {options} from '../../it-category';


import { Link, withRouter } from 'react-router-dom';

import {connect} from 'react-redux';


import TextFieldGroup from '../../Form/TextFieldGroup';
import SelectListGroup from '../../Form/SelectListGroup';
import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup';
import InputGroup from '../../Form/InputGroup';
import DropzoneWithPreview from '../../Tools/Dropzone/Dropzone';


import { isEmpty } from '../../../helpers/helpers';


import { createProfile, getCurrentProfile } from '../../../actions/profileActions'
import axios from "axios/index";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinks: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: null,
      skills: '',
      bio: '',
      github: '',
      experience: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      errors: '',
      userImg: '',
      avatar: ''
    }

  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status.value,
      skills: this.state.skills,
      bio: this.state.bio,
      github: this.state.github,
      experience: this.state.experience,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      userImg: this.state.userImg
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  };

  onChangeSelect = (status) => {
      this.setState({ status });
  };

  componentWillReceiveProps(nextPpops) {

    // errors
    if(nextPpops.errors) {
      this.setState({
        errors: nextPpops.errors
      })
    }


    if(nextPpops.profile.profile) {
      const profile = nextPpops.profile.profile;

      const skillsCSV = profile.skills.join(',');

      // if profile fields doesn exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.github = !isEmpty(profile.github) ? profile.github : '';

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

      // Set component field state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        github: profile.github,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

    selectImage = file => {
        this.setState({avatar: file[0]})
    };

    uploadAvatar = e => {
        const id = this.props.profile.profile._id;
        e.preventDefault();
        const formData = new FormData();
        const config = { headers: {'content-type': 'multipart/form-data'}};

        formData.append('image', this.state.avatar);
        formData.append('id', id);

        axios.post('/api/upload', formData, config)
            .then(() => {
                this.props.getCurrentProfile();
            })
            .catch(err => {
                console.log(err);
            })
    };


  render() {

    const {showLinks, handle, company, website, location, status, skills, bio,github ,youtube, twitter, facebook, linkedin, errors} = this.state;
      return (
      <div>

          <form onSubmit={this.uploadAvatar}>
              <div className="row">
                  <div className="col-sm-6">
                      <div className="card">
                          <div className="body">
                              <DropzoneWithPreview
                                  selectImage={this.selectImage}
                              />
                              <button type='submit'>SEND</button>
                          </div>
                      </div>
                  </div>
              </div>
          </form>


        <form action="" onSubmit={this.onSubmit}>

          <div className="block-header">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <h2>Зміна профілю</h2>
                <br/>
                <ul className="breadcrumb padding-0">
                  <li className="breadcrumb-item">
                    <Link to='dashboard'><i className="zmdi zmdi-home" /></Link>
                  </li>
                  <li className="breadcrumb-item active">Змінити профіль</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-6 ">
              <div className="card">
                <div className="body">
                  <h2 className="card-inside-title">Загальна інформація</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <TextFieldGroup
                        placeholder={'* Profile Handle'}
                        value={handle}
                        name='handle'
                        onChange={this.onChange}
                        error={errors.handle}
                        info={'this is info'}
                      />
                      <SelectListGroup
                        placeholder={'* Status'}
                        value={status}
                        name='status'
                        onChangeSelect={this.onChangeSelect}
                        error={errors.status}
                        options={options}
                        info={'this is select info'}
                      />
                      <TextFieldGroup
                        placeholder={'Company'}
                        value={company}
                        name='company'
                        onChange={this.onChange}
                        error={errors.company}
                        info={'this is company'}
                      />
                      <TextFieldGroup
                        placeholder={'website'}
                        value={website}
                        name='website'
                        onChange={this.onChange}
                        error={errors.website}
                        info={'this is website'}
                      />
                      <TextFieldGroup
                        placeholder={'location'}
                        value={location}
                        name='location'
                        onChange={this.onChange}
                        error={errors.location}
                        info={'City or city & state suggested (eg. Ternopil, UA)'}
                      />
                      <TextFieldGroup
                        placeholder={'* Skills'}
                        value={skills}
                        name='skills'
                        onChange={this.onChange}
                        error={errors.skills}
                        info={'skills'}
                      />
                      <TextFieldGroup
                        placeholder={'Github Username'}
                        value={github}
                        name='github'
                        onChange={this.onChange}
                        error={errors.github}
                        info={'Github profile'}
                      />

                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-lg-6 ">
              <div className="card">
                <div className="body">
                  <h2 className="card-inside-title">Коротка біографія</h2>
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <div className="form-line">
                          <TextAreaFieldGroup
                            placeholder={'Please type your short bio...'}
                            name='bio'
                            value={bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info={'Tell us a little story about yourself'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card">
                {
                  showLinks &&
                  <div className="body">
                    <h2 className="card-inside-title">Текст</h2>
                    <div className="row clearfix">
                      <div className="col-lg-3 col-md-6">
                        <InputGroup
                          placeholder={'Twitter profile URL'}
                          name={'twitter'}
                          value={twitter}
                          icon={'zmdi-twitter'}
                          onChange={this.onChange}
                          error={errors.twitter}
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <InputGroup
                          placeholder={'Youtube profile URL'}
                          name={'youtube'}
                          value={youtube}
                          icon={'zmdi-youtube'}
                          onChange={this.onChange}
                          error={errors.youtube}
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <InputGroup
                          placeholder={'Facebook profile URL'}
                          name={'facebook'}
                          value={facebook}
                          icon={'zmdi-facebook'}
                          onChange={this.onChange}
                          error={errors.facebook}
                        />
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <InputGroup
                          placeholder={'Linkedin profile URL'}
                          name={'linkedin'}
                          value={linkedin}
                          icon={'zmdi-linkedin'}
                          onChange={this.onChange}
                          error={errors.linkedin}
                        />
                      </div>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>
          <div className="row clearfix m-b-15">
            <div className="col-lg-6">
              <button type={'button'} className='btn btn-primary btn-simple' onClick={() => this.setState({showLinks: !this.state.showLinks})}>
                {
                  showLinks              ?
                    <span>Приховати</span> :
                    <span>Змінити соціальну мережу</span>
                }

              </button>
            </div>
            <div className="col-lg-6 align-right">
              <button className="btn btn-primary">Змінити профайл</button>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile : PropTypes.func.isRequired,
  getCurrentProfile : PropTypes.func.isRequired
};

export default connect(state => ({
  profile: state.profile,
  errors: state.errors
}),{createProfile, getCurrentProfile})(withRouter(CreateProfile));

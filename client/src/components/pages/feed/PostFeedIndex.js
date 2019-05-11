import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup'

import { connect } from 'react-redux';
import {addPost} from '../../../actions/post-action';

import img from '../../../assets/images/thinking.png';





class PostFeedIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      errors: null,
      showEmoji: false
    };

  }


  funcShowEmoji = () => {
      this.setState({
          showEmoji: !this.state.showEmoji
      })
  };


  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  };


  onSubmit = e => {
    e.preventDefault();

    const {addPost, history} = this.props;
    const {text} = this.state;
    const {user: {name}} = this.props.auth;

    const newPost = {
      text,
      name
    };

    addPost(newPost, history);

  };

  addEmoji = (e) => {
      //console.log(e.unified)
      if (e.unified.length <= 5){
          let emojiPic = String.fromCodePoint(`0x${e.unified}`);
          this.setState({
              text: this.state.text + emojiPic
          })
      } else {
          let sym = e.unified.split('-');
          let codesArray = [];
          sym.forEach(el => codesArray.push('0x' + el));
          //console.log(codesArray.length)
          //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
          let emojiPic = String.fromCodePoint(...codesArray);
          this.setState({
              text: this.state.text + emojiPic
          })
      }
  };



  componentWillReceiveProps(nexProps) {
    if(nexProps.errors.text) {
      this.setState({errors: nexProps.errors.text})
    }
  }

  render() {

    const {text, errors, showEmoji} = this.state;

    return (
        <div className="row clearfix">
            <div className="col-lg-12">
                <div className="card">
                    <div className="header">
                        <h2><strong>Скажіть щось ...</strong></h2>
                    </div>
                    <div className="body" style={{marginBottom: '300px'}}>
                        <div className="row clearfix">
                            <div className="col-sm-12">

                                <form className="form-group" onSubmit={this.onSubmit}>
                                    <div className="form-line">
                                        <TextAreaFieldGroup
                                            name={'text'}
                                            value={text}
                                            onChange={this.onChange}
                                            placeholder={'Будь ласка, введіть те, що Ви хочете...'}
                                            error={errors}
                                            addEmoji={this.addEmoji}
                                            showEmoji={showEmoji}
                                            showCount={true}
                                        />
                                    </div>
                                    <button
                                        type={'button'}
                                        onClick={this.funcShowEmoji}
                                        className={'toggleEmogi'}
                                        >{
                                            !showEmoji
                                                ? <img src={img} alt=""/>
                                                : <span><i className="zmdi zmdi-close-circle" />{' '}Закрити</span>
                                        }
                                    </button>
                                    <div className="align-right">
                                        <button className="btn btn-primary">Додати</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

PostFeedIndex.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

export default connect(state => ({
  auth: state.auth,
  errors: state.errors
}), {addPost})(PostFeedIndex);

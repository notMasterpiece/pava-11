import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../Tools/Spinner/Spinner';
import SinglePost from './SinglePost';
import TextAreaFieldGroup from '../../Form/TextAreaFieldGroup';
import Comments from '../../Tools/Comments/Comment';

import {connect} from 'react-redux';
import {getPost, addComment, deleteComment} from '../../../actions/post-action';


class SinglePostWrap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      error: null
    }

  }

  renderSinglePost = () => {
    const {onePost, loading} = this.props.posts;
    if(onePost._id && !loading) return <SinglePost onePost={onePost} />;
    return <Spinner />;
  };

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value,
      commentLength: e.target.value.length
    })
  };


  renderSinglePostComments = () => {
    const {user: {id}} = this.props.auth;
    const {onePost, loading} = this.props.posts;

    if(onePost._id && !loading) {
      const sortArr = onePost.comments.sort((a,b) => new Date(b.date) - new Date(a.date));
      return sortArr.map(c => <Comments loginUser={id} key={c._id} comment={c} deleteComment={this.deleteComment} />)
    }

    return <Spinner />;
  };


  deleteComment = commentId => {
    const postId = this.props.posts.onePost._id;
    this.props.deleteComment(postId, commentId);
  };


  onSubmit = e => {
    e.preventDefault();
    const {user: {name}} = this.props.auth;
    const {_id} = this.props.posts.onePost;

    const newComment = {
      name,
      text: this.state.comment
    };

    this.props.addComment(_id, newComment);

    if( this.state.comment.length >= 10 ) {
      this.setState({comment: ''})
    }
  };

  componentWillReceiveProps(nexProps) {
    if(nexProps.errors.text) {
      this.setState({error: nexProps.errors.text});
    } else {
      this.setState({error: null});
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getPost(id);
  }


  handleEditorChange = (content) => {
    console.log('Content:', content);
  }



  render() {

    const {comment, error} = this.state;

    return (
        <div className="card">
            { this.renderSinglePost() }

            <div className="header">
                <h2>Добавити комментар</h2>
            </div>
            <div className='body m-b-10 user-post'>
                <form onSubmit={this.onSubmit}>
                    <TextAreaFieldGroup
                        name={'comment'}
                        value={comment}
                        onChange={this.onChange}
                        placeholder={'Будь ласка, введіть те, що Ви хочете...'}
                        error={error}
                        showCount={true}
                    />
                    <div className="align-right">
                        <button type='submit' className="btn btn-primary">Додати</button>
                    </div>
                </form>
            </div>
            { this.renderSinglePostComments() }
        </div>
    );
  }
}


SinglePostWrap.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default connect(state => ({
  posts: state.posts,
  auth: state.auth,
  errors: state.errors
}), { getPost, addComment, deleteComment})(SinglePostWrap);

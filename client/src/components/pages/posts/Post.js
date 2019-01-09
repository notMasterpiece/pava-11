import React from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/uk';

const Post = ({post, user, deletePost, removeLikeFunc, addLikeFunc, renderlikeClass}) => {
  return (
    <div className={`body m-b-10 user-post ${post.user === user.id ? 'own-post' : ''}`}>
      { post.user === user.id && <i onClick={() => deletePost(post._id)} className="zmdi zmdi-delete post-zmdi-delete" /> }
      <h5 className="title"> <Link to={`/post/${post._id}`}>{post.name}</Link></h5>
      <p className="m-t-10">{post.text}</p>
      <ul className='post-ul'>
        <li className={renderlikeClass(post.likes)} onClick={() => addLikeFunc(post._id)}>
          <svg viewBox="0 0 24 24"
               className="style-scope iron-icon">
            <g
              transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) translate(2.000000, 3.000000)"
              className="style-scope iron-icon">
              <path
                d="M13,0H4C3.2,0,2.5,0.5,2.2,1.2l-3,7.3C-0.9,8.7-1,8.9-1,9.2v2.1 c0,1.1,0.9,2.1,2,2.1h6.3l-1,4.7v0.3c0,0.4,0.2,0.8,0.4,1.1l0,0c0.6,0.6,1.5,0.5,2.1-0.1l5.6-5.7c0.4-0.4,0.6-0.9,0.6-1.4V2 C15,0.9,14.1,0,13,0L13,0z M12.7,12.6l-3.5,3.6c-0.2,0.2-0.5,0-0.4-0.2l1-4.7H2c-0.6,0-1-0.5-1-1V9.4l0-0.1l2.7-6.7 C3.9,2.3,4.3,2,4.7,2L12,2c0.6,0,1,0.5,1,1v8.8C13,12.2,12.9,12.4,12.7,12.6L12.7,12.6z"
                className="style-scope iron-icon" />
              <path d="M17,0h4v12h-4V0z" className="style-scope iron-icon" />
            </g>
          </svg>
          <div className="like-btn-count">{post.likes.length === 0 ? '' : post.likes.length}</div>
        </li>
        <li className={'like-btn'} onClick={() => removeLikeFunc(post._id)}>
          <svg
              viewBox="0 0 24 24"
              className="style-scope iron-icon"
            >
            <g transform="translate(2.000000, 3.000000)" className="style-scope iron-icon">
              <path d="M12.9,0H4C3.2,0,2.5,0.5,2.2,1.2l-3,7.3C-0.9,8.7-1,8.9-1,9.2v2 c0,1.1,0.9,2,2,2h6.3l-1,4.7v0.3c0,0.4,0.2,0.8,0.4,1.1l0,0C7.3,20,8.2,20,8.8,19.4l5.5-5.7c0.4-0.4,0.6-0.9,0.6-1.4V2 C14.9,0.9,14,0,12.9,0L12.9,0z M12.7,12.6l-3.5,3.6c-0.2,0.2-0.5,0-0.4-0.2l1-4.6H2c-0.6,0-1-0.5-1-1V9.4l0-0.1l2.7-6.6 C3.9,2.2,4.3,2,4.7,2L12,2c0.5,0,1,0.5,1,1v8.8C12.9,12.1,12.8,12.4,12.7,12.6L12.7,12.6z" className="style-scope iron-icon" />
              <path d="M17,0h4v12h-4V0z" className="style-scope iron-icon" />
            </g>
          </svg>
          {/*<div className="dislike-btn-count">{post.likes.length === 0 ? '' : post.likes.length}</div>*/}
        </li>
        <li className="custome-date">
          <i className="zmdi zmdi-time-interval" />
          { moment(post.date).fromNow() }
        </li>
        {/*<li>*/}
          {/*<div className="like_button_icon" />*/}
          {/*<div className="like_button_count">1</div>*/}
        {/*</li>*/}
        {/*<li>*/}
          {/*<div className="button_icon" />*/}
        {/*</li>*/}
        {/*<li>*/}
          {/*<div className="dislike_button_icon" />*/}
          {/*<div className="dislike_button_count">13</div>*/}
        {/*</li>*/}
        {/*<li>*/}
          {/*<div className="comment_button_icon" />*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Comment = ({comment: {date, text, name, user, _id}, deleteComment, loginUser}) => {
  return (
    <div className="body m-b-10 comment">
      {  user === loginUser && <i onClick={() => deleteComment(_id)} className="zmdi zmdi-delete post-zmdi-delete" />  }
      <ul className="cbp_tmtimeline">
        <li>
          <time className="cbp_tmtime">
            <span className="hidden">{moment(date).fromNow()}</span>
          </time>

          <div className="cbp_tmlabel">
            <h3 className='user-post-title'>{name}</h3>
            <span>{text}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  loginUser: PropTypes.string.isRequired
};

export default Comment;

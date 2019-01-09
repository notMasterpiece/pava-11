import React from 'react';
import moment from 'moment/moment';

const SinglePost = ({onePost: {text, name, date}}) => {
  return (
      <div className={'body m-b-10 user-post'}>
        <h5 className="title">{name}</h5>
        <p className="m-t-10">{text}</p>
        <ul className='post-ul'>
          <li className="custome-date">
            <i className="zmdi zmdi-time-interval" />
            { moment(date).fromNow() }

          </li>
        </ul>
      </div>
  );
};

export default SinglePost;

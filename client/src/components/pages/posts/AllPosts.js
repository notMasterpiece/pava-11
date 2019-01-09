import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Spinner from '../../Tools/Spinner/Spinner';
import Post from './Post';

import {Link, withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import {getAllPost, deletePost, addLike, removeLike} from '../../../actions/post-action';


class AllPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }


  componentDidMount() {

    const {getAllPost} = this.props;
    getAllPost();
  }

  hello = page =>  {
    const {getAllPost} = this.props;
    getAllPost(page);

  };

  deletePost = id => {
    const {deletePost} = this.props;
    const parsed = queryString.parse(window.location.search);
    deletePost(id, parsed.page);
  };


  addLikeFunc = id => {
    this.props.addLike(id);
  };

  removeLikeFunc = id => {
    this.props.removeLike(id);
  };


  renderlikeClass = likes => {
    const id = this.props.auth.user.id;
    if( likes.filter(l => l.user === id).length > 0 ) {
      return 'like-btn up';
    } else {
      return 'like-btn';
    }
  };



  renderPagination () {
      const {pages, current} = this.props.posts.posts;
      const pageArr = Array.from(Array(pages).keys());
      let currentPage;
      current === 'undefined' ? currentPage = 1 : currentPage = current;

      const i = (Number(current) > 5 ? Number(current) - 4 : 1);

      return (
          <ul className="pagination pagination-primary">

              {
                  i !== 1 && [
                      <li key={'first'} className='page-item'><Link className='page-link' to={`?page=${1}`} onClick={() => this.hello(1)}>Перша</Link></li>,
                      <li key={'disabled-start'} className="disabled"><a>...</a></li>
                  ]
              }

              { pageArr.map( index => {
                  // console.log(index, Number(currentPage) + 4, pages);

                  if( (Number(currentPage) + 4) >= 10 && ((Number(currentPage) + 4) - index) > 9 ) {
                      return null
                  }

                  if(index > Number(currentPage) + 4 ) {
                      return null
                  }

                  if( index === Number(currentPage) + 4 && index < pages ) {
                      return <li key={'disabled-end'} className="disabled"><a>...</a></li>
                  }

                  if( parseFloat(index + 1) === parseFloat(currentPage)) {
                      return <li key={'active'} className="page-item active"><a className='page-link'>{index + 1}</a></li>
                  }

                  return <li
                              key={index + 1}
                              className={`page-item`}>
                            <Link
                              className="page-link"
                              to={`?page=${index + 1}`}
                              onClick={() => this.hello(index + 1)}>
                              {index + 1}
                            </Link>
                          </li>

                })
              }

              { parseFloat(currentPage) !== parseFloat(pages) && <li className='page-item'><Link className='page-link' to={`?page=${pages}`} onClick={() => this.hello(pages)}>Остання</Link></li> }
          </ul>
      )
  }


  render() {

      const {posts, loading} = this.props.posts;
      if( posts === null || loading) return <Spinner />;

      const {user} = this.props.auth;
      const {posts: limitPosts } = posts;


      if( limitPosts ) {
        return (
            <div className='card'>
                {
                    limitPosts.map(post => {
                        return <Post
                            key={post._id}
                            post={post}
                            user={user}
                            deletePost={this.deletePost}
                            addLikeFunc={this.addLikeFunc}
                            removeLikeFunc={this.removeLikeFunc}
                            renderlikeClass={this.renderlikeClass}
                        />
                    })
                }

                { this.renderPagination() }
            </div>
        );
      } else {
        return null;
      }
  }
}

AllPosts.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(state => ({
  posts: state.posts,
  auth: state.auth
}), {getAllPost, deletePost, addLike, removeLike})(withRouter(AllPosts));

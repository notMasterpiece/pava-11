import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import Paginate from '../../Tools/Paginate/Paginate';

import Spinner from '../../Tools/Spinner/Spinner';
import Post from './Post';

import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import {getAllPost, deletePost, addLike, removeLike} from '../../../actions/post-action';


class AllPosts extends Component {

  state = {
    currentPage: 1
  };

  componentDidMount() {
    this.props.getAllPost();
  }


  handlePageClick = page => {
    this.props.getAllPost(page);
    this.setState({
      currentPage: page
    })
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


    render() {

      const {posts, loading} = this.props.posts;
      const {user} = this.props.auth;

      if ( posts === null || loading ) return <Spinner />;

      return (
          <div className='card'>
            { posts.docs.map(post => {
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
            {
              posts.docs &&
              <Paginate
                  pageCount={ posts.totalPages }
                  onPageChange={this.handlePageClick}
                  currentPage={this.state.currentPage}
              />
            }
            {/*
              posts.docs &&
              <ReactPaginate
                  previousLabel={null}
                  nextLabel={null}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={ posts.totalDocs / 6 }
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination pagination-primary'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
              />
            */}
          </div>
      );
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

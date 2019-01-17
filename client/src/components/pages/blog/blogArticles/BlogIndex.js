import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {getAllArticles} from '../../../../actions/blog-action';
import {connect} from 'react-redux';
import BlogArticle from '../BlogArticle';

class BlogIndex extends Component {

    componentWillMount() {
        this.props.getAllArticles();
    }


    render() {

        const {blog} = this.props;

        console.log(blog);

        return (
            <section className='articles-section'>
                <h1 className='articles-section__title'>Статті</h1>

                <div className="section-body__container m-t--25">
                    {
                        blog.articles &&
                        blog.articles.article.map( article => <BlogArticle key={article._id} article={article} />)
                    }
                </div>
            </section>
        );
    }
}

BlogIndex.propTypes = {};

export default connect(state => ({
    blog: state.blog
}), {getAllArticles})(BlogIndex);
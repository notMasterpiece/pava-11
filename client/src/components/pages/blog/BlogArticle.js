import React from 'react';
import PropTypes from 'prop-types';

const BlogArticle = ({title, short_description, full_description, source_link, date, imagePreview, tags}) => {
    return (
        <article className="article">
            <a href="/post/1567" className="">
                <figure>
                    <img src={imagePreview}
                         alt=""
                         className="article-image"/>
                </figure>
                <div className="article__info">
                    <div className="article__info__container">
                        <p className="article__time"> { date } </p>
                        <p className="article__name"> { title } </p>
                        <p className="article__lead">{ short_description }</p>
                    </div>
                </div>
            </a>
            <div className="article__footer">
                <div className="article__meta">
                    <div className="meta-views">
                        <span>152</span>
                    </div>
                    <a href="/post/1567#comments" className="meta-comments">
                        <span>0</span>
                    </a>
                    <div className="meta-time">
                        <span>12 хв.</span>
                    </div>
                </div>
                <button className="article__add-favorite" />
            </div>
        </article>
    );
};

BlogArticle.defaultProps = {
    date: 'щойно'
};

BlogArticle.propTypes = {

};

export default BlogArticle;
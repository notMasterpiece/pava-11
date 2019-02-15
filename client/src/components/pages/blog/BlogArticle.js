import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BlogArticle = ({article}) => {

    const {title, short_description, created_at, imagePreview, preview_page_image, _id, views_count, comments_count, reading_time} = article;

    return (
        <article className="article">
            <Link to={`/blog/${_id}`}>
                <figure>
                    {
                        imagePreview
                        ? <img
                            src={imagePreview}
                            alt={'preview'}
                            className="article-image"/>
                        : <img src={`${window.location.origin}/${preview_page_image}`}
                            alt={title}
                            className="article-image"/>
                    }
                </figure>
                <div className="article__info">
                    <div className="article__info__container">
                        <p className="article__time"> { moment(created_at).fromNow() } </p>
                        <p className="article__name"> { title } </p>
                        <p className="article__lead">{ short_description }</p>
                    </div>
                </div>
            </Link>
            <div className="article__footer">
                <div className="article__meta">

                    <div className="meta-views">
                        <svg id="eye" viewBox="242 245.5 16 9" width="100%" height="100%"><path d="M257.855 249.622c-.143-.158-3.543-3.874-7.854-3.874s-7.712 3.716-7.854 3.874a.562.562 0 0 0 0 .756c.143.158 3.549 3.874 7.854 3.874 2.983 0 3.943-.756 5.214-1.841a.561.561 0 0 0 .062-.796.562.562 0 0 0-.795-.063c-1.153.984-1.86 1.571-4.482 1.571-3.024 0-5.637-2.169-6.64-3.124 1.002-.955 3.612-3.123 6.64-3.123 3.784 0 6.986 3.467 7.017 3.501a.567.567 0 0 0 .982-.349.558.558 0 0 0-.144-.406z"/></svg>
                        <span>{ views_count }</span>
                    </div>

                    <div className="meta-comments">
                        <svg id="comment" viewBox="244 244 12 12" width="100%" height="100%"><path d="M255.53 244.837c-.303-.303-.7-.47-1.118-.47h-8.824c-.418 0-.816.167-1.118.47-.303.303-.47.7-.47 1.118v6.066c0 .418.167.816.47 1.118.303.303.7.47 1.118.47h.985v1.353c0 .274.172.525.428.624h.002a.672.672 0 0 0 .735-.175l1.639-1.803h5.035c.418 0 .816-.167 1.118-.47.303-.303.47-.7.47-1.118v-6.066c0-.416-.167-.814-.47-1.117zm-4.863 6.985a.67.67 0 0 0-1.174-.387l-.915 1.063-.666.733v-.291a.67.67 0 0 0-.669-.669h-1.654a.26.26 0 0 1-.25-.25v-6.066a.26.26 0 0 1 .25-.25h8.824a.26.26 0 0 1 .25.25v6.066a.26.26 0 0 1-.25.25h-3.875a.668.668 0 0 0 .129-.449z" /></svg>
                        <span>{ comments_count }</span>
                    </div>

                    <div className="meta-time">
                        <span>{ `${reading_time || 1 } хв` }</span>
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
    article: PropTypes.object.isRequired
};

export default BlogArticle;
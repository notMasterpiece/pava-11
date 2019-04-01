import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {arrayRange} from '../../../helpers/helpers';

class Paginate extends Component {

    render() {
        const { onPageChange, pageCount, currentPage } = this.props;
        const array = arrayRange(1, Math.ceil(pageCount));

        return (
            <ul className='pagination pagination-primary'>
                {
                    array.map(page => {
                        return (
                            <li
                                className={`page-item ${page === currentPage ? 'active' : ''}`}
                                key={page}
                                onClick={() => onPageChange(page)}
                            >
                                <a role="button" className="page-link">{page}</a>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

Paginate.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paginate;
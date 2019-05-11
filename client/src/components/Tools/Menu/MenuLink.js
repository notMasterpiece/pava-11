import React, {PureComponent, Fragment} from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class MenuLink extends PureComponent {
    render() {

        const {link, match:{params}} = this.props;

        return (
            <Fragment>
                {
                    link.simple
                        ? <TextLi>{link.text}</TextLi>
                        : <li className={`${link.url === params[0] ? 'active open' : ''}`}>
                            <Link to={link.url}>
                                <i className={`zmdi ${link.icon}`}/>
                                <span>{link.text}</span>
                            </Link>
                        </li>
                }
            </Fragment>
        )
    }
}


const TextLi = styled.li`
    font-size: 11px;
    font-weight: 700;
    padding: 8px 12px;
    position: relative;
    color: #616161;
    &:before {
      content: "--";
      position: absolute;
      left: 0;
      top: 7px
    }
`;


MenuLink.propTypes = {
    link: PropTypes.object.isRequired,
    params: PropTypes.string,
};

export default withRouter(MenuLink);
import React, {Fragment, useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const Experince = ({experience, deleteExp}) => {
    let menuBtn = useRef();
    const [showMenu, setCount] = useState(false);
    const {location, title, company, description, from, to, _id} = experience;

    const deleteExperience = id => {
        if (window.confirm('Are you really?')) {
            deleteExp(id);
        }
    };

    const deleteEducation = id => {
        window.confirm("doesn't work yet")
    };

    useEffect(() => {

        const hideShowMenu = e => {
            console.log('exp');
            const {current} = menuBtn;
            if (showMenu && current && !current.contains(e.target)) {
                setCount(false)
            }
        };

        document.body.addEventListener('click', hideShowMenu);
        return () => {
            document.body.removeEventListener('click', hideShowMenu);
        }
    });


    return (
        <Fragment>
            <div className="header">
                <ul className="header-dropdown">
                    <li className="dropdown show" ref={menuBtn}>
                        <button className="dropdown-toggle" onClick={() => setCount(true)}>
                            <i className="zmdi zmdi-more"/>
                        </button>
                        {
                            showMenu &&
                            <ul className="dropdown-menu show">
                                <li>
                                    <button onClick={() => deleteExperience(_id)}>Видалити</button>
                                </li>
                                <li>
                                    <button onClick={() => deleteEducation(_id)}>Редагувати</button>
                                </li>
                            </ul>
                        }
                    </li>
                </ul>
            </div>
            <div className="body m-b-10">
                {location &&
                <Fragment>
                    <small className="text-muted">Адреса:</small>
                    <p>{location}</p>
                    <hr/>
                </Fragment>
                }
                {title &&
                <Fragment>
                    <small className="text-muted">Посада:</small>
                    <p>{title}</p>
                    <hr/>
                </Fragment>
                }
                {
                    company &&
                    <Fragment>
                        <small className="text-muted">Компанія:</small>
                        <p>{company}</p>
                        <hr/>
                    </Fragment>
                }
                {
                    description &&
                    <Fragment>
                        <small className="text-muted">Опис:</small>
                        <p className="m-b-0">{description}</p>
                        <hr/>
                    </Fragment>
                }
                {
                    from &&
                    <Fragment>
                        <i className="zmdi zmdi-calendar-note m-r-10"/>
                        <span className="m-b-0"><Moment format='DD-MM-YYYY'>{from}</Moment></span>
                    </Fragment>
                }
                {
                    !to
                        ? ' - По Теперішній час'
                        : <Fragment>
                               {' - '}
                               <Moment format='DD-MM-YYYY'>{to}</Moment>
                           </Fragment>
                }
            </div>
        </Fragment>
    );
};

Experince.propTypes = {
    experience: PropTypes.object.isRequired
};

export default Experince;
import React from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import {bytesToSize} from '../../../helpers/helpers';
import PropTypes from "prop-types";

class GalleryItem extends React.Component {

    render() {
        const {photo, deletePhoto, openLightbox, lightboxIsOpen, closeLightbox, currentImg, loadPhoto} = this.props;

        return (
            <div className='row'>
                {
                    photo.map(p => (
                        <div className="col-lg-3 col-md-4 col-sm-12" key={p._id}>
                            <div className="card">
                                <div className="file">
                                    <div className="hover">
                                        <button
                                            onClick={() => deletePhoto(p._id)}
                                            type="button"
                                            className="btn btn-icon btn-icon-mini btn-round btn-danger">
                                            <span>
                                                <i className="zmdi zmdi-delete" data-tip="Видалити" />
                                                <ReactTooltip />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="image" onClick={() => openLightbox(p.image)}>
                                        <img src={p.image} alt={p.name} className="img-fluid" />
                                    </div>
                                    <div className="file-name">
                                        <p className="m-b-5 text-muted">{p.name}</p>
                                        <div className="file-descr">
                                            <div className="file-size"><small>Size: {bytesToSize(p.size)}</small></div>
                                            <div className="file-format">{`(${p.width} * ${p.height}) ${p.format}`}</div>
                                            <div className="file-date">{ moment(p.createdAt).format('DD/MM/YYYY') }</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    ( lightboxIsOpen && currentImg ) &&
                        <Lightbox
                            mainSrc={currentImg}
                            onCloseRequest={closeLightbox}
                        />
                }
            </div>

        );
    }
}

GalleryItem.propTypes = {
    photo: PropTypes.array.isRequired,
    currentImg: PropTypes.string.isRequired,
    deletePhoto: PropTypes.func.isRequired,
    openLightbox: PropTypes.func.isRequired,
    closeLightbox: PropTypes.func.isRequired,
    lightboxIsOpen: PropTypes.bool.isRequired,
};

export default GalleryItem;
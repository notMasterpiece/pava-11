import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserPhoto, deleteUserPhoto, addUserPhoto, downloadPhoto} from '../../../actions/profile-action';
import GalleryItem from "./GalleryItem";
import ReactTooltip from 'react-tooltip';
import './Gallery.scss';

class GalleryIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            photo: [],
            loading: false,
            galleryTag: '',
            gallery: [],
            err: null,
            loadingFile: false,
            lightboxIsOpen: false,
            currentImg: ''
        };
    }


    selectFiles = files => {
        this.setState({ files });
    };



    loadPhoto = e => {
        e.preventDefault();
        const {files} = this.state;

        if( !files.length) return;

        this.setState({ loadingFile: true });

        const formData = new FormData();
        const config = { headers: {'content-type': 'multipart/form-data'}};


        for( let x = 0; x < this.state.files.length; x++) {
            formData.append('gallery', this.state.files[x]);
        }

        this.props.addUserPhoto(formData, config);
    };



    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.photo) {
            const {photo} = nextProps.photo;

            this.setState({
                photo,
                files: false,
                loadingFile: false
            });
        }
    }

    componentDidMount() {
        this.props.getUserPhoto();
    }


    deletePhoto = id => {
        this.props.deleteUserPhoto(id);
        ReactTooltip.rebuild();
    };


    renderPreviewImg = () => {
      const {files} = this.state;

        if (files.length) {
            let filesArray = [];

            for( let i = 0; i < files.length; i++) {
                filesArray.push(files[i])
            }

            return filesArray.map(file => {

                const src = URL.createObjectURL(file);

                return (
                    <li key={file.lastModified} className={'photo-img'}>
                        <img src={src} alt={file.name}/>
                    </li>
                )
            })

      }
    };


    renderNoGallery = () => {
        const {photo} = this.state;

        if (photo.length <= 0) {
            return (
                <p>No item in gallery</p>
            )
        }
    };

    openLightbox = img => {
        this.setState({
            currentImg: img,
            lightboxIsOpen: true
        })
    };
    closeLightbox = () => {
        this.setState({
            lightboxIsOpen: false,
            currentImg: ''
        })
    };


    render() {

        const {photo, loadingFile, lightboxIsOpen, currentImg} = this.state;


        return (
            <div>
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-12">
                            <h2> My Gallery</h2>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-12">
                        <div className="file_manager">
                            <div className="wrap">
                                {
                                    loadingFile ?
                                        <p>Загружаю ...</p> :
                                        <form onSubmit={this.loadPhoto}>
                                            <input
                                                onChange={e => this.selectFiles(e.target.files)}
                                                type="file"
                                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*"
                                                name={'gallery'}
                                                multiple
                                            />
                                            <button type='submit' className={'btn btn-primary'}>Відправити</button>
                                        </form>
                                }

                                <ul className={'prewiev-img-ul'}>
                                    { this.renderPreviewImg() }
                                </ul>
                            </div>

                            { this.renderNoGallery() }

                            {
                                photo.length
                                    ? <GalleryItem
                                        currentImg={currentImg}
                                        openLightbox={this.openLightbox}
                                        closeLightbox={this.closeLightbox}
                                        lightboxIsOpen={lightboxIsOpen}
                                        deletePhoto={this.deletePhoto}
                                        photo={photo} />
                                    : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GalleryIndex.propTypes = {
    getUserPhoto: PropTypes.func.isRequired,
    downloadPhoto: PropTypes.func.isRequired,
    deleteUserPhoto: PropTypes.func.isRequired,
    addUserPhoto: PropTypes.func.isRequired,
    photo: PropTypes.object.isRequired
};

export default connect(state => ({
    photo: state.photo
}), {getUserPhoto, deleteUserPhoto, addUserPhoto, downloadPhoto})(GalleryIndex);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserPhoto, deleteUserPhoto, addUserPhoto, downloadPhoto} from '../../../actions/profileActions';
import GalleryItem from "./GalleryItem";
import ReactTooltip from 'react-tooltip';

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


    loadPhoto = (link, name) => {
        var a  = document.createElement('a');
        a.href = 'http://localhost:3000/files/blog/preview/185675bc828f92d3064cbdd95e0a53b3%20(2)%20(1).jpg';
        a.download = '185675bc828f92d3064cbdd95e0a53b3%20(2)%20(1).jpg';
        a.click()
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


        // const {galleryTag, loading, gallery } = this.state;
        // let now = moment().format('DD-MM-YYYY');
        //
        // let formatGallery = {};
        // let imagesLast = [];
        //
        // gallery.forEach(i => {
        //     now = moment(i.date).format('DD-MM-YYYY');
        //
        //     if ( formatGallery.hasOwnProperty(now) ) {
        //         imagesLast = formatGallery[now]['images'];
        //     } else {
        //         imagesLast = [];
        //     }
        //     formatGallery[now] = {'date': now,'images': imagesLast.concat(i.images) };
        // });
        //
        //
        // if( loading ) return <Spinner />;

        return (
            <div>
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-md-12">
                            <h2> MY Gallery</h2>
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

                            {
                                photo.length
                                    ? <GalleryItem
                                        loadPhoto={this.loadPhoto}
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

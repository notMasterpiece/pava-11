import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios/index';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../../actions/profileActions';
import Spinner from '../../Tools/Spinner/Spinner';
import moment from 'moment';
import GalleryList from './GalleryList';

class GalleryIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            loading: false,
            galleryTag: '',
            gallery: [],
            err: null
        };

        this.props.getCurrentProfile();
    }


    selectFiles = files => {
        this.setState({ files });
    };



    loadFototoGallery = e => {
        e.preventDefault();

        const {galleryTag} = this.state;
        const formData = new FormData();
        const config = { headers: {'content-type': 'multipart/form-data'}};


        for( let x = 0; x < this.state.files.length; x++) {
            console.log(this.state.files[x]);
            formData.append('gallery', this.state.files[x]);
        }
        formData.append('tag', galleryTag);

        this.setState({loading: true});
        axios.post('/api/upload/gallery', formData, config)
            .then(gallery => {
                this.setState({
                    gallery: gallery.data,
                    loading: false,
                    galleryTag: '',
                    files: []
                })
            })
            .catch(err => {
                this.setState({
                    err,
                    loading: false
                })
            })
    };

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.profile.profile) {
            this.setState({
                gallery: nextProps.profile.profile.gallery
            })
        }
    }



    render() {

        const {galleryTag, loading, gallery } = this.state;
        let now = moment().format('DD-MM-YYYY');

        let formatGallery = {};
        let imagesLast = [];

        gallery.forEach(i => {
            now = moment(i.date).format('DD-MM-YYYY');

            if ( formatGallery.hasOwnProperty(now) ) {
                imagesLast = formatGallery[now]['images'];
            } else {
                imagesLast = [];
            }
            formatGallery[now] = {'date': now,'images': imagesLast.concat(i.images) };
        });


        if( loading ) return <Spinner />;

        return (
            <div>
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <h2>Image Gallery</h2>
                            <ul className="breadcrumb padding-0">
                                <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /></a></li>
                                <li className="breadcrumb-item"><a href="javascript:void(0);">Pages</a></li>
                                <li className="breadcrumb-item active">Image Gallery</li>
                            </ul>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <div className="input-group mb-0">
                                <input type="text" className="form-control" placeholder="Пошук по Даті ..." />
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="zmdi zmdi-search" /></span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h2><strong>Галерея</strong></h2>
                            </div>

                            <form onSubmit={this.loadFototoGallery}>
                                <input
                                    onChange={e => this.selectFiles(e.target.files)}
                                    type="file"
                                    name={'gallery'}
                                    multiple
                                />
                                <input
                                    type="text"
                                    onChange={this.onChange}
                                    name={'galleryTag'}
                                    value={galleryTag}
                                    placeholder={'enter tags...'}/>
                                <button type='submit'>Відправити</button>
                            </form>

                            { Object.values(formatGallery).length > 0 ? <GalleryList gallery={Object.values(formatGallery)  } /> : null }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GalleryIndex.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(state => ({
    profile: state.profile
}), {getCurrentProfile})(GalleryIndex);

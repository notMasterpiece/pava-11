import React, {Component} from 'react';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";



import BlogArticle from '../BlogArticle';
import {createPostAction} from '../../../../actions/blog-action';
import {connect} from 'react-redux';

import Button from '../../../Tools/LoadingBtn/Button';

class PostCreate extends Component {

    state= {
        image: null,
        imagePreview: null,
        title: '',
        short_description: '',
        full_description: '',
        source_link: '',
        tags: '',
        errors: {},
        loadingBtn: false
    };


    onChange = e => {
        if (this.state.errors[e.target.name]) {

            let key = e.target.name;
            let errors  = {};
            errors[key] = null;

            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }

        this.setState({
            [e.target.name] : e.target.value
        })
    };

    updateContent = content => {
        this.setState({full_description: content})
    };


    uploadChange = event => {

        this.setState({
            errors: {},
            image: event.target.files[0],
            imagePreview: URL.createObjectURL(event.target.files[0])
        })

    };


    createPost = () => {
        this.setState({loadingBtn: true});
        this.props.createPostAction( this.state, this.props.history );
    };


    componentWillReceiveProps(nextPpops) {
        this.setState({loadingBtn: false});
        if(nextPpops.errors) {
            this.setState({
                errors: {...nextPpops.errors}
            })
        }
    }


    render() {

        const { title, short_description, source_link, tags, errors, loadingBtn} = this.state;

        return (
            <section className='editing-post'>
                <link href="https://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet" />
                <h1 className='editing-post__title'>РЕДАГУВАННЯ</h1>
                <div className="editing-post__form">
                    <div className='row'>
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="body">

                                    <div className="editing-post__thumbnail m-b-40">
                                        <div className="row">
                                            <div className="col-sm-4 editing-post__form-title">Мініатюра зображення:</div>
                                            <div className="col-sm-8">
                                                <input
                                                    type="file"
                                                    id="image_loader"
                                                    name="image_loader"
                                                    onChange={this.uploadChange}
                                                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*"
                                                    className="middle" />
                                                    { errors.fileError && <p className='help-info'>file is required</p> }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="editing-post__heading m-b-40">
                                        <div className="row">
                                            <div className="col-sm-4 editing-post__form-title">Заголовок:</div>
                                            <div className="col-sm-8">
                                                <input
                                                    autoFocus={true}
                                                    type="text"
                                                    className='form-control form-control-lg'
                                                    value={title}
                                                    name='title'
                                                    onChange={this.onChange} />
                                                { errors.title && <p className='help-info'>{errors.title}</p> }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="editing-post__summary m-b-40">
                                        <div className="row">
                                            <div className="col-sm-4 editing-post__form-title">Короткий опис:</div>
                                            <div className="col-sm-8">
                                                <textarea
                                                    className='form-control form-control-lg'
                                                    onChange={this.onChange}
                                                    value={short_description}
                                                    name='short_description'
                                                />
                                                { errors.short_description && <p className='help-info'>{errors.short_description}</p> }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="editing-post__source-link m-b-40">
                                        <div className="row">
                                            <div className="col-sm-4 editing-post__form-title">Посилання на оригінал:</div>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name='source_link'
                                                    value={source_link}
                                                    onChange={this.onChange}
                                                    className='form-control form-control-lg'/>
                                                    { errors.source_link && <p className='help-info'>{errors.source_link}</p> }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="editing-post__tags m-b-40">
                                        <div className="row">
                                            <div className="col-sm-4 editing-post__form-title">Теги: </div>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name='tags'
                                                    value={tags}
                                                    onChange={this.onChange}
                                                    className='form-control form-control-lg'/>
                                                    { errors.tags && <p className='help-info'>{errors.tags }</p> }
                                            </div>
                                        </div>
                                    </div>



                                    <div className='editing-post__content m-b-40'>


                                        <JoditEditor
                                            editorRef={this.setRef}
                                            value={this.state.content}
                                            config={this.config}
                                            onChange={this.updateContent}
                                        />
                                        { errors.full_description && <p className='help-info'>{errors.full_description }</p> }

                                    </div>

                                    <div className="editing-post__create">
                                        <Button
                                            onClick={ this.createPost }
                                            loadingBtn={loadingBtn}
                                            text={'Створити'} />
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <BlogArticle
                                article={this.state}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(state => ({
    errors: state.errors
}), {createPostAction})(PostCreate);
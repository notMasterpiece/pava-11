import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';
import BlogArticle from '../BlogArticle';
import {createPostAction} from '../../../../actions/blog-action';
import {connect} from 'react-redux';

class PostCreate extends Component {

    state= {
        image: null,
        imagePreview: null,
        title: '',
        short_description: '',
        full_description: '',
        source_link: '',
        tags: '',
        errors: {}
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

    handleEditorChange = content => {
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
        this.props.createPostAction(this.state);
    };


    componentWillReceiveProps(nextPpops) {
        if(nextPpops.errors) {
            this.setState({
                errors: {...nextPpops.errors}
            })
        }
    }


    render() {

        const { title, short_description, full_description, source_link, tags, imagePreview, errors} = this.state;

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

                                        <Editor
                                            apiKey='q2t6fo9i37sej175kuu64vxngrxql8eh0rv5mfrpy8ri8k04'
                                            initialValue={full_description}
                                            init={{
                                                plugins: [
                                                    "advcode advlist anchor autolink codesample colorpicker contextmenu fullscreen",
                                                    " lists link linkchecker media mediaembed noneditable powerpaste",
                                                    " searchreplace table textcolor"
                                                ],
                                                toolbar: "emoticons insertfile a11ycheck | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
                                            }}
                                            onEditorChange={this.handleEditorChange}
                                        />
                                        { errors.full_description && <p className='help-info'>{errors.full_description }</p> }

                                    </div>

                                    <div className="editing-post__create">
                                        <button className='btn btn-primary' onClick={this.createPost}>Створити</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <BlogArticle
                                title={title}
                                short_description={short_description}
                                imagePreview={imagePreview}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

PostCreate.propTypes = {};

export default connect(state => ({
    errors: state.errors
}), {createPostAction})(PostCreate);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getArticle, clearArticle} from '../../../../actions/blog-action';
import Spinner from '../../../Tools/Spinner/Spinner';

// import hljs from 'highlight.js';

class BlogSingleIndex extends Component {

    componentDidMount() {
        const {_id} = this.props.match.params;
        this.props.getArticle(_id);

        // hljs.initHighlighting();
    }

    componentWillMount() {
        this.props.clearArticle();

        // hljs.initHighlighting();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // hljs.initHighlighting();
    }


    render() {

        if(!this.props.blog.article) return <Spinner />;


        // hljs.initHighlighting();

        const {article:{title, full_page_image, full_description}} = this.props.blog;

        return (
            <div className="row clearfix blog-page">
                <div className="col-md-12">
                    <div className="card single_post">
                        <div className="body">
                            <h3 className="m-t-0 m-b-5">{ title }</h3>

                            {/*<ul className="meta">*/}
                                {/*<li><a href="javascript:void(0);"><i className="zmdi zmdi-account col-blue" />Posted*/}
                                    {/*By: John Smith</a></li>*/}
                                {/*<li><a href="javascript:void(0);"><i className="zmdi zmdi-label col-red" />Photography</a>*/}
                                {/*</li>*/}
                                {/*<li><a href="javascript:void(0);"><i className="zmdi zmdi-comment-text col-blue" />Comments:*/}
                                    {/*3</a></li>*/}
                            {/*</ul>*/}

                            <div className="img-post m-b-15">

                                <img
                                    src={`${window.location.origin}/${full_page_image}`}
                                    alt={title} />
                            </div>

                            <div className="single_post__content">
                                <div
                                    dangerouslySetInnerHTML = {{__html: full_description}}
                                />
                            </div>

                        </div>
                    </div>


                    {/*<div className="card">*/}
                        {/*<div className="header">*/}
                            {/*<h2><strong>Comments</strong> 3</h2>*/}
                        {/*</div>*/}
                        {/*<ul className="comment-reply list-unstyled">*/}
                            {/*<li className="body">*/}
                                {/*<div className="row clearfix">*/}
                                    {/*<div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail"*/}
                                                                                  {/*src="assets/images/sm/avatar2.jpg"*/}
                                                                                  {/*alt="Awesome Image" /></div>*/}
                                    {/*<div className="text-box col-md-10 col-8 p-l-0 p-r0">*/}
                                        {/*<h5 className="m-b-0">Gigi Hadid </h5>*/}
                                        {/*<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.*/}
                                            {/*Lorem Ipsum has been the industry's standard dummy text</p>*/}
                                        {/*<ul className="list-inline">*/}
                                            {/*<li><a href="javascript:void(0);">Mar 09 2018</a></li>*/}
                                            {/*<li><a href="javascript:void(0);">Reply</a></li>*/}
                                        {/*</ul>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                            {/*<li className="body">*/}
                                {/*<div className="row clearfix">*/}
                                    {/*<div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail"*/}
                                                                                  {/*src="assets/images/sm/avatar3.jpg"*/}
                                                                                  {/*alt="Awesome Image" /></div>*/}
                                    {/*<div className="text-box col-md-10 col-8 p-l-0 p-r0">*/}
                                        {/*<h5 className="m-b-0">Christian Louboutin</h5>*/}
                                        {/*<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,*/}
                                            {/*when an unknown printer took a galley of type and scramble</p>*/}
                                        {/*<ul className="list-inline">*/}
                                            {/*<li><a href="javascript:void(0);">Mar 12 2018</a></li>*/}
                                            {/*<li><a href="javascript:void(0);">Reply</a></li>*/}
                                        {/*</ul>*/}
                                        {/*<div className="row m-t-20">*/}
                                            {/*<div className="icon-box col-md-2 col-4"><img*/}
                                                {/*className="img-fluid img-thumbnail" src="assets/images/sm/avatar3.jpg"*/}
                                                {/*alt="Awesome Image" /></div>*/}
                                            {/*<div className="text-box col-md-10 col-8 p-l-0 p-r0">*/}
                                                {/*<h5 className="m-b-0">Christian Louboutin</h5>*/}
                                                {/*<p>Lorem Ipsum has been the industry's standard dummy text ever since*/}
                                                    {/*the 1500s, when an unknown printer took a galley of type and*/}
                                                    {/*scramble</p>*/}
                                                {/*<ul className="list-inline">*/}
                                                    {/*<li><a href="javascript:void(0);">Mar 12 2018</a></li>*/}
                                                {/*</ul>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                            {/*<li className="body">*/}
                                {/*<div className="row clearfix">*/}
                                    {/*<div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail"*/}
                                                                                  {/*src="assets/images/sm/avatar4.jpg"*/}
                                                                                  {/*alt="Awesome Image" /></div>*/}
                                    {/*<div className="text-box col-md-10 col-8 p-l-0 p-r0">*/}
                                        {/*<h5 className="m-b-0">Kendall Jenner</h5>*/}
                                        {/*<p>There are many variations of passages of Lorem Ipsum available, but the*/}
                                            {/*majority have suffered alteration in some form, by injected humour</p>*/}
                                        {/*<ul className="list-inline">*/}
                                            {/*<li><a href="javascript:void(0);">Mar 20 2018</a></li>*/}
                                            {/*<li><a href="javascript:void(0);">Reply</a></li>*/}
                                        {/*</ul>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    {/*<div className="card">*/}
                        {/*<div className="header">*/}
                            {/*<h2><strong>Leave</strong> a reply <small>Your email address will not be published. Required*/}
                                {/*fields are marked*</small></h2>*/}
                        {/*</div>*/}
                        {/*<div className="body">*/}
                            {/*<div className="comment-form">*/}
                                {/*<form className="row">*/}
                                    {/*<div className="col-sm-6">*/}
                                        {/*<div className="form-group">*/}
                                            {/*<input type="text" className="form-control" placeholder="Your Name" />*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-sm-6">*/}
                                        {/*<div className="form-group">*/}
                                            {/*<input type="text" className="form-control" placeholder="Email Address" />*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-sm-12">*/}
                                        {/*<div className="form-group">*/}
                                            {/*<textarea rows="4" className="form-control no-resize"*/}
                                                      {/*placeholder="Please type what you want..." />*/}
                                        {/*</div>*/}
                                        {/*<button type="submit" className="btn btn btn-primary btn-round">SUBMIT</button>*/}
                                    {/*</div>*/}
                                {/*</form>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>

            </div>
        );
    }
}

export default connect(state => ({
    blog: state.blog
}), {getArticle, clearArticle})(BlogSingleIndex);
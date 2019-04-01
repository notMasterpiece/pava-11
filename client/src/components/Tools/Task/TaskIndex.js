import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {confirmAlert} from "react-confirm-alert";
import ReactPaginate from 'react-paginate';

import {addTask, getTasks} from '../../../actions/task-action';
import {connect} from 'react-redux';
const taskSize = 5;

class TaskIndex extends Component {



    state = {
        task: [],
        sortType: 'asc', //desc
        sortId: '',
        currentTaskPage: 0,
        displayTask: [],
        displayTaskLength: 0
    };


    componentDidMount() {
        this.props.getTasks();
    }



    onSort = value => {
        const {currentTaskPage, displayTask} = this.state;
        const clonedTask = displayTask;
        const sortType = this.state.sortType === 'asc' ? 'desc' : 'asc';

        if (sortType === 'asc') {
            clonedTask[currentTaskPage].sort((a, b) => (a[value] > b[value]) ? 1 : -1);
        } else {
            clonedTask[currentTaskPage].sort((a, b) => (b[value] > a[value]) ? 1 : -1);
        }

        this.setState({
            displayTask: clonedTask,
            sortId: value,
            sortType
        })
    };

    renderSortType = type => {
        const {sortType, sortId} = this.state;

        if (type === sortId) {
            if ( sortType === 'asc') {
                return  <small> ↑</small>
            } else {
                return <small> ↓</small>
            }
        }
    };





    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.task) {
            const {task} = nextProps.task;

            const displayTask = this.chunkTask(task, taskSize);
            const displayTaskLength = displayTask.length;
            this.setState({
                task,
                displayTask,
                displayTaskLength
            });
        }

    };


    showAddTask = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <div className="modal-content">
                            <i className="zmdi zmdi-close" onClick={onClose} />
                            <div className="modal-header">
                                <h4 className="title">Додати завдання</h4>
                            </div>
                            <div className="form-group m-b-20">
                                <textarea
                                    ref={e => this.addtaskTitle = e}
                                    className="form-control"
                                    name={'task'}
                                    placeholder="title"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-round waves-effect" onClick={onClose}>Закрити</button>
                                <button type="button" className="btn btn-success btn-round waves-effect" onClick={() => { this.props.addTask(this.addtaskTitle.value); onClose() }}>Додати</button>
                            </div>
                        </div>
                    </div>
                )
            }
        });
    };


    handlePageClick = ({selected}) => {
        this.setState({
            currentTaskPage: selected
        })
    };


    chunkTask = (task, taskSize, cache = []) => {
        const tmp = [...task];
        while (tmp.length) cache.push(tmp.splice(0, taskSize));
        return cache
    };

    render() {
        const {task, displayTask, displayTaskLength, currentTaskPage} = this.state;

        return (
            <div className="card">
                <div className="header">
                    <h2>
                        <strong>Мої задачі</strong>
                        <ul className="nav nav-pills nav-pills-primary add-task">
                            <li className="nav-item">
                              <span
                                  className="nav-link active"
                                  onClick={this.showAddTask}
                              >
                                  <i className="zmdi zmdi-plus"/>
                              </span>
                            </li>
                        </ul>
                    </h2>
                </div>
                <div className="body project_report">
                    <div className="table-responsive">
                        <table className="table m-b-0 table-hover">
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th
                                    onClick={() => this.onSort('text')}>
                                    Project
                                    {this.renderSortType('text')}
                                </th>
                                <th
                                    onClick={() => this.onSort('progres')}>
                                    Progres
                                    {this.renderSortType('progres')}
                                </th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                displayTask[currentTaskPage] && displayTask[currentTaskPage].map(t => (
                                    <tr key={t._id}>
                                        <td>
                                            <span className="badge badge-success">Active</span>
                                        </td>
                                        <td className="project-title">
                                            <h6>{t.text}</h6>
                                            <small>{t.date}</small>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div
                                                    style={{width: `${t.progres}%`}}
                                                    className="progress-bar l-dark"/>
                                            </div>
                                            <small>Completion with: {t.progres}%</small>
                                        </td>

                                        {/*<td className="project-actions">*/}
                                            {/*<a href="javascript:void(0);" className="btn btn-neutral btn-sm">*/}
                                                {/*<i className="zmdi zmdi-edit"/></a>*/}
                                        {/*</td>*/}
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                        { task.length > taskSize &&

                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={displayTaskLength}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination pagination-primary'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

TaskIndex.propTypes = {
   task: PropTypes.object.isRequired
};

export default connect(state => ({
    task: state.task
}), {addTask, getTasks})(TaskIndex);
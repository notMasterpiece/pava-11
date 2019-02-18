import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {confirmAlert} from "react-confirm-alert";

import {addTask, getTasks} from '../../../actions/task-action';
import {connect} from 'react-redux';

class TaskIndex extends Component {


    componentDidMount() {
        this.props.getTasks();
    }



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


    render() {
        console.log('render');
        const {task} = this.props.task;

        console.log(task);

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
                                <th>Project</th>
                                <th>Prograss</th>

                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                task.map(t => (
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
                                                <div className="progress-bar l-dark"/>
                                            </div>
                                            <small>Completion with: {t.progres}</small>
                                        </td>

                                        <td className="project-actions">
                                            <a href="javascript:void(0);" className="btn btn-neutral btn-sm"><i
                                                className="zmdi zmdi-edit"></i></a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
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
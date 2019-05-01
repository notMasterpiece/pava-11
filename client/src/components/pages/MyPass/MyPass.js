import React, {Component, Fragment} from 'react';
import styled from 'styled-components';

import Button from '../../Tools/LoadingBtn/Button';

import axios from 'axios';

class MyPass extends Component {


    state = {
        site: '',
        login: '',
        pass: '',
        other: '',
        _id: null,

        passwords: [],
        showAddPassForm: false,
        loadingBtn: false
    };


    componentDidMount() {

        axios
            .get('/api/pass')
            .then(res => {
                console.log(res.data);
                this.setState({passwords: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }


    addPass = e => {
        this.setState({loadingBtn: true});

        e.preventDefault();

        const {site, login, pass, other, _id, passwords} = this.state;

        const formData = {
            site,
            login,
            pass,
            other,
            _id
        };

        axios
            .post('/api/pass', formData)
            .then(res => {
                const item = res.data;
                const index = passwords.findIndex(e => e._id === item._id);
                let newPasswords;

                if (index === -1) {
                    newPasswords = [...passwords, item]
                } else {
                    newPasswords = Object.assign([], passwords, {[index]: item});
                }



                this.setState({
                    showAddPassForm: false,
                    loadingBtn: false,
                    passwords: newPasswords
                });

                this.resetState();
            })
            .catch(err => {
                console.log(err, 'err');
            })
    };

    resetState = () => {
      this.setState({
          site: '',
          pass: '',
          login: '',
          other: '',
          _id: ''
      })
    };


    // reduceForm = form => {
    //     return Object.values(form).reduce((acc, current) => {
    //         const key = current.name;
    //         if (key) {
    //             return {
    //                 ...acc,
    //                 [key]: current.value
    //             };
    //         }
    //         return acc
    //     }, {});
    // };


    showPassFunc = () => {
        this.setState({
            showAddPassForm: !this.state.showAddPassForm,
            _id: null
        });
        this.resetState();
    };


    deletePass = async id => {

        if (!window.confirm('are you sure?')) return;

        try {
            await axios.post(`/api/pass/delete/${id}`);
            this.setState({
                passwords: this.state.passwords.filter(p => p._id !== id)
            })

        } catch (err) {
            console.log(err);
        }
    };


    EditPass = p => {
        this.setState({
            showAddPassForm: true,
            site: p.site,
            login: p.login,
            pass: p.pass,
            other: p.other,
            _id: p._id
        })
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    renderTable = () => {

        const {passwords} = this.state;

        if (!passwords.length) {
            return <span>You dont have saved password, but you can change it</span>
        }

        return (
            <table className="table m-b-0">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Site</th>
                    <th>Login</th>
                    <th>Pass</th>
                    <th>Other</th>
                    <th><i className="zmdi zmdi-settings"/></th>
                </tr>
                </thead>
                <tbody>
                {
                    passwords.map((p, i) => (
                        <tr key={p._id}>
                            <th scope="row">{i + 1}</th>
                            <td><a target={'_blank'} href={p.site}>{p.site}</a></td>
                            <td>{p.login}</td>
                            <td>{p.pass}</td>
                            <td>{p.other}</td>
                            <LastTr>
                                <button
                                    onClick={() => this.EditPass(p)}
                                    type="button"
                                    className="btn btn-icon btn-icon-mini btn-round btn-danger">
                                    <i className="zmdi zmdi-edit"/>
                                </button>
                                <button
                                    onClick={() => this.deletePass(p._id)}
                                    type="button"
                                    className="btn btn-icon btn-icon-mini btn-round btn-danger">
                                    <i className="zmdi zmdi-delete"/>
                                </button>
                            </LastTr>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )

    };


    render() {

        const {showAddPassForm, loadingBtn, login, pass, site, other, _id} = this.state;


        return (
            <Fragment>

                <ShowPass onClick={this.showPassFunc}>{`${this.state.showAddPassForm ? 'Close' : 'Add password'}`}</ShowPass>
                <Title>Passwords</Title>

                {
                    showAddPassForm &&
                    <div className="card">
                        <div className="body">
                            <form onSubmit={this.addPass}>
                                <div className="form-group">
                                    <input
                                        name='site'
                                        type="text"
                                        value={site}
                                        onChange={this.onChange}
                                        autoComplete="off"
                                        className="form-control"
                                        placeholder="Enter your site URL address"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        name='login'
                                        type="text"
                                        value={login}
                                        onChange={this.onChange}
                                        autoComplete="off"
                                        className="form-control"
                                        placeholder="Enter your login"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        name='pass'
                                        type="text"
                                        value={pass}
                                        onChange={this.onChange}
                                        autoComplete="off"
                                        className="form-control"
                                        placeholder="Enter your password"/>
                                </div>
                                <div className="form-group form-float">
                                <textarea
                                    name="other"
                                    cols="30"
                                    rows="5"
                                    placeholder="Other"
                                    className="form-control no-resize"
                                    value={other}
                                    onChange={this.onChange}
                                />
                                </div>
                                <Button
                                    loadingBtn={loadingBtn}
                                    onClick={() => {
                                    }}
                                    text={_id ? 'Change password' : 'Add password'}
                                />
                            </form>

                        </div>
                    </div>
                }


                <div className="card">
                    <div className="body table-responsive">
                        {this.renderTable()}
                    </div>
                </div>

            </Fragment>
        );
    }
}


const ShowPass = styled.div`
  position: absolute;
  top: 10px;
  right: 25px; 
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
  color: #616161;
  display: block;
  z-index: 2;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;


const LastTr = styled.td`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    display: block;
    margin-left: auto;
    
  }
`;


const Title = styled.h2`
  font-size: 22px;
  margin: 12px 0;
`;

export default MyPass;

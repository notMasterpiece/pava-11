import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getFakeUser} from '../../../actions/fake-action';
import FakeUser from './FakeUser';

class FakeIndex extends Component {


    state = {
        fakeUsers: {
            fake: [],
            page: 1
        },
        scrolling: false

    };


    componentDidMount() {
        const {fakeUsers:{page}} = this.state;

        this.props.getFakeUser(page);
        window.addEventListener('scroll', this.onScroll, false);
    }


    onScroll = () => {
        if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) ) {
            this.setState({scrolling: true}, () => {
                this.props.getFakeUser(this.state.fakeUsers.page);
            });
            this.setState({scrolling: false})
        }
    };


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.fakeData) {
            this.setState({
                fakeUsers: {
                    fake: [...this.state.fakeUsers.fake, ...nextProps.fakeData.fakeUsers.fake],
                    page: this.state.fakeUsers.page + 1
                },
                scrolling: false
            })
        }
    }


    render() {

        const {fakeUsers, fakeUsers:{page}, scrolling} = this.state;
        console.log('page', page);
        if ( !fakeUsers) return <p>loading</p>

        const {fake} = this.state.fakeUsers;

        console.log(fake.length);


        return (
            <div>
                <div className="row">
                    {
                        fake.map(user => <FakeUser key={`${user._id} - ${Math.random() * 10000}`} user={user} />)
                    }
                    {
                        scrolling && <p>loading</p>
                    }
                </div>
            </div>
        );
    }
}

FakeIndex.propTypes = {
    fakeData: PropTypes.object.isRequired,
    getFakeUser: PropTypes.func.isRequired
};

export default connect( state => ({
    fakeData: state.fakeData
}), {getFakeUser})(FakeIndex);
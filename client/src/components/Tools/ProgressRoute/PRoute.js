import React from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class PRoute extends React.Component {
    componentWillMount () {
        nprogress.start();
        console.log('will');
    }

    componentDidMount () {
        nprogress.done();
        console.log('did');
    }

    render () {
        return (
            <Route {...this.props} />
        )
    }
}

export default PRoute
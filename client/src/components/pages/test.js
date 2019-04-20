import React, {Component} from 'react';
import PropTypes from 'prop-types';







class Test extends Component {


    // componentDidMount() {
    //
    //     window.addEventListener('offline', this.setOffline);
    //
    //
    //     this.socketConnect();
    //
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.runMatrixRain);
    // }
    //
    // runMatrixRain = () => {
    //     const canvas = new MatrixRein(document.querySelector('#matixRain'));
    //     canvas.init()
    // } ;
    //
    //
    //
    // componentDidMount() {
    //     window.addEventListener('resize', this.runMatrixRain);
    //
    //     const canvas = new MatrixRein(document.querySelector('#matixRain'));
    //     canvas.init()
    // }


    render() {
        return (
            <canvas id="matixRain" className="u-matrix-rain" />
        );
    }
}

Test.propTypes = {};

export default Test;

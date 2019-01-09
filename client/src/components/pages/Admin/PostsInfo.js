import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Chart} from "chart.js";

import {getCommentsInfo} from '../../../actions/info-action';
import {connect} from 'react-redux';

class CommentsInfo extends Component {


    componentDidMount() {
        this.props.getCommentsInfo();
    }


    renderCommentsInfo = () => {
        const {commentsInfo} = this.props.info;

        const count = commentsInfo.map(c => c.comment);
        const date = commentsInfo.map(c => c.date);

        const config = {
            type: 'line',
            data: {
                labels: date,
                datasets: [{
                    // backgroundColor: "rgba(0,60,100,1)",
                    data: count
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Статистика комментарів',
                },
                scales: {
                    xAxes: [{
                        barPercentage: 2
                    }]
                },
                responsive: true,
                barValueSpacing: 2,
            },

        };

        const ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new Chart(ctx, config);
    };


    render() {

        const {commentsInfo} = this.props.info;

        if( commentsInfo.length > 0) {
            this.renderCommentsInfo();
        }

        return (
            <div><canvas id="canvas" /></div>
        );
    }
}

CommentsInfo.propTypes = {
    info: PropTypes.object,
    getCommentsInfo: PropTypes.func.isRequired,
};

export default connect(state => ({
    info: state.info
}), {getCommentsInfo})(CommentsInfo);

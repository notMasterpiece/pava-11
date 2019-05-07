import React, {Component} from 'react';
import SketchPicker  from 'react-color'

import {connect} from 'react-redux';
import {changeColor} from '../../../actions/profile-action'

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            background: 'rgba(255,255,255, 1)',
            whiteText: false
        };
    }

    handleChangeComplete = (color) => {
        const {r,g,b,a} = color.rgb;
        const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.setState({ background: newColor });
        this.props.changeColor(newColor);
    };

    handleChange = () => {
        this.setState({whiteText: !this.state.whiteText}, () => {
            if( this.state.whiteText ) {
                document.body.classList.add('whiteText');
                localStorage.setItem('whiteText', true);
            } else {
                document.body.classList.remove('whiteText');
                localStorage.setItem('whiteText', false);
            }
        });
    };

    render() {
        return (
            <div>
                settings
                <SketchPicker
                    color={ this.state.background }
                    onChangeComplete={ this.handleChangeComplete }
                />
                <div className="checkbox">
                    <input id='whiteText' type="checkbox" checked={this.state.whiteText} onChange={this.handleChange} />
                    <label htmlFor="whiteText">
                        White color
                    </label>
                </div>
            </div>
        );
    }
}

export default connect(null, {changeColor})(Settings);


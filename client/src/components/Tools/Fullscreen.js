import React, {Component} from 'react';
import screenfull from 'screenfull';


class Screenfull extends Component {
  state = {
    full: false
  };

  screenfull = () => {
    this.setState({
      full: !this.state.full
    });
    screenfull.toggle();
  };


  render() {
    return (
      <li>
          <button className='a-button' onClick={this.screenfull}><i className={`zmdi zmdi-fullscreen ${this.state.full ? 'is-fullscreen' : ''}`}/></button>
      </li>
    );
  }
}


export default Screenfull;


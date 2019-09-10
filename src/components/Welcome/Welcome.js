import React from 'react';
import './Welcome.scss';

class Welcome extends React.Component {
  render() {
    return (
      <div className="Content">
        <p className="today">{this.props.date} {this.props.time}</p>
        <h1>Welcome to [company]</h1>
        <p>Tap to sign in</p>
      </div>
    );
  }
}

export default Welcome;

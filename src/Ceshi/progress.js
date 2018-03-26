import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import "./progress.less";

class Progress extends Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const { className, ...other} = this.props;
    return (
      <div>
        <div className={"progress1"} style={{width:this.props.progressWidth}}>
          <div className={"progress-bar1"}>
            <div className={"progress-shadow1"}></div>
          </div>
        </div>
      </div>
    )
  }
}

Progress.defaultProps = {
  progressWidth : "400px"
}

export default Progress

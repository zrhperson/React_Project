import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

class Limit extends Component {

  constructor(props) {
    super(props);
  }
  static defaultProps = {
    size: 10 // 默认10 个字
  }

  render() {
    const { className, children, size, ...other } = this.props;

    if(children === null){
      return null;
    }

    let cName = ['mt-limit'];
    if (className) {
      cName.push(className);
    }
    let text = '';
    if(children.length > size) {
      text = children.slice(0, size) + '...';
    }else {
      text = children;
    }
    return (
      <div title={children} {...other} className={cName.join(' ')}>
        {text}
      </div>
    )
  }
}


Limit.propTypes = {

  //	字数限制，超出字数限制就会出现...,默认为null
  size: PropTypes.number,

}

export default Limit

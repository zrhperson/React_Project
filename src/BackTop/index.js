import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

class BackTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.timer = null;
    this.scrollEventHand = null;
  }

  static defaultProps = {
    top: 0,
    time: 1000
  }

  getScrollTop(that) {
    let top = null;
    if (!that) {
      top = document.documentElement.scrollTop || document.body.scrollTop;
    } else {
      top = that.scrollTop;
    }
    return top;
  }

  setScrollTop(that, top) {
    if (that === 'document') {
      if (document.body.scrollTop) {
        document.body.scrollTop = top;
      }
      if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = top;
      }
    } else {
      that.scrollTop = top;
    }
  }

  scrollTopFun() {
    var self = this;
    var top = this.getScrollTop();
    top = top - self.props.top;
    var time = self.props.time; //
    var x = 10; // 每次位移
    var fps = x * time / top; // 时间段

    this.timer = setInterval(function () {
      top -= x;
      if (top <= self.props.top) {
        top = self.props.top;
        self.setScrollTop('document', top);
        clearInterval(self.timer);
      } else {
        self.setScrollTop('document', top);
      }
    }, fps);

  }

  handleClick() {
    if (this.props.callBack) {
      this.props.callBack();
    }
    this.scrollTopFun();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollEventHand);
  }

  componentDidMount() {
    var self = this;
    if (this.props.visibilityHeight) {
      this.scrollEventHand = function (e) {
        if (self.getScrollTop() >= self.props.visibilityHeight) {
          self.setState({
            show: true
          });
        } else {
          self.setState({
            show: false
          });
        }
      };
      document.addEventListener('scroll', this.scrollEventHand);
    } else {
      self.setState({
        show: true
      });
    }

  }
  render() {
    let dom = null;
    if (this.props.dom) {
      var Component = this.props.dom.type;
      var { children, ...other } = this.props.dom.props;
      dom = <Component onClick={this.handleClick.bind(this)} {...other}>{children}</Component>;
    } else {
      dom = <a style={{ display: this.state.show ? 'block' : 'none' }} onClick={this.handleClick.bind(this)} className={(this.props.className || '') + ' mt-backtop'}>Top</a>;
    }
    return dom;
  }
}

BackTop.propTypes = {

  //滚动到顶部的距离，默认0
  top: PropTypes.number,


  //滚动动画时间，单位毫秒ms，默认	1000
  time: PropTypes.number,

  // 动画执行完成后的回调函数
  callBack: PropTypes.func,

  // 按钮DOM，null的时候是  < a className="mt-backtop">Top< /a>
  dom: PropTypes.object,
}

export default BackTop;

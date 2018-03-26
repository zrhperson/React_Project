/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import ToggleNode from '../_shared/ToggleNode'
import Icon from '../Icon'
import Button from '../Button'

class Message extends Component {

  constructor(props) {
    super()
    this.state = {
      open: props.open,
        color: '',
        type: ''
    }
    this.prepareClose(props)
  }
    componentWillMount(){
        this.selectType();
    }
  componentDidMount() {
    this.toggleNode = new ToggleNode(ReactDOM.findDOMNode(this), 'bocomui-message--open')
    this.toggleNode.onClose = () => {
      this.props.onClose && this.props.onClose()
    }
    this.toggleNode.open()
  }

  componentWillReceiveProps(nextProps) {

    'open' in nextProps && this.setState({open: nextProps.open})
      if (this.props.types !== nextProps.types) {
          this.setState({types: nextProps.types}, ()=>{
              this.selectType();
          });
      }
    this.prepareClose(nextProps)
  }

  componentDidUpdate() {
    this.toggleNode[this.state.open ? 'open' : 'close']()
  }

  prepareClose(props) {
    const { duration } = props
    duration && setTimeout(::this.handleClose, duration * 1000)
  }

  handleClose() {
    this.setState({open: false})
  }

    selectType(){

        console.log(this.props.types)
        if(this.props.types === "success"){
            console.log("success")
            this.setState({type: "check",color:"bocomui-message--success"})
        }else if(this.props.types === "danger"){
            console.log("danger")
            this.setState({type: "warning",color:"bocomui-message--danger"})
        }else if(this.props.types === "warning"){
            console.log("warning")
            this.setState({type: "warning",color:"bocomui-message--warning"})
        }
    }
  render() {
      //{[`bocomui-message--${type}`]: type}
    const {  message, duration } = this.props;
    return (
      <div ref="mbtn" className={classnames('bocomui-message',this.state.color )}>
        <Icon
          className="bocomui-message__symbol"
          //type={type === 'success' ? 'check': 'warning'}
          type={this.state.type}
        />
        {message}
        {duration === 0 && (
          <Button
            className="bocomui-message__remove"
            transparent
            icon="remove"
            onClick={::this.handleClose}
          />
        )}
      </div>
    )
  }
}

Message.propTypes = {
  //types: PropTypes.oneOf(['success', 'danger']).isRequired,
    types: PropTypes.string,
  message: PropTypes.node.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

let render = props => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  let isOpen = false
  const messageQueue = []
  const handleClose = () => {
    isOpen = false
    const head = messageQueue[0] && messageQueue.shift()
    head && render(head)
  }

  render = nextProps => {
    props = Object.assign({}, props, nextProps)
    if (isOpen && props.open) {
      return messageQueue.push(props)
    }
    isOpen = props.open
    ReactDOM.render(<Message {...props} onClose={handleClose} />, container)
    props.open || handleClose()
  }
  render()
}

const message = {

  /**
   * @public
   * @name message.success
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 成功信息，默认 2 秒后自动关闭
   */
  success(message, duration = 2) {
    render({
      message,
      duration,
      types: 'success',
      open: true
    })
  },

  /**
   * @public
   * @name message.danger
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 失败信息，默认 3 秒后自动关闭
   */
  danger(message, duration = 3) {
    render({
      message,
      duration,
      types: 'danger',
      open: true
    })
  },

    /**
     * @public
     * @name message.warning
     * @param  {string | element} message message 内容，支持 React 元素
     * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
     * @description 警告信息，默认 3 秒后自动关闭
     */
    warning(message, duration = 3) {
        render({
            message,
            duration,
            types: 'warning',
            open: true
        })
    },

    /**
   * @public
   * @name message.close
   * @description 关闭当前 message
   */
  close() {
    render({open: false})
  }
}

export default message

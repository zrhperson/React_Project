/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'

class CollapseItem extends Component {

  constructor(props) {
    super();
    this.state = {
      open: props.defaultOpen || false
    }
  }

  toggle(e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }


  render() {

    const { open, active } = this.state
    const {
      children, className, index, defaultOpen, icon, title, ...other
      } = this.props


    const Toggle = children && <Icon type="caret-right" className="bocomui-collapse__item-toggle" />

    let Item = <a onClick={::this.toggle}>{Toggle}{title}</a>

    const classNames = classnames(
      'bocomui-Collapse__item',
      {
        'bocomui-collapse__item--open': open,
        'bocomui-collapse__item--active': active
      },
      className
    )

    // 收起状态时不再渲染子节点
    return (
      <li
        className={classNames}
        {...other}>
        { Item }
        { open && children && <ul>{children}</ul> }
      </li>
    )
  }
}

CollapseItem.contextTypes = {
  collapse: PropTypes.object,
  collapseOpen: React.PropTypes.bool
}

CollapseItem.propTypes = {

  // 菜单图标，参考 Icon 组件 type 属性
  icon: PropTypes.string,

  // 根节点为标题，子节点为内容
  title: PropTypes.string,

  // 初始化是否展开（不可控），用于非叶子节点
  defaultOpen: PropTypes.bool
}

export default CollapseItem

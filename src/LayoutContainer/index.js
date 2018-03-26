/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes, cloneElement} from 'react'
import classNames from 'classnames'
import './index.less'

class LayoutContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { className, children, gap, horizon, vertical, tile} = this.props
    const newChildren = []
    const newGap = 2 * gap
    const float = tile ? 'left' : 'none'
    children.map((child, index)=> {
      if (child.props.style) {
        child.props.style.margin = `${newGap}px ${gap}px 0 `
        child.props.style.float = float
      }
      newChildren.push(cloneElement(child, {key: index, style: child.props.style}))
    })
    const classname = classNames(
      className,
      {
        horizon1: horizon,
        vertical1: vertical,
        tile1: tile
      }
    )
    return (
      <div className={classname}>
        {newChildren}
      </div>
    )
  }
}

LayoutContainer.propTypes = {
  // 项间距
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // 水平布局
  right: PropTypes.bool,
  // 垂直布局
  horizon: PropTypes.bool,
  // Tile布局
  tile: PropTypes.bool
}
export default LayoutContainer

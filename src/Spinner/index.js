/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Spinner = props => {

  const { className, style, height, ...other} = props

  if (typeof height !== 'undefined') {
    other.style = Object.assign(style || {}, {
      fontSize: height + 'px'
    })
  }

  return (
    <div className={classnames('bocomui-spinner', className)} {...other}>
      <div className="bocomui-spinner__circle"></div>
    </div>
  )
}

Spinner.propTypes = {

  // 高度，默认 30px，宽度与高度相同
  height: PropTypes.number
}

export default Spinner

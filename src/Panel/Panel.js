/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import classnames from 'classnames'

const Panel = props => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bocomui-panel', className)} {...other}>
      {children}
    </div>
  )
}

export default Panel

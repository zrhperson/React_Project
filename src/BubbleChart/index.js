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
import Chart from '../Chart'
import BubbleChart from './main'

export default props => {
  const { className, ...other } = props
  return (
    <Chart
      type={BubbleChart}
      className={classnames('bocomui-bubble-chart', className)}
      {...other}
    />
  )
}

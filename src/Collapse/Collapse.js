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

class Collapse extends Component {

  getChildContext() {
    return {
      collapse: this
    }
  }

  render() {
    const { children, className, ...other } = this.props;
    return (
      <div className={classnames('bocomui-Collapse', className)} {...other}>
        <ul>{children}</ul>
      </div>
    )
  }
}

Collapse.childContextTypes = {
  collapse: PropTypes.instanceOf(Collapse)
}


export default Collapse

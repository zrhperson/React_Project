/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import message from '../index'

describe('message', () => {

  it('should success works', () => {
    document.body.innerHTML = ''
    message.success('test')
    expect(document.querySelector('.bocomui-message--success')).not.toBeNull()
  })
})

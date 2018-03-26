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
import Radio from '../Radio'

describe('Radio', () => {

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Radio value="test" />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('disabled is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Radio value="test" disabled />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').disabled).toBe(true)
  })
})
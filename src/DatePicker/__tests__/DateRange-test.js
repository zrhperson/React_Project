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
import DateRange from '../DateRange'

describe('DateRange', () => {
  it('should onSelect works', () => {
    document.body.innerHTML = ''
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<DateRange start="2016-01-01" onSelect={handleSelect} />)
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bocomui-datepicker'))
    TestUtils.Simulate.click(document.querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})

/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import confirm from '../index'

describe('confirm', () => {

  it('is ok', () => {
    const callback = jest.fn()
    confirm('test', callback)

    const node = document.body.lastElementChild
    expect(node.querySelector('.bocomui-confirm__message').textContent).toBe('test')

    TestUtils.Simulate.click(node.querySelector('.bocomui-confirm__operate .bocomui-btn'))
    expect(callback).toBeCalled()
  })
})

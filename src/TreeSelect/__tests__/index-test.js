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
import TreeSelect from '../index'

describe('TreeSelect', () => {

  it('should value works', () => {
    document.body.innerHTML = ''
    const data = [{
      name: '0',
      value: '0'
    }]
    const instance = TestUtils.renderIntoDocument(
      <TreeSelect value="0" defaultData={data} onChange={jest.fn()} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container)
    expect(document.querySelector('.bocomui-tree__node-content--active').textContent).toBe('0')
  })
})

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
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  it('should onSelect works', () => {
    const data = [{
      name: 'a'
    }]
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <SelectTree defaultData={data} onSelect={handleSelect} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('.bocomui-checkbox input'), {
      target: {
        checked: true
      }
    })
    expect(handleSelect).toBeCalledWith([{
      name: 'a',
      checked: true
    }], {
      name: 'a',
      checked: true
    }, [0], true)
  })
})

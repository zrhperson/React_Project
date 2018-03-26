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
import SearchInput2 from '../index'

describe('SearchInput2', () => {

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <SearchInput2 value="test" onChange={handleChange} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'changed'
      }
    })
    expect(handleChange).toBeCalledWith('changed')
  })

  it('should search works', () => {
    const handleSearch = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <SearchInput2 defaultValue="test" onSearch={handleSearch} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('button'))
    expect(handleSearch).toBeCalledWith('test')
  })

  it('should enter works', () => {
    const handleSearch = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <SearchInput2 defaultValue="test" onSearch={handleSearch} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.keyDown(container.querySelector('input'), {
      key: 'Enter'
    })
    expect(handleSearch).toBeCalledWith('test')
  })
})

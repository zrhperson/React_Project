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
import Switch from '../index'

describe('Switch', () => {

  it('should on works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Switch on labelOn="1" onChange={jest.fn()} />
    )
    expect(findDOMNode(instance).textContent).toBe('1')
  })

  it('should defaultOn works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Switch defaultOn labelOn="1" />
    )
    expect(findDOMNode(instance).textContent).toBe('1')
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()    
    const instance = TestUtils.renderIntoDocument(
      <Switch onChange={handleChange} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        checked: true
      }
    })
    expect(handleChange).toBeCalledWith(true)
  })

  it('should labelOff works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Switch labelOff="0" />
    )
    expect(findDOMNode(instance).textContent).toBe('0')
  })
})
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
import Editable from '../index'

describe('Editable', () => {

  it('should defaultEditing works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Editable defaultEditing />
    )
    expect(findDOMNode(instance).querySelector('input')).not.toBeNull()
  })

  it('should click to editing works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Editable defaultValue="test" />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bocomui-editable__normal-container'))
    expect(container.querySelector('input')).not.toBeNull()
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Editable defaultEditing onChange={handleChange} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'test'
      }
    })
    TestUtils.Simulate.click(container.querySelector('.bocomui-btn'))
    expect(handleChange).toBeCalledWith('test')
  })

  it('should onCancel works', () => {
    const handleCancel = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Editable defaultEditing onCancel={handleCancel} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelectorAll('.bocomui-btn')[1])
    expect(handleCancel).toBeCalled()
  })
})

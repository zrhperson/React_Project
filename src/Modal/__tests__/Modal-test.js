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
import Modal from '../Modal'

describe('Modal', () => {

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should open works', () => {
    const instance = TestUtils.renderIntoDocument(<Modal open />)
    expect(document.querySelector('.bocomui-modal')).not.toBeNull()
  })

  it('should onToggle works', () => {
    const handleToggle = jest.fn()
    const instance = TestUtils.renderIntoDocument(<Modal open onToggle={handleToggle} />)
    instance.open()
    expect(handleToggle).toBeCalledWith(true)
  })

  it('should close() works', () => {
    const instance = TestUtils.renderIntoDocument(<Modal open />)
    instance.close()
    expect(instance.state.open).toBe(false)
  })
})

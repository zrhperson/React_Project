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
import Dropdown from '../Dropdown'
import DropdownToggle from '../DropdownToggle'
import DropdownMenu from '../DropdownMenu'

describe('Dropdown', () => {

  it('should open works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown open onToggle={jest.fn()}>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    expect(findDOMNode(instance).className).toContain('open')
  })

  it('should onToggle works', () => {
    const handleToggle = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Dropdown onToggle={handleToggle}>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    TestUtils.Simulate.click(findDOMNode(instance))
    expect(handleToggle).toBeCalledWith(true)
  })

  it('should disabled works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown disabled>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    expect(findDOMNode(instance).className).toContain('disabled')
  })
})

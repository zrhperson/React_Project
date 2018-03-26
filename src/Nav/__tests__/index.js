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
import { Nav, NavItem, IndexNavItem } from '../index'

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/'
})

describe('Nav', () => {

  it('should defaultOpen works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Nav href="/">
        <NavItem defaultOpen>
          <NavItem href="test"/>
        </NavItem>
      </Nav>
    )
    expect(findDOMNode(instance).querySelector('li').className).toContain('open')
  })
})

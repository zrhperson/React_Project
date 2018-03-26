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
import TextOverflow from '../index'

describe('TextOverflow', () => {
  it('should className works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <TextOverflow>
          <div>test</div>
        </TextOverflow>
      </div>
    )
    expect(findDOMNode(instance).children[0].className).toContain('bocomui-text-overflow')
  })
})

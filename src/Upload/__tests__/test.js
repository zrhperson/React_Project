/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Upload from '../index'

describe('Upload', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <Upload action="/upload.do" className="test" />
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <Upload action="/upload.do" style={{color: 'red'}}/>
      )
      const container = findDOMNode(instance)
      expect(container.style.color).toBe('red')
    })

    it('text is ok', () => {
      const text = '上传'
      const instance = TestUtils.renderIntoDocument(
        <Upload action="/upload.do" text={text} />
      )
      const container = findDOMNode(instance)
      const button = container.querySelector('button')
      expect(button.innerHTML).toContain(text)
    })
  })
})
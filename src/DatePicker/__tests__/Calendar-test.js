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
import Calendar from '../Calendar'

describe('Calendar', () => {

  it('should date works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const container = findDOMNode(instance)
    expect(container.querySelector('.bocomui-calendar__result').textContent).toContain('2016年')
    expect(container.querySelector('.bocomui-calendar__result').textContent).toContain('1月')
    expect(container.querySelector('.bocomui-calendar__day--active').textContent).toBe('1')
  })

  it('should toggle works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const container = findDOMNode(instance)

    const header = container.querySelector('.bocomui-calendar__header')

    const buttons = header.querySelectorAll('button')
    const result = header.querySelector('.bocomui-calendar__result')

    TestUtils.Simulate.click(buttons[0])
    expect(result.textContent).toContain('2015年')
    TestUtils.Simulate.click(buttons[1])
    expect(result.textContent).toContain('12月')

    TestUtils.Simulate.click(buttons[2])
    expect(result.textContent).toContain('1月')
    TestUtils.Simulate.click(buttons[3])
    expect(result.textContent).toContain('2016年')
  })

  it('should today works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar />)
    expect(findDOMNode(instance).querySelector('.bocomui-calendar__day--today').textContent).toBe(String(new Date().getDate()))
  })

  it('should onSelect works', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" onSelect={handleSelect} />)
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})

/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DataTable from '../index'

describe('DataTable', () => {

  let render, rootNode
  beforeEach(function() {
    const columns = [{
      title: 'a',
      key: 'a',
      sortable: true
    }, {
      title: 'b',
      key: 'b'
    }]
    const containerNode = document.createElement('div')
    document.body.appendChild(containerNode)
    render = function(props) {
      return ReactDOM.render(<DataTable columns={columns} {...props} />, containerNode)
    }
    rootNode = ReactDOM.findDOMNode(render({data: []}))
  })

  function $(selector) {
    return rootNode.querySelector(selector)
  }

  function $$(selector) {
    return rootNode.querySelectorAll(selector)
  }

  it('should data works', () => {
    render({
      data: [{
        a: 'a',
        b: 'b'
      }]
    })
    expect($$('tbody > tr').length).toBe(1)
  })

  it('should data auto paging works', () => {
    render({
      pageSize: 5,
      data: new Array(10).fill({
        a: 'a',
        b: 'b'
      })
    })
    expect($$('tbody > tr').length).toBe(5)
  })

  it('should data withut paging works', () => {
    render({
      pagingDisabled: true,
      data: new Array(20).fill({
        a: 'a',
        b: 'b'
      })
    })
    expect($$('tbody > tr').length).toBe(20)
  })

  it('should currentPage works', () => {
    render({
      currentPage: 2,
      onPageChange: jest.fn(),
      pageSize: 5,
      data: Array.from({length: 10}, (v, i) => ({a: i}))
    })
    expect($('tbody td').textContent).toBe('5')
  })

  it('should sortable works', () => {
    render({
      data: []
    })
    expect($('thead th').className).toContain('sortable')
  })

  it('should sortKey works', () => {
    render({
      sortKey: 'a',
      onSort: jest.fn(),
      data: []
    })
    expect($('thead .bocomui-datatable__sort-symbol').className).toContain('sort-desc')
  })

  it('should sortType works', () => {
    render({
      sortKey: 'a',
      sortType: 'asc',
      onSort: jest.fn(),
      data: []
    })
    expect($('thead .bocomui-datatable__sort-symbol').className).toContain('sort-asc')
  })

  it('should onSort works', () => {
    const handleSort = jest.fn()
    render({
      data: [],
      onSort: handleSort
    })
    TestUtils.Simulate.click($('thead th'))
    expect(handleSort).toBeCalledWith('a', 'desc')
    TestUtils.Simulate.click($('thead th'))
    expect(handleSort).toBeCalledWith('a', 'asc')
  })
})

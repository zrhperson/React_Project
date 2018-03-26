/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import invariant from 'invariant'

export default {

  handleLabelRemove(value) {
    this.removeValue(value)
  },

  handleOptionCheck(value, e) {
    e.stopPropagation()
    e.target.checked ? this.addValue(value) : this.removeValue(value)
  },

  handleToggleAll(e) {
    e.stopPropagation()
    this.toggleAll(e.target.checked)
  },

  handleLoad(data) {
    if (this.props.dataFilter) {
      data = this.props.dataFilter(data)
      invariant(!!data, '`dataFilter` should return new data, check the `dataFilter` of `Select`.')
    }
    this.setState({ data })
  },

  handleDropdownToggle(open) {
    if (open) {
      this.refs.tagList.focus()
    } else {
      this.refs.tagList.blur()
    }
  },

  handleInput(value) {
    this.setState({
      searchValue: value,
      index: value ? 0 : -1
    })
  },

  handleKeyDown(e) {
    const key = e.key
    const { options } = this
    let { index } = this.state
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (key === 'ArrowDown') {
        if (index === options.length - 1) index = -1
        else index++
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        if (index === -1) index = options.length - 1
        else index--
      }
      this.setState({ index })
    }
    if (key === 'Enter' && index > -2) {
      if (index > -1) {
        const value = options[index].props.value
        if (this.valueSet.has(value)) {
          this.removeValue(value)
        } else {
          this.addValue(value)
        }
      } else {
        this.toggleAll(!this.isAll)
      }
    }
    if (key === 'Backspace' && !this.state.searchValue) {
      const value = this.state.values.pop()
      value && this.removeValue(value)
    }
  }
}

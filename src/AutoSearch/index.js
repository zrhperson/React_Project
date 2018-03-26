/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'
import TextOverflow from '../TextOverflow'
import controlledPropValidator from '../_shared/propValidator/controlled'
import Button from '../Button'

class AutoSearch extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
      index: -1,
      result: props.source,
      value: props.defaultValue || props.value || ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
    'source' in nextProps && this.setState({result: nextProps.source})
  }

  handleInput(value) {
    this.lastValue = value
    const state = { value }
    if (!value) {
      state.open = true
      state.result = this.props.source
      this.setState(state)
    } else {
      // reset tab index
      state.index = -1
      state.result = this.props.source.filter(item => item.indexOf(value) > -1)
      state.open = !!state.result.length
      this.setState(state)
    }
    this.props.onChange && this.props.onChange(value)
  }

  handleSelect(value) {
    this.setState({
      value,
      open: false
    })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(e) {
    const { open, result } = this.state
    if (open) {
      const input = e.target
      const key = e.key
      let { index } = this.state
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        if (key === 'ArrowDown') {
          if (index === result.length - 1) index = -1
          else index++
        }
        if (key === 'ArrowUp') {
          e.preventDefault()
          if (index === -1) index = result.length - 1
          else index--
        }
        this.setState({
          index,
          value: result[index] || this.lastValue
        })
      }
      if (key === 'Enter') {
        this.handleSelect(result[index])
        input.blur()
      }
    }
  }
  handleSearch() {
    this.props.onSearch && this.props.onSearch(this.state.value)
  }

  render() {
    const { open, index, result, value } = this.state
    const { className,label, size, source, onFocus, onKeyDown, onChange, ...other } = this.props
    return (
      <Dropdown
        open={open}
        aligned
        onToggle={open => this.setState({ open })}
      >
        <DropdownToggle className={classnames('bocomui-auto-complete', className)}>
          <ClearableInput
            value={value}
            onKeyDown={::this.handleKeyDown}
            onChange={::this.handleInput}
            {...other}
          />
          <Button size={size}  onClick={this.handleSearch}   icon="search">{label}</Button>
        </DropdownToggle>
        <DropdownMenu className="bocomui-auto-complete__popover">
          <ul className="bocomui-auto-complete__result">
            {result.map((item, i) => (
              <TextOverflow key={item}>
                <li
                  className={classnames({'bocomui-auto-complete__option--active': index === i})}
                  onClick={this.handleSelect.bind(this, item)}
                >
                  {item}
                </li>
              </TextOverflow>
            ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

AutoSearch.defaultProps = {
  label: '搜索'
}
AutoSearch.propTypes = {

  // 待搜索的数据源
  source: PropTypes.array.isRequired,

  // 输入框的值
  value: PropTypes.string,

  // 初始化输入框的值
  defaultValue: PropTypes.string,

  // 输入改变、选择后的回调，参数为当前输入框的值
  onChange: PropTypes.func,

  // 输入框大小，除默认外可选值：sm、lg
  size: PropTypes.string,

  // 是否禁用
  disabled: PropTypes.bool,

  // 同 input placeholder
  placeholder: PropTypes.string,

  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default AutoSearch

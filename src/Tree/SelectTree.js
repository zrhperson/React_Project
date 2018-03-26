/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'
import Tree from './Tree'
import Checkbox from '../Checkbox'
import nodeCheckProcessor from './nodeCheckProcessor'
import getPathData from './getPathData'

class SelectTree extends Component {

  handleSelect(item, path, checked) {
    const newData = this.refs.tree.updateDataBySingleProp('checked', checked, path)
    this.props.onSelect && this.props.onSelect(newData, get(newData, path), path, checked)
  }

  handleNodeCheck(item, path,checked) {
    nodeCheckProcessor(this.props.data, checked, item, path, (newData, newItem) => {
      if (this.props.onSelect) {
        this.props.onSelect(checked, newItem, getPathData(path, newData))
      }
      this.updateData(newData)
    })
  }

  updateData(newData) {
    this.props.onChange && this.props.onChange(newData)
  }

  render() {
    const { className, onSelect, ...other } = this.props
    other.beforeNodeRender = (item, path) => {
      console.log(item, path);
      return (
        <Checkbox
          checked={item.checked || false}
          onChange={e => this.handleNodeCheck(item, path, e.target.checked)}
        />
      )
    }
    return (
      <Tree
        ref="tree"
        className={classnames('bocomui-select-tree', className)}
        {...other}
      />
    )
  }
}

SelectTree.propTypes = {
  // 复选框勾选后的回调，参数为(data, item, path, checked)
  onSelect: PropTypes.func
}

export default SelectTree

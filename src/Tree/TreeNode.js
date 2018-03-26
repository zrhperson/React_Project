/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import classnames from 'classnames'
import Button from '../Button'
import Icon from '../Icon'
import Fetch from '../Fetch'
import getPathData from './getPathData'

class TreeNode extends Component {

  componentWillMount() {
    this.prepareActivePath(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.prepareActivePath(nextProps)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  prepareActivePath(props) {
    props.data.active && props.onActive(props.path)
  }

  changeBySingleProp(key, value) {
    this.props.onSinglePropChange(key, value, this.props.path)
  }

  handleToggle(e) {
    e.stopPropagation()
    this.changeBySingleProp('open', !this.props.data.open)
  }

  handleSelect() {
    this.props.onSelect(this.props.path)
  }

  handleLoad(data) {
    const filter = this.props.dataFilter
    if (filter) {
      data = filter(data)
    }
    this.changeBySingleProp('children', data)
  }

  render() {
    const {
      data, path, treeData, contentRender, getUrl, noDataContent, getIcon, beforeRender,
      shouldSelectable
    } = this.props
    const hasChildren = data.children && data.children.length
    const typeIcon = getIcon && getIcon(data)
    const selectable = shouldSelectable ? shouldSelectable(data, path) : true

    let Children, List
    if (hasChildren) {
      List = (
        <ul className="bocomui-tree__node-list">
          {data.children.map((item, i) => (
            <TreeNode
              key={i}
              {...this.props}
              data={item}
              path={[...path, 'children', i]}
            />
          ))}
        </ul>
      )
    }

    if (data.isParent) {
      Children = (
        <Fetch
          className="bocomui-tree__fetch"
          defaultHeight={30}
          spinnerHeight={20}
          url={data.open && getUrl && getUrl(data, getPathData(path, treeData)) || ''}
          onSuccess={::this.handleLoad}
        >
          {List || <div className="bocomui-tree__node--empty">{noDataContent}</div>}
        </Fetch>
      )
    } else {
      Children = List
    }

    return (
      <li className={classnames('bocomui-tree__node', {'bocomui-tree__node--open': data.open})}>
        <Button
          className="bocomui-tree__node-toggle"
          style={{visibility: hasChildren || data.isParent ? 'visible' : 'hidden'}}
          icon="caret-right"
          size="sm"
          transparent
          onClick={::this.handleToggle}
        />
        {beforeRender && (
          <div className="bocomui-tree__node-before">{beforeRender(data, path)}</div>
        )}
        {typeIcon && <Icon type={typeIcon} className="bocomui-tree__node-type" />}
        <div
          className={classnames('bocomui-tree__node-content', {
            'bocomui-tree__node-content--active': data.active,
            'bocomui-tree__node-content--disabled': !selectable
          })}
          onClick={selectable && ::this.handleSelect}
        >
          {contentRender ? contentRender(data, path) : data.name}
        </div>
        {Children}
      </li>
    )
  }
}

export default TreeNode

/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ClearableInput from '../../ClearableInput'

const FormInput = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  other.value = form.getItemValue(formItem)
  other.onChange = value => {
    form.setItemValue(formItem, value)
    onChange && onChange(value)
  }
  return <ClearableInput className={classnames('bocomui-form-input', className)} {...other} />
}

FormInput.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export default FormInput

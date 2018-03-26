/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default (path, data) => {
  const pathData = []
  path.forEach(key => {
    data = data[key]
    if (key !== 'children') {
      pathData.push(data)
    }
  })
  return pathData
}

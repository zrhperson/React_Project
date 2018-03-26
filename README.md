<<<<<<< HEAD
# REACT UI

## 使用

本组件抛弃传统的资源加载方式，基于 [webpack](https://webpack.github.io/) 打包，资源种类多种多样，会涉及一些 webpack 的配置，如下：

```js
{
  module: {
    loaders: [{
      test: /\\.(eot|woff|woff2|ttf|svg|png|jpg)(\\?v=[\\d\\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\\.css$/,
      loader: 'style!css'
    }]
  },
  resolve: {
    alias: {
      bfd: 'bfd-ui/lib'
    }
  }
}
```
webpack 配置完成后，即可在代码中使用组件，以 [DatePciker](http://ui.baifendian.com/components/DatePicker) 为例：
```js
import React, { Component } from 'react'
import DatePicker from 'bfd/DatePicker'

class App extends Component {

  handleSelect(date) {
    console.log(date)
  }

  render() {
    return <DatePicker onSelect={this.handleSelect} />
  }
}
```

## 受控属性与不受控属性

组件支持不受控（`defaultXXX`）的使用方式，关于为什么区分受控 / 不受控请参考 [Controlled / Uncontrolled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)


## 浏览器支持

Chrome、Firefox、Safari、IE9+


## 开发者说明

#### 开发环境安装

cd bfd-ui

npm install

npm start
```
查看: http://localhost:4001


#### 开发规范

- 向下兼容
- 单元测试：组件根目录下创建 `__tests__` 文件夹
- 代码规范参考 [airbnb react](https://github.com/airbnb/javascript/tree/master/react)


#### 编写一个新组件
```sh
npm run create MyComponent
```
查看: http://localhost:4001/components/MyComponent

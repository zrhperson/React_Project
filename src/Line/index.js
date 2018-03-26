import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
require('echarts/lib/chart/line');
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
class Line extends Component {

  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    var myChart = echarts.init(document.getElementById('main'));

    myChart.setOption(this.props.data)
  }
  render() {
    return (
      <div id="main" style={this.props.style} className={this.props.className}></div>
    );
  }
}

Line.propTypes = {

  // 标题组件，包含主标题和副标题。
  title: PropTypes.string,

  /**
   * 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
   * ```js
   * [{
   *   data[i]: 类目数据，在类目轴（type: 'category'）中有效。
   *   show: 是否显示 x 轴。
   *   position: x 轴的位置,可选： 'top' 'bottom' 注：默认 grid 中的第一个 x 轴在 grid 的下方（'bottom'），第二个 x 轴视第一个 x 轴的位置放在另一侧。
   * }]
   * ```
   */
  xAxis: PropTypes.array,


  /**
   * 图例的 tooltip 配置，配置项同 tooltip。默认不显示，可以在 legend 文字很多的时候对文字做裁剪并且开启 tooltip
   * ```js
   * [{
   *   data[i]: 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）
   *   backgroundColor: 图例背景色，默认透明
   * }]
   * ```
   */
  tooltip: PropTypes.array,

  /**
   * 系列列表。每个系列通过 type 决定自己的图表类型
   * ```js
   * [{
   *   name: 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
   *   type: [ default: 'bar' ]。
   *   data: 系列中的数据内容数组。数组项通常为具体的数据项。
   * }]
   * ```
   */
  series: PropTypes.array,
  /**
   * 图例组件 , 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
   * ```js
   * [{
   *   top: 图例组件离容器上侧的距离。
   *   data: 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
   * }]
   * ```
   */
  legend: PropTypes.array,
  /**
   * 图例组件 , 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
   * ```js
   * [{
   *   show: 是否显示工具栏组件。
   *   feature: 各工具配置项 , 除了各个内置的工具按钮外，还可以自定义工具按钮。
   * }]
   * ```
   */
  toolbox: PropTypes.array,
}

export default Line

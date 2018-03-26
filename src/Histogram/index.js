import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Histogram extends Component {

  static propTypes = {
    //data: React.PropTypes.array
  }

  componentDidMount() {
    var myChart = echarts.init(document.getElementById('main'));
    /*var option ={
      title:this.props.data.title,
      tooltip: this.props.data.tooltip,
      xAxis: this.props.data.xAxis,
      yAxis: this.props.data.yAxis,
      series: this.props.data.series
    };
     myChart.setOption(option)*/
    myChart.setOption(this.props.data)
  }
  render() {
    return (
      <div id="main" style={this.props.style} className={this.props.className}></div>
    );
  }
}

Histogram.propTypes = {

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

}

export default Histogram;

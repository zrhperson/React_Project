import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class Piechat extends Component {
  componentDidMount() {
    var myChart = echarts.init(document.getElementById('main'));



    myChart.setOption(this.props.data)
  }
  render() {
    return (
      <div id="main"  style={this.props.style} className={this.props.className}></div>
    );
  }
}

Piechat.propTypes = {
  /**
   * 系列列表。每个系列通过 type 决定自己的图表类型
   * ```js
   * [{
   *   name: 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
   *   type: [ default: 'pie' ]。
   *   data: 系列中的数据内容数组。数组项通常为具体的数据项。
   * }]
   * ```
   */
  series: PropTypes.array,
}

export default Piechat

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Scatter extends Component {

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
    )
  }
}

Scatter.propTypes = {
  test: PropTypes.string
}

export default Scatter

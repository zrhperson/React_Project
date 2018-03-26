import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/polar';

class PileHistogram extends Component {

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

PileHistogram.propTypes = {
  test: PropTypes.string
}

export default PileHistogram

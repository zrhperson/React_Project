import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shouldComponentUpdate from '../shouldComponentUpdate'
import Button from '../Button'
import './riqi.less'

class Calendar extends Component {

  constructor(props) {
    super()
    this.state = this.getDateState(props.date)
  }

  componentWillReceiveProps(nextProps) {
    'date' in nextProps && this.setState(this.getDateState(nextProps.date))
  }

  shouldComponentUpdate = shouldComponentUpdate

  getDateState(date) {
    const d = date ? new Date(date) : new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return {
      // 选中的年月日
      year: date ? year : null,
      month: date ? month : null,
      day: date ? day : null,
      // 切换后的年月
      currentYear: year,
      currentMonth: month
    }
  }

  // 切换年月
  handleToggle(change, type) {
    const d = new Date(this.state.currentYear, this.state.currentMonth)
    if (type === 'year') {
      d.setFullYear(d.getFullYear() + change)
      this.setState({
        currentYear: d.getFullYear()
      })
    } else {
      d.setMonth(d.getMonth() + change)
      this.setState({
        currentYear: d.getFullYear(),
        currentMonth: d.getMonth()
      })
    }
  }

  handleDaySelect(date) {
    const { year, month } = date;
    this.setState({
      year,
      month,
      currentYear: year,
      currentMonth: month
    })
    this.props.onSelect && this.props.onSelect(new Date(year, month).setHours(0, 0, 0, 0))
  }

  getZeroTimestrap(date) {
    return new Date(date).setHours(0, 0, 0, 0)
  }

  disabledComparer() {
    const { min, max } = this.props
    const _min = min && this.getZeroTimestrap(min)
    const _max = max && this.getZeroTimestrap(max)
    if (_min || _max) {
      return date => {
        const timestrap = new Date(date.year, date.month, date.day).getTime()
        return timestrap < _min || timestrap > _max
      }
    } else {
      return () => false
    }
  }

  // 样式高亮，是否是今天、开始、结束、区间内、当月外、日期范围外
  getDateClassNames(date, start, end) {

    const { year, month} = this.state
    const timestrap = new Date(date.year, date.month).getTime()
    const isStart = timestrap === start
    const isEnd = timestrap === end
    const prefix = 'bocomui-calendar__day--'

    return classnames('bocomui-calendar__day', {
      [`${prefix}today`]: timestrap === new Date().setHours(0, 0, 0, 0),
      [`${prefix}exclude`]: date.notThisMonth,
      [`${prefix}start`]: isStart,
      [`${prefix}end`]: isEnd,
      [`${prefix}active`]: timestrap === new Date(year, month).getTime(),
      [`${prefix}inside`]: start && end ? timestrap > start && timestrap < end : false
    })
  }

  // 当前月各天的时间状态
  getDates() {
    const { currentYear, currentMonth } = this.state
    const dates = []
    let d
    // 本月
    d = new Date(currentYear, currentMonth + 1, 0)
    for (let i = 0; i < 12; i++) {
      dates.push({
        year: d.getFullYear(),
        month: i
      })
    }
    return dates
  }

  render() {
    const { start, end, captionRender, weekDayNames } = this.props
    const dates = this.getDates();
    const montheach = [
      {
        id : 1,
        heng : [
          {
            id : 11,
            monthname : "一月"
          },
          {
            id : 12,
            monthname : "二月"
          },
          {
            id : 13,
            monthname : "三月"
          },
          {
            id : 14,
            monthname : "四月"
          },
        ]
      },
      {
        id : 2,
        heng : [
          {
            id : 21,
            monthname : "五月"
          },
          {
            id : 22,
            monthname : "六月"
          },
          {
            id : 23,
            monthname : "七月"
          },
          {
            id : 24,
            monthname : "八月"
          },
        ]
      },
      {
        id : 3,
        heng : [
          {
            id : 31,
            monthname : "九月"
          },
          {
            id : 32,
            monthname : "十月"
          },
          {
            id : 33,
            monthname : "十一月"
          },
          {
            id : 34,
            monthname : "十二月"
          },
        ]
      }
    ]
    const getComparerResult = this.disabledComparer()

    let _start, _end
    start && (_start = new Date(start).setHours(0, 0, 0, 0) || 0)
    end && (_end = new Date(end).setHours(0, 0, 0, 0) || 0)

    return (
      <div className="bocomui-calendar">
        <div className="bocomui-calendar__header">
          <div className="bocomui-calendar__header-left">
            <Button
              size="sm"
              icon="angle-double-left"
              transparent
              onClick={this.handleToggle.bind(this, -1, 'year')}
            />
          </div>
          <span className="bocomui-calendar__result">
            {captionRender(this.state)}
          </span>
          <div className="bocomui-calendar__header-right">
            <Button
              size="sm"
              icon="angle-double-right"
              transparent
              onClick={this.handleToggle.bind(this, 1, 'year')}
            />
          </div>
        </div>
        <table>
          <tbody>
          { montheach.map((v,i) => {
            return (
              <tr key={i}>
                {montheach[i].heng.map((name,index)=> {
                  let monthnum = i*4+index;
                  let date = dates[monthnum];
                  return (
                    <td key={monthnum}>
                      <button
                        type="button"
                        disabled={getComparerResult(date)}
                        className={this.getDateClassNames(date, _start, _end)}
                        onClick={this.handleDaySelect.bind(this, date)}
                      >
                        {name.monthname}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          }) }
          </tbody>
        </table>
      </div>
    )
  }
}

Calendar.defaultProps = {
  weekDayNames: ['一', '二', '三', '四', '五', '六', '日'],
  captionRender(state) {
    return `${state.currentYear}年`
  }
}

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

Calendar.propTypes = {
  date: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  start: checkDateTime,
  end: checkDateTime,
  onSelect: PropTypes.func,
  captionRender: PropTypes.func,
  weekDayNames: PropTypes.array
}

export default Calendar

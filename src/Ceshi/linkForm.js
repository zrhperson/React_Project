import React, { Component, PropTypes } from 'react'
import update from 'react-update'
import { Form, FormItem, FormSubmit, FormInput, FormSelect, Option, FormTextarea } from '../Form';
import Riqi from "./riqi"
import message from '../message'

var options1 = [
  {
    ORG_NAME : "北京市分行",
    ORG_CODE : "北京"
  },
  {
    ORG_NAME : "天津市分行",
    ORG_CODE : "天津"
  },
  {
    ORG_NAME : "河北市分行",
    ORG_CODE : "河北"
  },
  {
    ORG_NAME : "山西市分行",
    ORG_CODE : "山西"
  },
  {
    ORG_NAME : "内蒙古区分行",
    ORG_CODE : "内蒙古"
  }
];
var options2 = [
  {
    ORG_NAME : "全行汇总",
    ORG_CODE : "全行"
  }
];
var defaultvalue2 = options1[0].ORG_CODE;

class LinkForm extends Component {

  constructor(props) {
    super()
    this.update = update.bind(this)
    this.rules = {
      name(v) {
        if (!v) return '请填写用户群'
        if (v.length > 5) return '用户群名称不能超过5个字符'
      },
      date(v) {
        if (!v) return '日期不能为空'
      }
    }
    this.state = {
      formData: {
        brand: 0
      },
      linkchange : options1,
      defaultvalue : options1[0].ORG_CODE
    }
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}

  handleDateSelect(date) {
    this.update('set', 'formData.date', date)
  }

  handleCitySelect(selects) {
    this.update('set', 'formData.cities', selects)
  }

  handleSuccess(res) {
    console.log(res)
    message.success('操作成功！')
  }

  render() {
    const { formData , linkchange , defaultvalue } = this.state;
    console.log(defaultvalue);
    let defaultvalue2= defaultvalue || options1[0].ORG_CODE;
    return (
      <Form
        action="/api/form"
        data={formData}
        onChange={formData => this.update('set', { formData })}
        rules={this.rules}
        onSuccess={::this.handleSuccess}
      >
        <FormItem label="选择报告" name="brand1">
          <FormSelect onChange={::this.LinkSelect} defaultValue={"REPORT1"}>
            <Option value={"REPORT1"}>分行业务运营简况</Option>
            <Option value={"REPORT2"}>境内分行资产收益率及负债率成本率排名情况通报</Option>
          </FormSelect>
        </FormItem>
        <FormItem label="分行选择" name="brand2">
          <FormSelect  defaultValue={defaultvalue}
             data={linkchange}
             render={item => <Option value={item.ORG_CODE}>{item.ORG_NAME}</Option>}
          />
        </FormItem>

        <FormItem label="选择日期" name="date" required>
          <Riqi date={formData.date} onSelect={::this.handleDateSelect} />
        </FormItem>
        <FormSubmit>保存</FormSubmit>
      </Form>
    )
  }
  LinkSelect(e){
    if(e=="REPORT1"){
      this.setState({linkchange : options1});
      this.setState({defaultvalue : options1[0].ORG_CODE});
    }else if(e=="REPORT2"){
      this.setState({linkchange : options2});
      this.setState({defaultvalue : options2[0].ORG_CODE});
    }
  }
}

export default LinkForm;

//{ linkchange ?
//  options1.map(function(name,index){
//    return <Option key={index} value={name.ORG_CODE}>{name.ORG_NAME}</Option>
//  }) :
//  <Option value={options2[0].ORG_CODE}>{options2[0].ORG_NAME}</Option>
//}

import React, { Component, PropTypes } from 'react';
import { Select, Option } from '../Select';

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
class LinkSelect extends Component {

  constructor() {
    super()
    this.state = {
      linkchange : options1,
      defaultvalue : options1[0].ORG_CODE
    }
  }

  render() {
    const { linkchange , defaultvalue } = this.state;
    const { className , ...other} = this.props;
    return (
      <div>
        <Select onChange={::this.LinkSelect} defaultValue={"REPORT1"}>
          <Option value={"REPORT1"}>分行业务运营简况</Option>
          <Option value={"REPORT2"}>境内分行资产收益率及负债率成本率排名情况通报</Option>
        </Select>
        <Select  defaultValue={defaultvalue}
                 data={linkchange}
                 render={item => <Option value={item.ORG_CODE}>{item.ORG_NAME}</Option>}
          />
      </div>


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

export default LinkSelect

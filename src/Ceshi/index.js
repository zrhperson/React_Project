import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import "./index.less";
import Progress from './progress'
import Fileup from './fileup';
import LinkForm from './linkForm';
import Riqi from './riqi'

class Ceshi extends Component {

  constructor() {
    super();
    this.state = {

    };
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentWillMount() {
    console.log("start")
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    console.lgo("end")
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(){
    var scrollTop = this.refs.bodyBox.scrollTop;
    console.log(scrollTop);
  }

  handleClick(event){
    console.log(event.target.offsetTop)
  }

  render() {
    const { className, ...other} = this.props;
    const props = {
        method: 'post',
        action: '/upload.do',
        //onUplading: ::this.handleUploading,
        onComplete: ::this.handleComplete,
        multiple: true,
        showFileList: true
    }
    return (
      <div>
        <Progress progressWidth={"500px"} />

        <Fileup {...props} />

        <LinkForm />

        <Riqi />
        <div onClick={this.handleClick.bind(this)} ref="bodyBox">111111</div>
      </div>
    )
  }

  handleComplete() {
    console.log('文件上传成功')
  }

}


Ceshi.propTypes = {
  test: PropTypes.string
}

export default Ceshi

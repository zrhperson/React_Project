/**
 * Copyright 2017-present, BOCOMUI, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import xhr from '../xhr'
import Button from '../Button'
import FileList from './FileList'
import './fileup.less';
import Icon from '../Icon';

class Upload extends Component {

  constructor() {
    super()
    this.state = {
      list: [],
      filetype:false,
      fileover:false,
      filetishi:"",
      filename:""
    }
  }

  render() {
    const { className, action, fileName, text, multiple, onUplading, onComplete, showFileList, ...other } = this.props
    const { filetype, fileover, list } = this.state
    const isShowList = typeof showFileList == 'undefined' ? true : showFileList
    return (
      <div className={classnames('bocomui-upload', className)} {...other}>
        <div className={"fileup_text"}>导入数据</div>
          <div className={"fileup_over"} onMouseOver={::this.mouseOver} onMouseOut={::this.mouseOut}>
            { fileover && filetype && <div className={"fileup_show"}>
                <div className={"fileup_show2"}>
                  {this.state.filetishi}
                </div>
              </div> }
            <div className={"fileup_border"} >
              { this.state.filename }
              { filetype && <Icon type="exclamation-circle" className={'fileup_icon'}/> }
            </div>
            <input ref="file" onChange={::this.handleChange} type="file" multiple={multiple ? true : false} style={{display: 'none'}} />
            <Button onClick={::this.handleClick}>
              {text}
            </Button>
          </div>

        {
          isShowList ?
            <div className="bocomui-upload__listbox">
              <FileList data={this.state.list} onRemove={::this.handleRemove}></FileList>
            </div>
            : ''
        }
      </div>
    )
  }

  mouseOver(){
    this.setState({fileover:true});
  }
  mouseOut(){
    this.setState({fileover:false});
  }

  handleClick() {
    const fileEl = this.refs.file
    fileEl.value = ''
    fileEl.click()
  }

  handleChange(event) {
    const el = event.target
    const files = el.files
    const onUplading = this.props.onUplading
    const onUpload = this.props.onUpload
    onUplading && onUplading(0)
    onUpload ? onUpload(files) : this.upload(files)
    el.value = ''
  }

  upload(files) {
    const onUplading = this.props.onUplading
    const self = this
    const arr = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      arr.push({
        name: file.name,
        size: file.size,
        type: file.type,
        state: 0
      });
      for(let i=0;i<arr.length;i++){
        let nameflag="";
        nameflag=arr[i].name.substring(arr[i].name.indexOf("."),arr[i].name.length+1);
        let sizeflag=arr[i].size/1024;
        if(sizeflag>1000){
          this.setState({filetype:true});
          this.setState({filetishi:'文件“'+arr[i].name+'”超过允许大小1000KB'});
          return
        }else if(nameflag!=".jpg"){
          this.setState({filetype:true});
          this.setState({filetishi:'不正确的文件扩展名“'+arr[i].name+'”,只支持“.xlsx”的文件扩展名'});
          return
        }else{

        }
      }
      (function(self, file, index) {
        const fd = new FormData()
        fd.append(self.props.fileName || 'files', file)
        xhr({
          type: 'post',
          url: self.props.action,
          data: fd,
          beforeSend(xhr) {
            // 侦查当前附件上传情况
            xhr.upload.onprogress = function(evt) {
              const loaded = evt.loaded
              const tot = evt.total
              const per = Math.floor(100 * loaded / tot) // 已经上传的百分比
              const list = self.state.list.slice(0)
              const f = list[index]
              f.percent = per
              onUplading && onUplading(per)
              self.setState({
                list
              })
            }
          },
          success(data) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 1
            self.setState({
              list
            });
            self.setState({filetype:false});
            self.setState({filename:list[0].name})
            if (typeof self.props.onComplete == 'function') {
              self.props.onComplete(data, list);

            }
          },
          error(msg) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 2
            self.setState({
              list
            })
            if (typeof self.props.onComplete == 'function') {
              self.props.onComplete(msg, list)
            }
          },
          complete() {}
        })
      })(self, file, i)
    }

    this.setState({
      list: arr
    })
  }

  handleRemove(currItem) {
    const self = this
    const arr = this.state.list.slice(0)
    arr.map((item, index) => {
      if (item == currItem) {
        arr.splice(index, 1)
        self.setState({
          list: arr
        })
        return
      }
    })
  }
}

Upload.defaultProps = {
  text: '文件上传'
}

Upload.propTypes = {

  // 上传的地址
  action: PropTypes.string.isRequired,

  // 上传按钮文本内容，默认为`文件上传`
  text: PropTypes.string,

  // 上传文件名称，默认为files
  fileName: PropTypes.string,

  // 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
  multiple: PropTypes.bool,

  // 文件上传进行中事件
  onUplading: PropTypes.func,
  // 上传文件完成时的回调函数
  onComplete: PropTypes.func,

  // 是否显示文件上传列表
  showFileList: PropTypes.bool
}

export default Upload

require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([12],{

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(251);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c3ea31fe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(256);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c3ea31fe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\newNeed\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c3ea31fe", Component.options)
  } else {
    hotAPI.reload("data-v-c3ea31fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 252:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__ = __webpack_require__(3);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      current: ['checkbox1', 'checkbox2'],
      options: [{ label: '多选', value: 'checkbox1' }, { label: '多选', value: 'checkbox2' }, {
        label: '多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行',
        value: 'checkbox3',
        maxLabelRow: 2
      }, {
        label: '多选',
        value: 'checkbox4',
        content: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
        maxContentRow: 2
      }],
      NeedName: '',
      NeedIntro: '',
      NeedResource: '',
      originFiles: [],
      VideoList: [],
      gridConfig: {
        column: 4,
        width: 160,
        height: 160
      },
      areaList: {
        Classis: {
          1: '111',
          2: '222'
        }
      },
      NeedLocation: '',
      data: {
        current: ['1', '2'],
        choose: [],
        visible: false,
        chosenTagId: [], // 选择的tagID
        chosenTagName: [], // 选择的tag名
        showTagName: '',
        areaText: '',
        areaVisible: false,
        areaValue: [],
        provinces: [],
        cities: [],
        counties: []
      },
      wd: 0,
      jd: 0,
      address: ''
    };
  },
  mounted: function mounted() {
    this.fetchClassiData();
  },

  methods: {
    onAreaPicker: function onAreaPicker() {
      // this.data.areaVisible = true
      var that = this;
      console.log('点击地址');
      wx.chooseLocation({
        success: function success(res) {
          // success
          console.log(res, 'location');
          // that.wd = res.latitude
          // that.jd = res.longitude
          // that.address = res.address
          that.wd = res.latitude;
          that.jd = res.longitude;
          that.address = res.address;
          that.data.areaText = that.address;
        },
        fail: function fail() {
          // fail
        },
        complete: function complete() {
          // complete
        }
      });
    },
    fetchClassiData: function fetchClassiData() {
      var token = wx.getStorageSync('token');
      var that = this;
      console.log(token);
      wx.request({
        url: 'http://120.78.1.231:8084/api/tags/all',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            console.log('数据获取成功:', res.data);
            that.data.current = res.data.tags.map(function (tag) {
              return { value: tag.id.toString() };
            });
            that.data.choose = res.data.tags.map(function (tag) {
              return { label: tag.name, value: tag.id.toString() };
            });
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    onVisibleChange: function onVisibleChange() {
      this.data.visible = !this.data.visible;
      if (this.data.visible === false) {
        this.onCancelSelect();
      }
    },
    handlePopup: function handlePopup(e) {
      this.onVisibleChange();
    },
    handleGroupChange: function handleGroupChange(event) {
      var value = event.target.value;
      if (value.length > 3) {
        this.showWarningToast('您选择的类别数量\n已到达上限！');
      }
      this.data.current = event.target.value;
    },
    onCancelSelect: function onCancelSelect() {
      this.data.current = [];
      this.data.visible = false;
    },
    onConfirmSelect: function onConfirmSelect() {
      if (this.data.current.length > 3) {
        this.showWarningToast('您选择的类别数量\n已到达上限！');
      } else {
        var result = [];
        var current = this.data.current;
        var choose = this.data.choose;
        for (var i = 0; i < current.length; i++) {
          for (var j = 0; j < choose.length; j++) {
            if (current[i] === choose[j].value) {
              result.push(choose[j].label);
              break;
            }
          }
        }
        this.data.chosenTagName = result;
        var resultString = '（';
        for (var _i = 0; _i < this.data.chosenTagName.length; _i++) {
          resultString += this.data.chosenTagName[_i];
          if (_i !== this.data.chosenTagName.length - 1) {
            resultString += ', ';
          }
        }
        resultString += '）';
        this.data.showTagName = resultString;
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()(this.data.chosenTagName, result);
        this.data.visible = false;
        this.data.chosenTagId = this.data.current;
        this.data.current = [];
      }
    },
    showSuccessToast: function showSuccessToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_3_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'success',
        direction: 'column'
      });
    },
    handleAddVideo: function handleAddVideo(e) {
      this.VideoList.push({
        url: e.target.files[0].url,
        name: e.target.files[0].name,
        type: e.target.files[0].type
      });
    },
    handleRemoveVideo: function handleRemoveVideo(e) {
      this.VideoList.splice(e.target.index, 1);
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_3_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    onClassiPicker: function onClassiPicker() {
      this.data.ClassiVisible = true; // 显示选择器
    },
    onPickerClassiChange: function onPickerClassiChange(event) {
      this.data.ClassiValue = event.target.value; // 更新选择的值
      var item = this.data.Classis.find(function (option) {
        return option.value === event.target.value[0];
      });
      var labelFound = item ? item.label : '未找到对应的选项';
      this.data.ClassiText = labelFound;
    },
    onPickerClassiCancel: function onPickerClassiCancel() {
      this.data.ClassiVisible = false; // 取消时隐藏选择器
    },
    SubmitAudit: function SubmitAudit() {
      var token = wx.getStorageSync('token');
      var that = this;
      var now = new Date();
      var year = now.getFullYear();
      var month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
      var day = String(now.getDate()).padStart(2, '0');
      var hours = String(now.getHours()).padStart(2, '0');
      var minutes = String(now.getMinutes()).padStart(2, '0');
      var seconds = String(now.getSeconds()).padStart(2, '0');
      wx.request({
        url: 'http://120.78.1.231:8084/api/leader/register/need',
        method: 'POST',
        data: {
          title: this.NeedName,
          introduction: this.NeedIntro,
          post_time: year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds,
          resource: this.NeedResource,
          address: this.data.areaText,
          longitude: this.jd,
          latitude: this.wd,
          tags_id: this.data.chosenTagId.map(Number)
        },
        header: {
          'content-type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            console.log('新需求注册成功', res);
            var Mid = res.header.media_id || res.header.Media_id;
            var Nid = res.header.need_id || res.header.Need_id;
            console.log(that.originFiles);
            var uploadTasks = that.originFiles.filter(function (file) {
              return !file.type.includes('video');
            }).map(function (file, index) {
              var isFirstImage = index === 0 ? 1 : 0;
              return that.uploadFile(file.url, isFirstImage, Mid, Nid);
            });
            // 如果有视频，上传视频
            var videoFile = that.VideoList.find(function (file) {
              return file.type.includes('video');
            });
            if (videoFile) {
              that.uploadVideo(videoFile.url, Nid);
            }
            // 并发上传所有图片
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all(uploadTasks).then(function () {
              console.log('所有图片上传完成');
            }).catch(function (err) {
              console.error('上传图片过程中发生错误:', err);
            });
          } else {
            console.error('注册文本失败', res.data);
            // 处理登录失败的逻辑，例如显示错误信息
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
    },
    uploadVideo: function uploadVideo(filePath, ReturnID) {
      console.log(filePath);
      console.log('上传视频:', filePath);
      var that = this;
      var token = wx.getStorageSync('token');
      wx.uploadFile({
        url: 'http://120.78.1.231:8084/api/media/video/upload',
        filePath: filePath,
        name: 'video', // 后端接收文件的字段名
        formData: {
          type: 1,
          id: ReturnID,
          isModify: 0
        },
        header: {
          'content-type': 'multipart/form-data',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            console.log('上传视频成功', res);
            that.showSuccessToast('已完成');
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 800);
          } else {
            console.error('上传视频失败', res.data);
            // 处理上传失败的逻辑，例如显示错误信息
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
    },
    uploadFile: function uploadFile(fileObj, isCover, CoverID, ReturnID) {
      console.log('上传文件:', fileObj);
      var token = wx.getStorageSync('token');
      console.log(isCover);
      console.log(ReturnID);
      console.log(CoverID);
      if (isCover === 1) {
        wx.uploadFile({
          url: 'http://120.78.1.231:8084/api/media/modify/image',
          filePath: fileObj,
          name: 'image', // 后端接收文件的字段名
          formData: {
            type: 1,
            id: ReturnID,
            media_id: CoverID,
            isCover: 1
          },
          header: {
            'content-type': 'multipart/form-data',
            'token': '' + token
          },
          success: function success(res) {
            if (res.statusCode === 200) {
              console.log('上传封面成功', res);
            } else {
              console.error('上传封面失败', res.data);
              // 处理上传失败的逻辑，例如显示错误信息
            }
          },
          fail: function fail(error) {
            console.error('请求失败', error);
            // 处理请求失败的逻辑
          }
        });
        return;
      }
      wx.uploadFile({
        url: 'http://120.78.1.231:8084/api/upload/image',
        filePath: fileObj,
        name: 'img', // 后端接收文件的字段名
        formData: {
          type: 1,
          id: ReturnID,
          isCover: 0
        },
        header: {
          'content-type': 'multipart/form-data',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            console.log('上传图片成功', res);
          } else {
            console.error('上传图片失败', res.data);
            // 处理上传失败的逻辑，例如显示错误信息
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
    },
    changeName: function changeName(e) {
      this.NeedName = e.target.value;
    },
    changeIntro: function changeIntro(e) {
      this.NeedIntro = e.target.value;
    },
    changeLocation: function changeLocation(e) {
      this.NeedLocation = e.target.value;
    },
    changeResource: function changeResource(e) {
      this.NeedResource = e.target.value;
    },
    handleSuccess: function handleSuccess(e) {
      console.log('success');
      console.log(this.originFiles);
    },
    handleRemove: function handleRemove(e) {
      this.originFiles.splice(e.target.index, 1);
    },
    handleClick: function handleClick(e) {
      console.log('click');
      console.log(e);
      console.log(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(e, null, 2));
      console.log(e.currentTarget);
    },
    handleAdd: function handleAdd(e) {
      console.log('add');
      console.log(e);
      console.log(e.target.files[0]);
      this.originFiles.push({
        url: e.target.files[0].url,
        name: e.target.files[0].name,
        type: e.target.files[0].type
      });
    }
  }
});

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('t-row', {
    attrs: {
      "mpcomid": '0'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "10%",
      "font-size": "18px",
      "font-weight": "bold",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        发布需求\n      ")])], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        需求名称\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.NeedName,
      "borderless": true,
      "placeholder": "请输入新需求名称",
      "eventid": '0',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.changeName
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        需求简介\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.NeedIntro,
      "borderless": true,
      "placeholder": "请输入新需求简介",
      "maxlength": "200",
      "eventid": '1',
      "mpcomid": '4'
    },
    on: {
      "change": _vm.changeIntro
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '5'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        需求资源\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.NeedResource,
      "borderless": true,
      "placeholder": "请输入新需求资源",
      "maxlength": "80",
      "eventid": '2',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.changeResource
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "padding-left": "7%",
      "font-size": "16px",
      "margin-top": "6%"
    },
    attrs: {
      "mpcomid": '12'
    }
  }, [_c('t-cell', {
    attrs: {
      "title": "需求地址",
      "arrow": "",
      "hover": "",
      "note": _vm.data.areaText,
      "eventid": '3',
      "mpcomid": '7'
    },
    on: {
      "click": _vm.onAreaPicker
    }
  }), _vm._v(" "), _c('t-picker', {
    attrs: {
      "visible": _vm.data.areaVisible,
      "value": _vm.data.areaValue,
      "title": _vm.title,
      "cancelBtn": _vm.cancelBtn,
      "confirmBtn": _vm.confirmBtn,
      "usingCustomNavbar": "",
      "eventid": '4',
      "mpcomid": '11'
    },
    on: {
      "change": _vm.onPickerChange,
      "pick": _vm.onColumnChange,
      "cancel": _vm.onPickerCancel
    }
  }, [_c('t-picker-item', {
    attrs: {
      "options": _vm.data.provinces,
      "mpcomid": '8'
    }
  }), _vm._v(" "), _c('t-picker-item', {
    attrs: {
      "options": _vm.data.cities,
      "mpcomid": '9'
    }
  }), _vm._v(" "), _c('t-picker-item', {
    attrs: {
      "options": _vm.data.counties,
      "mpcomid": '10'
    }
  })], 1)], 1), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "align-items": "center"
    },
    attrs: {
      "mpcomid": '14'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        需求类别\n      ")]), _vm._v(" "), _c('t-button', {
    staticStyle: {
      "margin-right": "5%",
      "margin-left": "3%",
      "display": "inline-block",
      "margin-top": "6%"
    },
    attrs: {
      "size": "medium",
      "theme": "danger",
      "eventid": '5',
      "mpcomid": '13'
    },
    on: {
      "click": function($event) {
        _vm.handlePopup()
      }
    }
  }, [_vm._v("请选择")])], 1), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "align-items": "center"
    },
    attrs: {
      "mpcomid": '15'
    }
  }, [_c('p', {
    staticClass: "_p data-v-c3ea31fe",
    staticStyle: {
      "padding-left": "13%",
      "font-size": "14px",
      "margin-top": "3%"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.data.showTagName) + "\n    ")])], 1), _vm._v(" "), _c('t-popup', {
    staticStyle: {
      "height": "620rpx"
    },
    attrs: {
      "visible": _vm.data.visible,
      "bind:visible-change": "onVisibleChange",
      "placement": "bottom",
      "mpcomid": '17'
    }
  }, [_c('view', {
    staticClass: "block"
  }, [_c('view', {
    staticClass: "header"
  }, [_c('view', {
    staticClass: "btn btn--cancel",
    attrs: {
      "aria-role": "button",
      "eventid": '6'
    },
    on: {
      "tap": _vm.onCancelSelect
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('view', {
    staticClass: "title"
  }, [_vm._v("类别选择")]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '7'
    },
    on: {
      "tap": _vm.onConfirmSelect
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('scroll-view', {
    staticStyle: {
      "height": "600rpx"
    },
    attrs: {
      "scroll-y": "true"
    }
  }, [_c('t-checkbox-group', {
    staticStyle: {
      "height": "500rpx"
    },
    attrs: {
      "value": _vm.data.current,
      "options": _vm.data.choose,
      "eventid": '8',
      "mpcomid": '16'
    },
    on: {
      "change": _vm.handleGroupChange
    }
  })], 1)], 1)]), _vm._v(" "), _c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      上传图片 (最多6张)（第一张为封面）\n    ")]), _vm._v(" "), _c('view', {
    staticClass: "wrapper",
    staticStyle: {
      "margin-left": "8%",
      "margin-right": "8%",
      "margin-top": "5%",
      "padding-left": "3%"
    }
  }, [_c('t-upload', {
    attrs: {
      "media-type": ['image'],
      "max": 6,
      "files": _vm.originFiles,
      "gridConfig": _vm.gridConfig,
      "eventid": '9',
      "mpcomid": '18'
    },
    on: {
      "add": _vm.handleAdd,
      "remove": _vm.handleRemove
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      上传视频\n    ")]), _vm._v(" "), _c('view', {
    staticClass: "wrapper",
    staticStyle: {
      "margin-left": "8%",
      "margin-right": "8%",
      "margin-top": "5%",
      "padding-left": "3%"
    }
  }, [_c('t-upload', {
    attrs: {
      "mediaType": ['video'],
      "max": 1,
      "files": _vm.VideoList,
      "eventid": '10',
      "mpcomid": '19'
    },
    on: {
      "add": _vm.handleAddVideo,
      "remove": _vm.handleRemoveVideo
    }
  })], 1), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "margin-top": "4%"
    },
    attrs: {
      "mpcomid": '20'
    }
  }, [_c('button', {
    staticClass: "red-button",
    attrs: {
      "eventid": '11'
    },
    on: {
      "click": _vm.SubmitAudit
    }
  }, [_vm._v("提交审核")])], 1), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '21'
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c3ea31fe", esExports)
  }
}

/***/ })

},[250]);
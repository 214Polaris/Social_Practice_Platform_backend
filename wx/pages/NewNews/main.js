require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([28],{

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(258);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_66997e44_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(261);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(259)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_66997e44_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\NewNews\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66997e44", Component.options)
  } else {
    hotAPI.reload("data-v-66997e44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 259:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__ = __webpack_require__(3);

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
      title: '',
      position: '',
      originFiles: [],
      VideoFiles: [],
      text: '',
      project_id: 1,
      product: {
        value: 1,
        options: [{
          value: 1,
          label: '科普进村小'
        }, {
          value: 2,
          label: '最新产品'
        }, {
          value: 3,
          label: '最火产品'
        }]
      }
    };
  },
  mounted: function mounted() {
    this.fetchShowData();
  },

  methods: {
    onChange: function onChange(e) {
      this.product.value = e.target.value;
      //console.log('选择需求', this.product.value);
      this.project_id = this.product.value;
    },
    changePosition: function changePosition(e) {
      this.position = e.target.value;
    },
    uploadFile: function uploadFile(fileObj, isCover, CoverID, ReturnID) {
      //console.log('上传文件:', fileObj);
      var token = wx.getStorageSync('token');
      //console.log(isCover);
      //console.log(ReturnID);
      //console.log(CoverID);
      if (isCover === 1) {
        wx.uploadFile({
          url: 'http://120.78.1.231:8084/api/media/modify/image',
          filePath: fileObj,
          name: 'image',
          formData: {
            type: 2,
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
              //console.log('上传封面成功', res);
            } else {
              console.error('上传封面失败', res.data);
            }
          },
          fail: function fail(error) {
            console.error('请求失败', error);
          }
        });
        return;
      }
      wx.uploadFile({
        url: 'http://120.78.1.231:8084/api/upload/image',
        filePath: fileObj,
        name: 'img',
        formData: {
          type: 2,
          id: ReturnID,
          isCover: 0
        },
        header: {
          'content-type': 'multipart/form-data',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('上传图片成功', res);
          } else {
            console.error('上传图片失败', res.data);
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
        }
      });
    },
    Agree: function Agree() {
      //console.log('111');
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/res/post',
        method: 'POST',
        data: {
          title: this.title,
          introduction: this.text,
          position: this.position,
          project_id: this.project_id
        },
        header: {
          'content-type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('发布成果成功', res);
            var Mid = res.data.media_id || res.data.Media_id;
            var id = res.data.id || res.data.Id;
            //console.log('新成果ID:', id);
            //console.log(that.originFiles);
            var uploadTasks = that.originFiles.filter(function (file) {
              return !file.type.includes('video');
            }).map(function (file, index) {
              var isFirstImage = index === 0 ? 1 : 0;
              return that.uploadFile(file.url, isFirstImage, Mid, id);
            });
            // 如果有视频，上传视频
            var videoFile = that.VideoFiles.find(function (file) {
              return file.type.includes('video');
            });
            if (videoFile) {
              uploadTasks.push(that.uploadVideo(videoFile.url, id));
            }
            // 并发上传所有图片
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all(uploadTasks).then(function () {
              that.showSuccessToast('发布成功！');
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                });
              }, 800);
            }).catch(function (err) {
              console.error('上传图片过程中发生错误:', err);
            });
          } else {
            console.error('发布成果失败', res.data);
            // 处理登录失败的逻辑，例如显示错误信息
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
    },
    showSuccessToast: function showSuccessToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'success',
        direction: 'column'
      });
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    uploadVideo: function uploadVideo(filePath, ReturnID) {
      //console.log(filePath);
      //console.log('上传视频:', filePath);
      var that = this;
      var token = wx.getStorageSync('token');
      wx.uploadFile({
        url: 'http://120.78.1.231:8084/api/media/video/upload',
        filePath: filePath,
        name: 'video', // 后端接收文件的字段名
        formData: {
          type: 2,
          id: ReturnID,
          isModify: 0
        },
        header: {
          'content-type': 'multipart/form-data',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('上传视频成功', res);
            that.showSuccessToast('已完成');
          } else {
            console.error('上传视频失败', res.data);
            // 处理上传失败的逻辑，例如显示错误信息
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
        }
      });
    },
    onTextChange: function onTextChange(e) {
      this.text = e.target.value;
    },
    changeTitle: function changeTitle(e) {
      this.title = e.target.value;
    },
    handleSuccess: function handleSuccess(e) {
      //console.log('success');
      //console.log(this.originFiles);
    },
    handleRemove: function handleRemove(e) {
      this.originFiles.splice(e.target.index, 1);
    },
    handleAdd: function handleAdd(e) {
      //console.log(e.target.files[0]);
      this.originFiles.push({
        url: e.target.files[0].url,
        name: e.target.files[0].name,
        type: e.target.files[0].type
      });
    },
    handleAddVideo: function handleAddVideo(e) {
      var file = e.target.files[0];
      this.VideoFiles.push({
        url: file.url,
        name: file.name,
        type: file.type
      });
      //console.log(this.VideoFiles);
    },
    handleRemoveVideo: function handleRemoveVideo(e) {
      this.VideoFiles.splice(e.target.index, 1);
    },
    fetchShowData: function fetchShowData() {
      var token = wx.getStorageSync('token');
      var that = this;
      //console.log(token);
      wx.request({
        url: 'http://120.78.1.231:8084/api/need/team_paired',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            that.product = {
              value: 1,
              options: res.data.map(function (need) {
                return { value: need.needID, label: need.needName };
              })
            };
            //console.log(that.product);
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    }
  }
});

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('t-row', {
    attrs: {
      "mpcomid": '2'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      请选择需求：\n    ")]), _vm._v(" "), _c('t-dropdown-menu', {
    staticStyle: {
      "margin-top": "10rpx"
    },
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('t-dropdown-item', {
    attrs: {
      "options": _vm.product.options,
      "value": _vm.product.value,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "change": _vm.onChange
    }
  })], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        标题\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.title,
      "borderless": true,
      "placeholder": "请输入标题",
      "eventid": '1',
      "mpcomid": '4'
    },
    on: {
      "change": _vm.changeTitle
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
      "mpcomid": '5'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        文本\n      ")])], 1), _vm._v(" "), _c('t-textarea', {
    staticStyle: {
      "padding-left": "11%",
      "padding-right": "11%"
    },
    attrs: {
      "t-class": "external-class",
      "placeholder": "请输入成果文本",
      "disableDefaultPadding": true,
      "indicator": "",
      "value": _vm.text,
      "eventid": '2',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.onTextChange
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
      "mpcomid": '7'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n        地点\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.position,
      "borderless": true,
      "placeholder": "请输入地点",
      "eventid": '3',
      "mpcomid": '8'
    },
    on: {
      "change": _vm.changePosition
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  }), _vm._v(" "), _c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      上传图片（最多6张）（第一张为封面）\n    ")]), _vm._v(" "), _c('view', {
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
      "eventid": '4',
      "mpcomid": '9'
    },
    on: {
      "add": _vm.handleAdd,
      "remove": _vm.handleRemove
    }
  })], 1), _vm._v(" "), _c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      视频\n    ")]), _vm._v(" "), _c('view', {
    staticClass: "wrapper",
    staticStyle: {
      "margin-left": "8%",
      "margin-right": "8%",
      "margin-top": "5%",
      "padding-left": "3%"
    }
  }, [_c('t-upload', {
    attrs: {
      "media-type": ['video'],
      "max": 1,
      "files": _vm.VideoFiles,
      "eventid": '5',
      "mpcomid": '10'
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
      "mpcomid": '11'
    }
  }, [_c('button', {
    staticClass: "red-button",
    attrs: {
      "eventid": '6'
    },
    on: {
      "click": _vm.Agree
    }
  }, [_vm._v("提交审核")])], 1), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '12'
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
     require("vue-hot-reload-api").rerender("data-v-66997e44", esExports)
  }
}

/***/ })

},[257]);
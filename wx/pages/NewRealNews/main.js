require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([27],{

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(263);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d6233bc8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(266);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d6233bc8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\NewRealNews\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6233bc8", Component.options)
  } else {
    hotAPI.reload("data-v-d6233bc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 264:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__ = __webpack_require__(3);
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
      project_id: 1,
      text: '',
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
    Agree: function Agree() {
      //console.log('111');
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/res/report',
        method: 'POST',
        data: {
          title: this.title,
          link: this.text,
          need_id: String(this.project_id)
        },
        header: {
          'content-type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            that.showSuccessToast('发布成功');
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 800);
          } else {
            that.showWarningToast(res.data);
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
      Object(__WEBPACK_IMPORTED_MODULE_0_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'success',
        direction: 'column'
      });
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_0_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    changeTitle: function changeTitle(e) {
      this.title = e.target.value;
    },
    onTextChange: function onTextChange(e) {
      this.text = e.target.value;
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
            that.project_id = that.product.options[0].value;
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

/***/ 266:
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
  }, [_vm._v("\n        链接\n      ")])], 1), _vm._v(" "), _c('t-input', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "1%"
    },
    attrs: {
      "value": _vm.text,
      "borderless": true,
      "placeholder": "请输入报道链接",
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
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "margin-top": "4%"
    },
    attrs: {
      "mpcomid": '7'
    }
  }, [_c('button', {
    staticClass: "red-button",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": _vm.Agree
    }
  }, [_vm._v("发布")])], 1), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '8'
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
     require("vue-hot-reload-api").rerender("data-v-d6233bc8", esExports)
  }
}

/***/ })

},[262]);
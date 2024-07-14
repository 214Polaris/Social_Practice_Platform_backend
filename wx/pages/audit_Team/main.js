require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([23],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(124);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_60a7a1a8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(127);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_60a7a1a8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\audit_Team\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60a7a1a8", Component.options)
  } else {
    hotAPI.reload("data-v-60a7a1a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 125:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 126:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      value: '',
      visible: false,
      showIndex: false,
      closeBtn: false,
      deleteBtn: false,
      images: [],
      ExplainVisible: false,
      noAgreeValue: '',
      NeedID: 0,
      ComName: '',
      show: {
        id: 1,
        name: '科普进村小',
        intro: '简介简介简介',
        belong: 'xx社区',
        text: '资源资源资源',
        current: 0, // 只是初始化时会锁定在哪个页面而已！
        imageCurrent: 0, // 自定义
        swiperList: ['https://tdesign.gtimg.com/mobile/demos/swiper1.png', 'https://tdesign.gtimg.com/mobile/demos/swiper2.png', 'https://tdesign.gtimg.com/mobile/demos/swiper1.png', 'https://tdesign.gtimg.com/mobile/demos/swiper2.png', 'https://tdesign.gtimg.com/mobile/demos/swiper1.png']
      }
    };
  },
  onLoad: function onLoad(options) {
    //console.log(options.Needid);
    this.fetchShowData(options.Needid); // 根据options.Name去找对应的show中的数据后端接口！
    this.NeedID = options.Needid;
    this.ComName = options.ComName;
    //console.log('所属社区', this.ComName);
  },

  methods: {
    onChange: function onChange(e) {
      // //console.log('change')
      // //console.log(e.target.current)
      this.show.imageCurrent = e.target.current;
      //console.log(this.show.imageCurrent);
    },
    Agree: function Agree() {
      // 调用后端审核成功接口！
      var that = this;
      var token = wx.getStorageSync('token');
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/result',
        method: 'POST',
        data: {
          audit_id: this.NeedID,
          type: 1,
          is_pass: 1,
          reason: null,
          id: this.show.team_number
        },
        header: {
          'content-type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            that.showSuccessToast('操作成功！');
            that.ExplainVisible = false;
          }
        }
      });
    },
    noAgree: function noAgree() {
      this.ExplainVisible = true;
    },
    cancelExplain: function cancelExplain() {
      this.ExplainVisible = false;
    },
    confirmExplain: function confirmExplain() {
      if (this.noAgreeValue === '') {
        this.showWarningToast('说明不能为空');
        return;
      }
      var that = this;
      var token = wx.getStorageSync('token');
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/result',
        method: 'POST',
        data: {
          audit_id: this.NeedID,
          type: 2,
          is_pass: 0,
          reason: this.noAgreeValue,
          id: this.show.team_number
        },
        header: {
          'content-type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            that.showSuccessToast('操作成功！');
            that.ExplainVisible = false;
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/to_audit/main'
              });
            }, 800); // 等待0.8s
          }
        }
      });
    },
    changeHandle: function changeHandle(e) {
      this.noAgreeValue = e.target.value;
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
    onClose: function onClose() {
      this.visible = false;
    },
    fetchShowData: function fetchShowData(Needid) {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/detail?audit_id=' + parseInt(Needid, 10) + '&type=2',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            that.show = res.data;
            that.show.belong = that.ComName;
          } else {
            console.error('请求成功但数据获取失败:', res);
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

/***/ 127:
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
  }, [_vm._v("\n      " + _vm._s(_vm.show.team_name) + "\n    ")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%",
      "font-weight": "bold"
    }
  }, [_vm._v("\n      队伍简介\n    ")])], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '2'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.show.introduction) + "\n    ")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%",
      "font-weight": "bold"
    }
  }, [_vm._v("\n      所属学院\n    ")])], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '4'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "12%",
      "font-size": "13px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.show.academy) + "\n    ")])], 1), _vm._v(" "), _c('div', {
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
      "margin-top": "6%",
      "font-weight": "bold"
    }
  }, [_vm._v("\n    地点\n  ")]), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '5'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "6%",
      "font-size": "13px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.show.address) + "\n    ")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '6'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "11%",
      "font-size": "14px",
      "margin-top": "6%",
      "font-weight": "bold"
    }
  }, [_vm._v("\n      指导老师\n    ")])], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '7'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "12%",
      "padding-right": "6%",
      "font-size": "13px",
      "margin-top": "6%"
    }
  }, [_vm._v("\n      " + _vm._s(_vm.show.teacher) + "\n    ")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "12%",
      "margin-right": "6%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "2%"
    }
  }), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '8'
    }
  }), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "padding": "6%"
    },
    attrs: {
      "mpcomid": '11'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "12",
      "mpcomid": '9'
    }
  }, [_c('button', {
    staticClass: "red-button",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.noAgree
    }
  }, [_vm._v("不通过")])], 1), _vm._v(" "), _c('t-col', {
    attrs: {
      "span": "12",
      "mpcomid": '10'
    }
  }, [_c('button', {
    staticClass: "red-button",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.Agree
    }
  }, [_vm._v("通过审核")])], 1)], 1), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.ExplainVisible,
      "placement": "bottom",
      "mpcomid": '15'
    }
  }, [_c('view', {
    staticClass: "block"
  }, [_c('view', {
    staticClass: "header"
  }, [_c('view', {
    staticClass: "btn btn--cancel",
    attrs: {
      "aria-role": "button",
      "eventid": '2'
    },
    on: {
      "click": _vm.cancelExplain
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('view', {
    staticClass: "title"
  }, [_vm._v("填写审核不通过说明")]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '3'
    },
    on: {
      "click": _vm.confirmExplain
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '14'
    }
  }, [_c('t-input', {
    staticStyle: {
      "padding": "5%"
    },
    attrs: {
      "value": _vm.noAgreeValue,
      "placeholder": "请输入说明",
      "eventid": '4',
      "mpcomid": '13'
    },
    on: {
      "change": _vm.changeHandle
    }
  })], 1)], 1)])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60a7a1a8", esExports)
  }
}

/***/ })

},[123]);
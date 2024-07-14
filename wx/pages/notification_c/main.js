require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([8],{

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(268);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_25eb775a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(271);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(269)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-25eb775a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_25eb775a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\notification_c\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25eb775a", Component.options)
  } else {
    hotAPI.reload("data-v-25eb775a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 269:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
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
//
//
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
      message: [],
      NoPassReason: '',
      NoPassVisible: false
    };
  },
  mounted: function mounted() {
    this.loadNotice();
  },

  methods: {
    showSuccessToast: function showSuccessToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'success',
        direction: 'column'
      });
    },
    loadNotice: function loadNotice() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/community/get_audit_list',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('消息通知获取成功', res.data);
            that.message = res.data.message.map(function (msg, index) {
              var cleanedBase64String = msg.img.replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, msg, { mID: index + 1, img: finalBase64String });
            });
            //console.log(that.message);
          } else {
            console.error('请求成功但数据获取失败:', res);
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    onClick: function onClick(mID, type) {
      //console.log('点击', mID, type);
      if (type === 2 || type === 4 || type === 6) {
        // //console.log(this.message[mID].reason)
        this.NoPassReason = this.message[mID].reason;
        this.NoPassVisible = true;
      } else if (type === 7) {
        //console.log('跳转队伍主页');
      }
    },
    confirmNoPass: function confirmNoPass() {
      this.NoPassVisible = false;
    },
    JumpToChange: function JumpToChange() {
      //console.log('跳转');
    },
    acceptMatch: function acceptMatch(mid) {
      var token = wx.getStorageSync('token');
      var that = this;
      //console.log('接受', mid);
      //console.log(this.message[mid - 1].audit_id);
      wx.request({
        url: 'http://120.78.1.231:8084/api/community/audit/project',
        method: 'POST',
        data: {
          audit_id: this.message[mid - 1].audit_id,
          is_pass: 1
        },
        header: {
          'content-type': 'application/json', // 不能用application/json了！！！
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            that.loadNotice();
            that.showSuccessToast('操作成功！');
          }
        }
      });
    },
    rejectMatch: function rejectMatch(mid) {
      //console.log('拒绝', mid);
      var token = wx.getStorageSync('token');
      var that = this;
      //console.log(this.message);
      //console.log(this.message[mid - 1].audit_id);
      wx.request({
        url: 'http://120.78.1.231:8084/api/community/audit/project',
        method: 'POST',
        data: {
          audit_id: this.message[mid - 1].audit_id,
          is_pass: 0
        },
        header: {
          'content-type': 'application/json', // 不能用application/json了！！！
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            that.loadNotice();
          }
        }
      });
    },
    jumpToTeam: function jumpToTeam(mID) {
      //console.log('跳转队伍', mID);
    }
  }
});

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._l((_vm.message), function(msg, index) {
    return _c('div', {
      key: msg.mID,
      staticClass: "noti-container"
    }, [_c('t-row', {
      staticStyle: {
        "display": "flex",
        "align-items": "center"
      },
      attrs: {
        "mpcomid": '2_' + index
      }
    }, [_c('t-col', {
      staticStyle: {
        "margin-left": "5%"
      },
      attrs: {
        "span": "4",
        "mpcomid": '0_' + index
      }
    }, [(msg.type != 7) ? _c('p', [_c('img', {
      staticStyle: {
        "width": "40px",
        "height": "36px"
      },
      attrs: {
        "src": "/static/images/通知.svg"
      }
    })]) : _vm._e(), _vm._v(" "), (msg.type == 7) ? _c('p', [_c('img', {
      staticStyle: {
        "width": "40px",
        "height": "36px"
      },
      attrs: {
        "src": "/static/images/结对帮扶.svg"
      }
    })]) : _vm._e()], 1), _vm._v(" "), _c('t-col', {
      attrs: {
        "span": "20",
        "mpcomid": '1_' + index
      }
    }, [(msg.type != 7) ? _c('p', {
      staticStyle: {
        "padding-left": "1%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n          审核结果通知\n        ")]) : _vm._e(), _vm._v(" "), (msg.type == 7) ? _c('p', {
      staticStyle: {
        "padding-left": "1%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n           结对通知\n        ")]) : _vm._e(), _vm._v(" "), _c('p', {
      staticStyle: {
        "color": "#a8a6a6",
        "padding-left": "1%",
        "font-size": "12px"
      }
    }, [_vm._v("\n          " + _vm._s(msg.time) + "\n        ")])], 1)], 1), _vm._v(" "), _c('t-row', {
      staticStyle: {
        "padding-right": "8%"
      },
      attrs: {
        "mpcomid": '4_' + index
      }
    }, [(msg.type == 1) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您注册/修改的社区信息已经通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 2) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您注册/修改的社区信息未通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 3) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您发布的需求信息已经通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 4) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您发布的需求信息未通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 5) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您修改的需求信息已经通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 6) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_vm._v("\n        您修改的需求信息未通过审核\n      ")]) : _vm._e(), _vm._v(" "), (msg.type == 7) ? _c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "3%"
      }
    }, [_c('t-link', {
      staticStyle: {
        "color": "#bd1b06"
      },
      attrs: {
        "size": "large",
        "prefixIcon": "flag",
        "hover": "",
        "content": msg.TeamName,
        "eventid": '0_' + index,
        "mpcomid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.jumpToTeam(msg.mID)
        }
      }
    }), _vm._v("\n        该队伍向您发起了结对邀请\n      ")], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "detailShow",
      staticStyle: {
        "padding": "2%",
        "margin-left": "22%",
        "margin-bottom": "2%",
        "margin-top": "5%",
        "margin-right": "10%"
      },
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.onClick(msg.mID, msg.type)
        }
      }
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '8_' + index
      }
    }, [_c('t-col', {
      attrs: {
        "span": "4",
        "mpcomid": '6_' + index
      }
    }, [_c('t-image', {
      attrs: {
        "src": msg.img,
        "mode": "aspectFill",
        "width": "36",
        "height": "36",
        "mpcomid": '5_' + index
      }
    })], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "20",
        "mpcomid": '7_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "6%",
        "font-size": "14px",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n            " + _vm._s(msg.Name) + "\n          ")])], 1)], 1)], 1), _vm._v(" "), (msg.type == 7) ? _c('div', [_c('t-row', {
      staticStyle: {
        "padding-left": "17%",
        "padding-right": "10%",
        "margin-top": "3%"
      },
      attrs: {
        "mpcomid": '13_' + index
      }
    }, [_c('t-col', {
      staticStyle: {
        "text-align": "center"
      },
      attrs: {
        "span": "12",
        "mpcomid": '10_' + index
      }
    }, [_c('t-button', {
      staticStyle: {
        "margin-right": "5%",
        "margin-left": "3%",
        "display": "inline-block"
      },
      attrs: {
        "size": "large",
        "theme": "danger",
        "eventid": '2_' + index,
        "mpcomid": '9_' + index
      },
      on: {
        "click": function($event) {
          _vm.acceptMatch(msg.mID)
        }
      }
    }, [_vm._v("接受")])], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "text-align": "center"
      },
      attrs: {
        "span": "12",
        "mpcomid": '12_' + index
      }
    }, [_c('t-button', {
      staticStyle: {
        "margin-right": "3%",
        "display": "inline-block"
      },
      attrs: {
        "size": "large",
        "theme": "danger",
        "eventid": '3_' + index,
        "mpcomid": '11_' + index
      },
      on: {
        "click": function($event) {
          _vm.rejectMatch(msg.mID)
        }
      }
    }, [_vm._v("拒绝")])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _c('div', {
      staticStyle: {
        "margin-left": "18%",
        "margin-right": "10%",
        "border-bottom": "1px solid #f2f2f2",
        "margin-bottom": "2%",
        "margin-top": "4%"
      }
    })], 1)
  }), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.NoPassVisible,
      "placement": "center",
      "mpcomid": '16'
    }
  }, [_c('view', {
    staticClass: ".block-center"
  }, [_c('p', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "bold",
      "margin-bottom": "5%"
    }
  }, [_vm._v("审核不成功原因")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "16px"
    }
  }, [_vm._v(_vm._s(_vm.NoPassReason))]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "10%"
    }
  }, [_c('t-button', {
    staticStyle: {
      "margin-right": "5%",
      "margin-left": "3%"
    },
    attrs: {
      "size": "large",
      "theme": "danger",
      "eventid": '4',
      "mpcomid": '14'
    },
    on: {
      "click": _vm.confirmNoPass
    }
  }, [_vm._v("我知道了")]), _vm._v(" "), _c('t-button', {
    staticStyle: {
      "margin-right": "3%"
    },
    attrs: {
      "size": "large",
      "theme": "danger",
      "eventid": '5',
      "mpcomid": '15'
    },
    on: {
      "click": _vm.JumpToChange
    }
  }, [_vm._v("去修改")])], 1)], 1)]), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '17'
    }
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-25eb775a", esExports)
  }
}

/***/ })

},[267]);
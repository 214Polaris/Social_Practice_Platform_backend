require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([6],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(283);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_61e3c062_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(286);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(284)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-61e3c062"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_61e3c062_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\to_audit\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61e3c062", Component.options)
  } else {
    hotAPI.reload("data-v-61e3c062", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 284:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      ComList: [],
      FruitList: [],
      TeamList: [],
      NeedList: [],
      Now: '社区信息',
      auditList: []
    };
  },
  mounted: function mounted() {
    this.fetchCom();
    this.fetchFruit();
    this.fetchNeed();
    this.fetchTeam();
  },

  methods: {
    onTabsClick: function onTabsClick(event) {
      var target = event.mp._relatedInfo.anchorTargetText;
      //console.log('点击', target);
      this.Now = target;
      if (target === '社区信息') {
        this.auditList = this.ComList;
      } else if (target === '社区需求') {
        this.auditList = this.NeedList;
      } else if (target === '院系队伍') {
        this.auditList = this.TeamList;
        //console.log(this.auditList);
      } else {
        this.auditList = this.FruitList;
      }
    },
    OnClick: function OnClick(auditId) {
      var audit = this.auditList.find(function (item) {
        return item.audit_id === auditId;
      });
      //console.log(audit);
      //console.log(audit.community_name);
      if (this.Now === '社区需求') {
        wx.navigateTo({
          url: '/pages/audit_community_need/main?Needid=' + audit.audit_id + '&ComName=' + audit.community_name
        });
      } else if (this.Now === '社区信息') {
        wx.navigateTo({
          url: '/pages/audit_Com/main?Needid=' + audit.audit_id
        });
      } else if (this.Now === '需求成果') {
        wx.navigateTo({
          url: '/pages/audit_Fruit/main?Needid=' + audit.audit_id
        });
      } else if (this.Now === '院系队伍') {
        wx.navigateTo({
          url: '/pages/audit_Team/main?Needid=' + audit.audit_id
        });
      }
      // wx.navigateTo({
      //   url: '/pages/audit_community_need/main?Name=' + audit.name
      // })
    },
    fetchCom: function fetchCom() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/community',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('社区信息获取成功', res.data);
            that.ComList = res.data.map(function (item) {
              var cleanedBase64String = item.img.replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item, {
                img: finalBase64String
              });
            });
            //console.log(that.ComList);
            that.auditList = that.ComList;
          } else {
            console.error('请求成功但数据获取失败:', res);
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    fetchFruit: function fetchFruit() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/fruit',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('成果信息获取成功', res.data);
            that.FruitList = res.data.map(function (item) {
              var cleanedBase64String = item.img.replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item, {
                img: finalBase64String,
                name: item.title
              });
            });
            //console.log(that.ComList);
          } else {
            console.error('请求成功但数据获取失败:', res);
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    fetchTeam: function fetchTeam() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/team',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('队伍信息获取成功', res.data);
            that.TeamList = res.data.map(function (item) {
              var cleanedBase64String = item.img.replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item, {
                img: finalBase64String,
                label: item.academy_name,
                name: item.team_name
              });
            });
            //console.log(that.TeamList);
            // that.auditList = that.ComList
          } else {
            console.error('请求成功但数据获取失败:', res);
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    fetchNeed: function fetchNeed() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/audit/need',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('需求信息获取成功', res.data);
            that.NeedList = Array.isArray(res.data) ? res.data.map(function (item) {
              var cleanedBase64String = item.img.replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item, {
                img: finalBase64String,
                name: item.title,
                label: item.community_name
              });
            }) : [];
            //console.log(that.NeedList);
            // that.auditList = that.ComList
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

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: {
      "padding-left": "3%",
      "padding-right": "3%"
    }
  }, [_c('t-tabs', {
    attrs: {
      "defaultValue": 0,
      "eventid": '0',
      "mpcomid": '4'
    },
    on: {
      "change": _vm.onTabsChange,
      "click": _vm.onTabsClick
    }
  }, [_c('t-tab-panel', {
    attrs: {
      "label": "社区信息",
      "value": "1",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('t-tab-panel', {
    attrs: {
      "label": "社区需求",
      "value": "2",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('t-tab-panel', {
    attrs: {
      "label": "院系队伍",
      "value": "3",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('t-tab-panel', {
    attrs: {
      "label": "需求成果",
      "value": "4",
      "mpcomid": '3'
    }
  })], 1)], 1), _vm._v(" "), _vm._l((_vm.auditList), function(audit, index) {
    return _c('div', {
      key: audit.audit_id,
      staticClass: "audit",
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.OnClick(audit.audit_id)
        }
      }
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '9_' + index
      }
    }, [_c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "4",
        "mpcomid": '6_' + index
      }
    }, [_c('t-image', {
      attrs: {
        "src": audit.img,
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
        "mpcomid": '8_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "2%",
        "font-size": "14px",
        "margin-bottom": "2%",
        "font-weight": "bold"
      }
    }, [_vm._v("\n          " + _vm._s(audit.name) + "\n        ")]), _vm._v(" "), (audit.label) ? _c('div', {
      staticStyle: {
        "display": "flex",
        "margin-left": "2%",
        "align-items": "center",
        "margin-bottom": "2%"
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "museum-1",
        "size": "36rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '1_' + index,
        "mpcomid": '7_' + index
      },
      on: {
        "click": _vm.onIconTap
      }
    }), _vm._v(" "), _c('p', {
      staticStyle: {
        "color": "rgb(163, 159, 159)",
        "font-size": "12px",
        "padding-left": "1%"
      }
    }, [_vm._v("\n            " + _vm._s(audit.label) + "\n          ")])], 1) : _vm._e()], 1)], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "margin-left": "18%",
        "margin-right": "10%",
        "border-bottom": "1px solid #f2f2f2",
        "margin-bottom": "2%",
        "margin-top": "4%"
      }
    })], 1)
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61e3c062", esExports)
  }
}

/***/ })

},[282]);
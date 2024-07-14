require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([17],{

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(179);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_24fb79d7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(182);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(180)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-24fb79d7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_24fb79d7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\likeComment_c\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24fb79d7", Component.options)
  } else {
    hotAPI.reload("data-v-24fb79d7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 180:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 181:
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
//
//
//
//
//
//
//
//
//
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
      FirstTime: '',
      wholeOffset: 0,
      commentOffset: 0,
      Stop: false,
      likeOffset: 0,
      notifications: []
    };
  },
  mounted: function mounted() {
    this.fetchlcData();
  },
  onReachBottom: function onReachBottom() {
    //console.log('触底');
  },

  methods: {
    onReachBottom: function onReachBottom() {
      //console.log('触底');
      if (this.Stop) {
        return;
      }
      var that = this;
      var token = wx.getStorageSync('token');
      var thisOffset = 0;
      wx.request({
        url: 'http://120.78.1.231:8084/api/res/interaction?time=' + this.FirstTime + '&offset_cm=' + this.commentOffset + '&offset_kudos=' + this.likeOffset,
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            if (res.data.interaction_list.length === 0) {
              that.Stop = true;
            } else {
              that.notifications.push(res.data.interaction_list.map(function (not, index) {
                var cleanedBase64String = not.avatar.replace(/(\r\n|\n|\r)/gm, '');
                var st2 = not.fruit_cover.replace(/(\r\n|\n|\r)/gm, '');
                var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
                var fin2 = 'data:image/jpeg;base64,' + st2;
                if (not.comment_like) {
                  that.commentOffset += 1;
                } else {
                  that.likeOffset += 1;
                }
                thisOffset += 1;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, not, { mID: index + 1 + that.wholeOffset, avatar: finalBase64String, fruit_cover: fin2 });
              }));
              that.wholeOffset += thisOffset;
              //console.log(that.commentOffset, that.likeOffset, that.wholeOffset);
            }
          }
        },
        fail: function fail(error) {
          console.error('请求失败:', error);
        }
      });
    },
    fetchlcData: function fetchlcData() {
      var token = wx.getStorageSync('token');
      //console.log(token);
      var now = new Date();
      var year = now.getFullYear();
      var month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
      var day = String(now.getDate()).padStart(2, '0');
      var hours = String(now.getHours()).padStart(2, '0');
      var minutes = String(now.getMinutes()).padStart(2, '0');
      var seconds = String(now.getSeconds()).padStart(2, '0');
      var time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      var encodedTime = encodeURIComponent(time);
      this.FirstTime = encodedTime;
      var thisOffset = 0;
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/res/interaction?time=' + encodedTime + '&offset_cm=0&offset_kudos=0',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            if (res.data.interaction_list.length === 0) {
              that.Stop = true;
            } else {
              that.notifications = res.data.interaction_list.map(function (not, index) {
                var cleanedBase64String = not.avatar.replace(/(\r\n|\n|\r)/gm, '');
                var st2 = not.fruit_cover.replace(/(\r\n|\n|\r)/gm, '');
                var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
                var fin2 = 'data:image/jpeg;base64,' + st2;
                if (not.comment_like) {
                  that.commentOffset += 1;
                } else {
                  that.likeOffset += 1;
                }
                thisOffset += 1;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, not, { mID: index + 1 + that.wholeOffset, avatar: finalBase64String, fruit_cover: fin2 });
              });
              that.wholeOffset += thisOffset;
              //console.log(that.commentOffset, that.likeOffset, that.wholeOffset);
            }
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

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.notifications), function(item, index) {
    return _c('div', {
      key: item.id
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '5_' + index
      }
    }, [_c('t-col', {
      staticStyle: {
        "margin-left": "5%"
      },
      attrs: {
        "span": "4",
        "mpcomid": '1_' + index
      }
    }, [_c('t-avatar', {
      attrs: {
        "image": item.avatar,
        "mpcomid": '0_' + index
      }
    })], 1), _vm._v(" "), _c('t-col', {
      attrs: {
        "span": "20",
        "mpcomid": '4_' + index
      }
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '2_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "1%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n            " + _vm._s(item.user_name) + "\n          ")]), _vm._v(" "), (item.comment_like) ? _c('p', {
      staticStyle: {
        "color": "#c2bcbc",
        "padding-left": "2%",
        "font-size": "14px",
        "font-weight": "bold",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n            发表评论\n          ")]) : _c('p', {
      staticStyle: {
        "color": "#c2bcbc",
        "padding-left": "2%",
        "font-size": "14px",
        "font-weight": "bold",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n            点赞了\n          ")])], 1), _vm._v(" "), _c('t-row', {
      attrs: {
        "mpcomid": '3_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "color": "#d3d0d0",
        "padding-left": "1%",
        "font-size": "12px"
      }
    }, [_vm._v("\n            " + _vm._s(item.time) + "\n          ")])], 1)], 1)], 1), _vm._v(" "), (item.comment_like) ? _c('t-row', {
      attrs: {
        "mpcomid": '6_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "margin-left": "22%",
        "font-size": "15px",
        "font-weight": "bold",
        "margin-bottom": "2%",
        "margin-top": "2%"
      }
    }, [_vm._v("\n        " + _vm._s(item.comment_like) + "\n      ")])], 1) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "detailShow",
      staticStyle: {
        "padding": "2%",
        "margin-left": "22%",
        "margin-bottom": "2%",
        "margin-top": "2%",
        "margin-right": "10%"
      }
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '10_' + index
      }
    }, [_c('t-col', {
      attrs: {
        "span": "4",
        "mpcomid": '8_' + index
      }
    }, [_c('t-image', {
      attrs: {
        "src": item.fruit_cover,
        "mode": "aspectFill",
        "width": "36",
        "height": "36",
        "mpcomid": '7_' + index
      }
    })], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "20",
        "mpcomid": '9_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "6%",
        "font-size": "14px",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n            " + _vm._s(item.fruit_name) + "\n          ")])], 1)], 1)], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "margin-left": "18%",
        "margin-right": "10%",
        "border-bottom": "1px solid #f2f2f2",
        "margin-bottom": "2%",
        "margin-top": "4%"
      }
    })], 1)
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24fb79d7", esExports)
  }
}

/***/ })

},[178]);
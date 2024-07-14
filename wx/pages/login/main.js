require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([16],{

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(184);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1d0a0854_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(214);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1d0a0854"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1d0a0854_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\login\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d0a0854", Component.options)
  } else {
    hotAPI.reload("data-v-1d0a0854", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 185:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jwt_decode__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      username: '', // 用户名绑定变量
      password: '', // 密码绑定变量
      user_category: '' // 身份
    };
  },
  onLoad: function onLoad(options) {
    this.username = '';
    this.password = '';
    //console.log(options.identify);
    this.user_category = options.identify;
    //console.log(this.user_category);
  },

  methods: {
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_2_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    login: function login() {
      var encryptedPassword = __WEBPACK_IMPORTED_MODULE_0_crypto_js___default.a.MD5(this.password).toString();
      //console.log(encryptedPassword);
      var uc = this.user_category;
      //console.log(uc);
      var that = this;
      // 这里应添加登录逻辑
      //console.log('登录信息:', this.username, this.password);
      wx.request({
        url: 'http://120.78.1.231:8084/api/login', // 登录接口地址
        method: 'POST', // 使用POST方法
        data: {
          user_name: this.username, // 传递用户名
          passwd: encryptedPassword, // 传递密码
          user_category: this.user_category
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('登录成功', res.data);
            // 存token
            wx.setStorageSync('token', res.header['Token'] || res.header['token']);
            wx.setStorageSync('ide', uc);
            wx.request({
              url: 'http://120.78.1.231:8084/api/get/extraInfo',
              method: 'GET',
              header: {
                'token': res.header['Token'] || res.header['token']
              },
              success: function success(res2) {
                if (res2.statusCode === 200) {
                  //console.log('获取信息成功', res2);
                  var decoded = Object(__WEBPACK_IMPORTED_MODULE_1_jwt_decode__["a" /* jwtDecode */])(res.header['Token'] || res.header['token']);
                  // 输出用户信息
                  //console.log('token携带信息:', decoded);
                  //console.log('用户信息:', JSON.parse(decoded.sub).name);
                  wx.setStorageSync('head', res2.data.avatar);
                  wx.setStorageSync('userName', that.username);
                  wx.setStorageSync('Name', JSON.parse(decoded.sub).name);
                  if (uc === 'committee') {
                    wx.navigateTo({
                      url: '/pages/home/main?userName=' + that.username + '&Name=' + JSON.parse(decoded.sub).name + '&head=' + res2.data.avatar
                    });
                  }
                  if (uc === 'community') {
                    if (that.password === '123456') {
                      //console.log('firstlogin设成1');
                      wx.setStorageSync('Com', res2.data.communityID);
                      wx.navigateTo({
                        url: '/pages/home_c/main?FirstLogin=1&Com=' + res2.data.communityID + '&userName=' + that.username + '&Name=' + JSON.parse(decoded.sub).name + '&head=' + res2.data.avatar
                      });
                    } else {
                      wx.setStorageSync('Com', res2.data.communityID);
                      wx.navigateTo({
                        url: '/pages/home_c/main?FirstLogin=0&Com=' + res2.data.communityID + '&userName=' + that.username + '&Name=' + JSON.parse(decoded.sub).name + '&head=' + res2.data.avatar
                      });
                    }
                  }
                  if (uc === 'student') {
                    wx.setStorageSync('Team', res2.data.TeamID);
                    wx.setStorageSync('Isleader', res2.data.isLeader);
                    wx.navigateTo({
                      url: '/pages/home_sl/main?Team=' + res2.data.TeamID + '&userName=' + that.username + '&Name=' + JSON.parse(decoded.sub).name + '&Isleader=' + res2.data.isLeader + '&head=' + res2.data.avatar
                    });
                  }
                } else {
                  console.error('获取信息失败', res2.data);
                  // 处理登录失败的逻辑，例如显示错误信息
                }
              },
              fail: function fail(error) {
                console.error('请求失败', error);
                // 处理请求失败的逻辑
              }
            });
          } else {
            console.error('登录失败', res.data);
            // 处理登录失败的逻辑，例如显示错误信息
            that.showWarningToast(res.data);
            that.username = '';
            that.password = '';
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
    }
  }
});

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "padding-left": "8%",
      "padding-right": "8%"
    }
  }, [_c('div', {
    staticClass: "login-container"
  }, [_c('div', {
    staticClass: "login-text"
  }, [_vm._v("登录您的账号")]), _vm._v(" "), _c('div', {
    staticClass: "use-text"
  }, [_vm._v("使用用户名和密码登录")]), _vm._v(" "), _c('div', {
    staticClass: "input-container"
  }, [_c('label', {
    staticClass: "input-text",
    attrs: {
      "for": "username"
    }
  }, [_vm._v("用户名")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    staticClass: "input-style",
    attrs: {
      "id": "username",
      "type": "text",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "input-container"
  }, [_c('label', {
    staticClass: "login-text",
    attrs: {
      "for": "password"
    }
  }, [_vm._v("密码")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    staticClass: "input-style",
    attrs: {
      "id": "password",
      "type": "password",
      "eventid": '1'
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })], 1), _vm._v(" "), _c('button', {
    staticClass: "login-button",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.login
    }
  }, [_vm._v("登录")])], 1), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '0'
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
     require("vue-hot-reload-api").rerender("data-v-1d0a0854", esExports)
  }
}

/***/ })

},[183]);
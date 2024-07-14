require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(162);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_643062b8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(166);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(163)
  __webpack_require__(164)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-643062b8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_643062b8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home_sl\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-643062b8", Component.options)
  } else {
    hotAPI.reload("data-v-643062b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 163:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 165:
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
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      isPositiveInteger: false,
      isLeader: 0,
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      name: '刘德华',
      team: '好好学习',
      teamID: 1
    };
  },
  onLoad: function onLoad(options) {
    this.teamID = options.Team;
    this.checkComID(this.teamID);
    this.name = options.Name;
    //console.log(options.Name);
    //console.log('是否队长', options.Isleader);
    if (options.Isleader === 'true') {
      this.isLeader = 1;
    }
    var cleanedImg = options.head.replace(/(\r\n|\n|\r)/gm, '');
    var imageSrc = 'data:image/jpeg;base64,' + cleanedImg;
    this.image = imageSrc;
  },

  methods: {
    checkComID: function checkComID(comID) {
      var pattern = /^[1-9]\d*$/;
      this.isPositiveInteger = pattern.test(comID);
    },
    onNotification: function onNotification() {
      //console.log('111111111');
      if (this.teamID != null && !isNaN(this.teamID)) {
        wx.navigateTo({
          url: '/pages/notification_sl/main'
        });
      } else {
        this.showWarningToast('请先注册或加入队伍！');
      }
    },
    onChangeInfor: function onChangeInfor() {
      if (this.teamID != null && !isNaN(this.teamID)) {
        wx.navigateTo({
          url: '/pages/change_team_info/main?TeamID=' + this.teamID
        });
      } else {
        wx.navigateTo({
          url: '/pages/new_team/main'
        });
      }
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_0_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    onManageMember: function onManageMember() {
      if (this.teamID != null && !isNaN(this.teamID)) {
        //console.log(this.isLeader);
        if (this.isLeader === 0) {
          this.showWarningToast('请联系队长管理队员！');
        } else {
          wx.navigateTo({
            url: '/pages/manage_team_member/main?TeamID=' + this.teamID
          });
        }
      } else {
        this.showWarningToast('请先注册或加入队伍！');
      }
    },
    onReleaseNews: function onReleaseNews() {
      if (this.teamID != null && !isNaN(this.teamID)) {
        wx.navigateTo({
          url: '/pages/NewNews/main'
        });
      } else {
        this.showWarningToast('请先注册或加入队伍！');
      }
    },
    onReleaseRealNews: function onReleaseRealNews() {
      if (this.teamID != null && !isNaN(this.teamID)) {
        wx.navigateTo({
          url: '/pages/NewRealNews/main'
        });
      } else {
        this.showWarningToast('请先注册或加入队伍！');
      }
    },
    onInteract: function onInteract() {
      if (this.teamID != null && !isNaN(this.teamID)) {
        wx.navigateTo({
          url: '/pages/likeComment_c/main'
        });
      } else {
        this.showWarningToast('请先注册或加入队伍！');
      }
    },
    onJieDui: function onJieDui() {
      wx.navigateTo({
        url: '/pages/team-list/team-list',
      })
    },
    clickSuccess: function clickSuccess() {
      wx.redirectTo({
        url: '/pages/success-wall/wall'
      });
    },
    clickHome: function clickHome() {
      wx.redirectTo({
        url: '/pages/entry/entry'
      });
    }
  }
});

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "header-container"
  }, [_c('t-avatar', {
    staticClass: "avatar-example",
    attrs: {
      "image": _vm.image,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "name",
    staticStyle: {
      "font-weight": "bold"
    }
  }, [_vm._v(_vm._s(_vm.name))])], 1), _vm._v(" "), _c('div', {
    staticClass: "inner-container",
    staticStyle: {
      "margin-bottom": "20px"
    }
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '2'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "24",
      "mpcomid": '1'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "2%",
      "font-size": "13px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n            我的服务\n          ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  })], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '7'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '0',
      "mpcomid": '4'
    },
    on: {
      "click": _vm.onInteract
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "fact-check",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '3'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("互动消息")])]), _vm._v(" "), (_vm.isLeader == 1) ? _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '1',
      "mpcomid": '6'
    },
    on: {
      "click": _vm.onNotification
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "system-messages",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '5'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("消息通知")])]) : _vm._e()], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "inner-container",
    staticStyle: {
      "margin-bottom": "20px"
    }
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '9'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "24",
      "mpcomid": '8'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "2%",
      "font-size": "13px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n            平台服务\n          ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  })], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '14'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "mpcomid": '11'
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "look-around",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '10'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("关于我们")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "mpcomid": '13'
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "chat-bubble-smile",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '12'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("联系我们")])])], 1)], 1), _vm._v(" "), (_vm.isLeader == 1) ? _c('div', {
    staticClass: "inner-container"
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '16'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "24",
      "mpcomid": '15'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "2%",
      "font-size": "13px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n            组织服务\n          ")]), _vm._v(" "), (_vm.isPositiveInteger) ? _c('div', {
    staticStyle: {
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  }) : _vm._e(), _vm._v(" "), (!_vm.isPositiveInteger) ? _c('p', {
    staticStyle: {
      "padding-left": "3%",
      "color": "#928f8f",
      "font-size": "10px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n          尚未加入队伍  \n          ")]) : _vm._e()], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '25'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '2',
      "mpcomid": '18'
    },
    on: {
      "click": _vm.onChangeInfor
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "assignment-user",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '17'
    }
  })], 1), _vm._v(" "), (_vm.isPositiveInteger) ? _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("修改队伍信息")]) : _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("注册队伍信息")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '3',
      "mpcomid": '20'
    },
    on: {
      "click": _vm.onManageMember
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "fact-check",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '19'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("管理队员")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '4',
      "mpcomid": '22'
    },
    on: {
      "click": _vm.onReleaseNews
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "assignment-user",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '21'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("发布成果")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '5',
      "mpcomid": '24'
    },
    on: {
      "click": _vm.onJieDui
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "assignment-user",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '23'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("需求结对")])])], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '28'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '6',
      "mpcomid": '27'
    },
    on: {
      "click": _vm.onReleaseRealNews
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#bd1b06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "assignment-user",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '26'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("发布报道")])])], 1)], 1) : _vm._e(), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '29'
    }
  }), _vm._v(" "), _c('t-tab-bar', {
    attrs: {
      "defaultValue": "label3",
      "split": "false",
      "value": "label3",
      "mpcomid": '33'
    }
  }, [_c('t-tab-bar-item', {
    attrs: {
      "value": "label1",
      "icon": "home",
      "eventid": '7',
      "mpcomid": '30'
    },
    on: {
      "tap": _vm.clickHome
    }
  }, [_vm._v("主页")]), _vm._v(" "), _c('t-tab-bar-item', {
    attrs: {
      "value": "label2",
      "icon": "app",
      "eventid": '8',
      "mpcomid": '31'
    },
    on: {
      "tap": _vm.clickSuccess
    }
  }, [_vm._v("成果墙")]), _vm._v(" "), _c('t-tab-bar-item', {
    attrs: {
      "value": "label3",
      "icon": "user",
      "mpcomid": '32'
    }
  }, [_vm._v("我的")])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-643062b8", esExports)
  }
}

/***/ })

},[161]);
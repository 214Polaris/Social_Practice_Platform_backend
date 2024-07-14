require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(168);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_8378e3ac_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(172);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
  __webpack_require__(170)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8378e3ac"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_8378e3ac_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8378e3ac", Component.options)
  } else {
    hotAPI.reload("data-v-8378e3ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 169:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      name: '刘德华'
    };
  },
  onLoad: function onLoad(options) {
    console.log(options.userName);
    this.name = options.Name;
    console.log(options.Name);
    var cleanedImg = options.head.replace(/(\r\n|\n|\r)/gm, '');
    var imageSrc = 'data:image/jpeg;base64,' + cleanedImg;
    this.image = imageSrc;
  },

  methods: {
    onMan_leader: function onMan_leader() {
      wx.navigateTo({
        url: '/pages/manage_community_leader/main'
      });
    },
    onMan_classi: function onMan_classi() {
      wx.navigateTo({
        url: '/pages/manage_classi/main'
      });
    },
    onAudit: function onAudit() {
      wx.navigateTo({
        url: '/pages/to_audit/main'
      });
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
    },
    onAboutUs: function onAboutUs() {
      wx.navigateTo({
        url: '/pages/about-us/about-us'
      });
    },
    onContactUs: function onContactUs() {
      wx.navigateTo({
        url: '/pages/contact-us/contact-us'
      });
    }
  }
});

/***/ }),

/***/ 172:
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
  }, [_vm._v("\n            管理服务\n          ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%"
    }
  })], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '9'
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
      "click": _vm.onMan_leader
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#d81e06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "assignment-user",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '3'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("管理负责人")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '1',
      "mpcomid": '6'
    },
    on: {
      "click": _vm.onAudit
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#d81e06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "fact-check",
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
  }, [_vm._v("审核通知")])]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '2',
      "mpcomid": '8'
    },
    on: {
      "click": _vm.onMan_classi
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#d81e06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "compass-1",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '7'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("管理类别")])])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "inner-container"
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '11'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "24",
      "mpcomid": '10'
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
      "mpcomid": '16'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "6",
      "eventid": '3',
      "mpcomid": '13'
    },
    on: {
      "click": _vm.onAboutUs
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#d81e06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "look-around",
      "size": "28px",
      "bind:click": "onIconTap",
      "mpcomid": '12'
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
      "eventid": '4',
      "mpcomid": '15'
    },
    on: {
      "click": _vm.onContactUs
    }
  }, [_c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_c('t-icon', {
    staticStyle: {
      "color": "#d81e06",
      "margin-top": "4px"
    },
    attrs: {
      "name": "chat-bubble-smile",
      "size": "30px",
      "bind:click": "onIconTap",
      "mpcomid": '14'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "10px",
      "font-weight": "bold",
      "display": "inline-block"
    }
  }, [_vm._v("联系我们")])])], 1)], 1), _vm._v(" "), _c('t-tab-bar', {
    attrs: {
      "defaultValue": "label3",
      "split": "false",
      "value": "label3",
      "mpcomid": '20'
    }
  }, [_c('t-tab-bar-item', {
    attrs: {
      "value": "label1",
      "icon": "home",
      "eventid": '5',
      "mpcomid": '17'
    },
    on: {
      "tap": _vm.clickHome
    }
  }, [_vm._v("主页")]), _vm._v(" "), _c('t-tab-bar-item', {
    attrs: {
      "value": "label2",
      "icon": "app",
      "eventid": '6',
      "mpcomid": '18'
    },
    on: {
      "tap": _vm.clickSuccess
    }
  }, [_vm._v("成果墙")]), _vm._v(" "), _c('t-tab-bar-item', {
    attrs: {
      "value": "label3",
      "icon": "user",
      "mpcomid": '19'
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
     require("vue-hot-reload-api").rerender("data-v-8378e3ac", esExports)
  }
}

/***/ })

},[167]);
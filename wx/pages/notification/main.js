require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([9],{

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(278);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_57c89336_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(281);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(279)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-57c89336"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_57c89336_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\notification\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57c89336", Component.options)
  } else {
    hotAPI.reload("data-v-57c89336", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 279:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 280:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      time: '2024-4-12 12:22',
      type: 1,
      imageSrc: 'https://tdesign.gtimg.com/mobile/demos/image1.jpeg'
    };
  }
});

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "noti-container"
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('t-col', {
    staticStyle: {
      "margin-left": "5%"
    },
    attrs: {
      "span": "4",
      "mpcomid": '1'
    }
  }, [_c('t-avatar', {
    staticClass: "avatar-example",
    attrs: {
      "image": _vm.image,
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('t-col', {
    attrs: {
      "span": "20",
      "mpcomid": '2'
    }
  }, [(_vm.type == 1) ? _c('p', {
    staticStyle: {
      "padding-left": "1%",
      "font-size": "15px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n          审核通知\n        ")]) : _vm._e(), _vm._v(" "), (_vm.type == 2) ? _c('p', {
    staticStyle: {
      "padding-left": "1%",
      "font-size": "15px",
      "font-weight": "bold",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n          系统通知\n        ")]) : _vm._e(), _vm._v(" "), _c('p', {
    staticStyle: {
      "color": "#d3d0d0",
      "padding-left": "1%",
      "font-size": "12px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.time) + "\n        ")])], 1)], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '4'
    }
  }, [_c('p', {
    staticStyle: {
      "margin-left": "22%",
      "font-size": "15px",
      "font-weight": "bold",
      "margin-bottom": "2%",
      "margin-top": "5%"
    }
  }, [_vm._v("\n        您有来自xx社区的需求审核请求!\n      ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "detailShow",
    staticStyle: {
      "padding": "2%",
      "margin-left": "22%",
      "margin-bottom": "2%",
      "margin-top": "5%",
      "margin-right": "10%"
    }
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '8'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "4",
      "mpcomid": '6'
    }
  }, [_c('t-image', {
    attrs: {
      "src": _vm.imageSrc,
      "mode": "aspectFill",
      "width": "36",
      "height": "36",
      "mpcomid": '5'
    }
  })], 1), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "align-self": "center"
    },
    attrs: {
      "span": "20",
      "mpcomid": '7'
    }
  }, [_c('p', {
    staticStyle: {
      "padding-left": "6%",
      "font-size": "14px",
      "margin-bottom": "2%"
    }
  }, [_vm._v("\n            勇敢少先队\n          ")])], 1)], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "18%",
      "margin-right": "10%",
      "border-bottom": "1px solid #f2f2f2",
      "margin-bottom": "2%",
      "margin-top": "4%"
    }
  })], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57c89336", esExports)
  }
}

/***/ })

},[277]);
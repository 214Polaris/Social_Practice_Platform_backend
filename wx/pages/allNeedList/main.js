require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([26],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._l((_vm.demand_list), function(demand, index) {
    return _c('div', {
      key: demand.need_id,
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.OnClick(demand.need_id)
        }
      }
    }, [_c('t-cell', {
      attrs: {
        "title": demand.title,
        "description": demand.post_time,
        "note": demand.is_pass,
        "align": "center",
        "image": demand.img,
        "hover": "",
        "arrow": "",
        "mpcomid": '0_' + index
      }
    })], 1)
  }), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '1'
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
     require("vue-hot-reload-api").rerender("data-v-14f68500", esExports)
  }
}

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(65);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_14f68500_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(107);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(66)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-14f68500"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_14f68500_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\allNeedList\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14f68500", Component.options)
  } else {
    hotAPI.reload("data-v-14f68500", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 66:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      demand_list: [{
        title: '111',
        post_time: '2024',
        is_pass: '审核中',
        img: '222'
      }]
    };
  },
  mounted: function mounted() {
    this.loadList();
  },

  methods: {
    showSuccessToast: function showSuccessToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_2_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'success',
        direction: 'column'
      });
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_2_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    loadList: function loadList() {
      var that = this;
      var token = wx.getStorageSync('token');
      wx.request({
        url: 'http://120.78.1.231:8084/api/leader/get/community/need',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log(res.data);
            var data = res.data;
            var deList = [];
            for (var i = 0; i < data.length; i++) {
              var obj = data[i];
              obj.loading = true;
              obj.is_pass = obj.is_pass === 1 ? '已审核' : '审核中';
              obj.post_time = obj.post_time.replace('T', ' ');
              deList.push(obj);
            }
            //console.log(deList);
            that.demand_list = deList;
            that.onImgReq();
            //console.log(that.demand_list);
            //console.log('22222222');
          }
        }
      });
    },
    onImgReq: function onImgReq() {
      var _this = this;

      var demandList = this.demand_list;
      var promises = demandList.map(function (item) {
        return _this.getImageData(item.img, item.need_id);
      });
      __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all(promises).then(function (results) {
        // 更新 demand_list 中的图像数据
        _this.demand_list = demandList.map(function (item, index) {
          return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, item, {
            img: results[index]
          });
        });
        //console.log(_this.demand_list);
        //console.log('-------');
      }).catch(function (error) {
        console.error('Error fetching image data:', error);
      });
    },
    getImageData: function getImageData(imageId, needId) {
      return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        var dataString = 'images=' + imageId + '&id=' + needId + '&type=1';
        wx.request({
          url: 'http://120.78.1.231:8084/api/media/get/image/thumbnail',
          method: 'POST',
          header: {
            'Connection': 'Upgrade',
            'Upgrade': 'h2c',
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: dataString,
          success: function success(res) {
            if (res.statusCode === 200) {
              var cleanedBase64String = res.data[0].replace(/(\r\n|\n|\r)/gm, '');
              var finalBase64String = 'data:image/jpeg;base64,' + cleanedBase64String;
              resolve(finalBase64String);
            } else {
              reject(new Error('HTTP status code: ' + res.statusCode));
            }
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    OnClick: function OnClick(NeedId) {
      var need = this.demand_list.find(function (item) {
        return item.need_id === NeedId;
      });
      //console.log(need);
      if (need.is_pass === '审核中') {
        this.showWarningToast('无法查看/修改审核中的需求！');
        return;
      }
      wx.navigateTo({
        url: '/pages/changeNeedInfo/main?NeedId=' + NeedId
      });
    }
  }
});

/***/ })

},[64]);
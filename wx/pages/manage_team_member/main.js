require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([13],{

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(236);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_14e1a726_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(239);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(237)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_14e1a726_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\manage_team_member\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14e1a726", Component.options)
  } else {
    hotAPI.reload("data-v-14e1a726", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 237:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 238:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      teamID: 0,
      newName: '初始值',
      newCollege: '初始值',
      newhasJoinOther: false,
      addVisible: false,
      deleteVisible: false,
      value: '',
      unReturn: '',
      Namevisible: false,
      people: [],
      NewUserName: null,
      currentPersonId: null,
      currentPersonUName: ''
    };
  },
  mounted: function mounted() {
    this.fetchData();
  },
  onLoad: function onLoad(options) {
    this.teamID = options.TeamID;
    //console.log('队伍ID', this.teamID);
  },

  computed: {
    // 在Vue.js框架中，computed 属性的依赖关系是自动跟踪的，这是通过Vue的响应式系统实现的。当你在一个computed属性的函数中访问响应式数据（如data中的属性或其他computed属性），Vue会自动将这些数据记录为依赖
    // 所以此时computed依赖于this.value，当value的值改变时，自动执行此函数
    filteredPeople: function filteredPeople() {
      var keyword = this.value.trim().toLowerCase();
      if (!keyword) {
        return this.people;
      }
      return this.people.filter(function (person) {
        return person.Name.toLowerCase().includes(keyword);
      });
    }
  },
  methods: {
    changeNameHandle: function changeNameHandle(e) {
      var value = e.target.value;
      this.NewName = value;
    },
    actionHandle: function actionHandle() {
      this.value = '';
    },
    changeUserNameHandle: function changeUserNameHandle(e) {
      this.NewUserName = e.target.value;
      //console.log(this.NewUserName);
    },
    SexChange: function SexChange(e) {
      if (e.target.value === 1) {
        this.NewSex = '男';
      } else {
        this.NewSex = '女';
      }
    },
    clearHandle: function clearHandle() {
      this.value = '';
    },
    changeHandle: function changeHandle(e) {
      this.value = e.target.value;
    },
    onDelete: function onDelete(personId) {
      var person = this.people.find(function (p) {
        return p.user_id === personId;
      });
      this.deleteVisible = true;
      this.currentPersonId = personId;
      this.currentPersonUName = person.userName;
    },
    confirmDelete: function confirmDelete() {
      var that = this;
      var token = wx.getStorageSync('token');
      wx.request({
        url: 'http://120.78.1.231:8084/api/team/deleteMember?TeamID=' + this.teamID + '&userName=' + this.currentPersonUName,
        method: 'DELETE',
        header: {
          'Content-Type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('删除成功', res.data);
            that.deleteVisible = false;
            that.fetchData();
            that.currentPersonId = null;
            that.currentPersonUName = '';
            that.NewUserName = '';
          } else {
            console.error('删除失败', res.data);
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
        }
      });
    },
    cancelDelete: function cancelDelete() {
      this.deleteVisible = false;
      this.currentPersonId = null;
      this.currentPersonUName = '';
    },
    addComLeader: function addComLeader() {
      this.addVisible = true;
    },
    cancelAdd: function cancelAdd() {
      this.addVisible = false;
      this.NewUserName = '';
      this.currentPersonId = null;
      this.currentPersonUName = '';
    },
    confirmAdd: function confirmAdd() {
      //console.log('添加');
      var that = this;
      var token = wx.getStorageSync('token');
      //console.log(token);
      wx.request({
        url: 'http://120.78.1.231:8084/api/team/addMember?TeamID=' + this.teamID + '&userName=' + this.NewUserName,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log(res.data);
            that.fetchData();
            that.addVisible = false;
            that.currentPersonId = null;
            that.currentPersonUName = '';
            that.NewUserName = '';
            that.newName = '初始值';
            that.newCollege = '初始值';
          } else if (res.statusCode === 400) {
            that.showWarningToast(res.data);
            that.addVisible = false;
            that.currentPersonId = null;
            that.currentPersonUName = '';
            that.NewUserName = '';
            that.newName = '初始值';
            that.newCollege = '初始值';
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
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
    Search: function Search() {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
        url: 'http://120.78.1.231:8084/api/user/stuInfo?username=' + this.NewUserName,
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('查询', res.data);
            that.newCollege = res.data.college;
            that.newName = res.data.Name;
            that.newhasJoinOther = res.data.hasJoinOther;
          } else {
            console.error('查询失败', res.data);
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
        }
      });
    },
    fetchData: function fetchData() {
      var token = wx.getStorageSync('token');
      var that = this;
      //console.log(token);
      //console.log('1111111');
      wx.request({
        url: 'http://120.78.1.231:8084/api/team/members',
        method: 'GET',
        data: {
          TeamID: this.teamID
        },
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            that.people = res.data;
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

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "search"
  }, [_c('t-row', {
    staticStyle: {
      "display": "flex",
      "align-items": "center"
    },
    attrs: {
      "mpcomid": '4'
    }
  }, [_c('t-col', {
    attrs: {
      "span": "20",
      "mpcomid": '1'
    }
  }, [_c('t-search', {
    attrs: {
      "value": _vm.value,
      "center": "",
      "placeholder": "请输入关键字",
      "shape": "round",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "action-click": _vm.actionHandle,
      "change": _vm.changeHandle,
      "clear": _vm.clearHandle
    }
  })], 1), _vm._v(" "), _c('t-col', {
    attrs: {
      "span": "4",
      "mpcomid": '3'
    }
  }, [_c('t-icon', {
    attrs: {
      "name": "user-add",
      "size": "48rpx",
      "color": "rgb(163, 159, 159)",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.addComLeader()
      }
    }
  })], 1)], 1)], 1), _vm._v(" "), _vm._l((_vm.filteredPeople), function(person, index) {
    return _c('div', {
      key: person.user_id,
      staticClass: "people"
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '11_' + index
      }
    }, [_c('t-col', {
      attrs: {
        "span": "2",
        "mpcomid": '5_' + index
      }
    }), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "18",
        "mpcomid": '8_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "2%",
        "font-size": "14px",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n          " + _vm._s(person.Name) + "\n        ")]), _vm._v(" "), _c('div', {
      staticStyle: {
        "display": "flex",
        "align-items": "center",
        "margin-bottom": "2%"
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "museum-1",
        "size": "36rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '2_' + index,
        "mpcomid": '6_' + index
      },
      on: {
        "click": _vm.onIconTap
      }
    }), _vm._v(" "), _c('p', {
      staticStyle: {
        "color": "rgb(163, 159, 159)",
        "font-size": "11px",
        "padding-left": "1%"
      }
    }, [_vm._v("\n            " + _vm._s(person.college) + "\n          ")]), _vm._v(" "), _c('t-icon', {
      staticStyle: {
        "margin-left": "7%"
      },
      attrs: {
        "name": "personal-information",
        "size": "34rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '3_' + index,
        "mpcomid": '7_' + index
      },
      on: {
        "click": _vm.onIconTap
      }
    }), _vm._v(" "), _c('p', {
      staticStyle: {
        "color": "rgb(163, 159, 159)",
        "font-size": "11px",
        "padding-left": "1%"
      }
    }, [_vm._v("\n            " + _vm._s(person.userName) + "\n          ")])], 1)], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "2",
        "mpcomid": '10_' + index
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "delete",
        "size": "40rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '4_' + index,
        "mpcomid": '9_' + index
      },
      on: {
        "click": function($event) {
          _vm.onDelete(person.user_id)
        }
      }
    })], 1)], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "border-bottom": "1px solid #f2f2f2",
        "margin-bottom": "2%",
        "margin-top": "2%"
      }
    })], 1)
  }), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.deleteVisible,
      "placement": "center",
      "mpcomid": '14'
    }
  }, [_c('view', {
    staticClass: ".block-center"
  }, [_c('p', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "bold",
      "margin-bottom": "5%"
    }
  }, [_vm._v("删除提醒")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "16px"
    }
  }, [_vm._v("确定要删除这个队员吗？")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "10%"
    }
  }, [_c('t-button', {
    staticStyle: {
      "margin-right": "5%"
    },
    attrs: {
      "size": "large",
      "theme": "danger",
      "eventid": '5',
      "mpcomid": '12'
    },
    on: {
      "click": _vm.confirmDelete
    }
  }, [_vm._v("确认")]), _vm._v(" "), _c('t-button', {
    attrs: {
      "size": "large",
      "theme": "danger",
      "eventid": '6',
      "mpcomid": '13'
    },
    on: {
      "click": _vm.cancelDelete
    }
  }, [_vm._v("取消")])], 1)], 1)]), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.addVisible,
      "placement": "bottom",
      "mpcomid": '22'
    }
  }, [_c('view', {
    staticClass: "block"
  }, [_c('view', {
    staticClass: "header"
  }, [_c('view', {
    staticClass: "btn btn--cancel",
    attrs: {
      "aria-role": "button",
      "eventid": '7'
    },
    on: {
      "click": _vm.cancelAdd
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('view', {
    staticClass: "title"
  }, [_vm._v("添加新队员")]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '8'
    },
    on: {
      "click": _vm.confirmAdd
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding-left": "5%",
      "padding-right": "5%",
      "padding-bottom": "3%"
    }
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '17'
    }
  }, [_c('t-input', {
    attrs: {
      "value": _vm.NewUserName,
      "placeholder": "请输入新队员NetID",
      "eventid": '9',
      "mpcomid": '15'
    },
    on: {
      "change": _vm.changeUserNameHandle
    }
  }), _vm._v(" "), _c('t-button', {
    staticStyle: {
      "margin-right": "5%",
      "margin-left": "3%",
      "display": "inline-block"
    },
    attrs: {
      "size": "medium",
      "theme": "danger",
      "eventid": '10',
      "mpcomid": '16'
    },
    on: {
      "click": function($event) {
        _vm.Search()
      }
    }
  }, [_vm._v("查找")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "13px",
      "margin-left": "4%",
      "margin-top": "3%"
    }
  }, [_c('t-row', {
    attrs: {
      "mpcomid": '18'
    }
  }, [_vm._v("\n            请核对信息无误\n            ")]), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "margin-top": "2%"
    },
    attrs: {
      "mpcomid": '21'
    }
  }, [_c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "10",
      "mpcomid": '19'
    }
  }, [_vm._v("\n              姓名：" + _vm._s(_vm.newName) + "\n            ")]), _vm._v(" "), _c('t-col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "8",
      "mpcomid": '20'
    }
  }, [_vm._v("\n              学院：" + _vm._s(_vm.newCollege) + "\n            ")])], 1)], 1)], 1)])]), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '23'
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
     require("vue-hot-reload-api").rerender("data-v-14e1a726", esExports)
  }
}

/***/ })

},[235]);
require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([15],{

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(226);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2600bf14_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(229);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(227)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2600bf14"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2600bf14_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\manage_classi\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2600bf14", Component.options)
  } else {
    hotAPI.reload("data-v-2600bf14", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 227:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 228:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      value: '',
      classi: [{
        id: 1,
        name: '类别1'
      }, {
        id: 2,
        name: '类别2'
      }],
      visible: false,
      currentclassiId: null,
      addVisible: false,
      NewClassivalue: '',
      EditClassivalue: '',
      editVisible: false,
      EditClassid: null
    };
  },
  mounted: function mounted() {
    this.fetchPeopleData();
  },

  // computed: {
  //   // 在Vue.js框架中，computed 属性的依赖关系是自动跟踪的，这是通过Vue的响应式系统实现的。当你在一个computed属性的函数中访问响应式数据（如data中的属性或其他computed属性），Vue会自动将这些数据记录为依赖
  //   // 所以此时computed依赖于this.value，当value的值改变时，自动执行此函数
  //   filteredClass () {
  //     const keyword = this.value.trim().toLowerCase()
  //     if (!keyword) {
  //       return this.people
  //     }
  //     return this.people.filter(person =>
  //       person.name.toLowerCase().includes(keyword)
  //     )
  //   }
  // },
  methods: {
    // onDelete (classiId) {
    //   this.currentclassiId = classiId
    //   this.visible = true
    // },
    editClassi: function editClassi(classValue, classId) {
      this.EditClassivalue = classValue;
      this.editVisible = true;
      this.EditClassid = classId;
    },

    // confirmDelete () {
    //   const that = this
    //   const token = wx.getStorageSync('token')
    //   //console.log(this.currentclassiId)
    //   wx.request({
    //     url: `http://120.78.1.231:8084/api/tags/delete?id=${parseInt(this.currentclassiId, 10)}`,
    //     method: 'DELETE',
    //     header: {
    //       'Content-Type': 'application/json',
    //       'token': `${token}` // 设置请求头中的token
    //     },
    //     success: (res) => {
    //       if (res.statusCode === 200) {
    //         //console.log('删除成功', res.data)
    //         that.visible = false
    //         that.fetchPeopleData()
    //         that.currentclassiId = null
    //         // 根据需要处理删除成功的逻辑，如更新UI、显示消息等
    //       } else {
    //         console.error('删除失败', res.data)
    //         // 根据需要处理删除失败的逻辑，如显示错误信息
    //       }
    //     },
    //     fail: (error) => {
    //       console.error('请求失败', error)
    //       // 根据需要处理请求失败的逻辑，如显示错误信息
    //     }
    //   })
    // },
    cancelDelete: function cancelDelete() {
      this.visible = false;
      this.currentclassiId = null;
    },
    cancelEdit: function cancelEdit() {
      this.editVisible = false;
      this.EditClassid = null;
      this.EditClassivalue = '';
    },
    confirmEdit: function confirmEdit() {
      // 调用后端接口（EditClassid, EditClassivalue）
      if (this.EditClassivalue === '') {
        //console.log('类别名字不能为空');
        this.showWarningToast('类别名字不能为空');
        //console.log('类别名字不能为空');
        return;
      }
      var that = this;
      var token = wx.getStorageSync('token');
      //console.log(this.EditClassid);
      //console.log(this.EditClassivalue);
      wx.request({
        url: 'http://120.78.1.231:8084/api/tags/update?id=' + parseInt(this.EditClassid, 10) + '&newName=' + this.EditClassivalue,
        method: 'POST',
        // data: {
        //   id: parseInt(this.EditClassid, 10),
        //   newName: this.EditClassivalue
        // },
        header: {
          'Content-Type': 'application/json',
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log(res.data);
            that.fetchPeopleData();
            that.editVisible = false;
            that.EditClassid = null;
            that.EditClassivalue = '';
          } else {
            console.error('修改失败', res.data);
          }
        },
        fail: function fail(error) {
          console.error('请求失败', error);
          // 处理请求失败的逻辑
        }
      });
      // this.classi = this.classi.map(clas => {
      //   if (clas.id === this.EditClassid) {
      //     return { ...clas, name: this.EditClassivalue }
      //   }
      //   return clas
      // })
    },
    addClassi: function addClassi() {
      this.addVisible = true;
    },
    cancelAdd: function cancelAdd() {
      this.addVisible = false;
      this.NewClassivalue = '';
    },
    confirmAdd: function confirmAdd() {
      if (this.NewClassivalue === '') {
        this.showWarningToast('请输入新类别名称');
      } else {
        // const newId = null // this.classi[this.classi.length - 1].id + 1
        // const newClassi = {
        //   id: newId,
        //   name: this.NewClassivalue
        // }
        // this.classi.push(newClassi)
        var that = this;
        var token = wx.getStorageSync('token');
        //console.log(this.NewClassivalue);
        wx.request({
          url: 'http://120.78.1.231:8084/api/tags/add?name=' + this.NewClassivalue,
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'token': '' + token
          },
          success: function success(res) {
            if (res.statusCode === 200) {
              //console.log(res.data);
              that.fetchPeopleData();
              that.addVisible = false;
              that.NewClassivalue = '';
            } else {
              console.error('添加失败', res.data);
            }
          },
          fail: function fail(error) {
            console.error('请求失败', error);
            // 处理请求失败的逻辑
          }
        });
      }
    },
    changeHandle: function changeHandle(e) {
      var newclassivalue = e.target.value;
      this.NewClassivalue = newclassivalue;
    },
    changeEditHandle: function changeEditHandle(e) {
      var editclassivalue = e.target.value;
      this.EditClassivalue = editclassivalue;
    },
    showWarningToast: function showWarningToast(mess) {
      Object(__WEBPACK_IMPORTED_MODULE_0_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        // context: this,
        selector: '#t-toast',
        message: mess,
        theme: 'warning',
        direction: 'column'
      });
    },
    fetchPeopleData: function fetchPeopleData() {
      var _this = this;

      var token = wx.getStorageSync('token');
      //console.log(token);
      //console.log('1111111');
      wx.request({
        url: 'http://120.78.1.231:8084/api/tags/all',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            _this.classi = res.data.tags;
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

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('t-row', {
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('div', {
    staticStyle: {
      "margin-left": "80%",
      "margin-top": "16px"
    }
  }, [_c('t-icon', {
    attrs: {
      "name": "add",
      "size": "48rpx",
      "color": "rgb(163, 159, 159)",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "click": function($event) {
        _vm.addClassi()
      }
    }
  })], 1)]), _vm._v(" "), _vm._l((_vm.classi), function(clas, index) {
    return _c('div', {
      key: clas.id,
      staticClass: "classi"
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '5_' + index
      }
    }, [_c('t-col', {
      attrs: {
        "span": "21",
        "mpcomid": '2_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "2%",
        "font-size": "14px",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n          " + _vm._s(clas.name) + "\n        ")])], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "3",
        "mpcomid": '4_' + index
      }
    }, [_c('div', {
      staticStyle: {
        "display": "flex",
        "align-items": "center",
        "margin-bottom": "2%"
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "edit-1",
        "size": "36rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '1_' + index,
        "mpcomid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.editClassi(clas.name, clas.id)
        }
      }
    })], 1)])], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "border-bottom": "1px solid #f2f2f2",
        "margin-bottom": "2%",
        "margin-top": "2%"
      }
    })], 1)
  }), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.addVisible,
      "placement": "bottom",
      "mpcomid": '8'
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
      "click": _vm.cancelAdd
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('view', {
    staticClass: "title"
  }, [_vm._v("添加新的类别")]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '3'
    },
    on: {
      "click": _vm.confirmAdd
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '7'
    }
  }, [_c('t-input', {
    staticStyle: {
      "padding": "5%"
    },
    attrs: {
      "value": _vm.NewClassivalue,
      "placeholder": "请输入类别名称",
      "eventid": '4',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.changeHandle
    }
  })], 1)], 1)]), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.editVisible,
      "bind:visible-change": "oneditVisibleChange",
      "placement": "bottom",
      "mpcomid": '11'
    }
  }, [_c('view', {
    staticClass: "block"
  }, [_c('view', {
    staticClass: "header"
  }, [_c('view', {
    staticClass: "btn btn--cancel",
    attrs: {
      "aria-role": "button",
      "eventid": '5'
    },
    on: {
      "click": _vm.cancelEdit
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('view', {
    staticClass: "title"
  }, [_vm._v("编辑类别名称")]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '6'
    },
    on: {
      "click": _vm.confirmEdit
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '10'
    }
  }, [_c('t-input', {
    staticStyle: {
      "padding": "5%"
    },
    attrs: {
      "value": _vm.EditClassivalue,
      "eventid": '7',
      "mpcomid": '9'
    },
    on: {
      "change": _vm.changeEditHandle
    }
  })], 1)], 1)]), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '12'
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
     require("vue-hot-reload-api").rerender("data-v-2600bf14", esExports)
  }
}

/***/ })

},[225]);
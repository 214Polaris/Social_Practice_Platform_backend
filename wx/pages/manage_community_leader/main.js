require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([14],{

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(231);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1e4cf6a4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(234);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(232)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1e4cf6a4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\manage_community_leader\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e4cf6a4", Component.options)
  } else {
    hotAPI.reload("data-v-1e4cf6a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 232:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_crypto_js__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      addVisible: false,
      NewName: '',
      NewSex: '男',
      NewPhone: '',
      checked: false,
      isedit: false,
      popupTitle: '添加新的社区负责人',
      value: '',
      unReturn: '',
      Namevisible: false,
      people: [],
      visible: false,
      currentPersonId: null
    };
  },
  mounted: function mounted() {
    this.fetchData();
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
        return person.name.toLowerCase().includes(keyword);
      });
    }
  },
  methods: {
    changeNameHandle: function changeNameHandle(e) {
      var value = e.target.value;
      this.NewName = value;
    },
    changePhoneHandle: function changePhoneHandle(e) {
      var value = e.target.value;
      this.NewPhone = value;
    },
    actionHandle: function actionHandle() {
      this.value = '';
    },
    confirmName: function confirmName() {
      //console.log(this.NewName);
      //console.log(this.unReturn);
      this.Namevisible = false;
      this.NewName = '';
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
        return p.id === personId;
      });
      var community = person ? person.community : '未找到';
      if (community === '暂未添加社区') {
        this.showWarningToast('该社区负责人尚未添加社区，无法修改！');
        this.visible = false;
      } else {
        this.currentPersonId = personId;
        //console.log(this.currentPersonId);
        //console.log('3333333333');
        this.visible = true;
        this.isedit = true;
        this.popupTitle = '修改社区负责人';
      }
    },
    confirmDelete: function confirmDelete() {
      this.visible = false;
      this.addVisible = true;
    },
    cancelDelete: function cancelDelete() {
      this.visible = false;
      this.currentPersonId = null;
      this.isedit = false;
      this.popupTitle = '添加新的社区负责人';
      //console.log('tianjitianji');
    },
    addComLeader: function addComLeader() {
      this.addVisible = true;
    },
    cancelAdd: function cancelAdd() {
      this.addVisible = false;
      this.NewName = '';
      this.NewPhone = '';
      this.NewSex = 0;
      this.isedit = false;
      this.popupTitle = '添加新的社区负责人';
      //console.log('tianjitianji');
    },
    confirmAdd: function confirmAdd() {
      //console.log(this.NewName);
      //console.log(this.NewPhone);
      //console.log(this.NewSex);
      var pattern = /^1[3-9]\d{9}$/;
      if (this.NewName === '') {
        this.showWarningToast('请输入社区负责人姓名');
      } else if (this.NewPhone === '') {
        this.showWarningToast('请输入社区负责人电话');
      } else if (!pattern.test(this.NewPhone)) {
        this.showWarningToast('电话号码不符合格式！');
        this.NewPhone = '';
      } else {
        var that = this;
        var token = wx.getStorageSync('token');
        if (this.isedit) {
          //console.log('修改社区负责人');
          //console.log(this.NewName);
          //console.log(this.NewPhone);
          //console.log(this.NewSex);
          //console.log(this.currentPersonId);
          //console.log(parseInt(this.currentPersonId, 10));
          wx.request({
            url: 'http://120.78.1.231:8084/api/committee/modify/community/leader',
            method: 'POST',
            data: {
              id: parseInt(this.currentPersonId, 10),
              name: this.NewName,
              phone: this.NewPhone,
              gender: this.NewSex
            },
            header: {
              'content-type': 'application/json',
              'token': '' + token
            },
            success: function success(res) {
              if (res.statusCode === 200) {
                //console.log(res.data);
                that.fetchData();
                that.isedit = false;
                that.popupTitle = '添加新的社区负责人';
                that.addVisible = false;
                that.NewName = '';
                that.NewPhone = '';
                that.NewSex = '男';
              } else {
                console.error('修改失败', res.data);
              }
            },
            fail: function fail(error) {
              console.error('请求失败', error);
              // 处理请求失败的逻辑
            }
          });
        } else {
          //console.log('添加');
          //console.log(this.NewName);
          //console.log(this.NewPhone);
          //console.log(this.NewSex);
          var _that = this;
          var nameSend = this.NewName;
          var phoneSend = this.NewPhone;
          wx.request({
            url: 'http://120.78.1.231:8084/api/get/random/name',
            method: 'POST',
            data: {
              name: this.NewName
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': '' + token
            },
            success: function success(res) {
              if (res.statusCode === 200) {
                //console.log('----------');
                //console.log(nameSend);
                //console.log(phoneSend);
                //console.log(res.data);
                wx.request({
                  url: 'http://120.78.1.231:8084/api/register',
                  method: 'POST',
                  data: {
                    user_id: null,
                    name: nameSend,
                    phone_number: phoneSend,
                    password: __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.MD5('123456').toString(),
                    user_category: 'community',
                    user_name: res.data
                  },
                  header: {
                    'content-type': 'application/json',
                    'token': '' + token
                  },
                  success: function success(res2) {
                    if (res2.statusCode === 200) {
                      //console.log(res.data);
                      _that.fetchData();
                      _that.isedit = false;
                      _that.popupTitle = '添加新的社区负责人';
                      _that.addVisible = false;
                      _that.NewPhone = '';
                      _that.NewSex = '男';
                      _that.unReturn = res.data;
                      _that.NewName = nameSend;
                      _that.Namevisible = true;
                    } else {
                      console.error('添加失败', res.data);
                    }
                  },
                  fail: function fail(error) {
                    console.error('请求失败', error);
                    // 处理请求失败的逻辑
                  }
                });
              } else {
                console.error('获取用户名失败', res.data);
              }
            },
            fail: function fail(error) {
              console.error('请求用户名失败', error);
              // 处理请求失败的逻辑
            }
          });
          var newLeader = {
            id: null,
            name: this.NewName,
            imageSrc: 'https://tdesign.gtimg.com/mobile/demos/image1.jpeg', // 默认头像
            community: '暂未添加社区',
            phone: this.NewPhone
          };
          this.people.push(newLeader);
        }
        this.addVisible = false;
        this.isedit = false;
        this.popupTitle = '添加新的社区负责人';
        this.NewName = '';
        this.NewPhone = '';
        this.NewSex = '男';
      }
    },
    showWarningToast: function showWarningToast(text) {
      Object(__WEBPACK_IMPORTED_MODULE_1_tdesign_miniprogram_miniprogram_npm_tdesign_miniprogram_toast_index__["a" /* default */])({
        selector: '#t-toast',
        message: text,
        theme: 'warning',
        direction: 'column'
      });
    },
    fetchData: function fetchData() {
      var token = wx.getStorageSync('token');
      var that = this;
      //console.log(token);
      //console.log('1111111');
      wx.request({
        url: 'http://120.78.1.231:8084/api/committee/community/leaders',
        method: 'GET',
        header: {
          'token': '' + token
        },
        success: function success(res) {
          if (res.statusCode === 200) {
            //console.log('数据获取成功:', res.data);
            that.people = res.data.map(function (person) {
              var cleanedImg = person.img.replace(/(\r\n|\n|\r)/gm, '');
              var imageSrc = 'data:image/jpeg;base64,' + cleanedImg;
              return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, person, {
                imageSrc: imageSrc
              });
            });
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

/***/ 234:
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
      "focus": _vm.focusHandle,
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
      "name": "add",
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
      key: person.id,
      staticClass: "people"
    }, [_c('t-row', {
      attrs: {
        "mpcomid": '12_' + index
      }
    }, [_c('t-col', {
      attrs: {
        "span": "4",
        "mpcomid": '6_' + index
      }
    }, [_c('t-image', {
      attrs: {
        "src": person.imageSrc,
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
        "span": "18",
        "mpcomid": '9_' + index
      }
    }, [_c('p', {
      staticStyle: {
        "padding-left": "2%",
        "font-size": "14px",
        "margin-bottom": "2%"
      }
    }, [_vm._v("\n          " + _vm._s(person.name) + "\n        ")]), _vm._v(" "), _c('div', {
      staticStyle: {
        "display": "flex",
        "align-items": "center",
        "margin-bottom": "2%"
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "location",
        "size": "36rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '2_' + index,
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
    }, [_vm._v("\n            " + _vm._s(person.community) + "\n          ")]), _vm._v(" "), _c('t-icon', {
      staticStyle: {
        "margin-left": "3%"
      },
      attrs: {
        "name": "call",
        "size": "34rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '3_' + index,
        "mpcomid": '8_' + index
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
    }, [_vm._v("\n            " + _vm._s(person.phone) + "\n          ")])], 1)], 1), _vm._v(" "), _c('t-col', {
      staticStyle: {
        "align-self": "center"
      },
      attrs: {
        "span": "2",
        "mpcomid": '11_' + index
      }
    }, [_c('t-icon', {
      attrs: {
        "name": "edit-1",
        "size": "40rpx",
        "color": "rgb(163, 159, 159)",
        "eventid": '4_' + index,
        "mpcomid": '10_' + index
      },
      on: {
        "click": function($event) {
          _vm.onDelete(person.id)
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
      "visible": _vm.visible,
      "bind:visible-change": "onVisibleChange",
      "placement": "center",
      "mpcomid": '15'
    }
  }, [_c('view', {
    staticClass: ".block-center"
  }, [_c('p', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "bold",
      "margin-bottom": "5%"
    }
  }, [_vm._v("修改提醒")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "16px"
    }
  }, [_vm._v("确定为该社区修改负责人吗？")]), _vm._v(" "), _c('div', {
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
      "mpcomid": '13'
    },
    on: {
      "click": _vm.confirmDelete
    }
  }, [_vm._v("确认")]), _vm._v(" "), _c('t-button', {
    attrs: {
      "size": "large",
      "theme": "danger",
      "eventid": '6',
      "mpcomid": '14'
    },
    on: {
      "click": _vm.cancelDelete
    }
  }, [_vm._v("取消")])], 1)], 1)]), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.addVisible,
      "placement": "bottom",
      "mpcomid": '24'
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
  }, [_vm._v(_vm._s(_vm.popupTitle))]), _vm._v(" "), _c('view', {
    staticClass: "btn btn--confirm",
    attrs: {
      "aria-role": "button",
      "eventid": '8'
    },
    on: {
      "click": _vm.confirmAdd
    }
  }, [_vm._v("确定")])]), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '17'
    }
  }, [_c('t-input', {
    staticStyle: {
      "padding": "5%"
    },
    attrs: {
      "value": _vm.NewName,
      "placeholder": "请输入社区负责人姓名",
      "eventid": '9',
      "mpcomid": '16'
    },
    on: {
      "change": _vm.changeNameHandle
    }
  })], 1), _vm._v(" "), _c('t-row', {
    attrs: {
      "mpcomid": '19'
    }
  }, [_c('t-input', {
    staticStyle: {
      "padding": "5%"
    },
    attrs: {
      "value": _vm.NewPhone,
      "placeholder": "请输入社区负责人电话",
      "eventid": '10',
      "mpcomid": '18'
    },
    on: {
      "change": _vm.changePhoneHandle
    }
  })], 1), _vm._v(" "), _c('t-row', {
    staticStyle: {
      "padding-left": "10%",
      "display": "flex",
      "align-items": "center"
    },
    attrs: {
      "mpcomid": '23'
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "14px",
      "color": "#928f8f"
    }
  }, [_vm._v("请选择负责人性别")]), _vm._v(" "), _c('t-radio-group', {
    attrs: {
      "default-value": "0",
      "borderless": "",
      "t-class": "box",
      "eventid": '11',
      "mpcomid": '22'
    },
    on: {
      "change": _vm.SexChange
    }
  }, [_c('t-radio', {
    attrs: {
      "block": "false",
      "label": "男",
      "value": "0",
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('t-radio', {
    attrs: {
      "block": "false",
      "label": "女",
      "value": "1",
      "mpcomid": '21'
    }
  })], 1)], 1)], 1)]), _vm._v(" "), _c('t-popup', {
    attrs: {
      "visible": _vm.Namevisible,
      "bind:visible-change": "onVisibleChange",
      "placement": "center",
      "mpcomid": '26'
    }
  }, [_c('view', {
    staticClass: ".block-center"
  }, [_c('p', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "bold",
      "margin-bottom": "5%"
    }
  }, [_vm._v("添加成功")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "16px"
    }
  }, [_vm._v(_vm._s(_vm.NewName) + "的用户名为" + _vm._s(_vm.unReturn))]), _vm._v(" "), _c('div', {
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
      "eventid": '12',
      "mpcomid": '25'
    },
    on: {
      "click": _vm.confirmName
    }
  }, [_vm._v("我知道了")])], 1)], 1)]), _vm._v(" "), _c('t-toast', {
    attrs: {
      "id": "t-toast",
      "mpcomid": '27'
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
     require("vue-hot-reload-api").rerender("data-v-1e4cf6a4", esExports)
  }
}

/***/ })

},[230]);
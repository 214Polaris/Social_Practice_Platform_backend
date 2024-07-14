require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([10], {

/***/ 245:
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(246);



      var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
      app.$mount();

      /***/
}),

/***/ 246:
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62ba22b2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(249);
      var disposed = false
      function injectStyle(ssrContext) {
        if (disposed) return
        __webpack_require__(247)
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
        __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62ba22b2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
        __vue_styles__,
        __vue_scopeId__,
        __vue_module_identifier__
      )
      Component.options.__file = "src\\pages\\new_team\\index.vue"
      if (Component.esModule && Object.keys(Component.esModule).some(function (key) { return key !== "default" && key.substr(0, 2) !== "__" })) { console.error("named exports are not supported in *.vue files.") }
      if (Component.options.functional) { console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.") }

      /* hot reload */
      if (false) {
        (function () {
          var hotAPI = require("vue-hot-reload-api")
          hotAPI.install(require("vue"), false)
          if (!hotAPI.compatible) return
          module.hot.accept()
          if (!module.hot.data) {
            hotAPI.createRecord("data-v-62ba22b2", Component.options)
          } else {
            hotAPI.reload("data-v-62ba22b2", Component.options)
          }
          module.hot.dispose(function (data) {
            disposed = true
          })
        })()
      }

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


      /***/
}),

/***/ 247:
/***/ (function (module, exports) {

      // removed by extract-text-webpack-plugin

      /***/
}),

/***/ 248:
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            show: {
              id: 1,
              name: '',
              intro: ''
            },
            areaList: {
              faculties: {
                110000: '软件工程学院',
                440000: '人工智能学院'
              },
              Classis: {
                110000: '林柱良',
                440000: '周玉婷'
              }
            },
            data: {
              areaText: '请选择',
              areaVisible: false,
              areaValue: [],
              faculties: [],
              Classis: [],
              ClassiVisible: false,
              ClassiValue: [],
              ClassiText: '请选择',
              current: ['1', '2'],
              choose: [],
              visible: false,
              chosenTagId: [], // 选择的tagID
              chosenTagName: [], // 选择的tag名
              showTagName: '',
              text: '',
              suffixIcon: {
                name: 'chevron-right',
                ariaLabel: '提示'
              },
              names: [
                {
                  name: '林柱良',
                  id: 'linlin111'
                }, {
                  name: '林住两',
                  id: 'linzh222'
                }, {
                  name: '林主梁',
                  id: 'zhul666'
                }, {
                  name: '周玉婷',
                  id: 'zhouyt69'
                }, {
                  name: '周雨彤',
                  id: 'zhouyut678'
                }, {
                  name: '林助理',
                  id: 'linzhul888'
                }, {
                  name: '林啦啦',
                  id: 'linll000'
                }, {
                  name: '苏玉鑫',
                  id: 'syx666'
                }, {
                  name: '陈建国',
                  id: 'cjg250'
                }
              ],
              matchedNameList: [],
              isSearchListShow: false,
              selectedName: '',
              selectedId: 0
            }
          };
        },
        onLoad: function onLoad(options) {
          //console.log(options.TeamID);
          // this.fetchShowData(options.comID) // 根据社区ID去找对应的show中的数据后端接口！
        },
        mounted: function mounted() {
          this.initAreaData();
          this.fetchClassiData();
        },

        methods: {
          bindNameFocus: function bindNameFocus() {
            //console.log(this.data.isSearchListShow);
            //console.log('focusssss');
            this.data.isSearchListShow = true;
            //console.log(this.data.isSearchListShow);
          },
          bindNameChange: function bindNameChange(item) {
            var name = item.name;
            var id = item.id;
            this.data.selectedName = name;
            this.data.isSearchListShow = false;
            this.data.selectedId = id;
            //console.log(this.data.selectedName);
            //console.log(this.data.selectedId);
          },
          bindInput: function bindInput(e) {
            var keyword = e.target.value.toLowerCase();
            var reg = new RegExp(keyword);
            var matchedNameList = this.data.names.filter(function (item) {
              return reg.test(item.name.toLowerCase());
            });
            this.data.matchedNameList = matchedNameList;
            //console.log(matchedNameList);
            //console.log('--------------------');
          },
          initAreaData: function initAreaData() {
            this.data.faculties = this.getOptions(this.areaList.faculties);
            this.data.Classis = this.getOptions(this.areaList.Classis);
          },
          fetchClassiData: function fetchClassiData() {
            var token = wx.getStorageSync('token');
            var that = this;
            //console.log(token);
            wx.request({
              url: 'http://120.78.1.231:8084/api/tags/all',
              method: 'GET',
              header: {
                'token': '' + token
              },
              success: function success(res) {
                if (res.statusCode === 200) {
                  //console.log('数据获取成功:', res.data);
                  that.data.current = res.data.tags.map(function (tag) {
                    return { value: tag.id.toString() };
                  });
                  that.data.choose = res.data.tags.map(function (tag) {
                    return { label: tag.name, value: tag.id.toString() };
                  });
                }
              },
              fail: function fail(error) {
                console.error('请求失败:', error);
              }
            });
          },
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
          handlePopup: function handlePopup(e) {
            this.onVisibleChange();
          },
          onVisibleChange: function onVisibleChange() {
            this.data.visible = !this.data.visible;
            if (this.data.visible === false) {
              this.onCancelSelect();
            }
          },
          onCancelSelect: function onCancelSelect() {
            this.data.current = [];
            this.data.visible = false;
          },
          onConfirmSelect: function onConfirmSelect() {
            if (this.data.current.length > 3) {
              this.showWarningToast('您选择的类别数量\n已到达上限！');
            } else {
              var result = [];
              var current = this.data.current;
              var choose = this.data.choose;
              for (var i = 0; i < current.length; i++) {
                for (var j = 0; j < choose.length; j++) {
                  if (current[i] === choose[j].value) {
                    result.push(choose[j].label);
                    break;
                  }
                }
              }
              this.data.chosenTagName = result;
              var resultString = '（';
              for (var _i = 0; _i < this.data.chosenTagName.length; _i++) {
                resultString += this.data.chosenTagName[_i];
                if (_i !== this.data.chosenTagName.length - 1) {
                  resultString += ', ';
                }
              }
              resultString += '）';
              this.data.showTagName = resultString;
              __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(this.data.chosenTagName, result);
              this.data.visible = false;
              this.data.chosenTagId = this.data.current;
              this.data.current = [];
            }
          },
          AgreeAudit: function AgreeAudit() {
            var address = '广东省广州市海珠区';
            if (this.data.areaText === '软件工程学院' || this.data.areaText === '人工智能学院') {
              address = '广东省珠海市香洲区';
            }
            // 连接后端接口！！！
            var token = wx.getStorageSync('token');
            var that = this;
            wx.request({
              url: 'http://120.78.1.231:8084/api/team/register',
              method: 'POST',
              data: {
                team_name: this.show.name,
                introduction: this.show.intro,
                academy: this.data.areaText,
                teacher_id: this.data.selectedId, // 要改成修改的老师ID
                address: address
              },
              header: {
                'content-type': 'application/json',
                'token': '' + token
              },
              success: function success(res) {
                if (res.statusCode === 200) {
                  that.showSuccessToast('已完成');
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 800);
                }
              }
            });
          },
          changeName: function changeName(e) {
            this.show.name = e.target.value;
          },
          changeIntro: function changeIntro(e) {
            this.show.intro = e.target.value;
          },
          getOptions: function getOptions(obj, filter) {
            var res = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(obj).map(function (key) {
              return { value: key, label: obj[key] };
            });
            if (filter) {
              return res.filter(filter);
            }
            return res;
          },
          match: function match(v1, v2, size) {
            return v1.toString().slice(0, size) === v2.toString().slice(0, size);
          },
          onPickerChange: function onPickerChange(e) {
            var _e$target = e.target,
              value = _e$target.value,
              label = _e$target.label;

            this.data.areaVisible = false;
            this.data.areaValue = value;
            this.data.areaText = label.join(' ');
          },
          onPickerClassiChange: function onPickerClassiChange(e) {
            var _e$target2 = e.target,
              value = _e$target2.value,
              label = _e$target2.label;

            this.data.ClassiVisible = false;
            this.data.ClassiValue = value;
            this.data.ClassiText = label.join(' ');
          },
          onPickerClassiCancel: function onPickerClassiCancel(e) {
            this.data.ClassiVisible = false;
          },
          onClassiPicker: function onClassiPicker() {
            this.data.ClassiVisible = true;
          },
          onPickerCancel: function onPickerCancel(e) {
            this.data.areaVisible = false;
          },
          onAreaPicker: function onAreaPicker() {
            this.data.areaVisible = true;
          }
        }
      });

      /***/
}),

/***/ 249:
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      var render = function () {
        var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h;
        return _c('div', [_c('t-row', {
          attrs: {
            "mpcomid": '0'
          }
        }, [_c('p', {
          staticStyle: {
            "padding-left": "10%",
            "font-size": "18px",
            "font-weight": "bold",
            "margin-top": "6%"
          }
        }, [_vm._v("\n          注册队伍信息\n        ")])], 1), _vm._v(" "), _c('t-row', {
          attrs: {
            "mpcomid": '1'
          }
        }, [_c('p', {
          staticStyle: {
            "padding-left": "11%",
            "font-size": "14px",
            "margin-top": "6%"
          }
        }, [_vm._v("\n          队伍名称\n        ")])], 1), _vm._v(" "), _c('t-input', {
          staticStyle: {
            "padding-left": "12%",
            "padding-right": "12%",
            "font-size": "13px",
            "margin-top": "1%"
          },
          attrs: {
            "value": _vm.show.name,
            "borderless": true,
            "eventid": '0',
            "mpcomid": '2'
          },
          on: {
            "change": _vm.changeName
          }
        }), _vm._v(" "), _c('div', {
          staticStyle: {
            "margin-left": "12%",
            "margin-right": "6%",
            "border-bottom": "1px solid #f2f2f2",
            "margin-bottom": "2%"
          }
        }), _vm._v(" "), _c('t-row', {
          attrs: {
            "mpcomid": '3'
          }
        }, [_c('p', {
          staticStyle: {
            "padding-left": "11%",
            "font-size": "14px",
            "margin-top": "6%"
          }
        }, [_vm._v("\n          队伍简介\n        ")])], 1), _vm._v(" "), _c('t-input', {
          staticStyle: {
            "padding-left": "12%",
            "padding-right": "12%",
            "font-size": "13px",
            "margin-top": "1%"
          },
          attrs: {
            "value": _vm.show.intro,
            "borderless": true,
            "eventid": '1',
            "mpcomid": '4'
          },
          on: {
            "change": _vm.changeIntro
          }
        }), _vm._v(" "), _c('div', {
          staticStyle: {
            "margin-left": "12%",
            "margin-right": "6%",
            "border-bottom": "1px solid #f2f2f2",
            "margin-bottom": "2%",
            "margin-top": "2%"
          }
        }), _vm._v(" "), _c('t-row', {
          staticStyle: {
            "align-items": "center"
          },
          attrs: {
            "mpcomid": '6'
          }
        }, [_c('p', {
          staticStyle: {
            "padding-left": "11%",
            "font-size": "14px",
            "margin-top": "6%"
          }
        }, [_vm._v("\n        队伍类别\n      ")]), _vm._v(" "), _c('t-button', {
          staticStyle: {
            "margin-right": "5%",
            "margin-left": "3%",
            "display": "inline-block",
            "margin-top": "6%"
          },
          attrs: {
            "size": "medium",
            "theme": "danger",
            "eventid": '2',
            "mpcomid": '5'
          },
          on: {
            "click": function ($event) {
              _vm.handlePopup()
            }
          }
        }, [_vm._v("请选择")])], 1), _vm._v(" "), _c('t-row', {
          staticStyle: {
            "padding-left": "7%",
            "font-size": "16px",
            "margin-top": "6%"
          },
          attrs: {
            "mpcomid": '10'
          }
        }, [_c('t-cell', {
          attrs: {
            "title": "所属院系",
            "arrow": "",
            "hover": "",
            "note": _vm.data.areaText,
            "eventid": '3',
            "mpcomid": '7'
          },
          on: {
            "click": _vm.onAreaPicker
          }
        }), _vm._v(" "), _c('t-picker', {
          attrs: {
            "visible": _vm.data.areaVisible,
            "value": _vm.data.areaValue,
            "cancelBtn": "取消",
            "confirmBtn": "确认",
            "usingCustomNavbar": "",
            "eventid": '4',
            "mpcomid": '9'
          },
          on: {
            "change": _vm.onPickerChange,
            "cancel": _vm.onPickerCancel
          }
        }, [_c('t-picker-item', {
          attrs: {
            "options": _vm.data.faculties,
            "mpcomid": '8'
          }
        })], 1)], 1), _vm._v(" "), _c('view', {
          staticClass: "allview",
          staticStyle: {
            "padding-left": "7%",
            "padding-right": "2%"
          }
        }, [_c('t-input', {
          attrs: {
            "label": "指导老师",
            "placeholder": "苏玉鑫",
            "align": "right",
            "value": _vm.data.selectedName,
            "suffixIcon": _vm.data.suffixIcon,
            "eventid": '5',
            "mpcomid": '11'
          },
          on: {
            "change": _vm.bindInput,
            "focus": _vm.bindNameFocus
          }
        })], 1), _vm._v(" "), (_vm.data.isSearchListShow) ? _c('view', {
          staticClass: "search-list-container"
        }, [_c('scroll-view', {
          staticClass: "search-list",
          attrs: {
            "scroll-y": ""
          }
        }, _vm._l((_vm.data.matchedNameList), function (item, index) {
          return _c('div', {
            key: item.name,
            staticClass: "search-list-item",
            attrs: {
              "eventid": '6_' + index
            },
            on: {
              "click": function ($event) {
                _vm.bindNameChange(item)
              }
            }
          }, [_vm._v("\n     " + _vm._s(item.name) + "\n  ")])
        }))], 1) : _vm._e(), _vm._v(" "), _c('t-row', {
          staticStyle: {
            "padding-left": "12%",
            "padding-right": "12%",
            "margin-top": "4%"
          },
          attrs: {
            "mpcomid": '12'
          }
        }, [_c('button', {
          staticClass: "red-button",
          attrs: {
            "eventid": '7'
          },
          on: {
            "click": _vm.AgreeAudit
          }
        }, [_vm._v("提交审核")])], 1), _vm._v(" "), _c('t-toast', {
          attrs: {
            "id": "t-toast",
            "mpcomid": '13'
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
          require("vue-hot-reload-api").rerender("data-v-62ba22b2", esExports)
        }
      }

      /***/
})

}, [245]);
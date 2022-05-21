"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/main.js?{"page":"pages%2FlivePush%2Findex"} ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uni-app-style */ 1);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var uni_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uni-polyfill */ 4);\n/* harmony import */ var uni_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_polyfill__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_livePush_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/livePush/index.nvue?mpType=page */ 5);\n\n        \n        \n        \n        \n        _pages_livePush_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mpType = 'page'\n        _pages_livePush_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].route = 'pages/livePush/index'\n        _pages_livePush_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].el = '#root'\n        new Vue(_pages_livePush_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n        //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsUUFBOEI7QUFDOUIsUUFBNkI7QUFDN0IsUUFBaUU7QUFDakUsUUFBUSw4RUFBRztBQUNYLFFBQVEsOEVBQUc7QUFDWCxRQUFRLDhFQUFHO0FBQ1gsZ0JBQWdCLDhFQUFHIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgICAgXG4gICAgICAgIGltcG9ydCAndW5pLWFwcC1zdHlsZSdcbiAgICAgICAgaW1wb3J0ICd1bmktcG9seWZpbGwnXG4gICAgICAgIGltcG9ydCBBcHAgZnJvbSAnLi9wYWdlcy9saXZlUHVzaC9pbmRleC5udnVlP21wVHlwZT1wYWdlJ1xuICAgICAgICBBcHAubXBUeXBlID0gJ3BhZ2UnXG4gICAgICAgIEFwcC5yb3V0ZSA9ICdwYWdlcy9saXZlUHVzaC9pbmRleCdcbiAgICAgICAgQXBwLmVsID0gJyNyb290J1xuICAgICAgICBuZXcgVnVlKEFwcClcbiAgICAgICAgIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!*******************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/main.js?{"type":"appStyle"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Vue.prototype.__$appStyle__ = {}\nVue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss */ 2).default,Vue.prototype.__$appStyle__)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsMkRBQTJELG1CQUFPLENBQUMsbURBQTRDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzXCIpLmRlZmF1bHQsVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!********************************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/App.vue?vue&type=style&index=0&lang=scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-0-1!./node_modules/postcss-loader/src??ref--10-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--10-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss */ 3);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_0_2_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_10_oneOf_0_3_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_0_4_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 3 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-0-1!./node_modules/postcss-loader/src??ref--10-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--10-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/Web Design/uni-app/first-app/App.vue?vue&type=style&index=0&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "@FONT-FACE": [
    {
      "fontFamily": "iconfont",
      "src": "url(data:font/woff;charset=utf-8;base64,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) format('woff')",
      "fontWeight": "400",
      "fontStyle": "normal",
      "fontDisplay": "swap"
    }
  ],
  ".iconfont": {
    "": {
      "fontFamily": [
        "\"iconfont\"",
        1,
        0,
        17
      ],
      "fontSize": [
        "16",
        0,
        0,
        17
      ],
      "fontStyle": [
        "normal",
        0,
        0,
        17
      ],
      "WebkitFontSmoothing": [
        "antialiased",
        0,
        0,
        17
      ],
      "MozOsxFontSmoothing": [
        "grayscale",
        0,
        0,
        17
      ]
    }
  },
  ".icon-discover": {
    "": {
      "content:before": [
        "\"\\e67e\"",
        0,
        0,
        18
      ]
    }
  },
  ".icon-discoverfill": {
    "": {
      "content:before": [
        "\"\\e6ba\"",
        0,
        0,
        19
      ]
    }
  },
  ".icon-md-contacts": {
    "": {
      "content:before": [
        "\"\\e7bb\"",
        0,
        0,
        20
      ]
    }
  },
  ".icon-chat1": {
    "": {
      "content:before": [
        "\"\\e946\"",
        0,
        0,
        21
      ]
    }
  },
  ".icon-md-contact": {
    "": {
      "content:before": [
        "\"\\e918\"",
        0,
        0,
        22
      ]
    }
  },
  ".icon-comments": {
    "": {
      "content:before": [
        "\"\\e69b\"",
        0,
        0,
        23
      ]
    }
  },
  ".icon-menu": {
    "": {
      "content:before": [
        "\"\\e623\"",
        0,
        0,
        24
      ]
    }
  },
  ".icon-like": {
    "": {
      "content:before": [
        "\"\\e79b\"",
        0,
        0,
        25
      ]
    }
  },
  ".icon-add1": {
    "": {
      "content:before": [
        "\"\\e6b9\"",
        0,
        0,
        26
      ]
    }
  },
  ".icon-camera": {
    "": {
      "content:before": [
        "\"\\e600\"",
        0,
        0,
        27
      ]
    }
  },
  ".icon-pen": {
    "": {
      "content:before": [
        "\"\\eb75\"",
        0,
        0,
        28
      ]
    }
  },
  ".icon-arrow-left": {
    "": {
      "content:before": [
        "\"\\e744\"",
        0,
        0,
        29
      ]
    }
  },
  ".icon-arrow-up": {
    "": {
      "content:before": [
        "\"\\e745\"",
        0,
        0,
        30
      ]
    }
  },
  ".icon-arrow-down": {
    "": {
      "content:before": [
        "\"\\e7b2\"",
        0,
        0,
        31
      ]
    }
  },
  ".icon-arrow-right": {
    "": {
      "content:before": [
        "\"\\e743\"",
        0,
        0,
        32
      ]
    }
  },
  ".icon-img": {
    "": {
      "content:before": [
        "\"\\e602\"",
        0,
        0,
        33
      ]
    }
  },
  ".icon-contacts": {
    "": {
      "content:before": [
        "\"\\e8ce\"",
        0,
        0,
        34
      ]
    }
  },
  ".icon-contact": {
    "": {
      "content:before": [
        "\"\\e763\"",
        0,
        0,
        35
      ]
    }
  },
  ".icon-contact1": {
    "": {
      "content:before": [
        "\"\\e644\"",
        0,
        0,
        36
      ]
    }
  },
  ".icon-close-bold": {
    "": {
      "content:before": [
        "\"\\e685\"",
        0,
        0,
        37
      ]
    }
  },
  ".icon-cc-chat": {
    "": {
      "content:before": [
        "\"\\e620\"",
        0,
        0,
        38
      ]
    }
  },
  ".icon-video": {
    "": {
      "content:before": [
        "\"\\e832\"",
        0,
        0,
        39
      ]
    }
  },
  ".icon-group": {
    "": {
      "content:before": [
        "\"\\e6a8\"",
        0,
        0,
        40
      ]
    }
  },
  ".icon-chat": {
    "": {
      "content:before": [
        "\"\\e66a\"",
        0,
        0,
        41
      ]
    }
  },
  ".icon-addfriends": {
    "": {
      "content:before": [
        "\"\\e609\"",
        0,
        0,
        42
      ]
    }
  },
  ".icon-video1": {
    "": {
      "content:before": [
        "\"\\e820\"",
        0,
        0,
        43
      ]
    }
  },
  ".icon-turnvoice": {
    "": {
      "content:before": [
        "\"\\e6a1\"",
        0,
        0,
        44
      ]
    }
  },
  ".icon-phone_down": {
    "": {
      "content:before": [
        "\"\\e721\"",
        0,
        0,
        45
      ]
    }
  },
  ".icon-ic_addfriend": {
    "": {
      "content:before": [
        "\"\\e60a\"",
        0,
        0,
        46
      ]
    }
  },
  ".icon-add": {
    "": {
      "content:before": [
        "\"\\e67b\"",
        0,
        0,
        47
      ]
    }
  },
  ".icon-icon-test": {
    "": {
      "content:before": [
        "\"\\e63c\"",
        0,
        0,
        48
      ]
    }
  },
  ".icon-icon-test1": {
    "": {
      "content:before": [
        "\"\\e63e\"",
        0,
        0,
        49
      ]
    }
  },
  ".icon-icon-test2": {
    "": {
      "content:before": [
        "\"\\e63f\"",
        0,
        0,
        50
      ]
    }
  },
  ".icon-icon-test3": {
    "": {
      "content:before": [
        "\"\\e640\"",
        0,
        0,
        51
      ]
    }
  },
  ".icon-voice": {
    "": {
      "content:before": [
        "\"\\e9c4\"",
        0,
        0,
        52
      ]
    }
  },
  ".header-wrap": {
    "": {
      "width": [
        100,
        0,
        0,
        61
      ],
      "height": [
        "88rpx",
        0,
        0,
        61
      ],
      "position": [
        "relative",
        0,
        0,
        61
      ]
    }
  },
  ".header": {
    ".header-wrap ": {
      "position": [
        "fixed",
        0,
        1,
        62
      ],
      "top": [
        0,
        0,
        1,
        62
      ],
      "textAlign": [
        "center",
        0,
        1,
        62
      ],
      "display": [
        "flex",
        0,
        1,
        62
      ],
      "height": [
        "88rpx",
        0,
        1,
        62
      ],
      "width": [
        100,
        0,
        1,
        62
      ],
      "backgroundColor": [
        "#ededed",
        0,
        1,
        62
      ],
      "zIndex": [
        10,
        0,
        1,
        62
      ]
    }
  },
  ".header-left": {
    ".header-wrap .header ": {
      "display": [
        "flex",
        0,
        2,
        63
      ],
      "alignItems": [
        "center",
        0,
        2,
        63
      ],
      "justifyContent": [
        "center",
        0,
        2,
        63
      ],
      "flexBasis": [
        "80rpx",
        0,
        2,
        63
      ]
    }
  },
  ".header-right": {
    ".header-wrap .header ": {
      "display": [
        "flex",
        0,
        2,
        63
      ],
      "alignItems": [
        "center",
        0,
        2,
        63
      ],
      "justifyContent": [
        "center",
        0,
        2,
        63
      ],
      "flexBasis": [
        "80rpx",
        0,
        2,
        63
      ]
    }
  },
  ".header-center": {
    ".header-wrap .header ": {
      "flexGrow": [
        1,
        0,
        2,
        64
      ]
    }
  },
  ".tabbarShadow": {
    "": {
      "position": [
        "fixed",
        0,
        0,
        66
      ],
      "width": [
        100,
        0,
        0,
        66
      ],
      "height": [
        "50",
        0,
        0,
        66
      ],
      "boxShadow": [
        "0px -1px 24px rgba(0, 0, 0, 0.06)",
        0,
        0,
        66
      ]
    }
  },
  "@VERSION": 2
}

/***/ }),
/* 4 */
/*!*******************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/lib/uni-polyfill.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  var global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}

/***/ }),
/* 5 */
/*!*****************************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/pages/livePush/index.nvue?mpType=page ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.nvue?vue&type=template&id=4e5e16cc&scoped=true&mpType=page */ 6);\n/* harmony import */ var _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.nvue?vue&type=script&lang=js&mpType=page */ 8);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      \n}\n\n/* normalize component */\n\nvar component = Object(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"4e5e16cc\",\n  \"6dceaada\",\n  false,\n  _index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"pages/livePush/index.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEk7QUFDMUk7QUFDcUU7QUFDTDtBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDZ0w7QUFDaEwsZ0JBQWdCLHlMQUFVO0FBQzFCLEVBQUUsdUZBQU07QUFDUixFQUFFLHdHQUFNO0FBQ1IsRUFBRSxpSEFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSw0R0FBVTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNlLGdGIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2luZGV4Lm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGU1ZTE2Y2Mmc2NvcGVkPXRydWUmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2luZGV4Lm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZXhwb3J0ICogZnJvbSBcIi4vaW5kZXgubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5mdW5jdGlvbiBpbmplY3RTdHlsZXMgKGNvbnRleHQpIHtcbiAgXG4gIGlmKCF0aGlzLm9wdGlvbnMuc3R5bGUpe1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHt9XG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUgJiYgVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKXtcbiAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXywgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgfVxuICAgICAgXG59XG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhRDpcXFxcSEJ1aWxkZXJYXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxccnVudGltZVxcXFxjb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0ZTVlMTZjY1wiLFxuICBcIjZkY2VhYWRhXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInBhZ2VzL2xpdmVQdXNoL2luZGV4Lm52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!***********************************************************************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/pages/livePush/index.nvue?vue&type=template&id=4e5e16cc&scoped=true&mpType=page ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.nvue?vue&type=template&id=4e5e16cc&scoped=true&mpType=page */ 7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_4e5e16cc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 7 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/Web Design/uni-app/first-app/pages/livePush/index.nvue?vue&type=template&id=4e5e16cc&scoped=true&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticStyle: { flexDirection: "column" },
      attrs: {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true"
      }
    },
    [
      _c(
        "view",
        [
          _c("live-pusher", {
            ref: "livePusher",
            staticClass: ["livePusher"],
            attrs: {
              id: "livePusher",
              url: _vm.url,
              mode: "SD",
              muted: false,
              enableCamera: true,
              autoFocus: true,
              beauty: 0,
              whiteness: "2",
              aspect: "9:16"
            },
            on: {
              statechange: _vm.statechange,
              netstatus: _vm.netstatus,
              error: _vm.error
            }
          }),
          _c("button", { staticClass: ["btn"], on: { click: _vm.start } }, [
            _vm._v("开始推流")
          ]),
          _c("button", { staticClass: ["btn"], on: { click: _vm.pause } }, [
            _vm._v("暂停推流")
          ]),
          _c("button", { staticClass: ["btn"], on: { click: _vm.resume } }, [
            _vm._v("resume")
          ]),
          _c("button", { staticClass: ["btn"], on: { click: _vm.stop } }, [
            _vm._v("停止推流")
          ]),
          _c("button", { staticClass: ["btn"], on: { click: _vm.snapshot } }, [
            _vm._v("快照")
          ]),
          _c(
            "button",
            { staticClass: ["btn"], on: { click: _vm.startPreview } },
            [_vm._v("开启摄像头预览")]
          ),
          _c(
            "button",
            { staticClass: ["btn"], on: { click: _vm.stopPreview } },
            [_vm._v("关闭摄像头预览")]
          ),
          _c(
            "button",
            { staticClass: ["btn"], on: { click: _vm.switchCamera } },
            [_vm._v("切换摄像头")]
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 8 */
/*!*****************************************************************************************************!*\
  !*** F:/Web Design/uni-app/first-app/pages/livePush/index.nvue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib??ref--5-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--5-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.nvue?vue&type=script&lang=js&mpType=page */ 9);\n/* harmony import */ var _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_D_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdkLENBQWdCLHlmQUFHLEVBQUMiLCJmaWxlIjoiOC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hRDpcXFxcSEJ1aWxkZXJYXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3JlZi0tNS0wIUQ6XFxcXEhCdWlsZGVyWFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNS0xIUQ6XFxcXEhCdWlsZGVyWFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9pbmRleC5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRDpcXFxcSEJ1aWxkZXJYXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3JlZi0tNS0wIUQ6XFxcXEhCdWlsZGVyWFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNS0xIUQ6XFxcXEhCdWlsZGVyWFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9pbmRleC5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8\n");

/***/ }),
/* 9 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--5-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!F:/Web Design/uni-app/first-app/pages/livePush/index.nvue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0; //\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\nvar _default =\n{\n  name: 'livePush',\n  data: function data() {\n    return {\n      url: \"rtmp://120.79.218.59/live/komi\" };\n\n\n  },\n  onReady: function onReady() {\n    // 注意：需要在onReady中 或 onLoad 延时\n    this.context = uni.createLivePusherContext(\"livePusher\", this);\n  },\n  methods: {\n    statechange: function statechange(e) {\n      __f__(\"log\", \"statechange:\" + JSON.stringify(e), \" at pages/livePush/index.nvue:37\");\n    },\n    netstatus: function netstatus(e) {\n      __f__(\"log\", \"netstatus:\" + JSON.stringify(e), \" at pages/livePush/index.nvue:40\");\n    },\n    error: function error(e) {\n      __f__(\"log\", \"error:\" + JSON.stringify(e), \" at pages/livePush/index.nvue:43\");\n    },\n    start: function start() {\n      this.context.start({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.start:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:48\");\n        },\n        fail: function fail(err) {\n          __f__(\"log\", 'fail', err.errMsg, \" at pages/livePush/index.nvue:51\");\n        } });\n\n    },\n    close: function close() {\n      this.context.close({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.close:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:58\");\n        } });\n\n    },\n    snapshot: function snapshot() {\n      this.context.snapshot({\n        success: function success(e) {\n          __f__(\"log\", JSON.stringify(e), \" at pages/livePush/index.nvue:65\");\n        } });\n\n    },\n    resume: function resume() {\n      this.context.resume({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.resume:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:72\");\n        } });\n\n    },\n    pause: function pause() {\n      this.context.pause({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.pause:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:79\");\n        } });\n\n    },\n    stop: function stop() {\n      this.context.stop({\n        success: function success(a) {\n          __f__(\"log\", JSON.stringify(a), \" at pages/livePush/index.nvue:86\");\n        } });\n\n    },\n    switchCamera: function switchCamera() {\n      this.context.switchCamera({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.switchCamera:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:93\");\n        } });\n\n    },\n    startPreview: function startPreview() {\n      this.context.startPreview({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.startPreview:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:100\");\n        } });\n\n    },\n    stopPreview: function stopPreview() {\n      this.context.stopPreview({\n        success: function success(a) {\n          __f__(\"log\", \"livePusher.stopPreview:\" + JSON.stringify(a), \" at pages/livePush/index.nvue:107\");\n        } });\n\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 10)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvbGl2ZVB1c2gvaW5kZXgubnZ1ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBO0FBQ0Esa0JBREE7QUFFQSxNQUZBLGtCQUVBO0FBQ0E7QUFDQSwyQ0FEQTs7O0FBSUEsR0FQQTtBQVFBLFNBUkEscUJBUUE7QUFDQTtBQUNBO0FBQ0EsR0FYQTtBQVlBO0FBQ0EsZUFEQSx1QkFDQSxDQURBLEVBQ0E7QUFDQTtBQUNBLEtBSEE7QUFJQSxhQUpBLHFCQUlBLENBSkEsRUFJQTtBQUNBO0FBQ0EsS0FOQTtBQU9BLFNBUEEsaUJBT0EsQ0FQQSxFQU9BO0FBQ0E7QUFDQSxLQVRBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUhBO0FBSUE7QUFDQTtBQUNBLFNBTkE7O0FBUUEsS0FuQkE7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQUtBLEtBMUJBO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FIQTs7QUFLQSxLQWpDQTtBQWtDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBSEE7O0FBS0EsS0F4Q0E7QUF5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQUtBLEtBL0NBO0FBZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FIQTs7QUFLQSxLQXREQTtBQXVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBSEE7O0FBS0EsS0E3REE7QUE4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQUtBLEtBcEVBO0FBcUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FIQTs7QUFLQSxLQTNFQSxFQVpBLEUiLCJmaWxlIjoiOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuXHQ8IS0tIFxyXG5cdFx06KeG6aKR5pa55qGI77yaXHJcblx0XHRcdOeUqOaIt+WPkei1t+WQju+8jOi/m+ihjOaOqOa1ge+8jOW5tuebkeWQrOWvueaWueaOpeWPl+inhumikeeahOS6i+S7tu+8jOmaj+WQjuS5n+aLieWPluWvueaWueeahOinhumikea1ge+8iOWvueaWueS5n+S8muaOqOa1ge+8iVxyXG5cdCAtLT5cclxuXHQgICAgPHZpZXc+XHJcblx0ICAgICAgICA8bGl2ZS1wdXNoZXIgaWQ9J2xpdmVQdXNoZXInIHJlZj1cImxpdmVQdXNoZXJcIiBjbGFzcz1cImxpdmVQdXNoZXJcIiA6dXJsPVwidXJsXCJcclxuXHQgICAgICAgIG1vZGU9XCJTRFwiIDptdXRlZD1cImZhbHNlXCIgOmVuYWJsZS1jYW1lcmE9XCJ0cnVlXCIgOmF1dG8tZm9jdXM9XCJ0cnVlXCIgOmJlYXV0eT1cIjBcIiB3aGl0ZW5lc3M9XCIyXCJcclxuXHQgICAgICAgIGFzcGVjdD1cIjk6MTZcIiBAc3RhdGVjaGFuZ2U9XCJzdGF0ZWNoYW5nZVwiIEBuZXRzdGF0dXM9XCJuZXRzdGF0dXNcIiBAZXJyb3IgPSBcImVycm9yXCJcclxuXHQgICAgICAgID48L2xpdmUtcHVzaGVyPlxyXG5cdCAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIEBjbGljaz1cInN0YXJ0XCI+5byA5aeL5o6o5rWBPC9idXR0b24+XHJcblx0ICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwicGF1c2VcIj7mmoLlgZzmjqjmtYE8L2J1dHRvbj5cclxuXHQgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJyZXN1bWVcIj5yZXN1bWU8L2J1dHRvbj5cclxuXHQgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJzdG9wXCI+5YGc5q2i5o6o5rWBPC9idXR0b24+XHJcblx0ICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgQGNsaWNrPVwic25hcHNob3RcIj7lv6vnhac8L2J1dHRvbj5cclxuXHQgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJzdGFydFByZXZpZXdcIj7lvIDlkK/mkYTlg4/lpLTpooTop4g8L2J1dHRvbj5cclxuXHQgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBAY2xpY2s9XCJzdG9wUHJldmlld1wiPuWFs+mXreaRhOWDj+WktOmihOiniDwvYnV0dG9uPlxyXG5cdCAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIEBjbGljaz1cInN3aXRjaENhbWVyYVwiPuWIh+aNouaRhOWDj+WktDwvYnV0dG9uPlxyXG5cdCAgICA8L3ZpZXc+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0bmFtZTogJ2xpdmVQdXNoJyxcclxuXHRkYXRhKCkge1xuXHRcdHJldHVybiB7XHJcblx0XHRcdHVybDogXCJydG1wOi8vMTIwLjc5LjIxOC41OS9saXZlL2tvbWlcIlxyXG5cdFx0fVxyXG5cdFx0XG4gICAgfSxcblx0b25SZWFkeSgpIHtcblx0XHQvLyDms6jmhI/vvJrpnIDopoHlnKhvblJlYWR55LitIOaIliBvbkxvYWQg5bu25pe2XG5cdFx0dGhpcy5jb250ZXh0ID0gdW5pLmNyZWF0ZUxpdmVQdXNoZXJDb250ZXh0KFwibGl2ZVB1c2hlclwiLCB0aGlzKTtcblx0fSxcblx0bWV0aG9kczoge1xuXHRcdHN0YXRlY2hhbmdlKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwic3RhdGVjaGFuZ2U6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XG5cdFx0fSxcblx0XHRuZXRzdGF0dXMoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJuZXRzdGF0dXM6XCIgKyBKU09OLnN0cmluZ2lmeShlKSk7XG5cdFx0fSxcblx0XHRlcnJvcihlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImVycm9yOlwiICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xuXHRcdH0sXG5cdFx0c3RhcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5jb250ZXh0LnN0YXJ0KHtcblx0XHRcdFx0c3VjY2VzczogKGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImxpdmVQdXNoZXIuc3RhcnQ6XCIgKyBKU09OLnN0cmluZ2lmeShhKSk7XG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbDogKGVycikgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZhaWwnLGVyci5lcnJNc2cpXHJcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQuY2xvc2Uoe1xuXHRcdFx0XHRzdWNjZXNzOiAoYSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibGl2ZVB1c2hlci5jbG9zZTpcIiArIEpTT04uc3RyaW5naWZ5KGEpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzbmFwc2hvdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQuc25hcHNob3Qoe1xuXHRcdFx0XHRzdWNjZXNzOiAoZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRyZXN1bWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5jb250ZXh0LnJlc3VtZSh7XG5cdFx0XHRcdHN1Y2Nlc3M6IChhKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJsaXZlUHVzaGVyLnJlc3VtZTpcIiArIEpTT04uc3RyaW5naWZ5KGEpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRwYXVzZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQucGF1c2Uoe1xuXHRcdFx0XHRzdWNjZXNzOiAoYSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibGl2ZVB1c2hlci5wYXVzZTpcIiArIEpTT04uc3RyaW5naWZ5KGEpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzdG9wOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY29udGV4dC5zdG9wKHtcblx0XHRcdFx0c3VjY2VzczogKGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0c3dpdGNoQ2FtZXJhOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY29udGV4dC5zd2l0Y2hDYW1lcmEoe1xuXHRcdFx0XHRzdWNjZXNzOiAoYSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibGl2ZVB1c2hlci5zd2l0Y2hDYW1lcmE6XCIgKyBKU09OLnN0cmluZ2lmeShhKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0c3RhcnRQcmV2aWV3OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY29udGV4dC5zdGFydFByZXZpZXcoe1xuXHRcdFx0XHRzdWNjZXNzOiAoYSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibGl2ZVB1c2hlci5zdGFydFByZXZpZXc6XCIgKyBKU09OLnN0cmluZ2lmeShhKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0c3RvcFByZXZpZXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5jb250ZXh0LnN0b3BQcmV2aWV3KHtcblx0XHRcdFx0c3VjY2VzczogKGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImxpdmVQdXNoZXIuc3RvcFByZXZpZXc6XCIgKyBKU09OLnN0cmluZ2lmeShhKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXHJcblx0XHRcblx0fVxyXG59O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///9\n");

/***/ }),
/* 10 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.log = log;exports.default = formatLog;function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}

function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}

function jsonStringifyReplacer(k, p) {
  switch (typof(p)) {
    case 'Function':
      return 'function() { [native code] }';
    default:
      return p;}

}

function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}

function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v, jsonStringifyReplacer) + '---END:JSON---';
      } catch (e) {
        v = type;
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }

    return v;
  });
  var msg = '';

  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }

  console[type](msg);
}

/***/ }),
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);
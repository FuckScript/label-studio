(self["webpackChunk_heartexlabs_datamanager"] = self["webpackChunk_heartexlabs_datamanager"] || []).push([["src_dev_js"],{

/***/ "./src/dev.js":
/*!********************!*\
  !*** ./src/dev.js ***!
  \********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initDevApp": function() { return /* binding */ initDevApp; }
/* harmony export */ });
/* harmony import */ var _components_Common_Button_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Common/Button/Button */ "./src/components/Common/Button/Button.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const API_GATEWAY = "http://127.0.0.1:8080/api/dm";
const LS_ACCESS_TOKEN = "53df17a080beb32d6fec0a9a52b3f06abd055909";
/**
 * @param {import("../src/sdk/dm-sdk").DataManager} DataManager
 */

const initDevApp = async DataManager => {
  const gatewayAPI = API_GATEWAY !== null && API_GATEWAY !== void 0 ? API_GATEWAY : "http://localhost:8081/api/dm";
  const useExternalSource = !!gatewayAPI;
  const dm = new DataManager({
    root: document.getElementById("app"),
    toolbar: "actions columns filters ordering review-button label-button loading-possum error-box | refresh view-toggle",
    apiGateway: gatewayAPI,
    apiVersion: 2,
    apiMockDisabled: useExternalSource,
    apiHeaders: {
      Authorization: `Token ${LS_ACCESS_TOKEN}`
    },
    interfaces: {
      groundTruth: true
    },
    labelStudio: {
      user: {
        pk: 1,
        firstName: "James",
        lastName: "Dean"
      }
    },
    table: {
      hiddenColumns: {
        explore: ["tasks:completed_at", "tasks:data"]
      },
      visibleColumns: {
        labeling: ["tasks:id", "tasks:was_cancelled", "tasks:data.image", "tasks:data.text", "annotations:id", "annotations:task_id"]
      }
    },
    instruments: {
      'review-button': () => {
        return () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components_Common_Button_Button__WEBPACK_IMPORTED_MODULE_0__.Button, {
          style: {
            width: 105
          },
          children: "Review"
        });
      }
    }
  });
  dm.on("lsf:groundTruth", () => {
    console.log('lsf ground truth set');
  });
  dm.on("taskSelected", () => {
    console.log('task selected');
  });
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(API_GATEWAY, "API_GATEWAY", "E:\\cjd\\dm2\\src\\dev.js");
  reactHotLoader.register(LS_ACCESS_TOKEN, "LS_ACCESS_TOKEN", "E:\\cjd\\dm2\\src\\dev.js");
  reactHotLoader.register(initDevApp, "initDevApp", "E:\\cjd\\dm2\\src\\dev.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ })

}]);
//# sourceMappingURL=src_dev_js.chunk.js.map
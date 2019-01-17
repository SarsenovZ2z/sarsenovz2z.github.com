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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/helpers.js":
/*!***********************!*\
  !*** ./js/helpers.js ***!
  \***********************/
/*! exports provided: notify, resize, rand, loadShaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notify\", function() { return notify; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resize\", function() { return resize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rand\", function() { return rand; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadShaders\", function() { return loadShaders; });\nfunction notify(message, type='info') {\n    // TODO: use toaster;\n    alert(message);\n}\n\nfunction resize(canvas) {\n    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight)\n    {\n        canvas.width = canvas.clientWidth;\n        canvas.height = canvas.clientHeight;\n        return true;\n    }\n    return false;\n}\n\nfunction rand(min=0, max=1, decimal = false) {\n    if (decimal) {\n        return Math.round(Math.random() * (max - min)) + min;\n    }\n    return Math.random() * (max - min) + min;\n}\n\nfunction loadResource(url, method='GET') {\n    return new Promise(function(resolve, reject) {\n        var request = new XMLHttpRequest();\n        request.open(method, url);\n        request.onload = function() {\n            if (request.status >= 200 && request.status<300) {\n                resolve(request.responseText);\n            }\n            else {\n                reject(\"Resource loading error! Http status: \" + request.status + \". URL: \" + url);\n            }\n        }\n        request.send();\n    });\n}\n\nfunction loadShader(name, callback) {\n    loadResource('shaders/' + name + '.glsl')\n    .then(callback)\n    .catch(function(error) {\n        notify('Error with loading resource. See console');\n        console.error(error);\n    });\n\n}\n\nfunction loadShaders(names, callback) {\n    return new Promise(function(resolve, reject) {\n        var shaders = [];\n        names.forEach(function(name, index) {\n            loadShader(name, function(result) {\n                shaders[name] = result;\n                if (index==names.length-1)\n                {\n                    callback(shaders);\n                }\n            });\n        });\n    });\n}\n\n\n//# sourceURL=webpack:///./js/helpers.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./js/helpers.js\");\n\n\n//\n// Global Variables\n//\nvar gl;\n\n//\n// Event Listeners\n//\nwindow.addEventListener(\"DOMContentLoaded\", init);\n\n//\n//  Event Handlers\n//\nfunction init() {\n    gl = document.getElementById(\"c\").getContext('webgl');\n    if (!gl) {\n        _helpers__WEBPACK_IMPORTED_MODULE_0__[\"notify\"](\"Your browser doesn't support WebGL!\");\n        return;\n    }\n\n    if (_helpers__WEBPACK_IMPORTED_MODULE_0__[\"resize\"](gl.canvas)) {\n        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n    }\n\n    _helpers__WEBPACK_IMPORTED_MODULE_0__[\"loadShaders\"](['vertexShader', 'fragmentShader'], main);\n}\n\n//\n// Functions\n//\nfunction main(shaders) {\n    var vertexShader = gl.createShader(gl.VERTEX_SHADER);\n    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\n\n    gl.shaderSource(vertexShader, shaders['vertexShader']);\n    gl.shaderSource(fragmentShader, shaders['fragmentShader']);\n\n\n\n    gl.compileShader(vertexShader);\n    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))\n    {\n        _helpers__WEBPACK_IMPORTED_MODULE_0__[\"notify\"]('Shader compilation error!');\n        console.error('ShaderError: ' + gl.getShaderInfoLog(vertexShader));\n        return;\n    }\n\n    gl.compileShader(fragmentShader);\n    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))\n    {\n        _helpers__WEBPACK_IMPORTED_MODULE_0__[\"notify\"]('Shader compilation error!');\n        console.error('ShaderError: ' + gl.getShaderInfoLog(fragmentShader));\n        return;\n    }\n\n    var program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n\n    gl.linkProgram(program);\n    gl.validateProgram(program);\n\n    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {\n        _helpers__WEBPACK_IMPORTED_MODULE_0__[\"notify\"]('Error validating program');\n        console.error(\"Program validation error: \" + gl.getProgramInfoLog(program));\n        return;\n    }\n\n    var vertexBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\n\n    var vertexArray = [\n        0.0, 0.5,\n        0.5, -0.5,\n        -0.5, -0.5,\n    ];\n\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);\n\n    var positionAttributeLocation = gl.getAttribLocation(program, 'vertexPosition');\n\n    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, gl.FALSE, 2*Float32Array.BYTES_PER_ELEMENT, 0*Float32Array.BYTES_PER_ELEMENT);\n\n    gl.enableVertexAttribArray(positionAttributeLocation);\n\n    gl.clearColor(0.75, 0.9, 0.1, 1.0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.useProgram(program);\n    gl.drawArrays(gl.TRIANGLES, 0, 3);\n\n}\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ });
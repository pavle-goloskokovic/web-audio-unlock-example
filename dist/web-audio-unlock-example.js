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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var web_audio_unlock_1 = __webpack_require__(1);
var ui_1 = __webpack_require__(2);
var AudioContext = window.AudioContext || window.webkitAudioContext;
if (!AudioContext) {
    ui_1.printError('Seems like Web Audio API is not supported here :(');
}
else {
    var loaded_1 = false;
    var locked_1 = true;
    var userUnlocked_1 = false;
    var errored_1 = false;
    var context_1 = new AudioContext();
    web_audio_unlock_1.default(context_1).then(function (unlocked) {
        if (errored_1) {
            return;
        }
        locked_1 = false;
        userUnlocked_1 = unlocked;
        if (userUnlocked_1) {
            if (loaded_1) {
                ui_1.setMessage('message', 'there');
                ui_1.setMessage('status', 'playing');
            }
            else {
                ui_1.setMessage('message', 'abit');
            }
        }
        else {
            ui_1.setMessage('message', 'fine');
        }
    }, function (reason) {
        errored_1 = true;
        ui_1.printError(reason);
    });
    var request_1 = new XMLHttpRequest();
    request_1.open('GET', 'assets/audio/3667624464.mp3', true);
    request_1.responseType = 'arraybuffer';
    request_1.onload = function () {
        if (errored_1) {
            return;
        }
        ui_1.setMessage('status', 'decoding');
        context_1.decodeAudioData(request_1.response, function (buffer) {
            if (errored_1) {
                return;
            }
            var source = context_1.createBufferSource();
            source.buffer = buffer;
            source.connect(context_1.destination);
            source.start();
            loaded_1 = true;
            if (locked_1) {
                ui_1.setMessage('status', 'waiting');
            }
            else {
                if (userUnlocked_1) {
                    ui_1.setMessage('message', 'there');
                }
                ui_1.setMessage('status', 'playing');
            }
        }, function (e) {
            errored_1 = true;
            ui_1.printError(e);
        });
    };
    request_1.send();
    window.onblur = function () {
        if (!locked_1) {
            context_1.suspend();
        }
    };
    window.onfocus = function () {
        if (!locked_1) {
            context_1.resume();
        }
    };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return r; });
var n=["pointerdown","pointerup","touchstart","touchend","mousedown","mouseup","click","keydown"],t={capture:!0,passive:!0};function e(n){return!!n&&typeof n.resume=="function"&&typeof n.createBufferSource=="function"&&typeof n.state=="string"}function o(n){var t=n.createBufferSource();t.buffer=n.createBuffer(1,1,22050),t.connect(n.destination),t.onended=function(){t.disconnect()},typeof t.start=="function"?t.start(0):typeof t.noteOn=="function"&&t.noteOn(0)}function r(r){return new Promise(function(u,i){if(!r||!e(r)){i(new Error("webAudioUnlock: invalid AudioContext"));return}if(r.state==="running"){u(!1);return}var c=function e(e){var o=e+"EventListener";for(var r=0;r<n.length;r++)document[o](n[r],a,t)},f=!1,a=function n(){f||(f=!0,o(r),r.resume().then(function(){if(r.state==="running"){c("remove"),u(!0);return}f=!1}).catch(function(){f=!1}))};c("add")})}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var positionFooter = function () {
    var pre = document.getElementsByTagName('pre')[0];
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};
exports.hideFooter = function () {
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'none';
};
exports.setMessage = function (id, key) {
    var messages = {
        tap: "Interact with the page to unlock...",
        loading: "Loading audio...",
        there: "There you go!",
        playing: "Playing sweet, sweet music!",
        abit: "Just a bit more...",
        fine: "You're fine here,\ntry on another device.",
        decoding: "Decoding audio...",
        waiting: "Waiting for unlock gesture..."
    };
    var element = document.getElementById(id);
    element.textContent = messages[key];
    positionFooter();
};
exports.setMessage('message', 'tap');
exports.setMessage('status', 'loading');
var resizeErrors = function () {
    var row = document.getElementById('row');
    var errors = document.getElementsByClassName('error-message');
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.width = (row.offsetWidth * 0.7) + 'px';
    }
};
exports.printError = function (error) {
    var message = document.getElementById('message');
    message.innerHTML = "<span class=\"error\">ERROR!</span><br><br><span class=\"error-message\">" + error + "</span>";
    var status = document.getElementById('status');
    status.innerHTML = "<span class=\"error-message\">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href=\"https://github.com/pavle-goloskokovic/web-audio-unlock/issues\">here</a>, and we'll try to sort it out.</span>";
    resizeErrors();
    exports.hideFooter();
};
window.onload = window.onresize = function (e) {
    var row = document.getElementById('row');
    var scale = 1;
    if (window.innerWidth <= 450) {
        var margin = 8;
        scale = window.innerWidth / (row.offsetWidth + 2 * margin);
    }
    document.body.style.fontSize = scale + "em";
    resizeErrors();
    positionFooter();
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzc1OGI4MGFhOTQwOTBhZmFhZGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdW5sb2NrL2Rpc3QvaW5kZXgubWluLm1qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDN0RBLGdEQUE4QztBQUM5QyxrQ0FBOEM7QUFFOUMsSUFBSSxZQUFZLEdBQVMsTUFBTyxDQUFDLFlBQVksSUFBVSxNQUFPLENBQUMsa0JBQWtCLENBQUM7QUFFbEYsSUFBRyxDQUFDLFlBQVksRUFDaEI7SUFDSSxlQUFVLENBQUMsbURBQW1ELENBQUMsQ0FBQztDQUNuRTtLQUVEO0lBQ0ksSUFBSSxRQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLElBQUksUUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLGNBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsSUFBSSxTQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLElBQUksU0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakMsMEJBQWMsQ0FBQyxTQUFPLENBQUMsQ0FBQyxJQUFJLENB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RCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQU0sS0FBSyxPQUFJLENBQUM7SUFFNUMsWUFBWSxFQUFFLENBQUM7SUFFZixjQUFjLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUMiLCJmaWxlIjoid2ViLWF1ZGlvLXVubG9jay1leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzc1OGI4MGFhOTQwOTBhZmFhZGQiLCJpbXBvcnQgd2ViQXVkaW9VbmxvY2sgZnJvbSAnd2ViLWF1ZGlvLXVubG9jayc7XHJcbmltcG9ydCB7IHByaW50RXJyb3IsIHNldE1lc3NhZ2UgfSBmcm9tICcuL3VpJztcclxuXHJcbmxldCBBdWRpb0NvbnRleHQgPSAoPGFueT53aW5kb3cpLkF1ZGlvQ29udGV4dCB8fCAoPGFueT53aW5kb3cpLndlYmtpdEF1ZGlvQ29udGV4dDtcclxuXHJcbmlmKCFBdWRpb0NvbnRleHQpXHJcbntcclxuICAgIHByaW50RXJyb3IoJ1NlZW1zIGxpa2UgV2ViIEF1ZGlvIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGhlcmUgOignKTtcclxufVxyXG5lbHNlXHJcbntcclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCBsb2NrZWQgPSB0cnVlO1xyXG4gICAgbGV0IHVzZXJVbmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGVycm9yZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuXHJcbiAgICB3ZWJBdWRpb1VubG9jayhjb250ZXh0KS50aGVuKCh1bmxvY2tlZDogYm9vbGVhbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9yZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVzZXJVbmxvY2tlZCA9IHVubG9ja2VkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVzZXJVbmxvY2tlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RoZXJlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdhYml0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ2ZpbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKHJlYXNvbjogYW55KSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBwcmludEVycm9yKHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCAnYXNzZXRzL2F1ZGlvLzM2Njc2MjQ0NjQubXAzJywgdHJ1ZSk7XHJcbiAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICByZXF1ZXN0Lm9ubG9hZCA9ICgpID0+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGVycm9yZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnZGVjb2RpbmcnKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3dhaXRpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlclVubG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0aGVyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGU6IEVycm9yRXZlbnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmludEVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcbiAgICByZXF1ZXN0LnNlbmQoKTtcclxuXHJcbiAgICB3aW5kb3cub25ibHVyID0gKCkgPT5cclxuICAgIHtcclxuICAgICAgICBpZiAoIWxvY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc3VzcGVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93Lm9uZm9jdXMgPSAoKSA9PlxyXG4gICAge1xyXG4gICAgICAgIGlmICghbG9ja2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsInZhciBuPVtcInBvaW50ZXJkb3duXCIsXCJwb2ludGVydXBcIixcInRvdWNoc3RhcnRcIixcInRvdWNoZW5kXCIsXCJtb3VzZWRvd25cIixcIm1vdXNldXBcIixcImNsaWNrXCIsXCJrZXlkb3duXCJdLHQ9e2NhcHR1cmU6ITAscGFzc2l2ZTohMH07ZnVuY3Rpb24gZShuKXtyZXR1cm4hIW4mJnR5cGVvZiBuLnJlc3VtZT09XCJmdW5jdGlvblwiJiZ0eXBlb2Ygbi5jcmVhdGVCdWZmZXJTb3VyY2U9PVwiZnVuY3Rpb25cIiYmdHlwZW9mIG4uc3RhdGU9PVwic3RyaW5nXCJ9ZnVuY3Rpb24gbyhuKXt2YXIgdD1uLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPW4uY3JlYXRlQnVmZmVyKDEsMSwyMjA1MCksdC5jb25uZWN0KG4uZGVzdGluYXRpb24pLHQub25lbmRlZD1mdW5jdGlvbigpe3QuZGlzY29ubmVjdCgpfSx0eXBlb2YgdC5zdGFydD09XCJmdW5jdGlvblwiP3Quc3RhcnQoMCk6dHlwZW9mIHQubm90ZU9uPT1cImZ1bmN0aW9uXCImJnQubm90ZU9uKDApfWZ1bmN0aW9uIHIocil7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHUsaSl7aWYoIXJ8fCFlKHIpKXtpKG5ldyBFcnJvcihcIndlYkF1ZGlvVW5sb2NrOiBpbnZhbGlkIEF1ZGlvQ29udGV4dFwiKSk7cmV0dXJufWlmKHIuc3RhdGU9PT1cInJ1bm5pbmdcIil7dSghMSk7cmV0dXJufXZhciBjPWZ1bmN0aW9uIGUoZSl7dmFyIG89ZStcIkV2ZW50TGlzdGVuZXJcIjtmb3IodmFyIHI9MDtyPG4ubGVuZ3RoO3IrKylkb2N1bWVudFtvXShuW3JdLGEsdCl9LGY9ITEsYT1mdW5jdGlvbiBuKCl7Znx8KGY9ITAsbyhyKSxyLnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24oKXtpZihyLnN0YXRlPT09XCJydW5uaW5nXCIpe2MoXCJyZW1vdmVcIiksdSghMCk7cmV0dXJufWY9ITF9KS5jYXRjaChmdW5jdGlvbigpe2Y9ITF9KSl9O2MoXCJhZGRcIil9KX1leHBvcnR7ciBhcyBkZWZhdWx0fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdW5sb2NrL2Rpc3QvaW5kZXgubWluLm1qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgcG9zaXRpb25Gb290ZXIgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdO1xyXG4gICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb290ZXInKVswXTtcclxuXHJcbiAgICBmb290ZXIuc3R5bGUuYm90dG9tID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gcHJlLm9mZnNldEhlaWdodCwgMCkgKyAncHgnO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBoaWRlRm9vdGVyID0gKCkgPT5cclxue1xyXG4gICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb290ZXInKVswXTtcclxuICAgIGZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBzZXRNZXNzYWdlID0gKGlkOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PlxyXG57XHJcbiAgICBsZXQgbWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgdGFwOiAgICAgIGBJbnRlcmFjdCB3aXRoIHRoZSBwYWdlIHRvIHVubG9jay4uLmAsXHJcbiAgICAgICAgbG9hZGluZzogIGBMb2FkaW5nIGF1ZGlvLi4uYCxcclxuICAgICAgICB0aGVyZTogICAgYFRoZXJlIHlvdSBnbyFgLFxyXG4gICAgICAgIHBsYXlpbmc6ICBgUGxheWluZyBzd2VldCwgc3dlZXQgbXVzaWMhYCxcclxuICAgICAgICBhYml0OiAgICAgYEp1c3QgYSBiaXQgbW9yZS4uLmAsXHJcbiAgICAgICAgZmluZTogICAgIGBZb3UncmUgZmluZSBoZXJlLFxcbnRyeSBvbiBhbm90aGVyIGRldmljZS5gLFxyXG4gICAgICAgIGRlY29kaW5nOiBgRGVjb2RpbmcgYXVkaW8uLi5gLFxyXG4gICAgICAgIHdhaXRpbmc6ICBgV2FpdGluZyBmb3IgdW5sb2NrIGdlc3R1cmUuLi5gXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlc1trZXldO1xyXG5cclxuICAgIHBvc2l0aW9uRm9vdGVyKCk7XHJcbn07XHJcblxyXG5zZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RhcCcpO1xyXG5zZXRNZXNzYWdlKCdzdGF0dXMnLCAnbG9hZGluZycpO1xyXG5cclxubGV0IHJlc2l6ZUVycm9ycyA9ICgpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IGVycm9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Vycm9yLW1lc3NhZ2UnKTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8ZXJyb3JzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+ZXJyb3JzW2ldKS5zdHlsZS53aWR0aCA9IChyb3cub2Zmc2V0V2lkdGggKiAwLjcpICsgJ3B4JztcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBsZXQgcHJpbnRFcnJvciA9IChlcnJvcjogYW55KSA9PlxyXG57XHJcbiAgICBsZXQgbWVzc2FnZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xyXG4gICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJlcnJvclwiPkVSUk9SITwvc3Bhbj48YnI+PGJyPjxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7ZXJyb3J9PC9zcGFuPmA7XHJcblxyXG4gICAgbGV0IHN0YXR1cyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICBzdGF0dXMuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlNlZW1zIGxpa2UgdGhpcyBhcHByb2FjaCBjYW4ndCBiZSB1c2VkIHdpdGggY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiBXZWIgQXVkaW8gQVBJLiBXZSdyZSBzb3JyeSBhYm91dCB0aGF0LCBob3dldmVyIHlvdSBjYW4gb3BlbiBhbiBpc3N1ZSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3BhdmxlLWdvbG9za29rb3ZpYy93ZWItYXVkaW8tdW5sb2NrL2lzc3Vlc1wiPmhlcmU8L2E+LCBhbmQgd2UnbGwgdHJ5IHRvIHNvcnQgaXQgb3V0Ljwvc3Bhbj5gO1xyXG5cclxuICAgIHJlc2l6ZUVycm9ycygpO1xyXG5cclxuICAgIGhpZGVGb290ZXIoKTtcclxufTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSB3aW5kb3cub25yZXNpemUgPSAoZTogRXZlbnQpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IHNjYWxlID0gMTtcclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNDUwKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXJnaW4gPSA4O1xyXG4gICAgICAgIHNjYWxlID0gd2luZG93LmlubmVyV2lkdGggLyAocm93Lm9mZnNldFdpZHRoICsgMiptYXJnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtzY2FsZX1lbWA7XHJcblxyXG4gICAgcmVzaXplRXJyb3JzKCk7XHJcblxyXG4gICAgcG9zaXRpb25Gb290ZXIoKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==
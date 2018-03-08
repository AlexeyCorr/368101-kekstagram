'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var lastTimeout = null;

  window.util = {
    getRandomValue: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    removeClass: function (element, className) {
      element.classList.remove(className);
    },

    addClass: function (element, className) {
      element.classList.add(className);
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    delElemTimeout: function (element, field, time) {
      setTimeout(function () {
        if (element) {
          document.querySelector(field).removeChild(element);
        }
      }, time);
    },
    debounce: function (callback, timeout) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, timeout);
    }
  };
})();

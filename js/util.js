'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    // Получение случайного значения
    getRandomValue: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    // Удаление класса у элемента
    removeClass: function (element, className) {
      element.classList.remove(className);
    },

    // Добавляет класс элементу
    addClass: function (element, className) {
      element.classList.add(className);
    },

    // Выполнить какое-то действие при нажатии на ESC
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    // Выполнить какое-то действие при нажатии на ENTER
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();

'use strict';

(function () {
  var RESIZE_STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;

  var resizeValueField = document.querySelector('.upload-resize-controls-value');

  var resizePhoto = function (photo) {
    var currentValue = parseInt(resizeValueField.value, 10);
    var scale = currentValue / 100;
    photo.style.transform = 'scale(' + scale + ')';
  };

  var increasePhoto = function (photo) {
    var currentValue = parseInt(resizeValueField.value, 10);
    if (currentValue < RESIZE_MAX) {
      resizeValueField.value = currentValue + RESIZE_STEP + '%';
      resizePhoto(photo);
    }
    return currentValue;
  };

  var decreasePhoto = function (photo) {
    var currentValue = parseInt(resizeValueField.value, 10);
    if (currentValue > RESIZE_MIN) {
      resizeValueField.value = currentValue - RESIZE_STEP + '%';
      resizePhoto(photo);
    }
    return currentValue;
  };

  var onResizeClick = function (evt, photo) {
    var currentTarget = evt.target;
    if (currentTarget.classList.contains('upload-resize-controls-button-dec')) {
      decreasePhoto(photo);
    }
    if (currentTarget.classList.contains('upload-resize-controls-button-inc')) {
      increasePhoto(photo);
    }
  };

  window.resize = {
    photo: onResizeClick
  };
})();

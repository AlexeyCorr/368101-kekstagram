'use strict';

(function () {
  var MAX_VALUE_FILTERS = {
    'effect-chrome': 1,
    'effect-sepia': 1,
    'effect-marvin': 100,
    'effect-phobos': 3,
    'effect-heat': 3
  };
  var LOCATION_X = {
    MIN: 0,
    MAX: 100
  };
  var pictureReview = document.querySelector('.effect-image-preview');
  var resizeField = document.querySelector('.upload-resize-controls');
  var effectControlsField = document.querySelector('.upload-effect-controls');
  var scaleField = effectControlsField.querySelector('.upload-effect-level');
  var effectControlLine = scaleField.querySelector('.upload-effect-level-line');
  var effectControlPin = scaleField.querySelector('.upload-effect-level-pin');
  var effectControlVal = scaleField.querySelector('.upload-effect-level-val');

  var onChangeEffect = function (evt, photo) {
    var targetInput = evt.target.closest('input[type=radio]');
    photo.classList.remove(photo.classList[1]);
    photo.style.filter = '';

    if (targetInput) {
      if (targetInput.value === 'none') {
        window.util.addClass(scaleField, 'hidden');
      } else {
        window.util.removeClass(scaleField, 'hidden');
        effectControlPin.style.left = '100%';
        effectControlVal.style.width = '100%';
      }
      photo.classList.add('effect-' + targetInput.value + '');
    }
  };

  // ========FILTERS=========
  effectControlsField.addEventListener('change', function (evt) {
    onChangeEffect(evt, pictureReview);
  });

  // ========RESIZE=========
  resizeField.addEventListener('click', function (evt) {
    window.resize(evt, pictureReview);
  });

  var resetEffects = function () {
    pictureReview.classList.remove(pictureReview.classList[1]);
    pictureReview.style.filter = '';
    window.util.addClass(scaleField, 'hidden');
  };

  var filters = {
    'effect-chrome': function (value) {
      return 'grayscale(' + value.toFixed(1) + ')';
    },
    'effect-sepia': function (value) {
      return 'sepia(' + value.toFixed(1) + ')';
    },
    'effect-marvin': function (value) {
      return 'invert(' + value.toFixed(1) + '%)';
    },
    'effect-phobos': function (value) {
      return 'blur(' + value.toFixed(1) + 'px)';
    },
    'effect-heat': function (value) {
      return 'brightness(' + value.toFixed(1) + ')';
    },
  };
  effectControlPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;
      var fullWidth = effectControlLine.getBoundingClientRect().width;
      var currentCoordsX = ((effectControlPin.offsetLeft - shiftX) / fullWidth) * 100;
      startCoordsX = moveEvt.clientX;

      if (currentCoordsX > LOCATION_X.MAX) {
        currentCoordsX = effectControlPin.style.left;
      } else if (currentCoordsX < LOCATION_X.MIN) {
        currentCoordsX = effectControlPin.style.left;
      }

      effectControlPin.style.left = currentCoordsX + '%';
      effectControlVal.style.width = currentCoordsX + '%';

      var userFilter = pictureReview.classList[1];
      var userValue = (MAX_VALUE_FILTERS[userFilter] * currentCoordsX) / 100;
      pictureReview.style.filter = filters[userFilter](userValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.effects = {
    reset: resetEffects
  };
})();

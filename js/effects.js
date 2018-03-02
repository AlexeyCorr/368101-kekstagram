'use strict';

(function () {
  var MAX_VALUE_FILTERS = {
    'effect-chrome': 1,
    'effect-sepia': 1,
    'effect-marvin': 100,
    'effect-phobos': 3,
    'effect-heat': 3
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
    window.resize.photo(evt, pictureReview);
  });

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

  effectControlLine.addEventListener('mouseup', function (evt) {
    var clientX = evt.clientX;
    var valueLineX = effectControlLine.getBoundingClientRect().left;
    var valueWidth = effectControlLine.getBoundingClientRect().width;
    var userPercent = (100 * (clientX - valueLineX)) / valueWidth;
    if (clientX >= valueLineX && clientX <= valueLineX + valueWidth) {
      effectControlPin.style.left = userPercent + '%';
      effectControlVal.style.width = userPercent + '%';
    }
    var userFilter = pictureReview.classList[1];
    var userValue = (MAX_VALUE_FILTERS[userFilter] * (clientX - valueLineX) / valueWidth);
    pictureReview.style.filter = filters[userFilter](userValue);
  });
})();

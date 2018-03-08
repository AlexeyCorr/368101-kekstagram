'use strict';

(function () {
  var LOCATION_X = {
    MIN: 0,
    MAX: 100
  };

  var initSlider = function (scale, handler, value, action) {
    handler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoordsX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shiftX = startCoordsX - moveEvt.clientX;
        var fullWidth = scale.getBoundingClientRect().width;
        var currentCoordsX = ((handler.offsetLeft - shiftX) / fullWidth) * 100;
        startCoordsX = moveEvt.clientX;

        if (currentCoordsX > LOCATION_X.MAX) {
          currentCoordsX = handler.style.left;
        } else if (currentCoordsX < LOCATION_X.MIN) {
          currentCoordsX = handler.style.left;
        }

        handler.style.left = currentCoordsX + '%';
        value.style.width = currentCoordsX + '%';

        action(currentCoordsX);

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.initSlider = initSlider;
})();

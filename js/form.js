'use strict';

(function () {

  var uploadForm = document.querySelector('.upload-form');
  var uploadField = uploadForm.querySelector('#upload-file');
  var filterForm = uploadForm.querySelector('.upload-overlay');
  var buttonClose = filterForm.querySelector('.upload-form-cancel');

  var onUploadEscKeydown = function (evt) {
    window.util.isEscEvent(evt, onButtonClose);
  };

  var onInputChange = function (evt) {
    evt.preventDefault();
    window.util.removeClass(filterForm, 'hidden');
    document.addEventListener('keydown', onUploadEscKeydown);
    buttonClose.addEventListener('keydown', function () {
      window.util.isEnterEvent(evt, onButtonClose);
    });
  };
  uploadField.addEventListener('change', onInputChange);

  var onButtonClose = function () {
    window.util.addClass(filterForm, 'hidden');
    uploadForm.reset();
    document.removeEventListener('keydown', onUploadEscKeydown);
  };
  buttonClose.addEventListener('click', onButtonClose);

  // =========ОТПРАВКА ФОРМЫ=======
  uploadForm.addEventListener('sibmit', function (evt) {
    evt.preventDefault();
  });
})();

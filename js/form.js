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
    window.util.removeClass(filterForm, 'hidden');
    document.addEventListener('keydown', onUploadEscKeydown);
    buttonClose.addEventListener('keydown', function () {
      window.util.isEnterEvent(evt, onButtonClose);
    });
  };
  uploadField.addEventListener('change', function () {
    window.uploadFile(uploadField);
    onInputChange();
  });

  var onButtonClose = function () {
    window.util.addClass(filterForm, 'hidden');
    uploadForm.reset();
    window.effects.reset();
    document.removeEventListener('keydown', onUploadEscKeydown);
  };
  buttonClose.addEventListener('click', onButtonClose);

  var successHandler = function () {
    var successPopup = window.popup.createSuccessMessage();
    document.querySelector('body').appendChild(successPopup);
    window.util.delElemTimeout(successPopup, 'body', 2000);
    onButtonClose();
  };

  // =========ОТПРАВКА ФОРМЫ=======
  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), successHandler, window.popup.errorHandler);
    evt.preventDefault();
  });
})();

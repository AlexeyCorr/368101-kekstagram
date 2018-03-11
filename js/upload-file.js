'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var previewWrapper = document.querySelector('.upload-form-preview');
  var preview = document.querySelector('.effect-image-preview');


  var imageAdding = function (source) {
    preview.src = source;
    previewWrapper.style.width = 600 + 'px';
    previewWrapper.style.height = 600 + 'px';
    preview.style.maxWidth = 100 + '%';
    preview.style.height = 'auto';
  };

  var uploadFile = function (fileChooser) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imageAdding(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };
  window.uploadFile = uploadFile;
})();

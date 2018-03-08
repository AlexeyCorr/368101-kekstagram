'use strict';

(function () {

  var createElementPicture = function (array) {
    var similarPhotoTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var elementPhoto = similarPhotoTemplate.cloneNode(true);

    elementPhoto.querySelector('img').src = array.url;
    elementPhoto.querySelector('.picture-comments').textContent = array.comments.length;
    elementPhoto.querySelector('.picture-likes').textContent = array.likes;

    return elementPhoto;
  };

  var drawElementPhoto = function (array) {
    var fragment = document.createDocumentFragment();
    var similarPhotoList = document.querySelector('.pictures');

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createElementPicture(array[i]));
    }

    return similarPhotoList.appendChild(fragment);
  };

  var successHandler = function (data) {
    var dataPicture = data;
    drawElementPhoto(dataPicture);
  };

  var loadData = function () {
    window.backend.load(successHandler, window.popup.errorHandler);
  };

  loadData();
})();

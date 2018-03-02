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

  var drawElementPhoto = function () {
    var fragment = document.createDocumentFragment();
    var similarPhotoList = document.querySelector('.pictures');

    for (var i = 0; i < window.pictures.length; i++) {
      fragment.appendChild(createElementPicture(window.pictures[i]));
    }

    return similarPhotoList.appendChild(fragment);
  };
  drawElementPhoto();

  var cteatePictureReview = function (picture, targetPicture) {
    picture.querySelector('img').src = targetPicture.querySelector('img').src;
    picture.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes');
    picture.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes').textContent;
    picture.querySelector('.comments-count').textContent = targetPicture.querySelector('.picture-comments').textContent;
  };

  window.picture = {
    createReview: cteatePictureReview
  };
})();

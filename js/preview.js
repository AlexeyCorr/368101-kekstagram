'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');
  var picturesField = document.querySelector('.pictures');

  var cteatePictureReview = function (picture, targetPicture) {
    picture.querySelector('img').src = targetPicture.querySelector('img').src;
    picture.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes');
    picture.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes').textContent;
    picture.querySelector('.comments-count').textContent = targetPicture.querySelector('.picture-comments').textContent;
  };

  var onReviewEscKeydown = function (evt) {
    window.util.isEscEvent(evt, closePopupReview);
  };

  var openPictureReview = function (evt) {
    var targetPicture = evt.target.closest('.picture');
    if (targetPicture) {
      document.addEventListener('keydown', onReviewEscKeydown);
      window.util.removeClass(gallery, 'hidden');
      cteatePictureReview(gallery, targetPicture);
    }
  };

  var closePopupReview = function () {
    window.util.addClass(gallery, 'hidden');
    document.removeEventListener('keydown', onReviewEscKeydown);
  };

  picturesField.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPictureReview(evt);
  });

  galleryClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopupReview();
  });
})();

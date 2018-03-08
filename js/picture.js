'use strict';

(function () {
  var similarPhotoList = document.querySelector('.pictures');
  var filterForm = document.querySelector('.filters');
  var dataArray = [];

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

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createElementPicture(array[i]));
    }

    return similarPhotoList.appendChild(fragment);
  };

  var successHandler = function (data) {
    dataArray = data;
    drawElementPhoto(dataArray);
    window.util.removeClass(filterForm, 'filters-inactive');
  };

  var loadData = function () {
    window.backend.load(successHandler, window.popup.errorHandler);
  };

  loadData();

  var updatePhoto = function (target, data) {
    similarPhotoList.innerHTML = '';
    drawElementPhoto(window.filter[target.id](data));
  };

  filterForm.addEventListener('change', function (evt) {
    var target = evt.target.closest('input[type=radio]');
    var sortArr = dataArray.slice();
    if (target) {
      window.util.debounce(updatePhoto(target, sortArr));
    }
  });
})();

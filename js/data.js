'use strict';

(function () {

  var PICTURE_OPTIONS = {
    AMOUNT: 25,
    INDEX_URLS: {
      MIN: 1,
      MAX: 25
    },
    LIKES: {
      MIN: 15,
      MAX: 200
    },
    COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
  };

  // Получение массива с индексами изображений
  var pictureIndex = [];
  var getPictureIndex = function (length) {
    for (var i = 0; i < length; i++) {
      pictureIndex[i] = i + 1;
    }

    return pictureIndex;
  };

  // Получение НЕ повторяющихся значений из массива
  var getArrayItem = function (array, count) {
    var currentIndex = window.util.getRandomValue(0, array.length - 1);
    var arrayItem = array[currentIndex];
    array.splice(currentIndex, count);

    return arrayItem;
  };

  // Получение адреса изображения
  getPictureIndex(PICTURE_OPTIONS.AMOUNT);
  var getPictureLink = function () {
    return 'photos/' + getArrayItem(pictureIndex, 1) + '.jpg';
  };

  // Получение случайного количества лайков
  var getAmountLike = function () {
    return window.util.getRandomValue(PICTURE_OPTIONS.LIKES.MIN, PICTURE_OPTIONS.LIKES.MAX);
  };

  // Получение случайных комментариев
  var getComments = function (arrayLength) {
    var randomComments = [];
    for (var i = 0; i < arrayLength; i++) {
      var commentIndex = window.util.getRandomValue(0, PICTURE_OPTIONS.COMMENTS.length);
      randomComments.push(PICTURE_OPTIONS.COMMENTS[commentIndex]);
    }
    return randomComments;
  };

  window.pictures = [];
  var getArrayPicture = function (amount) {
    for (var i = 0; i < amount; i++) {
      window.pictures[i] = {
        url: getPictureLink(),
        likes: getAmountLike(),
        comments: getComments(window.util.getRandomValue(1, 2))
      };
    }
  };

  getArrayPicture(PICTURE_OPTIONS.AMOUNT);
})();

'use strict';

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
var gallery = document.querySelector('.gallery-overlay');

// Получение случайного значения
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Удаление класса у элемента
var removeClass = function (element, className) {
  element.classList.remove(className);
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
  var currentIndex = getRandomValue(0, array.length - 1);
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
  return getRandomValue(PICTURE_OPTIONS.LIKES.MIN, PICTURE_OPTIONS.LIKES.MAX);
};

// Получение случайных комментариев
var getComments = function (arrayLength) {
  var randomComments = [];
  for (var i = 0; i < arrayLength; i++) {
    var commentIndex = getRandomValue(0, PICTURE_OPTIONS.COMMENTS.length);
    randomComments.push(PICTURE_OPTIONS.COMMENTS[commentIndex]);
  }
  return randomComments;
};

var pictures = [];
var getArrayPicture = function (amount) {
  for (var i = 0; i < amount; i++) {
    pictures[i] = {
      url: getPictureLink(),
      likes: getAmountLike(),
      comments: getComments(getRandomValue(1, 2))
    };
  }
};

var createElementPicture = function (array) {
  var similarPhotoTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var elementPhoto = similarPhotoTemplate.cloneNode(true);

  elementPhoto.querySelector('img').src = array.url;
  elementPhoto.querySelector('.picture-comments').textContent = array.comments;
  elementPhoto.querySelector('.picture-likes').textContent = array.likes;

  return elementPhoto;
};

var drawElementPhoto = function () {
  var fragment = document.createDocumentFragment();
  var similarPhotoList = document.querySelector('.pictures');

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createElementPicture(pictures[i]));
  }

  return similarPhotoList.appendChild(fragment);
};

removeClass(gallery, 'hidden');
getArrayPicture(PICTURE_OPTIONS.AMOUNT);
drawElementPhoto();

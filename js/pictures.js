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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var RESIZE_STEP = 25;
var RESIZE_MIN = 25;
var RESIZE_MAX = 100;
var MAX_LENGTH_HESHTAG = 20;
var MIN_LENGTH_HESHTAG = 2;
var MAX_NUMBER_HESHTAG = 5;
var MAX_LENGTH_COMMENT = 140;
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');
var uploadForm = document.querySelector('.upload-form');
var uploadField = uploadForm.querySelector('#upload-file');
var filterForm = uploadForm.querySelector('.upload-overlay');
var buttonClose = filterForm.querySelector('.upload-form-cancel');
var effectControlsField = filterForm.querySelector('.upload-effect-controls');
var pictureReview = filterForm.querySelector('.effect-image-preview');
var scaleField = filterForm.querySelector('.upload-effect-level');
var resizeField = filterForm.querySelector('.upload-resize-controls');
var resizeValueField = resizeField.querySelector('.upload-resize-controls-value');
var hashtagField = filterForm.querySelector('.upload-form-hashtags');
var effectControlLine = effectControlsField.querySelector('.upload-effect-level-line');
var effectControlPin = effectControlsField.querySelector('.upload-effect-level-pin');
var effectControlVal = effectControlsField.querySelector('.upload-effect-level-val');
var picturesField = document.querySelector('.pictures');


// Получение случайного значения
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Удаление класса у элемента
var removeClass = function (element, className) {
  element.classList.remove(className);
};

// Добавляет класс элементу
var addClass = function (element, className) {
  element.classList.add(className);
};

// Выполнить какое-то действие при нажатии на ESC
var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

// Выполнить какое-то действие при нажатии на ENTER
var isEnterEvent = function (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
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
  elementPhoto.querySelector('.picture-comments').textContent = array.comments.length;
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

getArrayPicture(PICTURE_OPTIONS.AMOUNT);
drawElementPhoto();

// ---ОБРАБОТКА СОБЫТИЙ---

// Ф-я для открытия попапа редактирования фотографии
var onInputChange = function (evt) {
  evt.preventDefault();
  removeClass(filterForm, 'hidden');
  document.addEventListener('keydown', onUploadEscKeydown);
  buttonClose.addEventListener('keydown', function () {
    isEnterEvent(evt, uploadFormClose);
  });
};

// Ф-я закрытия попапа редактирования
var uploadFormClose = function () {
  addClass(filterForm, 'hidden');
  uploadForm.reset();
  document.removeEventListener('keydown', onUploadEscKeydown);
};

// Ф-я закрытия попапа редактирования по нажатию на ESC
var onUploadEscKeydown = function (evt) {
  isEscEvent(evt, uploadFormClose);
};

// События редактирования фото

// Открытие по change
uploadField.addEventListener('change', onInputChange);

// Закрытие по клику
buttonClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadFormClose();
});

// Применение различных эффектов
effectControlsField.addEventListener('change', function (evt) {
  var targetInput = evt.target.closest('input[type=radio]');
  pictureReview.classList.remove(pictureReview.classList[1]);
  pictureReview.style.filter = '';

  if (targetInput) {
    if (targetInput.value === 'none') {
      addClass(scaleField, 'hidden');
    } else {
      removeClass(scaleField, 'hidden');
      effectControlPin.style.left = '100%';
      effectControlVal.style.width = '100%';
    }
    pictureReview.classList.add('effect-' + targetInput.value + '');
  }
});


// Изменение размера фотографии
var resizePhoto = function () {
  var currentValue = parseInt(resizeValueField.value, 10);
  var scale = currentValue / 100;
  pictureReview.style.transform = 'scale(' + scale + ')';
};

var increasePhoto = function () {
  var currentValue = parseInt(resizeValueField.value, 10);
  if (currentValue < RESIZE_MAX) {
    resizeValueField.value = currentValue + RESIZE_STEP + '%';
    resizePhoto();
  }
  return currentValue;
};

var decreasePhoto = function () {
  var currentValue = parseInt(resizeValueField.value, 10);
  if (currentValue > RESIZE_MIN) {
    resizeValueField.value = currentValue - RESIZE_STEP + '%';
    resizePhoto();
  }
  return currentValue;
};

resizeField.addEventListener('click', function (evt) {
  var currentTarget = evt.target;

  if (currentTarget.classList.contains('upload-resize-controls-button-dec')) {
    decreasePhoto();
  }
  if (currentTarget.classList.contains('upload-resize-controls-button-inc')) {
    increasePhoto();
  }
});

// Работа слайдера
var maxValueFilters = {
  'effect-chrome': 1,
  'effect-sepia': 1,
  'effect-marvin': 100,
  'effect-phobos': 3,
  'effect-heat': 3
};

var filters = {
  'effect-chrome': function (value) {
    return 'grayscale(' + value.toFixed(1) + ')';
  },
  'effect-sepia': function (value) {
    return 'sepia(' + value.toFixed(1) + ')';
  },
  'effect-marvin': function (value) {
    return 'invert(' + value.toFixed(1) + '%)';
  },
  'effect-phobos': function (value) {
    return 'blur(' + value.toFixed(1) + 'px)';
  },
  'effect-heat': function (value) {
    return 'brightness(' + value.toFixed(1) + ')';
  },
};

effectControlLine.addEventListener('mouseup', function (evt) {
  var clientX = evt.clientX;
  var valueLineX = effectControlLine.getBoundingClientRect().left;
  var valueWidth = effectControlLine.getBoundingClientRect().width;
  var userPercent = (100 * (clientX - valueLineX)) / valueWidth;
  if (clientX >= valueLineX && clientX <= valueLineX + valueWidth) {
    effectControlPin.style.left = userPercent + '%';
    effectControlVal.style.width = userPercent + '%';
  }
  var userFilter = pictureReview.classList[1];
  var userValue = (maxValueFilters[userFilter] * (clientX - valueLineX) / valueWidth);
  pictureReview.style.filter = filters[userFilter](userValue);
});

// Ф-я закрытия попапа показа фото по нажатию на ESC
var onReviewEscKeydown = function (evt) {
  isEscEvent(evt, closePopupReview);
};

// Ф-я открытия попапа показа фото
var openPopupReview = function (evt) {
  var targetPicture = evt.target.closest('.picture');
  if (targetPicture) {
    document.addEventListener('keydown', onReviewEscKeydown);
    removeClass(gallery, 'hidden');
    gallery.querySelector('img').src = targetPicture.querySelector('img').src;
    gallery.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes');
    gallery.querySelector('.likes-count').textContent = targetPicture.querySelector('.picture-likes').textContent;
    gallery.querySelector('.comments-count').textContent = targetPicture.querySelector('.picture-comments').textContent;
  }
};

// Ф-я закрытия попапа показа фото
var closePopupReview = function () {
  addClass(gallery, 'hidden');
  document.removeEventListener('keydown', onReviewEscKeydown);
};

// Событие для открытия попапа показа фото
picturesField.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopupReview(evt);
});

// Событие для закрытия попапа показа фото
galleryClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopupReview();
});

// Валивация формы
var getCustomValidity = function (tagsField) {
  var errorMessages = [];
  var hashtags = tagsField.trim().toLowerCase().split(' ');

  hashtags = hashtags.filter(function (tag) {
    return tag !== '';
  });

  if (hashtags.length > MAX_NUMBER_HESHTAG) {
    errorMessages.push('Вы превысили максимальное число хештегов! Максимум ' + MAX_NUMBER_HESHTAG + '. Сейчас хештегов: ' + hashtags.length + '.');
  }

  hashtags.forEach(function (tag) {
    if (tag.length > MAX_LENGTH_HESHTAG) {
      errorMessages.push('Количество символов в хештеге не должно превышать ' + MAX_LENGTH_HESHTAG + '. Сейчас символов: ' + tag.length + '.');
    } else if (tag.length < MIN_LENGTH_HESHTAG) {
      errorMessages.push('Количество символов в хештеге не должно быть меньше ' + MIN_LENGTH_HESHTAG + '. Сейчас символов: ' + tag.length + '.');
    } else if (tag[0] !== '#') {
      errorMessages.push('Хештег должен начинаться с "#"!, а не с ' + tag[0] + '.');
    }
  });

  var isDuplicate = function (item, i, array) {
    return ~array.indexOf(item, i + 1);
  };

  if (hashtags.some(isDuplicate)) {
    errorMessages.push('Хештеги не должны повторяться.');
  }

  if (errorMessages) {
    hashtagField.setCustomValidity(errorMessages[0]);
    hashtagField.style.borderColor = 'red';
  } else {
    hashtagField.setCustomValidity('');
    hashtagField.style.borderColor = 'rgb(238, 238, 238)';
  }
};

hashtagField.addEventListener('input', function (evt) {
  getCustomValidity(evt.target.value);
});

uploadForm.addEventListener('sibmit', function (evt) {
  evt.preventDefault();
});
// var getCustomMessage = function () {
//   var hashtagArray = hashtagField.value.toLowerCase().split(' ');
//
//   if (hashtagArray.length >= MAX_NUMBER_HESHTAG) {
//     hashtagField.setCustomValidity('Вы превысили максимальное число хештегов! Максимум ' + MAX_NUMBER_HESHTAG + '.');
//     hashtagField.style.border = '1px solid red';
//     return false;
//   }
//   for (var i = 0; i < hashtagArray.length; i++) {
//     if (hashtagArray[i].lastIndexOf('#') !== 0) {
//       hashtagField.setCustomValidity('Хештег должен начинаться с "#"!');
//       return false;
//     } else if (hashtagArray[i].length > MAX_LENGTH_HESHTAG) {
//       hashtagField.setCustomValidity('Количество символов в хештеге не должно превышать ' + MAX_LENGTH_HESHTAG + '.');
//       return false;
//     } else if (hashtagArray[i].length < MIN_LENGTH_HESHTAG) {
//       hashtagField.setCustomValidity('Количество символов в хештеге не должно быть меньше ' + MIN_LENGTH_HESHTAG + '.');
//       return false;
//     } else if (hashtagArray.include(hashtagArray[i], i + 1)) {
//       hashtagField.setCustomValidity('Хештеги не должны повторяться.');
//       return false;
//     }
//   }
//   return true;
// };

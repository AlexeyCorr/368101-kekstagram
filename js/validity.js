'use strict';

(function () {
  var MAX_LENGTH_HESHTAG = 20;
  var MIN_LENGTH_HESHTAG = 2;
  var MAX_NUMBER_HESHTAG = 5;

  var hashtagField = document.querySelector('.upload-form-hashtags');
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

    if (errorMessages.length !== 0) {
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
})();

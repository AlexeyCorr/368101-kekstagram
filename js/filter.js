'use strict';

(function () {

  window.filter = {
    'filter-recommend': function (data) {
      return data;
    },
    'filter-popular': function (data) {
      data.sort(function (first, second) {
        return first.likes - second.likes;
      });
      return data;
    },
    'filter-discussed': function (data) {
      data.sort(function (first, second) {
        return first.comments.length - second.comments.length;
      });
      return data;
    },
    'filter-random': function (data) {
      data.sort(function () {
        return Math.random() - 0.5;
      });
      return data;
    }
  };
})();

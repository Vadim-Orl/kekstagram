(function () {
  var bigPictures = document.querySelector('.big-picture');
  var picturesTable = document.querySelector('.pictures');
  var pictureClose = document.querySelector('.big-picture__cancel');

  var openBigPicture = function (evt) {
    evt.stopPropagation();
    var { target } = evt;

    if (target.closest('.picture')) {
      window.newBigPicture(window.renderListPicturesBlock[target.closest('.picture').name]);
      bigPictures.classList.remove('hidden');
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      document.addEventListener('click', onOutsidePictureClick);
      document.addEventListener('keydown', onPictureEscPress)
    }
  };

  var closeBigPicture = function () {
    bigPictures.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscPress);
    document.removeEventListener('click', onOutsidePictureClick)
  };

  var onPictureEscPress = function (evt) {
    if (window.utils.isEscKeycode(evt)) {
      closeBigPicture()
    }
  }

  var onOutsidePictureClick = function (evt) {
    var { target } = evt;

    if (!target.closest('.big-picture__preview')) {
      closeBigPicture()
    }
  }

  picturesTable.addEventListener('click', openBigPicture);
  pictureClose.addEventListener('click', closeBigPicture);
}());

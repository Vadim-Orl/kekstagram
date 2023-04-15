(function () {
  var fragment = document.createDocumentFragment();

  var PhotoBlockInit = function (index) {
    this.url = `photos/${index + 1}.jpg`;
    this.likes = Math.floor(Math.random() * window.dateTest.MAX_RANDOM_LICKES) + window.dateTest.MIN_RANDOM_LICKES;
    this.comments = randomComments();
    this.desckription = window.dateTest.DESCKRIPTION[Math.floor(Math.random() * window.dateTest.DESCKRIPTION.length)];

    function randomComments() {
      var comment = [];
      var commentsAmount = Math.floor(Math.random() * window.dateTest.MAX_RANDOM_COMMENTS) + 1;

      for (var i = 0; i < commentsAmount; i++) {
        var tmp = examinationRandomComment(comment);
        comment[i] = window.dateTest.COMMENTS[tmp];
      }
      return comment;
    }

    function examinationRandomComment(comment) {
      var commentRandom = Math.floor(Math.random() * window.dateTest.COMMENTS.length);

      for (var i = 0; i <= comment.length; i++) {
        while (comment.includes(window.dateTest.COMMENTS[commentRandom])) {
          commentRandom = Math.floor(Math.random() * window.dateTest.COMMENTS.length);
        }
      }
      return commentRandom;
    }
  };

  var doNewPhotoList = function () {
    var photosBlock = [];

    for (var i = 0; i < window.dateTest.COUNT_PHOTOS; i++) {
      photosBlock[i] = new PhotoBlockInit(i);
    }
    return photosBlock;
  };

  var listPicturesBlock = doNewPhotoList();

  function initPhoto() {
    for (var i = 0; i < listPicturesBlock.length; i++) {
      fragment.appendChild(renderPictures(listPicturesBlock[i], i));
    }

    document.querySelector('.pictures').appendChild(fragment);
  }

  var renderPictures = function (picture, index) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.name = index;
    return pictureElement;
  };

  initPhoto();
  window.renderListPicturesBlock = listPicturesBlock;
}());

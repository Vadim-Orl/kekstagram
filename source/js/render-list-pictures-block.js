(function () {
  var MAX_RANDOM_COMMENTS = 4;
  var MAX_RANDOM_LICKES = 255;
  var MIN_RANDOM_LICKES = 15;
  var COUNT_PHOTOS = 25;

  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var DESCKRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море',
    'Как же круто тут кормят', 'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];

  var fragment = document.createDocumentFragment();

  var PhotoBlockInit = function (index) {
    this.url = `photos/${index + 1}.jpg`;
    this.likes = Math.floor(Math.random() * MAX_RANDOM_LICKES) + MIN_RANDOM_LICKES;
    this.comments = randomComments();
    this.desckription = DESCKRIPTION[Math.floor(Math.random() * DESCKRIPTION.length)];

    function randomComments() {
      var comment = [];
      var commentsAmount = Math.floor(Math.random() * MAX_RANDOM_COMMENTS) + 1;

      for (var i = 0; i < commentsAmount; i++) {
        var tmp = examinationRandomComment(comment);
        comment[i] = COMMENTS[tmp];
      }
      return comment;
    }

    function examinationRandomComment(comment) {
      var commentRandom = Math.floor(Math.random() * COMMENTS.length);

      for (var i = 0; i <= comment.length; i++) {
        while (comment.includes(COMMENTS[commentRandom])) {
          commentRandom = Math.floor(Math.random() * COMMENTS.length);
        }
      }
      return commentRandom;
    }
  };

  var doNewPhotoList = function () {
    var photosBlock = [];

    for (var i = 0; i < COUNT_PHOTOS; i++) {
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

(function () {
  var onError = function (message) {
    console.error(message);
  }

  var onSuccess = function (data) {
    console.log(data);

    var fragment = document.createDocumentFragment();
    var COUNT_PHOTOS = data.length;

    var PhotoBlockInit = function (index) {
      this.url = data[index].url;
      this.likes = data[index].likes;
      this.comments = data[index].comments;
      this.description = data[index].description;
    }

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
  };

  var URL = 'http://localhost:3001/server';

  window.load(URL, onSuccess, onError);
}());

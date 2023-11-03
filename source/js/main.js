(function () {
  var ParentphotosBlocks = document.querySelector('.pictures');

  var photosBlock = [];



  var onSuccess = function (dataBd) {
    const data = window.dataTest;
    var fragment = document.createDocumentFragment();
    var COUNT_PHOTOS = data.length;

    var PhotoBlockInit = function (index) {
      this.url = data[index].url;
      this.likes = data[index].likes;
      this.comments = data[index].comments;
      this.description = data[index].description;
    }

    var doNewPhotoList = function () {
      for (var i = 0; i < COUNT_PHOTOS; i++) {
        photosBlock[i] = new PhotoBlockInit(i);
      }
      return photosBlock;
    };

    // уже с данными из БД
    var primarylistPicturesBlock = doNewPhotoList();
    var clonePrimarylist = primarylistPicturesBlock.slice(0);
    console.log(primarylistPicturesBlock);
    var discussedlistPicturesBlock = clonePrimarylist.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    })

    clonePrimarylist = primarylistPicturesBlock.slice(0);
    var randomListPicturesBlock = clonePrimarylist.sort(() => Math.random() - 0.5);

    var filtresListMap = {
      'filter-default': primarylistPicturesBlock,
      'filter-random': randomListPicturesBlock,
      'filter-discussed': discussedlistPicturesBlock,
    };

    var clearPhoto = function () {
      var listPhotosBlocks = ParentphotosBlocks.querySelectorAll('.picture');

      listPhotosBlocks.forEach((element) => {
        element.parentElement.removeChild(element)
      });
    }

    function initPhoto(listPicturesBlock) {
      clearPhoto();

      for (var i = 0; i < listPicturesBlock.length; i++) {
        fragment.appendChild(renderPictures(listPicturesBlock[i], i));
      }

      ParentphotosBlocks.appendChild(fragment);
      return listPicturesBlock;
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

    var filterImgConteiner = document.querySelector('.img-filters__form');
    var filterImgButtons = filterImgConteiner.querySelectorAll('.img-filters__button');

    filterImgConteiner.addEventListener('click', function (evt) {
      var { target } = evt;

      filterImgButtons.forEach((element) => {
        element.classList.remove('img-filters__button--active')
      });
      target.classList.add('img-filters__button--active')

      window.renderListPicturesBlock = initPhoto((filtresListMap[target.id]));
    });

    window.renderListPicturesBlock = initPhoto(filtresListMap['filter-default']);
  };

  var onError = function (message) {
    console.error(message);
    onSuccess(window.dataTest);
  }

  var URL = 'http://localhost:3001/server';

  window.load(URL, onSuccess, onError);
}());

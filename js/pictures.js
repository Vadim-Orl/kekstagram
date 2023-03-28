var maxRandomComments = 4;
var maxRandomLickes = 255;
var minRandomLickes = 15;

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 
              'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCKRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 
                    'Как же круто тут кормят', 'Отдыхаем...', 
                    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var fragment = document.createDocumentFragment();

var PhotoBlockInit = function(index) {
  // this.comments = [];
  this.url = `photos/${index + 1}.jpg`;
  this.likes = Math.floor( Math.random() * maxRandomLickes) + minRandomLickes;
  this.comments = randomComments();
  this.desckription = DESCKRIPTION[Math.floor( Math.random() * DESCKRIPTION.length)];

  function randomComments(){
    var comment = [];
    commentsAmount = Math.floor( Math.random() * maxRandomComments) + 1;

    for (var i = 0; i < commentsAmount; i++){
      var tmp = examinationRandomComment(comment);
      comment[i] = COMMENTS[tmp];
    }
    console.log( comment);
    return  comment;
  }

  function examinationRandomComment(comment){
    var commentRandom = Math.floor( Math.random() * COMMENTS.length);

    for (var i = 0; i <= comment.length; i++){
      while (comment.includes(COMMENTS[commentRandom])){
        commentRandom = Math.floor( Math.random() * COMMENTS.length);
      }
    }
    return commentRandom;
  }
};

var doNewPhotoList = function() {
  var photoAmount = 25;
  var photosBlock = [];

  for (var i = 0; i < photoAmount; i++){
    photosBlock[i] = new PhotoBlockInit(i);
  }

  return photosBlock;
};

var listPictures = doNewPhotoList();

function initPhoto(){
  for (var i = 0; i < listPictures.length; i++) {
    fragment.appendChild(renderPictures(listPictures[i]));
  }
  
  document.querySelector('.pictures').appendChild(fragment);
}

var renderPictures = function (picture) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

initPhoto();


//------------ bigPictures
var bigPictures = document.querySelector('.big-picture');

var openBigPicture = function() {
  bigPictures.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comments-loader').classList.add('visually-hidden');
  console.log('list');
};
console.log(document.querySelector('.picture'));

var closeBigPicture = function() {
  bigPictures.classList.add('hidden');
}

document.querySelector('.picture').addEventListener('click', openBigPicture);
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);






var renderComment = function(bigPicture, index, bigPictureTemplate){
  var pictureElement = bigPictureTemplate.cloneNode(true);

  var randomAvatar = Math.floor( Math.random() * 6) + 1;
  pictureElement.querySelector('.social__picture').src = `img/avatar-${randomAvatar}.svg`;
  pictureElement.querySelector('.social__text').textContent = bigPicture.comments[index];

  return pictureElement;
};
  

renderBigPictureComments = function(bigPicture){
  var bigPictureCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

  for (var i = 0; i < bigPicture.comments.length; i++){
    fragment.appendChild(renderComment(bigPicture, i, bigPictureCommentTemplate));
    document.querySelector('.social__comments').appendChild(fragment);
  }
};

function newBigPictures(itemPictures){
  bigPictures.querySelector('.big-picture__img').querySelector('img').src = itemPictures.url;
  bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
  bigPictures.querySelector('.comments-count').textContent = itemPictures.comments.length;
  bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
  bigPictures.querySelector('.social__caption').textContent = itemPictures.desckription;


  renderBigPictureComments(itemPictures);
}

newBigPictures(listPictures[24]);


//--------------------------------
var uploadButtonStart = document.querySelector('.img-upload__start');
var uploadButtonCancel = document.querySelector('.img-upload__cancel');
var overlayImg = document.querySelector('.img-upload__overlay');
var inputFile = document.querySelector('#upload-file');

var doOverlayImgOpen = function() {
  overlayImg.classList.remove('hidden');
};

var doOverlayImgClose = function() {
  overlayImg.classList.add('hidden');
  inputFile.value = '';
}


uploadButtonStart.addEventListener('change', function() {
  doOverlayImgOpen();
})

uploadButtonCancel.addEventListener('click', function() {
  doOverlayImgClose();
})

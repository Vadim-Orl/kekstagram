var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 
              'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCKRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 
                    'Как же круто тут кормят', 'Отдыхаем...', 
                    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];


var PhotoBlockInit = function(index) {
  this.url = `photos/${index + 1}.jpg`;
  this.likes = Math.floor( Math.random() * 254) + 15;
  this.comments = randomComments();
  this.desckription = DESCKRIPTION[Math.floor( Math.random() * DESCKRIPTION.length)];

  function randomComments(){
    var comment = [];
    commentsAmount = Math.floor( Math.random() * 2) + 1;

    for (var i = 0; i < commentsAmount; i++){
      comment[i] = COMMENTS[Math.floor( Math.random() * COMMENTS.length)];
    }
    return  comment;
  }
};

var doPhotoInit = function() {
  var photosBlock = [];
  for (var i = 0; i < 25; i++){
    photosBlock[i] = new PhotoBlockInit(i);
  }

  return photosBlock;
};



var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

console.log(pictureTemplate);


var renderPictures = function (picture) {
  //клонируем ноду и изменяем ее
  var pictureElement = pictureTemplate.cloneNode(true);
  console.log(picture.url);
  pictureElement.querySelector('img').src= picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
var tmp = doPhotoInit();
console.log(tmp.length);

for (var i = 0; i < tmp.length; i++) {
  fragment.appendChild(renderPictures(tmp[i]));
}

document.querySelector('.pictures').appendChild(fragment);



//------------ bigPictures

var bigPictures = document.querySelector('.big-picture');
bigPictures.classList.remove('hidden');

bigPictures.querySelector('.big-picture__img').querySelector('img').src = tmp[1].url;
bigPictures.querySelector('.likes-count').textContent = tmp[1].likes;
bigPictures.querySelector('.comments-count').textContent = tmp[1].comments.length;
bigPictures.querySelector('.likes-count').textContent = tmp[1].likes;



console.log(bigPictures.querySelector('.big-picture__img').querySelector('img'));



// (function () {
var URL = 'https://js.dump.academy/kekstagram/data.';

//   window.upload = function (data, onSuccess) {
//     var xhr = new XMLHttpRequest();
//     console.log(xhr.readyState)

//     xhr.addEventListener('load', function () {
//       onSuccess(xhr.response);
//     })

//     xhr.open('POST', URL);
//     xhr.send(data);
//   }

// }());

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', (evt) => {
  console.log(JSON.parse(xhr.responseText));
})

xhr.open('GET', 'https://js.dump.academy/kekstagram/data.');
xhr.send();

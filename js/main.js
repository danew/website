var DOM = {};
function init() {
  DOM.body = document.body;
  DOM.background = document.querySelector('.background');
  DOM.width = window.screen.width;
  
  background();
}

function background() {
  DOM.body.addEventListener('mousemove', throttle(function (event) {
    var halfScreen = DOM.width/2;
    var pos = halfScreen - event.screenX;
    if (pos >= -200 && pos <= 200) {
      var value = Math.pow(pos/DOM.width, 2);
      var amount = pos < 0 ? value * -1 : value;
      var percentage = (50 - (amount * 100)).toFixed(2) + '%';
      DOM.background.style.width = percentage;
    }
  }), 100);
}

document.addEventListener('DOMContentLoaded', init);

function throttle(func, limit) {
  var inThrottle;
  return function() {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
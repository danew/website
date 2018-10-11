{
  var DOM = {};

  function init() {
    DOM.body = document.body;
    DOM.background = document.querySelector('.background');
    DOM.width = window.screen.width;
  }

  function background() {
    DOM.body.addEventListener('mousemove', throttle(function (event) {
      var halfScreen = DOM.width/2;
      var pos = halfScreen - event.screenX;
      var percentage = ((halfScreen - (pos / 20))/DOM.width * 100).toFixed(2) + '%';
      DOM.background.style.width = percentage;
    }), 100);
  }

  function throttle(func, limit) {
    var inThrottle;
    return function() {
      var args = arguments;
      var context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    }
  }

  window.addEventListener('resize', init);
  document.addEventListener('DOMContentLoaded', function () {
    init();
    background();
    console.log("Hi, if you're reading this, you can view the source on my github:\nhttps://github.com/danew/website")
  });
}
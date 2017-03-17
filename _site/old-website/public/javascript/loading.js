(function() {

  function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 3000);
    function checkReady() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalID);
        callback.call(this);
      }
    }
  }

  function show(id, value) {
    var element = document.getElementById(id);
    // console.dir(element);
    element.style.display = value ? 'block' : 'none';
  }

  onReady(function () {
    // checkFirstVisit();
    show('content-container', true);
    show('fp-nav', true);
    show('loading', false);
  });

})();

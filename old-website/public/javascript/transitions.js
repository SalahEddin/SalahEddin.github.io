$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['about', 'projects', 'contact'],
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    paddingBottom: 30,
    fitToSection: false,
    animateAnchor: false
  });
});

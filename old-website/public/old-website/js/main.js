// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// jQuery for hover image showing intro feature
jQuery(document).ready(function() {
	$('#image').hover(
	function() {
		$('#intro').slideToggle();
	}, 
	function() {
		$('#intro').slideToggle();
	});
});

// cool particlesjs for background on intro section
particlesJS('particles-js', {
    particles: {
      color: '#20d635',
      shape: 'circle',
      opacity: 1,
      size: 2.5,
      size_random: true,
      nb: 75,
      line_linked: {
        enable_auto: true,
        distance: 250,
        color: '#20d635',           //#457494
        opacity: 0.5,
        width: 1,
        condensed_mode: {
          enable: true,            //true
          rotateX: 650000,            //600
          rotateY: 650000
        }
      },
      anim: {
        enable: true,
        speed: 1
      }
    },
    interactivity: {
      enable: true,                 //false
      mouse: {
        distance: 250
      },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: {
        opacity: 0.5
      },
      events: {
        onclick: {
          push_particles: {
            enable: true,
            mode: 'push',
            nb: 4
          }
        }
      }
    },
    retina_detect: true
});

// cool typedjs at Contact section
$(function(){
      $("#typejs-element").typed({
        strings: ["an eager learner.", "a self-driven software developer.", "a problem solver."],
        typeSpeed: 0,
        backDelay: 2000,
        loop: true, 
        loopCount: false
      });
  });
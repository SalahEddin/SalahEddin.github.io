// 'use strict'
/**
* Application initialization
*/
var app = angular.module('ConnectFour', []);

// typejs at intro section
$(function(){
      $("#typejs-element").typed({
        strings: ["A web app for playing classic board game ConnectFour. ^1000 <br> Play against your mortal enemy and see who can reach 4 of same color first. ^1000 <br> Coming soon: play against AI. ^1000 <br> Got it?"],
        typeSpeed: 0,
        // backDelay: 2000,
        loop: false, 
        // loopCount: false
        callback: function() {
        	$("#start").slideToggle();
        }
      });
});



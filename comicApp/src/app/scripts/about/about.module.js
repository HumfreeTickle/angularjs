(function() {
    'use strict';
    var about_page = angular
        .module('comicApp.aboutPage', [])
        .controller('aboutpageCtrl', AboutController);

    function AboutController() {
        console.log("Welcome to the About Page");
    }

})();

// TODO
// :series/issue/:number
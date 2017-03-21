'use strict';

comicApp.controller('comicAppCtrl', function ComicAppController($scope) {
    $scope.repeat = [1, 2, 3, 4, 5];
    $scope.helloMessage = "Hello World";
    $scope.input;

    class Comic {
        constructor(name, description) {
            this.name = name;
            this.description = description;
        }
    }
    $scope.comics = []

    function createComics(amount) {
        for (var i = 1; i <= amount; i++) {
            var newComic = new Comic('test' + i, 'words' + i * 3);
            $scope.comics.push(newComic);
        }
    }

    createComics(20);
});
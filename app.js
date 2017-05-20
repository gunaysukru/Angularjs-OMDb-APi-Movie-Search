/**
 * Created by GunaySukru on 19.05.2017.
 */
var app = angular.module("movieApp", [])
.controller("MovieController", function ($scope, $http, $q) {
    $scope.movieName = "Star Wars: Episode IV - A New Hope";
    $scope.$watch("movieName", function () {
        getData();
    });
    function getData() {
        var getMovieData = function () {
            var deferred = $q.defer();
            console.log($scope.movieName);
            $http.get('https://www.omdbapi.com/?t=' + $scope.movieName + '&tomatoes=true&plot=full').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err);
                $scope.movie = []
            });
            return deferred.promise;
        };
        var getRelated = function () {
            var deferred = $q.defer();
            $http.get('https://www.omdbapi.com/?s=' + $scope.movieName).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err);
                $scope.related = []
            });
            return deferred.promise;
        };

        getMovieData().then(function (res) {
            $scope.movie = res;
        }).catch(function (err) {
            console.error(err)
        });
        getRelated().then(function (res) {
            $scope.related = res;
        }).catch(function (err) {
            console.error(err)
        });
    }


});
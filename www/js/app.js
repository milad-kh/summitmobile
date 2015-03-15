// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(ng)
{
  ng
  .module('starter', ['ionic'])
  .run(function($ionicPlatform)
  {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller('controller',function($scope, $http)
  {
    // request to get posts for main page
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/showPostList.php'
      }).success(function(data,status,headers,config){
        console.log(data);
        $scope.posts = data;
      }).error(function(data,status,headers,config){
        console.log(data);
      });
      // request to get category list for left sidebar
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/showCategoryList.php'
      }).success(function(data,status,headers,config){
        console.log(data);
        $scope.categories = data;
      }).error(function(data,status,headers,config){
        console.log(data);
      });
    
  });
})(this.angular);
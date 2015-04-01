// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(ng, _)
{
  var

  init = function ()
  {
    ng
    .module('starter', ['localStorage', 'ionic'])
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
    .controller('controller', Controller);
  },  
  
  Controller = function($localstorage, $scope, $http)
  {
    $scope.showCategories = function()
    {
      
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/showCategoryList.php'
      }).success(function(data,status,headers,config){      
        $scope.categories = data;
      }).error(function(data,status,headers,config){
        console.log('error in get categories');
      });

    };
    $scope.showCategories();
    $scope.doesLocalHasData = function()
    {
      var localData = $localstorage.getObject('posts');
      if (_.isEmpty(localData))
        return false;
      else
        return true;
    };

    if ($scope.doesLocalHasData())
    {      
      console.log('local is full of data');       
      $scope.posts = $localstorage.getObject('posts'); 
      $scope.showUpdateMessage = false;
      $scope.showArticleList = true;     
    }
    else
    {
      console.log('local is empty'); 
      $scope.showUpdateMessage = true;
      $scope.showArticleList = false;
    };

    $scope.fillLocalWithData = function()
    {
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/showPostList.php?catID=0'
      }).success(function(data,status,headers,config){
        
        $localstorage.setObject('posts', data);
        $scope.posts = $localstorage.getObject('posts');
        
        console.log('local is full of data'); 
        $scope.showUpdateMessage = false;
        $scope.showArticleList = true;

      }).error(function(data,status,headers,config){
        console.log('error in get posts');
      });
    }
  }
  ;  
  
  init();
})(this.angular, this._);
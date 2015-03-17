// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(ng)
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
    .controller('controller', controller);
  },

  getNewData= function ()
  {
    $http({
      method: 'GET',
      url:'http://www.summits.ir/apiToMobile/showPostList.php?catID=0'
    }).success(function(data,status,headers,config){
      
      $localstorage.setObject('posts', data);
      $scope.posts = $localstorage.getObject('posts');

    }).error(function(data,status,headers,config){
      console.log('error in get posts');
    });
  },

  getPost = function (categoryId)
  {
   $http({
    method: 'GET',
    url:'http://www.summits.ir/apiToMobile/showPostList.php?catID=' + categoryId
    }).success(function(data,status,headers,config){
      console.log(data);
      $scope.posts = data;
    }).error(function(data,status,headers,config){
      console.log(data);
    });
  },

  Controller = function($localstorage, $scope, $http)
  {
      $scope.posts = $localstorage.getObject('posts');
      if (1 > 2)
        getNewData();
      else
        console.warn('database is up to date');
   
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/showCategoryList.php'
      }).success(function(data,status,headers,config){
        
        $scope.categories = data;

      }).error(function(data,status,headers,config){
        console.log('error in get categories');
      });

      
    
  }
  ;
  ng.extend(Controller.prototype,{
    getNewData: getNewData,
    getPost: getPost
  });

  init();
})(this.angular);
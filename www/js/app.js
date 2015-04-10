// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(ng, _)
{
  var

  /**
   * [init description]
   * @return {[type]} [description]
   */
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
    .controller('controller', Controller)
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')
      $stateProvider.state('home', {
        url: '/',
        template: '<p>Hello, world!</p>'
      })
    });
  },
  
  /**
   * [Controller description]
   * @param {[type]} $localstorage [description]
   * @param {[type]} $scope        [description]
   * @param {[type]} $http         [description]
   */
  Controller = function($localstorage, $scope, $http, $ionicActionSheet, $timeout)
  {
    $scope.showActionsheet = function() {
    
      $ionicActionSheet.show({
        titleText: 'قصد انجام چه کاری را دارید؟',
        cancelText: 'Cancel',
        cancel: function() {
          console.log('CANCELLED');
        },
        buttons: [
          { text: 'Share' },
          { text: '<i class="icon ion-arrow-move"></i> Move' },
        ],
        buttonClicked: function(index) {
          alert('BUTTON CLICKED' + index);
          return true; //Close the model?
        }
      });
      
    };

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
    
    /**
     * [doesLocalHasData description]
     * @return {[type]} [description]
     */
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
    }

    /**
     * [isUpdateAvailable description]
     * @return {Boolean} [description]
     */
    $scope.isUpdateAvailable = function()
    {
      var
      lastPostIdInLocal = 2000 ;//$localstorage.getObject('posts')[0].ID;
      console.log('biggest ID on browser storage is %s', lastPostIdInLocal);
      // we should- find last article ID in summits.ir
      $http({
      method: 'GET',
      url:'http://www.summits.ir/apiToMobile/lastPostID.php'
      }).success(function(data,status,headers,config){
        console.log('biggest ID on net is : '+data);
        if (data > lastPostIdInLocal)
        {
          console.log('alan umad b true');
          $scope.showUpdateButton = true;
        }
        else
        {
          console.log('alan umad b false');
          $scope.showUpdateButton = true;
        }
      }).error(function(data,status,headers,config){
        console.log('error in check update');
      });
    };
    $scope.isUpdateAvailable();

    /**
     * [updateArticles description]
     * @return {[type]} [description]
     */
    $scope.updateArticles = function()
    {
      var
      lastPostIdInLocal = $localstorage.getObject('posts')[0].ID;
      console.log('last post id:', lastPostIdInLocal);
      $http({
        method: 'GET',
        url:'http://www.summits.ir/apiToMobile/updateMyPosts.php?startPostID='+lastPostIdInLocal
      }).success(function(data,status,headers,config){
        console.log('new data is :',data);
        var newPosts = data.concat($scope.posts);
        $scope.posts = newPosts;
        $localstorage.setObject('posts', $scope.posts);
      }).error(function(data,status,headers,config){
        console.log('error in update!');
      });
    };

    /**
     * [fillLocalWithData description]
     * @return {[type]} [description]
     */
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
    },

    $scope.filterPostsByCategory = function(input)
    {
      if (input == 'all')
      {
        $scope.posts = $localstorage.getObject('posts');
      }
      else
      {
        $scope.posts = $localstorage.getObject('posts');
        var catID = input;
        var currentCategoryPosts = [];
        ng.forEach($scope.posts, function(article){
          ng.forEach(article.catId, function(oneOfCatId){
            if (catID == oneOfCatId.cat_ID)
            {
              console.log('ok');
              currentCategoryPosts.push(article);
            }
          })
        });
        $scope.posts = currentCategoryPosts;
      }
    },

    $scope.showScope = function()
    {
      console.log($scope.posts);
    }
  }
  ;
  
  init();
})(this.angular, this._);
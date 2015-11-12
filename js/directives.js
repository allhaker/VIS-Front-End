var directives = angular.module('directives', ['VIS']);

directives.directive('userlistelement', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/user-list.html'
    };

  });

directives.directive('serverlistelement', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/server-list.html'
    };

  });
directives.directive('usermodals', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/user-modals.html'
    };

  });
directives.directive('servermodals', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/server-modals.html'
    };

  });
directives.directive('userprofile', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/user-profile.html'
    };

  });
directives.directive('serverprofile', function(){
    return{
    restrict: "E",
      templateUrl:'html/templates/server-profile.html'
    };

  });
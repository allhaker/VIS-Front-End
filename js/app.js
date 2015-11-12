(function() {
    var app = angular.module('VIS', ['ngRoute', 'xeditable', 'userController', 'userService', 'serverController', 'directives','truncate'])

    app.run(function($http, editableOptions) {
        editableOptions.theme = 'bs3';
    });
    app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {


        $routeProvider.
        when('/userlist', {
            templateUrl: "html/userlist.html",
            controller: "usersListController"
        }).

        when('/vmlist/:id/add_Users', {
            templateUrl: "html/add_To_userlist.html",
            controller: "usersAddToSeverListController"
        }).

        when('/userlist/:id/add_Servers', {
            templateUrl: "html/add_To_vmlist.html",
            controller: "serversAddToUserListController"
        }).

        when('/login_error', {
            templateUrl: "html/login_error.html",
            controller: "userLoginController"
        }).

        when('/email_error', {
            templateUrl: "html/email_error.html",
            controller: "userRestorePassController"
        }).

        when('/forgot_password', {
            templateUrl: "html/forgot_password.html",
            controller: "userRestorePassController"
        }).
        when('/email_submitted', {
            templateUrl: "html/pass_reset_confirmation.html",
        }).

        when('/', {
            templateUrl: "html/login.html",
            controller: "userLoginController"
        }).

        when('/vmlist', {
            templateUrl: "html/serverlist.html",
            controller: "serverListController"
        }).

        when('/myaccount', {
            templateUrl: "html/myaccount.html",
            controller: "userController"
        }).

        when('/vmlist/:id', {
            templateUrl: "html/serverprofile.html",
            controller: "serverController"
        }).

        when('/newuser', {
            templateUrl: "html/new_user.html",
            controller: "usersCreateController"
        }).
        when('/newserver', {
            templateUrl: "html/new_server.html",
            controller: "serverCreateController"
        }).

        when('/userlist/:id', {
            templateUrl: "html/userprofile.html",
            controller: "userController"
        });

    }]).run( function($rootScope, $location, userService) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            console.log(userService.getCurrentUser().id);
           if(userService.getCurrentUser().id == null) {
            console.log("EEE");
            $location.path('/');
            }
        });
    })

})();

var version = 2;

function createRequest(url, method, data) {
    return {
        url: url,
        method: method,
        data: data,
        headers: {
            'version': version,
            'userid': (localStorage.getItem("userid") == null) ? '0' : localStorage.getItem("userid"),
            'password': (localStorage.getItem("password") == null) ? '0' : localStorage.getItem("password"),
            'message': ''
        }
    };
}

function createUrl() {
    var url = 'http://localhost:8080/VIS';
    for (var index = 0; index < arguments.length; index++) {
        url += '/' + arguments[index];
        console.log(arguments[index]);
    }
    console.log(url);
    return url;
}

var userController = angular.module('userController', ['userService']);

userController.controller('userController', ['$scope', '$routeParams', 'userService', '$timeout', '$location',
    function($scope, $routeParams, userService, $timeout, $location) {
        $scope.initializeUser = function() {            
            userService.getUser($routeParams.id, function(user) {
                $scope.user = user;
                $scope.password;
                userService.getUser(localStorage.getItem("userid"), function(currentUser) {
                    var myUser = currentUser;
                    if(myUser.roleId == "admin"){
                        $scope.showDelete = true;
                        $scope.showPromote = true;
                        $scope.showEdit = true;
                        $scope.addServers = true;
                    }else{
                        $scope.showDelete = false;
                        $scope.showPromote = false;
                        $scope.showChangePassword = false;
                        $scope.showEdit = false;
                        $scope.addServers = false;
                    }
                }, function(){                    
                })

            }, function() {
                //alert('Some errors occured!');
            })
        }

        $scope.delete = function() {
            userService.deleteUser($routeParams.id, function() {
                $timeout(function(){
                    $location.path("userlist");
                }, 300);
            }, function() {
                //alert('Some errors occured!');
            })
        }

        $scope.update = function() {
            if($location.path() != "/myaccount"){

                userService.updateUser($routeParams.id, function() {
                        $scope.user;
                    },
                    function() {
                        //alert('Some errors occured!');
                    },
                    $scope.user
                )
            }else{
                userService.updateUser(userService.getCurrentUser().id, function() {
                        $scope.user;
                    },
                    function() {
                        //alert('Some errors occured!');
                    },
                    $scope.user
                )
            }
        }
        

        $scope.promote = function() {
            userService.promoteUser($routeParams.id, function() {
                    console.log($scope.user);                   
                    $scope.user.roleId = 'admin';
                }, function() {
                    //alert("Some errors occured");
                }
            )
        }

        $scope.serversOfUser = function() {
            userService.serversOfUser($routeParams.id, function(server) {
                $scope.servers = server;
                $scope.display = false;
                if ($scope.servers.length > 0) {
                    $scope.display = true;
                    $scope.show = [];
                    for (var i=0; i<$scope.servers.length; i++)
                        $scope.show[i]= true;
                }
                console.log($scope.display);                				
            }, function() {
                //alert('Some errors occured!');
            })
        }
        $scope.removeFromUser = function(serverID, index) {
            userService.removeFromUser($routeParams.id, serverID, function(server) {
                $scope.show[index] = false;              
            }, function() {
                //alert('Some errors occured!');
            })
        }
        
        $scope.initializeCurrentUser = function() {            
            userService.getUser(localStorage.getItem("userid"), function(user) {
                $scope.user = user;                
                $scope.showChangePassword = true;
                $scope.addServers = true; 
                $scope.showEdit = true;               
            }, function() {
                //alert('Some errors occured!');
            })
        }

        $scope.serversOfCurrentUser = function() {
            userService.serversOfUser("", function(server) {
                $scope.servers = server;
                $scope.display = false;
                if ($scope.servers.length > 0) {
                    $scope.display = true;
                    $scope.show = [];
                    for (var i=0; i<$scope.servers.length; i++)
                        $scope.show[i]= true;
                }
                console.log($scope.display);                                
            }, function() {
                //alert('Some errors occured!');
            })
        }


        $scope.changePassword = function() {
            if($scope.password == $scope.user.password){            
                userService.changePasswordUser(userService.getCurrentUser().id, function() {
                        localStorage.setItem("password", $scope.password);
                    },
                    function() {
                        //alert('Some errors occured!');
                    },
                    $scope.user
            );
                $('#changePasswordModal').modal('hide');
            }
            else alert("Not Matching");
        }
        
        $scope.removeFromCurrentUser = function(serverID, index) {
            userService.removeFromUser(localStorage.getItem("userid"), serverID, function(server) {
                $scope.show[index] = false;              
            }, function() {
                //alert('Some errors occured!');
            })
        }
    }

]);

userController.controller('usersListController', ['$scope', '$http', 'userService',
    function($scope, $http, userService) {
        $scope.initialize = function() {
            console.log(userService);
            userService.listUsers(function(users) {
                $scope.users = users;
                $scope.show = [];
                for (var i=0; i<$scope.users.length; i++)
                    $scope.show[i]= true;
                console.log(users);
            }, function() {
                //alert("Operation not successful. Some errors occured.");
            })
        }
        
        $scope.delete = function(userID, index) {
            userService.deleteUser(userID, function(user) {
                $scope.show[index] = false;                
            }, function() {
                //alert('Some errors occured!');
            })
        }
    }    
]);

userController.controller('usersAddToSeverListController', ['$scope', '$http', '$routeParams','userService',    
    function($scope, $http, $routeParams, userService) {
        $scope.initialize = function() {
            console.log(userService);
            userService.listUsersToVM($routeParams.id, function(users) {                
                if (users != 0){
                    $scope.message = "Add users to server";
                    $scope.users = users;
                    $scope.show = [];
                    for (var i=0; i<$scope.users.length; i++)
                        $scope.show[i]= true;
                }else $scope.message = "There are no users available!"
                console.log(users);
            }, function() {
                //alert("Operation not successful. Some errors occured.");
            })
        }
        $scope.addUserToVm = function(userID, index) {
            console.log(userID);
            userService.addUsersToVM($routeParams.id, function(users) {
                $scope.show[index] = false;                
            }, function() {
                //alert("Operation not successful. Some errors occured.");                
            }, userID)
        }
    }
]);

userController.controller('usersCreateController', ['$scope', '$http', '$routeParams', '$location', 'userService',
    function($scope, $http, $routeParams, $location, userService) {
        $scope.initialize = function() {
            $scope.user = new User();
        }

        $scope.create = function() {
            userService.createUser($routeParams.id, function() {
                    console.log($scope.user);                    
                    $location.path("/");
                }, function() {
                    
                },
                $scope.user
            )
        }
    }
]);

userController.controller('userLoginController', ['$scope', '$location', 'userService', '$window',
    function($scope, $location, userService, $window) {

        $scope.initialize = function() {
            $scope.isLoggedIn = false;
            $scope.password = "";
            $scope.username = userService.getCurrentUser().username;            
            $scope.id = localStorage.getItem("userid");
            if ($scope.username != null) {
                $scope.isLoggedIn = true;
                if ($location.path() == "/")
                    $location.path("vmlist");                
            }
        }

        $scope.login = function() {
            userService.login($scope.username, $scope.password, function() {
                    $location.path("vmlist");                    
                    $scope.$emit('loginEvent', {});
                },
                function() {
                    $location.path("login_error");                    
                }
            );
        }
        $scope.error_login = function() {
            userService.login($scope.username, $scope.password, function() {
                    $location.path("vmlist");                    
                    $scope.$emit('loginEvent', {});
                },
                function() {                   
                    $window.location.reload();
                }
            );
        }

        $scope.logout = function() {
            userService.logout();            
            $scope.isLoggedIn = false;
        }

        $scope.$on('loginEvent', $scope.initialize);
    }
]);

userController.controller('userRestorePassController', ['$scope', '$location', 'userService', '$window',
    function($scope, $location, userService, $window) {

        $scope.submitEmail = function() {
            userService.submitEmail(function() {
                    $location.path("email_submitted");
                },
                function() {
                    $location.path("email_error");                    
                },
                $scope.email
            )
        }
        $scope.submitEmailError = function() {
            userService.submitEmail(function() {
                    $location.path("email_submitted");
                },
                function() {
                    $window.location.reload();
                },
                $scope.email
            )
        }
    }
]);
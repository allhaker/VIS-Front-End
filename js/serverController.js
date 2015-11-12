var serverController = angular.module('serverController', ['serverService']);

serverController.controller('serverController', ['$scope', '$routeParams', 'serverService', '$filter', '$location', '$timeout',
    function($scope, $routeParams, serverService, $filter, $location, $timeout) {
        $scope.initializeSever = function() {
            $scope.server = [];
            $scope.serverType = [];
            serverService.getServer($routeParams.id, function(server) {
                //server.dueDate = $filter('date')(server.dueDate, "dd.MM.yyyy");
                console.log(server.dueDate);
                $scope.server = server;              
            }, function() {
                //alert('Some errors occured!');
            });                       

            $('#datetimepicker1').datetimepicker({
                format: "DD.MM.YYYY",                
            });

            $scope.adminsOfVm();
        }

        $scope.delete = function() {
            serverService.deleteServer($routeParams.id, function() {    
                $timeout(function(){
                    $location.path("vmlist");
                }, 300);
                
            }, function() {
                //alert('Some errors occured!');
            })
        }

        $scope.changeStatus = function() {
            if($scope.server.statusId == "Running"){
                    serverService.stopServer($routeParams.id, function() {    
                    $scope.server.statusId = "Stopped";
                    
                }, function() {
                    //alert('Some errors occured!123123123');
                });
            }else{
                    serverService.startServer($routeParams.id, function() {    
                    $scope.server.statusId = "Running";
                    
                }, function() {
                    //alert('Some errors occured!12312312');
                })
            }
        }   


        $scope.update = function() {
            serverService.updateServer($routeParams.id, function() {
                    $scope.server;
                },
                function() {
                    //alert('Some errors occured!');
                },
                $scope.server
            )
        }

        $scope.changeRootPassword = function() {;
            $scope.password;
            $scope.confirmPassword;
            if($scope.password == $scope.confirmPassword){            
                serverService.changeRootPassword($scope.server.id, function() {
                        console.log("aa");
                        
                    },
                    function() {
                        //alert('Some errors occured!');
                    },
                    $scope.confirmPassword
            );
                $('#changeRootPasswordModal').modal('hide');
            }
            else alert("Not Matching");
        }

        $scope.postponeDueDate = function() {
            serverService.postponeServer($routeParams.id, function() {
                    $scope.server;
                },
                function() {
                    //alert('Some errors occured!');
                },
                $scope.server
            )
        }
        $scope.create = function() {
            serverService.createSever($routeParams.id, function() {
                    //alert("Server " + '"' + $scope.server.name + '"' + " has just been created!");
                },
                function() {
                    //alert("Operation not successful. Some errors occured.");
                },
                $scope.server
            )
        }

        $scope.adminsOfVm = function() {
            serverService.adminsOfVM($routeParams.id, function(user) {
                $scope.admins = user;
                $scope.displayAdmins = false;
                if ($scope.admins.length > 0) {
                    $scope.displayAdmins = true;
                    $scope.show = [];
                    for (var i=0; i<$scope.admins.length; i++)
                        $scope.show[i]= true;
                }
                $scope.usersOfVm();          
            }, function() {
                //alert('Some errors occured!');
            })
        }
        $scope.usersOfVm = function() {
            serverService.usersOfVM($routeParams.id, function(users) {
                $scope.displayUser = false;
                console.log(users);
                if (users.length > 0) {
                    $scope.displayUser = true;
                    $scope.show = [];
                    console.log(users.length);
                    for (var i=0; i<users.length; i++)
                        $scope.show[i]= true;
                }
                $scope.users = users;              
            }, function() {
                //alert('Some errors occured!');
            })
        }

        $scope.removeFromVM = function(userID, index) {
            serverService.removeFromVM($routeParams.id, userID, function(user) {
                $scope.show[index] = false;              
            }, function() {
                //alert('Some errors occured!');
            })
        }
    }

]);

serverController.controller('serverListController', ['$scope', '$http', 'serverService',
    function($scope, $http, serverService) {
        $scope.initialize = function() {
            serverService.listServers(function(servers) {
                $scope.servers = servers;
                $scope.show = [];
                for (var i=0; i<$scope.servers.length; i++)
                    $scope.show[i]= true;
                console.log($scope.servers);
            }, function() {
                //alert("Operation not successful. Some errors occured.");
            })
        }

        $scope.delete = function(serverID, index) {
            serverService.deleteServer(serverID, function(user) {
                $scope.show[index] = false;                
            }, function() {
                //alert('Some errors occured!');
            })
        }
    }
]);

serverController.controller('serversAddToUserListController', ['$scope', '$http', '$routeParams','serverService',
    function($scope, $http, $routeParams, serverService) {
        $scope.initialize = function() {
            serverService.listVMToUsers($routeParams.id, function(servers) {
                if (servers != 0){
                    $scope.message = "Add servers to user";
                    $scope.servers = servers;
                    $scope.show = [];
                    for (var i=0; i<$scope.servers.length; i++)
                        $scope.show[i]= true;
                }else $scope.message = "There are no servers available!"
                console.log(servers);
            }, function() {
                //alert("Operation not successful. Some errors occured.");
            })
        }
        $scope.addVMToUser = function(serverID, index) {            
            console.log(serverID);
            serverService.addVMsToUser($routeParams.id, function(servers) {
                $scope.show[index] = false;                
            }, function() {
                //alert("Operation not successful. Some errors occured.");                
            }, serverID)
        }
    }
]);

serverController.controller('serverCreateController', ['$scope', '$http', '$routeParams', '$location', 'serverService',
    function($scope, $http, $routeParams, $location, serverService) {
        $scope.initialize = function() {
            $scope.server = new Server();
            serverService.getServerTypes(
                function(types){
                    $scope.serverType = types;
                    $scope.server.typeId = types[0].name;
                    console.log($scope.serverType);
                },function(){
                    //alert("Some Errors Occured");
                }
            );
        }

        $scope.create = function() {
            console.log($scope.server);
            serverService.createServer($routeParams.id, function() {                    
                    $location.path("/vmlist");
                }, function() {
                    //alert("Some Errors Occured");
                },
                $scope.server
            )
        }
    }
]);
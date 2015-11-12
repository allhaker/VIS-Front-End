var serverService = angular.module('serverService', []);

userService.service('serverService', ['$http', '$filter', function($http, $filter) {
    this.getServer = function(id, success, error) {
        var request = createRequest(createUrl('servers', id), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                var server = new Server();
                console.log(data.data);
                server.fromJSON(data.data);
                success(server);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };
    this.deleteServer = function(id, success, error) {
        var request = createRequest(createUrl('servers', id), 'DELETE')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };
    this.addVMsToUser = function(id, success, error, server) {        
        var myUser = new User();
        myUser.id = id;        
        var request = createRequest(createUrl('servers/users/add', server), 'POST', myUser);       
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success()
                                
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.removeFromVM = function(id, user, success, error) {
        var request = createRequest(createUrl('servers/users/delete', id, user), 'DELETE')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };

    this.changeRootPassword = function(id, success, error, password) {
        var request = createRequest(createUrl('servers/rootpassword', id), 'PUT', password);        
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };

    this.updateServer = function(id, success, error, server) {
        var serverdata = server.toJSON();
        delete serverdata.dueDate;        
        var request = createRequest(createUrl('servers', id), 'PUT', serverdata)
        console.log(serverdata);
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };

    this.postponeServer = function(id, success, error, server) {
        var temp = new Server();
        var tempDate = new Date(server.dueDate);
        temp.id = server.id;       
        temp.dueDate = $filter('date')(tempDate, "yyyy-MM-dd");        
        console.log(server.dueDate);
        var serverdata = JSON.stringify(temp.toJSON());
        var request = createRequest(createUrl('servers/postpone'), 'PUT', serverdata)
        console.log(serverdata);
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };

    this.stopServer = function(id, success, error) {
        var request = createRequest(createUrl('servers/stop', id), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };

    this.startServer = function(id, success, error) {
        var request = createRequest(createUrl('servers/start', id), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error()
            }
        }).error(function() {
            error();
        });
    };
    this.getServerTypes = function(success, error) {
        var request = createRequest(createUrl('servers/types'), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                var test = data.data;
                success(test);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.createServer = function(id, success, error, server) {
        var serverdata = JSON.stringify(server.toJSON());
        console.log(serverdata);
        var request = createRequest(createUrl('servers'), 'POST', serverdata)
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                success();
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };


    this.listServers = function(success, error) {
        var request = createRequest(createUrl('servers'), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                servers = [];
                for (var index = 0; index < data.data.length; index++) {
                    var server = new Server();
                    server.fromJSON(data.data[index]);
                    servers.push(server);
                }
                console.log(data.data);
                success(servers);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };
    this.listVMToUsers = function(id, success, error) {
        var request = createRequest(createUrl('servers/users/not', id), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                servers = [];
                for (var index = 0; index < data.data.length; index++) {
                    var server = new Server();
                    server.fromJSON(data.data[index]);
                    servers.push(server);
                }
                success(servers);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.adminsOfVM = function(id, success, error) {
        var request = createRequest(createUrl('servers/users/admin', id), 'GET')
        $http(request).success(function(data) {            
            console.log(data);
            if (data.header.result && data.header.version == version) {
                users = [];
                for (var index = 0; index < data.data.length; index++) {
                    var user = new User();
                    user.fromJSON(data.data[index].user);
                    users.push(user);
                }
                console.log(users);
                success(users);
            } else {
                error();
            }
        }).error(function() {
            error();
        });

    };

    this.usersOfVM = function(id, success, error) {
        var request = createRequest(createUrl('servers/users/user', id), 'GET')
        $http(request).success(function(data) {            
            console.log(data);
            if (data.header.result && data.header.version == version) {
                users = [];
                for (var index = 0; index < data.data.length; index++) {
                    var user = new User();
                    user.fromJSON(data.data[index].user);
                    users.push(user);
                }
                console.log(users);
                success(users);
            } else {
                error();
            }
        }).error(function() {
            error();
        });

    };

}]);
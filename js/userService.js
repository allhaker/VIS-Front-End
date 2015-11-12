var userService = angular.module('userService', []);

userService.service('userService', ['$http', function($http) {
    this.getUser = function(id, success, error) {
        var request = createRequest(createUrl('users', id), 'GET')
        $http(request).success(function(data) {
            console.log(data);
            if (data.header.result && data.header.version == version) {
                var user = new User();
                user.fromJSON(data.data);
                success(user);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.deleteUser = function(id, success, error) {
        var request = createRequest(createUrl('users', id), 'DELETE')
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

    this.updateUser = function(id, success, error, user) {
        var userdata = JSON.stringify(user.toJSON());
        var request = createRequest(createUrl('users', id), 'PUT', userdata)
        console.log(userdata);
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

    this.submitEmail = function(success, error, email) {
        //var myEmail = email;
        var request = createRequest(createUrl('users/restore'), 'POST', email);
        console.log(email);
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

    this.createUser = function(id, success, error, user) {
        var userdata = JSON.stringify(user.toJSON());
        var request = createRequest(createUrl('users'), 'POST', userdata)
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

    this.promoteUser = function(id, success, error) {        
        var request = createRequest(createUrl('users/rights', id), 'PUT')
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

    this.changePasswordUser = function(id, success, error, user) {
        var userdata = JSON.stringify(user.toJSON());
        var request = createRequest(createUrl('users/password', id), 'PUT', userdata);
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

    this.listUsers = function(success, error) {
        var request = createRequest(createUrl('users'), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                users = [];
                var currentUser = localStorage.getItem("userid");
                for (var index = 0; index < data.data.length; index++) {
                    if(currentUser != data.data[index].id){
                        var user = new User();
                        user.fromJSON(data.data[index]);
                        users.push(user);
                    }
                }
                success(users);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.addUsersToVM = function(id, success, error, user) {        
        var myUser = new User();
        myUser.id = user;
        var userdata = JSON.stringify(myUser.toJSON());
        var request = createRequest(createUrl('servers/users/add', id), 'POST', myUser);
        console.log("User ID: " + userdata);        
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

    this.removeFromUser = function(id, server, success, error) {
        var request = createRequest(createUrl('servers/users/delete', server, id), 'DELETE')
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

    this.listUsersToVM = function(id, success, error) {
        var request = createRequest(createUrl('users/servers/not', id), 'GET')
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                users = [];
                for (var index = 0; index < data.data.length; index++) {
                    var user = new User();
                    user.fromJSON(data.data[index]);
                    users.push(user);
                }
                success(users);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };


    this.getCurrentUser = function() {
        return {
            id: localStorage.getItem("userid"),
            username: localStorage.getItem("username")
        };
    };

    this.login = function(username, password, success, error) {
        var userdata = JSON.stringify({
            username: username,
            password: password
        });
        var request = createRequest(createUrl('users', 'login'), 'POST', userdata);
        console.log(request);
        $http(request).success(function(data) {
            console.log("login");
            if (data.header.result && data.header.version == version) {
                console.log(data.header);
                localStorage.setItem("userid", data.data.id);
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                success();
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

    this.logout = function() {
        localStorage.removeItem("userid");
        localStorage.removeItem("password");
        localStorage.removeItem("username");
    };

    this.serversOfUser = function(id, success, error) {
        var request = createRequest(createUrl('servers/users', id), 'GET')
        console.log(request);
        $http(request).success(function(data) {
            if (data.header.result && data.header.version == version) {
                servers = [];
                for (var index = 0; index < data.data.length; index++) {
                    var server = new Server();
                    server.fromJSON(data.data[index].server);
                    servers.push(server);
                }
                console.log(servers);
                success(servers);
            } else {
                error();
            }
        }).error(function() {
            error();
        });
    };

}]);
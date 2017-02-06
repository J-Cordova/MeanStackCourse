angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth)
{
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password)
    {
        mvAuth.authenticateUser(username,password).then(function(success)
        {
            if(success)
            {
                mvNotifier.notify('You have signed in successfully');
            }
            else
            {
                mvNotifier.notify('Username or Password is incorrect');
            }
        });
    }

    $scope.signout = function()
    {
        mvAuth.logoutUser().then(function()
        {
            //Clear out old data
            $scope.username = '';
            $scope.password = '';
            mvNotifier.notify('You have logged out');
            $location.path('/');
        })
    }
});
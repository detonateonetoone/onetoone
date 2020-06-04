four51.app.controller('NavCtrl', ['$location', '$route', '$scope', '$451', 'User', '$window',
    function ($location, $route, $scope, $451, User, $window) {
        $scope.Logout = function(){
            User.logout();
            if ($scope.isAnon) {
                $location.path("/catalog");
                User.login(function(user) {
                    $scope.user = user;
                });
            }
        };

        // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
        $scope.isActive = function(path) {
            var cur_path = $location.path().replace('/', '');
            var result = false;

            if (path instanceof Array) {
                angular.forEach(path, function(p) {
                    if (p == cur_path && !result)
                        result = true;
                });
            }
            else {
                if (cur_path == path)
                    result = true;
            }
            return result;
        };
        // extension of above isActive in path
        $scope.isInPath = function(path) {
            var cur_path = $location.path().replace('/', '');
            var result = false;

            if(cur_path.indexOf(path) > -1) {
                result = true;
            }
            else {
                result = false;
            }
            return result;
        };

        $scope.Clear = function() {
            localStorage.clear();
        }

        $scope.$on('event:orderUpdate', function(event, order) {
            $scope.cartCount = (order ? ((order.Status == 'Unsubmitted') ? order.LineItems.length : null) : null);
        });

        // Watch height of image to set category element height for vertical-center class
        $scope.$watch(function() {
            return document.getElementById("logo-categories-container").offsetHeight;
        }, function(){
            $scope.calcHeight = {'height': document.getElementById("logo-categories-container").offsetHeight + 5};
        });

        // Watch window size to set category element height for vertical-center class on change
        angular.element($window).on('resize', function () {
            $scope.calcHeight = {'height': document.getElementById("logo-categories-container").offsetHeight + 5};
        });
    }]);
angular.module('OrderCloud-HeaderNavigation', []);
angular.module('OrderCloud-HeaderNavigation')
    .directive('headernavigation', headernavigation)
    .controller('HeaderNavigationCtrl', HeaderNavigationCtrl)
;

function headernavigation() {
    return {
        restrict: 'E',
        template: template
    };

    function template() {
        return [
            '<section class="header-navigation">',
            '<div class="row">',
            '<div class="col-xs-12 col-sm-8 pull-right">',
            '<ul>',
            '<li class="search-bar"><productsearchinput></productsearchinput></li>',
            '<li class="dropdown">',
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="false">My Account</a>',
            '<ul class="dropdown-menu">',
            '<li><a href="admin">User Information</a></li>',
            '<li><a href="addresses">Addresses</a></li>',
            '<li ng-show="user.Permissions.contains(\'ViewContactUs\')"><a href="contactus">Contact Us</a></li>',
            '<li><a href="favoriteorders">Favorites</a></li>',
            '<li ng-show="user.Permissions.contains(\'ViewMessaging\')"><a href="message">Messages</a></li>',
            '</ul>',
            '</li>',
            '<li ng-show="user.Permissions.contains(\'AdvancedReporting\')"><a href="reports">Reports</a></li>',
            '<li><a href="order">Orders</a></li>',
            '<li><a href="cart">Cart&nbsp;',
            '<span ng-if="currentOrder.LineItems.length" ng-bind="cartCount" class="badge"></span>',
            '</a></li>',
            '<li><a ng-click="Logout()">Log Out</a></li>',
            '</ul>',
            '</div>',
            '</div>',
            '</section>'
        ].join('');
    }
}

HeaderNavigationCtrl.$inject = ['$scope','User'];
function HeaderNavigationCtrl($scope, User) {

    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };

}

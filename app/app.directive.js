'use strict';
module.exports = angular.module('app.business')
    .directive('focusInput', ['$ionicScrollDelegate', '$window', '$timeout', '$ionicPosition', function ($ionicScrollDelegate, $window, $timeout, $ionicPosition) {
        return {
            restrict: 'C',
            scope: false,
            link: function ($scope, iElm, iAttrs, controller) {
                if (ionic.Platform.isIOS()) {
                    iElm.on('focus', function () {
                        var top = $ionicScrollDelegate.getScrollPosition().top;
                        var eleTop = ($ionicPosition.offset(iElm).top) / 2;
                        var realTop = eleTop + top;
                        $ionicScrollDelegate.scrollTo(0, realTop);
                    })
                }

            }
        }
    }]);

'use strict';
module.exports = angular.module('app.business').directive('appPageHead', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    // templateUrl: './modules/business/template/Head1.html',
    template: require('./modules/business/template/Head1.html'),
        link: function($scope) {
            $scope.MenuShow=false;
            $scope.ShowMenu=function(){
                console.log("显示");
                $scope.MenuShow=!$scope.MenuShow;
            };
    }
      };
}]);

'use strict';
module.exports = angular.module('app.business').directive('appEditInput', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    // scope: {
    //   modal: '=',
    //   CurrentObjectDayState: '=',
    //   TaggleModel:'&'
    // },
    // templateUrl: './modules/business/template/Head1.html',
    template: require('./modules/business/template/Public/EditInput.html'),
        link: function($scope) {
            // $scope.Edittitle="文档编辑2";
            $scope.ShowValue=function(){
                console.log($scope.CurrentObjectDayState);
            };
    }
      };
}]);

'use strict';
module.exports = angular.module('app.business').directive('appHospitalSelect', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    template: require('./modules/business/template/Public/HospitalSelect.html'),
        link: function($scope) {
            
    }
      };
}]);


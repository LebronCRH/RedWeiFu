angular = require('angular');
var ionic = require('./assets/lib/ionic/release/js/ionic.bundle.min');
const bussiness = require('./modules/business');
require('./assets/styles/ionic.min.css');
require('./assets/styles/animate.css');
require('./assets/lib/calendar-pk/release/css/calendar_pk.min.css');
require('./assets/lib/ionic-filter-bar/release/ionic.filter.bar.min.css');
//把所有less样式文件引入
function importAll (r) {
    r.keys().forEach(r);
}
importAll(require.context('./style', true, /\.less$/));

//把scripts中的所有文件引入
importAll(require.context('./scripts',true,/\.js$/));
// importAll(require.context('./scripts',true,/\.js$/));
// require('./style/guide.less');
const appDirective=require('./app.directive');
ngCache = require('angular-cache');
ngCookies = require('angular-cookies');
angular.module("app",[ionic,bussiness.name ,'calendar_pk',ngCookies,ngCache])
    .config(['$stateProvider', '$urlRouterProvider', require('./config.route')])
    .controller("AppCtrl",  require('./app.controller'));
const appConfig = require('./app.config');
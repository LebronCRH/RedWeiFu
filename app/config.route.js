'use strict';
module.exports = routeConfig ;


function routeConfig($stateProvider, $urlRouterProvider) {

    var routes, setRoutes;

    routes = [
        {
            name: 'DemandTrack',
            ctrl: 'demandCtrl',
            url: 'demandtrack',
            tpl: './modules/business/Demand_tracking/index'
        },
        {
            name: 'WorkWeekly',
            ctrl: 'weeklyCtrl',
            url: 'WorkWeekly/:date',
            tpl: './modules/business/WorkWeekly/WorkWeekly'
        },
        {
            name: 'Add_Demand',
            ctrl: 'addDemandCtrl',
            url: 'AddDemand',
            tpl: './modules/business/Demand_tracking/AddDemand'
        },
        {
            name:'DemandDetails',
            ctrl:'DemandDetailsCtrl',
            url:'DemandDetails/:id',
            tpl:'./modules/business/Demand_tracking/DemandDetails'
        },
        {
            name: 'Demand_Rview',
            ctrl: 'DemandRviewCtrl',
            url: 'DemandRview',
            tpl: './modules/business/Demand_tracking/DemandRview'
        },
        {
            name: 'Demand_Test',
            ctrl: 'DemandTestCtrl',
            url: 'DemandTest',
            tpl: './modules/business/Demand_tracking/DemandTest'
        },
        {
            name: 'Login',
            ctrl: 'LoginCtrl',
            url: 'Login',
            tpl: './modules/business/LoginOrRegister/Login'
        }
    ];
    setRoutes = function (route) {
        var config, name;
        config = {
            url: "/" + route.url,
            template: require(route.tpl + '.html'),
            controller: route.ctrl
        };
        $stateProvider.state(route.name, config);
        return $stateProvider;
    };
    routes.forEach(function (route) {
        return setRoutes(route);
    });
    $urlRouterProvider.otherwise('Login');

}
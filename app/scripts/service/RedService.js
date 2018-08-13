
'use strict';
module.exports = angular.module('app.business').service("UserLoginService", ["$q", "$http", "$location", function ($q, $http, $location) {
	const {userLogin}=require('../../service/getdata.js');
    this.userLogin = userLogin;
}]);

'use strict';
module.exports = angular.module('app.business').service("WeeklyService", ["$q", "$http", "$location", function ($q, $http, $location) {
	const {GetWeeklyNotes,GetSummaryAndPlan,SaveNote,SaveSummaryAndPlan,SaveNoteAndSumAndPlan}=require('../../service/getdata.js');
    this.GetWeeklyNotes = GetWeeklyNotes;
    this.GetSummaryAndPlan=GetSummaryAndPlan;
    this.SaveNote=SaveNote;
    this.SaveSummaryAndPlan=SaveSummaryAndPlan;
    this.SaveNoteAndSumAndPlan=SaveNoteAndSumAndPlan;
}]);

'use strict';
module.exports = angular.module('app.business').service("DemandService", ["$q", "$http", "$location", function ($q, $http, $location) {
	const {GetDemandByID,GetDemandBySerach,GetAllHospital}=require('../../service/getdata.js');
    this.GetDemandByID = GetDemandByID;
    this.GetDemandBySerach=GetDemandBySerach;
    this.GetAllHospital=GetAllHospital;
}]);
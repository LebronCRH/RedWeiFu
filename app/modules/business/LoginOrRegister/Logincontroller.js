'use strict';
module.exports = angular.module('app.business').controller('LoginCtrl', ['$state', '$http', '$scope','$cookieStore','UserLoginService', function($state, $http, $scope,$cookieStore,UserLoginService){
	console.log(UserLoginService.userLogin);
	$scope.PasswordState=true;
	$scope.UserName="";
	$scope.UserPassword="";
	$scope.UserYzm="";
	var verifyCode = new GVerify("v_container");
	$scope.TagglePassword=function()
	{
		$scope.PasswordState=!$scope.PasswordState;
	};
	$scope.SubmitLogin=function(){
		var res = verifyCode.validate($scope.UserYzm);
		if(res){
		  // $http.get("http://localhost:8085/WorkWeekly/UserLogin",{params:{"UserName":$scope.UserName, "UserPassword":$scope.UserPassword}}).success(function(resp){
		  // 	if(resp!=null){
		  // 		sessionStorage.setItem("UserInfo",resp);
		  // 		sessionStorage.setItem("UserLoginName",resp.UserLoginName);
		  // 		sessionStorage.setItem("UserName",resp.UserName);
		  // 		$state.go('WorkWeekly');
		  // 		console.log(resp);
		  // 	}else{
		  // 		$scope.UserPassword="";
		  // 		$scope.UserPassword="";
		  // 		verifyCode.refresh();
		  // 		alert("请输入正确的员工号和密码！");
		  // 	}
		  // });
		  UserLoginService.userLogin($scope.UserName,$scope.UserPassword).then(resp=>{
		  	if(resp!=null){
		  		sessionStorage.setItem("UserInfo",resp);
		  		sessionStorage.setItem("UserLoginName",resp.UserLoginName);
		  		sessionStorage.setItem("UserName",resp.UserName);
		  		$state.go('WorkWeekly');
		  		// console.log(resp);
		  	}else{
		  		$scope.UserPassword="";
		  		$scope.UserPassword="";
		  		verifyCode.refresh();
		  		alert("请输入正确的员工号和密码！");
		  	}
		  })
		}else{
			alert("验证码输入错误！");
		}
	};
}]);
'use strict';
module.exports = angular.module('app.business').controller('LoginCtrl', ['$state', '$http', '$scope','$cookieStore','$ionicLoading','$timeout','UserLoginService', function($state, $http, $scope,$cookieStore,$ionicLoading,$timeout,UserLoginService){
	console.log(UserLoginService.userLogin);
	$scope.PasswordState=true;
	$scope.UserName="";
	$scope.UserPassword="";
	$scope.UserYzm="";
	$scope.User={
		"UserName":"",
		"UserPassword":"",
		"UserYzm":"",
	}
	var verifyCode = new GVerify("v_container");
	$scope.TagglePassword=function()
	{
		$scope.PasswordState=!$scope.PasswordState;
	};
	$scope.SubmitLogin=function(){
		console.log($scope.User.UserYzm);
		console.log($scope.User.UserName);
		console.log($scope.User.UserPassword);
		var res = verifyCode.validate($scope.User.UserYzm);
		if(res){
		  // $ionicLoading.show();
		  // $http.get("http://www.radinfo.com.cn:8065/WorkWeekly/UserLogin",{params:{"UserName":$scope.User.UserName, "UserPassword":$scope.User.UserPassword}}).success(function(resp){
		  // 	if(resp!=null){
		  // 		sessionStorage.setItem("UserInfo",resp);
		  // 		sessionStorage.setItem("UserLoginName",resp.UserLoginName);
		  // 		sessionStorage.setItem("UserName",resp.UserName);
		  // 		$state.go('WorkWeekly');
		  // 		console.log(resp);
		  // 	}else{
		  // 		$scope.User.UserPassword="";
		  // 		$scope.User.UserPassword="";
		  // 		verifyCode.refresh();
		  // 		alert("请输入正确的员工号和密码！");
		  // 		$ionicLoading.hide();
		  // 	}
		  // }).error(function(error){
		  // 	console.error('Error:', error);alert('Error:'+error);
		  // });
		  $ionicLoading.show();
		  UserLoginService.userLogin($scope.User.UserName,$scope.User.UserPassword).then(resp=>{
		  	if(resp!=null){
		  		sessionStorage.setItem("UserInfo",resp);
		  		sessionStorage.setItem("UserLoginName",resp.UserLoginName);
		  		sessionStorage.setItem("UserName",resp.UserName);
		  		$state.go('WorkWeekly');
		  		// console.log(resp);
		  	}else{
		  		$scope.User.UserPassword="";
		  		$scope.User.UserPassword="";
		  		verifyCode.refresh();
		  		alert("请输入正确的员工号和密码！");
		  		$ionicLoading.hide();
		  	}
		  }).catch(error =>{console.error('Error:', error);alert('Error:'+error)})
		}else{
			alert("验证码输入错误！");
		}
	};
}]);
'use strict';
module.exports = angular.module('app.business').controller('demandCtrl', ['$state', '$http', '$scope','$cookieStore','$ionicLoading','$timeout','DemandService', function($state, $http, $scope,$cookieStore,$ionicLoading,$timeout,DemandService){
  $scope.title="需求预览";
  $scope.SonTitle="医院选择";
  $scope.Sonmodal=false;
  $scope.SourceList=["全部","实施工程师","销售","部门经理","研发工程师","公司领导","用户"];
  $scope.AareaList=["西湖区","海宁区","上城区","下城区","杭州区域","三门县人民医院","绍兴地区","杭州地区","贵州省","衢州地区","台州地区","嘉善区域","陕西省"];
  $scope.StatusList=["全部","登记","沟通中","确认","完成","挂起"];
  $scope.SelectSource=0;//来源的选择
  $scope.SelectArea=null;//地区的选择
  $scope.Data={
    StarTime:GetMonDate(),//起始时间
    EndTime:GetSunDate(),//截止时间
  };
  $scope.StarTime="2018-04-09";//起始时间
  $scope.EndTime="2018-04-16";//截止时间
  $scope.SelectHosital="";//医院的选择
  $scope.SelectZDR="";//指导人的输入
  $scope.SelectStatus=[];//状态的选择;
  $scope.CurrentScreen=0;//显示4个筛选模态界面的状态值
  $scope.CurrentSelectHospital=null;//当前勾选的医院项
  $scope.PrivSelectHospital=null;//记录上一次勾选的医院项
  $scope.SerachHospital="";
  $scope.model=false;
  // new Mdate("dateSelectorStart", {
  //     format: "-"
  // });
  $('#dateSelectorStart').mdater({ 
    // minDate : new Date(2015, 2, 10) 
  });
  $('#dateSelectorStart, #dateSelectorEnd').click(function(){
    $('.shadow2').show();
  });
  // new Mdate("dateSelectorEnd", {
  //     format: "-"
  // });
  $('#dateSelectorEnd').mdater({ 
    // minDate : new Date(2015, 2, 10) 
  });
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $scope.SontaggleModel=function(){
    $scope.Sonmodal=!$scope.Sonmodal;
  }
  function GetMonDate(){//获取本周的第一天周一的时间
    var d=new Date(),
    day=d.getDay(),
    date=d.getDate();
    if(day==1)
    return d;
    if(day==0)
    d.setDate(date-6);
    else
    d.setDate(date-day+1);
    var returnDate=GetDayString(d);
    return returnDate;
  };
  function GetSunDate()//获取本周的最后一天周日的时间
  {
    var d=new Date(),
    day=d.getDay(),
    date=d.getDate();
    if(day==0)
    return d;
    if(day==1)
    d.setDate(date+6);
    else
    d.setDate(date+7-day);
    var returnDate=GetDayString(d);
    return returnDate;
  };
  function GetDayString(myDate){//将时间日期格式化成YYYY-MM-DD形式
      var years = myDate.getFullYear();
      var month =myDate.getMonth()+1;
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      var days =myDate.getDate();
      if (days >= 0 && days <= 9) {
          days = "0" + days;
      }
      var ndate = years+"-"+month+"-"+days;
      return ndate;
  };
  console.log(GetMonDate());
  console.log(GetSunDate());
  $scope.$watch('Data',function(now,old){
    console.log("老"+old);
    console.log("新"+now);
  },true);
  $scope.TaggleModel=function(){
    $scope.model=!$scope.model;
  }
  function removeByValue(arr, val) {   for(var i=0; i<arr.length; i++) {     if(arr[i] == val) {       arr.splice(i, 1);       break;     }   } } //
  $scope.goBack=function(){
    window.history.back(-1);
  };
  $scope.doRefresh=function(){
    $scope.SubmitSerach();
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.ChangeSelectScreen=function(index){
  	if(index==$scope.CurrentScreen){
  		$scope.CurrentScreen=0;
      $scope.TaggleModel();
  	}else{
  		$scope.CurrentScreen=index;
      $scope.model=true;
  	}
  };
  $scope.ModelChose=function(){
      $scope.CurrentScreen=0;
      $scope.model=false;
  };
  $scope.ChangeSource=function(index)//来源选择的操作函数
  {
    if($scope.SelectSource==index)
    {
      $scope.SelectSource=null;
    }
    else
    {
      $scope.SelectSource=index;
    }
  };
  $scope.ChangeArea=function(index)//地区选择的操作函数
  {
    if($scope.SelectArea==index)
    {
      $scope.SelectArea=null;
    }
    else
    {
      $scope.SelectArea=index;
    }
  };
  $scope.IsArray=function(value)//用户状态选择来判断是否显示高亮样式的函数
  {
    if($scope.SelectStatus.includes(value))
    {
      return true;
    }
    else
    {
      return false;
    }
  };
  $scope.ChangeStatus=function(index)//状态选择的函数
  {
    if(index==0)
    {
      if($scope.SelectStatus.length==6)
      {
        $scope.SelectStatus=[];
      }
      else
      {
        $scope.SelectStatus=$scope.StatusList;
      }
    }
    else
      {
        if($scope.SelectStatus.includes($scope.StatusList[index]))
        {
          removeByValue($scope.SelectStatus,$scope.StatusList[index]);
        }
        else
        {
          $scope.SelectStatus.push($scope.StatusList[index]);
        }
      }
    console.log($scope.SelectStatus);
  };
  $scope.ChangeHospital=function(Item)
  {
    if($scope.CurrentSelectHospital!=null && $scope.CurrentSelectHospital.Id==Item.Id)
    {
      $scope.CurrentSelectHospital=null;
    }
    else{
      $scope.CurrentSelectHospital=Item;
    }
  };

  $scope.SonBack=function()
  {
    $scope.CurrentSelectHospital=$scope.PrivSelectHospital;
    if($scope.CurrentSelectHospital!=null)
    {
      $scope.SerachHospital=$scope.CurrentSelectHospital.UnitName;
    }else
    {
      $scope.SerachHospital="";
    }
    $scope.Sonmodal=!$scope.Sonmodal;
  };
  $scope.SonComplete=function()
  {
    $scope.PrivSelectHospital=$scope.CurrentSelectHospital;
    if($scope.CurrentSelectHospital!=null)
    {
      console.log($scope.CurrentSelectHospital);
      $scope.SerachHospital=$scope.CurrentSelectHospital.UnitName;
    }else{
      $scope.SerachHospital="";
    }
    $scope.Sonmodal=!$scope.Sonmodal;
  };

  DemandService.GetDemandBySerach("","","","","","","").then(response=>{
    $scope.DemandList=response;
    $timeout(function () {
      $ionicLoading.hide();
    }, 1000);
    // console.log(response);
  });//初始化获得需求预览数据
  DemandService.GetAllHospital().then(response=>{
    $scope.HospitalList=response.listUnit;
    // console.log(response.listUnit);
  })//初始化获得所有医院的数据
  $scope.SubmitSerach=function(){//提交查询函数的操作
    // console.log($("#dateSelectorStart").val());
    $ionicLoading.show();
    console.log($scope.Data);
    var Status=$scope.SelectStatus.join(",");
    var Area="";
    if($scope.CurrentSelectHospital!=null)
    {
      $scope.SelectHosital=$scope.CurrentSelectHospital.UnitName;
    }
    else
    {
      $scope.SelectHosital="";
    }
    if($scope.SelectArea!=null)
    {
      Area=$scope.AareaList[$scope.SelectArea];
    };
    DemandService.GetDemandBySerach($scope.SourceList[$scope.SelectSource],$("#dateSelectorStart").val(),$("#dateSelectorEnd").val(),$scope.SelectHosital,$scope.SelectZDR,Area,Status).then(response=>{
      $scope.DemandList=response;
      console.log(response);
      $timeout(function () {
        $ionicLoading.hide();
      }, 1000);
    });
    $scope.CurrentScreen=0;
    $scope.model=false;
  };
}]);

'use strict';
module.exports = angular.module('app.business').controller('addDemandCtrl', ['$state', '$http', '$scope','$cookieStore','DemandService', function($state, $http, $scope,$cookieStore,DemandService){
  $scope.title="添加需求";
  $scope.SerachName="";
  $scope.ShowHositalModel=false;
  $scope.ShowExecutorModel=false;
  $scope.SelectHosital="";
  $scope.SelectExecutor="";
  $scope.Obj={
    DemandTitle:"",
    DemandContent:"",
    DemandName:"",
    DemandOrderNo:""
  }
  $("#SelectFile").change(function(){
    var str=$(this).val();
    var arr=str.split('\\');
    var my=arr[arr.length-1];
    $("#FileName").text(my);
  })
  $scope.DemandCreateTime=getNowFormatDate();
  // $http.get("http://localhost:8085/Demand/GetAllHospital").success(function(resp){
  DemandService.GetAllHospital().then(resp=>{
    $scope.Hospital=resp.listUnit;
    $scope.Executor=resp.listUser;
  });
  function getNowFormatDate() {
  　　var date = new Date();
  　　var seperator1 = "-";
  　　var seperator2 = ":";
  　　var year = date.getFullYear();
  　　var month = date.getMonth() + 1;
  　　var strDate = date.getDate();
  　　if (month >= 1 && month <= 9) {
  　　month = "0" + month;
  　　}
  　　if (strDate >= 0 && strDate <= 9) {
  　　strDate = "0" + strDate;
  　　}
  　　var currentdate = year + seperator1 + month + seperator1 + strDate;
  　　return currentdate;
　 };
  $scope.TaggleHospital=function(){
    $scope.ShowHositalModel=!$scope.ShowHositalModel;
    $scope.ModelZzhe=true;
  };
  $scope.TaggleExecutor=function(){
    $scope.ShowExecutorModel=!$scope.ShowExecutorModel;
    $scope.ModelZzhe=true;
  };
  $scope.TaggleModel=function(){
    $scope.ModelZzhe=false;
    $scope.ShowHositalModel=false;
    $scope.ShowExecutorModel=false;
  };
  $scope.HospitalChange=function(Item){
    $scope.SelectHosital=Item.UnitName;
    $scope.TaggleModel();
  };
  $scope.ExecutorChange=function(Item){
    $scope.SelectExecutor=Item.UserName;
    $scope.TaggleModel();
  };
  $scope.save = function() {    
        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        fd.append('logo', file); 
        fd.append('DemandTitle',$scope.Obj.DemandTitle);
        fd.append('DemandContent',$scope.Obj.DemandContent);
        fd.append('DemandName',$scope.Obj.DemandName);
        fd.append('DemandOrderNo',$scope.Obj.DemandOrderNo);
        fd.append('DemandHosital',$scope.SelectHosital);
        fd.append('DemandUser',$scope.SelectExecutor);
        fd.append('DemandCreateTime',$scope.DemandCreateTime);
        $http({
              method:'POST',
              url:"http://192.168.1.5:8085/Demand/AddDemandForm",
              data: fd,
              headers: {'Content-Type':undefined},
              transformRequest: angular.identity 
              }).success( function ( response )
                 {//上传成功的操作
                  if(response>0)
                  {
                   alert("上传成功");
                   $state.go('DemandDetails',{'id':response})
                  }
                  else
                  {
                    alert("上传失败");
                  }
                 }); 

    };
}]);
'use strict';
module.exports = angular.module('app.business').controller('DemandRviewCtrl', ['$state', '$http', '$scope','$cookieStore', function($state, $http, $scope,$cookieStore){

}]);

'use strict';
module.exports = angular.module('app.business').controller('DemandTestCtrl', ['$state', '$http', '$scope','$cookieStore', function($state, $http, $scope,$cookieStore){

}]);

'use strict';
module.exports = angular.module('app.business').controller('DemandDetailsCtrl', ['$state', '$http', '$scope','$cookieStore','$ionicLoading','$timeout','DemandService', function($state, $http, $scope,$cookieStore,$ionicLoading,$timeout,DemandService){
      $scope.title="需求详情";
      $scope.SelectHosital="";
      $scope.SelectExecutor="";
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      DemandService.GetDemandByID($state.params.id).then(response=>{
        $scope.Obj=response;
        $timeout(function () {
          $ionicLoading.hide();
        }, 1000);
      });
}]);

'use strict';
module.exports = angular.module('app.business').controller('EditIputCtrl', ['$state', '$http', '$scope','$cookieStore', function($state, $http, $scope,$cookieStore){

}]);

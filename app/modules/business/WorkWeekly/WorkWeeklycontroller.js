'use strict';
module.exports = angular.module('app.business').controller('weeklyCtrl', ['$state', '$http', '$scope','$cookieStore', '$rootScope','$ionicLoading','$timeout','WeeklyService',function($state, $http, $scope,$cookieStore,$rootScope,$ionicLoading,$timeout,WeeklyService){
  $scope.CurrentActiveSlide=0;
  $scope.title="工作周报";
  $scope.model=false;
  $scope.EditTitle="文本编辑";
  $scope.CurrentShowDay=0;
  $scope.CurrentDay=GetCurrentDay();
  $scope.DateSelectModel=false;
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $scope.SelectDate="";
  $("#dateShowBtn").click(function(){
    // $scope.DateSelectModel=true;
    $('.shadow2').show();
    $('#DataSelect').click();
  });
  $('#DataSelect').mdater({ 
    // minDate : new Date(2015, 2, 10) 
  });
  $scope.DateSelectOk=function(){
    $scope.SubmitData();
  };
  $scope.DateSelectCancel=function(){
  };
  function GetCurrentDay(){
      var myDate = new Date();
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
      console.log(ndate);
      return ndate;
  };
  // console.log($state.params.date);
  // $http.get("http://localhost:8085/WorkWeekly/GetWeeklyNotes").success(function(resp){
  WeeklyService.GetWeeklyNotes(sessionStorage.getItem("UserName"),'').then(resp=>{
    $scope.Week=resp;
    resp.forEach((item,index)=>{
      // var myDate = new Date();
      // var years = myDate.getFullYear();
      // var month =myDate.getMonth()+1;
      // if (month >= 1 && month <= 9) {
      //     month = "0" + month;
      // }
      // var days =myDate.getDate();
      // if (days >= 0 && days <= 9) {
      //     days = "0" + days;
      // }
      // var ndate = years+"-"+month+"-"+days;
      if(item.NoteDate==$scope.CurrentDay)
      {
        $scope.CurrentShowDay=index;
        console.log(index);
      }
    })
    $scope.CurrentObjectDay=$scope.Week[0];
    console.log($scope.Week);
    $timeout(function () {
      $ionicLoading.hide();
    }, 1000);
  }).catch(error =>{console.error('Error:', error);alert('Error:'+error)})
  // $http.get("http://localhost:8085/WorkWeekly/GetSummaryAndPlan").success(function(resp){
  WeeklyService.GetSummaryAndPlan(sessionStorage.getItem("UserName"),'').then(resp=>{
    $scope.SummaryOrPlan=resp;
    console.log($scope.SummaryOrPlan);
  }).catch(error =>{console.error('Error:', error);alert('Error:'+error)})
  $scope.CurrentSelectIdex=0;
  $scope.goBack=function(){
    window.history.back(-1);
  };
  $scope.SubmitData=function(){
    $ionicLoading.show();
      WeeklyService.GetSummaryAndPlan(sessionStorage.getItem("UserName"),$("#DataSelect").val()).then(resp=>{
        $scope.SummaryOrPlan=resp;
      });
      WeeklyService.GetWeeklyNotes(sessionStorage.getItem("UserName"),$("#DataSelect").val()).then(resp=>{
        $scope.Week=resp;
        var Flag=0;
        resp.forEach((item,index)=>{
          if(item.NoteDate==$("#DataSelect").val())
          {
            Flag=index;
            console.log(index+"有请求"+$scope.CurrentShowDay);
          } 
        })
        $scope.CurrentShowDay=Flag;//控制如果有日期是当天的跳到当天 否则跳到第一天
        if($scope.CurrentShowDay!=$scope.CurrentActiveSlide)
        {
          $scope.SlideSwiper($scope.CurrentShowDay);
        }

        $scope.CurrentObjectDay=$scope.Week[0];
        console.log($scope.Week);
        $timeout(function () {
          $ionicLoading.hide();
        }, 1000);
      });
  };
  var barwidth = 36; //导航粉色条的长度px
  var tSpeed = 300 ;//切换速度300ms
  var navSlideWidth;
  var bar,navSum,clientWidth,navWidth,i,topBar,clickIndex,clickSlide,activeIndex,activeSlidePosition,navActiveSlideLeft,progress,slideProgress,r,g,b,navSwiper,pageSwiper;
  // var CurrentActiveObjectState;
  // $scope.$watch('$viewContentLoaded', function(){
  //   console.log("开始");
  navSwiper = new Swiper('#nav', {
    slidesPerView: 6,
    freeMode: true,
    on: {
      init: function() {
        navSlideWidth = this.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
        bar = this.$el.find('.bar')
        bar.css('width', navSlideWidth)
        bar.transition(tSpeed)
        navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置
        // console.log(navSum);
        clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
        navWidth = 0
        for (i = 0; i < this.slides.length; i++) {
          navWidth += parseInt(this.slides.eq(i).css('width'))
        }
        topBar = this.$el.parents('body').find('#top') //页头
      },

    },
  });

  pageSwiper = new Swiper('#page', {
    watchSlidesProgress: true,
    resistanceRatio: 0,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    on: {
      touchMove: function() {
        progress = this.progress
        bar.transition(0)
        bar.transform('translateX(' + navSum * progress + 'px)')
        //粉色255,72,145灰色51,51,51
        for (i = 0; i < this.slides.length; i++) {
          slideProgress = this.slides[i].progress
          if (Math.abs(slideProgress) < 1) {
            r = Math.floor((255 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
            g = Math.floor((72 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
            b = Math.floor((145 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
            navSwiper.slides.eq(i).find('p').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
          }
        }
      },
      transitionStart: function() {
        activeIndex = this.activeIndex
        $scope.CurrentActiveSlide=activeIndex
        activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
        //释放时导航粉色条移动过渡
        bar.transition(tSpeed)
        bar.transform('translateX(' + activeSlidePosition + 'px)')
        //释放时文字变色过渡
        navSwiper.slides.eq(activeIndex).find('p').transition(tSpeed)
        navSwiper.slides.eq(activeIndex).find('p').css('color', 'rgba(255,72,145,1)')
        if (activeIndex > 0) {
          navSwiper.slides.eq(activeIndex - 1).find('p').transition(tSpeed)
          navSwiper.slides.eq(activeIndex - 1).find('p').css('color', 'rgba(51,51,51,1)')
        }
        if (activeIndex < this.slides.length) {
          navSwiper.slides.eq(activeIndex + 1).find('p').transition(tSpeed)
          navSwiper.slides.eq(activeIndex + 1).find('p').css('color', 'rgba(51,51,51,1)')
        }
        //导航居中
        navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离

        navSwiper.setTransition(tSpeed)
        if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
          navSwiper.setTranslate(0)
        } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
          navSwiper.setTranslate(clientWidth - navWidth)
        } else {
          navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
        }

      },
    }
  });
  navSwiper.$el.on('touchstart', function(e) {
    e.preventDefault() //去掉按压阴影
  })
  navSwiper.on('tap', function(e) {
    clickIndex = this.clickedIndex
    clickSlide = this.slides.eq(clickIndex)
    $scope.CurrentActiveSlide=clickIndex;
    pageSwiper.slideTo(clickIndex, 0);
    this.slides.find('p').css('color', 'rgba(51,51,51,1)');
    clickSlide.find('p').css('color', 'rgba(255,72,145,1)');
  })
  $scope.$watch('CurrentShowDay',function(now,old){
    clickSlide = navSwiper.slides.eq(now)
    navSwiper.slideTo(now, 1000, false);
    pageSwiper.slideTo(now, 0);
    activeSlidePosition = navSwiper.slides[now
    ].offsetLeft
        //释放时导航粉色条移动过渡
    bar.transition(tSpeed)
    bar.transform('translateX(' + activeSlidePosition + 'px)')
    navSwiper.slides.find('p').css('color', 'rgba(51,51,51,1)');
    clickSlide.find('p').css('color', 'rgba(255,72,145,1)');
  },true);
  $scope.SlideSwiper=function(index){
    clickSlide = navSwiper.slides.eq(index)
    navSwiper.slideTo(index, 1000, false);
    pageSwiper.slideTo(index, 0);
    activeSlidePosition = navSwiper.slides[index].offsetLeft
    bar.transition(tSpeed)
    bar.transform('translateX(' + activeSlidePosition + 'px)')
    navSwiper.slides.find('p').css('color', 'rgba(51,51,51,1)');
    clickSlide.find('p').css('color', 'rgba(255,72,145,1)');
  };
// });
  $scope.TaggleModel=function(){
    $scope.model=!$scope.model;
  }
  $scope.OpenRecordEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
      $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Note;
      $scope.CurrentSelectIdex=0;
      $scope.EditTitle="记录编辑";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenWhereaboutsEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
      $scope.CurrentObjectDayState=$scope.CurrentObjectDay.location;
      $scope.CurrentSelectIdex=1;
      $scope.EditTitle="去向编辑";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenRemarksEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
      $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Remarks;
      $scope.CurrentSelectIdex=2;
      $scope.EditTitle="备注编辑";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenProjectEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
      $scope.CurrentObjectDayState=$scope.CurrentObjectDay.workingload;
      $scope.CurrentSelectIdex=3;
      $scope.EditTitle="相关项目";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenAttendanceEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
      $scope.CurrentObjectDayState=$scope.CurrentObjectDay.attendance;
      $scope.CurrentSelectIdex=4;
      $scope.EditTitle="出勤编辑";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenSummaryEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDayState=$scope.SummaryOrPlan.Summary;
      $scope.CurrentSelectIdex=5;
      $scope.EditTitle="本周总结";
      $scope.TaggleModel();
    // }
  }
  $scope.OpenPlanEditInput=function(){
    // if($scope.DateSelectModel==false)
    // {
      $scope.CurrentObjectDayState=$scope.SummaryOrPlan.Plan;
      $scope.CurrentSelectIdex=6;
      $scope.EditTitle="下周计划";
      $scope.TaggleModel();
    // }
  }
  $scope.CompleteEdit=function(){
    $scope.model=!$scope.model;
    $scope.ChangeSelectValue();
    console.log($scope.CurrentObjectDayState);
    console.log($scope.CurrentObjectDay);
    console.log($scope.Week);
  }
  $scope.ChangeSelectValue=function(){
    if($scope.CurrentSelectIdex==0){
      console.log("0");
      // $scope.CurrentObjectDay.Record=$scope.CurrentObjectDayState;
      $scope.CurrentObjectDay.Note=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==1){
      console.log("1");
      // $scope.CurrentObjectDay.Whereabouts=$scope.CurrentObjectDayState;
      $scope.CurrentObjectDay.location=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==2){
      console.log("2");
      // $scope.CurrentObjectDay.Remarks=$scope.CurrentObjectDayState;
      $scope.CurrentObjectDay.Remarks=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==3){
      console.log("3");
      // $scope.CurrentObjectDay.Project=$scope.CurrentObjectDayState;
      $scope.CurrentObjectDay.workingload=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==4){
      console.log("4");
      // $scope.CurrentObjectDay.Attendance=$scope.CurrentObjectDayState;
      $scope.CurrentObjectDay.attendance=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==5){
      console.log("5");
      $scope.SummaryOrPlan.Summary=$scope.CurrentObjectDayState;
    }
    else if($scope.CurrentSelectIdex==6){
      console.log("6");
      $scope.SummaryOrPlan.Plan=$scope.CurrentObjectDayState;
    }
  }
  $scope.SubmitWeeklyItem=function(Item){
    $ionicLoading.show();
    // $http.post("http://localhost:8085/WorkWeekly/SaveNote", Item).then(function (res) {
    WeeklyService.SaveNote(Item).then(res=>{
     console.log(res);
      $timeout(function () {
        $ionicLoading.hide();
      }, 1000);
     alert("保存成功");
    })
  }
  $scope.SubmitAllData=function(){
    $ionicLoading.show();
    var Data={
      "Summary":$scope.SummaryOrPlan.Summary,
      "Plan":$scope.SummaryOrPlan.Plan,
      "WriteDate":$scope.Week[0].NoteDate,
      "Writer":sessionStorage.getItem("UserName"),
    }
    // $http.post("http://localhost:8085/WorkWeekly/SaveSummaryAndPlan", Data).then(function (res) {
    WeeklyService.SaveSummaryAndPlan(Data).then(res=>{
       console.log(res)
       $timeout(function () {
          $ionicLoading.hide();
       }, 1000);
       alert("保存成功");
    })
  }
  $scope.SubmitAllData2=function(){
    $ionicLoading.show();
    // console.log($scope.CurrentShowDay);
    // console.log($scope.CurrentActiveSlide);
    // console.log($scope.Week[$scope.CurrentActiveSlide]);
    var Note=$scope.Week[$scope.CurrentActiveSlide];
    var SumAndPlan={
      "Summary":$scope.SummaryOrPlan.Summary,
      "Plan":$scope.SummaryOrPlan.Plan,
      "WriteDate":$scope.Week[0].NoteDate,
      "Writer":sessionStorage.getItem("UserName"),
    };
    var Data={
      "notes":Note,
      "sumandplan":SumAndPlan,
    };
     WeeklyService.SaveNoteAndSumAndPlan(Data).then(res=>{
     // $http.post("http://localhost:8085/WorkWeekly/SaveNoteAndSumAndPlan", Data).then(function (res) {
       console.log(res)
       $timeout(function () {
          $ionicLoading.hide();
       }, 1000);
       alert("保存成功");
    })
  };
}]);
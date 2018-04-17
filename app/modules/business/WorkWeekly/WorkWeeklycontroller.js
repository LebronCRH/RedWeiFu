'use strict';
module.exports = angular.module('app.business').controller('weeklyCtrl', ['$state', '$http', '$scope','$cookieStore', '$rootScope','$ionicLoading','$timeout','WeeklyService',function($state, $http, $scope,$cookieStore,$rootScope,$ionicLoading,$timeout,WeeklyService){
  $scope.CurrentActiveSlide=0;
  $scope.title="工作周报";
  $scope.model=false;
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  // console.log("页面");
  new Mdate("dateShowBtn", {
      acceptId: "DataSelect",
      format: "-"
  });
  // console.log($state.params.date);
  // $http.get("http://localhost:8085/WorkWeekly/GetWeeklyNotes").success(function(resp){
  WeeklyService.GetWeeklyNotes(sessionStorage.getItem("UserName"),'').then(resp=>{
    $scope.Week=resp;
    $scope.CurrentObjectDay=$scope.Week[0];
    console.log($scope.Week);
    $timeout(function () {
      $ionicLoading.hide();
    }, 1000);
  });
  // $http.get("http://localhost:8085/WorkWeekly/GetSummaryAndPlan").success(function(resp){
  WeeklyService.GetSummaryAndPlan(sessionStorage.getItem("UserName"),'').then(resp=>{
    $scope.SummaryOrPlan=resp;
    console.log($scope.SummaryOrPlan);
  });
  // $scope.SummaryOrPlan={"Summary":"4567","Plan":"3456"};
  // $scope.CurrentObjectDay=$scope.Week[0];
  $scope.CurrentSelectIdex=0;
  // $scope.CurrentObjectDayState=$scope.Week[0]["Record"];
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
    slidesPerView: 5,
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
            navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
          }
        }
      },
      transitionStart: function() {
        activeIndex = this.activeIndex
        $scope.CurrentActiveSlide=activeIndex
        // console.log($scope.CurrentActiveSlide)
        activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
        //释放时导航粉色条移动过渡
        bar.transition(tSpeed)
        bar.transform('translateX(' + activeSlidePosition + 'px)')
        //释放时文字变色过渡
        navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
        navSwiper.slides.eq(activeIndex).find('span').css('color', 'rgba(255,72,145,1)')
        if (activeIndex > 0) {
          navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
          navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
        }
        if (activeIndex < this.slides.length) {
          navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
          navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
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
    pageSwiper.slideTo(clickIndex, 0);
    this.slides.find('span').css('color', 'rgba(51,51,51,1)');
    clickSlide.find('span').css('color', 'rgba(255,72,145,1)');
  })
// });
  $scope.TaggleModel=function(){
    $scope.model=!$scope.model;
    // console.log($scope.model);
    // console.log($scope.Week);
    // console.log($scope.CurrentObjectDayState);
    // console.log($scope.CurrentObjectDay);
  }
  $scope.OpenRecordEditInput=function(){
    $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
    // $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Record;
    $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Note;
    $scope.CurrentSelectIdex=0;
    $scope.TaggleModel();
  }
  $scope.OpenWhereaboutsEditInput=function(){
    $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
    // $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Whereabouts;
    $scope.CurrentObjectDayState=$scope.CurrentObjectDay.location;
    $scope.CurrentSelectIdex=1;
    $scope.TaggleModel();
  }
  $scope.OpenRemarksEditInput=function(){
    $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
    // $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Remarks;
    $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Remarks;
    $scope.CurrentSelectIdex=2;
    $scope.TaggleModel();
  }
  $scope.OpenProjectEditInput=function(){
    $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
    // $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Project;
    $scope.CurrentObjectDayState=$scope.CurrentObjectDay.workingload;
    $scope.CurrentSelectIdex=3;
    $scope.TaggleModel();
  }
  $scope.OpenAttendanceEditInput=function(){
    $scope.CurrentObjectDay=$scope.Week[$scope.CurrentActiveSlide];
    // $scope.CurrentObjectDayState=$scope.CurrentObjectDay.Attendance;
    $scope.CurrentObjectDayState=$scope.CurrentObjectDay.attendance;
    $scope.CurrentSelectIdex=4;
    $scope.TaggleModel();
  }
  $scope.OpenSummaryEditInput=function(){
    $scope.CurrentObjectDayState=$scope.SummaryOrPlan.Summary;
    $scope.CurrentSelectIdex=5;
    $scope.TaggleModel();
  }
  $scope.OpenPlanEditInput=function(){
    $scope.CurrentObjectDayState=$scope.SummaryOrPlan.Plan;
    $scope.CurrentSelectIdex=6;
    $scope.TaggleModel();
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
}]);
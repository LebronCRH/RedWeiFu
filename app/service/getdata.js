import fetch from '../config/fetch'

//登录API开始
	/*用户密码登录*/
	export const userLogin=(username,password)=>fetch('/WorkWeekly/UserLogin',{
		UserName:username,
		UserPassword:password,
	});
	
	//获得用户的周报信息
	export const GetWeeklyNotes=(username,dateselect)=>fetch('/WorkWeekly/GetWeeklyNotes',{
		UserName:username,
		DateSelect:dateselect,
	});

	//获取用户的周总结和周计划信息
	export const GetSummaryAndPlan=(username,dateselect)=>fetch('/WorkWeekly/GetSummaryAndPlan',{
		UserName:username,
		DateSelect:dateselect,
	});

	//用户提交某一天的工作日报
	export const SaveNote=(Obj)=>fetch('/WorkWeekly/SaveNote',Obj,'POST')

	//提交用户的周总结和周计划
	export const SaveSummaryAndPlan=(Obj)=>fetch('/WorkWeekly/SaveSummaryAndPlan',Obj,'POST')

	//获得一个需求的详情信息
	export const GetDemandByID=(id)=>fetch('/Demand/GetDemandByID',{
		id:id,
	});

	//根据条件查询需求信息
	export const GetDemandBySerach=(source,startime,endtime,hospital,zdr,area,status)=>fetch('/Demand/GetDemandBySerach',{
		Source:source,
		StarTime:startime,
		EndTime:endtime,
		Hospital:hospital,
		ZDR:zdr,
		Area:area,
		Status:status,
	})

	//获得所有医院信息
	export const GetAllHospital=()=>fetch('/Demand/GetAllHospital');
//登录API结束 
let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = 'http://www.radinfo.com.cn:8065/Images/';


if (process.env.NODE_ENV == 'development') {
	baseUrl='http://www.radinfo.com.cn:8065';
	// baseUrl='http://localhost:8085';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl='http://www.radinfo.com.cn:8065';
	// baseUrl='http://localhost:8085';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
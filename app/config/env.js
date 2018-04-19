let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = 'http://192.168.1.5:8085/Images/';


if (process.env.NODE_ENV == 'development') {
	baseUrl='http://192.168.1.5:8085';
	// baseUrl='http://localhost:8085';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl='http://192.168.1.5:8085';
	// baseUrl='http://localhost:8085';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
import axios from 'axios'
//获取token

function getTokenByLocal() {
	let token = sessionStorage.getItem('token') || '';
	return token;
}
//创建实例
const serive = axios.create({
	baseURL: 'http://localhost:9002/',
	timeout: 5000
})
//request请求拦截器  //formdata
serive.interceptors.request.use(
	config => {
		if (getTokenByLocal()) {
			config.headers['token'] = getTokenByLocal();
			config.headers['ContentType'] = "application/json;charset=utf-8";
		}
		return config
	},
	error => {
		Promise.reject(error)
	}
)

//response 响应拦截器
serive.interceptors.response.use(
	response => {
		let res = response.data;
		if (res.code == '401') {
			console.log('666');
		} else if (res.code == '402') {
			console.log('777');
		}
		return Promise.resolve(response.data)
	},
	error => {
		return Promise.reject(error);
	}
)
export default serive
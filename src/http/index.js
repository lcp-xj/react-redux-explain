/**
* http配置
*/
import axios from 'axios';
import history from 'src/history'


// 超时时间
axios.defaults.timeout = 10000;
// 接口地址
axios.defaults.baseURL = 'http://test.xxxapi.com/'; 

// http请求拦截器
axios.interceptors.request.use(config => {
    //loading show
    return config
}, error => {
    //loading hide(这个是请求失败的情况)
    return Promise.reject(error)
});

// http响应拦截器
axios.interceptors.response.use(data => {   //响应成功关闭loading
    // loading hid
    if(data.data.msg == "请登录"){          //这个是判断接口是否需要依赖登录
        localStorage.removeItem('sid'); 
        history.push('/login')
    }
    return data
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                localStorage.removeItem('sid'); 
                history.push('/login')
        }
    }
    return Promise.reject(error)
});

export default axios
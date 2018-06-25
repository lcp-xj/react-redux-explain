import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';   //BrowerRouter使用H5 historyAPI
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { createStore } from 'src/lib/redux';
// import { Provider } from 'src/lib/react-redux';

import RouterComponent from './router';

import themeReducer from 'src/store/themeReducer';

const store = createStore(themeReducer)

var data = {              //初始数据
	themeColor:'pink'
}

store.dispatch({type:'CHANGE_COLOR', ...data})   //让reducer里的state由null设置为初始数据(...)这个是ES6新增的操作符，我就不累赘了

render(
	<BrowserRouter>
		<Provider store={store}>	
			<RouterComponent />
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
)



/**
 * 使用H5 historyAPI打包上线时有可能，页面刷新后空白。
 * 这是由于history模式不同于哈希模式，地址栏刷新时，会向服务器发送请求造成的。
 * 因此我们需要服务器做一下改动。
 * 这里以node为例：
 * 
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

// 通常用于加载静态资源位public文件夹
app.use(express.static(__dirname + '/public'))

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)

*/
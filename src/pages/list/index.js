import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './list.css';


const GetRequest = key => { 
	let url = location.search; //获取url中"?"符后的字串 
	let theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		let str = url.substr(1); 
		let strs = str.split("&"); 
		for(let i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return key?theRequest[key]:theRequest 
} 

class List extends Component{
	constructor(props){
		super(props);
		this.state ={
			type:GetRequest('type')
		}
	}
	componentWillMount(){             //react的一个生命周期
		console.log(this.props)
		console.log(GetRequest('type'))
	}
	back() {
	    this.props.history.go(-1);
  	}
	render(){
		return (
			<div>
				<p className="App-msg" onClick={this.back.bind(this)}>返回</p>
				<ul>
			        <li onClick={()=>this.props.history.push("/")}>首页</li>
			        <li onClick={()=>this.props.history.push("/list")}>列表</li>
			        <li onClick={()=>this.props.history.push("/detail")}>详情</li>
			        <li onClick={()=>this.props.history.push("/login")}>登录</li>
			        <li onClick={()=>this.props.history.push("/user")}>个人中心</li>
		      	</ul>
				<ul>
			        <li><Link to='/'>Home</Link></li>
			        <li><Link to='/list'>List</Link></li>
			        <li><Link to='/detail'>Detail</Link></li>
		      	</ul>
		      	<div>
		      		<h1>我是{this.state.type}列表页</h1>
		      	</div>
			</div>
		)
	}
}

export default withRouter(List);
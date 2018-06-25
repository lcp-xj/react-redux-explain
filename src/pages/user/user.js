import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './user.css';


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

class User extends Component{
	constructor(props){
		super(props);
		this.state={
			username:''
		}
	}
	componentWillMount(){
		console.log(this.props)
		this.setState({
			username:GetRequest('username')
		})
	}
	back() {
	    this.props.history.go(-1);
  	}
  	logout(){
  		localStorage.removeItem('sid'); 
  		this.props.history.push('/login')
  	}
	render(){
		return (
			<div>
				<p className="App-msg" onClick={this.back.bind(this)}>返回</p>
				<p>用户名：{this.state.username}</p>
				<button className="App-msg" onClick={this.logout.bind(this)}>退出登录</button>
			</div>
		)
	}
}

export default withRouter(User);
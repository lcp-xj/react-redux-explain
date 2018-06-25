import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './login.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			passworld:''
		}
	}
	back() {
	    this.props.history.go(-1);
  	}
  	changeName(e){
  		this.setState({
  			username:e.target.value
  		})
  	}
  	changePassworld(e){
  		this.setState({
  			passworld:e.target.value
  		})
  	}
  	login(){
  		var username = this.state.username;
  		var passworld = this.state.passworld;
  		if(username && passworld){
  			localStorage.setItem('sid','6f11a666-47be-4769-9f5a-9c06f2b2583c&userId=27632241415107951927118723787'); 
  			this.props.history.push({pathname:'/user',search:'?username='+username})
  		}else{
  			alert('请填写账号或者密码')
  		}
  	}
	render(){
		return (
			<div>
				<p className="App-msg" onClick={this.back.bind(this)}>返回</p>
				<p><label>用户名：<input type="text"  onChange={this.changeName.bind(this)}/></label></p>
				<p><label>密&emsp;码：<input type="text"  onChange={this.changePassworld.bind(this)}/></label></p>
				<button onClick={this.login.bind(this)}>登录</button>
			</div>
		)
	}
}

export default withRouter(Login);
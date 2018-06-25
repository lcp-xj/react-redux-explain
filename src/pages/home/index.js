import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from 'src/assets/images/logo.svg';
import './home.css';

import Header from 'components/header';
import Content from 'components/content';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			msg:'Hello React'
		}
	}
	back() {
	    this.props.history.go(-1);
  	}
	render(){
		return(
			<div>
				<Header />
				<ul>
			        <li onClick={()=>this.props.history.push("/")}>首页</li>
			        <li onClick={()=>this.props.history.push({pathname: '/list',  search: '?type=activity'})}>列表</li>
			        <li onClick={()=>this.props.history.push('/detail/9')}>详情</li>
			        <li onClick={()=>this.props.history.push("/login")}>登录</li>
			        <li onClick={()=>this.props.history.push('/user')}>个人中心</li>
		      	</ul>
				<p className="App-msg" onClick={this.back.bind(this)}>返回</p>
				<Content />
		      	<div>
		      		<h1 className="title">我是首页</h1>
		      		<img src={logo} className="App-logo" alt="logo" />
					<p className="App-msg">{this.state.msg}</p>
		      	</div>
			</div>
		)
	}
}

export default withRouter(Home);
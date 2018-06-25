import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './detail.css';

class Detail extends Component {
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.id
		}
	}
	componentWillMount(){             //react的一个生命周期
		console.log(this.props)
		console.log(this.props.match.params.id)
	}
	back() {
	    this.props.history.go(-1);
  	}
	render(){
		return(
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
		      		<h1>我是详情页id={this.state.id}</h1>
		      	</div>
			</div>
		)
	}
}

export default withRouter(Detail);
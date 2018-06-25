import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'src/lib/react-redux';

// store
const mapStateToProps = (state) => {   //component可以通过this.props.themeColor可以获取其返回对象的themeColor属性值
	return {
		themeColor:state.themeColor
	}
}
const mapDispatchToProps = (dispatch) => { //component可以通过this.props.onSwithchColor(color)可以执行其返回的onSwithchColor方法
	return {	
		onSwithchColor: (color) => {
			dispatch({type:'CHANGE_COLOR',themeColor:color})
		}
	}
}

// component
class Switch extends Component {
	componentWillMount(){             //react的一个生命周期
		console.log(this.props)
	}
	handleSwitchColor(color){
		if(this.props.onSwithchColor){
			this.props.onSwithchColor(color)
		}
	}
	// componentDidMount() {
 //      	//判断是否页面有被人为刷新，将导致redux stroe清空，需要从缓存中恢复store
 //      	let data = JSON.parse(localStorage.getItem('projectList'))
 //    	//我这里用size===0 是因为我的redux数据都用了immutable data
 //      	if(this.props.projectList.size === 0 && data) {
 //          	this.props.setProjectList(data)
 //      	}
 //  	}
	render(){
		return(
			<div>
				<button
					style={{color:this.props.themeColor}}
					onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
				<button
					style={{color:this.props.themeColor}}
					onClick={this.handleSwitchColor.bind(this,'blue')}>blue</button>
			</div>
		)
	}
}

Switch = connect(mapStateToProps,mapDispatchToProps)(Switch)

export default Switch
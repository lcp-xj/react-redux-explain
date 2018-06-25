// 手动实现react-redux.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
	class Connect extends Component {
		static contextTypes ={
			store:PropTypes.object
		}
		constructor(){
			super()
			this.state = {allProps:{}}
		}
		componentWillMount(){
			const { store } = this.context
			this._updateProps()
			store.subscribe(()=>this._updateProps())
		}
		_updateProps(){
			const {store} = this.context
			let stateProps = mapStateToProps
				? mapStateToProps(store.getState(),this.props)    // 额外传入 props，让获取数据更加灵活方便
				:{}   //防止mapStateToProps没有传入
			let dispatchProps = mapDispatchToProps
				? mapDispatchToProps(store.dispatch,this.props)
				:{}   //防止mapDispatchToProps没有传入
			this.setState({
				allProps:{               // 整合普通的 props 和从 state 生成的 props
					...stateProps,
					...dispatchProps,
					...this.props
				}
			})
		}

		render(){
			return <WrappedComponent {...this.state.allProps} />         //{...stateProps} 意思是把从store里面所需要的属性拿出来全部通过 `props` 方式传递进去
		}
	}

	return Connect
}

export class Provider extends Component {
	static propTypes = {
		store:PropTypes.object,
		children:PropTypes.any
	}
	static childContextTypes ={
		store: PropTypes.object
	}
	getChildContext() {
		return {
			store: this.props.store
		}
	}
	render(){
		return(
			<div>{this.props.children}</div>
		)
	}
}
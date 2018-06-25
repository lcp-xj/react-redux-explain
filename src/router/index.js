import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import home from 'src/pages/home';
import list from 'src/pages/list';
import detail from 'src/pages/detail';
import login from 'src/pages/login/login';
import user from 'src/pages/user/user';

/**
 * @param  {Protected:登陆拦截（函数组建）}
 * @param  {...[type]}
 * @return {还是一个Route组建，这个Route组建使用的是Route三大渲染方式（component、render、children）的render方式}。注意当component和render两种方式共存时，优先使用component方式渲染
 */
const Protected =  ({component: _comp, ...rest}) => {
    return (
    	<Route 
    	{...rest} 
    	render={
    		props => 
    		localStorage.getItem('sid') 
    		? <_comp/> 
    		:<Redirect to={{pathname: '/login', state: {from: props.location.pathname}}}/>
    	}
    	/>
    )
}

class Router extends Component {
	render(){
		return(
			<div>
				<Switch>
					<Route exact path="/" component={home} />
					<Route exact path="/list" component={list}  />
					<Route path="/detail/:id" component={detail} /> {/* 此路由必须给id，如果没有则显示404 */}
					<Route path="/login" component={login}/>
					<Protected path="/user" component={user}/>
					<Route exact path="*" render={(props) => <h1>404</h1>} />  {/* 没有找到该路由，返回404 */}     
				</Switch>
			</div>
		)
	}
}

export default Router;



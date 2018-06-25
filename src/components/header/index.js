import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'src/lib/react-redux';

// store
const mapStateToProps = (state) => {    //
	return {
		themeColor: state.themeColor
	}
}

// component
class Header extends Component {    //组建里this.props获取的状态是由上面store提供
	render(){
		return (
			<h2 style={{color:this.props.themeColor}}>标题</h2>
		)
	}
}

Header = connect(mapStateToProps)(Header)

export default Header
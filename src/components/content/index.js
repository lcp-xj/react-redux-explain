import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from 'src/lib/react-redux';

import Switch from 'components/switch';

// store
const mapStateToProps = (state) => {
	return {
		themeColor:state.themeColor
	}
}

// component
class Content extends Component {
	render(){
		return(
			<div>
				<p style={{color:this.props.themeColor}}>内容</p>
				<Switch></Switch>
			</div>
		)
	}
}

Content = connect(mapStateToProps)(Content)

export default Content
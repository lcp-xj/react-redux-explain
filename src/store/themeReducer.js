/**
 * [themeReducer description]
 * @param   {[state]}           [旧的state]
 * @param   {[action]}          [处理state的动作]
 * @return  {[state]}           [新的state]
 */
const themeReducer = (state, action) => {     //reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state
    switch (action.type) {
      	case 'CHANGE_COLOR':{
        	return { 
        		...state, 
        		themeColor: action.themeColor 
        	}
      	}
      	case 'ADD': {
			return {
				...state,
				cart:[...state.cart,action.payload]
			}
		}
		case 'DELETE':{
			return {
				...state,
				cart:state.cart.filter(item =>item.product !==  action.payload.product)
			}
		}
      	default:
        	return state
    }
}
export default themeReducer
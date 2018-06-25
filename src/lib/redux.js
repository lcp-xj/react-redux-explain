// 手动实现redux
/**
 * [createStore description]
 * @param   reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
 * @return {[getState]}         [获取state的]
 * @return {[dispatch]}         [改变state的]
 * @return {[subscribe]}        [订阅state的，来监听状态改变的]
 */
export const createStore = (reducer) => {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
}

/**
 * [combineReducers 把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore]
 * @param  {[obj]} obj  [reducers]
 * @return {[reducer]}  [给createStore使用的reducer]
 */
export const combineReducers = (reducers) => {
    return (state={}, action) => {
        var reducerKeys = Object.keys(reducers);      //返回的是对象的自身所有的可枚举的属性值，但不包括原型中的属性，然后返回一个由属性名组成的数组
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            if (typeof reducers[key] === 'function') {
              finalReducers[key] = reducers[key](state[key], action)
            }
        }
        return finalReducers;
    }
}



// export const combineReducers =  (obj) => {
//     function reducer(){
//         var finalState = {};
//         for(var i in obj){
//             finalState[i] = obj[i](state[i], action)    // 根据key属性值调用function(state.属性名, action)
//         }
//         return finalState;    // 返回的state
//     }
//     return reducer;   // 最终返回的reducer
// }
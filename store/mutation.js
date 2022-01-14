const mutations = {
	//改变登录状态
	LOGIN(state, payload) { 
		console.log("状态改变",payload)
		state.isLogin = true
		state.uerInfo = payload
		// 由于vuex 刷新会重置state，缓存信息后作为登录状态
		uni.setStorageSync("userInfo",payload)
	},
	//退出登录 
	LOGOUT(state) {
		console.log("退出登录")
		state.isLogin = false
		state.uerInfo = {}
		uni.removeStorageSync("userInfo")
	}
	
}
export default mutations;

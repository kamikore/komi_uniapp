import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from "./store"
import {socket} from 'main.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫 , 早于 APP.vue lanuch 执行
router.beforeEach((to, from, next) => {

	let userInfo = uni.getStorageSync("userInfo");
	
	if (userInfo && !store.state.isLogin) {
		store.state.userInfo = userInfo;
		store.state.isLogin = true;
		store.state.count = uni.getStorageSync(`uid${store.state.userInfo.uid}stickyCount`);
		store.state.unRead = uni.getStorageSync(`${store.state.userInfo.uid}UnRead`)
		console.log("触发login")
		if(store.state.isLogin){
			// 告知服务器我的用户id
			socket.emit("login",{
				uid: store.state.userInfo.uid
			});	
		}
	}

	if( to.path.includes("login") || store.state.isLogin) {
		next();
	} else {
		console.log("重定向")
		next({
			path: '/pages/login/index'
		})
	}
	
});
// 全局路由后置守卫
router.afterEach((to, from) => {

})

export {
	router,
	RouterMount
}

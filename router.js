import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from "./store"

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	
	if (uni.getStorageSync("userInfo")) {
		console.log("已登录")
		store.state.isLogin = true;
	}
	let isLogin = store.state.isLogin;
	// const token = uni.getStorageSync("token")
	// const islogin = uni.getStorageSync("islogin")

	// if (token) {
	// 	uni.request({
	// 		url: "http://localhost:3000/komi/users/verify",
	// 		method: "POST",
	// 		data: {
	// 			token,
	// 		},
	// 		success: function(res) {
	// 			if (res.statusCode != 200) {
	// 				console.log(res.data.errMsg)
	// 				uni.removeStorageSync("token");
	// 				uni.setStorageSync("islogin",false)
	// 				next("/subpages/login/index")
	// 			} else {
	// 				console.log("校验成功")
	// 				if(!uni.getStorageSync("islogin")) {
	// 					uni.setStorageSync("islogin",true)
	// 				}

	// 			}
	// 		}
	// 	})
	// } 
	// !uni.getStorageInfoSync("userInfo")

	// 不存在token 并且跳转的不是登录页
	if (!to.path.includes("login") && !isLogin) {
		console.log("重定向1", isLogin)
		next("/subpages/login/index")
	} else if (to.path.includes("login") && isLogin) {
		console.log("重定向2", isLogin)
		next("/pages/index/index")
	}

	next()

});
// 全局路由后置守卫
router.afterEach((to, from) => {

})

export {
	router,
	RouterMount
}

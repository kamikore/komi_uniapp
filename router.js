import { RouterMount,createRouter } from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	
	const token = uni.getStorageSync("token")
	const islogin = uni.getStorageSync("islogin")

	if (token) {
		uni.request({
			url: "http://localhost:3000/komi/users/verify",
			method: "POST",
			data: {
				token,
			},
			success: function(res) {
				if (res.statusCode != 200) {
					console.log(res.data.errMsg)
					uni.removeStorageSync("token");
					uni.setStorageSync("islogin",false)
					next("/subpages/login/index")
				} else {
					console.log("校验成功")
					uni.setStorageSync("islogin",true)
				}
			}
		})
	} 
	
	// 不存在token 并且跳转的不是登录页
	if(!to.path.includes("login") && !islogin){
		next("/subpages/login/index")
	} else if (to.path.includes("login") && islogin) {
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

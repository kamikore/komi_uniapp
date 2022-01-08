import App from './App'
// 引入了一整个function，命名为io而已
import io from "libs/socket.js"


// #ifndef VUE3
import Vue from 'vue'
import {router,RouterMount} from './router.js' 
console.log("main.js")
Vue.config.productionTip = false
Vue.use(router)

// main.js 仅执行一次，不在这连接 ?????
//  socket.io , 连接时并不用知道用户id，登录再给就行
const socket = io('http://localhost:3000')
Vue.prototype.$socket = socket;

socket.on('connect', () => {
	console.log('my socketID: ' + socket.id)
	uni.setStorageSync("socketID", socket.id)		
})

// 主动刷新，关闭没法触发，断开服务器可以
socket.on("disconnect", (reason) => {
	uni.removeStorageSync("socketID")
	console.log("断开连接:",reason)
});
console.log('vue2???')

App.mpType = 'app'
const app = new Vue({
    ...App
})


// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif


// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$socket = io('http://localhost:3000')
  console.log('vue3???')
  return {
    app
  }
}
// #endif
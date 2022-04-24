import Vue from 'vue'
import Vuex from "vuex"
import mutations from "./mutation.js"
import actions from "./action.js"
import getters from "./getter.js"

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {   
		isLogin: false,
		isUpdateContacts: false,
		// 保存当前用户信息
		userInfo: {},
		// 对象结构，便于以key为fid找到信息
		contacts: {},
		// 对象结构，同样以gid为key
		groupChats:{},
		// 记录有多少个置顶session
		count: 0,
    },  
    mutations, 
	actions,
	getters,
})

export default store
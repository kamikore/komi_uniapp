import Vue from 'vue'
import Vuex from "vuex"
import mutations from "./mutation.js"
import actions from "./action.js"
import getters from "./getter.js"

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {   
		isLogin: false,
    },  
    mutations, 
	actions,
	getters,
})

export default store
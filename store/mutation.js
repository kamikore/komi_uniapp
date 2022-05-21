import {fetchContacts, fetchGroupChats} from "@/api/index.js"

const mutations = {
	//改变登录状态
	LOGIN(state, payload) { 
		console.log("状态改变",payload)
		state.isLogin = true;
		// 由于vuex 刷新会重置state，缓存信息后作为登录状态
		state.userInfo = payload;
		uni.setStorageSync("userInfo",payload)
	},
	//退出登录 
	LOGOUT(state) {
		console.log("退出登录")
		state.isLogin = false
		state.userInfo = {};
		uni.removeStorageSync("userInfo")
	},
	
	// 保存联系人信息
	UPDATECONTACTS(state) {
		fetchContacts();
		// 更新Vuex,可覆盖
		state.contacts = uni.getStorageSync('contacts');
	},
	// 保存群组信息
	UPDATEGROUPCHATS(state) {
		fetchGroupChats();
		// 可覆盖
		state.groupChats = uni.getStorageSync('groupChats')
	},
	// 更新用户头像
	UPDATEAVATAR(state,playload) {
		state.userInfo.avatar = playload
		uni.setStorageSync("userInfo",state.userInfo)
	},
	// 更新用户朋友圈封面
	UPDATECOVER(state,playload) {
		state.userInfo.cover = playload
		uni.setStorageSync("userInfo",state.userInfo)
	},
	// 更新未读信息数据
	UPDATEUNREAD(state,playload) {
		if(!(typeof state.unRead === 'object')) {
			state.unRead = {fid:{},gid:{}}
		}
		if(playload.isGroup) {
			state.unRead.gid[playload.id]?state.unRead.gid[playload.id]+=1:state.unRead.gid[playload.id] = 1
		} else {
			state.unRead.fid[playload.id]?state.unRead.fid[playload.id]+=1:state.unRead.fid[playload.id] = 1
		}
		
		uni.setStorageSync(`${state.userInfo.uid}UnRead`,state.unRead)
	},
	// 清除未读信息
	CLEARUNREAD(state,playload) {
		
		if(!(typeof state.unRead === 'object')) return
		if(playload.isGroup) {
			state.unRead.gid[playload.id]?state.unRead.gid[playload.id] = 0:''
		} else {
			state.unRead.fid[playload.id]?state.unRead.fid[playload.id] = 0:''
		}
		console.log("清空未读",state.unRead)
		uni.setStorageSync(`${state.userInfo.uid}UnRead`,state.unRead)
	}
	
	
	
}
export default mutations;

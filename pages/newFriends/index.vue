<template>
	<view class="newFriends-container">
		<view class="newFriendsList" v-if="newFriends" >
			 <view class="" v-for="(val,key) in newFriends" :key="key">
			 	好友请求来自{{val}}
				<button type="default" @click="agreeFriend(val.uid,val.nickName)">接受</button>
			 </view>
		</view>
	</view>
</template>

<script>
import {addContact} from "@/api/index.js"
export default {
	name: "newFriends",
	data() {
		return {
			newFriends: {},
		};
	},
	methods: {
		agreeFriend(fid,nickName) {
			addContact(fid,nickName)
			// 发送消息，通知已成为好友
			// this.$socket.emit("chatMsg",{
			// 	msg: "已成为好友",
			// 	fid,		// 发出去，发别人的id	
			// 	uid: uni.getStorageSync("userInfo").uid,		// 还需要附上自己的id
			// 	type: 0,
			// })
		}
	},
	onLoad() {

	},
	onShow() {
		const newFriends = uni.getStorageSync("newFriends");
		
		if(Object.keys(newFriends).length != 0) {
			this.newFriends = newFriends;
		}
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: "/search/index"
		})
	}
};
</script>

<style lang="scss" scoped>
</style>

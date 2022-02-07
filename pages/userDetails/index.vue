<template>
	<view class="userDetail-container">
		<view class="user-wrap">
			{{userInfo}}
		</view>
		<button type="default" @click="goChat">发送消息, 自己或是已在联系人中</button>
		<button type="default" v-if="!isContact" @click="addToContacts">添加到通讯录</button>
		
	</view>
</template>

<script>

export default {
	name: "userDetails",
	data() {
		return {
			userInfo:"",
			isContact: false,
		};
	},
	methods: {
		goChat() {
			uni.navigateTo({
				url:`../chatroom/index?uid=${this.userInfo.user_id}`
			})
		},
		addToContacts() {
			uni.navigateTo({
				url: "../addContacts/index"
			})
		}
	},
	onLoad(option) {
		if(uni.getStorageSync("contacts").hasOwnProperty(option.uid) || uni.getStorageSync("userInfo").uid == option.uid)  {
			this.isContact = true;
		}
		// 判断对象为空
		if(Object.keys(option).length == 0) {
			console.log("没有提供ID")
			return;
		}		
		uni.request({
			url: "http://localhost:3000/komi/users/detail",
			method:"GET",
			data: option,
			success: res =>  {
				// 当前详情页用户信息
				this.userInfo = res.data
			}
			
		})
	},
};
</script>

<style lang="scss" scoped>
	.user-wrap{
		width: 100%;
		height: 300rpx;
		background: #C0C0C0;
	}
</style>

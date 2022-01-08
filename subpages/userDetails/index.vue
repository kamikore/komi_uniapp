<template>
	<view class="userDetail-container">
		<view class="user-wrap">
			{{userInfo}}
		</view>
		<button type="default" @click="goChat">发送消息, 自己或是已在联系人中</button>
		<button type="default" @click="addContact">添加到通讯录</button>
		
	</view>
</template>

<script>
	
export default {
	name: "userDetails",
	data() {
		return {
			userInfo:"",
		};
	},
	methods: {
		goChat() {
			uni.navigateTo({
				url:`/subpages/chatroom/index?uid=${this.userInfo.id}`
			})
		},
		addContact() {
			console.log(uni.getStorageInfoSync("userInfo"))
			uni.request({
				url: "http://localhost:3000/komi/users/add",
				method:"POST",
				// 提供添加人的ID, 以及自己的ID
				data: {
					fid: this.userInfo.id,
					uid: uni.getStorageSync("uid"),
					remarkName: this.userInfo.nickName,
				},
				success: res =>  {
					if(res.statusCode != 200) {
						console.log(res.data.errMsg)
					} else {
						console.log("添加成功")
					}
				}
				
			})
		}
	},
	onLoad(option) {
		console.log(option)
		if(Object.keys(option).length == 0) {
			console.log("没有提供ID")
			return;
		}
		uni.request({
			url: "http://localhost:3000/komi/users/detail",
			method:"GET",
			data: option,
			success: res =>  {
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

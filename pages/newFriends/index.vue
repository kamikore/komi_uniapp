<template>
	<view class="newFriends-container">
		<view class="newFriendsList" v-if="newFriends" >
			 <view class="item" v-for="(val,key) in newFriends" :key="key">
				<view class="userInfo">
					<view class="avatar"><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
					<view class="info">
						<view class="nickName">{{val.msg_from.nickName}}</view>
						<view class="remark">{{val.msg_content}}</view>
					</view>
				</view>
				<!-- 需要view 包裹，flex 才正常布局 -->
				<view class=""><button type="default" @click="agreeFriend(val)">接受</button></view>
			 </view>
		</view>
	</view>
</template>

<script>
import {fetchContact,addContact} from "@/api/index.js"
export default {
	name: "newFriends",
	data() {
		return {
			newFriends: {},
		};
	},
	methods: {
		agreeFriend(contact) {
			console.log(contact)
			// 接受后，发起请求双方入库，并发起请求更新用户列表
			addContact(contact.msg_from instanceof Object?contact.msg_from.user_id:contact.msg_from,contact.msg_content)
			fetchContact()		
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
			url: "../search/index"
		})
	}
};
</script>

<style lang="scss" scoped>
	
.newFriendsList {
	
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 96%;
		height: 100rpx;
		padding: 10rpx 2%;
		background: #4CD964;
		
		.userInfo {
			display: flex;
			justify-content: space-between;
			
			.avatar {
				padding-right: 20rpx;			
					
				image {
					width: 80rpx;
					height: 80rpx;
					background: #F0F0F0;
				}
			}
			
			.info {
				.nickName {
					font-size: 32rpx;
				}
				
				.remark {
					font-size: 28rpx;
					color: #8F939C;
				}
			}
		}
		
		button {
			width: 100rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		
		
	}
}
</style>

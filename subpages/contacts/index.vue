<template>
	<view class="contacts-container">
		<Header title="contacts"></Header>
		<view class="fun-area">扩展区域
			<view class="newFriends" @click="goNewFriends">
				新的朋友
				<view class="newFriendsList" v-if="newFriends" >
					 <view class="" v-for="(item,index) in newFriends" :key="index">
					 	好友请求来自{{item.fid}}
					 </view>
				</view>
			</view>
			
		</view>
		<view class="contact-list">
			<view class="contact-item">
				<view class="initials">A</view>
				<view class="user" v-for="(val,key) in contacts" :key="key" @click="goDetail(key)">
					<view class="avatar"><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
					<view class="username">{{val.remarkName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Header from "@/components/header/index"
export default {
	name: "contacts",
	components:{
		Header,
	},
	data() {
		return {
			// 对象结构，便于以key为fid找到信息
			contacts: {},
			newFriends: [],
		};
	},
	methods: {
		goDetail(fid) {
			uni.navigateTo({
				url: `/subpages/userDetails/index?uid=${fid}`
			})
		},
		goNewFriends() {
			
		},
	},
	onLoad() {

	},
	onShow() {
		console.log(this.contacts)
		this.contacts = uni.getStorageSync("contacts") ;
	},
};
</script>

<style lang="scss" scoped>

.fun-area {
	width: 100%;
	height: 300rpx;
}
	
.contact-list {
	.contact-item {
		.initials{
			height: 50rpx;
			background: #C0C0C0;
		}
		
		.user {
			display: flex;
			column-gap: 20rpx;
			
			.avatar {
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}	
		}
	}
}
</style>

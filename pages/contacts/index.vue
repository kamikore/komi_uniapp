<template>
	<view class="contacts-container">
		<view class="fun-area">扩展区域
			<view class="newFriends" @click="goNewFriends">
				新的朋友
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
import {fetchContact} from "api"
export default {
	name: "contacts",
	data() {
		return {
			// 对象结构，便于以key为fid找到信息
			contacts: {},
		};
	},
	methods: {
		goDetail(fid) {
			uni.navigateTo({
				url: `/userDetails/index?uid=${fid}`
			})
		},
		goNewFriends() {
			uni.navigateTo({
				url: "../newFriends/index"
			})
		},
	},
	onLoad() {
		console.log("onLoad 一次")
	},
	onShow() {
		fetchContact()
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

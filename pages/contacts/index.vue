<template>
	<view class="contacts-container">
		<view class="fun-area">
			<view class="item newFriends" @click="goNewFriends">
				<i class="iconfont icon-addfriends"></i>
				<text>新的朋友</text>
			</view>
		</view>
		<view class="contact-list">
			<view class="contact-item">
				<view class="initials">A</view>
				<view class="user" v-for="(val,key) in contacts" :key="key" @click="goDetail(key)">
					<view class="avatar"><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
					<view class="nickName">{{val.remarkName}}</view>
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
				url: `../userDetails/index?uid=${fid}`
			})
		},
		goNewFriends() {
			uni.navigateTo({
				url: "../newFriends/index"
			})
		},
	},
	onLoad() {
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
	// height: 300rpx;
	background: #00B0FF;
	
	.item {
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		line-height: 80rpx;
		vertical-align: middle;
		padding: 10rpx 20rpx;
		
		i {
			display: inline-block;
			width: 80rpx;
			height: 80rpx;	
			text-align: center;
			margin-right: 20rpx;
			border-radius: 10rpx;
			background: #F3A73F;
			
			&::before {
				color: #F0F0F0;
				font-size: 60rpx;
			}
		}
		
		text {
			//需要指定top 才对齐 ？？？？
			vertical-align: top;
		}
	}
}
	
.contact-list {
	.contact-item {
		.initials{
			height: 50rpx;
			background: #ededed;
		}
		
		.user {
			display: flex;
			padding: 10rpx 20rpx;
			
			.avatar {
				image {
					height: 60rpx;
					width: 60rpx;
					padding-right: 20rpx;
				}
			}	
			
			.nickName {
				line-height:60rpx ;
			}
		}
	}
}
</style>

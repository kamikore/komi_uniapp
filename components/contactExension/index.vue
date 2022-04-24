<template>
	<view class="contact-extension">
		<view class="item newFriends" @click="goNewFriends">
			<i class="iconfont icon-addfriends"></i>
			<text>新的朋友</text>
		</view>
		<view class="item newFriends" @click="goGroupChats">
			<i class="iconfont icon-addfriends"></i>
			<text>群聊</text>
		</view>
	</view>
</template>

<script>
import {fetchGroupChats} from "@/api"
	
export default {
	name:"contactExension",
	data() {
		return {
			
		};
	},
	methods:{
		goNewFriends() {
			uni.navigateTo({
				url: "../newFriends/index"
			})
		},
		goGroupChats() {
			uni.navigateTo({
				url: "../groupChats/index"
			})
		}
	}
}
</script>

<style lang="scss">
.contact-extension {
	width: 100%;
	// height: 300rpx;
	
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
</style>

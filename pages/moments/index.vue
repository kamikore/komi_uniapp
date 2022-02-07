<template>
	<view class="moments">
		<view class="header-banner" :class="{expand: isExpand}" :style="{backgroundImage: `url(${bgImg})`}" @click="expandBanner">
			<view class="userInfo">
				<text>{{userInfo.nickName}}</text>
				<image src="../../static/images/chatroom/emoji.png" mode=""></image>
			</view>
			<view v-show="isExpand" class="chooseCover" @click.stop="chooseCover">
				<i class="iconfont"></i>
				<text>Change Cover</text>
			</view>
		</view>
		<moment-list></moment-list>
	</view>
</template>

<script>
import momentList from "@/components/momentList"

export default {
	name: "moments",
	components:{
		momentList
	},
	data() {
		return {
			bgImg: "../static/logo.png",
			userInfo: uni.getStorageSync("userInfo"),
			isExpand: false,
		};
	},
	methods: {
		expandBanner() {
			this.isExpand = true;
		},
		chooseCover() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					console.log(res)
				},
				fail: (err) => {
					console.log(err.errMsg)
				}
			})
		},
	}
};
</script>

<style lang="scss" scoped>

.moments {
	.header-banner {
		position: relative;
		width: 100vw;
		height: 30vh;
		background-size: cover;
		
		
		.userInfo {
			position: absolute;
			right: 50rpx;
			bottom: -50rpx;
			display: flex;
			
			text {
				padding-top: 20rpx;
				color: #000000;
			}
			
			image {
				width: 120rpx;
				height: 120rpx;
				background-color: #F1F1F1;
				border-radius: 20rpx;
				margin-left: 20rpx;
			}
		}
		
		.chooseCover {
			
		}
	}
}
	
</style>

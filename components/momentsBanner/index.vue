<template>
	<view
		class="header-banner" 
		:class="{expand: isExpand}" 
		:style="{backgroundImage: `url(${userInfo.cover || '../static/images/moments/cover.jpeg'})`}" 
		@click="expandBanner"
	>
		<view class="userInfo" v-show="!isExpand">
			<text>{{userInfo.nickName}}</text>
			<image @click.stop="goDetail" :src="userInfo.avatar || '../../static/images/test/7.jpg'" mode=""></image>
		</view>
		<view v-show="isExpand" class="chooseCover" @click.stop="chooseCover">
			<i class="iconfont icon-img"></i>
			<text>更换封面</text>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import {uploadAvatarOrCover} from "@/api"

export default {
	name: "momentsBanner",
	computed:mapState(['userInfo']),
	data() {
		return {
			isExpand: false,
		};
	},
	methods: {
		expandBanner() {
			this.isExpand = !this.isExpand;
		},
		chooseCover() {
			uni.chooseImage({
				count:1,
				sizeType:['compressed'],
				success: (res) => {
					const file = res.tempFiles[0];
					const reader = new FileReader();
					reader.readAsDataURL(file); 
					reader.onload = () => {
						uploadAvatarOrCover(this.userInfo.account,reader.result,file.type.split("/")[1],'cover')
					}
				},
				fail(err) {
					uni.showToast({
						title:err.errMsg,
						icon:'error'
					})
				}
			})
		},
		goDetail() {
			uni.navigateTo({
				url: `../userDetails/index?fid=${this.userInfo.uid}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.expand {
		height: 50vh !important;
	}
	
	.header-banner {
		position: relative;
		width: 100%;
		height: 30vh;
		margin-bottom: 100rpx;
		transition: all 0.2s ease-in-out;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		
		.userInfo {
			position: absolute;
			right: 50rpx;
			bottom: -50rpx;
			display: flex;
			
			text {
				padding-top: 20rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 600;
				letter-spacing: 1rpx;
				text-shadow: 0 0 4rpx #3E4347 ,
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
			position: absolute;
			bottom: 20rpx;
			right: 50rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			
			.iconfont {
				font-size: 40rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
<template>
	<view class="momentItem">
		<view class="avatar">
			<image :src="item.userInfo.avatar" mode=""></image>
		</view>
		<view class="info">
			<view class="">
				<text class="userName" @click="goDetail">{{item.userInfo.remarkName}}</text>
				<text class="dateTime">{{item.dateTime}}</text>
			</view>
			<view class="content">{{item.text}}</view>
			<view class="imgs">
				<image v-for="(img,index) in item.imgs" :key="index" :src="img" mode="aspectFill"></image>
			</view>
			<view class="footer">
				<view class="operations" :class="{isShow: showOperate}">
					<button type="default">Like</button>
					<button type="default">Comment</button>
				</view>
				<i class="iconfont " @click="showOperate=!showOperate">...</i>
			</view>
		</view>
	</view>
</template>

<script>
import {DateToDateTime} from "@/utils"

export default {
	name: "momentItem",
	props: ["item"],
	data() {
		return {
			showOperate: false,
		};
	},
	methods: {
		goDetail() {
			uni.navigateTo({
				url: `/pages/userDetails/index?uid=${this.item.userInfo.user_id}`,
			})
		},
	},
	created() {
		this.item.dateTime = DateToDateTime(this.item.dateTime);
	}
};
</script>

<style lang="scss" scoped>
.momentItem {
	display: flex;
	margin-bottom: 32rpx;
	border-bottom: 2rpx solid #EDEDED;

	
	.avatar {
		image {
			width: 96rpx;
			height: 96rpx;
			border-radius: 20rpx;
			background-color: #FFA726;
			margin-right: 20rpx;
		}
	}
	
	.info {
		flex: 1;
		
		.userName {
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #3E4347;
		}
		
		.content {
			margin: 6rpx 0 20rpx 0;
			// letter-spacing: 1rpx;
			color: #ADB5BD;
		}
		
		.dateTime {
			float: right;
			color: #3E4347;
		}
		
		.imgs {
			display: flex;
			flex-wrap: wrap;
			column-gap: 3%;
			
			
			image {
				width: 30%;
				height: 150rpx;
				object-fit: cover;
				margin-bottom: 3%;
				
			} 
			
		}
		
		.footer {
			display: flex;
			justify-content: space-between;
						
			.operations {
				display: flex;
				border-radius: 10rpx;
				overflow: hidden;
				transform: scaleX(0);
				transition: all 0.1s ease; 
				transform-origin: right;
				
				button {
					background-color: #2e2e2e;
					border-radius: 0;
					padding: 0 20rpx;
					font-size: 30rpx;
					color: #F0F0F0;
				}
			}
			
			.iconfont {
				color: #A4A4A4;
			}
			
			.isShow {
				transform: scaleX(1);
			}
			
		}
	}
}
	
</style>

<template>
	<view class="momentItem">
		<view class="avatar">
			<image :src="item.userInfo.avatar" mode=""></image>
		</view>
		<view class="info">
			<text @click="goDetail">{{item.userInfo.remarkName}}</text>
			<view class="text">{{item.text}}</view>
			<view class="content">{{item.content}}</view>
			<view class="footer">
				<text>{{item.dateTime}}</text>
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
	padding-bottom: 40rpx;
	border-bottom: 2rpx #000000 solid;	

	
	.avatar {
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 20rpx;
			background-color: #FFA726;
			margin-right: 40rpx;
		}
	}
	
	.info {
		flex: 1;
		
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
			
			.isShow {
				transform: scaleX(1);
			}
			
		}
	}
}
	
</style>

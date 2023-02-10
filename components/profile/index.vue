<template>
	<view class="profile-container">
		<view id="profile">
			<view class="avatar">
				<image 
					:src="(contactInfo?contactInfo.avatar:userInfo.avatar) || '../../static/images/future.png'" 
					mode="aspectFill">
				</image>
				{{(contactInfo?contactInfo.avatar:userInfo.avatar) || '../../static/images/future.png'}}
			</view>
			<view class="info">
				<text class="nickName">{{ contactInfo?contactInfo.nickName:userInfo.nickName }}</text>
				<text class="account">{{   contactInfo?contactInfo.account:userInfo.account}}</text>
				<text class="region">地区：{{contactInfo?contactInfo.region:userInfo.region}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
	
	
export default {
	name: "profile",
	computed:mapState(['userInfo']),
	props:['contactInfo'],
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.profile-container {
	// height: 570rpx;
	
	#profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: #FFFFFF;
		
		.avatar {
			height: 200rpx;
			width: 200rpx;
			margin: 0 0 32rpx 0;
			border-radius: 40rpx;
			overflow: hidden;
			
			
			image {
				height: 100%;
				width: 100%;
			}
			
			
		}
		
		.info {
			display: flex;
			flex-direction: column;
			text-align: center;
			
			.nickName {
				font-weight: 600;
				font-size: 44rpx;
				font-family: 'Fira Sans Condensed';
			}
			
			.account {
				line-height: 40rpx;
				font-size: 32rpx;
				color: #A4A4A4;
				margin: 16rpx 0 12rpx 0;
			}
			
			.region {
				line-height: 40rpx;
				font-size: 32rpx;
				color: #2C37E1;
			}
		}
	}
	
}
</style>

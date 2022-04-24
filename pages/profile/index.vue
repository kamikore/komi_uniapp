<template>
	<view class="profile-container">
		<view id="profile">
			<view class="avatar"><image src="@/static/images/test/7.jpg" mode=""></image></view>
			<view class="info">
				<view class="nickName">{{ userInfo.nickName }}</view>
				<view class="account">{{userInfo}}</view>
			</view>
		</view>
			{{isSwitch}}
		<view id="switch">
			<view id="slider" :style="{left: isSwitch?'calc(50% - 4rpx)':'4rpx'}"></view>
			<button :class="isSwitch?'':'active'" type="default" @click="isSwitch = 0">Chat</button>
			<button :class="isSwitch?'active':''" type="default" @click="isSwitch = 1">intro</button>
		</view>
		<view id="contentBox">
			<!-- <component is=""></component> -->
			<view class="intro"><view class="content">intro</view></view>
			<view class=""><button type="default" @click="logout">退出登录</button></view>
		</view>
		
		
	</view>
</template>


<script>
import {mapState} from "vuex"
	
export default {
	name: 'profile',
	computed:mapState(['userInfo']),
	data() {
		return {
			isSwitch: 0
		}
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		
		logout() {
			this.$store.state.isLogin = false;
			uni.removeStorageSync('userInfo');
			uni.setStorageSync("islogin",false)
			uni.navigateTo({
				url: '/pages/login/index'
			});
		}
		
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #FFFFFF;
}

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
		margin: 32rpx 0;
		border-radius: 40rpx;
		overflow: hidden;
		
		
		image {
			height: 100%;
			width: 100%;
		}
		
		
	}
	
	.info {
		.nickName {
			font-size: 40rpx;
			font-weight: bold;
		}
	}
}

#switch {
	position: relative;
	height: 100rpx;
	width: 100%;
	margin: 48rpx;
	display: flex;
	align-items: center;
	background-color: #ededed;
	border-radius:24rpx;
	
	#slider {
		position: absolute;
		top: 4rpx;
		left: 4rpx;
		width: 50%;
		height: 92rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		transition: all 0.5s ease-in-out;
	}
	
	.active {
		color: #2C37E1;
	}
	
	button {
		width: 100%;
		line-height: 90rpx;
		background-color: transparent;
		color: #A4A4A4;
		transition: all 0.5s ease-in-out;
	}
}

</style>

<template>
	<view class="me-container">
		<view class="userInfo">
			<view class="avatar"><image src="@/static/images/test/7.jpg" mode=""></image></view>
			<view class="info">
				<view class="nickName">{{ userInfo.nickName }}</view>
				<view class="account">{{userInfo}}</view>
			</view>
		</view>
		<view class="intro"><view class="content">intro</view></view>
		<view class=""><button type="default" @click="logout">退出登录</button></view>
	</view>
</template>

<script>
export default {
	name: 'me',
	data() {
		return {
			userInfo: uni.getStorageSync('userInfo')
		};
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
			// uni.setStorageSync("islogin",false)
			uni.navigateTo({
				url: '/pages/login/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}

.userInfo {
	display: flex;
	width: 100%;
	height: 20vh;
	padding: 40rpx 20rpx;
	padding-top: var(--status-bar-height);
	background: #FFFFFF;
	
	.avatar {
		padding-right: 20rpx;
		
		image {
			height: 100rpx;
			width: 100rpx;
		}
	}
	
	.info {
		.nickName {
			font-size: 40rpx;
			font-weight: bold;
		}
	}
}
</style>

<template>
	<view class="me-container">
		<view class="userInfo">
			<view class="avatar">
				<image src="@/static/images/test/7.jpg" mode=""></image>
			</view>
			<view class="info">
				<view class="">
					{{userInfo}}
				</view>
			</view>
		</view>
		<view class="intro">
			<view class="content">
				intro
			</view>
		</view>
		<view class=""><button type="default" @click="logout">退出登录</button></view>
	</view>
</template>

<script>
	
export default {
	name: "me",
	data() {
		return {
			userInfo: uni.getStorageSync("userInfo"),
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
			    uni.removeStorageSync("userInfo");
				// uni.setStorageSync("islogin",false)
				uni.navigateTo({
					url: "/pages/login/index"
				})
	
		}
	}
};
</script>

<style lang="scss" scoped>
</style>

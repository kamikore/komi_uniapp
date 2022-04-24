<template>
	<view class="login-container">
<!-- 		<view class="header-wrap">
			<view class="header">
				<view class="header-left"></view>
				<view class="header-right" @click="goPage">phone number lr</view>
			</view>
		</view> -->
		<view class="banner">左右头</view>
		<button type="default" @click="goIndex()">进入主页</button>
		<loginForm></loginForm>
		<registerForm></registerForm>
	</view>
</template>

<script>
import loginForm from "@/components/loginForm"
import registerForm from "@/components/registerForm"
export default {
	name: 'Login',
	components: {
		loginForm,
		registerForm	
	},
	data() {
		return {
			inputStyles: {
				color: "blue",
			},
			placeholderStyle: "font-size: 30rpx"
		};
	},
	methods: {
		goIndex() {
			uni.switchTab({
				url: "/pages/index/index"
			})
		},
		goPage() {
			console.log("goPage")
			uni.switchTab({
				url: "/pages/index/index"
			})
		},
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},	
	},
};
</script>

<style lang="scss" scoped>
page {
	background: #ededed;
}


// .header {
// 	justify-content: space-between;
// 	background: #fff;
// 	box-shadow: 0px 2.8px 3.7px rgba(0, 0, 0, 0.028), 0px 9.4px 12.5px rgba(0, 0, 0, 0.042), 0px 42px 56px rgba(0, 0, 0, 0.07);

// 	.header-left {
// 		image {
// 			width: 26rpx;
// 			height: 46rpx;
// 		}
// 	}
// 	.header-right {
// 		margin-right: 20rpx;
// 	}
// }

.banner {
	width: 100%;
	height: 200rpx;
	background: #fff;
}


</style>

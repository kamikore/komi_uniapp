<template>
	<view class="login-container">
		<view class="header-wrap">
			<view class="header">
				<view class="header-left"></view>
				<view class="header-right">phone number lr</view>
			</view>
		</view>
		<view class="banner">左右头</view>
		<login-form></login-form>
		<register-form></register-form>
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
.box {
	width: 750rpx;
	height: 750rpx;
}
.box-item {
	width: 250rpx;
	height: 250rpx;
	background-color: #00aaff;
}

.header {
	justify-content: space-between;
	background: #fff;
	box-shadow: 0px 2.8px 3.7px rgba(0, 0, 0, 0.028), 0px 9.4px 12.5px rgba(0, 0, 0, 0.042), 0px 42px 56px rgba(0, 0, 0, 0.07);

	.header-left {
		image {
			width: 26rpx;
			height: 46rpx;
		}
	}
	.header-right {
		margin-right: 20rpx;
	}
}

.banner {
	width: 100%;
	height: 200rpx;
	background: #fff;
}


</style>

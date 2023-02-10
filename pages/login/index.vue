<template>
	<view class="login-container">
<!-- 		<view class="header-wrap">
			<view class="header">
				<view class="header-left"></view>
				<view class="header-right" @click="goPage">phone number lr</view>
			</view>
		</view> -->
		<view id="switch">
			<view id="slider" :style="{left: isSwitch?'calc(50% - 4rpx)':'4rpx'}"></view>
			<button :class="isSwitch?'':'active'" type="default" @click="switchLogin">Login</button>
			<button :class="isSwitch?'active':''" type="default" @click="switchRegister">Register</button>
		</view>
		<loginForm v-show="!isSwitch"></loginForm>
		<registerForm v-show="isSwitch"></registerForm>
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
			isSwitch: 0,
		};
	},
	methods: {
		switchLogin() {
			this.isSwitch = 0
			uni.setNavigationBarTitle({
				title: "用户登录",
				success: ()=> {
					console.log("设置成功")
				},
				fail: (e) => {
					console.log('设置失败',e)
				}
			});
		},
		switchRegister() {
			this.isSwitch = 1
			uni.setNavigationBarTitle({
				title: "用户注册",
				success: ()=> {
				},
				fail: (e) => {
					console.log('切换失败',e)
				}
			});
		}
		
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



#switch {
	position: relative;
	height: 100rpx;
	width: calc(100% - 48rpx*2);
	margin: 24rpx 48rpx 48rpx 48rpx;
	display: flex;
	align-items: center;
	background-color: #ededed;
	border-radius:24rpx;
	
	#slider {
		position: absolute;
		top: 5rpx;
		left: 6rpx;
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
		font-family: 'Mulish';
		font-style: normal;
		font-weight: 600;
		font-size: 32rpx;
		background-color: transparent;
		color: #A4A4A4;
		transition: all 0.5s ease-in-out;
		
	}
}


</style>

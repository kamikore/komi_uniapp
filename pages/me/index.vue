<template>
	<view class="me-container">
		<profile></profile>
		<view id="switch">
			<view id="slider" :style="{left: isSwitch?'calc(50% - 4rpx)':'4rpx'}"></view>
			<button :class="isSwitch?'':'active'" type="default" @click="isSwitch = 0">Chat</button>
			<button :class="isSwitch?'active':''" type="default" @click="isSwitch = 1">intro</button>
		</view>
		<view id="contentBox">
			<component v-if="!isSwitch" is="momentList"></component>
			<view class="" v-else>
				<button type="default" @click="goMoments">朋友圈详情</button>
				<button type="default" @click="logout">退出登录</button>
			</view>
		</view>
		<view class="tabbarShadow"></view>
	</view>
</template>


<script>
import profile from "@/components/profile"
import momentList from "@/components/momentList"

	
export default {
	name: 'me',
	components:{
		profile,
		momentList
	},
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
		goMoments() {
			uni.navigateTo({
				url: '/pages/moments/index'
			});
		},
		logout() {
			this.$store.state.isLogin = false;
			uni.removeStorageSync('userInfo');
			uni.navigateTo({
				url: '/pages/login/index'
			});
		}
		
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			uni.navigateTo({
				url: '/pages/userInfo/index'
			});
		}
	},
	
	onHide() {
		this.isSwitch = 0
	},
};
</script>

<style lang="scss" scoped>
page {
	background-color: #FFFFFF;
}

.me-container {
	
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
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			background-color: transparent;
			color: #A4A4A4;
			transition: all 0.5s ease-in-out;
			
		}
	}
	
	#contentBox {
		
		button {
			width: 50%;
			line-height: 90rpx;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			background-color:#2C37E1;
			border-radius: 20rpx;
			color: #FFFFFF;
			margin-bottom: 48rpx;
		}
	}
}

</style>

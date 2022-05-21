<template>
	<view>
		<view class="livePlay-container">
			<view class="mask">
				<view class="statusInfo"><text>等待用户接受邀请...</text></view>
				<view class="avatar">
					<view class=""><image src="../../static/images/chatroom/emoji.png" mode=""></image></view>
					<text>nickName</text>
				</view>
				<view class="btnGroup">
					<button type="default">turnCamera</button>
					<button type="warn" @click="cancel">cancel</button>
					<button type="default">turnVoice</button>
					<button style="background-color: #18BC37;">confirm</button>
				</view>
			</view>
			<view>
				<video
					id="videoRec"
					:src="src"
					@error="videoErrorCallback"
					:show-center-play-btn="false"
					:direction="0"
					object-fit="cover"
					:controls="false"
					:autoplay="true"
				></video>
			</view>

		</view>
	</view>
</template>

<script>
export default {
	name: "livePlay",
	data() {
		return {
			src: "rtmp://120.79.218.59/live/komi"
		};
	},
	methods: {
		cancel() {
			uni.navigateBack()
		},
		// videoErrorCallback: function(e) {
		// 	// 提示弹窗
		// 	uni.showModal({
		// 		content: e.target.errMsg,
		// 		showCancel: false
		// 	});
		// },
	}
};
</script>

<style lang="scss" scoped>
.livePlay-container {
	position: relative;
	
	
	.mask {
		height: 100vh;
		width: 100vw;
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		
		.statusInfo {
			letter-spacing: 2rpx;
			font-weight: lighter;
			text-align: center;
			padding-top: 40rpx;
			color: #F0F0F0;
		}
		
		.avatar {
			position: absolute;
			left: 50%;
			top: 20%;
			transform: translate(-50%,0);
			text-align: center;
			
			image {
				width: 150rpx;
				height: 150rpx;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				background: #007AFF;
			}
			
			text {
				font-size: 40rpx;
				color: #F0F0F0;
			}
		}
		
		.btnGroup {
			position: absolute;
			bottom: 100rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;

			
			button {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 160rpx;
				font-size: 40rpx;
			}
		}
	}
	
	#videoRec {
		height: 100vh;
		width: 100vw;
		z-index: -1;
	}
}

</style>

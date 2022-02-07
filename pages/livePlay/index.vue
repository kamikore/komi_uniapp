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
			src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
		};
	},
	methods: {
		cancel() {
			uni.navigateBack()
		},
		videoErrorCallback: function(e) {
			uni.showModal({
				content: e.target.errMsg,
				showCancel: false
			});
		},
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

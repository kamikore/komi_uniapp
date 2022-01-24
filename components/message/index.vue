<template>
	<view class="message-container">
		<view class="dateTime">{{ item.time }}</view>
		<view class="content" :class="{ 'content-right': item.self }" :id="'fid' + item.id">
			<view class="avatar" @tap.stop="userDetail"><image src="@/static/images/Group.png" mode=""></image></view>
			<view class="info" @tap.stop>
				<!-- 只有在群聊才显示昵称 -->
				<!-- <text class="username">kamikore</text> -->
				<!-- audio -->
				<view v-if="item.type === 1" class="message audio" @tap="playAudio(item.msg.src)">
					<image src="@/static/images/chatroom/audio.png" mode=""></image>
					<text>{{ item.msg.clock }}</text>
				</view>

				<!-- image-->
				<view v-else-if="item.type === 2" class="image">
					<!-- 保持纵横比缩放图片，使图片的长边能完全显示出来 -->
					<image lazy-load="true" :src="item.msg" mode="aspectFit" @click="previewImage(item.msg)"></image>
				</view>

				<!-- video -->
				<view v-else-if="item.type === 3" class="video">
					<!-- 如何获取视频的屏幕尺寸 -->
					<!-- <video src="" object-fit="contain" style="width:200rpx;height: 200rpx;border-radius: 12px;position: relative;">
						<cover-image class="add-img-del" src=""></cover-image>
					</video> -->
					<image src="" mode="" @click="videoPlay(item.msg)"></image>
					<text class="videoDuration">{{videoDuration}}</text>
				</view>

				<!-- file -->
				<view v-else-if="item.type === 4" class="message file">
					<view class="fileInfo">
						<text>filename sdsdsdsdsdsdsdsdsdsdsds</text>
						<text>size</text>
					</view>
					<image src="" mode=""></image>
				</view>

				<!-- text -->
				<view v-else class="message">{{ item.msg }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import data from '@/common/data.js';
	
export default {
	name: 'message',
	props: ['item'],
	data() {
		return {
			videoDuration: "",
		};
	},
	methods: {
		// 图片处理
		previewImage(url) {
			const imgPaths =[];
			for(const item of data.message()) {
				if(item.type === 2 ) {
					imgPaths.push(item.msg)
				}
			}
			
			// 预览图片
			uni.previewImage({
				// 点击显示当前图片
				current: url,
				urls: imgPaths,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log('长按错误', err.errMsg);
					}
				}
			});
		},
		
		// 视频播放
		videoPlay(url) {
			uni.navigateTo({
				url:`/pages/videoPlayer/index?url=${url}`
			})
		}
	},
	created() {
		if(this.item.type === 3) {
			uni.getVideoInfo({
				src: this.item.msg,
				success: (res) => {
					this.videoDuration = Math.ceil(res.duration)
				},
				fail: (err) => {
					console.log("视频错误",err.errMsg)
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.dateTime {
	color: rgba(39, 40, 650, 0.6);
	padding: 20rpx 0;
	text-align: center;
}

.content {
	display: flex;
	// #ifdef H5
	column-gap: 20rpx;
	padding: 0 10rpx;
	// #endif

	// #ifdef APP
	// justify-content: space-between;
	// #endif

	.avatar {
		display: block;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;
		}
		// #ifdef APP
		padding: 0 20rpx;
		// #endif
	}

	.info {
		border: 0;
		max-width: 75%;

		.username {
			display: block;
			margin-bottom: 20rpx;
		}

		// 包裹消息框的
		.message {
			position: relative;
			padding: 20rpx 40rpx;
			// view 默认自带一点小的灰色边框
			border: 1rpx solid transparent;
			border-radius: 10rpx;
			word-break: break-all;
			background: #fff;

			&:after {
				content: '';
				position: absolute;
				left: -22rpx;
				top: 20rpx;
				width: 0;
				height: 0;
				border: 12rpx solid transparent;
				border-right-color: #fff;
			}
		}

		.audio {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100rpx;

			image {
				width: 28rpx;
				height: 36rpx;
			}
		}

		.image {
			image {
				max-width: 400rpx;
				min-height: 200rpx;
				max-height: 400rpx;
				min-height: 300rpx;
			}
		}

		.video {
			position: relative;
			
			image {
				position: relative;
				max-width: 400rpx;
				min-height: 200rpx;
				max-height: 400rpx;
				min-height: 300rpx;
				border-radius: 24rpx;
				background: #000000;
				
				&::before {				
					content: "sdsd";
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
			

			.videoDuration {
				position: absolute;
				right: 20rpx;
				bottom: 20rpx;
				font-size: 32rpx;
				color: #F0F0F0;
				z-index: 1;
			}
			
			
	
		}

		.file {
			display: flex;
			column-gap: 40rpx;

			.fileInfo {
				text {
					font-size: 36rpx;
					background: #007aff;
					/* 需要有宽度 */
					width: 300rpx;
					/* 超过了就隐藏 */
					overflow: hidden;
					/* 超过了就显示省略号 */
					text-overflow: ellipsis;

					/* webkit内核的浏览器 */
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					// 溢出换行
					overflow-wrap: break-word;
				}
			}

			image {
				width: 100rpx;
				height: 100rpx;
				background: #007aff;
			}
		}
	}
}

// 自己发送的信息样式
.content-right {
	justify-content: flex-end;

	// 信息部分放到最前
	.info {
		order: -1;
		// text-align: left;

		.message {
			background: #f0ad4e;

			&:after {
				// content: "";
				left: 100%;
				transform: rotateY(180deg);
				border-right-color: #f0ad4e;
			}
		}

		.audio {
			image {
				order: 1;
				transform: rotateY(180deg);
			}
		}

		.file {
			.fileInfo {
				text-align: left;
			}
		}
	}
}
</style>

<template>
	<view class="chatroom-container">
		<view class="header-wrap">
			<view class="header">
				<view class="header-left" @tap="goBack"><image src="@/static/images/common/back.png"></image></view>
				<view class="header-center"><image src="" mode="">logo</image></view>
				<view class="header-right"><image src="@/static/images/common/more.png"></image></view>
			</view>
		</view>
		<!-- 需要阻止内部的冒泡 -->
		<scroll-view 
			class="message-content-list" 
			scroll-y="true"  
			@tap="closeExtend"
			scroll-with-animation="true"
		>
			<view class="content-list">
				<view class="content-list-item" v-for="(item, index) in message_list" :key="item.id">
					<view class="dateTime">{{ item.time }}</view>
					<view class="content" :class="{ 'content-right': item.self }">
						<view class="avatar" @tap.stop="userDetail"><image src="@/static/images/Group.png" mode=""></image></view>
						<view class="info" @tap.stop>
							<text class="username">kamikore</text>
							<!-- audio -->
							<view v-if="item.type === 1" class="message audio" @tap="playAudio(item.msg.src)">
								<image src="@/static/images/chatroom/audio.png" mode=""></image>
								<text>{{ item.msg.clock }}</text>
							</view>

							<!-- image-->
							<view v-else-if="item.type === 2" class="image">
								<!-- 保持纵横比缩放图片，使图片的长边能完全显示出来 -->
								<image :src="item.msg" mode="aspectFit"></image>
							</view>

							<!-- video -->
							<view v-else-if="item.type === 3" class="video">
								<!-- 如何获取视频的屏幕尺寸 -->
								<video src="" controls></video>
							</view>

							<!-- file -->
							<view v-else-if="item.type === 4" class="message file">
								<view class="fileInfo">
									<text>filenamesdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdssdssd</text>
									<text>size</text>
								</view>
								<image src="" mode=""></image>
							</view>

							<!-- text -->
							<view v-else class="message">{{ item.msg }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<send-box :fid="fid"></send-box>
	</view>
</template>

<script>
import data from '@/common/data.js';
import sendBox from '@/components/sendBox';
import { createInnerAudioContext } from '@/utils/index.js';
const innerAudioContext = createInnerAudioContext().getInstance();

export default {
	name: 'chatroom',
	data() {
		return {
			message_list: data.message(),
			// 当前聊天用户id
			fid: "",
		};
	},
	components: {
		sendBox
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		closeExtend() {
			uni.$emit('closeExtend');
		},
		userDetail() {
			console.log('click');
		},
		playAudio(src) {
			// 函数内的变量执行完会被销毁

			// 点击新的音频会直接播放
			if (innerAudioContext.paused  || innerAudioContext.src!=src) {
				innerAudioContext.src = src;
				innerAudioContext.play();
				console.log('开始播放');
			} else {
				innerAudioContext.pause();
				console.log('暂停');
				innerAudioContext.destroy();
				console.log(innerAudioContext)
			}
			// this.innerAudioContext.onPlay(() => {
			//   console.log('开始播放');
			//   console.log(this.innerAudioContext.paused)
			// });
			// this.innerAudioContext.onError((res) => {
			//   console.log(res.errMsg);
			//   console.log(res.errCode);
			// });
		}
	},
	onLoad(option) {
		this.fid = option.uid;
		
		// 聊天室监听自己发的消息，以及当前fid 发来的消息，是监听自己的id
		uni.$on("sendAndGet",res => {
			console.log(res)
			this.message_list.push({
				id: this.message_list.length+1,
				time: res.time,
				msg: res.msg,
				type: res.type,
				self: 1,
			})
		})
		
		


	},
};
</script>

<style lang="scss" scoped>
.chatroom-container {
	.header {
		
		.header-left {
			image {
				width: 26rpx;
				height: 46rpx;
			}
		}

		.header-right {
			image {
				width: 52rpx;
				height: 12rpx;
			}
		}
	}

	.message-content-list {
		height: 100vh;

		.content-list {
			// 防止提交栏覆盖消息
			padding-bottom: 300rpx;
			.content-list-item {
				display: flex;
				flex-direction: column;

				.dateTime {
					color: rgba(39, 40, 650, 0.6);
					padding: 20rpx 0;
					text-align: center;
				}

				.content {
					display: flex;
					column-gap: 20rpx;
					padding: 0 20rpx;

					.avatar {
						display: block;
						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 20rpx;
						}
					}

					.info {
						border: 0;

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
							video {
								max-width: 400rpx;
								min-height: 200rpx;
								max-height: 400rpx;
								min-height: 300rpx;
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
						text-align: right;

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
			}
		}
	}
}
</style>

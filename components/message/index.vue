<template>
	<view class="message-container">
		<!-- id值关联着 chatroom 当前滚动的位置 -->
		<view class="content" :class="{ 'content-right': item.self }" :id="'id' + item.id">
			<view class="avatar" @tap.stop="userDetail"><image :src="avatarSrc" mode="aspectFill"></image></view>
			<view class="info" @tap.stop>
				<!-- 只有在群聊才显示昵称 -->
				<!-- <text class="username">kamikore</text> -->
				<!-- audio -->
				<view v-if="item.type === 1" class="message audio" @tap="playAudio(item.msg)">
					<!-- <image src="@/static/images/chatroom/audio.png" mode=""></image> -->
					<!-- 语音播放效果 -->
					<div class="voicePlay">
					 	 <div class="layer1"></div>
					 	 <div class="layer2" :class="voicePlay?'active':''"></div>
					 	 <div class="layer3" :class="voicePlay?'active':''"></div>
					 </div>
					<!-- 音频时间，直接从消息字段获取，API返回信息有很大延迟 -->
					<text>{{ item.voice_duration  + '“'}}</text>
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
					<canvas canvas-id="video" @click="videoPlay(item.msg)"></canvas>
					<text class="videoDuration">{{videoDuration}}</text>
				</view>

				<!-- file -->
				<view v-else-if="item.type === 4" class="message file" @click="getFile">
					<view class="fileInfo">
						<text class="fileName">{{item.msg.fileName}}</text>
						<text class="size">{{item.msg.size.split('.')[0]+' KB'}}</text>
					</view>
					<image :src="fileType(item.msg.type)" mode=""></image>
				</view>
				
				
				<!-- location -->
				<view 
					v-else-if="item.type === 6" 
					class="message location" 
					@click="openLocation(item.msg.latitude,item.msg.longitude)"
					style="background-color: #ffffff;"
				>
					<view class="locationInfo">
						<text class="name" >{{item.msg.name}}</text>
						<text class="address" >{{item.msg.address}}</text>
					</view>
					<image src="@/static/images/chatroom/map.png" mode="aspectFit"></image>
				</view>

				<!-- text -->
				<view v-else class="message">{{ item.msg }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {SecondToTime} from "@/utils"
import {createInnerAudioContext} from "@/utils"

// const innerAudioContext = createInnerAudioContext().getInstance();
// console.log("创建innerAudioContext",innerAudioContext)

export default {
	name: 'message',
	props: ['item'],
	computed: {
		avatarSrc() {
			if(this.item.self) {
				return this.$store.state.userInfo.avatar ||  '../../static/images/future.png'
			} else {
				return this.$store.state.contacts[this.item.msg_from].fid.avatar || '../../static/images/future.png'
			}
		}
	},
	data() {
		return {
			videoDuration: "",
			innerAudioContext: null,
			voicePlay: false,
		};
	},
	methods: {
		// 图片处理
		previewImage(url) {
			console.log(this.item)
			console.log("图片预览",url)
			const imgPaths =[];
			let msgList = [];
			if(this.item.isGroup) {
				msgList = uni.getStorageSync(`${this.$store.state.userInfo.uid}groupmsgWith${this.item.group_id}`)
			} else {
				msgList = uni.getStorageSync(`${this.$store.state.userInfo.uid}msgWith${this.item.msg_from}`)
			}
			 
			for(const item of msgList) {
				if(item.type === 2 ) {
					imgPaths.push(item.msg)
				}
			}
			

			console.log("图片预览数组",imgPaths)
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
		
		playAudio(src) {
			console.log("播放音频路径",src)
			
			// 函数内的变量执行完会被销毁, 音频状态也就没了
			// const innerAudioContext = createInnerAudioContext().getInstance();
			// 点击新的音频会直接播放
			if (this.innerAudioContext.paused || this.innerAudioContext.src != src) {
				this.voicePlay = true;
				this.innerAudioContext.src = src;
				this.innerAudioContext.play();
				console.log('开始播放');
			} else {
				this.voicePlay = false;
				this.innerAudioContext.pause();
				console.log('暂停');
				// innerAudioContext.destroy();
				// console.log(innerAudioContext);
			}
		},
		
		// 视频播放
		videoPlay(url) {
			console.log("视频播放路径",url)
			uni.navigateTo({
				url:`/pages/videoPlayer/index?url=${url}`
			})
		},
		
		// 文件类型判断
		fileType(type) {
			let flag = ''
			if(['jpg','jpeg','png'].indexOf(type) != -1) {
				flag = 'img'
			} else if(["mp4",'mkv','rmvb'].indexOf(type) != -1) {
				flag = 'video'
			} else if(['mp3','flac'].indexOf(type) != -1) {
				flag = 'music'
			} else if(['zip','rar','7z'].indexOf(type) != -1) {
				flag = 'rar'
			} else {
				flag = 'unkonw'
			}
			console.log("文件类型",flag)
			return `../../static/images/fileType/${flag}.png` 
		},
		
		// 跳转文件接收页面
		getFile() {
			uni.navigateTo({
				
			})
		},
		
		// 打开地图显示位置信息,输入纬度，经度
		 openLocation(latitude,longitude) {
			 uni.openLocation({
				 latitude,
				 longitude,
				 success: () => {
					 console.log("接口调用成功")
				 },
				 fail: () => {
				 	error.log("接口调用失败")
				 }
			 })
		 }
		
	},
	created() {
		switch(this.item.type) {		

			case 3: 
				console.log("视频信息",this.item)
				uni.getVideoInfo({
					src: this.item.msg,
					success: (res) => {
						// 秒数向下取整
						this.videoDuration = SecondToTime( Math.floor(res.duration))
					},
					fail: (err) => {
						console.log("视频错误",err.errMsg)
					}
				})
			break;
			
		}
	},
	mounted() {
		this.innerAudioContext = createInnerAudioContext().getInstance()
		// 注册自然播放结束事件
		this.innerAudioContext.onEnded(() => {
			this.voicePlay = false
		})
	},
	destroyed() {
		this.innerAudioContext.destroy();
	}
};
</script>

<style lang="scss" scoped>

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
			border-radius: 40rpx 40rpx 40rpx 0;
			word-break: break-all;
			background: #fff;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 400;
			font-size: 28rpx;
			line-height: 48rpx;
			color: #0F1828;


			// &:after {
			// 	content: '';
			// 	position: absolute;
			// 	left: -22rpx;
			// 	top: 20rpx;
			// 	width: 0;
			// 	height: 0;
			// 	border: 12rpx solid transparent;
			// 	border-right-color: #fff;
			// }
		}

		.audio {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 160rpx;

			// image {
			// 	width: 28rpx;
			// 	height: 36rpx;
			// }
			
			.voicePlay {
				display: flex;
				justify-content: center;
				align-items: center;
				
				@keyframes showLayer2 {
				  0% { opacity: 0;}
				  30% { opacity: 1;}
				  100% { opacity: 0;}
				}
				@keyframes showLayer3 {
				  0% { opacity: 0;}
				  60% { opacity: 1;}
				  100% { opacity: 0;}
				}
				
				.active.layer2 {
					animation: showLayer2 1s ease-in-out infinite;
				}
				
				.active.layer3 {
					animation: showLayer3 1s ease-in-out infinite;
				}
				
				.layer1 {
				  width: 40rpx;
				  height: 40rpx;
				  border-style: solid;
				  border-top-color: transparent;
				  border-left-color: transparent;
				  border-bottom-color: transparent;
				  border-radius: 50%;
				  box-sizing: border-box;
				  vertical-align: middle;
				  display: inline-block;
				  color:#A2A2A2;
				}
				
				.layer2 {
				  width: 60rpx;
				  height: 60rpx;
				  border-style: solid;
				  border-top-color: transparent;
				  border-left-color: transparent;
				  border-bottom-color: transparent;
				  border-radius: 50%;
				  box-sizing: border-box;
				  vertical-align: middle;
				  display: inline-block;
				  margin-left: -44rpx;
				  opacity: 1;
				  color:#A2A2A2;
				}
			

				.layer3 {
				  width: 80rpx;
				  height: 80rpx;
				  border-style: solid;
				  border-top-color: transparent;
				  border-left-color: transparent;
				  border-bottom-color: transparent;
				  border-radius: 50%;
				  box-sizing: border-box;
				  vertical-align: middle;
				  display: inline-block;
				  margin-left: -64rpx;
				  opacity: 1;
				  color:#A2A2A2;
				}
			}
			
			text {
				
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
			
			canvas {
				position: relative;
				max-width: 400rpx;
				min-height: 200rpx;
				max-height: 400rpx;
				min-height: 300rpx;
				border-radius: 24rpx;
				background: #000000;
				
				&::before {				
					content: "▶ 播放";
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
				
				.fileName {
					font-size: 32rpx;
					margin-bottom: 24rpx;
					letter-spacing: 2rpx;
				}
				
				.size {
					color: #ADB5BD;
				}
				
			}
			

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
		
		.location {
			padding: 20rpx 0 0 0;
			
			.locationInfo {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0 20rpx;
				
				.name {
					display: block;
					font-family: 'Mulish';
					font-style: normal;
					font-weight: 600;
					font-size: 32rpx;
					line-height: 24px;
					color: #0F1828;
					width: 400rpx;
					white-space: nowrap;					/*强制在一行内显示文本*/
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
				.address {
					display: block;
					font-family: 'Mulish';
					font-style: normal;
					font-weight: 500;
					font-size:24rpx;
					line-height: 40rpx;
					/* identical to box height, or 125% */				
					letter-spacing: 0.448px;
					width: 400rpx;
					color: #ADB5BD;
					white-space: nowrap;					/*强制在一行内显示文本*/
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			
			image {
				width: 100%;
				height: 200rpx;
				bottom: 0;
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
			border-radius: 40rpx 40rpx 0 40rpx;
			background: #caf3fc;

			// &:after {
			// 	// content: "";
			// 	left: 100%;
			// 	transform: rotateY(180deg);
			// 	border-right-color: #f0ad4e;
			// }
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

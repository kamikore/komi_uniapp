<template>
	<view class="sendBox-container">
		<view class="send-box" :class="{ show: !extendBox.hidden }">
			<view class="nav-bar">
				<view :class="showVoice ? 'voice' : 'keyboard'" @tap="showMike"><button></button></view>
				<textarea v-show="showInput" v-model="inputs" auto-height="true" fixed="true" :focus="isfocus" @blur="isfocus = false" />
				<!-- 即使切换了页面，touchend 同样有效 -->
				<button v-show="!showInput" @touchstart="recordStart" @touchmove="touchmove" @touchend="recordEnd" style="flex-grow: 1;">按住说话</button>
				<view :class="showEmoji ? 'emoji' : 'keyboard'" @tap="showExtend('emoji')"><button></button></view>
				<view v-show="!showSend" class="tools" @tap="showExtend('tools')"><button></button></view>
				<view v-show="showSend" class="send"><button type="default" @click="sendMsg">发送</button></view>
			</view>
			<view class="extend-box">
				<!-- 表情栏 -->
				<emojiBox v-show="extendBox.type == 'emoji'"></emojiBox>
				<!-- 扩展工具栏 -->
				<toolsBox v-show="extendBox.type === 'tools'"></toolsBox>
			</view>
		</view>
	</view>
</template>

<script>
import data from '@/common/data.js';
import toolsBox from '@/components/toolsBox';
import emojiBox from '@/components/emojiBox';
// 录音管理器
const recorderManager = uni.getRecorderManager();

export default {
	name:"sendBox",
	components: {
		toolsBox,
		emojiBox
	},
	computed:{
		systemInfo() {
			return uni.getSystemInfoSync()
		}
	},
	props: ['fid'],
	data() {
		return {
			inputs: '',
			// 默认进入 focus 为false
			isfocus: false,
			showInput: true,
			// showVoice showEmoji 其中一个为false，就是点 keyboard
			showVoice: true,
			showEmoji: true,
			// 显示发送按钮
			showSend: false,
			extendBox: { type: '', hidden: true },

		};
	},
	watch: {
		inputs: {
			handler: function() {
				if (this.inputs.trim() === '') {
					!this.showSend ? '' : (this.showSend = false);
				} else {
					this.showSend = true;
				}
			},
			immediate: true
		}
	},
	methods: {
		sendMsg() {
			const date = new Date();
			
			if (this.inputs.trim() === '') {
				return;
			}
			
			// 触发socket, 该消息格式会沿用到后续的监听器
			this.$socket.emit('chatMsg', {
				msg_content: this.inputs,
				msg_to: this.fid, // 发出去，发别人的id
				msg_from: uni.getStorageSync('userInfo').uid, // 还需要附上自己的id
				msg_type: 0,
				dateTime: date
			});

			/* 
				自己发的信息触发更新首页聊天列表,以及聊天室列表，由于是自己发的需要处理 msg_to msg_from 关系，
				离线消息会是一个数组, 所以在sendBox消息统一作为数组处理
			*/
			uni.$emit('homeMsg', {
				msg_content: this.inputs,
				dateTime: date,
				msg_type: 0,
				msg_from: this.fid //只需提供msg_from
			});

			uni.$emit('chatroomMsg', {
				msg_content: this.inputs,
				dateTime: date,
				msg_type: 0,
				msg_from: this.fid, //只需提供msg_from
				self: 1
			});

			this.inputs = '';
		},
		touchmove(detail) {
			let x = detail.touches[0].pageX;
			let y = this.systemInfo.screenHeight - detail.touches[0].pageY;
			console.log(this.systemInfo.screenHeight,this.systemInfo.screenWidth)
			uni.$emit("dragInRecord",{x,y})
		},

		showExtend(type) {
			if (type === 'emoji') {
				uni.$emit("showEmoji")
				if (!this.showEmoji) {
					this.isfocus = true;
				}
				this.showEmoji = !this.showEmoji;
				if (!this.showVoice) {
					this.showInput = true;
					this.showVoice = true;
				}

			
			}
			this.extendBox.hidden = false;
			this.extendBox.type = type;
		},
		showMike() {
			// 需要在修改showVoice 前判断
			if (!this.showVoice) {
				this.isfocus = true;
			}
			this.showVoice = !this.showVoice;
			if (!this.showEmoji) {
				this.showEmoji = true;
			}
			this.showInput = !this.showInput;
			this.extendBox.hidden = true;
		},
		recordStart() {
			console.log("recordStart")
			uni.navigateTo({
				url: "/pages/recording/index"
			})
			recorderManager.start();
		},
		recordEnd() {
			console.log("recordEnd")
			// uni.navigateBack()
			recorderManager.stop();
		}
	},
	created() {
		// 并没有相关API获取duration, 只能自己计时
		recorderManager.onStart(() =>{
			
		})
		
		
		recorderManager.onStop(function (res) {
			console.log('recorder stop' + JSON.stringify(res));
			console.log(res)
			// uni.$emit("chartroomMsg",{
			// 	msg_content: res.tempFilePath,
			// 	msg_to: this.fid, // 发出去，发别人的id
			// 	msg_from: uni.getStorageSync('userInfo').uid, // 还需要附上自己的id
			// 	msg_type: 1,
			// 	voice_duration: 
			// 	dateTime: new Date()
			// })
		});
	},
	mounted() {
		const backspaceTop = uni.$on('closeExtend', () => {
			this.extendBox.hidden = true;
		});
	}
};
</script>

<style lang="scss" scoped>
// .f-clear::after {
// 	content: '';
// 	display: block;
// 	visibility: hidden;
// 	clear: both;
// }

.sendBox-container {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 1;

	.show {
		transform: translateY(0) !important;
	}

	.send-box {
		width: 100%;
		transform: translateY(450rpx);
		transition: all 0.1s ease-in-out;
		background-color: #f7f7f5;

		.nav-bar {
			// height: 100rpx;
			display: flex;
			align-items: flex-end;
			column-gap: 20rpx;
			padding: 14rpx 10rpx;

			// 发送按钮自己的样式
			.send {
				button {
					width: 120rpx;
					height: 60rpx;
					padding: 0;
					text-align: center;
					line-height: 60rpx;
					color: #fff;
					background: #f0ad4e;
				}
			}

			view {
				padding: 10rpx;

				button {
					display: block;
					width: 56rpx;
					height: 56rpx;
					border: none;
				}
			}

			// 整个输入框都不给高度，
			textarea {
				flex-grow: 1;
				overflow-y: scroll;
				flex: auto;
				padding: 20rpx;
				border-radius: 20rpx;
				max-height: 160rpx;
				background: #fff;
			}

			.voice {
				button {
					background: center / cover url('@/static/images/chatroom/voice.png') no-repeat;
				}
			}

			.keyboard {
				button {
					background: center / cover url('@/static/images/chatroom/keyboard.png') no-repeat;
				}
			}

			.emoji {
				button {
					background: center / cover url('@/static/images/chatroom/emoji.png') no-repeat;
				}
			}

			.tools {
				button {
					background: center / cover no-repeat url('@/static/images/chatroom/tools.png');
				}
			}
		}

		//扩展区域
		.extend-box {
			width: 100%;
			height: 450rpx;
			background: #e7e9eb;
			// overflow-y: scroll;
		}
	}
}
</style>

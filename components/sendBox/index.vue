<template>
	<view class="sendBox-container" :class="{ show: !extendBox.hidden }">
		<view class="send-box" >
			<view class="nav-bar">
				<view :class="showVoice ? 'voice' : 'keyboard'" @tap="showMike"><button></button></view>
				<textarea v-show="showInput" v-model="inputs" auto-height="true" fixed="true" :focus="isfocus" @blur="isfocus = false" />
				<!-- 即使切换了页面，touchend 同样有效 -->
				<button 
					v-show="!showInput" 
					@touchstart="recordStart" 
					@touchmove="touchmove($event,screenHeight)" 
					@touchend="recordEnd" 
					style="flex-grow: 1;"
				>按住说话</button>
				<view :class="showEmoji ? 'emoji' : 'keyboard'" @tap="showExtend('emoji')"><button></button></view>
				<view v-show="!showSend" class="tools" @tap="showExtend('tools')"><button></button></view>
				<view v-show="showSend" class="send"><button type="default" @click="send">发送</button></view>
			</view>
			<view class="extend-box">
				<!-- 表情栏 -->
				<emojiBox v-show="extendBox.type == 'emoji'"></emojiBox>
				<!-- 扩展工具栏 -->
				<toolsBox :id="id" :isGroup="isGroup" v-show="extendBox.type === 'tools'"></toolsBox>
			</view>
		</view>
	</view>
</template>

<script>
import data from '@/common/data.js';
import toolsBox from '@/components/toolsBox';
import emojiBox from '@/components/emojiBox';
import {mapState} from "vuex"
import { debounce, stopWatch , sendMsg ,convertFilePath,checkAndroidPermission} from "@/utils/index.js"
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
		},
		...mapState(['userInfo']),
		
	},
	props: ['id','isGroup'],
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
			
			// 录音状态 0为取消，1为正常发送
			recordStatus: 1,
			// 是否为首次授权，首次授权不跳转,但仍然存在问题
			flag: true,
			
			screenHeight: 0,
			
			// 秒表停止方法
			stopTimer: null
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
		send() {
			if (this.inputs.trim() === '') {
				return;
			}
			sendMsg({
				msg_content : this.inputs,
				msg_to : this.id,
				msg_type : 0,
				isGroup:this.isGroup,
			})
			this.inputs = '';
		},
		
		touchmove:debounce(function(detail,screenHeigth) {
				const x = detail.touches[0].pageX;
				const y =  screenHeigth - detail.touches[0].pageY;
				uni.$emit("dragInRecord",{x,y})
			},
		10),
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
			// checkAndroidPermission("android.permission.RECORD_AUDIO").then((res) => {
			// 	if(!res && !flag) return
				this.flag = false
				uni.navigateTo({
					url: "/pages/recording/index"
				})
				recorderManager.start({
					duration: 45000 		// 最大录音时长
				});
			// })
			
		},
		recordEnd(detail) {
			console.log("end")
			recorderManager.stop()
			uni.navigateBack({
				delta: 1
			})
			
		}
	},
	created() {
		// 监听表情发送
		uni.$on("emoji", (emoji) => {
			this.inputs = this.inputs + emoji;
		})
		
		uni.$on("backspace",() => {
			let temp = [...this.inputs];
			temp.pop();
			this.inputs = temp.join('');
		})
		
		
		console.log("id",this.id)
		let self = this;
		this.screenHeight = this.systemInfo.screenHeight
		uni.$on("changeRecordStatus", status => {
			this.recordStatus = status;
		})
		

		// 进入聊天时随带获取用户名
		
		
		// 并没有相关API获取duration, 只能自己计时
		recorderManager.onStart(() => {
			this.stopTimer = stopWatch();
			
			// setTimeout(() => {
			// 	recorderManager.stop()
			// },3000)
		})
		
		
		recorderManager.onStop(function (res) {
			const voice_duration = self.stopTimer();
			console.log('recorder stop', "时长",voice_duration, JSON.stringify(res));
			if(this.recordStatus === 0 || voice_duration == 1) return

			sendMsg({
				msg_content: convertFilePath(res.tempFilePath)
			})
			
		});
		
		recorderManager.onError(err=>{
			self.stopTimer()
			console.log("录音发生错误",err)
			uni.navigateBack()
		})
	
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

.show {
	transform: translateY(0) !important;
}

.sendBox-container {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 1;
	transform: translateY(450rpx);
	transition: all 0.1s ease-in-out;

	.send-box {
		width: 100%;
		background-color: #FFFFFF;

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
					color: #FFFFFF;
					background: #f0ad4e;
				}
			}

			view {
				padding: 10rpx;

				button {
					display: block;
					width: 56rpx;
					height: 56rpx;
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
				background: #f7f7fc;
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

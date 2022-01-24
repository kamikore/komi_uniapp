<template>
	<view class="chatroom-container">
		<!-- 需要阻止内部的冒泡 -->
		<scroll-view
			class="message-content-list"
			scroll-y="true"
			:scroll-top="scrollTop"
			@tap="closeExtend"
			@scroll="scrollHandler"
			scroll-with-animation="true"
			:scroll-into-view="'fid' + msgId"
		>
			<view class="content-list">
				<view class="content-list-item" v-for="(item, index) in message_list" :key="item.id">
					<!-- 把消息分割为组件 -->
					<message :item="item"></message>
				</view>
			</view>
		</scroll-view>
		<send-box :fid="fid"></send-box>
	</view>
</template>

<script>
import data from '@/common/data.js';
import sendBox from '@/components/sendBox';
import message from '@/components/message';
import { createInnerAudioContext } from '@/utils/index.js';
const innerAudioContext = createInnerAudioContext().getInstance();

export default {
	name: 'chatroom',
	components: {
		sendBox,
		message
	},
	data() {
		return {
			message_list: data.message(),
			// 当前聊天用户id
			fid: '',
			msgId: 0,
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	methods: {
		closeExtend() {
			uni.$emit('closeExtend');
		},
		scrollHandler(event) {
			this.old.scrollTop = event.detail.scrollTop;
		},
		userDetail() {
			console.log('click');
		},
		playAudio(src) {
			// 函数内的变量执行完会被销毁

			// 点击新的音频会直接播放
			if (innerAudioContext.paused || innerAudioContext.src != src) {
				innerAudioContext.src = src;
				innerAudioContext.play();
				console.log('开始播放');
			} else {
				innerAudioContext.pause();
				console.log('暂停');
				innerAudioContext.destroy();
				console.log(innerAudioContext);
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
		// this.scrollTop = 1000;
		this.msgId = this.message_list.length;

		// 统一处理滚动到某个位置，默认不传参数就是滚动到底
		uni.$on('scrollTo', res => {
			if (res) {
				this.$nextTick(() => {
					this.msgId = res.msgId;
				});
			} else {
				// this.msgId =  this.message_list.length;
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			}
		});

		// 避免重复注册
		uni.$off('chatroomMsg');

		// 聊天室监听自己发的消息，以及当前fid 发来的消息，是监听自己的id
		uni.$on('chatroomMsg', res => {
			this.message_list.push({
				id: this.msgId + 1,
				time: res.time,
				msg: res.msg,
				type: res.type,
				self: res.self
			});

			uni.$emit('scrollTo', { msgId: this.msgId + 1 });
		});
	},
	onUnload() {
		console.log('页面unLoad');
	}
};
</script>

<style lang="scss" scoped>
.chatroom-container {
	.message-content-list {
		// #ifdef H5
		height: calc(100vh - var(--window-top));
		// #endif

		// #ifdef APP
		height: calc(100vh - var(--status-bar-height));
		// #endif
		background: #f4f4f4;

		.content-list {
			// 防止提交栏覆盖消息
			padding-bottom: 300rpx;
			.content-list-item {
				display: flex;
				flex-direction: column;
			}
		}
	}
}
</style>

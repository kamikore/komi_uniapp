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
import {DateToDateTime} from "@/utils"

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
			fid: 0,
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
	},
	onLoad(option) {
		this.fid = Number(option.uid);

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
			console.log( DateToDateTime(res.dateTime))
			this.message_list.push({
				id: this.msgId + 1,
				time: DateToDateTime(res.dateTime),
				msg: res.msg_content,
				type: res.msg_type,
				voice_duration: res.voice_duration || null,
				self: res.self
			});

			uni.$emit('scrollTo', { msgId: this.msgId + 1 });
		});
	},
	onUnload() {

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

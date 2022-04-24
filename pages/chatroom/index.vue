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
					<!-- 消息时间，需要接触到最新的一条消息 -->
					<view class="dateTime" v-if="(item.time - message_list[index == 0?index:index-1].time ) > 1000">{{dateHandler(item.time)}}</view>
					<!-- 把消息分割为组件 -->
					<message :item="item"></message>
				</view>
			</view>
		</scroll-view>
		<!-- id 作为当前会话的数据库索引，isGroup 区分是普通聊天还是群聊 -->
		<send-box :id="id" :isGroup="isGroup"></send-box>
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
		message,
	},
	data() {
		return {
			message_list: data.message(),
			// 当前聊天用户id
			id: 0,
			msgId: 0,
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			isGroup: false,
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
		dateHandler(date) {
			return DateToDateTime(date)
		}
	},
	onLoad(option) {
		console.log('当前消息列表',this.message_list)
		
		// 群聊为gid，普通为fid
		if(option.fid) {
			this.id = Number(option.fid);
			this.isGroup = false;
		} else {
			this.id = Number(option.gid);
			this.isGroup = true;
		}
		// this.message_list = uni.getStorageSync(`${this.$store.state.userInfo.uid}msgWith${this.id}`)

		

		// 滚动位置的标识
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
			const {dateTime , msg_content, msg_type, voice_duration ,self} = res;
			console.log("聊天室消息",msg_content)
			this.message_list.push({
				id: this.msgId + 1,
				time: dateTime,
				msg: msg_content,
				type: msg_type,
				voice_duration: voice_duration || null,
				self: self || 0
			});
			
			// 缓存当前与该用户的聊天消息
			uni.setStorageSync(`${this.$store.state.userInfo.uid}msgWith${this.id}`, this.message_list)

			uni.$emit('scrollTo', { msgId: this.msgId + 1 });
		});
	},
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
				margin-top: 40rpx;
				
				.dateTime {
					color: rgba(39, 40, 650, 0.6);
					padding: 20rpx 0;
					text-align: center;
				}
			}
		}
	}
}
</style>

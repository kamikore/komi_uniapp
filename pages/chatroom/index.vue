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
			:scroll-into-view="'id' + msgId"
		>
			<view class="content-list">
				<view class="content-list-item" v-for="(item, index) in message_list" :key="item.id">
					<!-- 消息时间，需要接触到最新的一条消息 -->
					<view class="dateTime" v-if="(index === 0 || (new Date(item.time) - new Date(message_list[index-1].time)) >= 30000)">
						<view class="line"></view>
						<view style="margin: 0 40rpx;"><text>{{dateHandler(item.time)}}</text></view>
						<view class="line"></view>
					</view>
					<!-- {{index?item.time-message_list[index-1].time:'0'}} -->
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
import sendBox from '@/components/sendBox';
import message from '@/components/message';
import {DateToDateTime} from "@/utils"
import {mapState} from 'vuex'


export default {
	name: 'chatroom',
	components: {
		sendBox,
		message,
	},
	computed:mapState(['userInfo','contacts','groupChats']),
	data() {
		return {
			message_list: [],
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
		},
	},

	onLoad(option) {
		console.log(option)
		// 群聊为gid，普通为fid
		if(option.fid) {
			this.id = Number(option.fid);
			this.isGroup = false;
		} else {
			this.id = Number(option.gid);
			this.isGroup = true;
		}

		if(this.isGroup) {
			this.message_list = uni.getStorageSync(`${this.userInfo.uid}groupmsgWith${this.id}`) || []
			console.log("群组信息",this.message_list)
		} else {
			this.message_list = uni.getStorageSync(`${this.userInfo.uid}msgWith${this.id}`) || []
		}
		
		// console.log("获取缓存消息列表",this.message_list)
		
		// 滚动位置的标识
		this.msgId = this.message_list.length;
		uni.$off('scrollTo');
		
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
		uni.$on('chatroomMsg', newMsg => {
			// console.log("聊天室消息", newMsg, "当前msgID",this.msgId)
			const {dateTime , msg_content, msg_type, voice_duration ,self, msg_from} = newMsg;
			if(!newMsg.id) {
				newMsg = {
					id: this.msgId + 1	,
					time: dateTime,
					msg: msg_content,
					type: msg_type,
					msg_from,
					voice_duration: voice_duration || null,
					self: self || 0,
					isGroup: this.isGroup
				}
			}
			
			this.message_list.push(newMsg);
			if(this.isGroup) {
				uni.setStorageSync(`${this.userInfo.uid}groupmsgWith${this.id}`,this.message_list)
			} else {
				uni.setStorageSync(`${this.userInfo.uid}msgWith${this.id}`, this.message_list)
			}
			uni.setStorageSync(`${this.userInfo.uid}msgWith${this.id}`, this.message_list)
			uni.$emit('scrollTo', { msgId: this.msgId + 1 });
		});
	},
	onReady() {
		uni.setNavigationBarTitle({
			title: this.isGroup?this.groupChats[this.id].group_name:this.contacts[this.id].remarkName,
			success: ()=> {
			},
			fail: (e) => {
				console.log('title设置失败',e)
			}
		});
		this.$store.dispatch('clearUnRead',{isGroup:this.isGroup,id:this.id})
		
	},
	onPullDownRefresh() {
		console.log("下拉刷新")
		uni.startPullDownRefresh({
			success: () => {
				console.log("下拉处理")
			}
		})
	}
	// beforeRouteLeave(to,from,next) {
		
	// 	next()
	// }
};
</script>

<style lang="scss" scoped>
.chatroom-container {
	
	.message-content-list {
		// #ifdef H5
		height: calc(100vh - var(--window-top));
		// #endif
		
		// #ifdef APP-PLUS
		height: calc(100vh - var(--status-bar-height));
		// #endif
		background: #f7f7fc;
		
		.content-list {
			// 防止提交栏覆盖消息
			padding-bottom: 300rpx;
			
					
			.content-list-item {
				display: flex;
				flex-direction: column;
				margin-top: 40rpx;
				
				
				.dateTime {
					width: 90%;
					display: flex;
					align-items: center;
					justify-content: center;
					align-self: center;
					font-size: 28rpx;
					margin-bottom: 24rpx;
					color: #ADB5BD;
					
					text {
						white-space: nowrap;
					}
					
					.line {
						width: 25%;
						height: 1rpx;
						border-bottom: 1px solid  #EDEDED;
					}
					
					
				}
			}
		}
	}
}
</style>

<template>
	<view class="session-container">
		<!-- session 主体内容 -->
		<view class="session-main">
			<view class="avatar">
				<!-- 新消息红点，通过伪元素 -->
				<image src="@/static/images/future.png" mode=""></image>
			</view>
			<view class="content">
				<view class="content-title">
					<text class="title" v-if="item.msg.isGroup">{{groupChats[item.gid].group_name || "空值"}}</text>
					<text class="title" v-else>{{ typeof item.fid === 'object'?contacts[item.fid.user_id].remarkName:contacts[item.fid].remarkName}}</text>
					<!-- 消息时间 -->
					<text class="dateTime">{{ formatDate(item.msg.dateTime) || "00:00" }}</text>
				</view>
				<view id="content-detail">
					<!-- 未读信息大于1时显示 -->
					<view class="msg">
						<text class="count">[2条]</text>
						<text class="msg-content">{{ showMsg() }}</text>
					</view>
					<!-- 设置状态，如消息免打扰 -->
					<icon type="success" size="26" />
				</view>
			</view>
		</view>
		<!-- session按钮操作，置顶、删除、已读..... -->
		<view id="btn-group">
			<button plain="true"  style="background: #0091EA;" @click.stop="read(item.index)">标记已读</button>
			<button plain="true" style="background: #E53935;" @click.stop="deleteMsg(item.index)">删除</button>
			<button plain="true" style="background: #FBC02D;" @click.stop="stickyOnTop(item.index)">{{item.isTop?'取消置顶':'置顶'}}</button>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
// 注意工具函数引用后需要挂载到方法里
import {DateToDateTime} from "@/utils/index.js"
	
export default {
	name: 'session',
	props: ['item'],
	computed:mapState(["contacts","groupChats"]),
	data() {
		return {
			// 鼠标点击位置X
			startX: 0,
			isDrag: false,
			moveDis: 0,
			// 按钮组宽度
			btnWidth: 0,
			// 是否显示了按钮组
			dragType: 0,
			// 如果显示了按钮组，则不能跳转
			flag: 0
		};
	},
	methods: {
		read() {
			console.log("read")
			uni.$emit("markAsRead")
			uni.$emit("markAsUnread")
		},
		// 删除聊天会出现提示，删除操作会清空聊天记录
		deleteMsg() {
			console.log("delete")
		},
		stickyOnTop(index) {
			if(this.item.isTop) {
				uni.$emit("removeFromTop", index)
			} else {
				uni.$emit("stickyOnTop",index)
			} 
			
			
		},
		formatDate(date) {
			return DateToDateTime(date)
		},
		showMsg() {
			const type = this.item.msg.msg_type
			if( type === 0) {
				return this.item.msg.msg_content;
			} else if(type === 1) {
				return '[语音]'
			} else if(type === 2) {
				return '[图片]'
			} else if(type === 3) {
				return '[视频]'
			} else {
				return '[文件]'
			}
			
		}
	},
	mounted() {
	}
};
</script>

<style lang="scss" scoped>
	
.session-container {
	display: flex;
	column-gap: 20rpx;
	// padding: 20rpx 20rpx;  padding 没用,因为session 包括了btn超出了屏幕
	
	
	
	.session-main {
		width: 100%;
		display: flex;
		position: relative;
		// column-gap: 20rpx;
		padding: 0rpx 10rpx;
		
		.avatar {
			image {
				width: 96rpx;
				height: 96rpx;
			}
		}
		
		.content {
			flex-grow: 1;
			padding: 0rpx 10rpx;
			.content-title {
				display: flex;
				justify-content: space-between;
			}
		
			#content-detail {
				display: flex;
				justify-content: space-between;
				
				
				.msg {
					width: 500rpx;
					white-space: nowrap;					/*强制在一行内显示文本*/
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}

	#btn-group {
		position: absolute;
		right: 0;
		padding-left: 2rpx;

		display: flex;
		transform: translateX(100%);

		button {
			border: 0;
			border-radius: 0;
		}
	}
}
</style>

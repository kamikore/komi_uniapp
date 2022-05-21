<template>
	<view class="session-container">
		<!-- session 主体内容 -->
		<view class="session-main">
			<view class="avatar">
				<!-- 新消息红点，通过伪元素 -->
				<image :src="contacts[item.fid].fid.avatar || '../../static/images/future.png'" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="content-title">
					<text class="Name" v-if="item.msg.isGroup">{{groupChats[item.gid].group_name || "空值"}}</text>
					<text class="Name" v-else>{{contacts[item.fid].remarkName}}</text>
					<!-- 消息时间 -->
					<text class="dateTime">{{ formatDate(item.msg.dateTime) || "00:00" }}</text>
				</view>
				<view id="content-detail">
					<!-- 未读信息大于1时显示 -->
					<view class="msg">
<!-- 						<text class="count">[2条]</text> -->
						<text class="msg-content">{{ showMsg() }}</text>
					</view>
					<!-- 新消息提醒 -->
					<i class="bubble" v-show="unReadVal">{{unReadVal}}</i>
				</view>
			</view>
		</view>
		<!-- session按钮操作，置顶、删除、已读..... -->
		<view id="btn-group">
			<button plain="true"  style="background: #2176FF;" @click.stop="read(item)">{{unReadVal?'标记已读':'标记未读'}}</button>
			<button plain="true" style="background: #fbb547;" @click.stop="stickyOnTop(item)">{{item.isTop?'取消置顶':'置顶'}}</button>
			<button plain="true" style="background: #fc3935;" @click.stop="deleteMsg(item)">删除</button>
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
	computed:{
		unReadVal() {
			if(!(typeof this.$store.state.unRead === 'object')) return 0
			
			if(this.item.msg.isGroup) {
				return this.$store.state.unRead.gid[this.item.gid]
			} else {
				return this.$store.state.unRead.fid[this.item.fid]
			}
		},
		...mapState({
			userInfo: state => state.userInfo,
			contacts: state => state.contacts,
			groupChats: state => state.groupChats,
			unRead: state => state.unRead,
		})
	},
	// computed:mapState(["contacts","groupChats","unRead"]),
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
		read(item) {
			let id
			if(item.msg.isGroup) {
				id = this.item.gid
			} else {
				id = item.fid
			}
			
			if(this.unReadVal) {
				this.$store.dispatch("clearUnRead",{id,isGroup:item.msg.isGroup})
			} else {
				this.$store.dispatch("updateUnRead",{id,isGroup:item.msg.isGroup})
			}
		},
		// 删除聊天会出现提示，删除操作会清空聊天记录
		deleteMsg() {
			uni.showModal({
				title: '提示',
				content: '删除后，将清空该聊天的消息记录',
				success:  (res) => {
					if (res.confirm) {
						uni.removeStorageSync(`${this.userInfo.uid}msgWith${this.item.msg.isGroup?this.item.gid:this.item.fid}`)
						uni.$emit("deleteSession",this.item.index)
						this.$store.dispatch("clearUnRead",{isGroup:this.item.msg.isGroup,id:this.item.msg.isGroup?this.item.gid:this.item.fid})
					} else if (res.cancel) {
					}
				}
			});
			
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
			} else if(type === 6) {
				return '[位置]'
			} else {
				return '[文件]'
			}
			
		},
	},
	mounted() {
	}
};
</script>

<style lang="scss" scoped>
	
.session-container {
	display: flex;
	column-gap: 20rpx;
	// background-color: #E94242;
	padding: 20rpx 0;
	// padding: 20rpx 20rpx;  padding 没用,因为session 包括了btn超出了屏幕
	
	
	
	.session-main {
		width: 100%;
		display: flex;
		position: relative;
		// column-gap: 20rpx;
		padding: 0rpx 48rpx;
		
		.avatar {
			margin-right: 24rpx;
			image {
				width: 96rpx;
				height: 96rpx;
			}
			border-radius: 20rpx
		}
		
		.content {
			flex-grow: 1;
			border-bottom: 1px solid #EDEDED;
			
			.content-title {
				display: flex;
				justify-content: space-between;
				
				.Name {
					font-family: 'Mulish';
					font-style: normal;
					height: 48rpx;
					line-height: 48rpx;
					font-size: 32rpx;
					font-weight: 600;
					/* identical to box height, or 150% */
					display: flex;
					align-items: center;
					color: #0F1828;
				}
				
				.dateTime {
					line-height: 32rpx;
					font-size: 24rpx;
					font-family: 'Mulish';
					font-style: normal;
					font-weight: 600;
				}
			}
		
			#content-detail {
				display: flex;
				justify-content: space-between;
				
				
				.msg {
					width: 500rpx;
					white-space: nowrap;					/*强制在一行内显示文本*/
					overflow: hidden;
					text-overflow: ellipsis;
					font-family: 'Mulish';
					font-style: normal;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					/* identical to box height, or 143% */
					
					display: flex;
					align-items: center;
					
					color: #ADB5BD;
				}
				
				.bubble {
					position: relative;
					width: 44rpx;
					height: 40rpx;
					background: #E94242;
					border-radius: 80rpx;
					text-align: center;
					font-family: 'Mulish';
					font-style: normal;
					font-weight: 700;
					font-size: 18rpx;
					line-height: 40rpx;
					color: #FFFFFF;
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
			line-height: 100rpx;
			border: 0;
			border-radius: 0;
			padding: 0 10rpx;
			color: #FFFFFF;
			font-size: 32rpx;
		}
	}
}
</style>

<template>
	<view class="session-container">
		<view class="avatar">
			<!-- 新消息红点，通过伪元素 -->
			<image src="@/static/images/future.png" mode=""></image>
		</view>
		<view class="content">
			<view class="content-title">
				<text class="title">{{ item.item.nickName || "空值" }}</text>
				<!-- 消息时间 -->
				<text class="dateTime">{{ item.item.dateTime || "00:00" }}</text>
			</view>
			<view class="content-detail">
				<!-- 未读信息大于1时显示 -->
				<view>
					<text class="count">[2条]</text>
					<text class="last-message">群组会提示谁说话{{ item.item.msg }}</text>
				</view>
				<!-- 设置状态，如消息免打扰 -->
				<icon type="success" size="26" />
			</view>
		</view>
		<!-- 聊天列表操作，置顶、删除、已读..... -->
		<view class="btn-group">
			<button plain="true" id="sjois" style="background: #0091EA;" @click.stop="read(item.index)">标记已读</button>
			<button plain="true" style="background: #E53935;" @click.stop="deleteMsg(item.index)">删除</button>
			<button plain="true" style="background: #FBC02D;" @click.stop="setTop(item.index)">置顶</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'session',
	props: ['item'],
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
		},
		deleteMsg() {
			console.log("delete")
		},
		setTop(index) {
			console.log("setTop")
			uni.$emit("updateSessionList",index)
		}
	},
	mounted() {
		
	}
};
</script>

<style lang="scss" scoped>
	
.session-container {
	width: 100%;
	display: flex;
	position: relative;
	// padding: 20rpx 0;
	column-gap: 20rpx;
	
	.avatar {
		image {
			width: 96rpx;
			height: 96rpx;
		}
	}

	.content {
		flex-grow: 1;
		padding-right: 24rpx;
		.content-title {
			display: flex;
			justify-content: space-between;
		}

		.content-detail {
			display: flex;
			justify-content: space-between;
		}
	}

	.btn-group {
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

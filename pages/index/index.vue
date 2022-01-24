<template>
	<view class="container">	
		<!-- 头部菜单 -->
<!-- 		<view :class="{show:show}" class="menu-wrap">
			<view class="menu">
				<ul>
					<li>发起群聊</li>
					<li @tap="addFriend">添加好友</li>
					<li>帮助</li>
					<li>...</li>
				</ul>
			</view>
		</view> -->
		<navigator url="/pages/chatroom/index">进入聊天</navigator>
		<!-- <dropdown-menu></dropdown-menu> -->
		<view class="content-list">
			<!-- contentList item.fid 作为用户标识 -->
			<view 
				class="list-item" 
				v-for="(item, index) in contentList" 
				:key="item.fid" 
				@tap="goChatroom(index)" 
				@touchstart="dragStart"
				@touchend="dragEnd(index)"
				@touchmove="dragHandler($event,index)"
				:ref="index"
			>
				<view class="avatar">
					<!-- 新消息红点，通过伪元素 -->
					<image src="@/static/images/future.png" mode=""></image>
				</view>
				<view class="content">
					<view class="content-title">
						<text class="title">{{item.nickname}}</text>
						<!-- 消息时间 -->
						<text class="dateTime">19:00</text>
					</view>
					<view class="content-detail">
						<!-- 未读信息大于1时显示 -->
						<view>
							<text class="count">[2条]</text>
							<text class="last-message">群组会提示谁说话{{item.msg}}</text>
						</view>
						<!-- 设置状态，如消息免打扰 -->
						<icon type="success" size="26"/>
					</view>
				</view>
				<!-- 聊天列表操作，置顶、删除、已读..... -->
				<view class="btn-group">
					<button plain="true" style="background: #0091EA;">标记已读</button>
					<button plain="true" style="background: #E53935;">删除</button>
					<button  plain="true" style="background: #FBC02D;">置顶</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dropdownMenu from "@/components/dropdownMenu"
export default {
	components:{
		dropdownMenu
	},
	data() {
		return {
			// 标识可以直接使用唯一的fid
			contentList: [],
			// 鼠标点击位置X
			startX: 0,
			isDrag: false,
			moveDis: 0,
			// 按钮组宽度
			btnWidth:0,
			// 是否显示了按钮组
			dragType: 0,
			// 如果显示了按钮组，则不能跳转
			flag: 0,
			showMenu:false,
			
		};
	},
	methods: {
		goChatroom(index) {
			if(!this.showMenu) {
				console.log(this.contentList[index])
				if(!this.flag) {
					uni.navigateTo({
						url: `subpages/chatroom/index?uid=${this.contentList[index].fid}`
					})
						
				}
				this.flag = 0;
			}	
		},
		// 记录鼠标点击起点
		dragStart(event) {
			this.startX = event.touches[0].pageX;
		},
		dragHandler(event,index) {
			const item = this.$refs[index][0].$el;
			let moveDis;
				
			// 由于touchend 只会有两种状态，显示按钮 和 没显示按钮
			if(this.dragType) {
				// 移动的距离
				moveDis = this.startX - event.touches[0].pageX;
				
				// 该情况下moveDis 只能是 -btnWidth ~ 0
				moveDis > 0?moveDis=0:'';
				moveDis < -this.btnWidth?moveDis=-this.btnWidth:'';
				item.style.transform = `translateX(-${moveDis+this.btnWidth}px)`;
				
			} else {
				// 移动的距离
				moveDis = this.startX - event.touches[0].pageX;
				
				// 该情况下moveDis 只能是 0 ~ btnWidth
				moveDis >= this.btnWidth?moveDis=this.btnWidth:'';
				moveDis < 0?moveDis=0:'';
				item.style.transform = `translateX(${-moveDis}px)`;
			}
		
			this.moveDis = moveDis;
		},
		dragEnd(index) {
			const item = this.$refs[index][0].$el;
			
			if(this.moveDis > 40 || this.moveDis > -40 && this.moveDis!=0) {
				item.style.transform = `translateX(-${this.btnWidth}px)`;
				this.dragType = 1;
				this.flag = 1;
			}else {
				item.style.transform = null;
				this.dragType = 0;
			}
			// 重置
			this.moveDis = 0;
		},
		addFriend() {
			uni.navigateTo({
				url: "/subpages/search/index"
			})
		}
	},
	onLoad() {
		let date = new Date()
		console.log("onLoad 一次",date)
		const userInfo = uni.getStorageSync("userInfo");
		// 用于更新首页聊天列表, 别人发过来的，自己发的
		uni.$on("homeMsg",res=>{
			// console.log("当前",Array.isArray(this.contentList))
			console.log("有消息更新",res)
	
			// 把fid作为key，以及msg最新的一条消息, 需要避免重复推入
			const index = this.contentList.findIndex((item) => {
				 if(item.fid == res.fid) return true
			})
			if(index != -1) {
				this.contentList[index].msg = res.msg;
			}
			else {
				// 消息传来根据uid，到联系人表中查找昵称
				const nickname = uni.getStorageSync("contacts")[res.fid].remarkName
				this.contentList.push({fid:res.fid,msg: res.msg,nickname})
			}
			uni.setStorageSync(`uid${userInfo.uid}contentList`,this.contentList)

		})
		
		uni.$on("newFriend", res => {
			let newFriends = new Object();
			console.log("更新新的好友列表",res)
			this.$set(newFriends, res.userInfo.uid, res.userInfo)
			uni.setStorageSync("newFriends", newFriends)
		})
		
		// 监听发过来的消息
		this.$socket.on(`chat${userInfo.uid}`,res=>{
			console.log(res.fid,"socket消息",res)
		
			uni.$emit("sendAndGet",{
				msg: res.msg,
				time: "20:00",
				type: 0,
				// socket 消息带的用户uid，对应联系人fid
				fid: res.uid,
			})
	
		})
		
		// 监听发给自己的好友请求，当前的好友请求只会创建消息列表，并不会入库
		this.$socket.on(`add${userInfo.uid}`, res => {
			console.log("在线好友请求",res)
			uni.$emit("newFriend",res)
		})
	
		
	},
	onNavigationBarButtonTap(e) {
		if(e.index == 0) {
			this.showMenu= !this.showMenu
			uni.navigateTo({
				url: "/pages/dropdownMenu/index"
			})
		}
		
	},
	onTabItemTap(e) {
		console.log("tab",e)
	},
	mounted() {

		if(this.contentList.length != 0) {
			// 获取需要的节点信息
			const query = uni.createSelectorQuery().in(this);
			query.select('.btn-group').boundingClientRect(data => {
				this.btnWidth = data.width;
			}).exec();
		}

	},
	onShow() {
		// onShow 判断赋空数组，因为data很快就执行了
		this.contentList = uni.getStorageSync(`uid${uni.getStorageSync("userInfo").uid}contentList`) || []
	}
};
</script>

<style lang="scss" scoped>
	
.container {
	display: flex;
	flex-direction: column;
	// 把整个内容往下移手机状态栏
	padding-top: var(--status-bar-height);
	// 让container 占满整个视窗，避免滚动需要减去 tabbar,navbar
	// #ifdef H5
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	// #endif
	
	// #ifdef APP
	height: calc(100vh - 50px - var(--status-bar-height));
	// #endif
	
	.content-list {
		padding: 20rpx 0;
		
		.list-item {
			width: 100%;
			display: flex;
			position: relative;
			// padding: 20rpx 0;
			column-gap: 20rpx;
			// transform: translateX(-10%);
			
			
			&:active {
				background-color: #f3f3f3;
			}

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
	}
}
</style>

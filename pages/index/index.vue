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
			
		<navigator url="../groupChat/index">进入groupchat</navigator>
		<navigator url="/pages/chatroom/index">进入聊天</navigator>
		<navigator url="/pages/livePlay/index">视频拉流</navigator>
		<navigator url="/pages/livePush/index">视频推流</navigator>
		<text @click="clear">清空</text>
		<!-- <dropdown-menu></dropdown-menu> -->
		<sessionList :list="sessionList" ></sessionList>
		<view class="tabbarShadow"></view>
	</view>
	
</template>


<script>
import dropdownMenu from '@/components/dropdownMenu';
import sessionList from '@/components/sessionList';
import {stickyOnTop} from "@/utils"

export default {
	components: {
		dropdownMenu,
		sessionList
	},
	data() {
		return {
			// 标识可以直接使用唯一的fid
			sessionList: [],
			showMenu: false
		};
	},
	methods: {
		clear() {
			uni.removeStorageSync(`uid${this.$store.state.userInfo.uid}sessionList`)
		},
	},
	onLoad() {
		const userInfo = uni.getStorageSync('userInfo');
		/* 
			用于更新首页聊天列表, 别人发过来的，自己发的
			列表所需信息：
				nickName
				dateTime
				msg
		 */
		
		uni.$on('homeMsg', res => {
			console.log("homeMsg",res)
			// uni.removeStorageSync(`uid${userInfo.uid}contentList`)
			// 是否传递的是对象
			if(!res.length) {
				res = [res];
			}

			// 需要把所有列表都判断push，因为数组是来自不同用户的混杂
			for (let Msg of res) {
				// 检索消息数组是否含有好友请求信息
				if (Msg.msg_type === 5) {
					uni.$emit('newFriend', Msg);
					continue;
				}
				
				
				// 更新的会话消息格式
				let session = {msg:Msg , isRead: false};
				if(Msg.isGroup) {
					session.gid = Msg.group_id;
				} else {
					session.fid = Msg.msg_from;
				}
				
				
				// 把fid作为key，以及msg最新的一条消息, 需要避免重复推入
				const index = this.sessionList.findIndex(item => {
					if(Msg.isGroup && item.gid ===  Msg.group_id) {
						return true;
					} else if (typeof item.fid === 'object'?item.fid.user_id: item.fid === Msg.msg_from || Msg.msg_from.user_id) {
						return true;
					}
				});
				
				
				
				
				if (index != -1) {
					stickyOnTop(this.sessionList,session,index)
	
				} else {
					// sessionList 不存在
					this.sessionList.splice(this.$store.state.count,0,session);
					uni.setStorageSync(`uid${userInfo.uid}sessionList`, this.sessionList);
				}
				
				// 判断delivered 字段是否存在，设置字段为 1
				if(Msg.delivered && Msg.delivered === 1) {
					this.$socket.emit("isDelivered", Msg.offline_id)
				}
			}

		});
		


		/* 
			用于更新chatroom聊天列表，包含别人发的，自己发的
			列表所需信息：
				id     消息key
				msg
				type
				dateTime
				self
		 */
		uni.$on('newFriend', res => {
			// 待改进，不会对来自同一个好友的请求重复修改
			const newFriends = uni.getStorageSync('newFriends') || {};
			console.log('更新新的好友列表', res);
			if ( !newFriends.hasOwnProperty(res.msg_from instanceof Object?res.msg_from.user_id:res.msg_from)) {
				this.$set(newFriends, res.msg_from.user_id, res);
				uni.setStorageSync('newFriends', newFriends);
			}
			console.log("更新完成,newFriends")
			// 判断delivered 字段是否存在，设置字段为 1
			if(res.delivered === 0) {
				console.log("触发已读")
				this.$socket.emit("isDelivered", res.offline_id)
			}
		});

		// 监听发过来的消息
		this.$socket.on(`chat${userInfo.uid}`, res => {
			console.log("当前用户的socket消息", res);
			uni.$emit('homeMsg', res);
			uni.$emit("chatroomMsg",res)
			
			// uni.setStorageSync("", )
		});

		// 监听发给自己的好友请求，当前的好友请求只会创建消息列表，并不会入库
		this.$socket.on(`add${userInfo.uid}`, res => {
			console.log('在线好友请求', res);
			uni.$emit('newFriend', res);
		});
	},
	
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.showMenu = !this.showMenu;
			uni.navigateTo({
				url: '/pages/dropdownMenu/index'
			});
		}
	},
	mounted() {


	
		
	},
	onShow() {
		// onShow 判断赋空数组，因为data很快就执行了
		this.sessionList = uni.getStorageSync(`uid${uni.getStorageSync('userInfo').uid}sessionList`) || [];
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
	
	

}
</style>

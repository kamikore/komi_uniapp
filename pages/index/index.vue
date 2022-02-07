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
		<navigator url="/pages/livePlay/index">视频拉流</navigator>
		<navigator url="/pages/livePush/index">视频推流</navigator>
		<!-- <dropdown-menu></dropdown-menu> -->
		<sessionList :list="sessionList"></sessionList>
	</view>
</template>

<script>
import dropdownMenu from '@/components/dropdownMenu';
import sessionList from '@/components/sessionList';

export default {
	components: {
		dropdownMenu,
		sessionList
	},
	data() {
		return {
			// 标识可以直接使用唯一的fid
			sessionList: [],
			// 鼠标点击位置X
			startX: 0,
			isDrag: false,
			moveDis: 0,
			// 按钮组宽度
			btnWidth: 0,
			// 是否显示了按钮组
			dragType: 0,
			// 如果显示了按钮组，则不能跳转
			flag: 0,
			showMenu: false
		};
	},
	methods: {},
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
			console.log('有消息更新', res);
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

				// 把fid作为key，以及msg最新的一条消息, 需要避免重复推入
				const index = this.sessionList.findIndex(item => {
					if (item.fid == Msg.msg_from) return true;
				});
				
				console.log("查找sessionList结果", index)
				if (index != -1) {
					this.sessionList[index].msg = Msg.msg_content;
				} else {
					// 消息发送人id，到联系人表中查找昵称
					// const nickName = uni.getStorageSync('contacts')[latestMsg.msg_from.user_id].remarkName;
					//  传递的信息
					console.log("推入sessionList")
					this.sessionList.push({ fid: Msg.msg_from, msg: Msg.msg_content });
				}
			}

			uni.setStorageSync(`uid${userInfo.uid}sessionList`, this.sessionList);
			console.log('onLoad 一次', this.sessionList);
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
			const newFriends = uni.getStorageSync('newFriends');
			console.log('更新新的好友列表', res);
			if (!newFriends.hasOwnProperty(res.msg_from.user_id)) {
				this.$set(newFriends, res.msg_from.user_id, res);
				uni.setStorageSync('newFriends', newFriends);
			}
		});

		// 监听发过来的消息
		this.$socket.on(`chat${userInfo.uid}`, res => {
			console.log("用户",res.msg_from, '的socket消息', res);

			uni.$emit('homeMsg', res);
			uni.$emit("chatroomMsg",res)
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
	onTabItemTap(e) {
		console.log('tab', e);
	},
	mounted() {
		if (this.sessionList.length != 0) {
			// 获取需要的节点信息
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.btn-group')
				.boundingClientRect(data => {
					this.btnWidth = data.width;
				})
				.exec();
		}
	},
	onShow() {
		// onShow 判断赋空数组，因为data很快就执行了
		this.sessionList = uni.getStorageSync(`uid${uni.getStorageSync('userInfo').uid}sessionList`) || [];
		console.log("sessionList", this.sessionList)
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

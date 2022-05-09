<script>
import {fetchContact} from "api"
export default {
	onLaunch: function() {
		
		// const uid = uni.getStorageSync("userInfo").uid;
		if(this.$store.state.isLogin) {
			// 获取联系人, 如果用户没有切到contact就没有获取联系人
			this.$store.dispatch("updateContacts")
			this.$store.dispatch("updateGroupChats")
			
			// 交给main.js 就好
			// this.$socket.emit("login",{
			// 	uid,
			// });	
		}
				
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "@/common/iconfont.css";

/*每个页面公共css */

page {
	color: #3E4347;
}

button {
	padding: 0;
}
/* 去除默认的浅边框线 */
button::after{ border: none;}

i {
	font-style: normal;
}

	
ul {
	margin: 0;
	padding: 0;
}

li {
	list-style: none;
	padding: 0;
	margin: 0;
}

// 占住位置高度
.header-wrap {
	width: 100%;
	height: 88rpx;
	position: relative;

	.header {
		position: fixed;
		top: 0;
		text-align: center;
		display: flex;
		height: 88rpx;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: #ededed;
		z-index: 10;

		.header-left,
		.header-right {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-basis: 80rpx;
		}

		.header-center {
			flex-grow: 1;
			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}

.tabbarShadow {
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;
	box-shadow: 0px -1px 24px rgba(0, 0, 0, 0.06);
}

/* 隐藏滚动可视区滚动条 */
// html,body{
// 	width: 100%;
// 	height: 100%;
// 	overflow: scroll;
// }
// html::-webkit-scrollbar,
// body::-webkit-scrollbar {
// 	width:0px;
// 	height:0px;
// }
// body{
// 	margin:0;
// }
// 官方提供的隐藏方法，但对移动端无效
// ::-webkit-scrollbar {
// 	display: none;
// 	width: 0 !important;
// 	height: 0 !important;
// 	-webkit-appearance: none;
// 	background: transparent;
// }
</style>

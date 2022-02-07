<template>
	<view class="session-list">
		<view
			class="session-item"
			v-for="(item, index) in list"
			:key="item.fid"
			@tap="goChatroom(index)"
			@touchstart="dragStart"
			@touchend="dragEnd(index)"
			@touchmove="dragHandler($event, index)"
			:ref="index"
		>
		{{item}}
			<!-- 提供item，以及index -->
			<session :item="{item,index}"></session>
		</view>
	</view>
</template>

<script>
import session from "@/components/session"

export default {
	name: "sessionList",
	props:["list"],
	components: {
		session
	},
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
			flag: 0,
			showMenu: false
		};
	},
	methods: {
		goChatroom(index) {
			if (!this.showMenu) {
				if (!this.flag) {
					uni.navigateTo({
						url: `pages/chatroom/index?uid=${this.list[index].fid}`
					});
				}
				this.flag = 0;
			}
		},
		// 记录鼠标点击起点
		dragStart(event) {
			this.startX = event.touches[0].pageX;
		},
		dragHandler(event, index) {
			const item = this.$refs[index][0].$el;
			let moveDis;
		
			// 由于touchend 只会有两种状态，1：显示按钮 和 0：没显示按钮
			if (this.dragType) {
				moveDis = this.startX - event.touches[0].pageX;
		
				// 该情况下moveDis 只能是 -btnWidth ~ 0
				moveDis > 0 ? (moveDis = 0) : '';
				moveDis < -this.btnWidth ? (moveDis = -this.btnWidth) : '';
				item.style.transform = `translateX(-${moveDis + this.btnWidth}px)`;
			} else {
				moveDis = this.startX - event.touches[0].pageX;
		
				// 该情况下moveDis 只能是 0 ~ btnWidth
				moveDis >= this.btnWidth ? (moveDis = this.btnWidth) : '';
				moveDis < 0 ? (moveDis = 0) : '';
				item.style.transform = `translateX(${-moveDis}px)`;
			}
		
			this.moveDis = moveDis;
		},
		dragEnd(index) {
			const item = this.$refs[index][0].$el;
			
			// 注意 moveDis置0 或是没动，就是维持当前的dragType
			
			if( this.moveDis === 0) {
				console.log("move为0,维持状态")
				this.dragType?item.style.transform = `translateX(-${this.btnWidth}px)`:item.style.transform = null;
			}
			else if (this.moveDis > 40 || (this.moveDis < 0 && this.moveDis > -40)) {
				item.style.transform = `translateX(-${this.btnWidth}px)`;
				this.dragType = 1;
				this.flag = 1;
				console.log("显示按钮")
			} 
			else {
				item.style.transform = null;
				this.dragType = 0;
				console.log("不显示按钮")
			}
			// 重置
			this.moveDis = 0;
		},
	},
	created() {
		uni.$on("updateSessionList", index=>{
			this.list.unshift(this.list[index])
			this.list.splice(index+1,1)
			console.log("修改后",this.list)
			uni.setStorageSync(`uid${uni.getStorageSync('userInfo').uid}contentList`,this.list)
		})
	},
	mounted() {
		if (this.list.length != 0) {
			// 获取需要的节点信息
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.btn-group')
				.boundingClientRect(data => {
					this.btnWidth = data.width;
				})
				.exec();
		}
	}
};
</script>

<style lang="scss" scoped>
	.session-list {
		padding: 20rpx 0;
	
		// .list-item {
	
			// transform: translateX(-10%);
	
			// &:active {
			// 	background-color: #f3f3f3;
			// }
		// }
	}

</style>

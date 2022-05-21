<template>
	<scroll-view class="session-list" scroll-y="true">
		<view
			class="session-item"
			:class="[!isDrag? 'transition' : '', item.isTop?'stickyOnTop':'']"
			:style="{transform: sessionStyle[index]}"
			v-for="(item, index) in list"
			:key="item.isGroup?item.gid:item.fid"
			@tap="goChatroom(index)"
			@touchstart="dragStart($event,index)"
			@touchend="dragEnd(index)"
			@touchmove="dragHandler($event, index)"
			:ref="index"
		>
		<!-- {{item}} -->
			<!-- 提供item，以及index, 展开item，避免session中引用嵌套太多 -->
			<session :item="{...item,index}"></session>
		</view>
	</scroll-view>
</template>

<script>
import session from "@/components/session"
import {stickyOnTop} from "@/utils"

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
			btnWidth: [],
			// 记录每个session 状态，true为展开
			sessionState: [],
			// 记录是否已有session 展开，并记录展开的 index
			unfoldIndex: null,
			// 判断是否为点击
			isTap: true,
			// 绑定session样式
			sessionStyle: []
		};
	},
	watch:{
		list() {
			this.sessionState = new Array(this.list.length).fill(false);
		}
	},
	methods: {
		goChatroom(index) {
			// 如果存在展开元素同样阻止跳转
			if (this.unfoldIndex === null) {
				if(this.list[index].msg.isGroup) {
					uni.navigateTo({
						url: `pages/chatroom/index?gid=${this.list[index].gid}`
					});
				} else {
					uni.navigateTo({
						url: `pages/chatroom/index?fid=${this.list[index].fid}`
					});
				}
				
			}
		},
		// 记录鼠标点击起点
		dragStart(event,index) {
			this.startX = event.touches[0].pageX;
		},
		dragHandler(event, index) {
			this.isTap = false;
			
			// 清除过渡类名
			this.isDrag = true;
			// 存在展开元素，阻止move行为
			if (this.unfoldIndex != null  && this.unfoldIndex != index) return

			const item = this.$refs[index][0].$el;
			let moveDis;
		
			// 由于touchend 只会有两种状态，true：显示按钮 和 false：没显示按钮
			if (this.sessionState[index]) {
				moveDis = this.startX - event.touches[0].pageX;
		
				// 该情况下moveDis 只能是 -btnWidth ~ 0
				moveDis > 0 ? (moveDis = 0) : '';
				moveDis < -this.btnWidth[index] ? (moveDis = -this.btnWidth[index]) : '';
				// item.style.transform = `translateX(-${moveDis + this.btnWidth[index]}px)`;
				this.sessionStyle.splice(index,1,`translateX(-${moveDis + this.btnWidth[index]}px)`)
			} else {
				moveDis = this.startX - event.touches[0].pageX;
		
				// 该情况下moveDis 只能是 0 ~ btnWidth
				moveDis >= this.btnWidth[index] ? (moveDis = this.btnWidth[index]) : '';
				moveDis < 0 ? (moveDis = 0) : '';
				// item.style.transform = `translateX(${-moveDis}px)`;
				this.sessionStyle.splice(index,1,`translateX(${-moveDis}px)`)
			}
		
			this.moveDis = moveDis;
		},
		dragEnd(index) {
			// 设置isDrag 为false 添加过渡类名
			this.isDrag = false;
			
			// 如果存在展开元素，并且操作不是同一个元素，先把展开元素折叠。重置折叠的情况 1.有展开时的点击操作 2.有展开时操作别的元素 
			if(this.unfoldIndex != null && this.unfoldIndex != index || this.isTap && this.unfoldIndex != null) {
				// const sessionElement = this.$refs[this.unfoldIndex][0].$el;
				this.sessionState[this.unfoldIndex] = false;
				// sessionElement.style.transform =  null;
				this.sessionStyle.splice(this.unfoldIndex,1,null) 
				// 延迟标志置空
				setTimeout(()=>{this.unfoldIndex = null;},500)
			}
			
			// const sessionElement = this.$refs[index][0].$el;
			
			// 注意 moveDis置0 或是没动，就是维持当前的dragType
			if( this.moveDis === 0) {
				// 维持状态，显示按钮组，如果是显示按钮组情况下，	
			}
			else if (this.moveDis > 40 || (this.moveDis < 0 && this.moveDis > -40)) {
				// sessionElement.style.transform = `translateX(-${this.btnWidth}px)`;
				
				this.sessionState[index] = true;
				this.unfoldIndex = index;
				// sessionElement.style.transform = `translateX(-${this.btnWidth[index]}px)`;
				this.sessionStyle.splice(index,1,`translateX(-${this.btnWidth[index]}px)`) 

			} 
			else {
				// sessionElement.style.transform = null;
				
				this.sessionState[index] = false;
				this.unfoldIndex = null;
				// sessionElement.style.transform = null;
				this.sessionStyle.splice(index, 1, null) 

			}
			// 重置
			this.moveDis = 0;
			this.isTap = true;
		},
		getDOM() {
			if (this.list.length != 0) {
				// 获取需要的节点信息
				const query = uni.createSelectorQuery().in(this);
			
				// nextTick 会等数据更新到视图（DOM），但并不会等css 即重绘完成
				setTimeout(() => {
					query.selectAll('#btn-group').boundingClientRect(data => {
						data.forEach(({width},index) => {this.btnWidth[index] = width})
					}).exec();
				},500)
				
				query.selectAll('.session-item').boundingClientRect( ()=> {
					this.sessionStyle.push(null)
				}).exec();
			}
		}
	},
	created() {
		
		// 置顶操作，session分开两个数组存放置顶的一个普通的一个 ，取消置顶会按dateTime重新排序
		uni.$on("stickyOnTop", index => {
			this.getDOM()
			let count = this.$store.state.count;
			
			// 添加标识置顶的属性, 给一个元素就好
			this.list[index].isTop = true;
			stickyOnTop(this.list,this.list[index],index);

			// uni.setStorageSync(`uid${this.$store.state.userInfo.uid}sessionList`,this.list)
			
			count?++this.$store.state.count:this.$store.state.count = 1;
			console.log("count",this.$store.state.count)
				
			uni.setStorageSync(`uid${this.$store.state.userInfo.uid}stickyCount`,count)
			this.moveDis = 0;
		})
		
		uni.$on("removeFromTop", index => {
			this.getDOM()
			
			let count = this.$store.state.count;

			const insertIndex =  this.list.findIndex((item,currentIndex) => {
				if (count < currentIndex) return false
				 return item.dateTime <= this.list[index].dateTime 
			});
			this.list[index].isTop = false;
			console.log("insert",insertIndex , count)
			
			// 添加到插入位置中, index 为-1未找到，放置头部
			this.list.splice(insertIndex < 0?count:insertIndex,0,this.list[index]);
			// 移除原数组的值
			this.list.splice(index,1)
			
			count?--this.$store.state.count:this.$store.state.count = 0;
			uni.setStorageSync(`uid${this.$store.state.userInfo.uid}stickyCount`,count)
			uni.setStorageSync(`uid${this.$store.state.userInfo.uid}sessionList`,this.list)
		})
		
		uni.$on("deleteSession",index => {
			this.list.splice(index,1)
		})
	},
	mounted() {
		this.getDOM()
	},
};
</script>

<style lang="scss" scoped>
	.session-list {
		// #ifdef H5
		height: calc(100vh - var(--window-top));
		padding-bottom: var(--window-bottom);
		// #endif
		
		// #ifdef APP
		height: calc(100vh - 50px - var(--status-bar-height));
		padding-bottom: 50px;
		// #endif
		
		
		// 用于非拖拽时的过渡效果
		.transition {
			transition: all 0.5s ease; 
		}
		
		.stickyOnTop {
			background-color: #d1d1d1;
		}

		// .list-item {
	
			// transform: translateX(-10%);
	
			// &:active {
			// 	background-color: #f3f3f3;
			// }
		// }
	}

</style>

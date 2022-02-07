<template>
	<view class="emojiBox-container">
		<scroll-view class="emoji-box" scroll-y="true" @scroll="scrollHandler">
			<label id="backspace" @tap="backspace" @longtap="longBackspace" @touchend="endBackspace"><image src="@/static/images/chatroom/backspace.png"></image></label>
			<view>
				<ul class="row" :id="'row' + RowIndex" v-for="(row, RowIndex) in emojiList" :key="RowIndex">
					<!-- 
						只把第几列上的li 推入ref
						0: (6) [li, li, li, li, li, li]
						1: (6) [li, li, li, li, li, li]
						2: (6) [li, li, li, li, li, li]
						3: (5) [li, li, li, li, li]
						4: (5) [li, li, li, li, li]
						5: (5) [li, li, li, li, li]
						6: (5) [li, li, li, li, li]
						7: (5) [li, li, li, li, li]
					-->
					<li
						v-for="(item, columnIndex) in row"
						:key="columnIndex"
						@tap="enterEmoji(RowIndex, columnIndex)"
						:ref="columnIndex"
						:style="{ opacity: columnIndex == 6 || columnIndex == 7 ? itemList[columnIndex][RowIndex] : 1 }"
					>
						{{ item }}
					</li>
				</ul>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import {calculateOpacity,debounce} from '@/utils/index.js'	
	
export default {
	name: 'emojiBox',
	computed: {
		emojiList() {
			return [
				['😃', '😄', '😁', '😆', '😅', '😂', '😉', '😊'],
				['😇', '😍', '😘', '😚', '😋', '😜', '😝', '😐'],
				['😶', '😏', '😒', '😌', '😔', '😪', '😷', '😵'],
				['😎', '😲', '😳', '😨', '😰', '😥', '😢', '😭'],
				['😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤'],
				['😡', '😈', '😠']
			];
		}
	},
	data() {
		return {
			// 退格键的top
			backspaceTop: 0,
			// 记录每一行样式信息
			rowList: [],
			/*
				由于app端需要动态绑定style更改样式，在data维护一个类似this.$refs的数组结构，以列为索引,并简化为只取7，8列
				6: (5) [0, 0, 0, 0, 0]
				7: (5) [0, 0, 0, 0, 0]
			*/
			itemList: {}
		};
	},
	methods: {
		enterEmoji(x, y) {
			this.inputs = this.inputs + this.emojiList[x][y];
		},
		backspace() {
			let temp = [...this.inputs];
			temp.pop();
			this.inputs = temp.join('');
		},
		longBackspace() {},
		endBackspace() {},
		scrollHandler() {
			const query = uni.createSelectorQuery().in(this);

			// if (!this.extendBox.type === 'emoji') return;
			// 表情退格键处的表情透明度变化
	
			let that = this;
			function comput() {
				query
					.select('.emoji-box')
					.scrollOffset(data => {
						// data 为emoji-box 对象包含滚动信息, rowList 由于多层遍历内部会执行多次
						that.rowList.forEach(row => {
							const rowIndex = row.id.split('row')[1];
							const opc = calculateOpacity(Math.ceil(row.top), Math.ceil(row.top + row.height), row.height, that.backspaceTop, data.scrollTop);
							
							// document.querySelectorAll(`#${row.id} li:nth-child(n+7)`).forEach(item=>{
							// 	item.style.opacity = calculateOpacity(Math.ceil(row.top),Math.ceil(row.top+row.height), row.height,this.backspaceTop,data.scrollTop)
							// })

							/*
							由于是双循环渲染，ul为行li为列元素，所以 this.$refs 是每一列的li集合，我们只需取第7,8列即可,
							但注意这里是row 的循环，我们只能取当前row 的7，8个li
							还需要判断该行是否有第7、8个li
						*/
							// // #ifdef H5
							// if(that.$refs[6][rowIndex]) {
							// 	that.$refs[6][rowIndex].style.opacity = calculateOpacity(Math.ceil(row.top),Math.ceil(row.top+row.height), row.height,that.backspaceTop,data.scrollTop)
							// }
							// if(that.$refs[7][rowIndex]) {
							// 	that.$refs[7][rowIndex].style.opacity = calculateOpacity(Math.ceil(row.top),Math.ceil(row.top+row.height), row.height,that.backspaceTop,data.scrollTop)
							// }
							// // #endif

							// 使用 assgin 修改对象触发视图更新, 条件也要修改，即使透明度是0也要赋值

							if (that.itemList[6][rowIndex] != undefined) {
								that.itemList[6][rowIndex] = opc;
							}
							if (that.itemList[7][rowIndex] != undefined) {
								that.itemList[7][rowIndex] = opc;
							}
							that.itemList = Object.assign({}, that.itemList);
						});
					})
					.exec();
			}
			// 防抖
			debounce(comput, 10)();
		},
		
	},
	created() {
		let column7 = [];
		let column8 = [];
		this.emojiList.forEach((row)=>{
			row[6]?column7.push(1):""
			row[7]?column8.push(1):""
		})
		this.itemList[6] = column7;
		this.itemList[7] = column8;
	},
	mounted() {
		
		uni.$on("showEmoji",()=>{
			const query = uni.createSelectorQuery().in(this);
			// 延迟让 extendBox 整个出来
			setTimeout(() => {
				query
					.selectAll('.row')
					.boundingClientRect(data => {
						this.rowList.push(...data);
					})
					.select('#backspace')
					.boundingClientRect(data => {
						this.backspaceTop = Math.ceil(data.top);
					})
					.exec();
					
					// 调用一次判断
					this.scrollHandler();
			}, 100);
			
		})
	}

};
</script>

<style lang="scss" scoped>
.emoji-box {
	// height: 100%;
	height: 450rpx;
	width: 100%;
	position: relative;

	view {
		padding-top: 20rpx;
		padding-bottom: 100rpx;

		ul {
			display: flex;
			justify-content: flex-start;
			padding: 0 20rpx;
			list-style: none;
			// display: grid;
			// grid-template-columns: repeat(8,12.5%);

			li {
				float: left;
				width: 80rpx;
				height: 80rpx;
				font-size: 50rpx;
				padding: 10rpx;
			}
		}
	}

	// 退格键
	label {
		position: fixed;
		width: 100rpx;
		height: 80rpx;
		top: 80%;
		right: 5%;
		line-height: 80rpx;
		vertical-align: middle;
		text-align: center;
		border-radius: 20rpx;
		background: #fff;
		z-index: 1;

		image {
			line-height: 80rpx;
			vertical-align: middle;
			width: 84rpx;
			height: 64rpx;
		}
	}
}
</style>

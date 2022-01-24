<template>
	<view class="sendBox-container">
		<view class="send-box" :class="{ show: !extendBox.hidden }">
			<view class="nav-bar">
				<view :class="showVoice ? 'voice' : 'keyboard'" @tap="showMike"><button></button></view>
				<textarea 
					v-show="showInput" 
					v-model="inputs" 
					auto-height="true" 
					fixed="true" 
					:focus="isfocus"
					@blur="isfocus = false"
					@tap="getFocus"
				/>
				<button 
					v-show="!showInput" 
					@touchstart="showRecording = true"
					@touchend="showRecording=false"
					style="flex-grow: 1;"
				>按住说话</button>
				<view :class="showEmoji ? 'emoji' : 'keyboard'" @tap="showExtend('emoji')"><button></button></view>
				<view v-show="!showSend" class="tools" @tap="showExtend('tools')"><button></button></view>
				<view v-show="showSend" class="send"><button type="default" @click="sendMsg">发送</button></view>
			</view>
			<view class="extend-box">
				<scroll-view class="emoji-box" v-show="extendBox.type == 'emoji'" scroll-y="true" @scroll="scrollHandler">
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
								:style="{opacity:(columnIndex==6 || columnIndex==7)?itemList[columnIndex][RowIndex]:1}"
							>{{ item }}</li>
						</ul>
					</view>
				</scroll-view>
				<view class="tools" v-show="extendBox.type == 'tools'">
					<view class="tool" v-for="(item, index) in tools" :key="index">
						<button @tap="selectTool(index)"><image :src="item.src" mode=""></image></button>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
		</view>
		<recordingPage v-show="showRecording"></recordingPage>
	</view>
</template>

<script>
import data from '@/common/data.js';
import {calculateOpacity,debounce} from '@/utils/index.js'
import recordingPage from '@/components/recordingPage/index.vue'

export default {
	components:{
		recordingPage,
	},
	props:["fid"],
	computed: {
		// 使用路径别名是不行的，路径别名需要在打包时被编译
		tools() {
			return  [
						{
							src: '../../static/images/chatroom/image.png',
							title: '相册',
						},
						{
							src: '../../static/images/chatroom/camera.png',
							title: '拍摄'
						},
						{
							src: '../../static/images/chatroom/video.png',
							title: '视频',
						},
						{
							src: '../../static/images/chatroom/location.png',
							title: '位置'
						},
						{
							src: '../../static/images/chatroom/file.png',
							title: '文件'
						}
					]
		}
	},
	data() {
		return {
			inputs: '',
			// 默认进入 focus 为false
			isfocus: false,
			showInput: true,
			// showVoice showEmoji 其中一个为false，就是点 keyboard
			showVoice: true,
			showEmoji: true,
			// 显示发送按钮
			showSend: false,
			// 显示长按录音页面
			showRecording: false,
			extendBox: { type: 'emoji', hidden: true },
			// 退格键的top
			backspaceTop:0,
			emojiList: data.emoji(),
			// 记录每一行样式信息
			rowList: [],
			/*
				由于app端需要动态绑定style更改样式，在data维护一个类似this.$refs的数组结构，以列为索引,并简化为只取7，8列
				6: (5) [0, 0, 0, 0, 0]
				7: (5) [0, 0, 0, 0, 0]
			*/
			itemList:{},
			
		};
	},
	watch: {
		inputs: {
			handler: function(){

				if(this.inputs.trim()==="") {
					!this.showSend?"":this.showSend = false;
				} else {
					this.showSend = true;
				}
			},
			immediate: true
		},
	},
	methods: {
		// tap 代替getFocus
		getFocus() {
			// uni.$emit("scrollTo")
		},
		sendMsg(){
			// 自己发的信息触发更新首页聊天列表,以及聊天室列表
			uni.$emit("homeMsg",{
				msg: this.inputs,
				time: Date.now(),
				type: 0,
				fid: this.fid,   //提供联系人id
			})
			
			uni.$emit("chatroomMsg",{
				msg: this.inputs,
				time: Date.now(),
				type: 0,
				fid: this.fid,   //提供联系人id
				self: 1,
			})
			
			// 触发socket 
			this.$socket.emit("chatMsg",{
				msg: this.inputs,
				fid: this.fid,		// 发出去，发别人的id	
				uid: uni.getStorageSync("userInfo").uid,		// 还需要附上自己的id
				type: 0,
				dateTime: Date.now()
			})
			this.inputs = "";
		},

		showExtend(type) {
			if( type==='emoji') {
				
				if(!this.showEmoji) {
					console.log("设置true",this.isfocus)
					this.isfocus = true
				}
				this.showEmoji=!this.showEmoji
				if(!this.showVoice) {
					this.showInput = true;
					this.showVoice = true;
				}
				
				const query = uni.createSelectorQuery().in(this);
				// 延迟让 extendBox 整个出来
				setTimeout(() =>{
					// const query = uni.createSelectorQuery();
					query.selectAll(".row").boundingClientRect(data => {
						this.rowList.push(...data);
					}).select("#backspace").boundingClientRect(data =>{
						this.backspaceTop = Math.ceil(data.top);
					}).exec()
					
					// 调用一次判断
					this.scrollHandler()
				},100)

			}
			this.extendBox.hidden = false;
			this.extendBox.type = type;

		},
		showMike() {
			// 需要在修改showVoice 前判断
			if(!this.showVoice) {
				this.isfocus = true
			}
			this.showVoice = !this.showVoice;
			if(!this.showEmoji) {
				this.showEmoji = true
			}
			this.showInput = !this.showInput;
			this.extendBox.hidden = true
		},
		enterEmoji(x,y) {
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
			
			if(!this.extendBox.type === 'emoji') return;
			// 表情退格键处的表情透明度变化
			
			let that = this;
			function comput() {	
				query.select(".emoji-box").scrollOffset(data => {
					// data 为emoji-box 对象包含滚动信息, rowList 由于多层遍历内部会执行多次
					that.rowList.forEach(row=>{
						const rowIndex = row.id.split('row')[1];
						const opc = calculateOpacity(Math.ceil(row.top),Math.ceil(row.top+row.height), row.height,that.backspaceTop,data.scrollTop);
				
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
						
						if(that.itemList[6][rowIndex] != undefined) {
							that.itemList[6][rowIndex] = opc;
						}
						if(that.itemList[7][rowIndex] != undefined) {
							that.itemList[7][rowIndex] = opc;
						}
						that.itemList = Object.assign({},that.itemList)
						
					})
				}).exec()
				
			}
			// 防抖
			debounce(comput,10)()
		},
		selectTool(index) {
			switch(index) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					console.log('sdsd')
					uni.navigateTo({
						url: "../../subpages/live/index"
					})
					break;
				case 3:
					break;
				case 4:

					break;

			}
		}

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
		const backspaceTop = uni.$on("closeExtend", () => {
			this.extendBox.hidden = true;
		});
	},
};
</script>

<style lang="scss" scoped>
// .f-clear::after {
// 	content: '';
// 	display: block;
// 	visibility: hidden;
// 	clear: both;
// }

.sendBox-container {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 1;

	.show {
		transform: translateY(0) !important;
	}

	.send-box {
		width: 100%;
		transform: translateY(450rpx);
		transition: all 0.1s ease-in-out;
		background-color: #f7f7f5;

		.nav-bar {
			// height: 100rpx;
			display: flex;
			align-items: flex-end;
			column-gap: 20rpx;
			padding: 14rpx 10rpx;


			// 发送按钮自己的样式
			.send {
				button {
					width: 120rpx;
					height: 60rpx;
					padding: 0;
					text-align: center;
					line-height: 60rpx;
					color: #fff;
					background: #f0ad4e;
				}
			}

			view {
				padding: 10rpx;

				button {
					display: block;
					width: 56rpx;
					height: 56rpx;
					border: none;
				}
			}

			// 整个输入框都不给高度，
			textarea {
				flex-grow: 1;
				overflow-y: scroll;
				flex: auto;
				padding: 20rpx;
				border-radius: 20rpx;
				max-height: 160rpx;
				background: #fff;
			}

			.voice {
				button {
					background: center / cover url('@/static/images/chatroom/voice.png') no-repeat;
				}
			}

			.keyboard {
				button {
					background: center / cover url('@/static/images/chatroom/keyboard.png') no-repeat;
				}
			}

			.emoji {
				button {
					background: center / cover url('@/static/images/chatroom/emoji.png') no-repeat;
				}
			}

			.tools {
				button {
					background: center / cover no-repeat url('@/static/images/chatroom/tools.png');
				}
			}
		}

		//扩展区域
		.extend-box {
			width: 100%;
			height: 450rpx;
			background: #e7e9eb;
			// overflow-y: scroll;

			.emoji-box {
				height: 100%;
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

			.tools {
				display: grid;
				grid-template-columns: repeat(4, 25%);
				align-items: center;
				justify-content: center;
				row-gap: 40rpx;
				padding: 0 20rpx;
				padding-top: 60rpx;

				.tool {
					text-align: center;
					button {
						height: 110rpx;
						width: 110rpx;
						padding: 20rpx 20rpx;
						border-radius: 40rpx;

						image {
							height: 72rpx;
							width: 72rpx;
							background-size: cover;
						}
					}

					text {
						color: #708090;
					}
				}
			}
		}
	}
}
</style>

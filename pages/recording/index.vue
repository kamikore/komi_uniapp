<template>
	<view class="recording" >
		<view class="info">
			<view class="">{{info.currentTarget}}</view>
			<view class="">{{info.target}}</view>
			<view class="">{{info.touches}}</view>
		</view>
		<!-- 点击label会触发包裹的button 点击事件, button id 设置了无效！！！！？？？ -->
		<label id="left" ><button type="default" :class="{active: isCancel}" class="iconfont icon-close-bold"></button></label>
		<label id="right"><button type="default" :class="{active: unkown}">文</button></label>
		<view id="voiceBtn" :class="{active: isRecord}" class="iconfont icon-voice"></view>
		<volumeBeat></volumeBeat>
		<view class="mask"></view>
	</view>
</template>

<script>
import volumeBeat from "@/components/volumeBeat"

export default {
	name: 'recording',
	components:{
		volumeBeat
	},
	computed:{
		systemInfo() {
			return uni.getSystemInfoSync()
		}
	},
	data() {
		return {
			info: {},
			isCancel: false,
			isRecord: true,
			unkown: false,
			transform:"",
		};
	},
	methods: {
		touchmove(detail) {
			console.log(detail)
			this.$set(this.info,'currentTarget',detail.currentTarget)
			this.$set(this.info,'target',detail.target)
			this.$set(this.info,'touches',detail.touches[0])
		},
	},
	mounted() {
		/* 
			构造椭圆标准方程, 中心点在页面底部中间，并且触摸点的坐标也是相对于左上角而言
			需要把坐标处理为相对于左下角，并且椭圆方程也需要做改变
		 */
		let ellipse;
		const query = uni.createSelectorQuery().in(this);
		query.select('#voiceBtn').fields({size:true,rect:true,computedStyle:["width","height"]},res=>{
			//#ifdef H5
			const a = Number(res.width.split("px")[0])/2;
			const b = Number(res.height.split("px")[0])/2;
			//#endif
			//#ifdef APP
			const a = Number(res.width.split("px")[0]);
			const b = Number(res.height.split("px")[0]);
			//#endif
			const a_2 = Math.pow(a,2);
			const b_2 = Math.pow(b,2);
			// 椭圆方程
			ellipse = function(x,y) {
				return ((Math.pow((x-a),2)/a_2)+(Math.pow(y,2)/b_2) <= 1)	
			}
		}).exec()
		
		uni.$on("dragInRecord",(res) =>{
			if(ellipse(res.x,res.y)) {
				this.isRecord = true;
				this.isCancel = false;
				this.unkown = false;
				uni.$emit("changeRecordStatus",1)
			} else {
				if(res.x < this.systemInfo.screenWidth/2) {
					this.isCancel = true;
					this.isRecord = false;
					this.unkown = false;
					uni.$emit("changeRecordStatus",0)
				}else {
					this.unkown = true;
					this.isCancel = false;
					this.isRecord = false;	
					uni.$emit("changeRecordStatus",0)
				}
			}
					
		})
	}
};
</script>

<style lang="scss" scoped>
	
.recording {
	.active {
		background-color: #ededed !important; 
		
		&:before {
			color: #000000 !important;
		}
	}
	
	.info {
		position: absolute;
		z-index: 1;
	}
	
	// 禁止滚动
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
	
	button {
		position: absolute;
		top: 65%;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 60rpx;
		line-height: 160rpx;
		color: #929292;
		background-color: #3a3a3a;
		
		&:before {
			// 伪元素无法旋转？？？  解决：转动 view
			// transform: rotateZ(45deg);
		}

	}
	
	#left {
		position: absolute;
		height: 100vh;
		width: 50vw;
		left: 0;
		
		button {
			left: 10%;
		}
	}
	
	#right {
		position: absolute;
		height: 100vh;
		width: 50vw;
		right: 0;
		
		button {
			right: 10%;
		}
	}
	
	
	#voiceBtn {
		position: absolute;
		width: 1200rpx;
		height: 500rpx;
		bottom: 0;
		left: 50%;
		transform: translate(-50%,50%);
		background-color: #3a3a3a;
		// -webkit-clip-path: ellipse(33% 30% at 48% 51%);
		// clip-path: ellipse(43% 40% at 50% 50%);
		border-radius: 50%;
		
		&:before {
			position: absolute;
			font-size: 80rpx;
			top: 20%;
			left: 50%;
			transform: translate(-50%,0);
			color: #929292;
		}
	}
	
	.mask {
		height: 100vh;
		width: 100vw;
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		z-index: -1;
	}
}
</style>

<template>
	<view class="volumeBeat">
		<view class="volume-box" :style="{backgroundColor: recordStatus?'#4CD964':'#DD524D'}" >
			<view class="">
				<ul>
					<li :class="recordStatus?'active':'cancel'"></li>
					<li :class="recordStatus?'active':'cancel'"></li>
					<li :class="recordStatus?'active':'cancel'"></li>
					<li :class="recordStatus?'active':'cancel'"></li>
					<li :class="recordStatus?'active':'cancel'"></li>
					<li :class="recordStatus?'active':'cancel'"></li>
				</ul>
			</view>
			<text :style="{borderTopColor: recordStatus?'#4CD964':'#DD524D'}" ></text>
		</view>
	</view>
</template>

<script>
	
export default {
	name: "volumeBeat",
	data() {
		return {
			// 0为取消 1为正常
			recordStatus: 1,
		};
	},
	methods: {
	},
	created() {
		uni.$on("changeRecordStatus",(status) => {
			this.recordStatus = status
		})
	}
};
</script>

<style lang="scss" scoped>
@-webkit-keyframes beat {
  0%, 40%, 100% {
	-webkit-transform: scaleY(0.4);
			transform: scaleY(0.4);
  }
  20% {
	-webkit-transform: scaleY(1);
			transform: scaleY(1);
  }
}
@keyframes beat {
	0%, 40%, 100% {
  -webkit-transform: scaleY(0.4);
		transform: scaleY(0.4);
  }
  20% {
	-webkit-transform: scaleY(1);
			transform: scaleY(1);
  }
}
	
.volumeBeat{
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%,0);
	
	.volume-box {
		position: relative;
		height: 150rpx;
		width: 300rpx;
		border-radius: 20rpx;
		border: 1rpx solid transparent;
		
		ul {
			margin: 0;
			padding: 0;
			text-align: center;
			line-height: 200rpx;
			
			.active {
				background-color: #006a60;
			}
			
			.cancel{
				background-color: #F0F0F0;
			}
			
			li {
				height: 80rpx;
				width: 20rpx;
				margin: 0 5px;
				display: inline-block;
				-webkit-animation: hue-rotate 0.8s infinite ease-in-out;
				animation: beat 0.8s infinite ease-in-out;
			}
			li:nth-of-type(1) {
			      -webkit-animation-delay: -1.4s;
			      animation-delay: -1.4s;
			    }
			li:nth-of-type(2) {
			  -webkit-animation-delay: -1.3s;
			  animation-delay: -1.3s;
			}
			li:nth-of-type(3) {
			  -webkit-animation-delay: -1.2;
			  animation-delay: -1.2;
			}
			li:nth-of-type(4) {
			  -webkit-animation-delay: -1.1;
			  animation-delay: -1.1s;
			}
			li:nth-of-type(5) {
			  -webkit-animation-delay: -1s;
			  animation-delay: -1s;
			}
			li:nth-of-type(6) {
			  -webkit-animation-delay: -0.9s;
			  animation-delay: -0.9s;
			}
			li:nth-of-type(7) {
			  -webkit-animation-delay: -0.8s;
			  animation-delay: -0.8s;
			}
		}
		
		text {
			position: absolute;
			bottom: -48rpx;
			left: 50%;
			width: 0;
			height: 0;
			transform: translate(-50%,0);
			border: 24rpx solid transparent;
		}
	}
}
</style>

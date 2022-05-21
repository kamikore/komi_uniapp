<template>
	<view class="momentList">
		<scroll-view 
			id="momentScrollBox" 
			scroll-y="true" 
			@scrolltolower="touchDown"
		>
			<momentsBanner v-if="showBanner"></momentsBanner>
			<moment-item class="momentItem" v-for="(item,index) in moments" :key="item.moment_id" :item="item"></moment-item>
			<view class="overTip" v-if="isOver">
				<view class="line"></view>
				<view style="margin: 0 40rpx;"><text>已经到达底部啦</text></view>
				<view class="line"></view>
			</view>
			<view class="Tip" v-if="!enablePullDownRefresh && moments.length">完整内容查看详情</view>
			<view class="Tip" v-if="!moments.length">当前朋友没有展示任何内容</view>
		</scroll-view>
	</view>
</template>

<script>
import {fetchMoments} from "@/api"
import momentItem from "@/components/momentItem"	
import momentsBanner from "@/components/momentsBanner"

export default {
	name: "momentList",
	components: {
		momentsBanner,
		momentItem
	},
	props:['uid',"showBanner","enablePullDownRefresh"],
	data() {
		return {
			moments: [],
			offset: 0,
			// 是否所有记录已获取
			isOver: false,
		};
	},
	methods: {
		touchDown() {
			if(this.isOver || !this.enablePullDownRefresh) return
			this.offset += 1
			fetchMoments(this.uid,this.offset,this.showBanner?8:3).then((res) => {
				res.data.length?this.isOver=false:this.isOver=true
				this.moments.push(...res.data)
			}, (err) =>{
				console.log(err)
			})
		}
	},
	created() {
		uni.$on('updateMoments', (moment) => {
			this.moments.unshift(moment)
		})
		fetchMoments(this.uid,this.offset,this.showBanner?8:3).then((res) => {
			this.moments = res.data
		}, (err) =>{
			console.log(err)
		})
	}
};
</script>

<style lang="scss" scoped>
	
.momentList {
	//#ifdef H5
	// height: calc(100vh - var(--window-bottom));
	// #endif
	
	
	//#ifdef APP
	// height: 100vh;
	// #endif
	
	#momentScrollBox {
		height: 100%;
		// width: calc(100% - 96rpx);
		// padding: 24rpx 48rpx;
		
		
		.momentItem {
			margin: 24rpx 48rpx;
		}
		
		
		.overTip {
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			align-self: center;
			font-size: 28rpx;
			padding: 100rpx 0;
			color: #ADB5BD;
			
			text {
				white-space: nowrap;
			}
			
			.line {
				width: 20%;
				height: 1rpx;
				border-bottom: 1px solid  #EDEDED;
			}	
		}
		
		.Tip {
			padding: 40rpx 0 100rpx 0;
			font-size: 28rpx;
			text-align: center;
			color: #ADB5BD;
		}
	}
} 
	
	
</style>

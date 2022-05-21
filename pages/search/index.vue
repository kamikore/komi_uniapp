<template>
	<view class="search-container">
		<input type="text" v-model:value="inputValue" />
		<button type="default" @click="submit">查找</button>
		<view class="result-list">
			<view class="result" v-show="result" @click="clickHandler">
				<image :src="result?result.avatar || '../../static/images/future.png':'../../static/images/future.png'" mode="aspectFill"></image>
				<view class="info">
					<view class="nickName"><text>{{result?result.nickName:''}}</text></view>
					<view class="region"><text>{{result?result.region:''}}</text></view>
				</view>			
			</view>
			<view class="tip" v-show="!result && !flag">该用户不存在</view>
		</view>
	</view>

</template>

<script>
	
export default {
	name: "",
	data() {
		return {
			inputValue: "uniapp@qq.com",
			// 是否为首次进入，未执行任何查找
			flag: true,
			result: null,
		};
	},
	methods: {
		submit() {
			uni.request({
				url: "http://120.79.218.59:8080/komi/search/contacts",
				method:"GET",
				data: {
					submit: this.inputValue
				},
				success: (res) => {
					this.flag = false
					if(res.statusCode != 200) {
						this.result = null
						console.log(res.data.errMsg)
					} else {
						this.result = res.data;
					}
				},
				fail: (res) => {
					console.log("调用失败")
				}
			})
		},
		clickHandler() {
			uni.navigateTo({
				url: `../userDetails/index?fid=${this.result.user_id}`,
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.search-container {
	input {
		height: 100rpx;
		width: calc(100% - 40rpx - 40rpx);
		margin: 20rpx 20rpx;
		padding: 0 20rpx;
		background-color: #F7F7FC;
		
	}
	
	button {
		height: 100rpx;
		width: 50%;
		background: #002DE3;
		border-radius: 20rpx;
		color: #FFFFFF;
	}
	
	.result-list {
		margin-top: 40rpx;
		
		
		.result {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			
			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: 20rpx
			}
			
			.info {
				margin-left: 20rpx;
				
				.nickName {
					font-size: 32rpx;
				}
				
				.region {
					font-size: 28rpx;
					color: #ADB5BD;
				}
			}

		}
		
		.tip {
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 400;
			font-size: 32rpx;
			line-height: 32rpx;	
			color: #ADB5BD;
			text-align: center;
		}
		
		
	}
}
	
</style>

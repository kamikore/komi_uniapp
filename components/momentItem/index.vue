<template>
	<view class="momentItem">
		<view class="avatar"><image :src="item.uid.avatar" mode="aspectFill"></image></view>
		<view class="info">
			<view class="">
				<text class="userName" @click="goDetail">{{ contacts[item.uid.user_id] ? contacts[item.uid.user_id].remarkName : item.uid.nickName }}</text>
				<text class="dateTime">{{ dateFormat(item.dateTime) }}</text>
			</view>
			<!-- text 标签能够换行 -->
			<text class="content">{{ item.content }}</text>
			<view class="imgs" v-if="item.filesPath">
				<image 
					v-for="(url, index) in item.filesPath.split(',')" 
					:key="index" 
					:src="url" 
					mode="aspectFill"
					:class="index===1 || 4 || 7?'columnGap':''"
					@click="previewImage(url,item.filesPath.split(','))"
				>
				</image>
			</view>
			<view class="footer">
				<view class="operations" :class="{ isShow: showOperate }">	
					<button type="default" :class="{active: isLike}" @click="clickLike"><i class="iconfont icon-like"></i>Like</button>	
					<button type="default" @click="clickComment"><i class="iconfont icon-comments"></i>Comment</button>
				</view>
				<i class="iconfont icon-menu" @click="showOperate = !showOperate"></i>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { DateToDateTime } from '@/utils';

export default {
	name: 'momentItem',
	props: ['item'],
	computed: mapState(['contacts']),
	data() {
		return {
			isLike: false,
			showOperate: false
		};
	},
	methods: {
		goDetail() {
			uni.navigateTo({
				url: `/pages/userDetails/index?uid=${this.item.uid.user_id}`
			});
		},
		previewImage(currUrl,imgUrls) {
			console.log("点击的图片",currUrl,"图片数组",imgUrls)
			
			// 预览图片
			uni.previewImage({
				// 点击显示当前图片
				current: currUrl,
				urls: imgUrls,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function(data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function(err) {
						console.log('长按错误', err.errMsg);
					}
				}
			});
		},
		clickLike() {
			this.isLike = !this.isLike
		},
		clickComment() {
			
		},
		 dateFormat(date) {
			 return DateToDateTime(date)
		 },

		
	},
	created() {
		// console.log("item",this.item)
		// this.item.dateTime = ;
		// console.log(this.item.dateTime)
	}
};
</script>

<style lang="scss" scoped>
.momentItem {
	display: flex;
	margin-bottom: 32rpx;
	border-bottom: 2rpx solid #ededed;

	.avatar {
		image {
			width: 96rpx;
			height: 96rpx;
			border-radius: 20rpx;
			background-color: #ffa726;
			margin-right: 20rpx;
		}
	}

	.info {
		flex: 1;

		.userName {
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #3e4347;
		}

		.content {
			margin: 6rpx 0 20rpx 0;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box; /* ！！！！弹性伸缩盒子模型显示*/
			-webkit-line-clamp: 2; /*限制一个块元素显示的文本行数*/
			-webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/

			/* 某些情况需要加上换行处理 */
			word-break: break-word; /* 换行模式 */
			overflow-wrap: break-word;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 400;
			font-size: 32rpx;
			line-height: 40rpx;
			/* or 143% */
			
			
			color: #ADB5BD;
		}

		.dateTime {
			float: right;
			font-family: 'Mulish';
			font-style: normal;
			font-weight: 600;
			font-size: 24rpx;
			line-height: 32rpx;
			/* identical to box height, or 133% */	
			color: #3E4347;
		}

		.imgs {
			display: flex;
			flex-wrap: wrap;
			// column-gap: 3%;
			
			.columnGap {
				margin: 0 1.5% 3% 1.5%;
			}
			
			image {
				width: 30%;
				height: 150rpx;
				object-fit: cover;
				margin-bottom: 3%;
				background-color: #f0f0f0;
			}
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			// column-gap: 20rpx;

			.operations {
				display: flex;
				border-radius: 10rpx;
				overflow: hidden;
				transform: scaleX(0);
				transition: all 0.1s ease;
				transform-origin: right;
				
				.active {
					color: crimson;
				}
					
				button {
					background-color: #2e2e2e;
					border-radius: 0;
					padding: 0 20rpx;
					font-size: 30rpx;
					color: #f0f0f0;
					
					.iconfont {
						padding: 0 10rpx;
					}
				}
			}

			.icon-menu {
				background-color: #e8e8e8;
				width: 46rpx;
				height: 30rpx;
				border-radius: 6rpx;
				line-height: 30rpx;
				text-align: center;
				color: #334d5c;
				margin-left: 20rpx;
			}

			.isShow {
				transform: scaleX(1);
			}
		}
	}
}
</style>

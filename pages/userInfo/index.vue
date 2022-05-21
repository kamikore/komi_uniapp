<template>
	<view class="userInfo-container">
		<view class="item" v-for="(item,index) in options" :key="index" @click="editInfo(index)">
			<text>{{item.option}}</text>
			<view>
				<text v-if="index" >{{item.columnName==='gender'?(userInfo[item.columnName]?'女':'男'):userInfo[item.columnName]}}</text>
				<image v-else  @click.stop="chooseAvatar" :src="userInfo[item.columnName] || '../../static/images/test/7.jpg'" mode="aspectFill"></image>
				<i class="iconfont icon-arrow-right"></i>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import {uploadAvatarOrCover} from "@/api"
import {filePath2base64} from "@/utils"


export default {
	name: "userInfo",
	computed:mapState(['userInfo']),
	data() {
		return {
			isChange: false,
			options:[
				{
					option: '头像',
					columnName: 'avatar',		
				},
				{
					option: '名字',
					columnName: 'nickName',		
				},
				{
					option: '账号',
					columnName: 'account',		
				},
				{
					option: '性别',
					columnName: 'gender',		
				},
				{
					option: '地区',
					columnName: 'region',		
				},
				{
					option: '个性签名',
					columnName: 'signature'
				}
			]
		};
	},
	
	methods: {
		editInfo(optionIndex) {
			if(optionIndex) {
				uni.navigateTo({
					url: `../editInfo/index?option=${this.options[optionIndex].option}&columnName=${this.options[optionIndex].columnName}`
				})
			} else {
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success: (res) => {
						// #ifdef H5
						const file = res.tempFiles[0];
						const reader = new FileReader();
						reader.readAsDataURL(file); 
						reader.onload = () => {
							uploadAvatarOrCover(reader.result,file.type.split("/")[1],'avatar')
						}
						// #endif
						//#ifdef APP
						filePath2base64(res.tempFiles[0]).then((res) => {
							uploadAvatarOrCover(res.base64,res.type,'avatar')
						}, (err) => {
							console.log("读写错误",err)
						})
						// #endif
					},
					fail(err) {
						uni.showToast({
							title:err.errMsg,
							icon:'error'
						})
					}
				})
			}
		},
		chooseAvatar() {
			uni.previewImage({
				urls:[this.userInfo.avatar || '../../static/images/test/7.jpg'],
				fail(err) {
					console.log(err.errMsg)
				}
			})
		}
	},

};
</script>

<style lang="scss" scoped>
.userInfo-container {
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		border-bottom: 2rpx solid #EDEDED;
		padding: 20rpx 40rpx;
		
		view {
			display: flex;
			align-items: center;
			
			text {
				line-height: 100rpx;
				font-size: 32rpx;
				color: #ADB5BD;
			}
			
			image {
				
				width: 100rpx;
				height: 100rpx;
			}
			
			.iconfont {
				font-size: 48rpx;
			}
		}
	}
}
</style>

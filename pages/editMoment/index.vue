<template>
	<view class="editMoment">
		<uni-nav-bar 
			left-icon="left" 
			:border="false"
			@clickLeft="goBack"
			@clickRight="publish"
		>
			<block slot="right">
				<button  :disabled="!(content || tempPaths.length)" >发表</button>
			</block>
		</uni-nav-bar>
		<textarea v-model="content" id="" cols="30" rows="10" mmaxlength="250" placeholder="这一刻的想法..."></textarea>
		<view class="imgs">
			<image 
				v-for="(item,index) in tempPaths" 
				:key="item" :src="item" 
				@click="previewImg(index)"
				mode="aspectFill"
				:class="index===1 || 4 || 7?'columnGap':''"
			></image> 
			<view v-show="tempPaths.length != 9" class="chooseButton" @click="chooseImg"><i class="iconfont icon-add1"></i></view>
		</view>
	</view>
</template>

<script>
import {uploadMoment} from "@/api"
import {filePath2base64} from "@/utils"
	
export default {
	name: "editMoment",
	data() {
		return {
			content:'',
			tempPaths:[],
			tempFiles:[],
			files:[],
		};
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		publish() {
			let promises = []
			this.tempFiles.forEach(file => {
				// #ifdef H5
				const promise = new Promise((resolve,reject) => {
					const reader = new FileReader();
					reader.onload = () => {
						resolve({file:reader.result,fileType:file.type.split("/")[1]})
					}
					reader.readAsDataURL(file); 
				})
				promises.push(promise)
				// #endif

				//#ifdef APP
				const promise = new Promise((resolve,reject) => {
					filePath2base64(file).then((res) => {
						resolve({file:res.base64,fileType:res.type})
					}, (err) => {
						reject(err.errMsg)
					})
				})
				promises.push(promise)
			
				// #endif
			})
			Promise.all(promises).then((values) => {
				this.files = values
				uploadMoment(this.files,this.content).then((moment)=>{
					console.log("返回的moment",moment)
					uni.$emit('updateMoments',moment)
				})
			});
			uni.navigateBack()
		},
		previewImg(index) {
			uni.previewImage({
				urls:this.tempPaths,
				current:index
			})
		},
		chooseImg() {
			uni.chooseImage({
				sizeType:['compressed'],
				count:this.tempPaths.length%9,
				success: (res) => {
					console.log(res)
					this.tempFiles.push(...res.tempFiles)
					this.tempPaths.push(...res.tempFilePaths)
				},
				fail: () => {
					console.log("接口调用失败")
				}
			})
		}
	},
	
};
</script>

<style lang="scss" scoped>
	.editMoment {
		padding-top: var(--status-bar-height);
	}
	
	button {
		line-height: 60rpx;
		height: 60rpx;
		width: 200rpx;
		background: #002DE3;
		border-radius: 10rpx;
		color: #FFFFFF;
	}
	
	textarea {
		height: 200rpx;
		margin: 40rpx auto;
		padding: 20rpx;
		background-color: #F7F7FC;
	}
	
	.imgs {
		display: flex;
		flex-wrap: wrap;
		// #ifdef H5
		column-gap: 3%;
		// #endif
		margin: 20rpx 80rpx;
		
		// #ifdef APP
		.columnGap {
			margin: 0 1.5% 3% 1.5%;
		}
		// #endif
		
		image {
			width: 30%;
			height: 150rpx;
			object-fit: cover;
			margin-bottom: 3%;
		} 
		
		.chooseButton {
			width: 30%;
			height: 150rpx;
			line-height: 150rpx;
			text-align: center;
			margin-bottom: 3%;
			background-color:  #F7F7FC;
		
			.iconfont {
				font-size: 100rpx;
				font-weight: 500;
			}
		}
	}
</style>
<template>
	<view class="toolsBox">
		
		<view class="tool" v-for="(item, index) in tools" :key="index">
			<button @tap="selectTool(index)"><image :src="item.src" mode=""></image></button>
			<text>{{ item.title }}</text>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
import {getVideoPoster, filePath2base64 , sendMsg,checkAndroidPermission} from '@/utils'
import permision from "@/js_sdk/wa-permission/permission.js"

// 访问原生插件
var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");

export default {
	name: 'toolsBox',
	props:['id','isGroup'],
	computed: {
		...mapState(['userInfo']),
		// 使用路径别名是不行的，路径别名需要在打包时被编译
		tools() {
			return [
				{
					src: '../../static/images/chatroom/image.png',
					title: '相册'
				},
				{
					src: '../../static/images/chatroom/camera.png',
					title: '拍摄'
				},
				{
					src: '../../static/images/chatroom/video.png',
					title: '视频通话'
				},
				{
					src: '../../static/images/chatroom/location.png',
					title: '位置'
				},
				{
					src: '../../static/images/chatroom/file.png',
					title: '文件'
				},
				{
					src: '../../static/images/chatroom/file.png',
					title: '清空聊天记录'
				},
			];
		}
	},
	data() {
		return {
		};
	},
	methods: {
		// file 转换base64，filePath 作为savefile参数
		sendFileMsg(file,fileType,type) {
			// #ifdef H5
				const reader = new FileReader();
				reader.readAsDataURL(file); 
				reader.onload = () => {
					sendMsg({
						msg_content : reader.result,
						msg_to : this.id,
						msg_type : type,
						fileType,
						isGroup:this.isGroup,
					})
				}
			// #endif
			
			// #ifdef APP-PLUS
			uni.saveFile({
				tempFilePath:file.path,
				success: (result) => {
					filePath2base64(file).then((res) => {
						sendMsg({
							msg_content : res.base64,
							msg_to : this.id,
							msg_type : type,
							fileType,
							localURL: result.savedFilePath,
							isGroup:this.isGroup,
						})
					}, (err) => {
						console.log("读写错误",err)
					})
				}
			})
			//  #endif
		},
		selectTool(index) {
			switch (index) {
				case 0:
					uni.chooseImage({
						count:5,
						sourceType:['album'],
						success: (res) => {
							console.log("图片选择",res)
							const {tempFiles} = res;
							tempFiles.forEach((file) => {
								this.sendFileMsg(file,'png',2)
							})
							
						},
						fail: (err) => {
							console.log("选取图片发生错误",err)
						}
					})
					break;
				
				case 1:
					uni.showActionSheet({
						title:'选择拍摄类型',
						itemList: ['拍照', '录像'],
						success: res => {
							// 获取视频封面
							// getVideoPoster(res.tempFilePath)
							if(res.tapIndex) {
								uni.chooseVideo({
									sourceType:['camera'],
									success: res => {
										console.log("拍摄",res)
										this.sendFileMsg({path:res.tempFilePath},'mp4',3)
									},
									fail: (err) => {
										console.log('发生错误',errMsg)
									}
								})
							} else {
								uni.chooseImage({
									sourceType:['camera'],
									success: res => {
										this.sendFileMsg(res.tempFiles[0],'png',2)
									},
									fail: (err) => {
										console.log("发生错误",errMsg)
									}
								})
							}
						},
						fail:  res=> {
							console.log(res.errMsg);
						}
					})
					break;
				case 2:
					uni.navigateTo({
						url: '/pages/livePush/index'
					});
					break;
				case 3:
					checkAndroidPermission("android.permission.ACCESS_FINE_LOCATION").then((res) => {
						// 判断是否授权
						if(!res) return
						 // 判断是否开启定位
						if(!permision.checkSystemEnableLocation()) {
							uni.showModal({
								title:"提示",
							    content: "应用不能获取你的位置，可能无法正常使用定位功能，可通过开启定位服务解决",
								cancelColor:"#ADB5BD",
								success: (res) => {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} 
						
						uni.chooseLocation({
							success: (res) => {
								const {name,address,latitude,longitude} = res
								sendMsg({
									msg_content: {
										name,
										address,
										latitude,
										longitude
									},
									msg_to: this.id, // 发出去，发别人的id
									msg_from: this.userInfo.uid, // 还需要附上自己的id
									msg_type: 6,
									dateTime: Date.now()
								})						
							},
							fail: function(err) {
								console.log("失败",err.errMsg)
							},
							
						});
					})

					
					break;
				case 4:
					uni.showActionSheet({
						title:'文件选择',
						itemList:['手机存储','手机相册'],
						success: ({tapIndex}) => {
							if(tapIndex) {
								AfDocument.openMode({
									size: '10', //选择总数量
				                    paths:['/storage/emulated/0/Pictures','/storage/emulated/0/DCIM'],   //自定义选择目录
				                    isDown:true,//是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
				                    types:[
									{
				                        name:'视频',
				                        value:["mp4"] 
				                    },{
				                        name:'音乐',
				                        value:['mp3','flac'] 
				                    },{
				                        name:'图片',
				                        value:['jpg','png','jpeg'] 
				                    }]
								},(res)=>{
									console.log("文件路径",JSON.stringify(res))
									res.res.forEach( file => {
										filePath2base64(file).then(res => {
											sendMsg({
												msg_content : res,
												msg_to : this.id,
												msg_type : 4,
												isGroup:this.isGroup,
											})
										})
										
									})
								})
							} else {
								AfDocument.openMode({
									size: '10', //选择总数量
									paths:['/storage/emulated/0/Download'],
									isDown:true,//是否下钻（true 筛选当前目录以下的所有文件，fales 只筛选当前目录文件） 
									types:[{
										name:'文档',
										value:["doc","wps","docx","xls","xlsx","pdf","pptx"]
									},{
										name:'视频',
										value:["mp4",'mkv','rmvb'] 
									},{
										name:'音乐',
										value:['mp3','flac'] 
									},{
										name:'图片',
										value:['jpg','png','jepg'] 
									}, {
										name: '压缩包',
										value:['zip','rar','7z']
									}]
								},(res)=>{
									this.data = JSON.stringify(res);
								})
							}
						}
					})
					break;
				case 5:
				
					if(this.isGroup) {
							console.log("清除ID",this.id)
						uni.removeStorageSync(`${this.userInfo.uid}groupmsgWith${this.id}`)
					} else {
						uni.removeStorageSync(`${this.userInfo.uid}msgWith${this.id}`)
					}
					
					break;
			}
		},
		
	}
};
</script>

<style lang="scss" scoped>
.toolsBox {
	display: grid;
	grid-template-columns: repeat(4, 25%);
	align-items: center;
	justify-content: center;
	row-gap: 40rpx;
	padding: 0 20rpx;
	padding-top: 30rpx;

	.tool {
		text-align: center;
		button {
			height: 110rpx;
			width: 110rpx;
			padding: 20rpx 20rpx;
			border-radius: 40rpx;
			margin-bottom: 10rpx;

			image {
				height: 72rpx;
				width: 72rpx;
				background-size: cover;
			}
		}

		text {
			white-space: nowrap;
			color: #708090;
		}
	}
}
</style>

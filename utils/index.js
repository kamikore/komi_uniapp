import store from "@/store"
import {socket} from "../main.js"
import permision from "@/js_sdk/wa-permission/permission.js"

/**
 * @param {Object} msg
 * @param {string} msg.msg_content - 消息内容，文本或是src
 * @param {number} msg.msg_to - 消息接收目标
 * @param {number} msg.msg_type - 消息类型
 * @param {boolean} msg.isGroup - 消息是否为群组消息      
 */
export function sendMsg(msg) {
	msg.dateTime = new Date();
	msg.msg_from = store.state.userInfo.uid;
	
	
	if(!msg.isGroup) {
		// 触发socket, 该消息格式会沿用到后续的监听器
		socket.emit('chatMsg', msg);
	
	} else {
		msg.group_id = msg.msg_to
		socket.emit('groupChatMsg', msg);
	}

	/* 
		自己发的信息触发更新首页聊天列表,以及聊天室列表，由于是自己发的需要处理 msg_to msg_from 关系，
		离线消息会是一个数组, 所以在sendBox消息统一作为数组处理
	*/
	msg.msg_from = msg.msg_to
	// 如果消息为文件类型，转换为本地永久路径,目前但针对APP
	// #ifdef APP-PLUS
	if(msg.msg_type === 1 || msg.msg_type === 2 || msg.msg_type === 3 || msg.msg_type === 4) {
		msg.msg_content = msg.localURL
	}
	// #endif

	
	uni.$emit('homeMsg', msg);
	
	uni.$emit('chatroomMsg', {
		...msg,
		self: 1
	});

	
}



/**
 * @param {Array} sessionList	会话消息列表
 * @param {Object} session		更新的会话消息，包括socket通信的消息以及主动置顶操作的消息
 * @param {Index} index   在数组中的索引
 */
export function stickyOnTop(sessionList,session,index) {
	// 获取记录置顶消息数量的值
	const count = store.state.count;

	if(sessionList[index].isTop) {
		//添加到置顶数组开头
		sessionList.unshift(session)
		// 移除原数组的值
		sessionList.splice(index+1,1)
	} else {
		// 添加到置顶元素之后，即count之后
		sessionList.splice(count,0,session);
		// 移除原数组的值
		sessionList.splice(index+1,1)
	}
	uni.setStorageSync(`uid${store.state.userInfo.uid}sessionList`, sessionList);
}




// 单例模式， 采用立即执行函数
export function createInnerAudioContext() {
	// 隐藏的Class的构造函数
	function InnerAudioContext() {
		return uni.createInnerAudioContext();
	}
	//保存在闭包环境，相当模拟了私有的方法和变量，只有返回的函数可调用
	// 未初始化的单例对象
	let innerAudioContext;

	return {
		// 创建/获取单例对象的函数
		getInstance: function() {
			if (!innerAudioContext) {
				innerAudioContext = new InnerAudioContext();
			}
			return innerAudioContext;
		}
	}
}

	


/**
 * @param {Object} start
 * @param {Object} end
 * @param {Object} rowHeight
 * @param {Object} backTop
 * @param {Object} scrollTop
 */
// 计算不透明度, 接受每行开始位置的top,结束位置的top,行的高度, 退格键的top ,以及滚动的距离
export function calculateOpacity(start, end, rowHeight,backTop, scrollTop,) {
	// 应该计算backspace 往下走不是row 往下走
	const backspaceTop = backTop + scrollTop;
	// 情况1 退格键在row下面
	if (end < backspaceTop) {
		return 1;
	}
	// 情况2 退格键在row内,挡住一半左右就要全透明, 另外一般是从尾部进入开始透明，所以是 end- backspaceTop
	else if (backspaceTop >= start && backspaceTop <= end) {
		return 1 - ((end - backspaceTop)  / (rowHeight/2))
	}
	// 情况3 退格键在row上面
	else {
		return 0;
	}
}

/**
 * 
 */
//  防抖
export function debounce(func,timeout = 100) {
    let timer;
	// 传递的参数
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    }
}


/**
 * @param {Object} second
 */
// 秒数转换为 00:00
export function SecondToTime(second) {
	let M = Math.floor(second/60);
	let S = second - (M*60);
	M = (M < 10)?"0"+M:M;
	S = (S < 10)?"0"+S:S;
	return M+":"+S
}

/**
 * @param {Object} date
 */
// Date 转换为日期 year-month-day 00:00
export function DateToDateTime(date) {
	const nowDate = new Date();
	const oneDay = 60*1000*60*24;
	
	// new Date() 的对象传递时，另一端变成了普通字符串
	date = new Date(date);
	const offset = nowDate - date;
	let H = date.getHours();
	let M = date.getMinutes();
	
	let result;
	
	const Time = `${(H < 10)?"0"+H:H}:${(M < 10)?"0"+M:M}`;
	const DateTime = `${date.getMonth()+1}月${date.getDate()} `;
	
	if(offset < oneDay) {
		result = Time; 
	}
	else if(offset < 2*oneDay && offset > oneDay) {
		result = `昨天 ${Time}`;
	}
	else if(offset > 2*oneDay && offset < 365*oneDay) {
		result = `${DateTime} ${Time}`
	}
	else {
		result = `${date.toLocaleString()} ${Time}`
	}
	

	return result;
	
 
}


export function getVideoPoster(filePath) {

}


export function stopWatch() {
    let startTime = new Date().getTime();
    let count = 0;
    let timer;
    function fixed() {
        count++;			// 真正的秒数计算
        var offset = new Date().getTime() - (startTime + count * 1000);
        var nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        timer = setTimeout(fixed, nextTime);
        console.log(count)
    }
	timer = setTimeout(fixed, 1000);
    return function() {
        clearTimeout(timer)
		return count
    }
}

/**
 * @param {Object} filePath - 文件路径
 */
export function filePath2base64(file) {
	const promise = new Promise((resolve,reject) => {
		plus.io.resolveLocalFileSystemURL(file.path,(entry)=>{
		 entry.file( fileData =>{  
				console.log("文件信息",fileData, file)
				const reader = new plus.io.FileReader();  
				// 以URL编码格式读取文件数据内容
				reader.readAsDataURL(fileData); 
				// 读取结束后回调
				reader.onloadend = function (e) {  
					resolve({fileName:fileData.name,type: fileData.type.split("/")[1],size: fileData.size, base64:e.target.result})
				};  
			})  
			
		},e => {
			console.log("读写错误",e)
			reject(e)
		})
	})
	return promise
}

/**
 * @param {String} url - 资源地址
 */
export function saveFile(url) {
	return new Promise((resolve,reject) => {
		// #ifdef H5
		uni.downloadFile({
			url,
			success: (res) => {
				if (res.statusCode === 200) {
					// const blob = new Blob(res.tempFilePath, {type : 'audio/mpeg'})
					// const url = URL.createObjectURL(blob);
					resolve(url)
				}
			}
		})
		// #endif
		
		// #ifdef APP-PLUS
		uni.downloadFile({
			url,
			success: ({tempFilePath}) => {
				uni.saveFile({
					tempFilePath,
					success: ({savedFilePath}) => {
						console.log("保存地址",savedFilePath)
						resolve(savedFilePath)
					}
				})
			}
		})
		// #endif
	})
}



/**
 * @param {String} permisionID - 权限对应值 https://ext.dcloud.net.cn/plugin?id=594
 */
export async function checkAndroidPermission(permisionID) {
    var result = await permision.requestAndroidPermission(permisionID)
    var strStatus
    if (result == 1) {
        strStatus = "已获得授权"
		return 1
    } else if (result == 0) {
        strStatus = "未获得授权"
    } else {
        strStatus = "被永久拒绝权限"
    }
    uni.showModal({
		title:"权限申请",
        content: "应用需要获取位置信息的权限",
		cancelColor:"#ADB5BD",
		confirmText:"前往设置",
		success: (res) => {
			if (res.confirm) {
				console.log('用户点击确定');
				permision.gotoAppPermissionSetting()
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
    });
	return 0
}

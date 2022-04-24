import vue from "vue"
import store from "@/store"

export function fetchContacts() {
	const userInfo =  uni.getStorageSync("userInfo");
	// 加载联系人，还待优化！！！
	let contacts = new Object();
	uni.request({
		url: "http://120.79.218.59:8080/komi/users/contacts",
		method:"GET",
		data: {uid: userInfo.uid},
		success: (res) => {
			// 重构数组，以fid为key作对象, res.fid 是关联表的整个对象,但也需要把remarkName取出
			res.data.forEach(item => {
				// this.contacts[item.fid.id] = item; 无法触发响应
				vue.set(contacts,item.fid.user_id,item)
			})
			// 缓存contacts 
			uni.setStorageSync('contacts',contacts)
		}
	})
}

export function fetchGroupChats() {
	const userInfo =  uni.getStorageSync("userInfo");
	let groupChats = new Object();
	uni.request({
		url: "http://120.79.218.59:8080/komi/group/groupChats",
		method:"GET",
		data: {uid: userInfo.uid},
		success: (res) => {
			res.data.forEach(item => {
				vue.set(groupChats,item.group_id.group_id,item.group_id)
			})
			uni.setStorageSync('groupChats',groupChats)
		},	
	})
}


/**
 * @param {Object} fid  
 * @param {String} nickName
 */
export function addContact(fid,nickName) {
	const userInfo = uni.getStorageSync("userInfo");
	uni.request({
		url: "http://120.79.218.59:8080/komi/users/addContact",
		method:"POST",
		// 提供添加人的ID, 以及自己的ID
		data: {
			fid,
			uid: userInfo.uid,
			// 接受好友，默认以nickName 为备注
			remarkName: nickName,
			username: userInfo.nickName,
		},
		success: res =>  {
			if(res.statusCode != 200) {
				console.log(res.data.errMsg)
			} else {
				console.log("添加成功")
			}
		}
	})
}



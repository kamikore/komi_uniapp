const path = require("path")
const IconfontBuilder = require('simple-iconfont-builder')

// 注意文件生成的命名，不能有空格
IconfontBuilder.build(path.resolve(__dirname,'../../','common','iconfont.css')).then(
(res)=>{
	console.log(res)
},
(err)=>{
	// 由于出现额外的 } ，导致css 审查不通过，无法写入文件，所以对库文件font做了修改
	console.log("发生错误",err)
	console.log(err.source)
})
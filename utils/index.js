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
						console.log("创建了实例");
					}
					return innerAudioContext;
				}
			}
		}

	



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


// 秒数转换为 00:00



// Date 转换为日期 year-month-day 00:00

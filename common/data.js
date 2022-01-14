export default {
	/*
		消息类型： 0：text , 1: audio, 2: image, 3: video, 4: file ,5: addFriends
		self: 0 别人， 1 自己
	*/
	message: function() {
		return [{
				id: 1,
				time: "19:00",
				msg: 'sdsdsd',
				type: 0,
				self: 0,
			},
			{
				id: 2,
				time: "20:00",
				type: 0,
				msg: 'qwrqwetweryery',
				self: 1,
			},
			{
				id: 3,
				time: "21:00",
				type: 0,
				msg: '236236236236',
				self: 0,
			},
			{
				id: 4,
				time: "22:00",
				type: 0,
				msg: '21489719582',
				self: 0,
			},
			{
				id: 5,
				time: "23:00",
				type: 0,
				msg: 'joiymoncxiobnxidf1234',
				self: 0,
			},
			{
				id: 6,
				time: "24:00",
				type: 0,
				msg: '12874h12othr01235n1oi50',
				self: 1,
			},
			{
				id: 7,
				time: "1:00",
				type: 0,
				msg: 'zxcvzxvxcvxcv aszfasf',
				self: 0,
			},
			{
				id: 8,
				time: "2:00",
				type: 1,
				msg: {
					src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					clock: 6
				},
				self: 1,
			},
			{
				id: 9,
				time: "2:00",
				type: 1,
				msg: {
					src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					clock: 36
				},
				self: 0,
			},
			{
				id: 10,
				time: "3:00",
				type: 2,
				msg: '../../static/images/test/1.jpg',
				self: 0,
			},
			{
				id: 11,
				time: "4:00",
				type: 2,
				msg: '../../static/images/test/2.jpg',
				self: 1,
			},
			{
				id: 12,
				time: "3:00",
				type: 3,
				self: 0,
			},
			{
				id: 13,
				time: "4:00",
				type: 3,
				self: 1,
			},
			{
				id: 14,
				time: "3:00",
				type: 4,
				self: 0,
			},
			{
				id: 15,
				time: "4:00",
				type: 4,
				self: 1,
			}
		]
	},
	emoji: function() {
		return [
			['😃', '😄', '😁', '😆', '😅', '😂', '😉', '😊'],
			['😇', '😍', '😘', '😚', '😋', '😜', '😝', '😐'],
			['😶', '😏', '😒', '😌', '😔', '😪', '😷', '😵'],
			['😎', '😲', '😳', '😨', '😰', '😥', '😢', '😭'],
			['😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤'],
			['😡', '😈', '😠']
		]
	}
}

var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/index","pages/livePlay/index","pages/livePush/index","pages/dropdownMenu/index","pages/contacts/index","pages/search/index","pages/groupChat/index","pages/userDetails/index","pages/addContacts/index","pages/newFriends/index","pages/livePush/index","pages/livePlay/index","pages/chatroom/index","pages/recording/index","pages/videoPlayer/index","pages/moments/index","pages/me/index","pages/groupChats/index","pages/chooseFile/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#f8f8f8","list":[{"pagePath":"pages/index/index","iconPath":"static/images/chat.png","selectedIconPath":"static/images/chat.png","text":"组件"},{"pagePath":"pages/contacts/index","iconPath":"static/images/future.png","selectedIconPath":"static/images/future.png","text":"联系人"},{"pagePath":"pages/moments/index","iconPath":"static/images/future.png","selectedIconPath":"static/images/future.png","text":"discover"},{"pagePath":"pages/me/index","iconPath":"static/images/future.png","selectedIconPath":"static/images/future.png","text":"我"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"first-app","compilerVersion":"3.3.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"default","titleNView":{"buttons":[{"fontSrc":"./static/iconfont.ttf","fontSize":"52rpx","text":"","width":"80rpx"},{"fontSrc":"./static/iconfont.ttf","fontSize":"52rpx","text":"","width":"80rpx"}]}}},{"path":"/pages/login/index","meta":{},"window":{"navigationStyle":"default","autoBackButton":"false"}},{"path":"/pages/livePlay/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/livePush/index","meta":{"isNVue":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/dropdownMenu/index","meta":{},"window":{"navigationStyle":"custom","backgroundColor":"transparent","animationType":"fade-in","animationDuration":100,"background":"transparent","webviewBGTransparent":true,"mask":"none,"}},{"path":"/pages/contacts/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"default","titleNView":{"buttons":[{"fontSrc":"./static/iconfont.ttf","fontSize":"52rpx","text":"","width":"62rpx"},{"fontSrc":"./static/iconfont.ttf","fontSize":"52rpx","text":"","width":"62rpx"}]}}},{"path":"/pages/search/index","meta":{},"window":{"navigationBarTitleText":"添加好友","navigationStyle":"default"}},{"path":"/pages/groupChat/index","meta":{},"window":{"navigationBarTitleText":"Group Chat","enablePullDownRefresh":false,"navigationStyle":"default"}},{"path":"/pages/userDetails/index","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"default"}},{"path":"/pages/addContacts/index","meta":{},"window":{"navigationBarTitleText":"add to contacts","navigationStyle":"default"}},{"path":"/pages/newFriends/index","meta":{},"window":{"navigationBarTitleText":"新的朋友","navigationStyle":"default","scrollIndicator":"none","titleNView":{"buttons":[{"text":"添加朋友","fontSize":"32rpx"}]}}},{"path":"/pages/chatroom/index","meta":{},"window":{"navigationBarTitleText":"","scrollIndicator":"none","titleNView":{"buttons":[{"type":"menu"}]}}},{"path":"/pages/recording/index","meta":{},"window":{"navigationStyle":"default"}},{"path":"/pages/videoPlayer/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/moments/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/me/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/groupChats/index","meta":{},"window":{"navigationBarTitleText":"群聊","navigationStyle":"default"}},{"path":"/pages/chooseFile/index","meta":{},"window":{"navigationBarTitleText":"文件选择","enablePullDownRefresh":false,"navigationStyle":"default"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
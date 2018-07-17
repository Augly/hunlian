//注册或登录
const getUid = '/api/portal/index/getUid',
  //主域名
  https = "http://love.w.bronet.cn",
  //活动支付结果
  returnPay='/api/portal/activity/returnPay',
  //基本资料类型查看
  registerBase = '/api/user/register/registerBase',
  //我的活动
  activityIndex = '/api/portal/activity/index',
  //活动页面详情
  activityDetails = '/api/portal/activity/activityDetails',
  //参加活动
  activityPay = '/api/portal/activity/activityPay',
  //约吧首页
  barIndex = '/api/portal/bar/index',
  //删除兴趣爱好
  myHobbyDel = '/api/user/user/myHobbyDel',
  //约吧详情
  barDetail = '/api/portal/bar/barDetails',
  //查看约吧地图
  barMap = '/api/portal/bar/map',
  //约吧最近活动
  activityNewest = '/api/portal/bar/activityNewest',
  //认证信息提交
  registerPost = '/api/user/register/registerPost',
  //注册协议
  registerRead = '/api/user/register/registerRead',
  //填写基本资料
  registerTwo = '/api/user/register/registerTwo',
  //首页滑一滑数据
  index = '/api/portal/index/index',
  //个人中心接口
  myCenter = '/api/user/user/myCenter',
  //存微信头像
  start = '/api/portal/index/start',
  //发送手机验证码
  sms = '/api/user/register/sms',
  //认证费用说明
  registerExplain = '/api/user/register/registerExplain',
  //认证描述页面
  registerDescription = '/api/user/register/registerDescription',
  //滑动接口
  select = '/api/portal/index/select',
  //生命密码解析
  analysis = '/api/user/user/analysis',
  //生命密码解析提交申请
  analysisPost = '/api/user/user/analysisPost',
  //教师服务经验提交
  teacherPost = '/api/user/user/teacherPost',
  //联系我们
  contactUs = '/api/user/user/contactUs',
  //报名过的历史活动
  activityList = '/api/user/user/activityList',
  //我的认证
  myCheck = '/api/user/user/myCheck',
  //已读消息
  mailBoxOld = '/api/portal/letter/mailBoxOld',
  //未读消息
  mailBoxNew = '/api/portal/letter/mailBoxNew',
  //点击我知道了
  registerKnow = '/api/user/register/registerKnow',
  //我的兴趣爱好
  myHobby = '/api/user/user/myHobby',
  //兴趣爱好提交
  myHobbyAdd = '/api/user/user/myHobbyAdd',
  //上传图片
  imgUpdate = '/portal/Upload/uploadToQiniu',
  //我的信箱系统信息列表
  msgList = '/api/portal/letter/msgList',
  //我的信箱
  letterLog = '/api/portal/letter/letterLog',
  //回复消息
  letterReply = '/api/portal/letter/letterReply',
  //详情页基本资料
  MemberBase = '/api/portal/index/MemberBase',
  //我的基本心信息
  userInfo = '/api/user/user/userInfo',
  //我的择偶标准
  myLove = '/api/user/user/myLove',
  //我的基本消息提交处理
  userPost = '/api/user/user/userPost',
  //兴趣爱好
  hobby = '/api/portal/index/hobby',
  //我的择偶资料处理
  myLovePost = '/api/user/user/myLovePost',
  //详情页
  MemberDetail = '/api/portal/index/MemberDetail',
  //查看套餐
  chat = '/api/user/register/chat',
  //购买畅聊套餐
  payChat = '/api/user/register/payChat',
  //删除消息
  infoDel='/api/portal/letter/infoDel',
  //判断是否能写信
  letter='/api/portal/letter/letter',
  //验证码验证
  registerOne = '/api/user/register/registerOne'
/**
 * 封装本地存储
 */
function setStorage(key, value, successData) {
  wx.setStorage({
    key: key,
    data: value,
    success: function (res) {
      successData(res)
    }
  })
}
function rem(height, successData){
  wx.getSystemInfo({
    success:(res)=>{
      if(height!=null&&height!=undefined&&height!=''){
        var myheight =res.windowHeight-res.windowWidth/750*height
      }else{
        var myheight = res.windowHeight
      }
      successData(myheight)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}
function chooseLocation() {
  wx.openLocation({
    latitude: '',
    longitude: '',
    scale: '',
    name: '',
    address: '',
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}
/**
 * 选择图片
 */
function chooseImage(successData) {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      // var tempFilePaths = res.tempFilePaths
      successData(res)
    }
  })
}
/**
 * 封装获取uid
 */
function getuid(successData, errorData) {
  // 获取用户信息
  wx.login({
    success: (res) => {
      ajax('POST', {
        code: res.code
      }, getUid, (res) => {
        successData(res)
      }, (res) => {
        errorData(res)
      })
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}
/**
 * 封装自定义优美的toast
 */
function mytoast(main, successData) {
  wx.showToast({
    title: main,
    icon: 'none',
    mask: true,
    success: function (res) {
      setTimeout((res) => {
        successData(res)
      }, 1500)
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}
/**
 * 读取本地存储
 */
function getStorage(key, successData, faildata) {
  wx.getStorage({
    key: key,
    success: function (res) {
      successData(res)
    },
    fail: function (res) {
      faildata(res)
    }
  })
}
/**
 * 获取自定义data变量
 */
function getData(e, name) {
  return e.currentTarget.dataset[name]
}
/**
 * 自定义封装支付函数
 */
function pay(res, successData,errorData) {
  console.log(res.data.data)
  wx.requestPayment({
    "timeStamp": res.data.data.timeStamp,
    "nonceStr": res.data.data.nonceStr,
    "package": res.data.data.package,
    "signType": "MD5",
    "paySign": res.data.data.paySign,
    "success": function (res) {
      wx.showToast({
        title: '支付完成',
        icon: "success",
        duration: 1500,
        success: function (data) {
          successData(data)
        }
      })
    },
    "fail": function (res) {
      if (errorData){
        errorData(res)
      }
      wx.showToast({
        title: '取消支付成功！',
        icon: "success",
        duration: 1500,
      })
    }
  })
}
/**
 * 自定义request请求基类
 */
function ajax(Type, params, url, successData, errorData, completeData) {
  var methonType = "application/json";
  //访问的主域名
  var https = "http://love.w.bronet.cn"
  if (Type === 'PUT') {
    var p = Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
    url += '?' + p;
    params = {}
  }
  if (Type == "POST") {
    methonType = "application/x-www-form-urlencoded"
  }
  wx.request({
    url: https + url,
    method: Type,
    header: {
      'content-type': methonType,
    },
    data: params,
    success: (res) => {
      successData(res)
    },
    error(res) {
      if (errorData) {
        errorData(res)
      }
    },
    complete(res) {
      if (completeData) {
        completeData(res)
      }
    }
  })
};

//导出模块
module.exports = {
  myHobby: myHobby,
  ajax: ajax,
  getUid: getUid,
  getuid: getuid,
  mytoast: mytoast,
  index: index,
  select: select,
  getData: getData,
  myCenter: myCenter,
  start: start,
  sms: sms,
  registerOne: registerOne,
  registerRead: registerRead,
  registerTwo: registerTwo,
  chooseImage: chooseImage,
  registerBase: registerBase,
  registerDescription: registerDescription,
  registerExplain: registerExplain,
  registerPost: registerPost,
  pay: pay,
  analysis: analysis,
  analysisPost: analysisPost,
  activityIndex: activityIndex,
  activityDetails: activityDetails,
  activityPay: activityPay,
  barIndex: barIndex,
  barDetail: barDetail,
  barMap: barMap,
  chooseLocation: chooseLocation,
  activityNewest: activityNewest,
  teacherPost: teacherPost,
  contactUs: contactUs,
  activityList: activityList,
  myCheck: myCheck,
  mailBoxOld: mailBoxOld,
  mailBoxNew: mailBoxNew,
  registerKnow: registerKnow,
  myHobbyAdd: myHobbyAdd,
  imgUpdate: imgUpdate,
  https: https,
  msgList: msgList,
  letterLog: letterLog,
  letterReply: letterReply,
  MemberBase: MemberBase,
  userInfo: userInfo,
  myLove: myLove,
  myHobbyDel: myHobbyDel,
  userPost: userPost,
  myLovePost: myLovePost,
  MemberDetail: MemberDetail,
  hobby: hobby,
  chat: chat,
  payChat: payChat,
  rem: rem,
  infoDel: infoDel,
  letter: letter,
  returnPay: returnPay
} 
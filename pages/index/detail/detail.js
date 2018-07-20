// pages/index/detail/detail.js
const config=require('../../../utils/config.js')
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Mwrap:false,
    showwrap:false
  },
  /**
   * hideMask
   */
  hideMask() {
    this.setData({
      Mwrap: false
    })
  },
  hideshowwrap(){
    this.setData({
      showwrap: false
    })
  },
  allow() {
    this.setData({
      Mwrap: true
    })
  },
  //对象转数组
  toArr(obj) {
    let newarr = []
    let result = Object.keys(obj).map((el) => {
      newarr.push(obj[el]);
    });
    // console.log(newarr)
    // for (var i in newarr) {
    //   if (newarr[i].name == null || newarr[i].name == undefined) {
    //     newarr[i].name = '#'
    //   }
    // }
    return newarr
  },
  /**
   * 获取套餐
   */
  showMwrap(){
    this.setData({
      showwrap:false,
      Mwrap:true
    })
    this.getchat()

  },
  getchat() {
    config.ajax('POST', {
      uid: app.globalData.uid
    }, config.chat, (res) => {
      console.log(res)
      for (var i = 0; i < res.data.data.date.length; i++) {
        res.data.data.date[i].check = false
      }
      res.data.data.date[0].check = true
      this.setData({
        alldatatwo: res.data.data.date,
        payId: res.data.data.date[0].id,
      })
    }, (res) => {

    })
  },
  /**
   * 选择付款
   */
  select(e) {
    var alldata = this.data.alldatatwo
    for (var i = 0; i < alldata.length; i++) {
      if (i == config.getData(e, 'index')) {
        alldata[i].check = true
      } else {
        alldata[i].check = false
      }
    }
    console.log(config.getData(e, 'id'))
    this.setData({
      payId: config.getData(e, 'id'),
      alldatatwo: alldata
    })
  },
  /**
   * 付款
   */
  pay() {
    config.ajax('POST', {
      uid: app.globalData.uid,
      id: this.data.payId
    }, config.payChat, (res) => {
      config.pay(res, (res) => {
        this.setData({
          Mwrap: false
        })
        config.getuid((res) => {
          if (res.data.data.code == '20000') {
            app.globalData.uid = res.data.data.uid
            this.getInfo(res)
          } else {
            config.mytoast('服务器错误,请稍后再试', (res) => { })
          }
        }, (res) => { })
      })
    }, (res) => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      formId: options.userId
    })
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        config.ajax('POST', {
          uid: app.globalData.uid,
          relation_id: options.userId,
          _type: options.type,
          status: options.status
        }, config.MemberDetail, (res) => {
          console.log(res)
          this.setData({
            alldata: res.data.data
          })
        }, (res) => {

        })
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
  //写邮件给Ta
  toemail(){
    var that=this
    config.ajax('POST',{
      uid: app.globalData.uid,
      to_id:this.data.formId
    }, config.letter,(res)=>{
      this.setData({
        alldataone:res.data.data
      })
      if(res.data.data.code=='40000'){
        config.mytoast(res.data.data.msg,(res)=>{

        })
      } else if (res.data.data.code == '20000'){
        wx.navigateTo({
          url: '/pages/messages/mail/mail?formId=' + that.data.formId,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else if(res.data.data.code=='40011'){
        this.setData({
          showwrap:true,
          msg: res.data.data.msg,
        })
      } else if (res.data.data.code == '40012') {
        this.setData({
          showwrap: true,
          msg: res.data.data.msg
        })
      } else if (res.data.data.code == '40014') {
        this.setData({
          showwrap: true,
          msg: res.data.data.msg
        })
      } else if (res.data.data.code == '40010') {
        this.setData({
          msg: res.data.data.msg
        })
        config.mytoast(msg,(res)=>{

        })
      }
    },(res)=>{

    })

  },
  //基本资料
  jbzl(){
    wx.navigateTo({
      url: '/pages/index/basicInformation2/basicInformation2?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //择偶标准
  zobz(){
    wx.navigateTo({
      url: '/pages/index/chooseStandard/chooseStandard?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //兴趣爱好
  xqah(){
    wx.navigateTo({
      url: '/pages/index/hobbies/hobbies?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.globalData.shareInfo
  }
})
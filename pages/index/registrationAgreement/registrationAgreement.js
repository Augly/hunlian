// pages/index/registrationAgreement.js
let app = getApp()
const config = require('../../../utils/config.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        this.getData()
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
  /**
   * 获取协议
   */
  getData() {
    config.ajax('POST', {
      uid: app.globalData.uid
    }, config.registerRead, (res) => {
      WxParse.wxParse('article', 'html', res.data.data.content, this, 0);
    }, (res) => {

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

  },
  /**
   * 跳到登录注册页
   */
  tologin: function () {
    config.ajax('POST', {
      uid: app.globalData.uid
    }, config.registerKnow, (res) => {

    }, (res) => {

    })
    wx.navigateTo({
      url: '../loginRegister/loginRegister',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
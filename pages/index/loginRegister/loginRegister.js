// pages/index/loginRegister.js
const config = require('../../../utils/config.js');
let app = getApp()
let interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 60,
    disabled: true,
    mobile:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 验证手机号
   */
  getmobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  getCode: function () {
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (reg.test(this.data.mobile) == true) {
      var that = this;
      var currentTime = that.data.currentTime
      
      this.sendCode((res) => {
        if (res.data.data.code == '20000') {
          console.log(res.data.data.qiu)
          this.setData({
            oldCode:res.data.data.qiu
          })
          that.setData({
            time: currentTime + '秒',
            disabled: false
          })
          interval = setInterval(function () {
            currentTime--;
            that.setData({
              time: currentTime + '秒',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新发送',
                currentTime: 61,
                disabled: true
              })
            }
          }, 1000)
        } else {
          config.mytoast(res.data.data.msg, (res) => { })
        }

      }, (res) => {

      })
    } else {
      config.mytoast('手机号格式不正确', (res) => {

      })
    }
  },
  /**
   * 发送验证码
   */
  sendCode(sussessData, errorData) {
    config.ajax('POST', {
      mobile: this.data.mobile
    }, config.sms, (res) => {
      sussessData(res)
    }, (res) => {
      errorData(res)
    })
  },
  /**
   * 输入验证码
   */
  mycode(e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 验证码验证
   */
  registerOne() {
    console.log(this.data.mobile)
    console.log(this.data.code)
    if (this.data.mobile == '') {
      config.mytoast('手机号不能为空', (res) => { })
      return false
    }
    if (this.data.code!=this.data.oldCode) {
      config.mytoast('验证码不正确', (res) => { })
      return false
    }
    config.ajax('POST', {
      mobile: this.data.mobile,
      sms_code: this.data.code,
      uid: app.globalData.uid
    }, config.registerOne, (res) => {
      console.log(res)
      wx.navigateTo({
        url: '../basicInformation/basicInformation',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }, (res) => {

    })
  },
  /**
   * torule
   */
  torule: function () {
    wx.navigateTo({
      url: '/pages/index/registrationAgreement/registrationAgreement',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  },
  /**
   * next
   */
  next: function () {
    // if (this.data.mobile!= '' && this.data.mobile!=''){

    // }
    this.registerOne()
    // wx.navigateTo({
    //   url: '../basicInformation/basicInformation',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  }
})
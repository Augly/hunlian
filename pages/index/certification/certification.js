// pages/index/certification.js
const config=require('../../../utils/config.js');
let app=getApp()
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
        this.getData(res)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
   
  },
  /**
   * 获取页面数据
   */
  getData(res){
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.registerDescription, (res) => {
      console.log(res)
      this.setData({
        alldata:res
      })
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
   * 规则
   */
  torule: function () {
    wx.navigateTo({
      url: '/pages/index/Pay_certification/Pay_certification',
    })
  },
  /**
   * 马上认证
   */
  rightNow: function () {
    wx.navigateTo({
      url: '/pages/index/certificationInformation/certificationInformation',
    })
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

  }
})
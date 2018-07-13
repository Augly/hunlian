// pages/messages/messages.js
const config = require('../../utils/config.js');
let app = getApp()
var tw = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myindex: '1',
    wrapConet:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  getdata(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.mailBoxOld, (res) => {
      if (res.data.data.code == '20000') {
        var allNum=0;
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].myleft = 0,
          allNum += res.data.data.list[i].num
        }
        this.setData({
          alldata: res.data.data,
          list: res.data.data.list,
          allNum:allNum
        })
      } else if (res.data.data.code == '40001') {
        this.setData({
          noCode: true,
          step: res.data.data.step
        })
      }
      wx.hideLoading()
      this.setData({
        wrapConet:true
      })

    }, (res) => {

    })
  },
  getotherdata(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.mailBoxNew, (res) => {
      
      if (res.data.data.code == '20000') {
        var otherNum = 0;
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].myleft = 0,
          otherNum += res.data.data.list[i].num
        }
        otherNum = otherNum + res.data.data.message_num
        this.setData({
          otheralldata: res.data.data,
          otherlist: res.data.data.list,
          otherNum: otherNum
        })
      } else if (res.data.data.code == '40001') {
        this.setData({
          noCode: true,
          step: res.data.data.step
        })
      }
    }, (res) => {

    })
  },
  scroll(e) {

  },
  select(e) {
    this.setData({
      myindex: config.getData(e, 'id')
    })
  },
  /**
   * 获取高度
   */
  rem(height, successData) {
    wx.getSystemInfo({
      success: (res) => {
        successData(res)
      },
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
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        this.getdata(res)
        this.getotherdata(res)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
  tomail(e) {
    wx.navigateTo({
      url: "/pages/messages/massage/massage?status=1",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomailtwo(e) {
    wx.navigateTo({
      url: "/pages/messages/massage/massage?status=0",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomailRes(e) {
    wx.navigateTo({
      url: "/pages/messages/mail/mail?status=1&formId=" + config.getData(e, 'formid') + '&id=' + config.getData(e, 'id'),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomailRestwo(e) {
    wx.navigateTo({
      url: "/pages/messages/mail/mail?status=0&formId=" + config.getData(e, 'formid') + '&id=' + config.getData(e, 'id'),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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

  }
})
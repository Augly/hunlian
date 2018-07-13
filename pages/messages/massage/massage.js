// pages/massage/massage.js
const config = require('../../../utils/config.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        this.getInfo(res, options)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => {})
      }
    }, (res) => {})
  },
  /**
   * 获取基本信息类型
   */
  getInfo(res, options) {
    config.ajax('POST', {
      uid: res.data.data.uid,
      status: options.status
    }, config.msgList, (res) => {
      console.log(res)
      if (res.data.data.code == '40005') {

      } else {
        this.setData({
          List: res.data.data.list
        })
      }

    }, (res) => {

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
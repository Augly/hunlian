// pages/date_details_q/date_details_q.js
const config = require('../../../utils/config.js')
let app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    if (options.id == null || options.id == undefined) {
      config.mytoast('未知进入途径')
    } else {
      this.setData({
        id: options.id
      })
      config.getuid((res) => {
        if (res.data.data.code == '20000') {
          app.globalData.uid = res.data.data.uid

          this.getdetail(res, options)
        } else {
          config.mytoast('服务器错误,请稍后再试', (res) => { })
        }
      }, (res) => { })
    }
  },
  /**
 * 获取详情参数
 */
  getdetail(res, options) {
    config.ajax('POST', {
      uid: res.data.data.uid,
      bar_id: options.id
    }, config.barDetail, (res) => {
      console.log(res)
      this.setData({
        alldata: res.data.data
      })
      WxParse.wxParse('article', 'html', res.data.data.content, this, 0);
      wx.hideLoading()
      this.setData({
        wrapConet:true
      })
    }, (res) => {

    })
  },
  /**
   * 查看地图
   * 
   */
  toMap(e) {
    wx.openLocation({
      latitude: parseFloat(this.data.alldata.lat),
      longitude: parseFloat(this.data.alldata.lng),
      scale: 28,
      address: this.data.alldata.address,
      name: this.data.alldata.city
    })
  },
  near_page: function (e) {
    wx.navigateTo({
      url: '/pages/Appointment/near_acitve_q/near_acitve_q?id='+this.data.id,
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

  }
})
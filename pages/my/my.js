// pages/my.js
const config=require('../../utils/config.js');
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrapConet:false,
    Mwrap:true
  },
  gobacisinfo: function () {
    wx.navigateTo({
      url: 'bacisinfo/bacisinfo',
    })
  },
  goinfocode: function () {
    wx.navigateTo({
      url: 'infocode/infocode',
    })
  },
  /**
   * hideMask
   */
  hideMask(){
    this.setData({
      Mwrap:false
    })
  },
  goteacher: function () {
    wx.navigateTo({
      url: 'teacher/teacher',
    })
  },
  gocontactme: function () {
    wx.navigateTo({
      url: 'contactme/contactme',
    })
  },
  goalready_activity: function () {
    wx.navigateTo({
      url: 'already_activity/already_activity',
    })
  },
  gorenzheng: function () {
    wx.navigateTo({
      url: 'renzheng/renzheng',
    })
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
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        this.getInfo(res)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
  /**
   * 获取个人中心数据
   */
  getInfo(res){
    config.ajax('POST',{
      uid: res.data.data.uid
    }, config.myCenter,(res)=>{
      console.log(res)
      if(res.data.data.code=='20000'){
        this.setData({
          info:res.data.data
        })
      } else if (res.data.data.code == '40001') {
        this.setData({
          noCode: true,
          step: res.data.data.step
        })
      } else{
        config.mytoast('发生未知错误,请稍后再试',(res)=>{})
      }
      this.setData({
        wrapConet: true
      })
      wx.hideLoading()
    },(res)=>{
      
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
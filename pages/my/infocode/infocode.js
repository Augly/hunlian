// pages/infocode/inficode.js
const WxParse=require('../../../utils/wxParse/wxParse.js');
let app=getApp()
const config=require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:false,
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
   * 获取所有数据
   */
  getData(res){
    config.ajax('POST',{
      uid:res.data.data.uid
    }, config.analysis,(res)=>{
      console.log(res)
      WxParse.wxParse('article', 'html', res.data.data.content, this, 0);
      this.setData({
        wrapConet:true
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
  know(){
    config.ajax('POST', {
      uid: app.globalData.uid
    }, config.analysisPost, (res) => {
      console.log(res)
      this.setData({
        note:res.data.data.msg
      })
    }, (res) => {

    })
  },
  hidenote(){
    this.setData({
      note:false
    })
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
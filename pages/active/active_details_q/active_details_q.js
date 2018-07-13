// pages/active_details_q/active_details_q.js
const config=require('../../../utils/config.js')
let app=getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView:false,
    mask:false,
    wrapConet:false
  },
  hideMask(){
    console.log(1)
    this.setData({
      mask:false
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
    console.log(options.id)
    if (options.id == null || options.id==undefined){
      config.mytoast('未知进入途径')
    }else{
      this.setData({
        id:options.id
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
  getdetail(res, options){
    config.ajax('POST', {
      uid: res.data.data.uid,
      activity_id: options.id
    }, config.activityDetails, (res) => {
        this.setData({
          alldata:res.data.data
        })
        WxParse.wxParse('article', 'html', res.data.data.content, this, 0);
        wx.hideLoading()
        this.setData({
          wrapConet: true
        })
    }, (res) => {

    })
  },
  pay(){
    config.ajax('POST',{
      uid: app.globalData.uid,
      activity_id:this.data.id,
      amount: this.data.alldata.amount
    }, config.activityPay,(res)=>{
      // config.pay(res,(res)=>{

      // })
    },(res)=>{

    })
  },
  show_mask:function(e){
    var that = this;

    // this.pay()
    that.setData({
      mask:true
    })
  },
  hide_mask:function(e){
    var that = this;
    that.setData({
      showView: false,
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
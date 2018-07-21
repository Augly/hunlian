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
  getNumdata(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.mailBoxNew, (res) => {
      if (res.data.data.code == '20000') {
        var otherNum = 0;
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].myleft = 0,
            otherNum += parseInt(res.data.data.list[i].num)
        }
        otherNum = parseInt(otherNum) + parseInt(res.data.data.message_num)
      } else {
        var otherNum = 0;
        otherNum = res.data.data.message_num
      }
      if (otherNum > 0) {
        wx.showTabBarRedDot({
          index: 3,
          success: function (res) {
            wx.setTabBarBadge({
              index: 3,
              text: otherNum.toString(),
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        wx.hideTabBarRedDot({
          index: 3,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }, (res) => {

    })
  },
  getdata(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.mailBoxOld, (res) => {
      console.log(res)
      if (res.data.data.code == '20000') {
        var allNum=0;
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].myleft = 0,
          allNum += parseInt(res.data.data.list[i].num)
        }
        allNum = parseInt(allNum) + parseInt(res.data.data.message_num)
        this.setData({
          alldata: res.data.data,
          list: res.data.data.list,
          allNum:allNum,
          noCode: false,
        })
      } else if (res.data.data.code == '40001') {
        this.setData({
          noCode: true,
          step: res.data.data.step
        })
      } else {
        var allNum = 0;
        allNum = parseInt(res.data.data.message_num)
        this.setData({
          alldata: res.data.data,
          allNum: allNum,
          noCode: false,
        })
      }
      wx.hideLoading()
      this.setData({
        wrapConet:true
      })

    }, (res) => {

    })
  },
  del(e){
    var all = this.data.list

    config.ajax('POST',{
      uid: app.globalData.uid,
      type:'letter',
      id:all[config.getData(e,'index')].from_id
    }, config.infoDel,(res)=>{
      console.log(res)
      if(res.data.data.code=='20000'){
        console.log(config.getData(e, 'index'))
        all.splice(config.getData(e, 'index'),1)
        console.log(all)
        this.setData({
          list:all
        })
      }else{
        config.mytoast('删除失败',(res)=>{

        })
      }
    })
  },
  delone(e) {
    var all = this.data.otherlist

    config.ajax('POST', {
      uid: app.globalData.uid,
      type: 'letter',
      id: all[config.getData(e, 'index')].from_id
    }, config.infoDel, (res) => {
      console.log(res)
      if (res.data.data.code == '20000') {
        all.splice(config.getData(e, 'index'), 1)
        this.setData({
          otherlist: all
        })
      } else {
        config.mytoast('删除失败', (res) => {

        })
      }
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
          otherNum += parseInt(res.data.data.list[i].num)
        }
        otherNum = parseInt(otherNum) +  parseInt(res.data.data.message_num) 

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
      } else if (res.data.data.code == '40005'){
        this.setData({
          noCode: false,
        })
      }else{
        var otherNum = 0;
        otherNum =res.data.data.message_num
        this.setData({
          otheralldata: res.data.data,
          otherNum: otherNum,
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
        this.setData({
          delect_time: res.data.data.delete_time
        })
        if (res.data.data.delete_time != 0) {
          config.mytoast('您已被拉黑', (res) => {

          })
        }
        this.getdata(res)
        this.getotherdata(res)
        this.getNumdata(res)
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
    return app.globalData.shareInfo
  }
})
// pages/my.js
const config = require('../../utils/config.js');
let app = getApp()
let check = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrapConet: false,
    Mwrap: false
  },

  allow() {
    this.setData({
      Mwrap: true
    })
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
  hideMask() {
    this.setData({
      Mwrap: false
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
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 获取个人中心数据
   */
  getInfo(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.myCenter, (res) => {
      console.log(res)
      if (res.data.data.code == '20000') {
        this.setData({
          info: res.data.data,
          noCode:false,
        })
      } else if (res.data.data.code == '40001') {
        this.setData({
          noCode: true,
          step: res.data.data.step
        })
      } else {
        config.mytoast('发生未知错误,请稍后再试', (res) => { })
      }
      this.setData({
        wrapConet: true
      })
      wx.hideLoading()
    }, (res) => {

    })
  },
  //对象转数组
  toArr(obj) {
    let newarr = []
    let result = Object.keys(obj).map((el) => {
      newarr.push(obj[el]);
    });
    // console.log(newarr)
    // for (var i in newarr) {
    //   if (newarr[i].name == null || newarr[i].name == undefined) {
    //     newarr[i].name = '#'
    //   }
    // }
    return newarr
  },
  /**
   * 获取套餐
   */
  getchat() {
    config.ajax('POST', {
      uid: app.globalData.uid
    }, config.chat, (res) => {
      console.log(res)
      for (var i = 0; i < res.data.data.date.length; i++) {
        res.data.data.date[i].check = false
      }
      res.data.data.date[0].check = true
      this.setData({
        alldata: res.data.data.date,
        payId: res.data.data.date[0].id,
      })
    }, (res) => {

    })
  },
  /**
   * 选择付款
   */
  select(e) {
    var alldata = this.data.alldata
    for (var i = 0; i < alldata.length; i++) {
      if (i == config.getData(e, 'index')) {
        alldata[i].check = true
      } else {
        alldata[i].check = false
      }
    }
    console.log(config.getData(e, 'id'))
    this.setData({
      payId: config.getData(e, 'id'),
      alldata: alldata
    })
  },
  /**
   * 付款
   */
  pay() {
    if(check){
        check=false
    config.ajax('POST', {
      uid: app.globalData.uid,
      id: this.data.payId
    }, config.payChat, (res) => {
      config.pay(res, (res) => {
          this.setData({
            Mwrap:false
          })
          config.getuid((res) => {
            if (res.data.data.code == '20000') {
              app.globalData.uid = res.data.data.uid
              this.getInfo(res)
            } else {
              config.mytoast('服务器错误,请稍后再试', (res) => { })
            }
          }, (res) => { })
          check = true
      })
    }, (res) => {
      check = true
    })
  }
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
        this.getInfo(res)
        this.getchat()
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
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
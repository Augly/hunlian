// pages/mail/mail.js
const config = require('../../../utils/config.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    showSucc: false,
    list:[],
    stop:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.rem(182,(res)=>{
      this.setData({
        myheight:res
      })
    })
    this.setData({
      formid: options.formId,
      options: options
    })
  },
  getallData(res, options) {
    config.ajax('POST', {
      uid: res.data.data.uid,
      from_id: options.formId,
      status: options.status
    }, config.letterLog, (res) => {
      console.log(res.data.data.list)
      if(res.data.data.code=='20000'){
        console.log(res.data.data.list.length - 1)
        console.log(this.data.stop)
        this.setData({
          list: res.data.data.list,
          stop: res.data.data.list.length - 1
        })
        console.log(this.data.stop)
      }
    }, (res) => {

    })
  },
  mask: function (e) {
    var that = this;
    that.setData({
      showView: !that.data.showView
    });
  },
  success_mask: function (e) {
    var that = this;
    if (this.data.myipt != '') {
      config.ajax('POST', {
        uid: app.globalData.uid,
        to_id: this.data.formid,
        content: this.data.myipt
      }, config.letterReply, (res) => { 
        if (res.data.data.code == '20000') {
          var st = this.data.list
          st.push(res.data.data.list)
          this.setData({
            list:st,
            stop:st.length-1
          })
        }
      }, (res) => {

      })
    }
    that.setData({
      showView: !that.data.showView
    });
    that.setData({
      showSucc: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  myipt(e) {
    this.setData({
      myipt: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.options != undefined || this.data.options != null || this.data.options !=''){
      config.getuid((res) => {
        if (res.data.data.code == '20000') {
          app.globalData.uid = res.data.data.uid
          this.getallData(res, this.data.options)
        } else {
          config.mytoast('服务器错误,请稍后再试', (res) => { })
        }
      }, (res) => { })
    }
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
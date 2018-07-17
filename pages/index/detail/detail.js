// pages/index/detail/detail.js
const config=require('../../../utils/config.js')
let app=getApp()
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
    console.log(options)
    this.setData({
      formId: options.userId
    })
    config.ajax('POST',{
      uid: app.globalData.uid,
      relation_id: options.userId,
      _type: options.type,
      status: options.status
    }, config.MemberDetail,(res)=>{
      console.log(res)
      this.setData({
        alldata:res.data.data
      })
    },(res)=>{

    })
  },
  //写邮件给Ta
  toemail(){
    var that=this
    config.ajax('POST',{
      uid: app.globalData.uid,
      to_id:this.data.formId
    }, config.letter,(res)=>{
      console.log(res)
      if(res.data.data.code=='40000'){
        config.mytoast(res.data.data.msg,(res)=>{

        })
      } else if (res.data.data.code == '20000'){
        wx.navigateTo({
          url: '/pages/messages/mail/mail?formId=' + that.data.formId,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    },(res)=>{

    })

  },
  //基本资料
  jbzl(){
    wx.navigateTo({
      url: '/pages/index/basicInformation2/basicInformation2?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //择偶标准
  zobz(){
    wx.navigateTo({
      url: '/pages/index/chooseStandard/chooseStandard?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //兴趣爱好
  xqah(){
    wx.navigateTo({
      url: '/pages/index/hobbies/hobbies?userId=' + this.data.formId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
// pages/teacher/teacher.js
const config=require('../../../utils/config.js');
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

  },
  /**
   *输入更多
   */
  teacherPost(e){
    this.setData({
      teacherPost:e.detail.value
    })
  },
  /**
   * 提交经验
   */
  sure(){
    config.getuid((res) => {
      if (res.data.data.code == '20000') {
        app.globalData.uid = res.data.data.uid
        this.getsumbit(res)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
  getsumbit(res){
    if (this.data.teacherPost == '' || this.data.teacherPost == undefined || this.data.teacherPost==null){
      config.mytoast('内容不能为空!',(res)=>{

      })
    }else{
      config.ajax('POST', {
        uid: res.data.data.uid,
        experience: this.data.teacherPost
      }, config.teacherPost,(res)=>{
        console.log(res)
        if(res.data.data.code=='20000'){
          config.mytoast(res.data.data.msg,(res)=>{
            wx.navigateBack({
              delta: 1,
            })
          })
        }
      },(res)=>{

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
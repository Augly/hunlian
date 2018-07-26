// pages/index/certificationInformation/certificationInformation.js
const config = require('../../../utils/config.js');
let app = getApp()
var check=true
const WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zimg: '',
    bimg: '',
    _type:''
  },
  /**
   * 输入姓名
   */
  nickName(e) {
    this.setData({
      nickName: e.detail.value
    })
  },
  /**
   * 输入身份证号
   */
  idCard(e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  uploadZ() {
    config.chooseImage((res) => {
      this.setData({
        zimg: res.tempFilePaths[0]
      })
    })
  },
  uploadB() {
    config.chooseImage((res) => {
      this.setData({
        bimg: res.tempFilePaths[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options._type != null || options._type != undefined){
        this.setData({
          _type:'error'
        })
    }else{
      this.setData({
        _type: ''
      })
    }
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
   * 获取页面数据
   */
  getData(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.registerExplain, (res) => {
      console.log(res)
      this.setData({
        alldata: res
      })
      WxParse.wxParse('article', 'html', res.data.data.content, this, 0);
    }, (res) => {

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
    return app.globalData.shareInfo
  },
  /**
   * 立即支付
   */
  bottom_btn(res) {
    var that=this
    console.log(check)
    if (check){
      check=false
      config.ajax('POST', {
        uid: app.globalData.uid,
        name: this.data.nickName,
        idcard: this.data.idCard,
        // more:JSON.stringify(res),
        imgup: res[0],
        imgdown: res[1]
      }, config.registerPost, (res) => {
        console.log(res)
        check = true
        if (that.data._type == 'error') {
          wx.switchTab({
            url: '/pages/my/my',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          config.pay(res, (res) => {
            console.log(res)
            wx.switchTab({
              url: '/pages/my/my',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },(res)=>{
           
          })
        }

        if (res.data.data.code == '20000') {
          console.log(res)
          // config.pay(res,(res)=>{
          //           // wx.navigateTo({
          //   url: '/pages/my/renzheng/renzheng',
          //   success: function(res) {},
          //   fail: function(res) {},
          //   complete: function(res) {},
          // })
          // })
          // wx.navigateTo({
          //   url: '/pages/my/renzheng/renzheng',
          //   success: function(res) {},
          //   fail: function(res) {},
          //   complete: function(res) {},
          // })
          // config.pay(res,(res)=>{
          //   console.log(res)
          // })
        }
      }, (res) => {

      })
    }

  },
  /**
   * 提交资料
   */
  submit() {
    var that = this
    if (this.data.nickName == '' || this.data.nickName == undefined || this.data.idCard == null) {
      config.mytoast('请填写姓名', (res) => { })
      return false
    }
    if (this.data.idCard == '' || this.data.idCard == undefined || this.data.idCard == null) {
      config.mytoast('身份证不能为空', (res) => { })
      return false
    }
    if (this.data.zimg == '' || this.data.zimg == undefined || this.data.zimg == null) {
      config.mytoast('请上传正面照', (res) => { })
      return false
    }
    if (this.data.bimg == '' || this.data.bimg == undefined || this.data.bimg == null) {
      config.mytoast('请上传背面照', (res) => { })
      return false
    }

    var imgArr = [this.data.zimg, this.data.bimg];
    var resImg = []
    var n = imgArr.length - 1; //需要上传图片数组的长度-1
    var s = 0;  //初始化索引值标志
    (function upArr() {  //上传图片函数
      wx.uploadFile({
        url: config.https + config.imgUpdate,  //需要上传的接口
        filePath: imgArr[s],  //需要上传的图片文件
        name: 'img',
        formData: {},
        success: (res) => {  //上传成功后
          console.log(res)
          res.data = JSON.parse(res.data)
          resImg.push(res.data.data.img_url)
          if (n > s) {  //判断是否全部上传完，此处为未全部上传完，继续调用上传函数
            s++   //标志
            upArr()
          } else {
            that.bottom_btn(resImg)
            //全部上传成功区间
          }
        }
      })
    })()





    // wx.uploadFile({
    //   url: config.https + config.imgUpdate, //仅为示例，非真实的接口地址
    //   filePath: this.data.tempFilePaths[0],
    //   name: 'img',
    //   formData: {},
    //   success: (res) => {
    //     if (res.errMsg = "uploadFile:ok") {
    //       console.log(res.data)
    //       res.data = JSON.parse(res.data)
    //       console.log(res.data)
    //       this.submit(res.data)
    //       // this.savaInfo(res.data.data)
    //     }
    //   }
    // })
    // this.bottom_btn()
  }
})
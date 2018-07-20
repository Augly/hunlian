// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  upimg() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'myimg.imgSrc': res.tempFilePaths
        })
      }
    })
    //上传图片
    if (this.data.myimg.imgSrc == null || this.data.myimg.imgSrc == undefined) {
      imgSrc = ''
    } else {
      var n = this.data.myimg.imgSrc.length - 1;
      var s = 0;
      (function upArr() {
        wx.uploadFile({
          url: config.uploadFile, //仅为示例，非真实的接口地址
          filePath: that.data.myimg.imgSrc[s],
          name: 'file',
          formData: {
            filetype: 'image',
            app: 'material'
          },
          success: function (res) {
            myimgurl += ',' + JSON.parse(res.data).data[0].filepath
            if (n > s) {
              s++
              upArr()
            } else {
              myimgurl.slice(1, myimgurl.length)
            }
          }
        })
      })()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
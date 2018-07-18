// pages/index/basicInformation.js
const config = require('../../../utils/config.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexGroup: ['男', '女'],
    sex: '女',
    star: '摩羯座',
    region: ['天津市', '天津市', '和平区'],
    myimg: '/imgs/logo.png'
  },
  /**
   * 选择性别
   */
  sex(e) {
    this.setData({
      sex: this.data.sexGroup[e.detail.value]
    })
  },
  /**
   * 上传图片
   */
  upload() {
    config.chooseImage((res) => {
      this.setData({
       tempFilePaths: res.tempFilePaths,
          myimg: res.tempFilePaths[0]
      })
    })
  },
  /**
   * 输入昵称
   */
  nickName(e) {
    this.setData({
      nackName: e.detail.value
    })
  },
  /**
   * 输入身高
   */
  myHeight(e) {
    this.setData({
      myHeight: e.detail.value
    })
  },
  /**
   * 输入体重
   */
  myWeight(e) {
    this.setData({
      myWeight: e.detail.value
    })
  },
  /**
   * 选择学历
   */
  xl(e) {
    this.setData({
      xl: this.data.xlGroup[e.detail.value]
    })
  },
  /**
   * 选择星座
   */
  star(e) {
    this.setData({
      star: this.data.sexGroup[e.detail.value]
    })
  },
  /**
   * 选择城市
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 选择出生日期
   */
  mydate(e) {
    var that = this;
    var birthday = e.detail.value;
    var st = birthday.split('-')
    var sm = parseInt(st[1] + st[2])
    var n = 0
    if (sm >= 321 && sm <= 419) {
      n = '白羊座'
    } else if (sm >= 420 && sm <= 520) {
      n = '金牛座'
    } else if (sm >= 521 && sm <= 621) {
      n = '双子座'
    } else if (sm >= 622 && sm <= 722) {
      n = '巨蟹座'
    } else if (sm >= 723 && sm <= 822) {
      n = '狮子座'
    } else if (sm >= 823 && sm <= 922) {
      n = '处女座'
    } else if (sm >= 923 && sm <= 1023) {
      n = '天枰座'
    } else if (sm >= 1024 && sm <= 1122) {
      n = '天蝎座'
    } else if (sm >= 1123 && sm <= 1221) {
      n = '射手座'
    } else if (sm >= 1222) {
      n = '魔蝎座'
    } else if (sm >= 120 && sm <= 218) {
      n = '水瓶座'
    } else if (sm >= 219 && sm <= 320) {
      n = '双鱼座'
    }
    this.setData({
      mydate: e.detail.value,
      star: n
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mydata = new Date()
    var merry = mydata.getFullYear()
    var merryArr = []
    for (var i = 0; i < 10; i++) {
      merryArr.push(merry++)
    }
    console.log(merryArr)
    this.setData({
      // merryGroup: merryArr,
      // merry: merryArr[0],
      mydate: mydata.getFullYear() - 16 + '-12-31',
      endDate: mydata.getFullYear() - 16 + '-12-31',
      startDate: mydata.getFullYear() - 120 + '-01-01',
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
   * 获取基本信息类型
   */
  getInfo(res) {
    config.ajax('POST', {
      uid: res.data.data.uid
    }, config.registerBase, (res) => {
      console.log(res)
      this.setData({
        merryGroup: res.data.data.array_marriage,
        merry: res.data.data.array_marriage[0],
        xlGroup: res.data.data.array_education,
        xl: res.data.data.array_education[0],
      })
    }, (res) => {

    })
  },
  /**
   * 期望结婚年龄
   */
  merry: function (e) {
    this.setData({
      merry: this.data.merryGroup[e.detail.value]
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
   * 提交资料
   */
  submit(res) {
    if (this.data.sex=='女'){
      var sex=0
    }else{
      var sex = 1
    }
    config.ajax('POST', {
      uid: app.globalData.uid,
      headimageurl: res.data.img_url,
      nick_name: this.data.nackName,
      sex: sex,
      birth: this.data.mydate,
      constellation: this.data.star,
      height: this.data.myHeight,
      weight: this.data.myWeight,
      workplace: this.data.region[0] + this.data.region[1] + this.data.region[2],
      education: this.data.xl.id,
      marriage_time: this.data.merry.id
    }, config.registerTwo, (res) => {
      config.mytoast('提交成功', (res) => {
        wx.navigateTo({
          url: '/pages/index/certification/certification',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      })
    }, (res) => {
    })
  },
  /**
   * 下一步
   */
  next: function () {
    if (this.data.myimg == '/imgs/logo.png' || this.data.myimg == null || this.data.myimg == undefined) {
      config.mytoast('请上传头像', (res) => { })
      return false
    }
    if (this.data.nackName == '' || this.data.nackName == null || this.data.nackName == undefined) {
      config.mytoast('请输入昵称', (res) => { })
      return false
    }
    if (this.data.myHeight == '' || this.data.myHeight == null || this.data.myHeight == undefined) {
      config.mytoast('请输入身高', (res) => { })
      return false
    }
    if (this.data.myWeight == '' || this.data.myWeight == null || this.data.myWeight == undefined) {
      config.mytoast('请输入体重', (res) => { })
      return false
    }
    console.log(this.data.myimg)
    // wx.uploadFile({
    //   url: config.https + config.imgUpdate, //仅为示例，非真实的接口地址
    //   filePath:this.data.myimg,
    //   name:'image',
    //   formData: {},
    //   success: (res) => {
    //     console.log(res)
    //     // if (res.errMsg = "uploadFile:ok") {
    //     //   res.data = JSON.parse(res.data)
    //     //   console.log(res)
    //     //   that.submit(res)
    //     // }
    //   }
    // })
    wx.uploadFile({
      url: config.https + config.imgUpdate, //仅为示例，非真实的接口地址
      filePath: this.data.tempFilePaths[0],
      name: 'img',
      formData: {},
      success:(res)=>{
        console.log(res)
        if (res.errMsg = "uploadFile:ok") {
          console.log(res.data)
          res.data = JSON.parse(res.data)
          console.log(res.data)
          this.submit(res.data)
          // this.savaInfo(res.data.data)
        }
      }
    })

    // this.submit()
  }
})
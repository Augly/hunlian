// pages/bacisinfo/bacisinfo.js
const config = require('../../../utils/config.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bacis: true,
    standard: false,
    hohbby: false,
    isWrap: false,
    labelList: [],
    filmList: [],
    foodsList: [],
    sportsList: [],
    sex: ['女', '男'],
    sexIndex: '女',
    mydata: '',
    star: '白羊座',
    region: ['天津市', '天津市', '和平区'],
    merry: ['未婚', '已婚'],
    isHas: ['无', '有'],
    isHasValue: '无',
    isHasValuetwo: '无',
    merryValue: '未婚',
    merryValueone: '未婚',
    merryValuetwo: '未婚',
    regionone: ['天津市', '天津市', '和平区'],
    zo_education: {
      id: 1,
      education: '小学'
    },
    wrapConet:false
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
   * 选择城市
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  selectCity: function (e) {
    this.setData({
      regionone: e.detail.value
    })
  },
  selectSex(e) {
    this.setData({
      sexIndex: this.data.sex[e.detail.value]
    })
  },
  selectC(e) {
    this.setData({
      isHasValue: this.data.isHas[e.detail.value]
    })
  },
  selectCtwo(e) {
    this.setData({
      isHasValuetwo: this.data.isHas[e.detail.value]
    })
  },
  merrySelect(e) {
    this.setData({
      merryValue: this.data.merry[e.detail.value]
    })
  },
  merrySelectone(e) {
    this.setData({
      merryValueone: this.data.merry[e.detail.value]
    })
  },
  merrySelecttwo(e) {
    this.setData({
      merryValuetwo: this.data.merry[e.detail.value]
    })
  },
  mydata(e) {
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
      mydata: e.detail.value,
      star: n
    })
  },
  //选择年收入
  start_money(e) {
    this.setData({
      money: this.data.array_income[e.detail.value]
    })
  },
  //选择年收入
  start_moneyone(e) {
    this.setData({
      moneyone: this.data.array_income[e.detail.value]
    })
  },
  //选择学历
  start_marriage(e) {
    this.setData({
      marriage: this.data.array_marriage[e.detail.value]
    })
  },
  //选择学历
  start_education(e) {
    this.setData({
      education: this.data.array_education[e.detail.value]
    })
  },
  //选择择偶标准
  zo_education(e) {
    this.setData({
      zo_education: this.data.array_education[e.detail.value]
    })
  },
  //添加兴趣爱好
  add() {
    config.ajax('POST', {
      uid: app.globalData.uid,
      _type: this.data._type,
      name: this.data.iptData
    }, config.myHobbyAdd, (res) => {
      this.getData(app.globalData.uid)
      if (res.data.data.code == '20000') {
        config.mytoast('添加成功', (res) => {
          this.setData({
            isWrap: false
          })
          this.gethobby(app.globalData.uid)
        })
      }
    }, (res) => {
      console.log(res)
    })
  },
  iptData(e) {
    this.setData({
      iptData: e.detail.value
    })
  },
  readyAdd(e) {
    this.setData({
      _type: config.getData(e, 'type'),
      isWrap: true
    })
  },
  hideWrap() {
    this.setData({
      isWrap: false
    })
  },
  showbacis: function () {
    this.setData({
      bacis: true,
      standard: false,
      hohbby: false,
    })
  },
  showstandard: function () {
    this.setData({
      bacis: false,
      standard: true,
      hohbby: false
    })
  },
  showhohbby: function () {
    this.setData({
      bacis: false,
      standard: false,
      hohbby: true
    })
  },
  //输入昵称
  nickname(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  //输入性别
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //输入身高
  myheight(e) {
    this.setData({
      height: e.detail.value
    })
  },
  //输入工作地区
  workplace(e) {
    this.setData({
      workplace: e.detail.value
    })
  },
  //输入民族
  iptmz(e) {
    this.setData({
      iptmz: e.detail.value
    })
  },
  //输入职业
  getzw(e) {
    this.setData({
      getzw: e.detail.value
    })
  },
  //输入体重
  myweight(e) {
    this.setData({
      weight: e.detail.value
    })
  },
  //输入择偶体重
  myweighttwo(e) {
    this.setData({
      myweighttwo: e.detail.value
    })
  },
  //输入星座
  staript(e) {
    this.setData({
      staript: e.detail.value
    })
  },
  //基本信息提交
  adduserPost() {
    if (this.data.height == '' || this.data.height == undefined || this.data.height == null) {
      config.mytoast('请输入你的身高！', (res) => {

      })
      return false
    }
    if (this.data.workplace == '' || this.data.workplace == undefined || this.data.workplace == null) {
      config.mytoast('请输入你的工作地区！', (res) => {

      })
      return false
    }
    if (this.data.getzw == '' || this.data.getzw == undefined || this.data.getzw == null) {
      config.mytoast('请输入你的职业！', (res) => {

      })
      return false
    }
    if (this.data.weight == '' || this.data.weight == undefined || this.data.weight == null) {
      config.mytoast('请输入你的体重！', (res) => {

      })
      return false
    }
    if (this.data.iptmz == '' || this.data.iptmz == undefined || this.data.iptmz == null) {
      config.mytoast('请输入你的民族！', (res) => {

      })
      return false
    }
    if (this.data.name == '' || this.data.name == undefined || this.data.name == null) {
      config.mytoast('请输入你的姓名！', (res) => {

      })
      return false
    }
    if (this.data.nickname == '' || this.data.nickname == undefined || this.data.nickname == null) {
      config.mytoast('请输入你的昵称！', (res) => {

      })
      return false
    }
    if (this.data.myimg == '' || this.data.myimg == undefined || this.data.myimg == null) {
      config.mytoast('请上传头像', (res) => {

      })
      return false
    }
    if (this.data.nickname == '' || this.data.nickname == undefined || this.data.nickname == null) {
      config.mytoast('昵称不能为空', (res) => {

      })
      return false
    }
    if (this.data.name == '' || this.data.name == undefined || this.data.name == null) {
      config.mytoast('请填写姓名', (res) => {

      })
      return false
    }
    if (this.data.sexIndex == '' || this.data.sexIndex == undefined || this.data.sexIndex == null) {
      config.mytoast('请选择性别', (res) => {

      })
      return false
    }
    if (this.data.mydata == '' || this.data.mydata == undefined || this.data.mydata == null) {
      config.mytoast('请选择生日', (res) => {

      })
      return false
    }
    if (this.data.height == '' || this.data.height == undefined || this.data.height == null) {
      config.mytoast('请输入身高', (res) => {

      })
      return false
    }
    if (this.data.workplace == '' || this.data.workplace == undefined || this.data.workplace == null) {
      config.mytoast('请输入工作地点', (res) => {

      })
      return false
    }
    if (this.data.money.income == '' || this.data.money.income == undefined || this.data.money.income == null) {
      config.mytoast('请选择年收入', (res) => {

      })
      return false
    }
    if (this.data.education.education == '' || this.data.education.education == undefined || this.data.education.education == null) {
      config.mytoast('请选择学历', (res) => {

      })
      return false
    }
    console.log(this.data.marriage.marriage_time)
    if (this.data.marriage.marriage_time == '' || this.data.marriage.marriage_time == undefined || this.data.marriage.marriage_time == null) {
      config.mytoast('请选择期望结婚年龄', (res) => {

      })
      return false
    }
    // if (this.data.merryValue == '未婚') {
    //   var marital_status = 0
    // } else {
    //   var marital_status = 1
    // }
    // if (this.data.isHasValue == '有') {
    //   var ywzn = 1
    // } else {
    //   var ywzn = 0
    // }
    console.log(this.data.tempFilePaths)
    if (this.data.tempFilePaths != null&&this.data.tempFilePaths != undefined && this.data.tempFilePaths !=''){
      console.log(121212)
      wx.uploadFile({
        url: config.https + config.imgUpdate, //仅为示例，非真实的接口地址
        filePath: this.data.tempFilePaths[0],
        name: 'img',
        formData: {},
        success: (res) => {
          console.log(res)
          if (res.errMsg = "uploadFile:ok") {
            res.data = JSON.parse(res.data)
            console.log(res.data)
            this.submit(res.data)
          }
        }
      })
    }else{
      this.submit()
    }
  },
  submit(res){
    if(res==''||res==undefined||res==null){
      var img = this.data.myimg
    }else{
      var img = res.data.img_url
    }
    if (this.data.merryValue == '未婚') {
      var marital_status = 0
    } else {
      var marital_status = 1
    }
    if (this.data.isHasValue == '有') {
      var ywzn = 1
    } else {
      var ywzn = 0
    }
    config.ajax('POST', {
      uid: app.globalData.uid,
      headimgurl: img,
      nickname: this.data.nickname,
      birth: this.data.mydata,
      income: this.data.money.id,
      education: this.data.education.id,
      marriage_time: this.data.marriage.marriage_time,
      marital_status: marital_status,
      weight: this.data.weight,
      height: this.data.height,
      constellation:this.data.star,
      ywzn: ywzn
    }, config.userPost, (res) => {
      console.log(res)
    }, (res) => {

    })
  },
  // showmold:function(){
  //   this.setData({
  //     showmold: !showmold
  //   })
  // },
  //输入年龄
  myage(e) {
    this.setData({
      myage: e.detail.value
    })
  },
  //输入身高
  myheight(e) {
    this.setData({
      myheight: e.detail.value
    })
  },
  //输入星座
  staript(e) {
    this.setData({
      staript: e.detail.value
    })
  },
  //择偶信息标准
  savemyLovePost() {
    if (this.data.regionone == '' || this.data.regionone == null || this.data.regionone == undefined) {
      config.mytoast('请选择工作信息', (res) => {

      })
      return false
    }
    if (this.data.merryValueone == '' || this.data.merryValueone == null || this.data.merryValueone == undefined) {
      config.mytoast('请选择婚姻状况', (res) => {

      })
      return false
    }
    if (this.data.myage == '' || this.data.myage == null || this.data.myage == undefined) {
      config.mytoast('请输入年龄', (res) => {

      })
      return false
    }
    if (this.data.myheight == '' || this.data.myheight == null || this.data.myheight == undefined) {
      config.mytoast('请输入身高', (res) => {

      })
      return false
    }
    if (this.data.myweighttwo == '' || this.data.myweighttwo == undefined || this.data.myweighttwo == null) {
      config.mytoast('请输入体重', (res) => {

      })
      return false
    }
    if (this.data.moneyone.income == '' || this.data.moneyone.income == undefined || this.data.moneyone.income == null) {
      config.mytoast('请选择年收入', (res) => {

      })
      return false
    }
    if (this.data.zo_education.education == '' || this.data.zo_education.education == undefined || this.data.zo_education.education == null) {
      config.mytoast('请选择学历', (res) => {

      })
      return false
    }
    if (this.data.staript == '' || this.data.staript == undefined || this.data.staript == null) {
      config.mytoast('请输入星座', (res) => {

      })
      return false
    }
    if (this.data.merryValuetwo == '未婚') {
      var marital_status = 0
    } else {
      var marital_status = 1
    }
    if (this.data.isHasValuetwo == '有') {
      var ywzn = 1
    } else {
      var ywzn = 0
    }
    config.ajax('POST', {
      uid: app.globalData.uid,
      age: this.data.myage,
      weight: this.data.myweighttwo,
      height: this.data.myheight,
      workplace: this.data.regionone[0] + this.data.regionone[1] + this.data.regionone[2],
      education: this.data.zo_education.id,
      income: this.data.moneyone.id,
      marital_status: marital_status,
      constellation: this.data.staript,
      ywzn: ywzn
    }, config.myLovePost, (res) => {
      console.log(res)
    }, (res) => {

    })

    // if () {

    // }
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
        this.gethobby(res)
        this.getLove(res)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => {})
      }
    }, (res) => {})
    var mydata = new Date()
    this.setData({
      // mydata: mydata.getFullYear() - 16 + '-12-31',
      enddata: mydata.getFullYear() - 16 + '-12-31'
    })
  },
  //获取兴趣爱好
  gethobby(res) {
    if (typeof res == 'object') {
      var uid = res.data.data.uid
    } else {
      var uid = app.globalData.uid
    }
    config.ajax('POST', {
      uid: uid
    }, config.myHobby, (res) => {
      if (res.data.data.code == '40005') {

      } else {
        console.log(res)
        this.setData({
          labelList: res.data.data.array_label,
          filmList: res.data.data.array_film,
          foodsList: res.data.data.array_foods,
          sportsList: res.data.data.array_sports
        })
      }
    }, (res) => {

    })
  },
  //获取择偶标准
  getLove(res) {
    if (typeof res == 'object') {
      var uid = res.data.data.uid
    } else {
      var uid = app.globalData.uid
    }
    config.ajax('POST', {
      uid: uid
    }, config.myLove, (res) => {
      console.log(res)
      if (res.data.data.code == '40005') {

      } else {

      }
    }, (res) => {

    })
  },
  //获取基本资料
  getData(res) {
    console.log(typeof res)
    if (typeof res == 'object') {
      var uid = res.data.data.uid
    } else {
      var uid = app.globalData.uid
    }
    config.ajax('POST', {
      uid: uid
    }, config.userInfo, (res) => {
      console.log(res.data.data.array_marriage[0].marriage_time)
      this.setData({
        myimg: res.data.data.headimgurl,
        array_education: res.data.data.array_education,
        array_income: res.data.data.array_income,
        array_marriage: res.data.data.array_marriage,
        mydata: res.data.data.birth,
        star: res.data.data.constellation,
        height: res.data.data.height,
        name: res.data.data.name,
        nickname: res.data.data.nickname,
        sexIndex: this.data.sexIndex[res.data.data.sex],
        weight: res.data.data.weight,
        workplace: res.data.data.workplace,
        money: res.data.data.array_income[0],
        moneyone: res.data.data.array_income[0],
        marriage: res.data.data.array_marriage[0],
        education: res.data.data.array_education[0]
      })
      this.setData({
        wrapConet:true
      })
      wx.hideLoading()
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
   * 删除个人标签兴趣爱好
   */
  closeLabel(e) {
    this.delect('label', config.getData(e, 'name'))
  },
  /**
   * 删除电影兴趣爱好
   */
  closeFilm(e) {
    this.delect('film', config.getData(e, 'name'))
  },
  /**
   * 删除美食兴趣爱好
   */
  closeFoods(e) {
    this.delect('foods', config.getData(e, 'name'))
  },
  /**
   * 删除个人兴趣爱好
   */
  closeSports(e) {
    this.delect('sports', config.getData(e, 'name'))
  },
  delect(_type, name) {
    config.ajax('POST', {
      uid: app.globalData.uid,
      _type: _type,
      name: name
    }, config.myHobbyDel, (res) => {
      this.gethobby(app.globalData.uid)
    }, (res) => {

    })
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
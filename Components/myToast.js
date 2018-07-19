// Components/myToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noCode:{
      type:Boolean,
      value:false
    },
    otherdetail:{
      type:String,
      value: '您尚未注册,点击立即注册'
    },
    step:{
      type:String,
      value:'1'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask(){
      // this.setData({
      //   noCode:false
      // })
      wx.switchTab({
        url: '/pages/index/index',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    goloading(){
      console.log()
      if (this.data.step=='1'){
        wx.navigateTo({
          url: '/pages/index/toloading/toloading',
        })
      } else if (this.data.step == '2'){
        wx.navigateTo({
          url: '/pages/index/loginRegister/loginRegister',
        })
      } else if (this.data.step == '3'){
        wx.navigateTo({
          url: '/pages/index/basicInformation/basicInformation',
        })
      } else if (this.data.step == '5') {
        wx.navigateTo({
          url: '/pages/my/renzheng/renzheng',
        })
      }else{
        wx.navigateTo({
          url: '/pages/index/certificationInformation/certificationInformation',
        })
      }
    }
  }
})

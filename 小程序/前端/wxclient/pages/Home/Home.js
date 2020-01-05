//index.js
//获取应用实例
const app = getApp()
var config = app.config;
Page({
  data: {
    motto: '大家坏才是真的坏',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  userNameinput: function(e) {
    config.UserName = e.detail.value;
  },
  login() {
    if (config.UserName == 'none'){
        wx.showToast({
        title: '请先输入用户名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return;
    }
    var tag = -1;
    wx.request({
      url: 'https://'+config.host+'/login',
      data:{
        Name:config.UserName
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var state = res.data.length;
        console.log(state);
        if(state!=0){
          tag=res.data[0]['Id'];
          console.log(tag);
        }
        if (tag != -1) {
          config.UserId = res.data[0]['Id'];
          config.UserEnglishName = res.data[0]['EnglishName'];
          console.log(config);
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
        else {
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
//index.js
//获取应用实例
const app = getApp()
const config = app.config
Page({
  data: {
    url: 'https://' + config.host,
    day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    time: ['7:30-10:00', '10:00-12:30', '14:00-16:00', '16:00-18:30', '19:00-21:30', '21:30-23:30'],
    w: [0, 1, 2, 3, 4, 5, 6],
    h: [0, 1, 2, 3, 4, 5],
    state: [],
   
  },
  //事件处理函数
  mistake: function() {
    if(config.UserId==-1){
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return 0;
    }
    return 1;
    // var tag = 0;
    // if (config.LoginState == 0) {
    //   console.log('not online');
    //   wx.showToast({
    //     title: '请先登录！',
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true
    //   })
    //   return 0;
    // }
    // tag = 1;
    // for (var i = 0; i < this.data.userlist.length; i++) {
    //   if (this.data.userlist[i]['Name'] == config.UserName) {
    //     tag = i;
    //     break;
    //   }
    // }
    // if (tag != -1) {
    //   console.log('User exits');
    // } else {
    //   console.log('User not exits');
    //   wx.showToast({
    //     title: '用户不存在！',
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true
    //   })
    //   return 0;
    // }
    // return tag;
  },
  onChange: function(e) {
    var s_id = e.currentTarget.id.slice(4, 6);
    console.log(s_id);
    var x = {};
    var str = "state[" + s_id + "]";
    if (this.data.state[s_id] == 0)
      x[str] = 1;
    else x[str] = 0;
    this.setData(x);
    console.log(this.data.state);
  },
  getme() {
    config.LoginState = 1; // pre process
    var tag = this.mistake();
    if (tag == 0) return;
    wx.request({
      url: this.data.url + '/getme',
      method: "GET",
      data: {
        id: config.UserId
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        console.log(res.data);
        var tmpstate = [];
        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 7; j++) {
            tmpstate[i * 10 + j]=0;
            if (i * 7 + j < res.data[0]['Classlist'].length)
            tmpstate[i * 10 + j] = res.data[0]['Classlist'][i * 7 + j] == '1' ? 1 : 0;
          }
        }
        this.setData({
          state: tmpstate
        })
      }
    })
  },
  send() {
    //config.LoginState = 1; // pre process
    var tag = this.mistake();
    if (tag == 0) return;
    var classlist = [];
    for (var i = 0; i < this.data.h.length; i++) {
      for (var j = 0; j < this.data.w.length; j++) {
        classlist[i * 10 + j] = this.data.state[i * 10 + j];
      }
    }
    console.log(classlist);
    console.log(config.UserName);
    wx.request({
      url: this.data.url + '/send',
      method: "GET",
      data: {
        id: config.UserId,
        list: classlist
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        console.log(res.data);
      }
    })
  },

  onLoad: function() {

  },
  onReady: function() {
    var x = {};
    for (var i = 0; i < 100; i++) {
      var str = "state[" + i + "]";
      x[str] = 0;
    }
    this.setData(x);
    
  }
})
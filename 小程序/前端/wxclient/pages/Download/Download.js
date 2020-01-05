// pages/Download/Download.js
const app = getApp();
const config = app.config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dismessage:'永远相信\n美好的事情即将发生',
    url: 'https://' + config.host,
    loadingHidden: true
  },
  mistake:function(){
    if (config.UserId == -1) {
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return 0;
    }
    return 1;
  },
  load: function() {
    var tag=this.mistake();
    if(tag==0){
      return ;
    }
    wx.request({
      url: this.data.url+'/getwork',  
      data:{
        Name:config.UserEnglishName
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success:(res)=>{
        this.setData({
          dismessage:res.data[0]['Content']
        })
        console.log('get work success');
      }
    })
    // this.setData({
    //   loadingHidden: false
    // })
    /*let _that = this;
      wx.downloadFile({
      url: this.data.url + '/public/personal_list/DXW.txt',
      success: function(res) {
        console.log(res);
        var filetype = "";
        var type = res.tempFilePath.lastIndexOf('.');
        filetype = res.tempFilePath.substring(type + 1, res.tempFilePath.length);
        if (filetype == 'msword') {
          filetype = 'doc';
        }
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType: filetype,
          success: function(res) {
            console.log(res);
            console.log('打开文档成功')
          }
        });
        return;
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function(res) {
            console.log(res);

            const savedFilePath = res.savedFilePath;
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function(res) {
                console.log(res);
                console.log('打开文档成功')
              }
            });
          },
          fail: function(err) {
            console.log('保存失败：', err)
          }
        })
      }
    })*/
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// pages/publishBook/publishBook.js

import Toast from 'vant-weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    title: '',
    author: '',
    type: '',
    detail: '',
    imgFileId: '',
    openId:''
  },

  getTitle: function(event) {
    // console.log(event.detail)
    this.setData({
      title: event.detail
    })
  },

  getAuthor: function(event) {
    // console.log(event.detail)
    this.setData({
      author: event.detail
    })
  },

  getType: function(event) {
    // console.log(event.detail)
    this.setData({
      type: event.detail
    })
  },

  getDetail: function(event) {
    // console.log(event.detail)
    this.setData({
      detail: event.detail
    })
  },

  uploadImg: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        this.setData({
          tempFilePaths: res.tempFilePaths[0]
        })

      }
    })
  },

  submit: function() {
    if (this.data.title != "" && this.data.author != "" && this.data.type != "" && this.data.detail != "" && this.data.tempFilePaths != "") {
      var pages = getCurrentPages()
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      }
      wx.showLoading({
        title: '提交中',
      })
      // 上传图片到云存储
      let suffix = /\.\w+$/.exec(this.data.tempFilePaths)[0]; // 正则表达式，返回文件扩展名
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
        filePath: this.data.tempFilePaths, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          //console.log(res.fileID)
          this.setData({
            imgFileId: res.fileID
          })
          wx.cloud.callFunction({
              name: 'addNewBook',
              // 传给云函数的参数
              data: {
                author: this.data.author,
                detail: this.data.detail,
                imgFileId: this.data.imgFileId,
                title: this.data.title,
                type: this.data.type,
                openId: this.data.openId
              }
            })
            .then(res => {
              wx.hideLoading();
              wx.showToast({
                title: '提交成功',
              })
              setTimeout(() => { beforePage.onPullDownRefresh() }, 1000)
              setTimeout(function() {
                wx.navigateBack({

                })
              }, 1500)
            }).catch(err => {
              wx.hideLoading();
              Toast.fail('提交失败')
            })
        },
        fail: console.error
      })
    }
    else{
      Toast.fail('请完善信息哦')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'openId',
      success: res => {
        this.setData({
          openId: res.data
        })
      }
    })
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
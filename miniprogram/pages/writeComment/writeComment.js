// pages/writeComment/writeComment.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    bookId: '',
    openId: '',
    nickName: '',
    avatarUrl: '',
    rate: '',
    //edit
    commentId: ''
  },

  getContent: function(event) {
    this.setData({
      comment: event.detail.value
    })
  },

  // //键盘失去焦点触发
  // onBlur: function (event) {
  //   this.setData({
  //     comment: event.detail.value
  //   })
  // },

  //点击取消返回上一界面
  goBack: function() {
    wx.navigateBack({

    })
  },

  //提交评论
  submit: function() {
    var pages = getCurrentPages()
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      }
    //编辑书评
    if (this.data.commentId != "") {
      if (this.data.comment != "") {
        wx.cloud.callFunction({
          // 云函数名称
          name: 'updateMyComment',
          // 传给云函数的参数
          data: {
            commentId:this.data.commentId,
            comment:this.data.comment,
            rate: this.data.rate
          }
        })
        .then(() => {
          wx.showToast({
            title: '更新成功',
          })
          setTimeout(()=>{beforePage.onPullDownRefresh()},1000)
          setTimeout(() => {
            wx.navigateBack({

            })
          }, 1500)
        })
      } else {
        Toast.fail('内容不能为空')
      }
    }
    //写书评
    else {
      if (this.data.comment != "") {
        wx.cloud.callFunction({
          // 云函数名称
          name: 'submitComment',
          // 传给云函数的参数
          data: {
            openId: this.data.openId,
            bookId: this.data.bookId,
            comment: this.data.comment,
            nickName: this.data.nickName,
            avatarUrl: this.data.avatarUrl,
            rate: this.data.rate
          }
        }).then(() => {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(() => { beforePage.onPullDownRefresh() }, 1000)
          setTimeout(() => {
            wx.navigateBack({})
          }, 1500)
        })
      } else
        Toast.fail('内容不能为空')
    }
  },

  onChange: function(e){
    this.setData({
      rate: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //编辑书评
    if (options.comment != undefined) {
      this.setData({
        comment: options.comment,
        commentId: options._id
      })
    }
    //写书评
    else {
      wx.getStorage({
        key: 'userInfo',
        success: res => {
          this.setData({
            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl
          })
          wx.getStorage({
            key: 'openId',
            success: suc => {
              this.setData({
                openId: suc.data
              })
            }
          })
          this.setData({
            bookId: options.bookId
          })
        },
        fail: () => {
          Toast.fail('请先用户授权')
          setTimeout(function() {
            wx.switchTab({
              url: '../profile/profile'
            })
          }, 1000)
        }
      })
    }
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
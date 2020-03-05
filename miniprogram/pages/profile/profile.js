// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    openId: ''
  },

  onGotUserInfo: function(event) {
    console.log(event.detail.userInfo)
    if (event.detail.userInfo != null) {
      wx.setStorage({
        key: "userInfo",
        data: event.detail.userInfo
      })
      this.setData({
        hasUserInfo: false,
      })
    }
  },

  gotoMyComment:function(){
    wx.navigateTo({
      url: '../MyComment/MyComment',
    })
  },

  gotoMyLike: function () {
    wx.navigateTo({
      url: `../MyLike/MyLike?openId=${this.data.openId}`,
    })
  },

  //我上传的书
  gotoMyBook: function(){
    wx.navigateTo({
      url: `../myBook/myBook?openId=${this.data.openId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          hasUserInfo: false
        })
      }
    })
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
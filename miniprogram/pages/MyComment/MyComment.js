// miniprogram/pages/MyComment/MyComment.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    openId: "",
    myComment: [],
  },
  getMyComment: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getMyComment',
      // 传给云函数的参数
      data: {
        start: this.data.start,
        openId: this.data.openId
      },
    }).then(res => {
      console.log(res)
      if (res.result.data != undefined) {
        this.setData({
          myComment: this.data.myComment.concat(res.result.data.reverse())
        }, () => {
          wx.hideLoading()
        })
      } else if (this.data.start == 0 && res.result.data == undefined) {
        wx.hideLoading()
        Toast.fail("你还没有书评哦")
      } 
       else {
        Toast.fail('没有更多了');
        wx.hideLoading()
      }
    })
  },
  //点击删除
  onDelete: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否确定删除此评论?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'deleteComment',
            data: {
              comment: that.data.myComment[index].comment,
              openId: that.data.myComment[index].openId
            }
          })
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  gotoEdit:function(e){
    var index = e.currentTarget.dataset.index
    var item=this.data.myComment[index]
    wx.navigateTo({
      url: `../writeComment/writeComment?_id=${item._id}&comment=${item.comment}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'openId',
      success: res => {
        this.setData({
          openId: res.data,
          start: 0
        }, () => {
          this.getMyComment()
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
    this.setData({
      start: 0,
      myComment:[]
    })
    this.getMyComment()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      start: this.data.myComment.length
    })
    this.getMyComment()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
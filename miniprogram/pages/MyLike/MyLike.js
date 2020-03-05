// miniprogram/pages/MyLike/MyLike.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    openId: "",
    books: []
  },
  //转到评论页面
  gotoCommentList: function(event) {
    var item = this.data.books[event.target.dataset.index]
    wx.navigateTo({
      url: `../comment/comment?imgUrl=${item.book.imgUrl}&title=${item.book.title}&author=${item.book.author}&type=${item.book.type}&bookId=${item.bookId}`,
    })
  },

  getMyLike: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getMyLike',
      data: {
        start: this.data.start,
        openId: this.data.openId
      }
    }).then(res => {
      console.log(res)
      if (res.result.data != undefined) {
        this.setData({
          books: this.data.books.concat(res.result.data.reverse())
        }, () => {
          wx.hideLoading()
        })
      } else if (this.data.start == 0 && res.result.data == undefined) {
        wx.hideLoading()
        Toast.fail("还没有收藏哦")
      }  
      else {
        Toast.fail('没有更多了');
        wx.hideLoading()
      }
    })
  },

  // //取消收藏
  // deleMyLike: function(event){
  //   var item = this.data.books[event.target.dataset.index]
  //   console.log(item.bookId)
  //   var that = this
  //   wx.showModal({
  //     title: '提示',
  //     content: '是否确定取消收藏?',
  //     success(res) {
  //       if (res.confirm) {
  //         wx.cloud.callFunction({
  //           name: 'cancelLike',
  //           data: {
  //             openId: that.data.openId,
  //             bookId: item.bookId
  //           }
  //         })
  //         wx.showToast({
  //           title: '已删除',
  //           icon: 'success',
  //           duration: 1000
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },

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
          this.getMyLike()
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
      books:[]
    })
    this.getMyLike()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      start: this.data.books.length
    })
    this.getMyLike()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
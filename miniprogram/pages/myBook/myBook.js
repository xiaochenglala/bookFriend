// pages/myBook/myBook.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    openId: '',
    start:0
  },

  getMyBook:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getMyBook',
      data: {
        openId: this.data.openId,
        start:this.data.start
      }
    }).then(res => {
      console.log(res)
      if (res.result.data!=undefined ) {
        this.setData({
          bookList: this.data.bookList.concat(res.result.data.reverse())
        }, () => {
          wx.hideLoading()
        })
      } else if (this.data.start == 0 && res.result.data ==undefined) {
        wx.hideLoading()
        Toast.fail("还没有上传书")
      }
      else {
        Toast.fail('没有更多了');
        wx.hideLoading()
      }
    })
  },

  //关闭简介
  onClose: function () {
    this.setData({
      show: false
    });
  },

  //显示简介  
  showDetail: function (event) {
    // console.log(event)
    this.setData({
      show: true
    });
    this.setData({
      index: event.target.dataset.index
    })
  },

  //跳转到书评界面
  gotoCommentList: function (event) {
    var item = this.data.bookList[event.target.dataset.index]
    console.log(item._id)
    wx.navigateTo({
      url: `../comment/comment?imgUrl=${item.imgFileId}&title=${item.title}&author=${item.author}&type=${item.type}&bookId=${item._id}`,
    })
  },

  //删除书本
  deleteMybook: function(event){
    var item = this.data.bookList[event.target.dataset.index]
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确定删除此书?',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'deleteBook',
            data: {
              openId: that.data.openId,
              bookId: item._id,
              imgFileId:item.imgFileId
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openId: options.openId,
      start:0
    },()=>{this.getMyBook()})
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      start: 0,
      bookList:[]
    })
    this.getMyBook()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      start: this.data.bookList.length
    })
    this.getMyBook()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
const cloud = wx.cloud.init()
const db = wx.cloud.database()
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    title: '',
    author: '',
    type: '',
    bookId: '',
    comment: [],
    start: 0,
    like: false,
    openId: '',
    rate: ''
  },

  getConmentList: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
        name: 'getCommentList',
        // 传给云函数的参数
        data: {
          start: this.data.start,
          bookId: this.data.bookId
        },
      })
      .then(res => {
        // console.log(res.result.data)
        if (res.result.data != undefined) {
          this.setData({
            comment: this.data.comment.concat(res.result.data.reverse())
          }, () => {
            wx.hideLoading()
          })
        }else if(this.data.start==0 && res.result.data==undefined){
          wx.hideLoading()
          Toast.fail("还没有书评哦")
        } 
        else {
          Toast.fail('没有更多了');
          wx.hideLoading()
        }


      })
  },

  gotoWrite: function() {
    wx.navigateTo({
      url: `../writeComment/writeComment?bookId=${this.data.bookId}`,
    })
  },

  //点击收藏
  isLike: function() {
    this.setData({
      like: !this.data.like
    })
    wx.cloud.callFunction({
      name: 'isLike',
      // 传给云函数的参数
      data: {
        like: this.data.like,
        author: this.data.author,
        bookId: this.data.bookId,
        imgFileId: this.data.imgUrl,
        title: this.data.title,
        type: this.data.type,
        openId: this.data.openId
      },
    })
  },


  //判断用户是否已经收藏了此书
  whetherLike: function() {
    wx.cloud.callFunction({
      name: 'whetherLike',
      data: {
        openId: this.data.openId,
        bookId: this.data.bookId
      }
    }).then(res => {
      console.log(res)
      if (res.result.data.length != 0) {
        this.setData({
          like: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取书籍数据
    console.log(options)
    this.setData({
      imgUrl: options.imgUrl,
      title: options.title,
      author: options.author,
      type: options.type,
      bookId: options.bookId,
      start: 0,
      rate: options.rate
    }, () => {
      this.getConmentList()
    })
    //获取openId
    wx.getStorage({
      key: 'openId',
      success: res => {
        this.setData({
          openId: res.data
        }, () => {
          this.whetherLike()
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
      comment:[]
    })
    this.getConmentList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      start: this.data.comment.length
    })
    this.getConmentList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
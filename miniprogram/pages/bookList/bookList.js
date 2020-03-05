import Toast from 'vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    index: -1,
    bookList: [],
    start: 0,
    input: '',
  },

  getBookList: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
        name: 'getBookList',
        // 传给云函数的参数
        data: {
          start: this.data.start
        },
      })
      .then(res => {
        if (res.result.data != undefined) {
          this.setData({
            bookList: this.data.bookList.concat(res.result.data.reverse())
          }, ()=>{wx.hideLoading()})
        }
        else {
          Toast.fail('没有更多了');
          wx.hideLoading()
        }
        console.log(res)

      })
  },

  onClose: function() {
    this.setData({
      show: false
    });
  },

  showDetail: function(event) {
    // console.log(event)
    this.setData({
      show: true
    });
    this.setData({
      index: event.target.dataset.index
    })
  },

  gotoCommentList: function(event) {
    var item = this.data.bookList[event.target.dataset.index]
    console.log(item._id)
    wx.navigateTo({
      url: `../comment/comment?imgUrl=${item.imgFileId}&title=${item.title}&author=${item.author}&type=${item.type}&bookId=${item._id}`,
    })
  },

  gotoAdd:function(){
    wx.navigateTo({
      url: '../publishBook/publishBook',
    })
  },

  //当搜索框输入内容改变
  onChange: function (e) {
    this.setData({
      input: e.detail
    })
  },

  //点击搜索
  onSearch: function () {
    wx.showLoading({
      title: '搜索中',
      mask: true,
      success: function (res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.cloud.callFunction({
      name: 'search',
      data: {
        bookname: this.data.input
      }
    }).then(res => {
      wx.hideLoading()
    // console.log(res.result.data)
      wx.navigateTo({
        url : `../searchResult/searchResult?search=${this.data.input}`
      })
    }).catch(res => {
      wx.hideLoading(),
        wx.showToast({
          title: '搜索失败，请重试！',
        })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({start:0})
    this.getBookList()
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
    this.setData({ start: 0,bookList:[]})
    this.getBookList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({start:this.data.bookList.length})
    this.getBookList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
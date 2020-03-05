// pages/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    search: '',
    index: -1,
    books: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      search: options.search
    })
    this.onSearch();
  },


  onSearch: function () {
    wx.cloud.callFunction({
      name: 'search',
      data: {
        bookname: this.data.search
      }
    }).then(res =>{
      console.log(res.result.data)
      if(res.result.data.length == 0){
        wx.showToast({
          title: '没有相关的书噢', 
          icon: 'none',
          duration: 2000
        })
      }
      else{
      this.setData({
        books: res.result.data
        })}
      })
  },

  //显示简介
  showDetail: function (event) {
    this.setData({
      show: true,
      index: event.target.dataset.index
    });
  },

  //转到书评
  gotoCommentList: function (event) {
    var item = this.data.books[event.target.dataset.index]
    wx.navigateTo({
      url: `../comment/comment?imgUrl=${item.imgFileId}&title=${item.title}&author=${item.author}&type=${item.type}&bookId=${item._id}`,
    })
  },

  //关闭简介
  onClose: function () {
    this.setData({
      show: false
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
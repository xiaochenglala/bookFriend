// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.like) {
    //add
    return db.collection('like').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openId: event.openId,
        bookId: event.bookId,
        book: {
          "author": event.author,
          "imgFileId": event.imgUrl,
          "title": event.title,
          "type": event.type,
          'imgUrl': event.imgFileId
        }
      }
    }).then(res => {
        console.log(res)
      }).catch(errr =>{
        console.log(err)
      })
  }
  else {
    return db.collection('like').where({
      openId: event.openId,
      bookId: event.bookId
    }).remove({
      success: function (res) {
        console.log(res)
      }
    })
  }


}
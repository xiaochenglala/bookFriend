// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  cloud.deleteFile({
    fileList: [event.imgFileId]
  }).then(res => {
    // handle success
    console.log(res.fileList)
  }).catch(error => {
    // handle error
  })
  return db.collection('bookList').where({
    openId: event.openId,
    _id: event.bookId
  }).remove()
}
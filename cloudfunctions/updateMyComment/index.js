// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  return await db.collection("comment").doc(event.commentId).update({
    data: {
      comment: event.comment,
      rate: event.rate
    }
  })
}
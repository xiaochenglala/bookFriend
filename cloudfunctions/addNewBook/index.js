// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('bookList').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        author: event.author,
        detail: event.detail,
        imgFileId: event.imgFileId,
        title: event.title,
        type: event.type,
        openId: event.openId
      }
    })
  } catch (e) {
    console.error(e)
  }
}
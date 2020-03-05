// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection("comment").where({
    bookId: event.bookId
  }).count()
  const total = countResult.total
  if (total - 10 - event.start < 0 && total - event.start != 0) {
    return await db.collection("comment").where({
      bookId: event.bookId
    }).skip(0).limit(total - event.start).get()
  } else if (total - event.start == 0)
    return 0
  else
    return await db.collection("comment").where({
      bookId: event.bookId
    }).skip(total - 10 - event.start).limit(10).get()
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数z
exports.main = async (event, context) => {
  const countResult = await db.collection("like").where({
    openId: event.openId
  }).count()
  const total = countResult.total
  if (total - 10 - event.start < 0 && total - event.start != 0) {
    return await db.collection("like").where({
      openId: event.openId
    }).skip(0).limit(total - event.start).get()
  } else if (total - event.start == 0)
    return 0
  else
    return await db.collection("like").where({
      openId: event.openId
    }).skip(total - 10 - event.start).limit(10).get()
}
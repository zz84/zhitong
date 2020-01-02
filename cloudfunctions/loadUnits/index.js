// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const subjectCollection = db.collection('subjects')

// 云函数入口函数
exports.main = async (event, context) => {
  return subjectCollection.where({ subject: event.subjectName }).get().then(res => {
    var result = new Set()
    res.data.forEach(item => {
      if (item.unit) {
        result.add(item.unit)
      }
    })
    return { result: Array.from(result) }
  })
}
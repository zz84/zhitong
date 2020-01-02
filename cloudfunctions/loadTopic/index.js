// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const subjectCollection = db.collection('subjects')

// 云函数入口函数
exports.main = async (event, context) => {
  return subjectCollection.where({ 
    subject: event.subjectName,
    unit: event.unitName
  }).get().then(res => {
    var result = new Set()
    res.data.forEach(item => {
      if (item.topic) {
        result.add([item.topic, item.id])
      }
    })
    return { result: Array.from(result) }
  })
}
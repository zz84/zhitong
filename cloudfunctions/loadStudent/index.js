// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  return userCollection.get().then(res => {
    var result = new Set([])
    res.data.forEach(item => {
      if (item.isStudent) {
        result.add(item.name)
      }
    })
    return { result: Array.from(result) }
  })
}
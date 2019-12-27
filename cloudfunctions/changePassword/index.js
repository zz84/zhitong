// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')
const _ = db.command 
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await userCollection.where({
        name: event.username
      }).update({
        data: {
          password: event.newPassword
        }
      })
  } catch(e) {
    console.error(e)
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')
const _ = db.command

// TODO: cascade delete student rating
/** @param:
 *      - isStudent: boolean
 *      - username: string
 *  @return:
 *      - { success: true }, if user is deleted successfully to database
 *      - { success: false }, if there is not an exsiting user with username
 */
exports.main = async (event, context) => {
  try {
    return await userCollection.where({
      name: event.username,
      isStudent: event.isStudent
    }).remove().then(res => {
      return { success: true }
    })
  } catch (e) {
    return {
      success: false
    }
  }
}
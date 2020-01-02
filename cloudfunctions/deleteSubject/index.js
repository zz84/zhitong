// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const subjectCollection = db.collection('subjects')
const _ = db.command

// TODO: cascade delete student rating
/** @param:
 *      - prop: e.g. { subject: 'subject 1' }
 *  @return:
 *      - { success: true }, if user is deleted successfully to database
 *      - { success: false }, if there is not an exsiting user with username
 */
exports.main = async (event, context) => {
  try {
    return await subjectCollection.where(event.prop).remove().then(res => {
      return { success: true }
    })
  } catch (e) {
    return {
      success: false
    }
  }
}
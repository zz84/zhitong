// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const subjectCollection = db.collection('subjects')

/** @param:
 *      - subjectName: string
 *      - unitName: string
 *  @return:
 *      - { success: true }, if user is added successfully to database
 *      - { success: false }, if there is an exsiting user with same name
 */
exports.main = async (event, context) => {
  try {
    return await subjectCollection.get().then(res => {
      const sub = res.data.find(s => s.subject == event.subjectName && s.unit == event.unitName)
      var result = { success: false }
      if (sub) { return result }
      return subjectCollection.add({
        data: {
          subject: event.subjectName,
          unit: event.unitName
        }
      }).then(res => {
        var result = { success: true }
        return result
      })
    })
  } catch (e) {
    return {
      success: false
    }
  }
}
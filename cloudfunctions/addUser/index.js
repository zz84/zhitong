// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

/** @param:
 *      - isStudent: boolean
 *      - username: string
 *      - password: string
 *  @return:
 *      - { success: true }, if user is added successfully to database
 *      - { success: false }, if there is an exsiting user with same name
 */
exports.main = async (event, context) => {
  try {
    return await userCollection.add({
      data: {
        name: event.username,
        password: event.password,
        isStudent: event.isStudent
      }
    }).then( res => { 
      return { success: true }
    })
  } catch (e) {
    return { 
      success: false
    }
  }
}
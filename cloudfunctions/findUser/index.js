// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  return await userCollection.get().then(res => {
    const person = res.data.find(person => person.name == event.username)
    var result = {
      userNotExist: true,
      passwordIncorrect: true,
      isStudent: true
    }

    if (!person) {
      return result
    }

    result.userNotExist = false
    result.passwordIncorrect = person.password != event.password
    result.isStudent = person.isStudent
    
    return result
  })
}
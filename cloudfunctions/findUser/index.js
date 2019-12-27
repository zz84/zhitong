// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  return await userCollection.get().then(res => {
    const person = res.data.find(person => person.name == event.username)
    
    if (!person) {
      return { userNotExist: true }
    }

    if (person.password != event.password) {
      return { passwordIncorrect: true }
    }

    if (person.isStudent) {
      return { isStudent: true }
    }
    
    return { isStudent: false }
  })
}
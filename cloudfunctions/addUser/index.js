// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  return await userCollection.add({
    data:{
      name: "test",
      password: "test",
      isStudent: true
    }
  })
}

//调用时用 
// wx.cloud.callFunction({
//   name: "addUser"
// }).then(res => { console.log(res) })
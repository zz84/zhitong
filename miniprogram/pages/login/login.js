const db = wx.cloud.database()
const userCollection = db.collection('user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNotExist: false,
    passwordCorrect: true,
    username: "",
    password: ""
  },

  navigateToChangePassword: function (event) {
    wx.navigateTo({
      url: '../changePassword/changePassword',
    })
  },

  navigateToStudent: function () {
    wx.navigateTo({
      url: '../student/student',
    })
  },

  navigateToTeacher: function () {
    wx.navigateTo({
      url: '../teacher/teacher',
    })
  },

  tryLogIn: function (event) {
    wx.cloud.callFunction({
      name: "findUser",
      data: {
        username: this.data.username,
        password: this.data.password
      }
    }).then(res => {
      console.log("[数据库] [查询] 结果:", res.result)
      if (res.result.userNotExist) {
        this.setData({
          userNotExist: true
        })
        return
      } else if (res.result.passwordIncorrect) {
        this.setData({
          userNotExist: false,
          passwordCorrect: false
        })
        return
      }
 
      this.setData({
        userNotExist: false,
        passwordCorrect: true
      })

      if (res.result.isStudent) {
        this.navigateToStudent()
      } else {
        this.navigateToTeacher()
      }
    })
  },

  changeUsername: function (event) {
    this.setData({
      username: event.detail
    })
  },

  changePassword: function (event) {
    this.setData({
      password: event.detail
    })
  }
})
// pages/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    userNotExist: false,
    passwordCorrect: true,
    passwordNotMatch: false
  },

  changeUsername: function (event) {
    this.setData({
      username: event.detail
    })
  },

  changeOldPassword: function (event) {
    this.setData({
      oldPassword: event.detail
    })
  },

  changeNewPassword1: function (event) {
    this.setData({
      newPassword1: event.detail
    })
  },

  changeNewPassword2: function (event) {
    this.setData({
      newPassword2: event.detail
    })
  },

  tryChangePassword: function (event) {
    if (this.data.newPassword1 != this.data.newPassword2) {
      this.setData({
        passwordNotMatch: true
      })
      return
    }
    this.setData({
      passwordNotMatch: false
    })
    wx.cloud.callFunction({
      name: "findUser",
      data: {
        username: this.data.username,
        password: this.data.oldPassword
      }
    }).then(res => {
      console.log("[数据库] [user] [查询] 结果:", res.result)
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
      
      wx.cloud.callFunction({
        name: "changePassword",
        data: {
          username: this.data.username,
          newPassword: this.data.newPassword1
        }
      }).then(res => {
        console.log("[数据库] [user] [更改] 结果:", res.result)
        wx.navigateTo({
          url: '../login/login',
        })
      })
    })
  }
})
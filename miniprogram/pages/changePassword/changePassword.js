// pages/changePassword/changePassword.js
var username = null
var oldPassword = null
var newPassword1 = null
var newPassword2 = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNotExist: false,
    passwordCorrect: true,
    passwordNotMatch: false,
    passwordFormatCorrect:true,
    toastHidden: true
  },

  changeUsername: function (event) {
    username = event.detail
  },

  changeOldPassword: function (event) {
    oldPassword = event.detail
  },

  changeNewPassword1: function (event) {
    newPassword1 = event.detail
  },

  changeNewPassword2: function (event) {
    newPassword2 = event.detail
  },

  hideToast: function (event) {
    this.setData({
      toastHidden: true
    })
  },

  tryChangePassword: function (event) {
    if (!newPassword1 || newPassword1.length < 6) {
      this.setData({ passwordFormatCorrect: false })
      return
    }
    this.setData({ passwordFormatCorrect: true })

    if (newPassword1 != newPassword2) {
      this.setData({ passwordNotMatch: true })
      return
    }

    this.setData({ passwordNotMatch: false })

    wx.cloud.callFunction({
      name: "findUser",
      data: {
        username: username,
        password: oldPassword
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
          username: username,
          newPassword: newPassword1
        }
      }).then(res => {
        console.log("[数据库] [user] [更改] 结果:", res.result)
        this.setData({
          toastHidden: false
        })
        wx.navigateTo({
          url: '../login/login',
        })
      })
    })
  }
})
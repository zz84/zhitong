// pages/addStudent/addStudent.js
var username = null
var newPassword1 = null
var newPassword2 = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordNotMatch: false,
    passwordFormatCorrect: true,
    userExist: false,
    successToastHidden: true
  },

  changeUsername: function (event) {
    username = event.detail
  },

  changePassword1: function (event) {
    newPassword1 = event.detail
  },

  changePassword2: function (event) {
    newPassword2 = event.detail
  },

  hideSuccessToast: function (event) {
    this.setData({
      successToastHidden: true
    })
  },

  tryAddTeacher: function (event) {
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
        password: newPassword1
      }
    }).then(res => {
      console.log("[数据库] [user] [查询] 结果:", res.result)
      if (!res.result.userNotExist) {
        this.setData({ userExist: true })
        return
      }
      this.setData({ userExist: false })

      console.log("[数据库] [user] [添加] username:", username, ", password: ", newPassword1)

      wx.cloud.callFunction({
        name: "addUser",
        data: {
          username: username,
          password: newPassword1,
          isStudent: false
        }
      }).then(res => {
        if (res.result.success) {
          this.setData({
            successToastHidden: false
          })
        } else {
          wx.showToast({
            title: '添加老师失败',
            icon: 'none',
            image: '../../images/sad.png',
            duration: 1500,
            mask: false
          })
        }
      })
    })
  }
})
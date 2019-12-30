var username = null 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toastHidden: true,
    userNotExist: false
  },

  changeUsername: function (event) {
    username = event.detail
  },

  hideToast: function (event) {
    this.setData({
      toastHidden: true
    })
  },

  tryDeleteStudent: function (event) {
    wx.cloud.callFunction({
      name: "findUser",
      data: {
        username: username
      }
    }).then(res => {
      if (res.result.userNotExist || !res.result.isStudent) {
        this.setData({
          userNotExist: true
        })
        return
      }
      this.setData({
        userNotExist: false
      })
      wx.cloud.callFunction({
        name: "deleteUser",
        data: {
          username: username,
          isStudent: true
        }
      }).then(res => {
        if (res.result.success) {
          console.log("[数据库] [user] [删除] 用户名: ", username, ", isStudent: true")
          this.setData({
            toastHidden: false
          })
          return
        } else {
          wx.showToast({
            title: '删除学生失败',
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
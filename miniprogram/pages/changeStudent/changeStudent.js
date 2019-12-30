// pages/changeStudent/changeStudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navigateToAddStudent: function (event) {
    wx.navigateTo({
      url: '../addStudent/addStudent',
    })
  },

  navigateToDeleteStudent: function (event) {
    wx.navigateTo({
      url: '../deleteStudent/deleteStudent',
    })
  }
})
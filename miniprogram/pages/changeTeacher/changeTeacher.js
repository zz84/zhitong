
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navigateToAddTeacher: function (event) {
    wx.navigateTo({
      url: '../addTeacher/addTeacher',
    })
  },

  navigateToDeleteTeacher: function (event) {
    wx.navigateTo({
      url: '../deleteTeacher/deleteTeacher',
    })
  }
})
// pages/teacher/teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navigateToChooseStudent: function (event) {
    wx.navigateTo({
      url: '../chooseStudent/chooseStudent',
    })
  },

  navigateToChangeStudent: function (event) {
    wx.navigateTo({
      url: '../changeStudent/changeStudent',
    })
  },

  navigateToChangeTeacher: function (event) {
    wx.navigateTo({
      url: '../changeTeacher/changeTeacher',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})
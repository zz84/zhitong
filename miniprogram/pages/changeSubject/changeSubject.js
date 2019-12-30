
Page({

  data: {

  },

  navigateToAddSubject: function (event) {
    wx.navigateTo({
      url: '../addSubject/addSubject',
    })
  },

  navigateToDeleteSubject: function (event) {
    wx.navigateTo({
      url: '../deleteSubject/deleteSubject',
    })
  },
  navigateToAddUnit: function (event) {
    wx.navigateTo({
      url: '../addUnit/addUnit',
    })
  },

  navigateToDeleteUnit: function (event) {
    wx.navigateTo({
      url: '../deleteUnit/deleteUnit',
    })
  },

  navigateToAddTopic: function (event) {
    wx.navigateTo({
      url: '../addTopic/addTopic',
    })
  },

  navigateToDeleteTopic: function (event) {
    wx.navigateTo({
      url: '../deleteTopic/deleteTopic',
    })
  },
})
var app = getApp()

Page({

  data: {
    unitArray: [],
    addSuccess: true,
    addUnit: ''
  },

  onLoad: function (event) {
    this.setData({
      subject: app.globalData.subject
    })
    wx.cloud.callFunction({
      name: "loadUnits",
      data: {
        subjectName: this.data.subject
      }
    }).then(res => {
      this.setData({
        unitArray: res.result.result
      })
    })
  },

  onChangeAddUnit: function (event) {
    this.setData({
      addUnit: event.detail
    })
  },

  onAddUnit: function (event) {
    wx.cloud.callFunction({
      name: "addUnit",
      data: {
        subjectName: this.data.subject,
        unitName: this.data.addUnit
      }
    }).then(res => {
      console.log(res)
      if (!res.result.success) {
        this.setData({
          addSuccess: false
        })
        return
      } else {
        this.data.unitArray.push(this.data.addUnit)
        this.setData({
          addSuccess: true,
          addUnit: '',
          unitArray: this.data.unitArray
        })
        wx.showToast({
          title: '添加阶段成功',
          duration: 1000
        })
        return
      }
    })
  },

  onNavigateToChangeTopic: function (event) {
    app.globalData.unit = event.currentTarget.dataset.currentunit
    wx.navigateTo({
      url: '../changeTopic/changeTopic',
    })
  },

  removeElement: function (arr, ele) {
    var index = arr.indexOf(ele)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  },

  onDeleteUnit: function (event) {
    wx.cloud.callFunction({
      name: 'deleteSubject',
      data: {
        prop: {
          subject: this.data.subject,
          unit: event.currentTarget.dataset.currentunit
        }
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '删除阶段成功',
          duration: 1000
        })
        this.setData({
          unitArray: this.removeElement(
            this.data.unitArray,
            event.currentTarget.dataset.currentunit
          )
        })
      } else {
        wx.showToast({
          title: '删除阶段失败',
          icon: 'none',
          image: '../../images/sad.png',
          duration: 1000
        })
      }
    })
  }
})
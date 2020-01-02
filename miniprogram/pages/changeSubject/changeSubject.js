var app = getApp()

Page({

  data: {
    subjectArray: [],
    addSuccess: true,
    addSubject: ''
  },

  onLoad: function(event) {
    wx.cloud.callFunction({
      name: "loadSubjects"
    }).then(res => {
      this.setData({
        subjectArray: res.result.result
      })
    })
  },

  onChangeAddSubject: function(event) {
    this.setData({
      addSubject: event.detail
    })
  },

  onAddSubject: function(event) {
    wx.cloud.callFunction({
      name: "addSubject",
      data: {
        subjectName: this.data.addSubject
      }
    }).then(res => {
      console.log(res)
      if (!res.result.success) {
        this.setData({
          addSuccess: false
        })
        return
      } else {
        this.data.subjectArray.push(this.data.addSubject)
        this.setData({
          addSuccess: true,
          addSubject: '',
          subjectArray: this.data.subjectArray
        })
        wx.showToast({
          title: '添加科目成功',
          duration: 1000
        })
        return
      }
    })
  },

  onNavigateToChangeTopic: function(event) {
    app.globalData.subject = event.currentTarget.dataset.currentsubject
    wx.navigateTo({
      url: '../changeUnit/changeUnit',
    })
  },

  removeElement: function(arr, ele) {
    var index = arr.indexOf(ele)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  },

  onDeleteSubject: function(event) {
    wx.cloud.callFunction({
      name: 'deleteSubject',
      data: {
        prop: {
          subject: event.currentTarget.dataset.currentsubject
        }
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '删除科目成功',
          duration: 1000
        })
        this.setData({
          subjectArray: this.removeElement(
            this.data.subjectArray, 
            event.currentTarget.dataset.currentsubject
          )
        })
      } else {
        wx.showToast({
          title: '删除科目失败',
          icon: 'none',
          image: '../../images/sad.png',
          duration: 1000
        })
      }
    })
  }
})
var app = getApp()

Page({

  data: {
    topicArray: [],
    addSuccess: true,
    addTopic: '',
    addId: '',
    unit: 'unit',
    subject: 'subject'
  },

  onLoad: function (event) {
    this.setData({
      subject: app.globalData.subject,
      unit: app.globalData.unit
    })
    wx.cloud.callFunction({
      name: "loadTopic",
      data: {
        subjectName: this.data.subject,
        unitName: this.data.unit
      }
    }).then(res => {
      console.log(res)
      this.setData({
        topicArray: res.result.result
      })
    })
  },

  onChangeAddTopic: function (event) {
    this.setData({
      addTopic: event.detail
    })
  },

  onChangeAddId: function (event) {
    this.setData({
      addId: event.detail
    })
  },

  onAddTopic: function (event) {
    wx.cloud.callFunction({
      name: "addTopic",
      data: {
        subjectName: this.data.subject,
        unitName: this.data.unit,
        topicName: this.data.addTopic,
        topicId: this.data.addId
      }
    }).then(res => {
      console.log(res)
      if (!res.result.success) {
        this.setData({
          addSuccess: false
        })
        return
      } else {
        this.data.topicArray.push([this.data.addTopic, this.data.addId])
        this.setData({
          addSuccess: true,
          addTopic: '',
          addId: '',
          topicArray: this.data.topicArray
        })
        wx.showToast({
          title: '添加知识点成功',
          duration: 1000
        })
        return
      }
    })
  },

  removeElement: function (arr, ele) {
    var index = -1
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] == ele) {
        index = i
      }
    }
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  },

  onDeleteTopic: function (event) {
    console.log(event.currentTarget.dataset)
    wx.cloud.callFunction({
      name: 'deleteSubject',
      data: {
        prop: {
          subject: this.data.subject,
          unit: this.data.unit,
          topic: event.currentTarget.dataset.currenttopic[0]
        }
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '删除知识点成功',
          duration: 1000
        })
        this.setData({
          topicArray: this.removeElement(
            this.data.topicArray,
            event.currentTarget.dataset.currenttopic[0]
          )
        })
      } else {
        wx.showToast({
          title: '删除知识点失败',
          icon: 'none',
          image: '../../images/sad.png',
          duration: 1000
        })
      }
    })
  }
})
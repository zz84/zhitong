Page({

  data: {
    students: [],
    allStudents: [],
    selectedStudent: ""
  },

  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "loadStudent"
    }).then(res => {
      this.setData({
        students: res.result.result,
        allStudents: res.result.result,
        selectedStudent: res.result.result.length > 0 ? res.result.result[0] : ""
      })
    })
  },

  onSelectStudent: function (event) {
    const { picker, value, index } = event.detail;
    this.setData({
      selectedStudent: value
    })
  },

  onSearch: function (event) {
    const target = event.detail
    if (target == "") {
      this.setData({
        students: this.data.allStudents
      })
      return
    }

    var students = []
    this.data.allStudents.forEach(student => {
      if (student.indexOf(target) != -1) {
        students.push(student)
      }
    })
    this.setData({
      students: students
    })
  },

  onNavigateToChooseSubject: function (event) {
    getApp().globalData.selectedStudent = event.currentTarget.dataset.currentstudent
    wx.navigateTo({
      url: '../chooseSubject/chooseSubject',
    })
  }
})
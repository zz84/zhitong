Page({

  data: {
    subjectArray: ["九年级上", "欧拉班"]
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  onChange1(event) {
    this.setData({
      activeNames1: event.detail
    });
  },

  onChange2(event) {
    this.setData({
      activeNames2: event.detail
    });
  },

  onChangeRate1(event) {
    this.setData({
      rate1: event.detail
    });
  },

  onChangeRate2(event) {
    this.setData({
      rate2: event.detail
    });
  },

  onChangeRate3(event) {
    this.setData({
      rate3: event.detail
    });
  },

})
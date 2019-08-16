// pages/second/pages/video/video.js

//获取应用实例
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoTitle: '',
    videoUrl: '',
    videoAuthor: '',
    contentTip: '由于后台接口原因，视频具体内容无法编辑，只返回了一个视频链接...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      videoUrl:options.videoUrl
    })
    // const{ videoTitle } = options.videoTitle 不能用
    // console.log(options.videoTitle)
    // console.log(videoTitle) 不能用
    wx.setNavigationBarTitle({
      title: options.videoTitle
    })
    
    
  }

 })


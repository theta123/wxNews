Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitleName:[
      { name: '微视', nameID: '2019001', newsType: 'wwui' },
      { name: '访谈', nameID: '2019002', newsType: 'fhtj' },
      { name: '新闻', nameID: '2019003', newsType: 'xbwf' },
      { name: '专栏', nameID: '2019004', newsType: 'vrlj' },
      { name: '专题', nameID: '2019005', newsType: 'vrti' }
    ],

    //被点击导航栏标签索引
    currentIndexNav: 2019001,

    //轮播图数据
    swiperList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true, // 解决轮播最后一张倒退
    interval: 2000,
    duration: 500,
    
    //视频列表
    videosList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图
    this.getSwiperList();
    //获取视频列表 
    this.getVideosList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //点击首页导航按钮
  navTitleClick:function(e) {
    // console.log(123);
    this.setData({
      currentIndexNav: e.target.dataset.id
    })
  },

  //轮播图数据
  getSwiperList: function() {
    var that = this;
    wx.request({
      url: "https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList",
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
  },

  //视频列表数据
  getVideosList: function() {
    var that = this;
    wx.request({
      url: "https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList",
      success(res) {
        console.log(res);
        if (res.data.code === 0) {
          that.setData({
            videosList: res.data.data.videosList
          })
        }
      }
    })
  },

  watchDetail: function(e) {
    /*this.setData({
      videoUrl : 'http://vod.qss.gov.cn/20190815xw.mp4',
      videoTitle: e.currentTarget.dataset.videotitle || '',
      videoAuthor : e.currentTarget.dataset.videoauthor || ''
    })*/
    let videoUrl='http://vod.qss.gov.cn/20190815xw.mp4'
    let videoTitle= e.currentTarget.dataset.videotitle || ''
    let videoAuthor = e.currentTarget.dataset.videoauthor || ''
    wx.navigateTo({
      url: './pages/video/video?videoTitle=' + videoTitle +'&videoUrl='+videoUrl
    })
  }
})
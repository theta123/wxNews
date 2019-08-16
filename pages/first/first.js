const app = getApp()
const appKey = 'fc35d7872c25744ab4669c7d9dbcf15e' // 用于访问新闻接口的appKey
const request = require('../../utils/request.js')
const extractArticleInfo = require('./utils/getArticleTime.js')
const shuffle = require('./utils/shuffle.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // headertitle
    headerTitleName: [
      { name: '首页', nameID: '201901', newsType: 'top' },
      { name: '概要', nameID: '201902', newsType: 'junshi' },
      { name: '要闻', nameID: '201903', newsType: 'tiyu' },
      { name: '网视', nameID: '201904', newsType: 'keji' },
      { name: '电视', nameID: '201905', newsType: 'caijing' },
      { name: '部门', nameID: '201906', newsType: 'shehui' },
      { name: '乡镇', nameID: '201907', newsType: 'shishang' },
      { name: '社会', nameID: '201908', newsType: 'yule' },
      { name: '经济', nameID: '201909', newsType: 'guonei' },
      { name: '文化', nameID: '2019010', newsType: 'guoji' },
      { name: '旅游', nameID: '2019011', newsType: 'guoji' },
      { name: '教体', nameID: '2019012', newsType: 'guoji' },
      { name: '健康', nameID: '2019013', newsType: 'guoji' },
      { name: '专题', nameID: '2019014', newsType: 'guoji' }
    ],
    tapID: 201901,
    // swiper
    swpPic: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular:true, // 解决轮播最后一张倒退
    interval: 2000,
    duration: 500,

    // 横向列表
    hlist1:[
      {
        id:'t1',
        name:'阳光政务',
        icon:'../../images/icon_councils.png'
      },
      {
        id: 't2',
        name: '走进潜山',
        icon: '../../images/icon_travel.png'
      },
      {
        id: 't3',
        name: '聚焦专题',
        icon: '../../images/icon_special.png'
      }
    ],
    news: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setSwpArticle(that, 'keji');
    this.getNewsList(that,'keji');
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

  // headerBar 点击
  headerTitleClick: function (e) {
    this.setData({ tapID: e.target.dataset.id })
    //this.renderPage(e.currentTarget.dataset.newstype, false)
    this.getNewsList(this,e.currentTarget.dataset.newsType)
  },

  setSwpArticle:function(that, newsType) {
    // 访问聚合数据的网络接口-科技新闻
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index',
      data: {
        type: newsType,
        //key: '482e213ca7520ff1a8ccbb262c90320a'
        key:appKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            swpPic: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  getNewsList: function(that,newsType) {
    // 访问聚合数据的网络接口-科技新闻
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index',
      data: {
        type: newsType,
        //key: '482e213ca7520ff1a8ccbb262c90320a'
        key:appKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            news: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  //跳转到新闻详情页
  viewDetail: function (e) {
    let newsUrl = e.currentTarget.dataset.newsurl || ''
    let newsTitle = e.currentTarget.dataset.newstitle || ''
    let newsAuthor = e.currentTarget.dataset.newsauthor || ''
    wx.navigateTo({
      url: './pages/detail/detail?newsUrl=' + newsUrl
    })
  },


  renderPage: function (newsType, isRefresh, calllBack) {
    if (!isRefresh) {
      wx.showLoading({
        title: '加载中'
      }
    )
    request({ url: `https://v.juhe.cn/toutiao/index?type=${newsType}&key=${appKey}`, newstype: newsType })
      .then(res => {
        wx.hideLoading()
        let { articleList, swpPic } = extractArticleInfo(res.result.data)
        this.setData({
          contentNewsList: articleList,
          swpPic
        })
        if (calllBack) {
          calllBack()
        }
      })
      .catch(error => {
        wx.hideLoading()
      })
     } else {
       // 数组随机排序，模拟刷新
       let contentNewsListTemp = shuffle(JSON.parse(JSON.stringify(this.data.contentNewsList)))
       /* contentNewsListTemp.sort(() => {
         return Math.random() > 0.5 ? -1 : 1
       }) */
       setTimeout(() => {
         this.setData({
           contentNewsList: contentNewsListTemp
         })
         if (calllBack) {
           calllBack()
         }
       }, 2000)
     }
  },

})
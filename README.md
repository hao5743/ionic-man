#Ionic Man - ionichina社区客户端
-----
作者：hao5743@163.com

业余时间使用ionic2+angular2+typescript开发的一个ionichina社区客户端，支持android和ios，欢迎同志们提出改进建议，任何建议、bug、疑问可发送到邮箱。
对你有帮助的话，请给个star鼓励吧。开源地址[https://github.com/hao5743/ionic-man](https://github.com/hao5743/ionic-man)

## 基本功能
* 话题列表、详情
* 评论查看、发表，点赞
* 查看用户资料
* 消息查看、标记已读
* 查看个人发表、参与的话题
* 等等

## 附加功能

* 缓存。话题列表、详情离线缓存，用户资料离线缓存，方便离线使用
* 草稿。未登录、离线时可以保存草稿到本地，以后再发布。
* 登录历史。保存登录历史，方便再次登录，避免重复输入token

## 安装步骤

```bash
$ git clone https://github.com/hao5743/ionic-man.git
$ npm install
$ ionic serve
# 或者
$ cordova platform add ios/android
$ ionic run ios/android
```

## 开发环境

这是我的开发环境，测试可以正常运行。（环境不同有可能会遇到不同的问题）

```
Cordova CLI: 6.4.0 
Ionic CLI Version: 2.1.18
Ionic App Lib Version: 2.1.9
ios-deploy version: 1.9.0 
ios-sim version: 5.0.11 
OS: macOS Sierra
Node Version: v7.2.0
Xcode version: Xcode 8.2.1 Build version 8C1002
```

## 已发现的问题

* android客户端第一次启动缓慢且有白屏。谷歌找了一下解决方法，目前还没有解决。这个是官方的一个issue[https://github.com/driftyco/ionic/issues/6776](https://github.com/driftyco/ionic/issues/6776)

## 下一步改进

* 二维码扫描登录
* 修复android启动缓慢问题
* 消息通知推送
* 上线AppStore、豌豆荚

## 说明
* 在开发中遇到了诸多的小问题，比如scroll跳转，tabbar隐藏，date显示格式化显示，本地缓存策略，http错误的捕获和处理，项目结构，页面模块化，page的加载流程（constructor,willload,ngOninit,didload,willenter,didenter等），
angular2自定义pipe、component，ionic2中splash、icon的制作问题，有空的时候和大家分享我的解决方法。
* 此项目仅限学习交流使用，不允许用于商业用途

## 联系
* hao5743@163.com
* qq 310741531

### 截图

 话题列表

 ![topiclist.jpeg](http://r.ionichina.com/FvFmGVovEkeHneHnJDnfBH4T644k)

 话题详情

 ![topic.jpeg](http://r.ionichina.com/FjqutCvpECKDry69XNby48krFjxc) 

 回复

 ![reply.jpeg](http://r.ionichina.com/FqovFQLA0mgZbojSThihbBpfVzVA)

 个人信息

 ![me.jpeg](http://r.ionichina.com/FpP7WOB7c0iqyHm16Piog6MEKpwc)

 话题
 
 ![topic2.png](http://r.ionichina.com/FisbmPOTahqdAI1jDhyKIpR7Zsw_)

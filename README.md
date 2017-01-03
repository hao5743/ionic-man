#Ionic Man - ionichina社区客户端
-----
作者：hao5743@163.com

业余时间使用ionic2+angular2+typescript开发的一个ionichina社区客户端，支持android和ios，欢迎同志们提出改进建议，任何建议、bug、疑问可发送到邮箱。
对你有帮助的话，请给个star鼓励吧

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

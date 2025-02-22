## 一、 koa4browser简介
简单来说，这是 KOA 在浏览器端的实现，用来在 PWA 应用开发过程中，使开发者获得开发传统 B/S 应用的开发体验。这个想法脱胎于 Web IM 的 express4browser,用以解决 Web IM 开发过程中一些不好的体验，比如作为一个纯 Node.js 开发者，去做一些页面开发，显然是会遇到很多麻烦，而对于一个擅长前端开发的同学，去做一些底层逻辑上的处理，同样会显得吃力；另外从分层角度讲，前端的同学只需要负责做好页面，然后在页面中调用底层提供的类 Restful 规范接口，比如建立一个 RTC 链接，只需要告诉底层我要连接谁，剩下的由底层去负责完成。这样开发效率会显著提高，不同人员也能够各司其职，做自己擅长的事情，减少内耗。
由于 express4browser 与 Web IM 高度耦合，不能作为一个可用的 package 抽离出来供大家使用，所以最近研究了大量的 Koa/express 及其插件的源码，认为 Koa 的设计更加优雅，所以希望重新抽离出一个可用的，无依赖的纯 JS package。

## 二、 快速入门
### Demo with React
#### 1. 服务层：
```

// 导入koa4browser
import App, {Router} from 'koa4browser';
// 实例化服务
let app = new App();
// 初始化路由
let router = new Router();
router.get('test/name', async (ctx, next)=>{
  console.log('test name 1');
  await next();
  console.log('after test name 1');
}, async (ctx, next)=>{
  console.log('test name 2');
  await next();
  console.log('after test name 2');
})

app.use(router.routes());
app.use(async (ctx, next)=> {
  console.log('start 1');
  await next();
  console.log('end 1');
});
app.use(async (ctx, next)=> {
  console.log('start 2');
  await next();
  console.log('end 2');
})
app.listen();
```
#### 2. UI层
```
import request from 'request4browser';
request({
    method: 'GET',
    path: 'test/name',
  },(err, res)=>{
    if (err) {
      console.log(err);
    }
    console.log(res);
})
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={()=>testRequest()}>
            快来点我
        </button>
      </header>
    </div>
  );
}
```

## 三、通信协议
在常规B/S请求-响应模型中，浏览器与服务器基于HTTP/HTTPS协议，借助网络信道进行通信，所有前后端语言，都对HTTP协议进行了实现。而对于PWA应用，服务(逻辑)层和UI层都运行在浏览器中，之所以对PWA应用进行分层，是为了应用开发过程中，职责划分更加清新，有负责业务逻辑的（基于koa4browser开发服务层应用），有负责页面开发的（可以使用Angular,Vue, React等）。通信协议解决的是服务层与UI层互相理解，互相配合的规范。
### 1. 数据格式
#### 1.1 请求体：
```
{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',  // 请求方法
    header(可选): {},                           // 保留字段，暂未定义
    requestId: string,                          // 用于标识每个请求
    path: string,                               // 请求路径 
    body(可选): any                             // 请求body体
}
```

#### 1.2 响应体：
```
{
    header(可选): {},                 // 保留字段，暂未定义
    statusCode： number               // 状态码，200：请求成功， 401：无权限访问  404：找不到接口
    body(可选)：any                   // 响应body体
}
```
### 2. 通信信道
在常规的B/S请求响应模型中，借助于HTTP/HTTPS进行网络请求，由于在PWA应用中，UI层和服务层不存在跨网络访问情况，而是存在相同的内存或者window对象里，所以我们可以采用共享内存的方式，比如map，共享内存是比较可行的方式。由于UI层和服务层在逻辑上是分离的，所以map不能交由任何一方来管理,否则会出现耦合，需要通过第三方。那我们可以定义一个npm包来维护路由和处理逻辑，双方共同引用此包，便可以实现共享内存，事件监听触发的方式来实现UI层和服务层的通信。此包我们定义为event-emitter4browser,由request4browser和koa4browser共同引用，当然用户也可以基于event-emmitter4browser和约定的通信协议来定义自己的request4browser。所以标题中的通信信道便为event-emitter4browser。


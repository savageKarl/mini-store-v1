# 项目说明

原生微信小程序全局状态管理工具，轻量，便捷，高性能，响应式。

## 安装

```
npm i @savage181855/mini-store -S
```

## 快速入门

在`app.js`文件调用全局 api，这一步是必须的！！！

```javascript
import { proxyPage, proxyComponent } from "@savage181855/mini-store";

// 代理页面，让页面可以使用状态管理工具
proxyPage();
// 代理页面，让组件可以使用状态管理工具
proxyComponent();

// 这样子就结束了，很简单
```

定义`store.js`文件，模块化管理

```javascript
import { defineStore } from "@savage181855/mini-store";

const useStore = defineStore({
  state: {
    count: 0,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export default useStore;
```

`indexA.js`页面

```javascript
// 导入定义的 useStore
import useStore from "../xxxx/store.js";

Page({
  // 注意：这里使用 useStore 即可，可以在this.data.store 访问 store
  useStoreRef: useStore,
  // 表示需要使用的全局状态，会自动挂载在到当前data里面，自带响应式
  mapState: ["count"],
  // 表示想要映射的全局actions，可以直接在当前页面调用 ，例如：this.increment()
  mapActions: ["increment"],
  onIncrement1() {
    // 不推荐
    this.data.store.count++;
  },
  onIncrement2() {
    this.data.store.patch({
      count: this.data.store.count++,
    });
  },
  onIncrement3() {
    this.data.store.patch((store) => {
      store.count++;
    });
  },
  onIncrement4() {
    this.data.store.increment();
  },
});
```

`indexA.wxml`

```html
<view>
  <view>indexA</view>
  <view>{{count}}</view>
  <button type="primary" bindtap="increment">+1</button>
  <button type="primary" bindtap="onIncrement1">+1</button>
  <button type="primary" bindtap="onIncrement2">+1</button>
  <button type="primary" bindtap="onIncrement3">+1</button>
  <button type="primary" bindtap="onIncrement4">+1</button>
</view>
```

`indexB.js`页面

```javascript
// 导入定义的 useStore
import useStore from "../xxxx/store.js";

Page({
  // 注意：这里使用 useStore 即可，可以在 this.data.store 访问 store
  useStoreRef: useStore,
  // 表示需要使用的全局状态，会自动挂载在到当前data里面，自带响应式
  mapState: ["count"],
});
```

`indexB.wxml`

```html
<view>
  <view>indexB</view>
  <view>{{count}}</view>
</view>
```

import { deepClone } from './utils'

const EventCenter = {
  subscribeList: {},
  // 储存已发布未订阅的消息
  pubAndNoSub: {},
  subscribe(name, fn) {
    if (this.pubAndNoSub[name]) {
      fn(this.pubAndNoSub[name]);
      Reflect.deleteProperty(this.pubAndNoSub, name);
    }
    this.subscribeList[name]?.push(fn) || (this.subscribeList[name] = [fn]);
  },
  publish(name, value) {
    const fns = this.subscribeList[name];
    if (!fns || fns.length === 0) {
      this.pubAndNoSub[name] = value;
    } else {
      fns.forEach((fn) => fn(value));
    }
  },
  remove(name, fn) {
    const fns = this.subscribeList[name];
    if (!fns || fns.length === 0) return;
    if (fn) {
      fns.forEach((_fn, index) => {
        if (_fn === fn) {
          this.subscribeList[name].splice(index, 1);
        }
      });
    } else {
      this.subscribeList[name] = [];
    }
  },
};



export function installEventerCenter(obj) {
  const cloneObj = deepClone(EventCenter);
  for (let k in EventCenter) obj[k] = cloneObj[k]
}

export default EventCenter;
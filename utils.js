
// a[3].b -> a.3.b -> [a, 3, b]
/** lodash get方法 */
export function get(data, path) {
  const paths = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/\["(\w+)"\]/g, ".$1")
    .replace(/\['(\w+)'\]/g, ".$1")
    .split(".").map((item) => `?.['${item}']`).join('');

  return Function(`return this${paths}`).call(data);
}

/** 对象浅比较，只比较第一层数据 */
export function isSameShallow(o1, o2) {
  if (o1 === o2) return true;

  // 如果基本类型不相等或者不是引用类型，并且不是对象就不用执行了
  if (
    typeof o1 !== 'object' ||
    o1 === null ||
    typeof o2 !== 'object' ||
    o2 === null
  ) {
    return false;
  }

  const len1 = Object.keys(o1).length;
  const len2 = Object.keys(o2).length;

  if (len1 !== len2) return false;
  for (let key of Object.keys(o1)) {
    if (o1[key] !== o2[key]) return false;
  }

  return true;
}

/** 对象深比较，比较所有层数据， 深比较主要的点在于，Object或Array实例的每一个属性，基本类型或者特殊构造器类型是否相同 */
export function isSameDeep(o1, o2) {
  if (o1 === o2) return true;
  // 如果基本类型不相等或者不是引用类型，并且不是对象类型的话，下面就不用执行了
  if (
    typeof o1 !== 'object' ||
    o1 === null ||
    typeof o2 !== 'object' ||
    o2 === null
  ) {
    return false;
  }

  // 这里要判断特殊的构造器类型，并且排除 Object 和 Array
  const reg = /Number|Boolean|String|Null|Undefined|Symbol|Function|RegExp|Date/;
  const o1String = Object.prototype.toString.call(o1).slice(8, -1);
  const o2String = Object.prototype.toString.call(o2).slice(8, -1);

  if (o1String !== 'Object' && o1String !== 'Array' && o2String !== 'Object' && o2String !== 'Object') {
    if (reg.exec(o1String)[0] === reg.exec(o2String)[0] && o1String === o2String) {
      return true;
    }
  }
  const len1 = Object.keys(o1).length;
  const len2 = Object.keys(o2).length;

  if (len1 !== len2) return false;
  for (let key of Object.keys(o1)) {
    const result = isSameDeep(o1[key], o2[key]);
    if (!result) return result;
  }

  return true;
}

/** 深克隆，深克隆主要的点在于，复制Object或Array实例的每一个属性，基本类型和特殊构造器类型*/
export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const reg = /Number|Boolean|String|Null|Undefined|Symbol|Function|RegExp|Date/;
  if (reg.test(Object.prototype.toString.call(obj))) {
    return obj;
  }

  const o = (obj.constructor === 'Array') ? [] : {};
  for (let i in obj) {
    o[i] = (typeof obj[i] === 'object') ? deepClone(obj[i]) : obj[i];
  }

  return o;
}

export function isObject(value) {
  return (value !== null) && (typeof value === 'object');
}

export function hasChanged(value, oldValue) {
  return !isSameDeep(value, oldValue);
}
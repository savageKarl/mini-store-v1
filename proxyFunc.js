export function proxyPage(globalOptions = {}) {
  const OriginPage = Page;
  Page = function (options) {
    const newOptions = {
      ...globalOptions,
      ...options,
      onLoad() {
        // useStoreRef 是 store 的函数引用，不能传函数调用进来
        if (options.useStoreRef) {
          options.useStoreRef(this, options.mapState, options.mapActions);
        }
        globalOptions?.onLoad?.call(this, ...arguments);
        options?.onLoad?.call(this, ...arguments);
      },
    };

    const mixinHooks = ['onShow', 'onReady', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onPageScroll', 'onResize', 'onTabItemTap'];
    mixinHooks.forEach(name => {
      newOptions[name] = function () {
        globalOptions?.[name]?.call(this, ...arguments);
        options?.[name]?.call(this, ...arguments);
      }
    })
    OriginPage(newOptions);
  };
}

export function proxyComponent(globalOptions = {}) {
  const OriginComponent = Component;
  Component = function (options) {
    const newOptions = {
      ...globalOptions,
      ...options,
      lifetimes: {
        attached() {
          if (options.useStoreRef) {
            options.useStoreRef(this, options.mapState, options.mapActions);
          }
          options?.lifetimes?.attached?.call(this, ...arguments);
          globalOptions?.lifetimes?.attached?.call(this, ...arguments);
        },
        detached() {
          if (options.useStoreRef) {
            this.data.store.cancelUse(this);
          }
          options?.lifetimes.detached?.call(this, ...arguments);
          globalOptions?.lifetimes?.detached?.call(this, ...arguments)
        }
      },
    };
    OriginComponent(newOptions);
  };
}
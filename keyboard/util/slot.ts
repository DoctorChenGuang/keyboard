class Slot {
  public around(pointcut: string, advice: any, namespaces): any {
    if (namespaces == undefined || namespaces.length == 0)
      namespaces = [(function () { return this; }).call(null)];

    for (var i in namespaces) {
      var ns = namespaces[i];
      for (var member in ns) {
        if (typeof ns[member] == 'function' && member.match(pointcut)) {
          (function (fn, fnName, ns) {

            ns[fnName] = function () {
              let _this = this;
              return advice.call(_this, {
                fn: fn,
                fnName: fnName,
                arguments: arguments
              });
            };
          })(ns[member], member, ns);
        }
      }
    }
  }

  public next(f: any): any {
    return f.fn.apply(this, f.arguments);
  }

  public before(pointcut, advice, namespaces) {
    let _this = this;
    this.around(pointcut, (f) => {
      advice.apply(this, f.arguments);
      return _this.next.call(this, f);
    }, namespaces);
  }

  //对于this的指向问题需要优化
  public after(pointcut, advice, namespaces) {
    let _this = this;
    this.around(pointcut, function (f) {
      var ret = _this.next.call(this, f);
      advice.apply(this, f.arguments);
      return ret;
    }, namespaces);
  }
};

let SlotDom = new Slot();

export {
  SlotDom
};

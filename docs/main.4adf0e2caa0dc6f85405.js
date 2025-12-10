(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    0: function(t, e, n) {
        t.exports = n("zUnb")
    },
    "8tg8": function(t, e) {
        function n(t) {
            var e = /\.[^.]*$/.exec(t);
            return e ? e.index + 1 : t.length
        }
        function i(t, e, n) {
            if (t.reduce)
                return t.reduce(e, n);
            for (var i = 0, s = arguments.length >= 3 ? n : t[i++]; i < t.length; i++)
                e(s, t[i], i);
            return s
        }
        function s(t, e) {
            if (t.forEach)
                return t.forEach(e);
            for (var n = 0; n < t.length; n++)
                e.call(t, t[n], n)
        }
        function r(t, e) {
            if (t.map)
                return t.map(e);
            for (var n = [], i = 0; i < t.length; i++)
                n.push(e.call(t, t[i], i));
            return n
        }
        t.exports = function(t, e) {
            e || (e = {});
            var o = void 0 === e.hsep ? "  " : e.hsep,
                a = e.align || [],
                l = e.stringLength || function(t) {
                    return String(t).length
                },
                c = i(t, function(t, e) {
                    return s(e, function(e, i) {
                        var s = n(e);
                        (!t[i] || s > t[i]) && (t[i] = s)
                    }), t
                }, []),
                h = r(t, function(t) {
                    return r(t, function(t, e) {
                        var i = String(t);
                        if ("." === a[e]) {
                            var s = n(i),
                                r = c[e] + (/\./.test(i) ? 1 : 2) - (l(i) - s);
                            return i + Array(r).join(" ")
                        }
                        return i
                    })
                }),
                u = i(h, function(t, e) {
                    return s(e, function(e, n) {
                        var i = l(e);
                        (!t[n] || i > t[n]) && (t[n] = i)
                    }), t
                }, []);
            return r(h, function(t) {
                return r(t, function(t, e) {
                    var n = u[e] - l(t) || 0,
                        i = Array(Math.max(n + 1, 1)).join(" ");
                    return "r" === a[e] || "." === a[e] ? i + t : "c" === a[e] ? Array(Math.ceil(n / 2 + 1)).join(" ") + t + Array(Math.floor(n / 2 + 1)).join(" ") : t + i
                }).join(o).replace(/\s+$/, "")
            }).join("\n")
        }
    },
    zUnb: function(t, e, n) {
        "use strict";
        function i(t) {
            return "function" == typeof t
        }
        n.r(e);
        let s = !1;
        const r = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(t) {
                if (t) {
                    const t = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
                } else
                    s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                s = t
            },
            get useDeprecatedSynchronousErrorHandling() {
                return s
            }
        };
        function o(t) {
            setTimeout(() => {
                throw t
            }, 0)
        }
        const a = {
                closed: !0,
                next(t) {},
                error(t) {
                    if (r.useDeprecatedSynchronousErrorHandling)
                        throw t;
                    o(t)
                },
                complete() {}
            },
            l = (() => Array.isArray || (t => t && "number" == typeof t.length))();
        function c(t) {
            return null !== t && "object" == typeof t
        }
        const h = (() => {
            function t(t) {
                return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t, e) => `${e + 1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
            }
            return t.prototype = Object.create(Error.prototype), t
        })();
        let u = (() => {
            class t {
                constructor(t)
                {
                    this.closed = !1,
                    this._parentOrParents = null,
                    this._subscriptions = null,
                    t && (this._ctorUnsubscribe = !0, this._unsubscribe = t)
                }
                unsubscribe()
                {
                    let e;
                    if (this.closed)
                        return;
                    let {_parentOrParents: n, _ctorUnsubscribe: s, _unsubscribe: r, _subscriptions: o} = this;
                    if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t)
                        n.remove(this);
                    else if (null !== n)
                        for (let t = 0; t < n.length; ++t)
                            n[t].remove(this);
                    if (i(r)) {
                        s && (this._unsubscribe = void 0);
                        try {
                            r.call(this)
                        } catch (a) {
                            e = a instanceof h ? d(a.errors) : [a]
                        }
                    }
                    if (l(o)) {
                        let t = -1,
                            n = o.length;
                        for (; ++t < n;) {
                            const n = o[t];
                            if (c(n))
                                try {
                                    n.unsubscribe()
                                } catch (a) {
                                    e = e || [],
                                    a instanceof h ? e = e.concat(d(a.errors)) : e.push(a)
                                }
                        }
                    }
                    if (e)
                        throw new h(e)
                }
                add(e)
                {
                    let n = e;
                    if (!e)
                        return t.EMPTY;
                    switch (typeof e) {
                    case "function":
                        n = new t(e);
                    case "object":
                        if (n === this || n.closed || "function" != typeof n.unsubscribe)
                            return n;
                        if (this.closed)
                            return n.unsubscribe(), n;
                        if (!(n instanceof t)) {
                            const e = n;
                            n = new t,
                            n._subscriptions = [e]
                        }
                        break;
                    default:
                        throw new Error("unrecognized teardown " + e + " added to Subscription.")
                    }
                    let {_parentOrParents: i} = n;
                    if (null === i)
                        n._parentOrParents = this;
                    else if (i instanceof t) {
                        if (i === this)
                            return n;
                        n._parentOrParents = [i, this]
                    } else {
                        if (-1 !== i.indexOf(this))
                            return n;
                        i.push(this)
                    }
                    const s = this._subscriptions;
                    return null === s ? this._subscriptions = [n] : s.push(n), n
                }
                remove(t)
                {
                    const e = this._subscriptions;
                    if (e) {
                        const n = e.indexOf(t);
                        -1 !== n && e.splice(n, 1)
                    }
                }
            }
            return t.EMPTY = function(t) {
                return t.closed = !0, t
            }(new t), t
        })();
        function d(t) {
            return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), [])
        }
        const p = (() => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();
        class f extends u {
            constructor(t, e, n)
            {
                switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                case 0:
                    this.destination = a;
                    break;
                case 1:
                    if (!t) {
                        this.destination = a;
                        break
                    }
                    if ("object" == typeof t) {
                        t instanceof f ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, t));
                        break
                    }
                default:
                    this.syncErrorThrowable = !0,
                    this.destination = new m(this, t, e, n)
                }
            }
            [p]()
            {
                return this
            }
            static create(t, e, n)
            {
                const i = new f(t, e, n);
                return i.syncErrorThrowable = !1, i
            }
            next(t)
            {
                this.isStopped || this._next(t)
            }
            error(t)
            {
                this.isStopped || (this.isStopped = !0, this._error(t))
            }
            complete()
            {
                this.isStopped || (this.isStopped = !0, this._complete())
            }
            unsubscribe()
            {
                this.closed || (this.isStopped = !0, super.unsubscribe())
            }
            _next(t)
            {
                this.destination.next(t)
            }
            _error(t)
            {
                this.destination.error(t),
                this.unsubscribe()
            }
            _complete()
            {
                this.destination.complete(),
                this.unsubscribe()
            }
            _unsubscribeAndRecycle()
            {
                const {_parentOrParents: t} = this;
                return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
            }
        }
        class m extends f {
            constructor(t, e, n, s)
            {
                let r;
                super(),
                this._parentSubscriber = t;
                let o = this;
                i(e) ? r = e : e && (r = e.next, n = e.error, s = e.complete, e !== a && (o = Object.create(e), i(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))),
                this._context = o,
                this._next = r,
                this._error = n,
                this._complete = s
            }
            next(t)
            {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: e} = this;
                    r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }
            error(t)
            {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this,
                        {useDeprecatedSynchronousErrorHandling: n} = r;
                    if (this._error)
                        n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                    else if (e.syncErrorThrowable)
                        n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t),
                        this.unsubscribe();
                    else {
                        if (this.unsubscribe(), n)
                            throw t;
                        o(t)
                    }
                }
            }
            complete()
            {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this;
                    if (this._complete) {
                        const e = () => this._complete.call(this._context);
                        r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
                    } else
                        this.unsubscribe()
                }
            }
            __tryOrUnsub(t, e)
            {
                try {
                    t.call(this._context, e)
                } catch (n) {
                    if (this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling)
                        throw n;
                    o(n)
                }
            }
            __tryOrSetError(t, e, n)
            {
                if (!r.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                try {
                    e.call(this._context, n)
                } catch (i) {
                    return r.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = i, t.syncErrorThrown = !0, !0) : (o(i), !0)
                }
                return !1
            }
            _unsubscribe()
            {
                const {_parentSubscriber: t} = this;
                this._context = null,
                this._parentSubscriber = null,
                t.unsubscribe()
            }
        }
        const g = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")();
        function _(t) {
            return t
        }
        let y = (() => {
            class t {
                constructor(t)
                {
                    this._isScalar = !1,
                    t && (this._subscribe = t)
                }
                lift(e)
                {
                    const n = new t;
                    return n.source = this, n.operator = e, n
                }
                subscribe(t, e, n)
                {
                    const {operator: i} = this,
                        s = function(t, e, n) {
                            if (t) {
                                if (t instanceof f)
                                    return t;
                                if (t[p])
                                    return t[p]()
                            }
                            return t || e || n ? new f(t, e, n) : new f(a)
                        }(t, e, n);
                    if (s.add(i ? i.call(s, this.source) : this.source || r.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), r.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown))
                        throw s.syncErrorValue;
                    return s
                }
                _trySubscribe(t)
                {
                    try {
                        return this._subscribe(t)
                    } catch (e) {
                        r.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e),
                        function(t) {
                            for (; t;) {
                                const {closed: e, destination: n, isStopped: i} = t;
                                if (e || i)
                                    return !1;
                                t = n && n instanceof f ? n : null
                            }
                            return !0
                        }(t) ? t.error(e) : console.warn(e)
                    }
                }
                forEach(t, e)
                {
                    return new (e = b(e))((e, n) => {
                        let i;
                        i = this.subscribe(e => {
                            try {
                                t(e)
                            } catch (s) {
                                n(s),
                                i && i.unsubscribe()
                            }
                        }, n, e)
                    })
                }
                _subscribe(t)
                {
                    const {source: e} = this;
                    return e && e.subscribe(t)
                }
                [g]()
                {
                    return this
                }
                pipe(...t)
                {
                    return 0 === t.length ? this : (0 === (e = t).length ? _ : 1 === e.length ? e[0] : function(t) {
                        return e.reduce((t, e) => e(t), t)
                    })(this);
                    var e
                }
                toPromise(t)
                {
                    return new (t = b(t))((t, e) => {
                        let n;
                        this.subscribe(t => n = t, t => e(t), () => t(n))
                    })
                }
            }
            return t.create = e => new t(e), t
        })();
        function b(t) {
            if (t || (t = r.Promise || Promise), !t)
                throw new Error("no Promise impl found");
            return t
        }
        const v = (() => {
            function t() {
                return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
            }
            return t.prototype = Object.create(Error.prototype), t
        })();
        class w extends u {
            constructor(t, e)
            {
                super(),
                this.subject = t,
                this.subscriber = e,
                this.closed = !1
            }
            unsubscribe()
            {
                if (this.closed)
                    return;
                this.closed = !0;
                const t = this.subject,
                    e = t.observers;
                if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed)
                    return;
                const n = e.indexOf(this.subscriber);
                -1 !== n && e.splice(n, 1)
            }
        }
        class C extends f {
            constructor(t)
            {
                super(t),
                this.destination = t
            }
        }
        let x = (() => {
            class t extends y {
                constructor()
                {
                    super(),
                    this.observers = [],
                    this.closed = !1,
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                [p]()
                {
                    return new C(this)
                }
                lift(t)
                {
                    const e = new E(this, this);
                    return e.operator = t, e
                }
                next(t)
                {
                    if (this.closed)
                        throw new v;
                    if (!this.isStopped) {
                        const {observers: e} = this,
                            n = e.length,
                            i = e.slice();
                        for (let s = 0; s < n; s++)
                            i[s].next(t)
                    }
                }
                error(t)
                {
                    if (this.closed)
                        throw new v;
                    this.hasError = !0,
                    this.thrownError = t,
                    this.isStopped = !0;
                    const {observers: e} = this,
                        n = e.length,
                        i = e.slice();
                    for (let s = 0; s < n; s++)
                        i[s].error(t);
                    this.observers.length = 0
                }
                complete()
                {
                    if (this.closed)
                        throw new v;
                    this.isStopped = !0;
                    const {observers: t} = this,
                        e = t.length,
                        n = t.slice();
                    for (let i = 0; i < e; i++)
                        n[i].complete();
                    this.observers.length = 0
                }
                unsubscribe()
                {
                    this.isStopped = !0,
                    this.closed = !0,
                    this.observers = null
                }
                _trySubscribe(t)
                {
                    if (this.closed)
                        throw new v;
                    return super._trySubscribe(t)
                }
                _subscribe(t)
                {
                    if (this.closed)
                        throw new v;
                    return this.hasError ? (t.error(this.thrownError), u.EMPTY) : this.isStopped ? (t.complete(), u.EMPTY) : (this.observers.push(t), new w(this, t))
                }
                asObservable()
                {
                    const t = new y;
                    return t.source = this, t
                }
            }
            return t.create = (t, e) => new E(t, e), t
        })();
        class E extends x {
            constructor(t, e)
            {
                super(),
                this.destination = t,
                this.source = e
            }
            next(t)
            {
                const {destination: e} = this;
                e && e.next && e.next(t)
            }
            error(t)
            {
                const {destination: e} = this;
                e && e.error && this.destination.error(t)
            }
            complete()
            {
                const {destination: t} = this;
                t && t.complete && this.destination.complete()
            }
            _subscribe(t)
            {
                const {source: e} = this;
                return e ? this.source.subscribe(t) : u.EMPTY
            }
        }
        function S(t) {
            return t && "function" == typeof t.schedule
        }
        function k(t, e) {
            return function(n) {
                if ("function" != typeof t)
                    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new A(t, e))
            }
        }
        class A {
            constructor(t, e)
            {
                this.project = t,
                this.thisArg = e
            }
            call(t, e)
            {
                return e.subscribe(new T(t, this.project, this.thisArg))
            }
        }
        class T extends f {
            constructor(t, e, n)
            {
                super(t),
                this.project = e,
                this.count = 0,
                this.thisArg = n || this
            }
            _next(t)
            {
                let e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }
        const O = t => e => {
            for (let n = 0, i = t.length; n < i && !e.closed; n++)
                e.next(t[n]);
            e.complete()
        };
        function I() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }
        const P = I(),
            D = t => t && "number" == typeof t.length && "function" != typeof t;
        function R(t) {
            return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        }
        const F = t => {
            if (t && "function" == typeof t[g])
                return i = t, t => {
                    const e = i[g]();
                    if ("function" != typeof e.subscribe)
                        throw new TypeError("Provided object does not correctly implement Symbol.observable");
                    return e.subscribe(t)
                };
            if (D(t))
                return O(t);
            if (R(t))
                return n = t, t => (n.then(e => {
                    t.closed || (t.next(e), t.complete())
                }, e => t.error(e)).then(null, o), t);
            if (t && "function" == typeof t[P])
                return e = t, t => {
                    const n = e[P]();
                    for (;;) {
                        let e;
                        try {
                            e = n.next()
                        } catch (i) {
                            return t.error(i), t
                        }
                        if (e.done) {
                            t.complete();
                            break
                        }
                        if (t.next(e.value), t.closed)
                            break
                    }
                    return "function" == typeof n.return && t.add(() => {
                        n.return && n.return()
                    }), t
                };
            {
                const e = c(t) ? "an invalid object" : `'${t}'`;
                throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
            }
            var e,
                n,
                i
        };
        function V(t, e) {
            return new y(n => {
                const i = new u;
                let s = 0;
                return i.add(e.schedule(function() {
                    s !== t.length ? (n.next(t[s++]), n.closed || i.add(this.schedule())) : n.complete()
                })), i
            })
        }
        function N(t, e) {
            return e ? function(t, e) {
                if (null != t) {
                    if (function(t) {
                        return t && "function" == typeof t[g]
                    }(t))
                        return function(t, e) {
                            return new y(n => {
                                const i = new u;
                                return i.add(e.schedule(() => {
                                    const s = t[g]();
                                    i.add(s.subscribe({
                                        next(t) {
                                            i.add(e.schedule(() => n.next(t)))
                                        },
                                        error(t) {
                                            i.add(e.schedule(() => n.error(t)))
                                        },
                                        complete() {
                                            i.add(e.schedule(() => n.complete()))
                                        }
                                    }))
                                })), i
                            })
                        }(t, e);
                    if (R(t))
                        return function(t, e) {
                            return new y(n => {
                                const i = new u;
                                return i.add(e.schedule(() => t.then(t => {
                                    i.add(e.schedule(() => {
                                        n.next(t),
                                        i.add(e.schedule(() => n.complete()))
                                    }))
                                }, t => {
                                    i.add(e.schedule(() => n.error(t)))
                                }))), i
                            })
                        }(t, e);
                    if (D(t))
                        return V(t, e);
                    if (function(t) {
                        return t && "function" == typeof t[P]
                    }(t) || "string" == typeof t)
                        return function(t, e) {
                            if (!t)
                                throw new Error("Iterable cannot be null");
                            return new y(n => {
                                const i = new u;
                                let s;
                                return i.add(() => {
                                    s && "function" == typeof s.return && s.return()
                                }), i.add(e.schedule(() => {
                                    s = t[P](),
                                    i.add(e.schedule(function() {
                                        if (n.closed)
                                            return;
                                        let t,
                                            e;
                                        try {
                                            const n = s.next();
                                            t = n.value,
                                            e = n.done
                                        } catch (i) {
                                            return void n.error(i)
                                        }
                                        e ? n.complete() : (n.next(t), this.schedule())
                                    }))
                                })), i
                            })
                        }(t, e)
                }
                throw new TypeError((null !== t && typeof t || t) + " is not observable")
            }(t, e) : t instanceof y ? t : new y(F(t))
        }
        class M extends f {
            constructor(t)
            {
                super(),
                this.parent = t
            }
            _next(t)
            {
                this.parent.notifyNext(t)
            }
            _error(t)
            {
                this.parent.notifyError(t),
                this.unsubscribe()
            }
            _complete()
            {
                this.parent.notifyComplete(),
                this.unsubscribe()
            }
        }
        class L extends f {
            notifyNext(t)
            {
                this.destination.next(t)
            }
            notifyError(t)
            {
                this.destination.error(t)
            }
            notifyComplete()
            {
                this.destination.complete()
            }
        }
        function j(t, e) {
            if (!e.closed)
                return t instanceof y ? t.subscribe(e) : F(t)(e)
        }
        function B(t, e, n=Number.POSITIVE_INFINITY) {
            return "function" == typeof e ? i => i.pipe(B((n, i) => N(t(n, i)).pipe(k((t, s) => e(n, t, i, s))), n)) : ("number" == typeof e && (n = e), e => e.lift(new H(t, n)))
        }
        class H {
            constructor(t, e=Number.POSITIVE_INFINITY)
            {
                this.project = t,
                this.concurrent = e
            }
            call(t, e)
            {
                return e.subscribe(new z(t, this.project, this.concurrent))
            }
        }
        class z extends L {
            constructor(t, e, n=Number.POSITIVE_INFINITY)
            {
                super(t),
                this.project = e,
                this.concurrent = n,
                this.hasCompleted = !1,
                this.buffer = [],
                this.active = 0,
                this.index = 0
            }
            _next(t)
            {
                this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
            }
            _tryNext(t)
            {
                let e;
                const n = this.index++;
                try {
                    e = this.project(t, n)
                } catch (i) {
                    return void this.destination.error(i)
                }
                this.active++,
                this._innerSub(e)
            }
            _innerSub(t)
            {
                const e = new M(this),
                    n = this.destination;
                n.add(e);
                const i = j(t, e);
                i !== e && n.add(i)
            }
            _complete()
            {
                this.hasCompleted = !0,
                0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                this.unsubscribe()
            }
            notifyNext(t)
            {
                this.destination.next(t)
            }
            notifyComplete()
            {
                const t = this.buffer;
                this.active--,
                t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }
        function $(t=Number.POSITIVE_INFINITY) {
            return B(_, t)
        }
        function q(t, e) {
            return e ? V(t, e) : new y(O(t))
        }
        function W(...t) {
            let e = Number.POSITIVE_INFINITY,
                n = null,
                i = t[t.length - 1];
            return S(i) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof i && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof y ? t[0] : $(e)(q(t, n))
        }
        function U() {
            return function(t) {
                return t.lift(new Z(t))
            }
        }
        class Z {
            constructor(t)
            {
                this.connectable = t
            }
            call(t, e)
            {
                const {connectable: n} = this;
                n._refCount++;
                const i = new Q(t, n),
                    s = e.subscribe(i);
                return i.closed || (i.connection = n.connect()), s
            }
        }
        class Q extends f {
            constructor(t, e)
            {
                super(t),
                this.connectable = e
            }
            _unsubscribe()
            {
                const {connectable: t} = this;
                if (!t)
                    return void (this.connection = null);
                this.connectable = null;
                const e = t._refCount;
                if (e <= 0)
                    return void (this.connection = null);
                if (t._refCount = e - 1, e > 1)
                    return void (this.connection = null);
                const {connection: n} = this,
                    i = t._connection;
                this.connection = null,
                !i || n && i !== n || i.unsubscribe()
            }
        }
        class K extends y {
            constructor(t, e)
            {
                super(),
                this.source = t,
                this.subjectFactory = e,
                this._refCount = 0,
                this._isComplete = !1
            }
            _subscribe(t)
            {
                return this.getSubject().subscribe(t)
            }
            getSubject()
            {
                const t = this._subject;
                return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
            }
            connect()
            {
                let t = this._connection;
                return t || (this._isComplete = !1, t = this._connection = new u, t.add(this.source.subscribe(new Y(this.getSubject(), this))), t.closed && (this._connection = null, t = u.EMPTY)), t
            }
            refCount()
            {
                return U()(this)
            }
        }
        const G = (() => {
            const t = K.prototype;
            return {
                operator: {
                    value: null
                },
                _refCount: {
                    value: 0,
                    writable: !0
                },
                _subject: {
                    value: null,
                    writable: !0
                },
                _connection: {
                    value: null,
                    writable: !0
                },
                _subscribe: {
                    value: t._subscribe
                },
                _isComplete: {
                    value: t._isComplete,
                    writable: !0
                },
                getSubject: {
                    value: t.getSubject
                },
                connect: {
                    value: t.connect
                },
                refCount: {
                    value: t.refCount
                }
            }
        })();
        class Y extends C {
            constructor(t, e)
            {
                super(t),
                this.connectable = e
            }
            _error(t)
            {
                this._unsubscribe(),
                super._error(t)
            }
            _complete()
            {
                this.connectable._isComplete = !0,
                this._unsubscribe(),
                super._complete()
            }
            _unsubscribe()
            {
                const t = this.connectable;
                if (t) {
                    this.connectable = null;
                    const e = t._connection;
                    t._refCount = 0,
                    t._subject = null,
                    t._connection = null,
                    e && e.unsubscribe()
                }
            }
        }
        function X() {
            return new x
        }
        function J(t) {
            for (let e in t)
                if (t[e] === J)
                    return e;
            throw Error("Could not find renamed property on target object.")
        }
        function tt(t, e) {
            for (const n in e)
                e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
        }
        function et(t) {
            if ("string" == typeof t)
                return t;
            if (Array.isArray(t))
                return "[" + t.map(et).join(", ") + "]";
            if (null == t)
                return "" + t;
            if (t.overriddenName)
                return `${t.overriddenName}`;
            if (t.name)
                return `${t.name}`;
            const e = t.toString();
            if (null == e)
                return "" + e;
            const n = e.indexOf("\n");
            return -1 === n ? e : e.substring(0, n)
        }
        function nt(t, e) {
            return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
        }
        const it = J({
            __forward_ref__: J
        });
        function st(t) {
            return t.__forward_ref__ = st, t.toString = function() {
                return et(this())
            }, t
        }
        function rt(t) {
            return ot(t) ? t() : t
        }
        function ot(t) {
            return "function" == typeof t && t.hasOwnProperty(it) && t.__forward_ref__ === st
        }
        function at(t) {
            return {
                token: t.token,
                providedIn: t.providedIn || null,
                factory: t.factory,
                value: void 0
            }
        }
        function lt(t) {
            return {
                factory: t.factory,
                providers: t.providers || [],
                imports: t.imports || []
            }
        }
        function ct(t) {
            return ht(t, dt) || ht(t, ft)
        }
        function ht(t, e) {
            return t.hasOwnProperty(e) ? t[e] : null
        }
        function ut(t) {
            return t && (t.hasOwnProperty(pt) || t.hasOwnProperty(mt)) ? t[pt] : null
        }
        const dt = J({
                "\u0275prov": J
            }),
            pt = J({
                "\u0275inj": J
            }),
            ft = J({
                ngInjectableDef: J
            }),
            mt = J({
                ngInjectorDef: J
            });
        var gt = function(t) {
            return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
        }({});
        let _t;
        function yt(t) {
            const e = _t;
            return _t = t, e
        }
        function bt(t, e, n) {
            const i = ct(t);
            if (i && "root" == i.providedIn)
                return void 0 === i.value ? i.value = i.factory() : i.value;
            if (n & gt.Optional)
                return null;
            if (void 0 !== e)
                return e;
            throw new Error(`Injector: NOT_FOUND [${et(t)}]`)
        }
        function vt(t) {
            return {
                toString: t
            }.toString()
        }
        var wt = function(t) {
                return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
            }({}),
            Ct = function(t) {
                return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
            }({});
        const xt = "undefined" != typeof globalThis && globalThis,
            Et = "undefined" != typeof window && window,
            St = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
            kt = "undefined" != typeof global && global,
            At = xt || kt || Et || St,
            Tt = {},
            Ot = [],
            It = J({
                "\u0275cmp": J
            }),
            Pt = J({
                "\u0275dir": J
            }),
            Dt = J({
                "\u0275pipe": J
            }),
            Rt = J({
                "\u0275mod": J
            }),
            Ft = J({
                "\u0275loc": J
            }),
            Vt = J({
                "\u0275fac": J
            }),
            Nt = J({
                __NG_ELEMENT_ID__: J
            });
        let Mt = 0;
        function Lt(t) {
            return vt(() => {
                const e = {},
                    n = {
                        type: t.type,
                        providersResolver: null,
                        decls: t.decls,
                        vars: t.vars,
                        factory: null,
                        template: t.template || null,
                        consts: t.consts || null,
                        ngContentSelectors: t.ngContentSelectors,
                        hostBindings: t.hostBindings || null,
                        hostVars: t.hostVars || 0,
                        hostAttrs: t.hostAttrs || null,
                        contentQueries: t.contentQueries || null,
                        declaredInputs: e,
                        inputs: null,
                        outputs: null,
                        exportAs: t.exportAs || null,
                        onPush: t.changeDetection === wt.OnPush,
                        directiveDefs: null,
                        pipeDefs: null,
                        selectors: t.selectors || Ot,
                        viewQuery: t.viewQuery || null,
                        features: t.features || null,
                        data: t.data || {},
                        encapsulation: t.encapsulation || Ct.Emulated,
                        id: "c",
                        styles: t.styles || Ot,
                        _: null,
                        setInput: null,
                        schemas: t.schemas || null,
                        tView: null
                    },
                    i = t.directives,
                    s = t.features,
                    r = t.pipes;
                return n.id += Mt++, n.inputs = $t(t.inputs, e), n.outputs = $t(t.outputs), s && s.forEach(t => t(n)), n.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(jt) : null, n.pipeDefs = r ? () => ("function" == typeof r ? r() : r).map(Bt) : null, n
            })
        }
        function jt(t) {
            return Ut(t) || function(t) {
                    return t[Pt] || null
                }(t)
        }
        function Bt(t) {
            return function(t) {
                return t[Dt] || null
            }(t)
        }
        const Ht = {};
        function zt(t) {
            const e = {
                type: t.type,
                bootstrap: t.bootstrap || Ot,
                declarations: t.declarations || Ot,
                imports: t.imports || Ot,
                exports: t.exports || Ot,
                transitiveCompileScopes: null,
                schemas: t.schemas || null,
                id: t.id || null
            };
            return null != t.id && vt(() => {
                Ht[t.id] = t.type
            }), e
        }
        function $t(t, e) {
            if (null == t)
                return Tt;
            const n = {};
            for (const i in t)
                if (t.hasOwnProperty(i)) {
                    let s = t[i],
                        r = s;
                    Array.isArray(s) && (r = s[1], s = s[0]),
                    n[s] = i,
                    e && (e[s] = r)
                }
            return n
        }
        const qt = Lt;
        function Wt(t) {
            return {
                type: t.type,
                name: t.name,
                factory: null,
                pure: !1 !== t.pure,
                onDestroy: t.type.prototype.ngOnDestroy || null
            }
        }
        function Ut(t) {
            return t[It] || null
        }
        function Zt(t, e) {
            const n = t[Rt] || null;
            if (!n && !0 === e)
                throw new Error(`Type ${et(t)} does not have '\u0275mod' property.`);
            return n
        }
        const Qt = 20,
            Kt = 10;
        function Gt(t) {
            return Array.isArray(t) && "object" == typeof t[1]
        }
        function Yt(t) {
            return Array.isArray(t) && !0 === t[1]
        }
        function Xt(t) {
            return 0 != (8 & t.flags)
        }
        function Jt(t) {
            return 2 == (2 & t.flags)
        }
        function te(t) {
            return 1 == (1 & t.flags)
        }
        function ee(t) {
            return null !== t.template
        }
        function ne(t, e) {
            return t.hasOwnProperty(Vt) ? t[Vt] : null
        }
        class ie extends Error {
            constructor(t, e)
            {
                super(function(t, e) {
                    return `${t ? `NG0${t}: ` : ""}${e}`
                }(t, e)),
                this.code = t
            }
        }
        function se(t) {
            return "string" == typeof t ? t : null == t ? "" : String(t)
        }
        function re(t) {
            return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : se(t)
        }
        function oe(t, e) {
            const n = e ? ` in ${e}` : "";
            throw new ie("201", `No provider for ${re(t)} found${n}`)
        }
        class ae {
            constructor(t, e, n)
            {
                this.previousValue = t,
                this.currentValue = e,
                this.firstChange = n
            }
            isFirstChange()
            {
                return this.firstChange
            }
        }
        function le() {
            return ce
        }
        function ce(t) {
            return t.type.prototype.ngOnChanges && (t.setInput = ue), he
        }
        function he() {
            const t = de(this),
                e = null == t ? void 0 : t.current;
            if (e) {
                const n = t.previous;
                if (n === Tt)
                    t.previous = e;
                else
                    for (let t in e)
                        n[t] = e[t];
                t.current = null,
                this.ngOnChanges(e)
            }
        }
        function ue(t, e, n, i) {
            const s = de(t) || function(t, e) {
                    return t.__ngSimpleChanges__ = e
                }(t, {
                    previous: Tt,
                    current: null
                }),
                r = s.current || (s.current = {}),
                o = s.previous,
                a = this.declaredInputs[n],
                l = o[a];
            r[a] = new ae(l && l.currentValue, e, o === Tt),
            t[i] = e
        }
        function de(t) {
            return t.__ngSimpleChanges__ || null
        }
        le.ngInherit = !0;
        const pe = "http://www.w3.org/2000/svg";
        let fe;
        function me(t) {
            return !!t.listen
        }
        const ge = {
            createRenderer: (t, e) => void 0 !== fe ? fe : "undefined" != typeof document ? document : void 0
        };
        function _e(t) {
            for (; Array.isArray(t);)
                t = t[0];
            return t
        }
        function ye(t, e) {
            return _e(e[t])
        }
        function be(t, e) {
            return _e(e[t.index])
        }
        function ve(t, e) {
            return t.data[e]
        }
        function we(t, e) {
            const n = e[t];
            return Gt(n) ? n : n[0]
        }
        function Ce(t) {
            const e = function(t) {
                return t.__ngContext__ || null
            }(t);
            return e ? Array.isArray(e) ? e : e.lView : null
        }
        function xe(t) {
            return 4 == (4 & t[2])
        }
        function Ee(t) {
            return 128 == (128 & t[2])
        }
        function Se(t, e) {
            return null == e ? null : t[e]
        }
        function ke(t) {
            t[18] = 0
        }
        function Ae(t, e) {
            t[5] += e;
            let n = t,
                i = t[3];
            for (; null !== i && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);)
                i[5] += e,
                n = i,
                i = i[3]
        }
        const Te = {
            lFrame: Ge(null),
            bindingsEnabled: !0,
            isInCheckNoChangesMode: !1
        };
        function Oe() {
            return Te.bindingsEnabled
        }
        function Ie() {
            return Te.lFrame.lView
        }
        function Pe() {
            return Te.lFrame.tView
        }
        function De(t) {
            Te.lFrame.contextLView = t
        }
        function Re() {
            let t = Fe();
            for (; null !== t && 64 === t.type;)
                t = t.parent;
            return t
        }
        function Fe() {
            return Te.lFrame.currentTNode
        }
        function Ve(t, e) {
            const n = Te.lFrame;
            n.currentTNode = t,
            n.isParent = e
        }
        function Ne() {
            return Te.lFrame.isParent
        }
        function Me() {
            Te.lFrame.isParent = !1
        }
        function Le() {
            return Te.isInCheckNoChangesMode
        }
        function je(t) {
            Te.isInCheckNoChangesMode = t
        }
        function Be() {
            const t = Te.lFrame;
            let e = t.bindingRootIndex;
            return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        }
        function He() {
            return Te.lFrame.bindingIndex++
        }
        function ze(t, e) {
            const n = Te.lFrame;
            n.bindingIndex = n.bindingRootIndex = t,
            $e(e)
        }
        function $e(t) {
            Te.lFrame.currentDirectiveIndex = t
        }
        function qe() {
            return Te.lFrame.currentQueryIndex
        }
        function We(t) {
            Te.lFrame.currentQueryIndex = t
        }
        function Ue(t) {
            const e = t[1];
            return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
        }
        function Ze(t, e, n) {
            if (n & gt.SkipSelf) {
                let i = e,
                    s = t;
                for (; i = i.parent, !(null !== i || n & gt.Host || (i = Ue(s), null === i) || (s = s[15], 10 & i.type));)
                    ;
                if (null === i)
                    return !1;
                e = i,
                t = s
            }
            const i = Te.lFrame = Ke();
            return i.currentTNode = e, i.lView = t, !0
        }
        function Qe(t) {
            const e = Ke(),
                n = t[1];
            Te.lFrame = e,
            e.currentTNode = n.firstChild,
            e.lView = t,
            e.tView = n,
            e.contextLView = t,
            e.bindingIndex = n.bindingStartIndex,
            e.inI18n = !1
        }
        function Ke() {
            const t = Te.lFrame,
                e = null === t ? null : t.child;
            return null === e ? Ge(t) : e
        }
        function Ge(t) {
            const e = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: t,
                child: null,
                inI18n: !1
            };
            return null !== t && (t.child = e), e
        }
        function Ye() {
            const t = Te.lFrame;
            return Te.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
        }
        const Xe = Ye;
        function Je() {
            const t = Ye();
            t.isParent = !0,
            t.tView = null,
            t.selectedIndex = -1,
            t.contextLView = null,
            t.elementDepthCount = 0,
            t.currentDirectiveIndex = -1,
            t.currentNamespace = null,
            t.bindingRootIndex = -1,
            t.bindingIndex = -1,
            t.currentQueryIndex = 0
        }
        function tn() {
            return Te.lFrame.selectedIndex
        }
        function en(t) {
            Te.lFrame.selectedIndex = t
        }
        function nn() {
            const t = Te.lFrame;
            return ve(t.tView, t.selectedIndex)
        }
        function sn() {
            Te.lFrame.currentNamespace = pe
        }
        function rn() {
            Te.lFrame.currentNamespace = null
        }
        function on(t, e) {
            for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
                const e = t.data[n].type.prototype,
                    {ngAfterContentInit: i, ngAfterContentChecked: s, ngAfterViewInit: r, ngAfterViewChecked: o, ngOnDestroy: a} = e;
                i && (t.contentHooks || (t.contentHooks = [])).push(-n, i),
                s && ((t.contentHooks || (t.contentHooks = [])).push(n, s), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
                r && (t.viewHooks || (t.viewHooks = [])).push(-n, r),
                o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
                null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
            }
        }
        function an(t, e, n) {
            hn(t, e, 3, n)
        }
        function ln(t, e, n, i) {
            (3 & t[2]) === n && hn(t, e, n, i)
        }
        function cn(t, e) {
            let n = t[2];
            (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
        }
        function hn(t, e, n, i) {
            const s = null != i ? i : -1,
                r = e.length - 1;
            let o = 0;
            for (let a = void 0 !== i ? 65535 & t[18] : 0; a < r; a++)
                if ("number" == typeof e[a + 1]) {
                    if (o = e[a], null != i && o >= i)
                        break
                } else
                    e[a] < 0 && (t[18] += 65536),
                    (o < s || -1 == s) && (un(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2),
                    a++
        }
        function un(t, e, n, i) {
            const s = n[i] < 0,
                r = n[i + 1],
                o = t[s ? -n[i] : n[i]];
            s ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e && (t[2] += 2048, r.call(o)) : r.call(o)
        }
        const dn = -1;
        class pn {
            constructor(t, e, n)
            {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = e,
                this.injectImpl = n
            }
        }
        function fn(t, e, n) {
            const i = me(t);
            let s = 0;
            for (; s < n.length;) {
                const r = n[s];
                if ("number" == typeof r) {
                    if (0 !== r)
                        break;
                    s++;
                    const o = n[s++],
                        a = n[s++],
                        l = n[s++];
                    i ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
                } else {
                    const o = r,
                        a = n[++s];
                    mn(o) ? i && t.setProperty(e, o, a) : i ? t.setAttribute(e, o, a) : e.setAttribute(o, a),
                    s++
                }
            }
            return s
        }
        function mn(t) {
            return 64 === t.charCodeAt(0)
        }
        function gn(t, e) {
            if (null === e || 0 === e.length)
                ;
            else if (null === t || 0 === t.length)
                t = e.slice();
            else {
                let n = -1;
                for (let i = 0; i < e.length; i++) {
                    const s = e[i];
                    "number" == typeof s ? n = s : 0 === n || _n(t, n, s, null, -1 === n || 2 === n ? e[++i] : null)
                }
            }
            return t
        }
        function _n(t, e, n, i, s) {
            let r = 0,
                o = t.length;
            if (-1 === e)
                o = -1;
            else
                for (; r < t.length;) {
                    const n = t[r++];
                    if ("number" == typeof n) {
                        if (n === e) {
                            o = -1;
                            break
                        }
                        if (n > e) {
                            o = r - 1;
                            break
                        }
                    }
                }
            for (; r < t.length;) {
                const e = t[r];
                if ("number" == typeof e)
                    break;
                if (e === n) {
                    if (null === i)
                        return void (null !== s && (t[r + 1] = s));
                    if (i === t[r + 1])
                        return void (t[r + 2] = s)
                }
                r++,
                null !== i && r++,
                null !== s && r++
            }
            -1 !== o && (t.splice(o, 0, e), r = o + 1),
            t.splice(r++, 0, n),
            null !== i && t.splice(r++, 0, i),
            null !== s && t.splice(r++, 0, s)
        }
        function yn(t) {
            return t !== dn
        }
        function bn(t) {
            return 32767 & t
        }
        function vn(t, e) {
            let n = t >> 16,
                i = e;
            for (; n > 0;)
                i = i[15],
                n--;
            return i
        }
        let wn = !0;
        function Cn(t) {
            const e = wn;
            return wn = t, e
        }
        let xn = 0;
        function En(t, e) {
            const n = kn(t, e);
            if (-1 !== n)
                return n;
            const i = e[1];
            i.firstCreatePass && (t.injectorIndex = e.length, Sn(i.data, t), Sn(e, null), Sn(i.blueprint, null));
            const s = An(t, e),
                r = t.injectorIndex;
            if (yn(s)) {
                const t = bn(s),
                    n = vn(s, e),
                    i = n[1].data;
                for (let s = 0; s < 8; s++)
                    e[r + s] = n[t + s] | i[t + s]
            }
            return e[r + 8] = s, r
        }
        function Sn(t, e) {
            t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
        }
        function kn(t, e) {
            return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
        }
        function An(t, e) {
            if (t.parent && -1 !== t.parent.injectorIndex)
                return t.parent.injectorIndex;
            let n = 0,
                i = null,
                s = e;
            for (; null !== s;) {
                const t = s[1],
                    e = t.type;
                if (i = 2 === e ? t.declTNode : 1 === e ? s[6] : null, null === i)
                    return dn;
                if (n++, s = s[15], -1 !== i.injectorIndex)
                    return i.injectorIndex | n << 16
            }
            return dn
        }
        function Tn(t, e, n) {
            !function(t, e, n) {
                let i;
                "string" == typeof n ? i = n.charCodeAt(0) || 0 : n.hasOwnProperty(Nt) && (i = n[Nt]),
                null == i && (i = n[Nt] = xn++);
                const s = 255 & i;
                e.data[t + (s >> 5)] |= 1 << s
            }(t, e, n)
        }
        function On(t, e, n) {
            if (n & gt.Optional)
                return t;
            oe(e, "NodeInjector")
        }
        function In(t, e, n, i) {
            if (n & gt.Optional && void 0 === i && (i = null), 0 == (n & (gt.Self | gt.Host))) {
                const s = t[9],
                    r = yt(void 0);
                try {
                    return s ? s.get(e, i, n & gt.Optional) : bt(e, i, n & gt.Optional)
                } finally {
                    yt(r)
                }
            }
            return On(i, e, n)
        }
        function Pn(t, e, n, i=gt.Default, s) {
            if (null !== t) {
                const r = function(t) {
                    if ("string" == typeof t)
                        return t.charCodeAt(0) || 0;
                    const e = t.hasOwnProperty(Nt) ? t[Nt] : void 0;
                    return "number" == typeof e ? e >= 0 ? 255 & e : Rn : e
                }(n);
                if ("function" == typeof r) {
                    if (!Ze(e, t, i))
                        return i & gt.Host ? On(s, n, i) : In(e, n, i, s);
                    try {
                        const t = r();
                        if (null != t || i & gt.Optional)
                            return t;
                        oe(n)
                    } finally {
                        Xe()
                    }
                } else if ("number" == typeof r) {
                    let s = null,
                        o = kn(t, e),
                        a = dn,
                        l = i & gt.Host ? e[16][6] : null;
                    for ((-1 === o || i & gt.SkipSelf) && (a = -1 === o ? An(t, e) : e[o + 8], a !== dn && Ln(i, !1) ? (s = e[1], o = bn(a), e = vn(a, e)) : o = -1); -1 !== o;) {
                        const t = e[1];
                        if (Mn(r, o, t.data)) {
                            const t = Fn(o, e, n, s, i, l);
                            if (t !== Dn)
                                return t
                        }
                        a = e[o + 8],
                        a !== dn && Ln(i, e[1].data[o + 8] === l) && Mn(r, o, e) ? (s = t, o = bn(a), e = vn(a, e)) : o = -1
                    }
                }
            }
            return In(e, n, i, s)
        }
        const Dn = {};
        function Rn() {
            return new jn(Re(), Ie())
        }
        function Fn(t, e, n, i, s, r) {
            const o = e[1],
                a = o.data[t + 8],
                l = Vn(a, o, n, null == i ? Jt(a) && wn : i != o && 0 != (3 & a.type), s & gt.Host && r === a);
            return null !== l ? Nn(e, o, l, a) : Dn
        }
        function Vn(t, e, n, i, s) {
            const r = t.providerIndexes,
                o = e.data,
                a = 1048575 & r,
                l = t.directiveStart,
                c = r >> 20,
                h = s ? a + c : t.directiveEnd;
            for (let u = i ? a : a + c; u < h; u++) {
                const t = o[u];
                if (u < l && n === t || u >= l && t.type === n)
                    return u
            }
            if (s) {
                const t = o[l];
                if (t && ee(t) && t.type === n)
                    return l
            }
            return null
        }
        function Nn(t, e, n, i) {
            let s = t[n];
            const r = e.data;
            if (s instanceof pn) {
                const o = s;
                o.resolving && function(t, e) {
                    throw new ie("200", `Circular dependency in DI detected for ${t}`)
                }(re(r[n]));
                const a = Cn(o.canSeeViewProviders);
                o.resolving = !0;
                const l = o.injectImpl ? yt(o.injectImpl) : null;
                Ze(t, i, gt.Default);
                try {
                    s = t[n] = o.factory(void 0, r, t, i),
                    e.firstCreatePass && n >= i.directiveStart && function(t, e, n) {
                        const {ngOnChanges: i, ngOnInit: s, ngDoCheck: r} = e.type.prototype;
                        if (i) {
                            const i = ce(e);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i)
                        }
                        s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                        r && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r))
                    }(n, r[n], e)
                } finally {
                    null !== l && yt(l),
                    Cn(a),
                    o.resolving = !1,
                    Xe()
                }
            }
            return s
        }
        function Mn(t, e, n) {
            return !!(n[e + (t >> 5)] & 1 << t)
        }
        function Ln(t, e) {
            return !(t & gt.Self || t & gt.Host && e)
        }
        class jn {
            constructor(t, e)
            {
                this._tNode = t,
                this._lView = e
            }
            get(t, e)
            {
                return Pn(this._tNode, this._lView, t, void 0, e)
            }
        }
        function Bn(t) {
            const e = t;
            if (ot(t))
                return () => {
                    const t = Bn(rt(e));
                    return t ? t() : null
                };
            let n = ne(e);
            if (null === n) {
                const t = ut(e);
                n = t && t.factory
            }
            return n || null
        }
        function Hn(t) {
            return vt(() => {
                const e = t.prototype.constructor,
                    n = e[Vt] || Bn(e),
                    i = Object.prototype;
                let s = Object.getPrototypeOf(t.prototype).constructor;
                for (; s && s !== i;) {
                    const t = s[Vt] || Bn(s);
                    if (t && t !== n)
                        return t;
                    s = Object.getPrototypeOf(s)
                }
                return t => new t
            })
        }
        const zn = "__parameters__";
        function $n(t, e, n) {
            return vt(() => {
                const i = function(t) {
                    return function(...e) {
                        if (t) {
                            const n = t(...e);
                            for (const t in n)
                                this[t] = n[t]
                        }
                    }
                }(e);
                function s(...t) {
                    if (this instanceof s)
                        return i.apply(this, t), this;
                    const e = new s(...t);
                    return n.annotation = e, n;
                    function n(t, n, i) {
                        const s = t.hasOwnProperty(zn) ? t[zn] : Object.defineProperty(t, zn, {
                            value: []
                        })[zn];
                        for (; s.length <= i;)
                            s.push(null);
                        return (s[i] = s[i] || []).push(e), t
                    }
                }
                return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = t, s.annotationCls = s, s
            })
        }
        class qn {
            constructor(t, e)
            {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = at({
                    token: this,
                    providedIn: e.providedIn || "root",
                    factory: e.factory
                }))
            }
            toString()
            {
                return `InjectionToken ${this._desc}`
            }
        }
        function Wn(t, e) {
            void 0 === e && (e = t);
            for (let n = 0; n < t.length; n++) {
                let i = t[n];
                Array.isArray(i) ? (e === t && (e = t.slice(0, n)), Wn(i, e)) : e !== t && e.push(i)
            }
            return e
        }
        function Un(t, e) {
            t.forEach(t => Array.isArray(t) ? Un(t, e) : e(t))
        }
        function Zn(t, e, n) {
            e >= t.length ? t.push(n) : t.splice(e, 0, n)
        }
        function Qn(t, e) {
            return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
        }
        function Kn(t, e) {
            const n = [];
            for (let i = 0; i < t; i++)
                n.push(e);
            return n
        }
        function Gn(t, e, n) {
            let i = Xn(t, e);
            return i >= 0 ? t[1 | i] = n : (i = ~i, function(t, e, n, i) {
                let s = t.length;
                if (s == e)
                    t.push(n, i);
                else if (1 === s)
                    t.push(i, t[0]),
                    t[0] = n;
                else {
                    for (s--, t.push(t[s - 1], t[s]); s > e;)
                        t[s] = t[s - 2],
                        s--;
                    t[e] = n,
                    t[e + 1] = i
                }
            }(t, i, e, n)), i
        }
        function Yn(t, e) {
            const n = Xn(t, e);
            if (n >= 0)
                return t[1 | n]
        }
        function Xn(t, e) {
            return function(t, e, n) {
                let i = 0,
                    s = t.length >> 1;
                for (; s !== i;) {
                    const n = i + (s - i >> 1),
                        r = t[n << 1];
                    if (e === r)
                        return n << 1;
                    r > e ? s = n : i = n + 1
                }
                return ~(s << 1)
            }(t, e)
        }
        const Jn = {},
            ti = /\n/gm,
            ei = "__source",
            ni = J({
                provide: String,
                useValue: J
            });
        let ii;
        function si(t) {
            const e = ii;
            return ii = t, e
        }
        function ri(t, e=gt.Default) {
            if (void 0 === ii)
                throw new Error("inject() must be called from an injection context");
            return null === ii ? bt(t, void 0, e) : ii.get(t, e & gt.Optional ? null : void 0, e)
        }
        function oi(t, e=gt.Default) {
            return (_t || ri)(rt(t), e)
        }
        const ai = oi;
        function li(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) {
                const i = rt(t[n]);
                if (Array.isArray(i)) {
                    if (0 === i.length)
                        throw new Error("Arguments array must have arguments.");
                    let t,
                        n = gt.Default;
                    for (let e = 0; e < i.length; e++) {
                        const s = i[e],
                            r = s.__NG_DI_FLAG__;
                        "number" == typeof r ? -1 === r ? t = s.token : n |= r : t = s
                    }
                    e.push(oi(t, n))
                } else
                    e.push(oi(i))
            }
            return e
        }
        function ci(t, e) {
            return t.__NG_DI_FLAG__ = e, t.prototype.__NG_DI_FLAG__ = e, t
        }
        const hi = ci($n("Inject", t => ({
                token: t
            })), -1),
            ui = ci($n("Optional"), 8),
            di = ci($n("SkipSelf"), 4);
        function pi(t) {
            return t.ngDebugContext
        }
        function fi(t) {
            return t.ngOriginalError
        }
        function mi(t, ...e) {
            t.error(...e)
        }
        class gi {
            constructor()
            {
                this._console = console
            }
            handleError(t)
            {
                const e = this._findOriginalError(t),
                    n = this._findContext(t),
                    i = function(t) {
                        return t.ngErrorLogger || mi
                    }(t);
                i(this._console, "ERROR", t),
                e && i(this._console, "ORIGINAL ERROR", e),
                n && i(this._console, "ERROR CONTEXT", n)
            }
            _findContext(t)
            {
                return t ? pi(t) ? pi(t) : this._findContext(fi(t)) : null
            }
            _findOriginalError(t)
            {
                let e = fi(t);
                for (; e && fi(e);)
                    e = fi(e);
                return e
            }
        }
        function _i(t, e) {
            t.__ngContext__ = e
        }
        const yi = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(At))();
        function bi(t) {
            return t instanceof Function ? t() : t
        }
        var vi = function(t) {
            return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
        }({});
        function wi(t, e) {
            return (void 0)(t, e)
        }
        function Ci(t) {
            const e = t[3];
            return Yt(e) ? e[3] : e
        }
        function xi(t) {
            return Si(t[13])
        }
        function Ei(t) {
            return Si(t[4])
        }
        function Si(t) {
            for (; null !== t && !Yt(t);)
                t = t[4];
            return t
        }
        function ki(t, e, n, i, s) {
            if (null != i) {
                let r,
                    o = !1;
                Yt(i) ? r = i : Gt(i) && (o = !0, i = i[0]);
                const a = _e(i);
                0 === t && null !== n ? null == s ? Fi(e, n, a) : Ri(e, n, a, s || null, !0) : 1 === t && null !== n ? Ri(e, n, a, s || null, !0) : 2 === t ? function(t, e, n) {
                    const i = Ni(t, e);
                    i && function(t, e, n, i) {
                        me(t) ? t.removeChild(e, n, i) : e.removeChild(n)
                    }(t, i, e, n)
                }(e, a, o) : 3 === t && e.destroyNode(a),
                null != r && function(t, e, n, i, s) {
                    const r = n[7];
                    r !== _e(n) && ki(e, t, i, r, s);
                    for (let o = Kt; o < n.length; o++) {
                        const s = n[o];
                        qi(s[1], s, t, e, i, r)
                    }
                }(e, t, r, n, s)
            }
        }
        function Ai(t, e, n) {
            return me(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
        }
        function Ti(t, e) {
            const n = t[9],
                i = n.indexOf(e),
                s = e[3];
            1024 & e[2] && (e[2] &= -1025, Ae(s, -1)),
            n.splice(i, 1)
        }
        function Oi(t, e) {
            if (t.length <= Kt)
                return;
            const n = Kt + e,
                i = t[n];
            if (i) {
                const r = i[17];
                null !== r && r !== t && Ti(r, i),
                e > 0 && (t[n - 1][4] = i[4]);
                const o = Qn(t, Kt + e);
                qi(i[1], s = i, s[11], 2, null, null),
                s[0] = null,
                s[6] = null;
                const a = o[19];
                null !== a && a.detachView(o[1]),
                i[3] = null,
                i[4] = null,
                i[2] &= -129
            }
            var s;
            return i
        }
        function Ii(t, e) {
            if (!(256 & e[2])) {
                const n = e[11];
                me(n) && n.destroyNode && qi(t, e, n, 3, null, null),
                function(t) {
                    let e = t[13];
                    if (!e)
                        return Pi(t[1], t);
                    for (; e;) {
                        let n = null;
                        if (Gt(e))
                            n = e[13];
                        else {
                            const t = e[10];
                            t && (n = t)
                        }
                        if (!n) {
                            for (; e && !e[4] && e !== t;)
                                Gt(e) && Pi(e[1], e),
                                e = e[3];
                            null === e && (e = t),
                            Gt(e) && Pi(e[1], e),
                            n = e && e[4]
                        }
                        e = n
                    }
                }(e)
            }
        }
        function Pi(t, e) {
            if (!(256 & e[2])) {
                e[2] &= -129,
                e[2] |= 256,
                function(t, e) {
                    let n;
                    if (null != t && null != (n = t.destroyHooks))
                        for (let i = 0; i < n.length; i += 2) {
                            const t = e[n[i]];
                            if (!(t instanceof pn)) {
                                const e = n[i + 1];
                                if (Array.isArray(e))
                                    for (let n = 0; n < e.length; n += 2)
                                        e[n + 1].call(t[e[n]]);
                                else
                                    e.call(t)
                            }
                        }
                }(t, e),
                function(t, e) {
                    const n = t.cleanup,
                        i = e[7];
                    let s = -1;
                    if (null !== n)
                        for (let r = 0; r < n.length - 1; r += 2)
                            if ("string" == typeof n[r]) {
                                const t = n[r + 1],
                                    o = "function" == typeof t ? t(e) : _e(e[t]),
                                    a = i[s = n[r + 2]],
                                    l = n[r + 3];
                                "boolean" == typeof l ? o.removeEventListener(n[r], a, l) : l >= 0 ? i[s = l]() : i[s = -l].unsubscribe(),
                                r += 2
                            } else {
                                const t = i[s = n[r + 1]];
                                n[r].call(t)
                            }
                    if (null !== i) {
                        for (let t = s + 1; t < i.length; t++)
                            (0, i[t])();
                        e[7] = null
                    }
                }(t, e),
                1 === e[1].type && me(e[11]) && e[11].destroy();
                const n = e[17];
                if (null !== n && Yt(e[3])) {
                    n !== e[3] && Ti(n, e);
                    const i = e[19];
                    null !== i && i.detachView(t)
                }
            }
        }
        function Di(t, e, n) {
            return function(t, e, n) {
                let i = e;
                for (; null !== i && 40 & i.type;)
                    i = (e = i).parent;
                if (null === i)
                    return n[0];
                if (2 & i.flags) {
                    const e = t.data[i.directiveStart].encapsulation;
                    if (e === Ct.None || e === Ct.Emulated)
                        return null
                }
                return be(i, n)
            }(t, e.parent, n)
        }
        function Ri(t, e, n, i, s) {
            me(t) ? t.insertBefore(e, n, i, s) : e.insertBefore(n, i, s)
        }
        function Fi(t, e, n) {
            me(t) ? t.appendChild(e, n) : e.appendChild(n)
        }
        function Vi(t, e, n, i, s) {
            null !== i ? Ri(t, e, n, i, s) : Fi(t, e, n)
        }
        function Ni(t, e) {
            return me(t) ? t.parentNode(e) : e.parentNode
        }
        function Mi(t, e, n) {
            return Li(t, e, n)
        }
        let Li = function(t, e, n) {
            return 40 & t.type ? be(t, n) : null
        };
        function ji(t, e, n, i) {
            const s = Di(t, i, e),
                r = e[11],
                o = Mi(i.parent || e[6], i, e);
            if (null != s)
                if (Array.isArray(n))
                    for (let a = 0; a < n.length; a++)
                        Vi(r, s, n[a], o, !1);
                else
                    Vi(r, s, n, o, !1)
        }
        function Bi(t, e) {
            if (null !== e) {
                const n = e.type;
                if (3 & n)
                    return be(e, t);
                if (4 & n)
                    return zi(-1, t[e.index]);
                if (8 & n) {
                    const n = e.child;
                    if (null !== n)
                        return Bi(t, n);
                    {
                        const n = t[e.index];
                        return Yt(n) ? zi(-1, n) : _e(n)
                    }
                }
                if (32 & n)
                    return wi(e, t)() || _e(t[e.index]);
                {
                    const n = Hi(t, e);
                    return null !== n ? Array.isArray(n) ? n[0] : Bi(Ci(t[16]), n) : Bi(t, e.next)
                }
            }
            return null
        }
        function Hi(t, e) {
            return null !== e ? t[16][6].projection[e.projection] : null
        }
        function zi(t, e) {
            const n = Kt + t + 1;
            if (n < e.length) {
                const t = e[n],
                    i = t[1].firstChild;
                if (null !== i)
                    return Bi(t, i)
            }
            return e[7]
        }
        function $i(t, e, n, i, s, r, o) {
            for (; null != n;) {
                const a = i[n.index],
                    l = n.type;
                if (o && 0 === e && (a && _i(_e(a), i), n.flags |= 4), 64 != (64 & n.flags))
                    if (8 & l)
                        $i(t, e, n.child, i, s, r, !1),
                        ki(e, t, s, a, r);
                    else if (32 & l) {
                        const o = wi(n, i);
                        let l;
                        for (; l = o();)
                            ki(e, t, s, l, r);
                        ki(e, t, s, a, r)
                    } else
                        16 & l ? Wi(t, e, i, n, s, r) : ki(e, t, s, a, r);
                n = o ? n.projectionNext : n.next
            }
        }
        function qi(t, e, n, i, s, r) {
            $i(n, i, t.firstChild, e, s, r, !1)
        }
        function Wi(t, e, n, i, s, r) {
            const o = n[16],
                a = o[6].projection[i.projection];
            if (Array.isArray(a))
                for (let l = 0; l < a.length; l++)
                    ki(e, t, s, a[l], r);
            else
                $i(t, e, a, o[3], s, r, !0)
        }
        function Ui(t, e, n) {
            me(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
        }
        function Zi(t, e, n) {
            me(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
        }
        function Qi(t, e, n) {
            let i = t.length;
            for (;;) {
                const s = t.indexOf(e, n);
                if (-1 === s)
                    return s;
                if (0 === s || t.charCodeAt(s - 1) <= 32) {
                    const n = e.length;
                    if (s + n === i || t.charCodeAt(s + n) <= 32)
                        return s
                }
                n = s + 1
            }
        }
        const Ki = "ng-template";
        function Gi(t, e, n) {
            let i = 0;
            for (; i < t.length;) {
                let s = t[i++];
                if (n && "class" === s) {
                    if (s = t[i], -1 !== Qi(s.toLowerCase(), e, 0))
                        return !0
                } else if (1 === s) {
                    for (; i < t.length && "string" == typeof (s = t[i++]);)
                        if (s.toLowerCase() === e)
                            return !0;
                    return !1
                }
            }
            return !1
        }
        function Yi(t) {
            return 4 === t.type && t.value !== Ki
        }
        function Xi(t, e, n) {
            return e === (4 !== t.type || n ? t.value : Ki)
        }
        function Ji(t, e, n) {
            let i = 4;
            const s = t.attrs || [],
                r = function(t) {
                    for (let n = 0; n < t.length; n++)
                        if (3 === (e = t[n]) || 4 === e || 6 === e)
                            return n;
                    var e;
                    return t.length
                }(s);
            let o = !1;
            for (let a = 0; a < e.length; a++) {
                const l = e[a];
                if ("number" != typeof l) {
                    if (!o)
                        if (4 & i) {
                            if (i = 2 | 1 & i, "" !== l && !Xi(t, l, n) || "" === l && 1 === e.length) {
                                if (ts(i))
                                    return !1;
                                o = !0
                            }
                        } else {
                            const c = 8 & i ? l : e[++a];
                            if (8 & i && null !== t.attrs) {
                                if (!Gi(t.attrs, c, n)) {
                                    if (ts(i))
                                        return !1;
                                    o = !0
                                }
                                continue
                            }
                            const h = es(8 & i ? "class" : l, s, Yi(t), n);
                            if (-1 === h) {
                                if (ts(i))
                                    return !1;
                                o = !0;
                                continue
                            }
                            if ("" !== c) {
                                let t;
                                t = h > r ? "" : s[h + 1].toLowerCase();
                                const e = 8 & i ? t : null;
                                if (e && -1 !== Qi(e, c, 0) || 2 & i && c !== t) {
                                    if (ts(i))
                                        return !1;
                                    o = !0
                                }
                            }
                        }
                } else {
                    if (!o && !ts(i) && !ts(l))
                        return !1;
                    if (o && ts(l))
                        continue;
                    o = !1,
                    i = l | 1 & i
                }
            }
            return ts(i) || o
        }
        function ts(t) {
            return 0 == (1 & t)
        }
        function es(t, e, n, i) {
            if (null === e)
                return -1;
            let s = 0;
            if (i || !n) {
                let n = !1;
                for (; s < e.length;) {
                    const i = e[s];
                    if (i === t)
                        return s;
                    if (3 === i || 6 === i)
                        n = !0;
                    else {
                        if (1 === i || 2 === i) {
                            let t = e[++s];
                            for (; "string" == typeof t;)
                                t = e[++s];
                            continue
                        }
                        if (4 === i)
                            break;
                        if (0 === i) {
                            s += 4;
                            continue
                        }
                    }
                    s += n ? 1 : 2
                }
                return -1
            }
            return function(t, e) {
                let n = t.indexOf(4);
                if (n > -1)
                    for (n++; n < t.length;) {
                        const i = t[n];
                        if ("number" == typeof i)
                            return -1;
                        if (i === e)
                            return n;
                        n++
                    }
                return -1
            }(e, t)
        }
        function ns(t, e, n=!1) {
            for (let i = 0; i < e.length; i++)
                if (Ji(t, e[i], n))
                    return !0;
            return !1
        }
        function is(t, e) {
            t:
            for (let n = 0; n < e.length; n++) {
                const i = e[n];
                if (t.length === i.length) {
                    for (let e = 0; e < t.length; e++)
                        if (t[e] !== i[e])
                            continue t;
                    return !0
                }
            }
            return !1
        }
        function ss(t, e) {
            return t ? ":not(" + e.trim() + ")" : e
        }
        function rs(t) {
            let e = t[0],
                n = 1,
                i = 2,
                s = "",
                r = !1;
            for (; n < t.length;) {
                let o = t[n];
                if ("string" == typeof o)
                    if (2 & i) {
                        const e = t[++n];
                        s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                    } else
                        8 & i ? s += "." + o : 4 & i && (s += " " + o);
                else
                    "" === s || ts(o) || (e += ss(r, s), s = ""),
                    i = o,
                    r = r || !ts(i);
                n++
            }
            return "" !== s && (e += ss(r, s)), e
        }
        const os = {};
        function as(t) {
            ls(Pe(), Ie(), tn() + t, Le())
        }
        function ls(t, e, n, i) {
            if (!i)
                if (3 == (3 & e[2])) {
                    const i = t.preOrderCheckHooks;
                    null !== i && an(e, i, n)
                } else {
                    const i = t.preOrderHooks;
                    null !== i && ln(e, i, 0, n)
                }
            en(n)
        }
        function cs(t, e) {
            return t << 17 | e << 2
        }
        function hs(t) {
            return t >> 17 & 32767
        }
        function us(t) {
            return 2 | t
        }
        function ds(t) {
            return (131068 & t) >> 2
        }
        function ps(t, e) {
            return -131069 & t | e << 2
        }
        function fs(t) {
            return 1 | t
        }
        function ms(t, e) {
            const n = t.contentQueries;
            if (null !== n)
                for (let i = 0; i < n.length; i += 2) {
                    const s = n[i],
                        r = n[i + 1];
                    if (-1 !== r) {
                        const n = t.data[r];
                        We(s),
                        n.contentQueries(2, e[r], r)
                    }
                }
        }
        function gs(t, e, n, i, s, r, o, a, l, c) {
            const h = e.blueprint.slice();
            return h[0] = s, h[2] = 140 | i, ke(h), h[3] = h[15] = t, h[8] = n, h[10] = o || t && t[10], h[11] = a || t && t[11], h[12] = l || t && t[12] || null, h[9] = c || t && t[9] || null, h[6] = r, h[16] = 2 == e.type ? t[16] : h, h
        }
        function _s(t, e, n, i, s) {
            let r = t.data[e];
            if (null === r)
                r = function(t, e, n, i, s) {
                    const r = Fe(),
                        o = Ne(),
                        a = t.data[e] = function(t, e, n, i, s, r) {
                            return {
                                type: n,
                                index: i,
                                insertBeforeIndex: null,
                                injectorIndex: e ? e.injectorIndex : -1,
                                directiveStart: -1,
                                directiveEnd: -1,
                                directiveStylingLast: -1,
                                propertyBindings: null,
                                flags: 0,
                                providerIndexes: 0,
                                value: s,
                                attrs: r,
                                mergedAttrs: null,
                                localNames: null,
                                initialInputs: void 0,
                                inputs: null,
                                outputs: null,
                                tViews: null,
                                next: null,
                                projectionNext: null,
                                child: null,
                                parent: e,
                                projection: null,
                                styles: null,
                                stylesWithoutHost: null,
                                residualStyles: void 0,
                                classes: null,
                                classesWithoutHost: null,
                                residualClasses: void 0,
                                classBindings: 0,
                                styleBindings: 0
                            }
                        }(0, o ? r : r && r.parent, n, e, i, s);
                    return null === t.firstChild && (t.firstChild = a), null !== r && (o ? null == r.child && null !== a.parent && (r.child = a) : null === r.next && (r.next = a)), a
                }(t, e, n, i, s),
                Te.lFrame.inI18n && (r.flags |= 64);
            else if (64 & r.type) {
                r.type = n,
                r.value = i,
                r.attrs = s;
                const t = function() {
                    const t = Te.lFrame,
                        e = t.currentTNode;
                    return t.isParent ? e : e.parent
                }();
                r.injectorIndex = null === t ? -1 : t.injectorIndex
            }
            return Ve(r, !0), r
        }
        function ys(t, e, n, i) {
            if (0 === n)
                return -1;
            const s = e.length;
            for (let r = 0; r < n; r++)
                e.push(i),
                t.blueprint.push(i),
                t.data.push(null);
            return s
        }
        function bs(t, e, n) {
            Qe(e);
            try {
                const i = t.viewQuery;
                null !== i && Ks(1, i, n);
                const s = t.template;
                null !== s && Cs(t, e, s, 1, n),
                t.firstCreatePass && (t.firstCreatePass = !1),
                t.staticContentQueries && ms(t, e),
                t.staticViewQueries && Ks(2, t.viewQuery, n);
                const r = t.components;
                null !== r && function(t, e) {
                    for (let n = 0; n < e.length; n++)
                        qs(t, e[n])
                }(e, r)
            } catch (i) {
                throw t.firstCreatePass && (t.incompleteFirstPass = !0), i
            } finally {
                e[2] &= -5,
                Je()
            }
        }
        function vs(t, e, n, i) {
            const s = e[2];
            if (256 == (256 & s))
                return;
            Qe(e);
            const r = Le();
            try {
                ke(e),
                Te.lFrame.bindingIndex = t.bindingStartIndex,
                null !== n && Cs(t, e, n, 2, i);
                const o = 3 == (3 & s);
                if (!r)
                    if (o) {
                        const n = t.preOrderCheckHooks;
                        null !== n && an(e, n, null)
                    } else {
                        const n = t.preOrderHooks;
                        null !== n && ln(e, n, 0, null),
                        cn(e, 0)
                    }
                if (function(t) {
                    for (let e = xi(t); null !== e; e = Ei(e)) {
                        if (!e[2])
                            continue;
                        const t = e[9];
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e],
                                i = n[3];
                            0 == (1024 & n[2]) && Ae(i, 1),
                            n[2] |= 1024
                        }
                    }
                }(e), function(t) {
                    for (let e = xi(t); null !== e; e = Ei(e))
                        for (let t = Kt; t < e.length; t++) {
                            const n = e[t],
                                i = n[1];
                            Ee(n) && vs(i, n, i.template, n[8])
                        }
                }(e), null !== t.contentQueries && ms(t, e), !r)
                    if (o) {
                        const n = t.contentCheckHooks;
                        null !== n && an(e, n)
                    } else {
                        const n = t.contentHooks;
                        null !== n && ln(e, n, 1),
                        cn(e, 1)
                    }
                !function(t, e) {
                    const n = t.hostBindingOpCodes;
                    if (null !== n)
                        try {
                            for (let t = 0; t < n.length; t++) {
                                const i = n[t];
                                if (i < 0)
                                    en(~i);
                                else {
                                    const s = i,
                                        r = n[++t],
                                        o = n[++t];
                                    ze(r, s),
                                    o(2, e[s])
                                }
                            }
                        } finally {
                            en(-1)
                        }
                }(t, e);
                const a = t.components;
                null !== a && function(t, e) {
                    for (let n = 0; n < e.length; n++)
                        zs(t, e[n])
                }(e, a);
                const l = t.viewQuery;
                if (null !== l && Ks(2, l, i), !r)
                    if (o) {
                        const n = t.viewCheckHooks;
                        null !== n && an(e, n)
                    } else {
                        const n = t.viewHooks;
                        null !== n && ln(e, n, 2),
                        cn(e, 2)
                    }
                !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
                r || (e[2] &= -73),
                1024 & e[2] && (e[2] &= -1025, Ae(e[3], -1))
            } finally {
                Je()
            }
        }
        function ws(t, e, n, i) {
            const s = e[10],
                r = !Le(),
                o = xe(e);
            try {
                r && !o && s.begin && s.begin(),
                o && bs(t, e, i),
                vs(t, e, n, i)
            } finally {
                r && !o && s.end && s.end()
            }
        }
        function Cs(t, e, n, i, s) {
            const r = tn();
            try {
                en(-1),
                2 & i && e.length > Qt && ls(t, e, Qt, Le()),
                n(i, s)
            } finally {
                en(r)
            }
        }
        function xs(t, e, n) {
            if (Xt(e)) {
                const i = e.directiveEnd;
                for (let s = e.directiveStart; s < i; s++) {
                    const e = t.data[s];
                    e.contentQueries && e.contentQueries(1, n[s], s)
                }
            }
        }
        function Es(t, e, n) {
            Oe() && (function(t, e, n, i) {
                const s = n.directiveStart,
                    r = n.directiveEnd;
                t.firstCreatePass || En(n, e),
                _i(i, e);
                const o = n.initialInputs;
                for (let a = s; a < r; a++) {
                    const i = t.data[a],
                        r = ee(i);
                    r && Ls(e, n, i);
                    const l = Nn(e, t, a, n);
                    _i(l, e),
                    null !== o && js(0, a - s, l, i, 0, o),
                    r && (we(n.index, e)[8] = l)
                }
            }(t, e, n, be(n, e)), 128 == (128 & n.flags) && function(t, e, n) {
                const i = n.directiveStart,
                    s = n.directiveEnd,
                    r = n.index,
                    o = Te.lFrame.currentDirectiveIndex;
                try {
                    en(r);
                    for (let n = i; n < s; n++) {
                        const i = t.data[n],
                            s = e[n];
                        $e(n),
                        null === i.hostBindings && 0 === i.hostVars && null === i.hostAttrs || Rs(i, s)
                    }
                } finally {
                    en(-1),
                    $e(o)
                }
            }(t, e, n))
        }
        function Ss(t, e, n=be) {
            const i = e.localNames;
            if (null !== i) {
                let s = e.index + 1;
                for (let r = 0; r < i.length; r += 2) {
                    const o = i[r + 1],
                        a = -1 === o ? n(e, t) : t[o];
                    t[s++] = a
                }
            }
        }
        function ks(t) {
            const e = t.tView;
            return null === e || e.incompleteFirstPass ? t.tView = As(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
        }
        function As(t, e, n, i, s, r, o, a, l, c) {
            const h = Qt + i,
                u = h + s,
                d = function(t, e) {
                    const n = [];
                    for (let i = 0; i < e; i++)
                        n.push(i < t ? null : os);
                    return n
                }(h, u),
                p = "function" == typeof c ? c() : c;
            return d[1] = {
                type: t,
                blueprint: d,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: e,
                data: d.slice().fill(null, h),
                bindingStartIndex: h,
                expandoStartIndex: u,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof r ? r() : r,
                pipeRegistry: "function" == typeof o ? o() : o,
                firstChild: null,
                schemas: l,
                consts: p,
                incompleteFirstPass: !1
            }
        }
        function Ts(t, e, n, i) {
            const s = Ys(e);
            null === n ? s.push(i) : (s.push(n), t.firstCreatePass && Xs(t).push(i, s.length - 1))
        }
        function Os(t, e, n) {
            for (let i in t)
                if (t.hasOwnProperty(i)) {
                    const s = t[i];
                    (n = null === n ? {} : n).hasOwnProperty(i) ? n[i].push(e, s) : n[i] = [e, s]
                }
            return n
        }
        function Is(t, e, n, i, s, r, o, a) {
            const l = be(e, n);
            let c,
                h = e.inputs;
            var u;
            !a && null != h && (c = h[i]) ? (tr(t, n, c, i, s), Jt(e) && function(t, e) {
                const n = we(e, t);
                16 & n[2] || (n[2] |= 64)
            }(n, e.index)) : 3 & e.type && (i = "class" === (u = i) ? "className" : "for" === u ? "htmlFor" : "formaction" === u ? "formAction" : "innerHtml" === u ? "innerHTML" : "readonly" === u ? "readOnly" : "tabindex" === u ? "tabIndex" : u, s = null != o ? o(s, e.value || "", i) : s, me(r) ? r.setProperty(l, i, s) : mn(i) || (l.setProperty ? l.setProperty(i, s) : l[i] = s))
        }
        function Ps(t, e, n, i) {
            let s = !1;
            if (Oe()) {
                const r = function(t, e, n) {
                        const i = t.directiveRegistry;
                        let s = null;
                        if (i)
                            for (let r = 0; r < i.length; r++) {
                                const o = i[r];
                                ns(n, o.selectors, !1) && (s || (s = []), Tn(En(n, e), t, o.type), ee(o) ? (Fs(t, n), s.unshift(o)) : s.push(o))
                            }
                        return s
                    }(t, e, n),
                    o = null === i ? null : {
                        "": -1
                    };
                if (null !== r) {
                    s = !0,
                    Ns(n, t.data.length, r.length);
                    for (let t = 0; t < r.length; t++) {
                        const e = r[t];
                        e.providersResolver && e.providersResolver(e)
                    }
                    let i = !1,
                        a = !1,
                        l = ys(t, e, r.length, null);
                    for (let s = 0; s < r.length; s++) {
                        const c = r[s];
                        n.mergedAttrs = gn(n.mergedAttrs, c.hostAttrs),
                        Ms(t, n, e, l, c),
                        Vs(l, c, o),
                        null !== c.contentQueries && (n.flags |= 8),
                        null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128);
                        const h = c.type.prototype;
                        !i && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), i = !0),
                        a || !h.ngOnChanges && !h.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0),
                        l++
                    }
                    !function(t, e) {
                        const n = e.directiveEnd,
                            i = t.data,
                            s = e.attrs,
                            r = [];
                        let o = null,
                            a = null;
                        for (let l = e.directiveStart; l < n; l++) {
                            const t = i[l],
                                n = t.inputs,
                                c = null === s || Yi(e) ? null : Bs(n, s);
                            r.push(c),
                            o = Os(n, l, o),
                            a = Os(t.outputs, l, a)
                        }
                        null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)),
                        e.initialInputs = r,
                        e.inputs = o,
                        e.outputs = a
                    }(t, n)
                }
                o && function(t, e, n) {
                    if (e) {
                        const i = t.localNames = [];
                        for (let t = 0; t < e.length; t += 2) {
                            const s = n[e[t + 1]];
                            if (null == s)
                                throw new ie("301", `Export of name '${e[t + 1]}' not found!`);
                            i.push(e[t], s)
                        }
                    }
                }(n, i, o)
            }
            return n.mergedAttrs = gn(n.mergedAttrs, n.attrs), s
        }
        function Ds(t, e, n, i, s, r) {
            const o = r.hostBindings;
            if (o) {
                let n = t.hostBindingOpCodes;
                null === n && (n = t.hostBindingOpCodes = []);
                const r = ~e.index;
                (function(t) {
                    let e = t.length;
                    for (; e > 0;) {
                        const n = t[--e];
                        if ("number" == typeof n && n < 0)
                            return n
                    }
                    return 0
                })(n) != r && n.push(r),
                n.push(i, s, o)
            }
        }
        function Rs(t, e) {
            null !== t.hostBindings && t.hostBindings(1, e)
        }
        function Fs(t, e) {
            e.flags |= 2,
            (t.components || (t.components = [])).push(e.index)
        }
        function Vs(t, e, n) {
            if (n) {
                if (e.exportAs)
                    for (let i = 0; i < e.exportAs.length; i++)
                        n[e.exportAs[i]] = t;
                ee(e) && (n[""] = t)
            }
        }
        function Ns(t, e, n) {
            t.flags |= 1,
            t.directiveStart = e,
            t.directiveEnd = e + n,
            t.providerIndexes = e
        }
        function Ms(t, e, n, i, s) {
            t.data[i] = s;
            const r = s.factory || (s.factory = ne(s.type)),
                o = new pn(r, ee(s), null);
            t.blueprint[i] = o,
            n[i] = o,
            Ds(t, e, 0, i, ys(t, n, s.hostVars, os), s)
        }
        function Ls(t, e, n) {
            const i = be(e, t),
                s = ks(n),
                r = t[10],
                o = Ws(t, gs(t, s, null, n.onPush ? 64 : 16, i, e, r, r.createRenderer(i, n), null, null));
            t[e.index] = o
        }
        function js(t, e, n, i, s, r) {
            const o = r[e];
            if (null !== o) {
                const t = i.setInput;
                for (let e = 0; e < o.length;) {
                    const s = o[e++],
                        r = o[e++],
                        a = o[e++];
                    null !== t ? i.setInput(n, a, s, r) : n[r] = a
                }
            }
        }
        function Bs(t, e) {
            let n = null,
                i = 0;
            for (; i < e.length;) {
                const s = e[i];
                if (0 !== s)
                    if (5 !== s) {
                        if ("number" == typeof s)
                            break;
                        t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[i + 1])),
                        i += 2
                    } else
                        i += 2;
                else
                    i += 4
            }
            return n
        }
        function Hs(t, e, n, i) {
            return new Array(t, !0, !1, e, null, 0, i, n, null, null)
        }
        function zs(t, e) {
            const n = we(e, t);
            if (Ee(n)) {
                const t = n[1];
                80 & n[2] ? vs(t, n, t.template, n[8]) : n[5] > 0 && $s(n)
            }
        }
        function $s(t) {
            for (let n = xi(t); null !== n; n = Ei(n))
                for (let t = Kt; t < n.length; t++) {
                    const e = n[t];
                    if (1024 & e[2]) {
                        const t = e[1];
                        vs(t, e, t.template, e[8])
                    } else
                        e[5] > 0 && $s(e)
                }
            const e = t[1].components;
            if (null !== e)
                for (let n = 0; n < e.length; n++) {
                    const i = we(e[n], t);
                    Ee(i) && i[5] > 0 && $s(i)
                }
        }
        function qs(t, e) {
            const n = we(e, t),
                i = n[1];
            !function(t, e) {
                for (let n = e.length; n < t.blueprint.length; n++)
                    e.push(t.blueprint[n])
            }(i, n),
            bs(i, n, n[8])
        }
        function Ws(t, e) {
            return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
        }
        function Us(t) {
            for (; t;) {
                t[2] |= 64;
                const e = Ci(t);
                if (0 != (512 & t[2]) && !e)
                    return t;
                t = e
            }
            return null
        }
        function Zs(t, e, n) {
            const i = e[10];
            i.begin && i.begin();
            try {
                vs(t, e, t.template, n)
            } catch (s) {
                throw Js(e, s), s
            } finally {
                i.end && i.end()
            }
        }
        function Qs(t) {
            !function(t) {
                for (let e = 0; e < t.components.length; e++) {
                    const n = t.components[e],
                        i = Ce(n),
                        s = i[1];
                    ws(s, i, s.template, n)
                }
            }(t[8])
        }
        function Ks(t, e, n) {
            We(0),
            e(t, n)
        }
        const Gs = (() => Promise.resolve(null))();
        function Ys(t) {
            return t[7] || (t[7] = [])
        }
        function Xs(t) {
            return t.cleanup || (t.cleanup = [])
        }
        function Js(t, e) {
            const n = t[9],
                i = n ? n.get(gi, null) : null;
            i && i.handleError(e)
        }
        function tr(t, e, n, i, s) {
            for (let r = 0; r < n.length;) {
                const o = n[r++],
                    a = n[r++],
                    l = e[o],
                    c = t.data[o];
                null !== c.setInput ? c.setInput(l, s, i, a) : l[a] = s
            }
        }
        function er(t, e, n) {
            let i = n ? t.styles : null,
                s = n ? t.classes : null,
                r = 0;
            if (null !== e)
                for (let o = 0; o < e.length; o++) {
                    const t = e[o];
                    "number" == typeof t ? r = t : 1 == r ? s = nt(s, t) : 2 == r && (i = nt(i, t + ": " + e[++o] + ";"))
                }
            n ? t.styles = i : t.stylesWithoutHost = i,
            n ? t.classes = s : t.classesWithoutHost = s
        }
        const nr = new qn("INJECTOR", -1);
        class ir {
            get(t, e=Jn)
            {
                if (e === Jn) {
                    const e = new Error(`NullInjectorError: No provider for ${et(t)}!`);
                    throw e.name = "NullInjectorError", e
                }
                return e
            }
        }
        const sr = new qn("Set Injector scope."),
            rr = {},
            or = {},
            ar = [];
        let lr;
        function cr() {
            return void 0 === lr && (lr = new ir), lr
        }
        function hr(t, e=null, n=null, i) {
            return new ur(t, n, e || cr(), i)
        }
        class ur {
            constructor(t, e, n, i=null)
            {
                this.parent = n,
                this.records = new Map,
                this.injectorDefTypes = new Set,
                this.onDestroy = new Set,
                this._destroyed = !1;
                const s = [];
                e && Un(e, n => this.processProvider(n, t, e)),
                Un([t], t => this.processInjectorType(t, [], s)),
                this.records.set(nr, fr(void 0, this));
                const r = this.records.get(sr);
                this.scope = null != r ? r.value : null,
                this.source = i || ("object" == typeof t ? null : et(t))
            }
            get destroyed()
            {
                return this._destroyed
            }
            destroy()
            {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    this.onDestroy.forEach(t => t.ngOnDestroy())
                } finally {
                    this.records.clear(),
                    this.onDestroy.clear(),
                    this.injectorDefTypes.clear()
                }
            }
            get(t, e=Jn, n=gt.Default)
            {
                this.assertNotDestroyed();
                const i = si(this);
                try {
                    if (!(n & gt.SkipSelf)) {
                        let e = this.records.get(t);
                        if (void 0 === e) {
                            const n = ("function" == typeof (s = t) || "object" == typeof s && s instanceof qn) && ct(t);
                            e = n && this.injectableDefInScope(n) ? fr(dr(t), rr) : null,
                            this.records.set(t, e)
                        }
                        if (null != e)
                            return this.hydrate(t, e)
                    }
                    return (n & gt.Self ? cr() : this.parent).get(t, e = n & gt.Optional && e === Jn ? null : e)
                } catch (r) {
                    if ("NullInjectorError" === r.name) {
                        if ((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(et(t)), i)
                            throw r;
                        return function(t, e, n, i) {
                            const s = t.ngTempTokenPath;
                            throw e[ei] && s.unshift(e[ei]), t.message = function(t, e, n, i=null) {
                                t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                                let s = et(e);
                                if (Array.isArray(e))
                                    s = e.map(et).join(" -> ");
                                else if ("object" == typeof e) {
                                    let t = [];
                                    for (let n in e)
                                        if (e.hasOwnProperty(n)) {
                                            let i = e[n];
                                            t.push(n + ":" + ("string" == typeof i ? JSON.stringify(i) : et(i)))
                                        }
                                    s = `{${t.join(", ")}}`
                                }
                                return `${n}${i ? "(" + i + ")" : ""}[${s}]: ${t.replace(ti, "\n  ")}`
                            }("\n" + t.message, s, n, i), t.ngTokenPath = s, t.ngTempTokenPath = null, t
                        }(r, t, "R3InjectorError", this.source)
                    }
                    throw r
                } finally {
                    si(i)
                }
                var s
            }
            _resolveInjectorDefTypes()
            {
                this.injectorDefTypes.forEach(t => this.get(t))
            }
            toString()
            {
                const t = [];
                return this.records.forEach((e, n) => t.push(et(n))), `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed()
            {
                if (this._destroyed)
                    throw new Error("Injector has already been destroyed.")
            }
            processInjectorType(t, e, n)
            {
                if (!(t = rt(t)))
                    return !1;
                let i = ut(t);
                const s = null == i && t.ngModule || void 0,
                    r = void 0 === s ? t : s,
                    o = -1 !== n.indexOf(r);
                if (void 0 !== s && (i = ut(s)), null == i)
                    return !1;
                if (null != i.imports && !o) {
                    let t;
                    n.push(r);
                    try {
                        Un(i.imports, i => {
                            this.processInjectorType(i, e, n) && (void 0 === t && (t = []), t.push(i))
                        })
                    } finally {}
                    if (void 0 !== t)
                        for (let e = 0; e < t.length; e++) {
                            const {ngModule: n, providers: i} = t[e];
                            Un(i, t => this.processProvider(t, n, i || ar))
                        }
                }
                this.injectorDefTypes.add(r),
                this.records.set(r, fr(i.factory, rr));
                const a = i.providers;
                if (null != a && !o) {
                    const e = t;
                    Un(a, t => this.processProvider(t, e, a))
                }
                return void 0 !== s && void 0 !== t.providers
            }
            processProvider(t, e, n)
            {
                let i = gr(t = rt(t)) ? t : rt(t && t.provide);
                const s = function(t, e, n) {
                    return mr(t) ? fr(void 0, t.useValue) : fr(pr(t), rr)
                }(t);
                if (gr(t) || !0 !== t.multi)
                    this.records.get(i);
                else {
                    let e = this.records.get(i);
                    e || (e = fr(void 0, rr, !0), e.factory = () => li(e.multi), this.records.set(i, e)),
                    i = t,
                    e.multi.push(t)
                }
                this.records.set(i, s)
            }
            hydrate(t, e)
            {
                var n;
                return e.value === rr && (e.value = or, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
            }
            injectableDefInScope(t)
            {
                return !!t.providedIn && ("string" == typeof t.providedIn ? "any" === t.providedIn || t.providedIn === this.scope : this.injectorDefTypes.has(t.providedIn))
            }
        }
        function dr(t) {
            const e = ct(t),
                n = null !== e ? e.factory : ne(t);
            if (null !== n)
                return n;
            const i = ut(t);
            if (null !== i)
                return i.factory;
            if (t instanceof qn)
                throw new Error(`Token ${et(t)} is missing a \u0275prov definition.`);
            if (t instanceof Function)
                return function(t) {
                    const e = t.length;
                    if (e > 0) {
                        const n = Kn(e, "?");
                        throw new Error(`Can't resolve all parameters for ${et(t)}: (${n.join(", ")}).`)
                    }
                    const n = function(t) {
                        const e = t && (t[dt] || t[ft]);
                        if (e) {
                            const n = function(t) {
                                if (t.hasOwnProperty("name"))
                                    return t.name;
                                const e = ("" + t).match(/^function\s*([^\s(]+)/);
                                return null === e ? "" : e[1]
                            }(t);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
                        }
                        return null
                    }(t);
                    return null !== n ? () => n.factory(t) : () => new t
                }(t);
            throw new Error("unreachable")
        }
        function pr(t, e, n) {
            let i;
            if (gr(t)) {
                const e = rt(t);
                return ne(e) || dr(e)
            }
            if (mr(t))
                i = () => rt(t.useValue);
            else if ((s = t) && s.useFactory)
                i = () => t.useFactory(...li(t.deps || []));
            else if (function(t) {
                return !(!t || !t.useExisting)
            }(t))
                i = () => oi(rt(t.useExisting));
            else {
                const e = rt(t && (t.useClass || t.provide));
                if (!function(t) {
                    return !!t.deps
                }(t))
                    return ne(e) || dr(e);
                i = () => new e(...li(t.deps))
            }
            var s;
            return i
        }
        function fr(t, e, n=!1) {
            return {
                factory: t,
                value: e,
                multi: n ? [] : void 0
            }
        }
        function mr(t) {
            return null !== t && "object" == typeof t && ni in t
        }
        function gr(t) {
            return "function" == typeof t
        }
        const _r = function(t, e, n) {
            return function(t, e=null, n=null, i) {
                const s = hr(t, e, n, i);
                return s._resolveInjectorDefTypes(), s
            }({
                name: n
            }, e, t, n)
        };
        let yr = (() => {
            class t {
                static create(t, e)
                {
                    return Array.isArray(t) ? _r(t, e, "") : _r(t.providers, t.parent, t.name || "")
                }
            }
            return t.THROW_IF_NOT_FOUND = Jn, t.NULL = new ir, t.\u0275prov = at({
                token: t,
                providedIn: "any",
                factory: () => oi(nr)
            }), t.__NG_ELEMENT_ID__ = -1, t
        })();
        function br(t, e) {
            on(Ce(t)[1], Re())
        }
        function vr(t) {
            let e = Object.getPrototypeOf(t.type.prototype).constructor,
                n = !0;
            const i = [t];
            for (; e;) {
                let s;
                if (ee(t))
                    s = e.\u0275cmp || e.\u0275dir;
                else {
                    if (e.\u0275cmp)
                        throw new Error("Directives cannot inherit Components");
                    s = e.\u0275dir
                }
                if (s) {
                    if (n) {
                        i.push(s);
                        const e = t;
                        e.inputs = wr(t.inputs),
                        e.declaredInputs = wr(t.declaredInputs),
                        e.outputs = wr(t.outputs);
                        const n = s.hostBindings;
                        n && Er(t, n);
                        const r = s.viewQuery,
                            o = s.contentQueries;
                        if (r && Cr(t, r), o && xr(t, o), tt(t.inputs, s.inputs), tt(t.declaredInputs, s.declaredInputs), tt(t.outputs, s.outputs), ee(s) && s.data.animation) {
                            const e = t.data;
                            e.animation = (e.animation || []).concat(s.data.animation)
                        }
                    }
                    const e = s.features;
                    if (e)
                        for (let i = 0; i < e.length; i++) {
                            const s = e[i];
                            s && s.ngInherit && s(t),
                            s === vr && (n = !1)
                        }
                }
                e = Object.getPrototypeOf(e)
            }
            !function(t) {
                let e = 0,
                    n = null;
                for (let i = t.length - 1; i >= 0; i--) {
                    const s = t[i];
                    s.hostVars = e += s.hostVars,
                    s.hostAttrs = gn(s.hostAttrs, n = gn(n, s.hostAttrs))
                }
            }(i)
        }
        function wr(t) {
            return t === Tt ? {} : t === Ot ? [] : t
        }
        function Cr(t, e) {
            const n = t.viewQuery;
            t.viewQuery = n ? (t, i) => {
                e(t, i),
                n(t, i)
            } : e
        }
        function xr(t, e) {
            const n = t.contentQueries;
            t.contentQueries = n ? (t, i, s) => {
                e(t, i, s),
                n(t, i, s)
            } : e
        }
        function Er(t, e) {
            const n = t.hostBindings;
            t.hostBindings = n ? (t, i) => {
                e(t, i),
                n(t, i)
            } : e
        }
        let Sr = null;
        function kr() {
            if (!Sr) {
                const t = At.Symbol;
                if (t && t.iterator)
                    Sr = t.iterator;
                else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let e = 0; e < t.length; ++e) {
                        const n = t[e];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Sr = n)
                    }
                }
            }
            return Sr
        }
        class Ar {
            constructor(t)
            {
                this.wrapped = t
            }
            static wrap(t)
            {
                return new Ar(t)
            }
            static unwrap(t)
            {
                return Ar.isWrapped(t) ? t.wrapped : t
            }
            static isWrapped(t)
            {
                return t instanceof Ar
            }
        }
        function Tr(t) {
            return !!Or(t) && (Array.isArray(t) || !(t instanceof Map) && kr() in t)
        }
        function Or(t) {
            return null !== t && ("function" == typeof t || "object" == typeof t)
        }
        function Ir(t, e, n) {
            return !Object.is(t[e], n) && (t[e] = n, !0)
        }
        function Pr(t, e, n, i) {
            const s = Ie();
            return Ir(s, He(), e) && (Pe(), function(t, e, n, i, s, r) {
                const o = be(t, e);
                !function(t, e, n, i, s, r, o) {
                    if (null == r)
                        me(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s);
                    else {
                        const a = null == o ? se(r) : o(r, i || "", s);
                        me(t) ? t.setAttribute(e, s, a, n) : n ? e.setAttributeNS(n, s, a) : e.setAttribute(s, a)
                    }
                }(e[11], o, r, t.value, n, i, s)
            }(nn(), s, t, e, n, i)), Pr
        }
        function Dr(t, e, n, i, s, r, o, a) {
            const l = Ie(),
                c = Pe(),
                h = t + Qt,
                u = c.firstCreatePass ? function(t, e, n, i, s, r, o, a, l) {
                    const c = e.consts,
                        h = _s(e, t, 4, o || null, Se(c, a));
                    Ps(e, n, h, Se(c, l)),
                    on(e, h);
                    const u = h.tViews = As(2, h, i, s, r, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
                    return null !== e.queries && (e.queries.template(e, h), u.queries = e.queries.embeddedTView(h)), h
                }(h, c, l, e, n, i, s, r, o) : c.data[h];
            Ve(u, !1);
            const d = l[11].createComment("");
            ji(c, l, d, u),
            _i(d, l),
            Ws(l, l[h] = Hs(d, l, d, u)),
            te(u) && Es(c, l, u),
            null != o && Ss(l, u, a)
        }
        function Rr(t, e=gt.Default) {
            const n = Ie();
            return null === n ? oi(t, e) : Pn(Re(), n, rt(t), e)
        }
        function Fr(t, e, n) {
            const i = Ie();
            return Ir(i, He(), e) && Is(Pe(), nn(), i, t, e, i[11], n, !1), Fr
        }
        function Vr(t, e, n, i, s) {
            const r = s ? "class" : "style";
            tr(t, n, e.inputs[r], r, i)
        }
        function Nr(t, e, n, i) {
            const s = Ie(),
                r = Pe(),
                o = Qt + t,
                a = s[11],
                l = s[o] = Ai(a, e, Te.lFrame.currentNamespace),
                c = r.firstCreatePass ? function(t, e, n, i, s, r, o) {
                    const a = e.consts,
                        l = _s(e, t, 2, s, Se(a, r));
                    return Ps(e, n, l, Se(a, o)), null !== l.attrs && er(l, l.attrs, !1), null !== l.mergedAttrs && er(l, l.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, l), l
                }(o, r, s, 0, e, n, i) : r.data[o];
            Ve(c, !0);
            const h = c.mergedAttrs;
            null !== h && fn(a, l, h);
            const u = c.classes;
            null !== u && Zi(a, l, u);
            const d = c.styles;
            null !== d && Ui(a, l, d),
            64 != (64 & c.flags) && ji(r, s, l, c),
            0 === Te.lFrame.elementDepthCount && _i(l, s),
            Te.lFrame.elementDepthCount++,
            te(c) && (Es(r, s, c), xs(r, c, s)),
            null !== i && Ss(s, c)
        }
        function Mr() {
            let t = Re();
            Ne() ? Me() : (t = t.parent, Ve(t, !1));
            const e = t;
            Te.lFrame.elementDepthCount--;
            const n = Pe();
            n.firstCreatePass && (on(n, t), Xt(t) && n.queries.elementEnd(t)),
            null != e.classesWithoutHost && function(t) {
                return 0 != (16 & t.flags)
            }(e) && Vr(n, e, Ie(), e.classesWithoutHost, !0),
            null != e.stylesWithoutHost && function(t) {
                return 0 != (32 & t.flags)
            }(e) && Vr(n, e, Ie(), e.stylesWithoutHost, !1)
        }
        function Lr(t, e, n, i) {
            Nr(t, e, n, i),
            Mr()
        }
        function jr(t, e, n) {
            const i = Ie(),
                s = Pe(),
                r = t + Qt,
                o = s.firstCreatePass ? function(t, e, n, i, s) {
                    const r = e.consts,
                        o = Se(r, i),
                        a = _s(e, t, 8, "ng-container", o);
                    return null !== o && er(a, o, !0), Ps(e, n, a, Se(r, s)), null !== e.queries && e.queries.elementStart(e, a), a
                }(r, s, i, e, n) : s.data[r];
            Ve(o, !0);
            const a = i[r] = i[11].createComment("");
            ji(s, i, a, o),
            _i(a, i),
            te(o) && (Es(s, i, o), xs(s, o, i)),
            null != n && Ss(i, o)
        }
        function Br() {
            let t = Re();
            const e = Pe();
            Ne() ? Me() : (t = t.parent, Ve(t, !1)),
            e.firstCreatePass && (on(e, t), Xt(t) && e.queries.elementEnd(t))
        }
        function Hr() {
            return Ie()
        }
        function zr(t) {
            return !!t && "function" == typeof t.then
        }
        function $r(t, e, n=!1, i) {
            const s = Ie(),
                r = Pe(),
                o = Re();
            return function(t, e, n, i, s, r, o=!1, a) {
                const l = te(i),
                    c = t.firstCreatePass && Xs(t),
                    h = Ys(e);
                let u = !0;
                if (3 & i.type) {
                    const d = be(i, e),
                        p = a ? a(d) : Tt,
                        f = p.target || d,
                        m = h.length,
                        g = a ? t => a(_e(t[i.index])).target : i.index;
                    if (me(n)) {
                        let o = null;
                        if (!a && l && (o = function(t, e, n, i) {
                            const s = t.cleanup;
                            if (null != s)
                                for (let r = 0; r < s.length - 1; r += 2) {
                                    const t = s[r];
                                    if (t === n && s[r + 1] === i) {
                                        const t = e[7],
                                            n = s[r + 2];
                                        return t.length > n ? t[n] : null
                                    }
                                    "string" == typeof t && (r += 2)
                                }
                            return null
                        }(t, e, s, i.index)), null !== o)
                            (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r,
                            o.__ngLastListenerFn__ = r,
                            u = !1;
                        else {
                            r = Wr(i, e, r, !1);
                            const t = n.listen(p.name || f, s, r);
                            h.push(r, t),
                            c && c.push(s, g, m, m + 1)
                        }
                    } else
                        r = Wr(i, e, r, !0),
                        f.addEventListener(s, r, o),
                        h.push(r),
                        c && c.push(s, g, m, o)
                } else
                    r = Wr(i, e, r, !1);
                const d = i.outputs;
                let p;
                if (u && null !== d && (p = d[s])) {
                    const t = p.length;
                    if (t)
                        for (let n = 0; n < t; n += 2) {
                            const t = e[p[n]][p[n + 1]].subscribe(r),
                                o = h.length;
                            h.push(r, t),
                            c && c.push(s, i.index, o, -(o + 1))
                        }
                }
            }(r, s, s[11], o, t, e, n, i), $r
        }
        function qr(t, e, n) {
            try {
                return !1 !== e(n)
            } catch (i) {
                return Js(t, i), !1
            }
        }
        function Wr(t, e, n, i) {
            return function s(r) {
                if (r === Function)
                    return n;
                const o = 2 & t.flags ? we(t.index, e) : e;
                0 == (32 & e[2]) && Us(o);
                let a = qr(e, n, r),
                    l = s.__ngNextListenerFn__;
                for (; l;)
                    a = qr(e, l, r) && a,
                    l = l.__ngNextListenerFn__;
                return i && !1 === a && (r.preventDefault(), r.returnValue = !1), a
            }
        }
        function Ur(t=1) {
            return function(t) {
                return (Te.lFrame.contextLView = function(t, e) {
                    for (; t > 0;)
                        e = e[15],
                        t--;
                    return e
                }(t, Te.lFrame.contextLView))[8]
            }(t)
        }
        function Zr(t, e) {
            let n = null;
            const i = function(t) {
                const e = t.attrs;
                if (null != e) {
                    const t = e.indexOf(5);
                    if (0 == (1 & t))
                        return e[t + 1]
                }
                return null
            }(t);
            for (let s = 0; s < e.length; s++) {
                const r = e[s];
                if ("*" !== r) {
                    if (null === i ? ns(t, r, !0) : is(i, r))
                        return s
                } else
                    n = s
            }
            return n
        }
        function Qr(t) {
            const e = Ie()[16][6];
            if (!e.projection) {
                const n = e.projection = Kn(t ? t.length : 1, null),
                    i = n.slice();
                let s = e.child;
                for (; null !== s;) {
                    const e = t ? Zr(s, t) : 0;
                    null !== e && (i[e] ? i[e].projectionNext = s : n[e] = s, i[e] = s),
                    s = s.next
                }
            }
        }
        function Kr(t, e=0, n) {
            const i = Ie(),
                s = Pe(),
                r = _s(s, Qt + t, 16, null, n || null);
            null === r.projection && (r.projection = e),
            Me(),
            64 != (64 & r.flags) && function(t, e, n) {
                Wi(e[11], 0, e, n, Di(t, n, e), Mi(n.parent || e[6], n, e))
            }(s, i, r)
        }
        const Gr = [];
        function Yr(t, e, n, i, s) {
            const r = t[n + 1],
                o = null === e;
            let a = i ? hs(r) : ds(r),
                l = !1;
            for (; 0 !== a && (!1 === l || o);) {
                const n = t[a + 1];
                Xr(t[a], e) && (l = !0, t[a + 1] = i ? fs(n) : us(n)),
                a = i ? hs(n) : ds(n)
            }
            l && (t[n + 1] = i ? us(r) : fs(r))
        }
        function Xr(t, e) {
            return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && Xn(t, e) >= 0
        }
        function Jr(t, e, n) {
            return eo(t, e, n, !1), Jr
        }
        function to(t, e) {
            return eo(t, e, null, !0), to
        }
        function eo(t, e, n, i) {
            const s = Ie(),
                r = Pe(),
                o = function(t) {
                    const e = Te.lFrame,
                        n = e.bindingIndex;
                    return e.bindingIndex = e.bindingIndex + 2, n
                }();
            r.firstUpdatePass && function(t, e, n, i) {
                const s = t.data;
                if (null === s[n + 1]) {
                    const r = s[tn()],
                        o = function(t, e) {
                            return e >= t.expandoStartIndex
                        }(t, n);
                    (function(t, e) {
                        return 0 != (t.flags & (e ? 16 : 32))
                    })(r, i) && null === e && !o && (e = !1),
                    e = function(t, e, n, i) {
                        const s = function(t) {
                            const e = Te.lFrame.currentDirectiveIndex;
                            return -1 === e ? null : t[e]
                        }(t);
                        let r = i ? e.residualClasses : e.residualStyles;
                        if (null === s)
                            0 === (i ? e.classBindings : e.styleBindings) && (n = io(n = no(null, t, e, n, i), e.attrs, i), r = null);
                        else {
                            const o = e.directiveStylingLast;
                            if (-1 === o || t[o] !== s)
                                if (n = no(s, t, e, n, i), null === r) {
                                    let n = function(t, e, n) {
                                        const i = n ? e.classBindings : e.styleBindings;
                                        if (0 !== ds(i))
                                            return t[hs(i)]
                                    }(t, e, i);
                                    void 0 !== n && Array.isArray(n) && (n = no(null, t, e, n[1], i), n = io(n, e.attrs, i), function(t, e, n, i) {
                                        t[hs(n ? e.classBindings : e.styleBindings)] = i
                                    }(t, e, i, n))
                                } else
                                    r = function(t, e, n) {
                                        let i;
                                        const s = e.directiveEnd;
                                        for (let r = 1 + e.directiveStylingLast; r < s; r++)
                                            i = io(i, t[r].hostAttrs, n);
                                        return io(i, e.attrs, n)
                                    }(t, e, i)
                        }
                        return void 0 !== r && (i ? e.residualClasses = r : e.residualStyles = r), n
                    }(s, r, e, i),
                    function(t, e, n, i, s, r) {
                        let o = r ? e.classBindings : e.styleBindings,
                            a = hs(o),
                            l = ds(o);
                        t[i] = n;
                        let c,
                            h = !1;
                        if (Array.isArray(n)) {
                            const t = n;
                            c = t[1],
                            (null === c || Xn(t, c) > 0) && (h = !0)
                        } else
                            c = n;
                        if (s)
                            if (0 !== l) {
                                const e = hs(t[a + 1]);
                                t[i + 1] = cs(e, a),
                                0 !== e && (t[e + 1] = ps(t[e + 1], i)),
                                t[a + 1] = 131071 & t[a + 1] | i << 17
                            } else
                                t[i + 1] = cs(a, 0),
                                0 !== a && (t[a + 1] = ps(t[a + 1], i)),
                                a = i;
                        else
                            t[i + 1] = cs(l, 0),
                            0 === a ? a = i : t[l + 1] = ps(t[l + 1], i),
                            l = i;
                        h && (t[i + 1] = us(t[i + 1])),
                        Yr(t, c, i, !0),
                        Yr(t, c, i, !1),
                        function(t, e, n, i, s) {
                            const r = s ? t.residualClasses : t.residualStyles;
                            null != r && "string" == typeof e && Xn(r, e) >= 0 && (n[i + 1] = fs(n[i + 1]))
                        }(e, c, t, i, r),
                        o = cs(a, l),
                        r ? e.classBindings = o : e.styleBindings = o
                    }(s, r, e, n, o, i)
                }
            }(r, t, o, i),
            e !== os && Ir(s, o, e) && function(t, e, n, i, s, r, o, a) {
                if (!(3 & e.type))
                    return;
                const l = t.data,
                    c = l[a + 1];
                ro(1 == (1 & c) ? so(l, e, n, s, ds(c), o) : void 0) || (ro(r) || function(t) {
                    return 2 == (2 & t)
                }(c) && (r = so(l, null, n, s, a, o)), function(t, e, n, i, s) {
                    const r = me(t);
                    if (e)
                        s ? r ? t.addClass(n, i) : n.classList.add(i) : r ? t.removeClass(n, i) : n.classList.remove(i);
                    else {
                        let e = -1 === i.indexOf("-") ? void 0 : vi.DashCase;
                        if (null == s)
                            r ? t.removeStyle(n, i, e) : n.style.removeProperty(i);
                        else {
                            const o = "string" == typeof s && s.endsWith("!important");
                            o && (s = s.slice(0, -10), e |= vi.Important),
                            r ? t.setStyle(n, i, s, e) : n.style.setProperty(i, s, o ? "important" : "")
                        }
                    }
                }(i, o, ye(tn(), n), s, r))
            }(r, r.data[tn()], s, s[11], t, s[o + 1] = function(t, e) {
                return null == t || ("string" == typeof e ? t += e : "object" == typeof t && (t = et(function(t) {
                    return t instanceof class {
                        constructor(t)
                        {
                            this.changingThisBreaksApplicationSecurity = t
                        }
                        toString()
                        {
                            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
                        }
                    }
                    ? t.changingThisBreaksApplicationSecurity : t
                }(t)))), t
            }(e, n), i, o)
        }
        function no(t, e, n, i, s) {
            let r = null;
            const o = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < o && (r = e[a], i = io(i, r.hostAttrs, s), r !== t);)
                a++;
            return null !== t && (n.directiveStylingLast = a), i
        }
        function io(t, e, n) {
            const i = n ? 1 : 2;
            let s = -1;
            if (null !== e)
                for (let r = 0; r < e.length; r++) {
                    const o = e[r];
                    "number" == typeof o ? s = o : s === i && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Gn(t, o, !!n || e[++r]))
                }
            return void 0 === t ? null : t
        }
        function so(t, e, n, i, s, r) {
            const o = null === e;
            let a;
            for (; s > 0;) {
                const e = t[s],
                    r = Array.isArray(e),
                    l = r ? e[1] : e,
                    c = null === l;
                let h = n[s + 1];
                h === os && (h = c ? Gr : void 0);
                let u = c ? Yn(h, i) : l === i ? h : void 0;
                if (r && !ro(u) && (u = Yn(e, i)), ro(u) && (a = u, o))
                    return a;
                const d = t[s + 1];
                s = o ? hs(d) : ds(d)
            }
            if (null !== e) {
                let t = r ? e.residualClasses : e.residualStyles;
                null != t && (a = Yn(t, i))
            }
            return a
        }
        function ro(t) {
            return void 0 !== t
        }
        function oo(t, e="") {
            const n = Ie(),
                i = Pe(),
                s = t + Qt,
                r = i.firstCreatePass ? _s(i, s, 1, e, null) : i.data[s],
                o = n[s] = function(t, e) {
                    return me(t) ? t.createText(e) : t.createTextNode(e)
                }(n[11], e);
            ji(i, n, o, r),
            Ve(r, !1)
        }
        function ao(t) {
            return lo("", t, ""), ao
        }
        function lo(t, e, n) {
            const i = Ie(),
                s = function(t, e, n, i) {
                    return Ir(t, He(), n) ? e + se(n) + i : os
                }(i, t, e, n);
            return s !== os && function(t, e, n) {
                const i = ye(e, t);
                !function(t, e, n) {
                    me(t) ? t.setValue(e, n) : e.textContent = n
                }(t[11], i, n)
            }(i, tn(), s), lo
        }
        function co(t, e, n) {
            const i = Ie();
            return Ir(i, He(), e) && Is(Pe(), nn(), i, t, e, i[11], n, !0), co
        }
        const ho = void 0;
        var uo = ["en", [["a", "p"], ["AM", "PM"], ho], [["AM", "PM"], ho, ho], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], ho, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], ho, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", ho, "{1} 'at' {0}", ho], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function(t) {
            let e = Math.floor(Math.abs(t)),
                n = t.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === e && 0 === n ? 1 : 5
        }];
        let po = {};
        function fo(t) {
            const e = function(t) {
                return t.toLowerCase().replace(/_/g, "-")
            }(t);
            let n = mo(e);
            if (n)
                return n;
            const i = e.split("-")[0];
            if (n = mo(i), n)
                return n;
            if ("en" === i)
                return uo;
            throw new Error(`Missing locale data for the locale "${t}".`)
        }
        function mo(t) {
            return t in po || (po[t] = At.ng && At.ng.common && At.ng.common.locales && At.ng.common.locales[t]), po[t]
        }
        var go = function(t) {
            return t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData", t
        }({});
        const _o = "en-US";
        let yo = _o;
        function bo(t) {
            var e,
                n;
            n = "Expected localeId to be defined",
            null == (e = t) && function(t, e, n, i) {
                throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)
            }(n, e),
            "string" == typeof t && (yo = t.toLowerCase().replace(/_/g, "-"))
        }
        function vo(t, e, n, i, s) {
            if (t = rt(t), Array.isArray(t))
                for (let r = 0; r < t.length; r++)
                    vo(t[r], e, n, i, s);
            else {
                const r = Pe(),
                    o = Ie();
                let a = gr(t) ? t : rt(t.provide),
                    l = pr(t);
                const c = Re(),
                    h = 1048575 & c.providerIndexes,
                    u = c.directiveStart,
                    d = c.providerIndexes >> 20;
                if (gr(t) || !t.multi) {
                    const i = new pn(l, s, Rr),
                        p = xo(a, e, s ? h : h + d, u);
                    -1 === p ? (Tn(En(c, o), r, a), wo(r, t, e.length), e.push(a), c.directiveStart++, c.directiveEnd++, s && (c.providerIndexes += 1048576), n.push(i), o.push(i)) : (n[p] = i, o[p] = i)
                } else {
                    const p = xo(a, e, h + d, u),
                        f = xo(a, e, h, h + d),
                        m = p >= 0 && n[p],
                        g = f >= 0 && n[f];
                    if (s && !g || !s && !m) {
                        Tn(En(c, o), r, a);
                        const h = function(t, e, n, i, s) {
                            const r = new pn(t, n, Rr);
                            return r.multi = [], r.index = e, r.componentProviders = 0, Co(r, s, i && !n), r
                        }(s ? So : Eo, n.length, s, i, l);
                        !s && g && (n[f].providerFactory = h),
                        wo(r, t, e.length, 0),
                        e.push(a),
                        c.directiveStart++,
                        c.directiveEnd++,
                        s && (c.providerIndexes += 1048576),
                        n.push(h),
                        o.push(h)
                    } else
                        wo(r, t, p > -1 ? p : f, Co(n[s ? f : p], l, !s && i));
                    !s && i && g && n[f].componentProviders++
                }
            }
        }
        function wo(t, e, n, i) {
            const s = gr(e);
            if (s || e.useClass) {
                const r = (e.useClass || e).prototype.ngOnDestroy;
                if (r) {
                    const o = t.destroyHooks || (t.destroyHooks = []);
                    if (!s && e.multi) {
                        const t = o.indexOf(n);
                        -1 === t ? o.push(n, [i, r]) : o[t + 1].push(i, r)
                    } else
                        o.push(n, r)
                }
            }
        }
        function Co(t, e, n) {
            return n && t.componentProviders++, t.multi.push(e) - 1
        }
        function xo(t, e, n, i) {
            for (let s = n; s < i; s++)
                if (e[s] === t)
                    return s;
            return -1
        }
        function Eo(t, e, n, i) {
            return ko(this.multi, [])
        }
        function So(t, e, n, i) {
            const s = this.multi;
            let r;
            if (this.providerFactory) {
                const t = this.providerFactory.componentProviders,
                    e = Nn(n, n[1], this.providerFactory.index, i);
                r = e.slice(0, t),
                ko(s, r);
                for (let n = t; n < e.length; n++)
                    r.push(e[n])
            } else
                r = [],
                ko(s, r);
            return r
        }
        function ko(t, e) {
            for (let n = 0; n < t.length; n++)
                e.push((0, t[n])());
            return e
        }
        function Ao(t, e=[]) {
            return n => {
                n.providersResolver = (n, i) => function(t, e, n) {
                    const i = Pe();
                    if (i.firstCreatePass) {
                        const s = ee(t);
                        vo(n, i.data, i.blueprint, s, !0),
                        vo(e, i.data, i.blueprint, s, !1)
                    }
                }(n, i ? i(t) : t, e)
            }
        }
        class To {}
        class Oo {
            resolveComponentFactory(t)
            {
                throw function(t) {
                    const e = Error(`No component factory found for ${et(t)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = t, e
                }(t)
            }
        }
        let Io = (() => {
            class t {}
            return t.NULL = new Oo, t
        })();
        function Po(...t) {}
        function Do(t, e) {
            return new Fo(be(t, e))
        }
        const Ro = function() {
            return Do(Re(), Ie())
        };
        let Fo = (() => {
            class t {
                constructor(t)
                {
                    this.nativeElement = t
                }
            }
            return t.__NG_ELEMENT_ID__ = Ro, t
        })();
        function Vo(t) {
            return t instanceof Fo ? t.nativeElement : t
        }
        class No {}
        let Mo = (() => {
            class t {}
            return t.__NG_ELEMENT_ID__ = () => Lo(), t
        })();
        const Lo = function() {
            const t = Ie(),
                e = we(Re().index, t);
            return function(t) {
                return t[11]
            }(Gt(e) ? e : t)
        };
        let jo = (() => {
            class t {}
            return t.\u0275prov = at({
                token: t,
                providedIn: "root",
                factory: () => null
            }), t
        })();
        class Bo {
            constructor(t)
            {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const Ho = new Bo("11.2.0");
        class zo {
            constructor() {}
            supports(t)
            {
                return Tr(t)
            }
            create(t)
            {
                return new qo(t)
            }
        }
        const $o = (t, e) => e;
        class qo {
            constructor(t)
            {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = t || $o
            }
            forEachItem(t)
            {
                let e;
                for (e = this._itHead; null !== e; e = e._next)
                    t(e)
            }
            forEachOperation(t)
            {
                let e = this._itHead,
                    n = this._removalsHead,
                    i = 0,
                    s = null;
                for (; e || n;) {
                    const r = !n || e && e.currentIndex < Qo(n, i, s) ? e : n,
                        o = Qo(r, i, s),
                        a = r.currentIndex;
                    if (r === n)
                        i--,
                        n = n._nextRemoved;
                    else if (e = e._next, null == r.previousIndex)
                        i++;
                    else {
                        s || (s = []);
                        const t = o - i,
                            e = a - i;
                        if (t != e) {
                            for (let n = 0; n < t; n++) {
                                const i = n < s.length ? s[n] : s[n] = 0,
                                    r = i + n;
                                e <= r && r < t && (s[n] = i + 1)
                            }
                            s[r.previousIndex] = e - t
                        }
                    }
                    o !== a && t(r, o, a)
                }
            }
            forEachPreviousItem(t)
            {
                let e;
                for (e = this._previousItHead; null !== e; e = e._nextPrevious)
                    t(e)
            }
            forEachAddedItem(t)
            {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded)
                    t(e)
            }
            forEachMovedItem(t)
            {
                let e;
                for (e = this._movesHead; null !== e; e = e._nextMoved)
                    t(e)
            }
            forEachRemovedItem(t)
            {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                    t(e)
            }
            forEachIdentityChange(t)
            {
                let e;
                for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange)
                    t(e)
            }
            diff(t)
            {
                if (null == t && (t = []), !Tr(t))
                    throw new Error(`Error trying to diff '${et(t)}'. Only arrays and iterables are allowed`);
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t)
            {
                this._reset();
                let e,
                    n,
                    i,
                    s = this._itHead,
                    r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let e = 0; e < this.length; e++)
                        n = t[e],
                        i = this._trackByFn(e, n),
                        null !== s && Object.is(s.trackById, i) ? (r && (s = this._verifyReinsertion(s, n, i, e)), Object.is(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, i, e), r = !0),
                        s = s._next
                } else
                    e = 0,
                    function(t, e) {
                        if (Array.isArray(t))
                            for (let n = 0; n < t.length; n++)
                                e(t[n]);
                        else {
                            const n = t[kr()]();
                            let i;
                            for (; !(i = n.next()).done;)
                                e(i.value)
                        }
                    }(t, t => {
                        i = this._trackByFn(e, t),
                        null !== s && Object.is(s.trackById, i) ? (r && (s = this._verifyReinsertion(s, t, i, e)), Object.is(s.item, t) || this._addIdentityChange(s, t)) : (s = this._mismatch(s, t, i, e), r = !0),
                        s = s._next,
                        e++
                    }),
                    this.length = e;
                return this._truncate(s), this.collection = t, this.isDirty
            }
            get isDirty()
            {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset()
            {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded)
                        t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved)
                        t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(t, e, n, i)
            {
                let s;
                return null === t ? s = this._itTail : (s = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, i)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, i)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, i)) : t = this._addAfter(new Wo(e, n), s, i), t
            }
            _verifyReinsertion(t, e, n, i)
            {
                let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== s ? t = this._reinsertAfter(s, t._prev, i) : t.currentIndex != i && (t.currentIndex = i, this._addToMoves(t, i)), t
            }
            _truncate(t)
            {
                for (; null !== t;) {
                    const e = t._next;
                    this._addToRemovals(this._unlink(t)),
                    t = e
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(t, e, n)
            {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const i = t._prevRemoved,
                    s = t._nextRemoved;
                return null === i ? this._removalsHead = s : i._nextRemoved = s, null === s ? this._removalsTail = i : s._prevRemoved = i, this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }
            _moveAfter(t, e, n)
            {
                return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }
            _addAfter(t, e, n)
            {
                return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
            }
            _insertAfter(t, e, n)
            {
                const i = null === e ? this._itHead : e._next;
                return t._next = i, t._prev = e, null === i ? this._itTail = t : i._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new Zo), this._linkedRecords.put(t), t.currentIndex = n, t
            }
            _remove(t)
            {
                return this._addToRemovals(this._unlink(t))
            }
            _unlink(t)
            {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const e = t._prev,
                    n = t._next;
                return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
            }
            _addToMoves(t, e)
            {
                return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
            }
            _addToRemovals(t)
            {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new Zo), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
            }
            _addIdentityChange(t, e)
            {
                return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
            }
        }
        class Wo {
            constructor(t, e)
            {
                this.item = t,
                this.trackById = e,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class Uo {
            constructor()
            {
                this._head = null,
                this._tail = null
            }
            add(t)
            {
                null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
            }
            get(t, e)
            {
                let n;
                for (n = this._head; null !== n; n = n._nextDup)
                    if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t))
                        return n;
                return null
            }
            remove(t)
            {
                const e = t._prevDup,
                    n = t._nextDup;
                return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
            }
        }
        class Zo {
            constructor()
            {
                this.map = new Map
            }
            put(t)
            {
                const e = t.trackById;
                let n = this.map.get(e);
                n || (n = new Uo, this.map.set(e, n)),
                n.add(t)
            }
            get(t, e)
            {
                const n = this.map.get(t);
                return n ? n.get(t, e) : null
            }
            remove(t)
            {
                const e = t.trackById;
                return this.map.get(e).remove(t) && this.map.delete(e), t
            }
            get isEmpty()
            {
                return 0 === this.map.size
            }
            clear()
            {
                this.map.clear()
            }
        }
        function Qo(t, e, n) {
            const i = t.previousIndex;
            if (null === i)
                return i;
            let s = 0;
            return n && i < n.length && (s = n[i]), i + e + s
        }
        class Ko {
            constructor() {}
            supports(t)
            {
                return t instanceof Map || Or(t)
            }
            create()
            {
                return new Go
            }
        }
        class Go {
            constructor()
            {
                this._records = new Map,
                this._mapHead = null,
                this._appendAfter = null,
                this._previousMapHead = null,
                this._changesHead = null,
                this._changesTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._removalsHead = null,
                this._removalsTail = null
            }
            get isDirty()
            {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(t)
            {
                let e;
                for (e = this._mapHead; null !== e; e = e._next)
                    t(e)
            }
            forEachPreviousItem(t)
            {
                let e;
                for (e = this._previousMapHead; null !== e; e = e._nextPrevious)
                    t(e)
            }
            forEachChangedItem(t)
            {
                let e;
                for (e = this._changesHead; null !== e; e = e._nextChanged)
                    t(e)
            }
            forEachAddedItem(t)
            {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded)
                    t(e)
            }
            forEachRemovedItem(t)
            {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved)
                    t(e)
            }
            diff(t)
            {
                if (t) {
                    if (!(t instanceof Map || Or(t)))
                        throw new Error(`Error trying to diff '${et(t)}'. Only maps and objects are allowed`)
                } else
                    t = new Map;
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t)
            {
                this._reset();
                let e = this._mapHead;
                if (this._appendAfter = null, this._forEach(t, (t, n) => {
                    if (e && e.key === n)
                        this._maybeAddToChanges(e, t),
                        this._appendAfter = e,
                        e = e._next;
                    else {
                        const i = this._getOrCreateRecordForKey(n, t);
                        e = this._insertBeforeOrAppend(e, i)
                    }
                }), e) {
                    e._prev && (e._prev._next = null),
                    this._removalsHead = e;
                    for (let t = e; null !== t; t = t._nextRemoved)
                        t === this._mapHead && (this._mapHead = null),
                        this._records.delete(t.key),
                        t._nextRemoved = t._next,
                        t.previousValue = t.currentValue,
                        t.currentValue = null,
                        t._prev = null,
                        t._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
            }
            _insertBeforeOrAppend(t, e)
            {
                if (t) {
                    const n = t._prev;
                    return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
                }
                return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
            }
            _getOrCreateRecordForKey(t, e)
            {
                if (this._records.has(t)) {
                    const n = this._records.get(t);
                    this._maybeAddToChanges(n, e);
                    const i = n._prev,
                        s = n._next;
                    return i && (i._next = s), s && (s._prev = i), n._next = null, n._prev = null, n
                }
                const n = new Yo(t);
                return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
            }
            _reset()
            {
                if (this.isDirty) {
                    let t;
                    for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._changesHead; null !== t; t = t._nextChanged)
                        t.previousValue = t.currentValue;
                    for (t = this._additionsHead; null != t; t = t._nextAdded)
                        t.previousValue = t.currentValue;
                    this._changesHead = this._changesTail = null,
                    this._additionsHead = this._additionsTail = null,
                    this._removalsHead = null
                }
            }
            _maybeAddToChanges(t, e)
            {
                Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
            }
            _addToAdditions(t)
            {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
            }
            _addToChanges(t)
            {
                null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
            }
            _forEach(t, e)
            {
                t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
            }
        }
        class Yo {
            constructor(t)
            {
                this.key = t,
                this.previousValue = null,
                this.currentValue = null,
                this._nextPrevious = null,
                this._next = null,
                this._prev = null,
                this._nextAdded = null,
                this._nextRemoved = null,
                this._nextChanged = null
            }
        }
        function Xo() {
            return new Jo([new zo])
        }
        let Jo = (() => {
            class t {
                constructor(t)
                {
                    this.factories = t
                }
                static create(e, n)
                {
                    if (null != n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }
                static extend(e)
                {
                    return {
                        provide: t,
                        useFactory: n => t.create(e, n || Xo()),
                        deps: [[t, new di, new ui]]
                    }
                }
                find(t)
                {
                    const e = this.factories.find(e => e.supports(t));
                    if (null != e)
                        return e;
                    throw new Error(`Cannot find a differ supporting object '${t}' of type '${n = t, n.name || typeof n}'`);
                    var n
                }
            }
            return t.\u0275prov = at({
                token: t,
                providedIn: "root",
                factory: Xo
            }), t
        })();
        function ta() {
            return new ea([new Ko])
        }
        let ea = (() => {
            class t {
                constructor(t)
                {
                    this.factories = t
                }
                static create(e, n)
                {
                    if (n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }
                static extend(e)
                {
                    return {
                        provide: t,
                        useFactory: n => t.create(e, n || ta()),
                        deps: [[t, new di, new ui]]
                    }
                }
                find(t)
                {
                    const e = this.factories.find(e => e.supports(t));
                    if (e)
                        return e;
                    throw new Error(`Cannot find a differ supporting object '${t}'`)
                }
            }
            return t.\u0275prov = at({
                token: t,
                providedIn: "root",
                factory: ta
            }), t
        })();
        function na(t, e, n, i, s=!1) {
            for (; null !== n;) {
                const r = e[n.index];
                if (null !== r && i.push(_e(r)), Yt(r))
                    for (let t = Kt; t < r.length; t++) {
                        const e = r[t],
                            n = e[1].firstChild;
                        null !== n && na(e[1], e, n, i)
                    }
                const o = n.type;
                if (8 & o)
                    na(t, e, n.child, i);
                else if (32 & o) {
                    const t = wi(n, e);
                    let s;
                    for (; s = t();)
                        i.push(s)
                } else if (16 & o) {
                    const t = Hi(e, n);
                    if (Array.isArray(t))
                        i.push(...t);
                    else {
                        const n = Ci(e[16]);
                        na(n[1], n, t, i, !0)
                    }
                }
                n = s ? n.projectionNext : n.next
            }
            return i
        }
        class ia {
            constructor(t, e)
            {
                this._lView = t,
                this._cdRefInjectingView = e,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get rootNodes()
            {
                const t = this._lView,
                    e = t[1];
                return na(e, t, e.firstChild, [])
            }
            get context()
            {
                return this._lView[8]
            }
            get destroyed()
            {
                return 256 == (256 & this._lView[2])
            }
            destroy()
            {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[3];
                    if (Yt(t)) {
                        const e = t[8],
                            n = e ? e.indexOf(this) : -1;
                        n > -1 && (Oi(t, n), Qn(e, n))
                    }
                    this._attachedToViewContainer = !1
                }
                Ii(this._lView[1], this._lView)
            }
            onDestroy(t)
            {
                Ts(this._lView[1], this._lView, null, t)
            }
            markForCheck()
            {
                Us(this._cdRefInjectingView || this._lView)
            }
            detach()
            {
                this._lView[2] &= -129
            }
            reattach()
            {
                this._lView[2] |= 128
            }
            detectChanges()
            {
                Zs(this._lView[1], this._lView, this.context)
            }
            checkNoChanges()
            {
                !function(t, e, n) {
                    je(!0);
                    try {
                        Zs(t, e, n)
                    } finally {
                        je(!1)
                    }
                }(this._lView[1], this._lView, this.context)
            }
            attachToViewContainerRef()
            {
                if (this._appRef)
                    throw new Error("This view is already attached directly to the ApplicationRef!");
                this._attachedToViewContainer = !0
            }
            detachFromAppRef()
            {
                var t;
                this._appRef = null,
                qi(this._lView[1], t = this._lView, t[11], 2, null, null)
            }
            attachToAppRef(t)
            {
                if (this._attachedToViewContainer)
                    throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = t
            }
        }
        class sa extends ia {
            constructor(t)
            {
                super(t),
                this._view = t
            }
            detectChanges()
            {
                Qs(this._view)
            }
            checkNoChanges()
            {
                !function(t) {
                    je(!0);
                    try {
                        Qs(t)
                    } finally {
                        je(!1)
                    }
                }(this._view)
            }
            get context()
            {
                return null
            }
        }
        const ra = function(t=!1) {
            return function(t, e, n) {
                if (!n && Jt(t)) {
                    const n = we(t.index, e);
                    return new ia(n, n)
                }
                return 47 & t.type ? new ia(e[16], e) : null
            }(Re(), Ie(), t)
        };
        let oa = (() => {
            class t {}
            return t.__NG_ELEMENT_ID__ = ra, t.__ChangeDetectorRef__ = !0, t
        })();
        const aa = [new Ko],
            la = new Jo([new zo]),
            ca = new ea(aa),
            ha = function() {
                return fa(Re(), Ie())
            };
        let ua = (() => {
            class t {}
            return t.__NG_ELEMENT_ID__ = ha, t
        })();
        const da = ua,
            pa = class  extends da{
                constructor(t, e, n)
                {
                    super(),
                    this._declarationLView = t,
                    this._declarationTContainer = e,
                    this.elementRef = n
                }
                createEmbeddedView(t)
                {
                    const e = this._declarationTContainer.tViews,
                        n = gs(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
                    n[17] = this._declarationLView[this._declarationTContainer.index];
                    const i = this._declarationLView[19];
                    return null !== i && (n[19] = i.createEmbeddedView(e)), bs(e, n, t), new ia(n)
                }
            }
            ;
        function fa(t, e) {
            return 4 & t.type ? new pa(e, t, Do(t, e)) : null
        }
        class ma {}
        const ga = function() {
            return Ca(Re(), Ie())
        };
        let _a = (() => {
            class t {}
            return t.__NG_ELEMENT_ID__ = ga, t
        })();
        const ya = _a,
            ba = class  extends ya{
                constructor(t, e, n)
                {
                    super(),
                    this._lContainer = t,
                    this._hostTNode = e,
                    this._hostLView = n
                }
                get element()
                {
                    return Do(this._hostTNode, this._hostLView)
                }
                get injector()
                {
                    return new jn(this._hostTNode, this._hostLView)
                }
                get parentInjector()
                {
                    const t = An(this._hostTNode, this._hostLView);
                    if (yn(t)) {
                        const e = vn(t, this._hostLView),
                            n = bn(t);
                        return new jn(e[1].data[n + 8], e)
                    }
                    return new jn(null, this._hostLView)
                }
                clear()
                {
                    for (; this.length > 0;)
                        this.remove(this.length - 1)
                }
                get(t)
                {
                    const e = va(this._lContainer);
                    return null !== e && e[t] || null
                }
                get length()
                {
                    return this._lContainer.length - Kt
                }
                createEmbeddedView(t, e, n)
                {
                    const i = t.createEmbeddedView(e || {});
                    return this.insert(i, n), i
                }
                createComponent(t, e, n, i, s)
                {
                    const r = n || this.parentInjector;
                    if (!s && null == t.ngModule && r) {
                        const t = r.get(ma, null);
                        t && (s = t)
                    }
                    const o = t.create(r, i, void 0, s);
                    return this.insert(o.hostView, e), o
                }
                insert(t, e)
                {
                    const n = t._lView,
                        i = n[1];
                    if (Yt(n[3])) {
                        const e = this.indexOf(t);
                        if (-1 !== e)
                            this.detach(e);
                        else {
                            const e = n[3],
                                i = new ba(e, e[6], e[3]);
                            i.detach(i.indexOf(t))
                        }
                    }
                    const s = this._adjustIndex(e),
                        r = this._lContainer;
                    !function(t, e, n, i) {
                        const s = Kt + i,
                            r = n.length;
                        i > 0 && (n[s - 1][4] = e),
                        i < r - Kt ? (e[4] = n[s], Zn(n, Kt + i, e)) : (n.push(e), e[4] = null),
                        e[3] = n;
                        const o = e[17];
                        null !== o && n !== o && function(t, e) {
                            const n = t[9];
                            e[16] !== e[3][3][16] && (t[2] = !0),
                            null === n ? t[9] = [e] : n.push(e)
                        }(o, e);
                        const a = e[19];
                        null !== a && a.insertView(t),
                        e[2] |= 128
                    }(i, n, r, s);
                    const o = zi(s, r),
                        a = n[11],
                        l = Ni(a, r[7]);
                    return null !== l && function(t, e, n, i, s, r) {
                        i[0] = s,
                        i[6] = e,
                        qi(t, i, n, 1, s, r)
                    }(i, r[6], a, n, l, o), t.attachToViewContainerRef(), Zn(wa(r), s, t), t
                }
                move(t, e)
                {
                    return this.insert(t, e)
                }
                indexOf(t)
                {
                    const e = va(this._lContainer);
                    return null !== e ? e.indexOf(t) : -1
                }
                remove(t)
                {
                    const e = this._adjustIndex(t, -1),
                        n = Oi(this._lContainer, e);
                    n && (Qn(wa(this._lContainer), e), Ii(n[1], n))
                }
                detach(t)
                {
                    const e = this._adjustIndex(t, -1),
                        n = Oi(this._lContainer, e);
                    return n && null != Qn(wa(this._lContainer), e) ? new ia(n) : null
                }
                _adjustIndex(t, e=0)
                {
                    return null == t ? this.length + e : t
                }
            }
            ;
        function va(t) {
            return t[8]
        }
        function wa(t) {
            return t[8] || (t[8] = [])
        }
        function Ca(t, e) {
            let n;
            const i = e[t.index];
            if (Yt(i))
                n = i;
            else {
                let s;
                if (8 & t.type)
                    s = _e(i);
                else {
                    const n = e[11];
                    s = n.createComment("");
                    const i = be(t, e);
                    Ri(n, Ni(n, i), s, function(t, e) {
                        return me(t) ? t.nextSibling(e) : e.nextSibling
                    }(n, i), !1)
                }
                e[t.index] = n = Hs(i, e, s, t),
                Ws(e, n)
            }
            return new ba(n, t, e)
        }
        const xa = {};
        class Ea extends Io {
            constructor(t)
            {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t)
            {
                const e = Ut(t);
                return new Aa(e, this.ngModule)
            }
        }
        function Sa(t) {
            const e = [];
            for (let n in t)
                t.hasOwnProperty(n) && e.push({
                    propName: t[n],
                    templateName: n
                });
            return e
        }
        const ka = new qn("SCHEDULER_TOKEN", {
            providedIn: "root",
            factory: () => yi
        });
        class Aa extends To {
            constructor(t, e)
            {
                super(),
                this.componentDef = t,
                this.ngModule = e,
                this.componentType = t.type,
                this.selector = t.selectors.map(rs).join(","),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!e
            }
            get inputs()
            {
                return Sa(this.componentDef.inputs)
            }
            get outputs()
            {
                return Sa(this.componentDef.outputs)
            }
            create(t, e, n, i)
            {
                const s = (i = i || this.ngModule) ? function(t, e) {
                        return {
                            get: (n, i, s) => {
                                const r = t.get(n, xa, s);
                                return r !== xa || i === xa ? r : e.get(n, i, s)
                            }
                        }
                    }(t, i.injector) : t,
                    r = s.get(No, ge),
                    o = s.get(jo, null),
                    a = r.createRenderer(null, this.componentDef),
                    l = this.componentDef.selectors[0][0] || "div",
                    c = n ? function(t, e, n) {
                        if (me(t))
                            return t.selectRootElement(e, n === Ct.ShadowDom);
                        let i = "string" == typeof e ? t.querySelector(e) : e;
                        return i.textContent = "", i
                    }(a, n, this.componentDef.encapsulation) : Ai(r.createRenderer(null, this.componentDef), l, function(t) {
                        const e = t.toLowerCase();
                        return "svg" === e ? pe : "math" === e ? "http://www.w3.org/1998/MathML/" : null
                    }(l)),
                    h = this.componentDef.onPush ? 576 : 528,
                    u = {
                        components: [],
                        scheduler: yi,
                        clean: Gs,
                        playerHandler: null,
                        flags: 0
                    },
                    d = As(0, null, null, 1, 0, null, null, null, null, null),
                    p = gs(null, d, u, h, null, null, r, a, o, s);
                let f,
                    m;
                Qe(p);
                try {
                    const t = function(t, e, n, i, s, r) {
                        const o = n[1];
                        n[20] = t;
                        const a = _s(o, 20, 2, "#host", null),
                            l = a.mergedAttrs = e.hostAttrs;
                        null !== l && (er(a, l, !0), null !== t && (fn(s, t, l), null !== a.classes && Zi(s, t, a.classes), null !== a.styles && Ui(s, t, a.styles)));
                        const c = i.createRenderer(t, e),
                            h = gs(n, ks(e), null, e.onPush ? 64 : 16, n[20], a, i, c, null, null);
                        return o.firstCreatePass && (Tn(En(a, n), o, e.type), Fs(o, a), Ns(a, n.length, 1)), Ws(n, h), n[20] = h
                    }(c, this.componentDef, p, r, a);
                    if (c)
                        if (n)
                            fn(a, c, ["ng-version", Ho.full]);
                        else {
                            const {attrs: t, classes: e} = function(t) {
                                const e = [],
                                    n = [];
                                let i = 1,
                                    s = 2;
                                for (; i < t.length;) {
                                    let r = t[i];
                                    if ("string" == typeof r)
                                        2 === s ? "" !== r && e.push(r, t[++i]) : 8 === s && n.push(r);
                                    else {
                                        if (!ts(s))
                                            break;
                                        s = r
                                    }
                                    i++
                                }
                                return {
                                    attrs: e,
                                    classes: n
                                }
                            }(this.componentDef.selectors[0]);
                            t && fn(a, c, t),
                            e && e.length > 0 && Zi(a, c, e.join(" "))
                        }
                    if (m = ve(d, Qt), void 0 !== e) {
                        const t = m.projection = [];
                        for (let n = 0; n < this.ngContentSelectors.length; n++) {
                            const i = e[n];
                            t.push(null != i ? Array.from(i) : null)
                        }
                    }
                    f = function(t, e, n, i, s) {
                        const r = n[1],
                            o = function(t, e, n) {
                                const i = Re();
                                t.firstCreatePass && (n.providersResolver && n.providersResolver(n), Ms(t, i, e, ys(t, e, 1, null), n));
                                const s = Nn(e, t, i.directiveStart, i);
                                _i(s, e);
                                const r = be(i, e);
                                return r && _i(r, e), s
                            }(r, n, e);
                        if (i.components.push(o), t[8] = o, s && s.forEach(t => t(o, e)), e.contentQueries) {
                            const t = Re();
                            e.contentQueries(1, o, t.directiveStart)
                        }
                        const a = Re();
                        return !r.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (en(a.index), Ds(n[1], a, 0, a.directiveStart, a.directiveEnd, e), Rs(e, o)), o
                    }(t, this.componentDef, p, u, [br]),
                    bs(d, p, null)
                } finally {
                    Je()
                }
                return new Ta(this.componentType, f, Do(m, p), p, m)
            }
        }
        class Ta extends class {}
        {
            constructor(t, e, n, i, s)
            {
                super(),
                this.location = n,
                this._rootLView = i,
                this._tNode = s,
                this.instance = e,
                this.hostView = this.changeDetectorRef = new sa(i),
                this.componentType = t
            }
            get injector()
            {
                return new jn(this._tNode, this._rootLView)
            }
            destroy()
            {
                this.hostView.destroy()
            }
            onDestroy(t)
            {
                this.hostView.onDestroy(t)
            }
        }
        const Oa = new Map;
        class Ia extends ma {
            constructor(t, e)
            {
                super(),
                this._parent = e,
                this._bootstrapComponents = [],
                this.injector = this,
                this.destroyCbs = [],
                this.componentFactoryResolver = new Ea(this);
                const n = Zt(t),
                    i = t[Ft] || null;
                i && bo(i),
                this._bootstrapComponents = bi(n.bootstrap),
                this._r3Injector = hr(t, e, [{
                    provide: ma,
                    useValue: this
                }, {
                    provide: Io,
                    useValue: this.componentFactoryResolver
                }], et(t)),
                this._r3Injector._resolveInjectorDefTypes(),
                this.instance = this.get(t)
            }
            get(t, e=yr.THROW_IF_NOT_FOUND, n=gt.Default)
            {
                return t === yr || t === ma || t === nr ? this : this._r3Injector.get(t, e, n)
            }
            destroy()
            {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(t => t()),
                this.destroyCbs = null
            }
            onDestroy(t)
            {
                this.destroyCbs.push(t)
            }
        }
        class Pa extends class {}
        {
            constructor(t)
            {
                super(),
                this.moduleType = t,
                null !== Zt(t) && function(t) {
                    const e = new Set;
                    !function t(n) {
                        const i = Zt(n, !0),
                            s = i.id;
                        null !== s && (function(t, e, n) {
                            if (e && e !== n)
                                throw new Error(`Duplicate module registered for ${t} - ${et(e)} vs ${et(e.name)}`)
                        }(s, Oa.get(s), n), Oa.set(s, n));
                        const r = bi(i.imports);
                        for (const o of r)
                            e.has(o) || (e.add(o), t(o))
                    }(t)
                }(t)
            }
            create(t)
            {
                return new Ia(this.moduleType, t)
            }
        }
        function Da(t, e, n, i) {
            return Ra(Ie(), Be(), t, e, n, i)
        }
        function Ra(t, e, n, i, s, r) {
            const o = e + n;
            return Ir(t, o, s) ? function(t, e, n) {
                return t[e] = n
            }(t, o + 1, r ? i.call(r, s) : i(s)) : function(t, e) {
                const n = t[e];
                return n === os ? void 0 : n
            }(t, o + 1)
        }
        function Fa(t, e) {
            const n = Pe();
            let i;
            const s = t + Qt;
            n.firstCreatePass ? (i = function(t, e) {
                if (e)
                    for (let n = e.length - 1; n >= 0; n--) {
                        const i = e[n];
                        if (t === i.name)
                            return i
                    }
                throw new ie("302", `The pipe '${t}' could not be found!`)
            }(e, n.pipeRegistry), n.data[s] = i, i.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(s, i.onDestroy)) : i = n.data[s];
            const r = i.factory || (i.factory = ne(i.type)),
                o = yt(Rr);
            try {
                const t = Cn(!1),
                    e = r();
                return Cn(t), function(t, e, n, i) {
                    n >= t.data.length && (t.data[n] = null, t.blueprint[n] = null),
                    e[n] = i
                }(n, Ie(), s, e), e
            } finally {
                yt(o)
            }
        }
        function Va(t, e, n) {
            const i = t + Qt,
                s = Ie(),
                r = function(t, e) {
                    return t[e]
                }(s, i);
            return function(t, e) {
                return Ar.isWrapped(e) && (e = Ar.unwrap(e), t[Te.lFrame.bindingIndex] = os), e
            }(s, function(t, e) {
                return t[1].data[e].pure
            }(s, i) ? Ra(s, Be(), e, r.transform, n, r) : r.transform(n))
        }
        const Na = class  extends x{
            constructor(t=!1)
            {
                super(),
                this.__isAsync = t
            }
            emit(t)
            {
                super.next(t)
            }
            subscribe(t, e, n)
            {
                let i,
                    s = t => null,
                    r = () => null;
                t && "object" == typeof t ? (i = this.__isAsync ? e => {
                    setTimeout(() => t.next(e))
                } : e => {
                    t.next(e)
                }, t.error && (s = this.__isAsync ? e => {
                    setTimeout(() => t.error(e))
                } : e => {
                    t.error(e)
                }), t.complete && (r = this.__isAsync ? () => {
                    setTimeout(() => t.complete())
                } : () => {
                    t.complete()
                })) : (i = this.__isAsync ? e => {
                    setTimeout(() => t(e))
                } : e => {
                    t(e)
                }, e && (s = this.__isAsync ? t => {
                    setTimeout(() => e(t))
                } : t => {
                    e(t)
                }), n && (r = this.__isAsync ? () => {
                    setTimeout(() => n())
                } : () => {
                    n()
                }));
                const o = super.subscribe(i, s, r);
                return t instanceof u && t.add(o), o
            }
        }
        ;
        function Ma() {
            return this._results[kr()]()
        }
        class La {
            constructor(t=!1)
            {
                this._emitDistinctChangesOnly = t,
                this.dirty = !0,
                this._results = [],
                this._changesDetected = !1,
                this._changes = null,
                this.length = 0,
                this.first = void 0,
                this.last = void 0;
                const e = kr(),
                    n = La.prototype;
                n[e] || (n[e] = Ma)
            }
            get changes()
            {
                return this._changes || (this._changes = new Na)
            }
            get(t)
            {
                return this._results[t]
            }
            map(t)
            {
                return this._results.map(t)
            }
            filter(t)
            {
                return this._results.filter(t)
            }
            find(t)
            {
                return this._results.find(t)
            }
            reduce(t, e)
            {
                return this._results.reduce(t, e)
            }
            forEach(t)
            {
                this._results.forEach(t)
            }
            some(t)
            {
                return this._results.some(t)
            }
            toArray()
            {
                return this._results.slice()
            }
            toString()
            {
                return this._results.toString()
            }
            reset(t, e)
            {
                const n = this;
                n.dirty = !1;
                const i = Wn(t);
                (this._changesDetected = !function(t, e, n) {
                    if (t.length !== e.length)
                        return !1;
                    for (let i = 0; i < t.length; i++) {
                        let s = t[i],
                            r = e[i];
                        if (n && (s = n(s), r = n(r)), r !== s)
                            return !1
                    }
                    return !0
                }(n._results, i, e)) && (n._results = i, n.length = i.length, n.last = i[this.length - 1], n.first = i[0])
            }
            notifyOnChanges()
            {
                !this._changes || !this._changesDetected && this._emitDistinctChangesOnly || this._changes.emit(this)
            }
            setDirty()
            {
                this.dirty = !0
            }
            destroy()
            {
                this.changes.complete(),
                this.changes.unsubscribe()
            }
        }
        class ja {
            constructor(t)
            {
                this.queryList = t,
                this.matches = null
            }
            clone()
            {
                return new ja(this.queryList)
            }
            setDirty()
            {
                this.queryList.setDirty()
            }
        }
        class Ba {
            constructor(t=[])
            {
                this.queries = t
            }
            createEmbeddedView(t)
            {
                const e = t.queries;
                if (null !== e) {
                    const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
                        i = [];
                    for (let t = 0; t < n; t++) {
                        const n = e.getByIndex(t);
                        i.push(this.queries[n.indexInDeclarationView].clone())
                    }
                    return new Ba(i)
                }
                return null
            }
            insertView(t)
            {
                this.dirtyQueriesWithMatches(t)
            }
            detachView(t)
            {
                this.dirtyQueriesWithMatches(t)
            }
            dirtyQueriesWithMatches(t)
            {
                for (let e = 0; e < this.queries.length; e++)
                    null !== tl(t, e).matches && this.queries[e].setDirty()
            }
        }
        class Ha {
            constructor(t, e, n=null)
            {
                this.predicate = t,
                this.flags = e,
                this.read = n
            }
        }
        class za {
            constructor(t=[])
            {
                this.queries = t
            }
            elementStart(t, e)
            {
                for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].elementStart(t, e)
            }
            elementEnd(t)
            {
                for (let e = 0; e < this.queries.length; e++)
                    this.queries[e].elementEnd(t)
            }
            embeddedTView(t)
            {
                let e = null;
                for (let n = 0; n < this.length; n++) {
                    const i = null !== e ? e.length : 0,
                        s = this.getByIndex(n).embeddedTView(t, i);
                    s && (s.indexInDeclarationView = n, null !== e ? e.push(s) : e = [s])
                }
                return null !== e ? new za(e) : null
            }
            template(t, e)
            {
                for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].template(t, e)
            }
            getByIndex(t)
            {
                return this.queries[t]
            }
            get length()
            {
                return this.queries.length
            }
            track(t)
            {
                this.queries.push(t)
            }
        }
        class $a {
            constructor(t, e=-1)
            {
                this.metadata = t,
                this.matches = null,
                this.indexInDeclarationView = -1,
                this.crossesNgTemplate = !1,
                this._appliesToNextNode = !0,
                this._declarationNodeIndex = e
            }
            elementStart(t, e)
            {
                this.isApplyingToNode(e) && this.matchTNode(t, e)
            }
            elementEnd(t)
            {
                this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
            }
            template(t, e)
            {
                this.elementStart(t, e)
            }
            embeddedTView(t, e)
            {
                return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, e), new $a(this.metadata)) : null
            }
            isApplyingToNode(t)
            {
                if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                    const e = this._declarationNodeIndex;
                    let n = t.parent;
                    for (; null !== n && 8 & n.type && n.index !== e;)
                        n = n.parent;
                    return e === (null !== n ? n.index : -1)
                }
                return this._appliesToNextNode
            }
            matchTNode(t, e)
            {
                const n = this.metadata.predicate;
                if (Array.isArray(n))
                    for (let i = 0; i < n.length; i++) {
                        const s = n[i];
                        this.matchTNodeWithReadOption(t, e, qa(e, s)),
                        this.matchTNodeWithReadOption(t, e, Vn(e, t, s, !1, !1))
                    }
                else
                    n === ua ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1) : this.matchTNodeWithReadOption(t, e, Vn(e, t, n, !1, !1))
            }
            matchTNodeWithReadOption(t, e, n)
            {
                if (null !== n) {
                    const i = this.metadata.read;
                    if (null !== i)
                        if (i === Fo || i === _a || i === ua && 4 & e.type)
                            this.addMatch(e.index, -2);
                        else {
                            const n = Vn(e, t, i, !1, !1);
                            null !== n && this.addMatch(e.index, n)
                        }
                    else
                        this.addMatch(e.index, n)
                }
            }
            addMatch(t, e)
            {
                null === this.matches ? this.matches = [t, e] : this.matches.push(t, e)
            }
        }
        function qa(t, e) {
            const n = t.localNames;
            if (null !== n)
                for (let i = 0; i < n.length; i += 2)
                    if (n[i] === e)
                        return n[i + 1];
            return null
        }
        function Wa(t, e, n, i) {
            return -1 === n ? function(t, e) {
                return 11 & t.type ? Do(t, e) : 4 & t.type ? fa(t, e) : null
            }(e, t) : -2 === n ? function(t, e, n) {
                return n === Fo ? Do(e, t) : n === ua ? fa(e, t) : n === _a ? Ca(e, t) : void 0
            }(t, e, i) : Nn(t, t[1], n, e)
        }
        function Ua(t, e, n, i) {
            const s = e[19].queries[i];
            if (null === s.matches) {
                const i = t.data,
                    r = n.matches,
                    o = [];
                for (let t = 0; t < r.length; t += 2) {
                    const s = r[t];
                    o.push(s < 0 ? null : Wa(e, i[s], r[t + 1], n.metadata.read))
                }
                s.matches = o
            }
            return s.matches
        }
        function Za(t, e, n, i) {
            const s = t.queries.getByIndex(n),
                r = s.matches;
            if (null !== r) {
                const o = Ua(t, e, s, n);
                for (let t = 0; t < r.length; t += 2) {
                    const n = r[t];
                    if (n > 0)
                        i.push(o[t / 2]);
                    else {
                        const s = r[t + 1],
                            o = e[-n];
                        for (let t = Kt; t < o.length; t++) {
                            const e = o[t];
                            e[17] === e[3] && Za(e[1], e, s, i)
                        }
                        if (null !== o[9]) {
                            const t = o[9];
                            for (let e = 0; e < t.length; e++) {
                                const n = t[e];
                                Za(n[1], n, s, i)
                            }
                        }
                    }
                }
            }
            return i
        }
        function Qa(t) {
            const e = Ie(),
                n = Pe(),
                i = qe();
            We(i + 1);
            const s = tl(n, i);
            if (t.dirty && xe(e) === (2 == (2 & s.metadata.flags))) {
                if (null === s.matches)
                    t.reset([]);
                else {
                    const r = s.crossesNgTemplate ? Za(n, e, i, []) : Ua(n, e, s, i);
                    t.reset(r, Vo),
                    t.notifyOnChanges()
                }
                return !0
            }
            return !1
        }
        function Ka(t, e, n) {
            const i = Pe();
            i.firstCreatePass && (Ja(i, new Ha(t, e, n), -1), 2 == (2 & e) && (i.staticViewQueries = !0)),
            Xa(i, Ie(), e)
        }
        function Ga(t, e, n, i) {
            const s = Pe();
            if (s.firstCreatePass) {
                const r = Re();
                Ja(s, new Ha(e, n, i), r.index),
                function(t, e) {
                    const n = t.contentQueries || (t.contentQueries = []);
                    e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
                }(s, t),
                2 == (2 & n) && (s.staticContentQueries = !0)
            }
            Xa(s, Ie(), n)
        }
        function Ya() {
            return t = Ie(), e = qe(), t[19].queries[e].queryList;
            var t,
                e
        }
        function Xa(t, e, n) {
            const i = new La(4 == (4 & n));
            Ts(t, e, i, i.destroy),
            null === e[19] && (e[19] = new Ba),
            e[19].queries.push(new ja(i))
        }
        function Ja(t, e, n) {
            null === t.queries && (t.queries = new za),
            t.queries.track(new $a(e, n))
        }
        function tl(t, e) {
            return t.queries.getByIndex(e)
        }
        const el = new qn("Application Initializer");
        let nl = (() => {
            class t {
                constructor(t)
                {
                    this.appInits = t,
                    this.resolve = Po,
                    this.reject = Po,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((t, e) => {
                        this.resolve = t,
                        this.reject = e
                    })
                }
                runInitializers()
                {
                    if (this.initialized)
                        return;
                    const t = [],
                        e = () => {
                            this.done = !0,
                            this.resolve()
                        };
                    if (this.appInits)
                        for (let n = 0; n < this.appInits.length; n++) {
                            const e = this.appInits[n]();
                            zr(e) && t.push(e)
                        }
                    Promise.all(t).then(() => {
                        e()
                    }).catch(t => {
                        this.reject(t)
                    }),
                    0 === t.length && e(),
                    this.initialized = !0
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(el, 8))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const il = new qn("AppId"),
            sl = {
                provide: il,
                useFactory: function() {
                    return `${rl()}${rl()}${rl()}`
                },
                deps: []
            };
        function rl() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const ol = new qn("Platform Initializer"),
            al = new qn("Platform ID"),
            ll = new qn("appBootstrapListener");
        let cl = (() => {
            class t {
                log(t)
                {
                    console.log(t)
                }
                warn(t)
                {
                    console.warn(t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const hl = new qn("LocaleId"),
            ul = new qn("DefaultCurrencyCode");
        class dl {
            constructor(t, e)
            {
                this.ngModuleFactory = t,
                this.componentFactories = e
            }
        }
        const pl = function(t) {
                return new Pa(t)
            },
            fl = pl,
            ml = function(t) {
                return Promise.resolve(pl(t))
            },
            gl = function(t) {
                const e = pl(t),
                    n = bi(Zt(t).declarations).reduce((t, e) => {
                        const n = Ut(e);
                        return n && t.push(new Aa(n)), t
                    }, []);
                return new dl(e, n)
            },
            _l = gl,
            yl = function(t) {
                return Promise.resolve(gl(t))
            };
        let bl = (() => {
            class t {
                constructor()
                {
                    this.compileModuleSync = fl,
                    this.compileModuleAsync = ml,
                    this.compileModuleAndAllComponentsSync = _l,
                    this.compileModuleAndAllComponentsAsync = yl
                }
                clearCache() {}
                clearCacheFor(t) {}
                getModuleId(t) {}
            }
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const vl = (() => Promise.resolve(0))();
        function wl(t) {
            "undefined" == typeof Zone ? vl.then(() => {
                t && t.apply(null, null)
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
        }
        class Cl {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: e=!1, shouldCoalesceRunChangeDetection: n=!1})
            {
                if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Na(!1), this.onMicrotaskEmpty = new Na(!1), this.onStable = new Na(!1), this.onError = new Na(!1), "undefined" == typeof Zone)
                    throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched();
                const i = this;
                i._nesting = 0,
                i._outer = i._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                i.shouldCoalesceEventChangeDetection = !n && e,
                i.shouldCoalesceRunChangeDetection = n,
                i.lastRequestAnimationFrameId = -1,
                i.nativeRequestAnimationFrame = function() {
                    let t = At.requestAnimationFrame,
                        e = At.cancelAnimationFrame;
                    if ("undefined" != typeof Zone && t && e) {
                        const n = t[Zone.__symbol__("OriginalDelegate")];
                        n && (t = n);
                        const i = e[Zone.__symbol__("OriginalDelegate")];
                        i && (e = i)
                    }
                    return {
                        nativeRequestAnimationFrame: t,
                        nativeCancelAnimationFrame: e
                    }
                }().nativeRequestAnimationFrame,
                function(t) {
                    const e = () => {
                        !function(t) {
                            -1 === t.lastRequestAnimationFrameId && (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(At, () => {
                                t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    t.lastRequestAnimationFrameId = -1,
                                    Sl(t),
                                    El(t)
                                }, void 0, () => {}, () => {})),
                                t.fakeTopEventTask.invoke()
                            }), Sl(t))
                        }(t)
                    };
                    t._inner = t._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n, i, s, r, o, a) => {
                            try {
                                return kl(t), n.invokeTask(s, r, o, a)
                            } finally {
                                (t.shouldCoalesceEventChangeDetection && "eventTask" === r.type || t.shouldCoalesceRunChangeDetection) && e(),
                                Al(t)
                            }
                        },
                        onInvoke: (n, i, s, r, o, a, l) => {
                            try {
                                return kl(t), n.invoke(s, r, o, a, l)
                            } finally {
                                t.shouldCoalesceRunChangeDetection && e(),
                                Al(t)
                            }
                        },
                        onHasTask: (e, n, i, s) => {
                            e.hasTask(i, s),
                            n === i && ("microTask" == s.change ? (t._hasPendingMicrotasks = s.microTask, Sl(t), El(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                        },
                        onHandleError: (e, n, i, s) => (e.handleError(i, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
                    })
                }(i)
            }
            static isInAngularZone()
            {
                return !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone()
            {
                if (!Cl.isInAngularZone())
                    throw new Error("Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone()
            {
                if (Cl.isInAngularZone())
                    throw new Error("Expected to not be in Angular Zone, but it is!")
            }
            run(t, e, n)
            {
                return this._inner.run(t, e, n)
            }
            runTask(t, e, n, i)
            {
                const s = this._inner,
                    r = s.scheduleEventTask("NgZoneEvent: " + i, t, xl, Po, Po);
                try {
                    return s.runTask(r, e, n)
                } finally {
                    s.cancelTask(r)
                }
            }
            runGuarded(t, e, n)
            {
                return this._inner.runGuarded(t, e, n)
            }
            runOutsideAngular(t)
            {
                return this._outer.run(t)
            }
        }
        const xl = {};
        function El(t) {
            if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
                try {
                    t._nesting++,
                    t.onMicrotaskEmpty.emit(null)
                } finally {
                    if (t._nesting--, !t.hasPendingMicrotasks)
                        try {
                            t.runOutsideAngular(() => t.onStable.emit(null))
                        } finally {
                            t.isStable = !0
                        }
                }
        }
        function Sl(t) {
            t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
        }
        function kl(t) {
            t._nesting++,
            t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
        }
        function Al(t) {
            t._nesting--,
            El(t)
        }
        class Tl {
            constructor()
            {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new Na,
                this.onMicrotaskEmpty = new Na,
                this.onStable = new Na,
                this.onError = new Na
            }
            run(t, e, n)
            {
                return t.apply(e, n)
            }
            runGuarded(t, e, n)
            {
                return t.apply(e, n)
            }
            runOutsideAngular(t)
            {
                return t()
            }
            runTask(t, e, n, i)
            {
                return t.apply(e, n)
            }
        }
        let Ol = (() => {
                class t {
                    constructor(t)
                    {
                        this._ngZone = t,
                        this._pendingCount = 0,
                        this._isZoneStable = !0,
                        this._didWork = !1,
                        this._callbacks = [],
                        this.taskTrackingZone = null,
                        this._watchAngularEvents(),
                        t.run(() => {
                            this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                        })
                    }
                    _watchAngularEvents()
                    {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0,
                                this._isZoneStable = !1
                            }
                        }),
                        this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    Cl.assertNotInAngularZone(),
                                    wl(() => {
                                        this._isZoneStable = !0,
                                        this._runCallbacksIfReady()
                                    })
                                }
                            })
                        })
                    }
                    increasePendingRequestCount()
                    {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                    }
                    decreasePendingRequestCount()
                    {
                        if (this._pendingCount -= 1, this._pendingCount < 0)
                            throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount
                    }
                    isStable()
                    {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady()
                    {
                        if (this.isStable())
                            wl(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let t = this._callbacks.pop();
                                    clearTimeout(t.timeoutId),
                                    t.doneCb(this._didWork)
                                }
                                this._didWork = !1
                            });
                        else {
                            let t = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)),
                            this._didWork = !0
                        }
                    }
                    getPendingTasks()
                    {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                            source: t.source,
                            creationLocation: t.creationLocation,
                            data: t.data
                        })) : []
                    }
                    addCallback(t, e, n)
                    {
                        let i = -1;
                        e && e > 0 && (i = setTimeout(() => {
                            this._callbacks = this._callbacks.filter(t => t.timeoutId !== i),
                            t(this._didWork, this.getPendingTasks())
                        }, e)),
                        this._callbacks.push({
                            doneCb: t,
                            timeoutId: i,
                            updateCb: n
                        })
                    }
                    whenStable(t, e, n)
                    {
                        if (n && !this.taskTrackingZone)
                            throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                        this.addCallback(t, e, n),
                        this._runCallbacksIfReady()
                    }
                    getPendingRequestCount()
                    {
                        return this._pendingCount
                    }
                    findProviders(t, e, n)
                    {
                        return []
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Cl))
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            Il = (() => {
                class t {
                    constructor()
                    {
                        this._applications = new Map,
                        Rl.addToWindow(this)
                    }
                    registerApplication(t, e)
                    {
                        this._applications.set(t, e)
                    }
                    unregisterApplication(t)
                    {
                        this._applications.delete(t)
                    }
                    unregisterAllApplications()
                    {
                        this._applications.clear()
                    }
                    getTestability(t)
                    {
                        return this._applications.get(t) || null
                    }
                    getAllTestabilities()
                    {
                        return Array.from(this._applications.values())
                    }
                    getAllRootElements()
                    {
                        return Array.from(this._applications.keys())
                    }
                    findTestabilityInTree(t, e=!0)
                    {
                        return Rl.findTestabilityInTree(this, t, e)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
        class Pl {
            addToWindow(t) {}
            findTestabilityInTree(t, e, n)
            {
                return null
            }
        }
        let Dl,
            Rl = new Pl,
            Fl = !0,
            Vl = !1;
        function Nl() {
            return Vl = !0, Fl
        }
        const Ml = new qn("AllowMultipleToken");
        function Ll(t, e, n=[]) {
            const i = `Platform: ${e}`,
                s = new qn(i);
            return (e=[]) => {
                let r = jl();
                if (!r || r.injector.get(Ml, !1))
                    if (t)
                        t(n.concat(e).concat({
                            provide: s,
                            useValue: !0
                        }));
                    else {
                        const t = n.concat(e).concat({
                            provide: s,
                            useValue: !0
                        }, {
                            provide: sr,
                            useValue: "platform"
                        });
                        !function(t) {
                            if (Dl && !Dl.destroyed && !Dl.injector.get(Ml, !1))
                                throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                            Dl = t.get(Bl);
                            const e = t.get(ol, null);
                            e && e.forEach(t => t())
                        }(yr.create({
                            providers: t,
                            name: i
                        }))
                    }
                return function(t) {
                    const e = jl();
                    if (!e)
                        throw new Error("No platform exists!");
                    if (!e.injector.get(t, null))
                        throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return e
                }(s)
            }
        }
        function jl() {
            return Dl && !Dl.destroyed ? Dl : null
        }
        let Bl = (() => {
            class t {
                constructor(t)
                {
                    this._injector = t,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(t, e)
                {
                    const n = function(t, e) {
                            let n;
                            return n = "noop" === t ? new Tl : ("zone.js" === t ? void 0 : t) || new Cl({
                                enableLongStackTrace: Nl(),
                                shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                                shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                            }), n
                        }(e ? e.ngZone : void 0, {
                            ngZoneEventCoalescing: e && e.ngZoneEventCoalescing || !1,
                            ngZoneRunCoalescing: e && e.ngZoneRunCoalescing || !1
                        }),
                        i = [{
                            provide: Cl,
                            useValue: n
                        }];
                    return n.run(() => {
                        const e = yr.create({
                                providers: i,
                                parent: this.injector,
                                name: t.moduleType.name
                            }),
                            s = t.create(e),
                            r = s.injector.get(gi, null);
                        if (!r)
                            throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        return n.runOutsideAngular(() => {
                            const t = n.onError.subscribe({
                                next: t => {
                                    r.handleError(t)
                                }
                            });
                            s.onDestroy(() => {
                                $l(this._modules, s),
                                t.unsubscribe()
                            })
                        }), function(t, e, n) {
                            try {
                                const i = n();
                                return zr(i) ? i.catch(n => {
                                    throw e.runOutsideAngular(() => t.handleError(n)), n
                                }) : i
                            } catch (i) {
                                throw e.runOutsideAngular(() => t.handleError(i)), i
                            }
                        }(r, n, () => {
                            const t = s.injector.get(nl);
                            return t.runInitializers(), t.donePromise.then(() => (bo(s.injector.get(hl, _o) || _o), this._moduleDoBootstrap(s), s))
                        })
                    })
                }
                bootstrapModule(t, e=[])
                {
                    const n = Hl({}, e);
                    return function(t, e, n) {
                        const i = new Pa(n);
                        return Promise.resolve(i)
                    }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
                }
                _moduleDoBootstrap(t)
                {
                    const e = t.injector.get(zl);
                    if (t._bootstrapComponents.length > 0)
                        t._bootstrapComponents.forEach(t => e.bootstrap(t));
                    else {
                        if (!t.instance.ngDoBootstrap)
                            throw new Error(`The module ${et(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                        t.instance.ngDoBootstrap(e)
                    }
                    this._modules.push(t)
                }
                onDestroy(t)
                {
                    this._destroyListeners.push(t)
                }
                get injector()
                {
                    return this._injector
                }
                destroy()
                {
                    if (this._destroyed)
                        throw new Error("The platform has already been destroyed!");
                    this._modules.slice().forEach(t => t.destroy()),
                    this._destroyListeners.forEach(t => t()),
                    this._destroyed = !0
                }
                get destroyed()
                {
                    return this._destroyed
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(yr))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        function Hl(t, e) {
            return Array.isArray(e) ? e.reduce(Hl, t) : Object.assign(Object.assign({}, t), e)
        }
        let zl = (() => {
            class t {
                constructor(t, e, n, i, s, r)
                {
                    this._zone = t,
                    this._console = e,
                    this._injector = n,
                    this._exceptionHandler = i,
                    this._componentFactoryResolver = s,
                    this._initStatus = r,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run(() => {
                                this.tick()
                            })
                        }
                    });
                    const o = new y(t => {
                            this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                            this._zone.runOutsideAngular(() => {
                                t.next(this._stable),
                                t.complete()
                            })
                        }),
                        a = new y(t => {
                            let e;
                            this._zone.runOutsideAngular(() => {
                                e = this._zone.onStable.subscribe(() => {
                                    Cl.assertNotInAngularZone(),
                                    wl(() => {
                                        this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                                    })
                                })
                            });
                            const n = this._zone.onUnstable.subscribe(() => {
                                Cl.assertInAngularZone(),
                                this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                    t.next(!1)
                                }))
                            });
                            return () => {
                                e.unsubscribe(),
                                n.unsubscribe()
                            }
                        });
                    this.isStable = W(o, a.pipe(t => {
                        return U()((e = X, function(t) {
                            let n;
                            n = "function" == typeof e ? e : function() {
                                return e
                            };
                            const i = Object.create(t, G);
                            return i.source = t, i.subjectFactory = n, i
                        })(t));
                        var e
                    }))
                }
                bootstrap(t, e)
                {
                    if (!this._initStatus.done)
                        throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    let n;
                    n = t instanceof To ? t : this._componentFactoryResolver.resolveComponentFactory(t),
                    this.componentTypes.push(n.componentType);
                    const i = n.isBoundToModule ? void 0 : this._injector.get(ma),
                        s = n.create(yr.NULL, [], e || n.selector, i),
                        r = s.location.nativeElement,
                        o = s.injector.get(Ol, null),
                        a = o && s.injector.get(Il);
                    return o && a && a.registerApplication(r, o), s.onDestroy(() => {
                        this.detachView(s.hostView),
                        $l(this.components, s),
                        a && a.unregisterApplication(r)
                    }), this._loadComponent(s), Nl() && this._console.log("Angular is running in development mode. Call enableProdMode() to enable production mode."), s
                }
                tick()
                {
                    if (this._runningTick)
                        throw new Error("ApplicationRef.tick is called recursively");
                    try {
                        this._runningTick = !0;
                        for (let t of this._views)
                            t.detectChanges()
                    } catch (t) {
                        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(t)
                {
                    const e = t;
                    this._views.push(e),
                    e.attachToAppRef(this)
                }
                detachView(t)
                {
                    const e = t;
                    $l(this._views, e),
                    e.detachFromAppRef()
                }
                _loadComponent(t)
                {
                    this.attachView(t.hostView),
                    this.tick(),
                    this.components.push(t),
                    this._injector.get(ll, []).concat(this._bootstrapListeners).forEach(e => e(t))
                }
                ngOnDestroy()
                {
                    this._views.slice().forEach(t => t.destroy()),
                    this._onMicrotaskEmptySubscription.unsubscribe()
                }
                get viewCount()
                {
                    return this._views.length
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Cl), oi(cl), oi(yr), oi(gi), oi(Io), oi(nl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        function $l(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }
        const ql = Ll(null, "core", [{
                provide: al,
                useValue: "unknown"
            }, {
                provide: Bl,
                deps: [yr]
            }, {
                provide: Il,
                deps: []
            }, {
                provide: cl,
                deps: []
            }]),
            Wl = [{
                provide: zl,
                useClass: zl,
                deps: [Cl, cl, yr, gi, Io, nl]
            }, {
                provide: ka,
                deps: [Cl],
                useFactory: function(t) {
                    let e = [];
                    return t.onStable.subscribe(() => {
                        for (; e.length;)
                            e.pop()()
                    }), function(t) {
                        e.push(t)
                    }
                }
            }, {
                provide: nl,
                useClass: nl,
                deps: [[new ui, el]]
            }, {
                provide: bl,
                useClass: bl,
                deps: []
            }, sl, {
                provide: Jo,
                useFactory: function() {
                    return la
                },
                deps: []
            }, {
                provide: ea,
                useFactory: function() {
                    return ca
                },
                deps: []
            }, {
                provide: hl,
                useFactory: function(t) {
                    return bo(t = t || "undefined" != typeof $localize && $localize.locale || _o), t
                },
                deps: [[new hi(hl), new ui, new di]]
            }, {
                provide: ul,
                useValue: "USD"
            }];
        let Ul = (() => {
                class t {
                    constructor(t) {}
                }
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)(oi(zl))
                    },
                    providers: Wl
                }), t
            })(),
            Zl = null;
        function Ql() {
            return Zl
        }
        const Kl = new qn("DocumentToken");
        let Gl = (() => {
            class t {}
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275prov = at({
                factory: Yl,
                token: t,
                providedIn: "platform"
            }), t
        })();
        function Yl() {
            return oi(Xl)
        }
        let Xl = (() => {
            class t extends Gl {
                constructor(t)
                {
                    super(),
                    this._doc = t,
                    this._init()
                }
                _init()
                {
                    this.location = Ql().getLocation(),
                    this._history = Ql().getHistory()
                }
                getBaseHrefFromDOM()
                {
                    return Ql().getBaseHref(this._doc)
                }
                onPopState(t)
                {
                    Ql().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", t, !1)
                }
                onHashChange(t)
                {
                    Ql().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", t, !1)
                }
                get href()
                {
                    return this.location.href
                }
                get protocol()
                {
                    return this.location.protocol
                }
                get hostname()
                {
                    return this.location.hostname
                }
                get port()
                {
                    return this.location.port
                }
                get pathname()
                {
                    return this.location.pathname
                }
                get search()
                {
                    return this.location.search
                }
                get hash()
                {
                    return this.location.hash
                }
                set pathname(t)
                {
                    this.location.pathname = t
                }
                pushState(t, e, n)
                {
                    Jl() ? this._history.pushState(t, e, n) : this.location.hash = n
                }
                replaceState(t, e, n)
                {
                    Jl() ? this._history.replaceState(t, e, n) : this.location.hash = n
                }
                forward()
                {
                    this._history.forward()
                }
                back()
                {
                    this._history.back()
                }
                getState()
                {
                    return this._history.state
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Kl))
            }, t.\u0275prov = at({
                factory: tc,
                token: t,
                providedIn: "platform"
            }), t
        })();
        function Jl() {
            return !!window.history.pushState
        }
        function tc() {
            return new Xl(oi(Kl))
        }
        function ec(t, e) {
            if (0 == t.length)
                return e;
            if (0 == e.length)
                return t;
            let n = 0;
            return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        }
        function nc(t) {
            const e = t.match(/#|\?|$/),
                n = e && e.index || t.length;
            return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
        }
        function ic(t) {
            return t && "?" !== t[0] ? "?" + t : t
        }
        let sc = (() => {
            class t {}
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275prov = at({
                factory: rc,
                token: t,
                providedIn: "root"
            }), t
        })();
        function rc(t) {
            const e = oi(Kl).location;
            return new ac(oi(Gl), e && e.origin || "")
        }
        const oc = new qn("appBaseHref");
        let ac = (() => {
                class t extends sc {
                    constructor(t, e)
                    {
                        if (super(), this._platformLocation = t, null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e)
                            throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                        this._baseHref = e
                    }
                    onPopState(t)
                    {
                        this._platformLocation.onPopState(t),
                        this._platformLocation.onHashChange(t)
                    }
                    getBaseHref()
                    {
                        return this._baseHref
                    }
                    prepareExternalUrl(t)
                    {
                        return ec(this._baseHref, t)
                    }
                    path(t=!1)
                    {
                        const e = this._platformLocation.pathname + ic(this._platformLocation.search),
                            n = this._platformLocation.hash;
                        return n && t ? `${e}${n}` : e
                    }
                    pushState(t, e, n, i)
                    {
                        const s = this.prepareExternalUrl(n + ic(i));
                        this._platformLocation.pushState(t, e, s)
                    }
                    replaceState(t, e, n, i)
                    {
                        const s = this.prepareExternalUrl(n + ic(i));
                        this._platformLocation.replaceState(t, e, s)
                    }
                    forward()
                    {
                        this._platformLocation.forward()
                    }
                    back()
                    {
                        this._platformLocation.back()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Gl), oi(oc, 8))
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            lc = (() => {
                class t {
                    constructor(t, e)
                    {
                        this._subject = new Na,
                        this._urlChangeListeners = [],
                        this._platformStrategy = t;
                        const n = this._platformStrategy.getBaseHref();
                        this._platformLocation = e,
                        this._baseHref = nc(hc(n)),
                        this._platformStrategy.onPopState(t => {
                            this._subject.emit({
                                url: this.path(!0),
                                pop: !0,
                                state: t.state,
                                type: t.type
                            })
                        })
                    }
                    path(t=!1)
                    {
                        return this.normalize(this._platformStrategy.path(t))
                    }
                    getState()
                    {
                        return this._platformLocation.getState()
                    }
                    isCurrentPathEqualTo(t, e="")
                    {
                        return this.path() == this.normalize(t + ic(e))
                    }
                    normalize(e)
                    {
                        return t.stripTrailingSlash(function(t, e) {
                            return t && e.startsWith(t) ? e.substring(t.length) : e
                        }(this._baseHref, hc(e)))
                    }
                    prepareExternalUrl(t)
                    {
                        return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
                    }
                    go(t, e="", n=null)
                    {
                        this._platformStrategy.pushState(n, "", t, e),
                        this._notifyUrlChangeListeners(this.prepareExternalUrl(t + ic(e)), n)
                    }
                    replaceState(t, e="", n=null)
                    {
                        this._platformStrategy.replaceState(n, "", t, e),
                        this._notifyUrlChangeListeners(this.prepareExternalUrl(t + ic(e)), n)
                    }
                    forward()
                    {
                        this._platformStrategy.forward()
                    }
                    back()
                    {
                        this._platformStrategy.back()
                    }
                    onUrlChange(t)
                    {
                        this._urlChangeListeners.push(t),
                        this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                            this._notifyUrlChangeListeners(t.url, t.state)
                        }))
                    }
                    _notifyUrlChangeListeners(t="", e)
                    {
                        this._urlChangeListeners.forEach(n => n(t, e))
                    }
                    subscribe(t, e, n)
                    {
                        return this._subject.subscribe({
                            next: t,
                            error: e,
                            complete: n
                        })
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(sc), oi(Gl))
                }, t.normalizeQueryParams = ic, t.joinWithSlash = ec, t.stripTrailingSlash = nc, t.\u0275prov = at({
                    factory: cc,
                    token: t,
                    providedIn: "root"
                }), t
            })();
        function cc() {
            return new lc(oi(sc), oi(Gl))
        }
        function hc(t) {
            return t.replace(/\/index.html$/, "")
        }
        var uc = function(t) {
                return t[t.Decimal = 0] = "Decimal", t[t.Percent = 1] = "Percent", t[t.Currency = 2] = "Currency", t[t.Scientific = 3] = "Scientific", t
            }({}),
            dc = function(t) {
                return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other", t
            }({}),
            pc = function(t) {
                return t[t.Decimal = 0] = "Decimal", t[t.Group = 1] = "Group", t[t.List = 2] = "List", t[t.PercentSign = 3] = "PercentSign", t[t.PlusSign = 4] = "PlusSign", t[t.MinusSign = 5] = "MinusSign", t[t.Exponential = 6] = "Exponential", t[t.SuperscriptingExponent = 7] = "SuperscriptingExponent", t[t.PerMille = 8] = "PerMille", t[t[1 / 0] = 9] = "Infinity", t[t.NaN = 10] = "NaN", t[t.TimeSeparator = 11] = "TimeSeparator", t[t.CurrencyDecimal = 12] = "CurrencyDecimal", t[t.CurrencyGroup = 13] = "CurrencyGroup", t
            }({});
        function fc(t, e) {
            const n = fo(t),
                i = n[go.NumberSymbols][e];
            if (void 0 === i) {
                if (e === pc.CurrencyDecimal)
                    return n[go.NumberSymbols][pc.Decimal];
                if (e === pc.CurrencyGroup)
                    return n[go.NumberSymbols][pc.Group]
            }
            return i
        }
        const mc = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
            gc = ".",
            _c = "0";
        function yc(t) {
            const e = parseInt(t);
            if (isNaN(e))
                throw new Error("Invalid integer literal when parsing " + t);
            return e
        }
        class bc {}
        let vc = (() => {
                class t extends bc {
                    constructor(t)
                    {
                        super(),
                        this.locale = t
                    }
                    getPluralCategory(t, e)
                    {
                        switch (function(t) {
                            return fo(t)[go.PluralCase]
                        }(e || this.locale)(t)) {
                        case dc.Zero:
                            return "zero";
                        case dc.One:
                            return "one";
                        case dc.Two:
                            return "two";
                        case dc.Few:
                            return "few";
                        case dc.Many:
                            return "many";
                        default:
                            return "other"
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(hl))
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            wc = (() => {
                class t {
                    constructor(t, e, n, i)
                    {
                        this._iterableDiffers = t,
                        this._keyValueDiffers = e,
                        this._ngEl = n,
                        this._renderer = i,
                        this._iterableDiffer = null,
                        this._keyValueDiffer = null,
                        this._initialClasses = [],
                        this._rawClass = null
                    }
                    set klass(t)
                    {
                        this._removeClasses(this._initialClasses),
                        this._initialClasses = "string" == typeof t ? t.split(/\s+/) : [],
                        this._applyClasses(this._initialClasses),
                        this._applyClasses(this._rawClass)
                    }
                    set ngClass(t)
                    {
                        this._removeClasses(this._rawClass),
                        this._applyClasses(this._initialClasses),
                        this._iterableDiffer = null,
                        this._keyValueDiffer = null,
                        this._rawClass = "string" == typeof t ? t.split(/\s+/) : t,
                        this._rawClass && (Tr(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
                    }
                    ngDoCheck()
                    {
                        if (this._iterableDiffer) {
                            const t = this._iterableDiffer.diff(this._rawClass);
                            t && this._applyIterableChanges(t)
                        } else if (this._keyValueDiffer) {
                            const t = this._keyValueDiffer.diff(this._rawClass);
                            t && this._applyKeyValueChanges(t)
                        }
                    }
                    _applyKeyValueChanges(t)
                    {
                        t.forEachAddedItem(t => this._toggleClass(t.key, t.currentValue)),
                        t.forEachChangedItem(t => this._toggleClass(t.key, t.currentValue)),
                        t.forEachRemovedItem(t => {
                            t.previousValue && this._toggleClass(t.key, !1)
                        })
                    }
                    _applyIterableChanges(t)
                    {
                        t.forEachAddedItem(t => {
                            if ("string" != typeof t.item)
                                throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${et(t.item)}`);
                            this._toggleClass(t.item, !0)
                        }),
                        t.forEachRemovedItem(t => this._toggleClass(t.item, !1))
                    }
                    _applyClasses(t)
                    {
                        t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !0)) : Object.keys(t).forEach(e => this._toggleClass(e, !!t[e])))
                    }
                    _removeClasses(t)
                    {
                        t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !1)) : Object.keys(t).forEach(t => this._toggleClass(t, !1)))
                    }
                    _toggleClass(t, e)
                    {
                        (t = t.trim()) && t.split(/\s+/g).forEach(t => {
                            e ? this._renderer.addClass(this._ngEl.nativeElement, t) : this._renderer.removeClass(this._ngEl.nativeElement, t)
                        })
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Jo), Rr(ea), Rr(Fo), Rr(Mo))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "ngClass", ""]],
                    inputs: {
                        klass: ["class", "klass"],
                        ngClass: "ngClass"
                    }
                }), t
            })();
        class Cc {
            constructor(t, e, n, i)
            {
                this.$implicit = t,
                this.ngForOf = e,
                this.index = n,
                this.count = i
            }
            get first()
            {
                return 0 === this.index
            }
            get last()
            {
                return this.index === this.count - 1
            }
            get even()
            {
                return this.index % 2 == 0
            }
            get odd()
            {
                return !this.even
            }
        }
        let xc = (() => {
            class t {
                constructor(t, e, n)
                {
                    this._viewContainer = t,
                    this._template = e,
                    this._differs = n,
                    this._ngForOf = null,
                    this._ngForOfDirty = !0,
                    this._differ = null
                }
                set ngForOf(t)
                {
                    this._ngForOf = t,
                    this._ngForOfDirty = !0
                }
                set ngForTrackBy(t)
                {
                    this._trackByFn = t
                }
                get ngForTrackBy()
                {
                    return this._trackByFn
                }
                set ngForTemplate(t)
                {
                    t && (this._template = t)
                }
                ngDoCheck()
                {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        if (!this._differ && n)
                            try {
                                this._differ = this._differs.find(n).create(this.ngForTrackBy)
                            } catch (e) {
                                throw new Error(`Cannot find a differ supporting object '${n}' of type '${t = n, t.name || typeof t}'. NgFor only supports binding to Iterables such as Arrays.`)
                            }
                    }
                    var t;
                    if (this._differ) {
                        const t = this._differ.diff(this._ngForOf);
                        t && this._applyChanges(t)
                    }
                }
                _applyChanges(t)
                {
                    const e = [];
                    t.forEachOperation((t, n, i) => {
                        if (null == t.previousIndex) {
                            const n = this._viewContainer.createEmbeddedView(this._template, new Cc(null, this._ngForOf, -1, -1), null === i ? void 0 : i),
                                s = new Ec(t, n);
                            e.push(s)
                        } else if (null == i)
                            this._viewContainer.remove(null === n ? void 0 : n);
                        else if (null !== n) {
                            const s = this._viewContainer.get(n);
                            this._viewContainer.move(s, i);
                            const r = new Ec(t, s);
                            e.push(r)
                        }
                    });
                    for (let n = 0; n < e.length; n++)
                        this._perViewChange(e[n].view, e[n].record);
                    for (let n = 0, i = this._viewContainer.length; n < i; n++) {
                        const t = this._viewContainer.get(n);
                        t.context.index = n,
                        t.context.count = i,
                        t.context.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(t => {
                        this._viewContainer.get(t.currentIndex).context.$implicit = t.item
                    })
                }
                _perViewChange(t, e)
                {
                    t.context.$implicit = e.item
                }
                static ngTemplateContextGuard(t, e)
                {
                    return !0
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(_a), Rr(ua), Rr(Jo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate"
                }
            }), t
        })();
        class Ec {
            constructor(t, e)
            {
                this.record = t,
                this.view = e
            }
        }
        let Sc = (() => {
            class t {
                constructor(t, e)
                {
                    this._viewContainer = t,
                    this._context = new kc,
                    this._thenTemplateRef = null,
                    this._elseTemplateRef = null,
                    this._thenViewRef = null,
                    this._elseViewRef = null,
                    this._thenTemplateRef = e
                }
                set ngIf(t)
                {
                    this._context.$implicit = this._context.ngIf = t,
                    this._updateView()
                }
                set ngIfThen(t)
                {
                    Ac("ngIfThen", t),
                    this._thenTemplateRef = t,
                    this._thenViewRef = null,
                    this._updateView()
                }
                set ngIfElse(t)
                {
                    Ac("ngIfElse", t),
                    this._elseTemplateRef = t,
                    this._elseViewRef = null,
                    this._updateView()
                }
                _updateView()
                {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                }
                static ngTemplateContextGuard(t, e)
                {
                    return !0
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(_a), Rr(ua))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["", "ngIf", ""]],
                inputs: {
                    ngIf: "ngIf",
                    ngIfThen: "ngIfThen",
                    ngIfElse: "ngIfElse"
                }
            }), t
        })();
        class kc {
            constructor()
            {
                this.$implicit = null,
                this.ngIf = null
            }
        }
        function Ac(t, e) {
            if (e && !e.createEmbeddedView)
                throw new Error(`${t} must be a TemplateRef, but received '${et(e)}'.`)
        }
        class Tc {
            constructor(t, e)
            {
                this._viewContainerRef = t,
                this._templateRef = e,
                this._created = !1
            }
            create()
            {
                this._created = !0,
                this._viewContainerRef.createEmbeddedView(this._templateRef)
            }
            destroy()
            {
                this._created = !1,
                this._viewContainerRef.clear()
            }
            enforceState(t)
            {
                t && !this._created ? this.create() : !t && this._created && this.destroy()
            }
        }
        let Oc = (() => {
                class t {
                    constructor()
                    {
                        this._defaultUsed = !1,
                        this._caseCount = 0,
                        this._lastCaseCheckIndex = 0,
                        this._lastCasesMatched = !1
                    }
                    set ngSwitch(t)
                    {
                        this._ngSwitch = t,
                        0 === this._caseCount && this._updateDefaultCases(!0)
                    }
                    _addCase()
                    {
                        return this._caseCount++
                    }
                    _addDefault(t)
                    {
                        this._defaultViews || (this._defaultViews = []),
                        this._defaultViews.push(t)
                    }
                    _matchCase(t)
                    {
                        const e = t == this._ngSwitch;
                        return this._lastCasesMatched = this._lastCasesMatched || e, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), e
                    }
                    _updateDefaultCases(t)
                    {
                        if (this._defaultViews && t !== this._defaultUsed) {
                            this._defaultUsed = t;
                            for (let e = 0; e < this._defaultViews.length; e++)
                                this._defaultViews[e].enforceState(t)
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "ngSwitch", ""]],
                    inputs: {
                        ngSwitch: "ngSwitch"
                    }
                }), t
            })(),
            Ic = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this.ngSwitch = n,
                        n._addCase(),
                        this._view = new Tc(t, e)
                    }
                    ngDoCheck()
                    {
                        this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(_a), Rr(ua), Rr(Oc, 1))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "ngSwitchCase", ""]],
                    inputs: {
                        ngSwitchCase: "ngSwitchCase"
                    }
                }), t
            })(),
            Pc = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this._ngEl = t,
                        this._differs = e,
                        this._renderer = n,
                        this._ngStyle = null,
                        this._differ = null
                    }
                    set ngStyle(t)
                    {
                        this._ngStyle = t,
                        !this._differ && t && (this._differ = this._differs.find(t).create())
                    }
                    ngDoCheck()
                    {
                        if (this._differ) {
                            const t = this._differ.diff(this._ngStyle);
                            t && this._applyChanges(t)
                        }
                    }
                    _setStyle(t, e)
                    {
                        const [n, i] = t.split(".");
                        null != (e = null != e && i ? `${e}${i}` : e) ? this._renderer.setStyle(this._ngEl.nativeElement, n, e) : this._renderer.removeStyle(this._ngEl.nativeElement, n)
                    }
                    _applyChanges(t)
                    {
                        t.forEachRemovedItem(t => this._setStyle(t.key, null)),
                        t.forEachAddedItem(t => this._setStyle(t.key, t.currentValue)),
                        t.forEachChangedItem(t => this._setStyle(t.key, t.currentValue))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Fo), Rr(ea), Rr(Mo))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "ngStyle", ""]],
                    inputs: {
                        ngStyle: "ngStyle"
                    }
                }), t
            })(),
            Dc = (() => {
                class t {
                    constructor(t)
                    {
                        this._locale = t
                    }
                    transform(e, n, i)
                    {
                        if (!function(t) {
                            return !(null == t || "" === t || t != t)
                        }(e))
                            return null;
                        i = i || this._locale;
                        try {
                            return function(t, e, n) {
                                return function(t, e, n, i, s, r, o=!1) {
                                    let a = "",
                                        l = !1;
                                    if (isFinite(t)) {
                                        let c = function(t) {
                                            let e,
                                                n,
                                                i,
                                                s,
                                                r,
                                                o = Math.abs(t) + "",
                                                a = 0;
                                            for ((n = o.indexOf(gc)) > -1 && (o = o.replace(gc, "")), (i = o.search(/e/i)) > 0 ? (n < 0 && (n = i), n += +o.slice(i + 1), o = o.substring(0, i)) : n < 0 && (n = o.length), i = 0; o.charAt(i) === _c; i++)
                                                ;
                                            if (i === (r = o.length))
                                                e = [0],
                                                n = 1;
                                            else {
                                                for (r--; o.charAt(r) === _c;)
                                                    r--;
                                                for (n -= i, e = [], s = 0; i <= r; i++, s++)
                                                    e[s] = Number(o.charAt(i))
                                            }
                                            return n > 22 && (e = e.splice(0, 21), a = n - 1, n = 1), {
                                                digits: e,
                                                exponent: a,
                                                integerLen: n
                                            }
                                        }(t);
                                        o && (c = function(t) {
                                            if (0 === t.digits[0])
                                                return t;
                                            const e = t.digits.length - t.integerLen;
                                            return t.exponent ? t.exponent += 2 : (0 === e ? t.digits.push(0, 0) : 1 === e && t.digits.push(0), t.integerLen += 2), t
                                        }(c));
                                        let h = e.minInt,
                                            u = e.minFrac,
                                            d = e.maxFrac;
                                        if (r) {
                                            const t = r.match(mc);
                                            if (null === t)
                                                throw new Error(`${r} is not a valid digit info`);
                                            const e = t[1],
                                                n = t[3],
                                                i = t[5];
                                            null != e && (h = yc(e)),
                                            null != n && (u = yc(n)),
                                            null != i ? d = yc(i) : null != n && u > d && (d = u)
                                        }
                                        !function(t, e, n) {
                                            if (e > n)
                                                throw new Error(`The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`);
                                            let i = t.digits,
                                                s = i.length - t.integerLen;
                                            const r = Math.min(Math.max(e, s), n);
                                            let o = r + t.integerLen,
                                                a = i[o];
                                            if (o > 0) {
                                                i.splice(Math.max(t.integerLen, o));
                                                for (let t = o; t < i.length; t++)
                                                    i[t] = 0
                                            } else {
                                                s = Math.max(0, s),
                                                t.integerLen = 1,
                                                i.length = Math.max(1, o = r + 1),
                                                i[0] = 0;
                                                for (let t = 1; t < o; t++)
                                                    i[t] = 0
                                            }
                                            if (a >= 5)
                                                if (o - 1 < 0) {
                                                    for (let e = 0; e > o; e--)
                                                        i.unshift(0),
                                                        t.integerLen++;
                                                    i.unshift(1),
                                                    t.integerLen++
                                                } else
                                                    i[o - 1]++;
                                            for (; s < Math.max(0, r); s++)
                                                i.push(0);
                                            let l = 0 !== r;
                                            const c = e + t.integerLen,
                                                h = i.reduceRight(function(t, e, n, i) {
                                                    return i[n] = (e += t) < 10 ? e : e - 10, l && (0 === i[n] && n >= c ? i.pop() : l = !1), e >= 10 ? 1 : 0
                                                }, 0);
                                            h && (i.unshift(h), t.integerLen++)
                                        }(c, u, d);
                                        let p = c.digits,
                                            f = c.integerLen;
                                        const m = c.exponent;
                                        let g = [];
                                        for (l = p.every(t => !t); f < h; f++)
                                            p.unshift(0);
                                        for (; f < 0; f++)
                                            p.unshift(0);
                                        f > 0 ? g = p.splice(f, p.length) : (g = p, p = [0]);
                                        const _ = [];
                                        for (p.length >= e.lgSize && _.unshift(p.splice(-e.lgSize, p.length).join("")); p.length > e.gSize;)
                                            _.unshift(p.splice(-e.gSize, p.length).join(""));
                                        p.length && _.unshift(p.join("")),
                                        a = _.join(fc(n, i)),
                                        g.length && (a += fc(n, s) + g.join("")),
                                        m && (a += fc(n, pc.Exponential) + "+" + m)
                                    } else
                                        a = fc(n, pc.Infinity);
                                    return a = t < 0 && !l ? e.negPre + a + e.negSuf : e.posPre + a + e.posSuf, a
                                }(t, function(t, e="-") {
                                    const n = {
                                            minInt: 1,
                                            minFrac: 0,
                                            maxFrac: 0,
                                            posPre: "",
                                            posSuf: "",
                                            negPre: "",
                                            negSuf: "",
                                            gSize: 0,
                                            lgSize: 0
                                        },
                                        i = t.split(";"),
                                        s = i[0],
                                        r = i[1],
                                        o = -1 !== s.indexOf(gc) ? s.split(gc) : [s.substring(0, s.lastIndexOf(_c) + 1), s.substring(s.lastIndexOf(_c) + 1)],
                                        a = o[0],
                                        l = o[1] || "";
                                    n.posPre = a.substr(0, a.indexOf("#"));
                                    for (let h = 0; h < l.length; h++) {
                                        const t = l.charAt(h);
                                        t === _c ? n.minFrac = n.maxFrac = h + 1 : "#" === t ? n.maxFrac = h + 1 : n.posSuf += t
                                    }
                                    const c = a.split(",");
                                    if (n.gSize = c[1] ? c[1].length : 0, n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0, r) {
                                        const t = s.length - n.posPre.length - n.posSuf.length,
                                            e = r.indexOf("#");
                                        n.negPre = r.substr(0, e).replace(/'/g, ""),
                                        n.negSuf = r.substr(e + t).replace(/'/g, "")
                                    } else
                                        n.negPre = e + n.posPre,
                                        n.negSuf = n.posSuf;
                                    return n
                                }(function(t, e) {
                                    return fo(t)[go.NumberFormats][e]
                                }(e, uc.Decimal), fc(e, pc.MinusSign)), e, pc.Group, pc.Decimal, n)
                            }(function(t) {
                                if ("string" == typeof t && !isNaN(Number(t) - parseFloat(t)))
                                    return Number(t);
                                if ("number" != typeof t)
                                    throw new Error(`${t} is not a number`);
                                return t
                            }(e), i, n)
                        } catch (s) {
                            throw function(t, e) {
                                return Error(`InvalidPipeArgument: '${e}' for pipe '${et(t)}'`)
                            }(t, s.message)
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(hl))
                }, t.\u0275pipe = Wt({
                    name: "number",
                    type: t,
                    pure: !0
                }), t
            })(),
            Rc = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [{
                        provide: bc,
                        useClass: vc
                    }]
                }), t
            })();
        class Fc extends class  extends class {}
        {
            constructor()
            {
                super()
            }
            supportsDOMEvents()
            {
                return !0
            }
        }
        {
            static makeCurrent()
            {
                var t;
                t = new Fc,
                Zl || (Zl = t)
            }
            getProperty(t, e)
            {
                return t[e]
            }
            log(t)
            {
                window.console && window.console.log && window.console.log(t)
            }
            logGroup(t)
            {
                window.console && window.console.group && window.console.group(t)
            }
            logGroupEnd()
            {
                window.console && window.console.groupEnd && window.console.groupEnd()
            }
            onAndCancel(t, e, n)
            {
                return t.addEventListener(e, n, !1), () => {
                    t.removeEventListener(e, n, !1)
                }
            }
            dispatchEvent(t, e)
            {
                t.dispatchEvent(e)
            }
            remove(t)
            {
                return t.parentNode && t.parentNode.removeChild(t), t
            }
            getValue(t)
            {
                return t.value
            }
            createElement(t, e)
            {
                return (e = e || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument()
            {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument()
            {
                return document
            }
            isElementNode(t)
            {
                return t.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(t)
            {
                return t instanceof DocumentFragment
            }
            getGlobalEventTarget(t, e)
            {
                return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
            }
            getHistory()
            {
                return window.history
            }
            getLocation()
            {
                return window.location
            }
            getBaseHref(t)
            {
                const e = Nc || (Nc = document.querySelector("base"), Nc) ? Nc.getAttribute("href") : null;
                return null == e ? null : (n = e, Vc || (Vc = document.createElement("a")), Vc.setAttribute("href", n), "/" === Vc.pathname.charAt(0) ? Vc.pathname : "/" + Vc.pathname);
                var n
            }
            resetBaseElement()
            {
                Nc = null
            }
            getUserAgent()
            {
                return window.navigator.userAgent
            }
            performanceNow()
            {
                return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
            }
            supportsCookies()
            {
                return !0
            }
            getCookie(t)
            {
                return function(t, e) {
                    e = encodeURIComponent(e);
                    for (const n of t.split(";")) {
                        const t = n.indexOf("="),
                            [i, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                        if (i.trim() === e)
                            return decodeURIComponent(s)
                    }
                    return null
                }(document.cookie, t)
            }
        }
        let Vc,
            Nc = null;
        const Mc = new qn("TRANSITION_ID"),
            Lc = [{
                provide: el,
                useFactory: function(t, e, n) {
                    return () => {
                        n.get(nl).donePromise.then(() => {
                            const n = Ql();
                            Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
                        })
                    }
                },
                deps: [Mc, Kl, yr],
                multi: !0
            }];
        class jc {
            static init()
            {
                var t;
                t = new jc,
                Rl = t
            }
            addToWindow(t)
            {
                At.getAngularTestability = (e, n=!0) => {
                    const i = t.findTestabilityInTree(e, n);
                    if (null == i)
                        throw new Error("Could not find testability for element.");
                    return i
                },
                At.getAllAngularTestabilities = () => t.getAllTestabilities(),
                At.getAllAngularRootElements = () => t.getAllRootElements(),
                At.frameworkStabilizers || (At.frameworkStabilizers = []),
                At.frameworkStabilizers.push(t => {
                    const e = At.getAllAngularTestabilities();
                    let n = e.length,
                        i = !1;
                    const s = function(e) {
                        i = i || e,
                        n--,
                        0 == n && t(i)
                    };
                    e.forEach(function(t) {
                        t.whenStable(s)
                    })
                })
            }
            findTestabilityInTree(t, e, n)
            {
                if (null == e)
                    return null;
                const i = t.getTestability(e);
                return null != i ? i : n ? Ql().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
            }
        }
        const Bc = new qn("EventManagerPlugins");
        let Hc = (() => {
            class t {
                constructor(t, e)
                {
                    this._zone = e,
                    this._eventNameToPlugin = new Map,
                    t.forEach(t => t.manager = this),
                    this._plugins = t.slice().reverse()
                }
                addEventListener(t, e, n)
                {
                    return this._findPluginFor(e).addEventListener(t, e, n)
                }
                addGlobalEventListener(t, e, n)
                {
                    return this._findPluginFor(e).addGlobalEventListener(t, e, n)
                }
                getZone()
                {
                    return this._zone
                }
                _findPluginFor(t)
                {
                    const e = this._eventNameToPlugin.get(t);
                    if (e)
                        return e;
                    const n = this._plugins;
                    for (let i = 0; i < n.length; i++) {
                        const e = n[i];
                        if (e.supports(t))
                            return this._eventNameToPlugin.set(t, e), e
                    }
                    throw new Error(`No event manager plugin found for event ${t}`)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Bc), oi(Cl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        class zc {
            constructor(t)
            {
                this._doc = t
            }
            addGlobalEventListener(t, e, n)
            {
                const i = Ql().getGlobalEventTarget(this._doc, t);
                if (!i)
                    throw new Error(`Unsupported event target ${i} for event ${e}`);
                return this.addEventListener(i, e, n)
            }
        }
        let $c = (() => {
                class t {
                    constructor()
                    {
                        this._stylesSet = new Set
                    }
                    addStyles(t)
                    {
                        const e = new Set;
                        t.forEach(t => {
                            this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
                        }),
                        this.onStylesAdded(e)
                    }
                    onStylesAdded(t) {}
                    getAllStyles()
                    {
                        return Array.from(this._stylesSet)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            qc = (() => {
                class t extends $c {
                    constructor(t)
                    {
                        super(),
                        this._doc = t,
                        this._hostNodes = new Set,
                        this._styleNodes = new Set,
                        this._hostNodes.add(t.head)
                    }
                    _addStylesToHost(t, e)
                    {
                        t.forEach(t => {
                            const n = this._doc.createElement("style");
                            n.textContent = t,
                            this._styleNodes.add(e.appendChild(n))
                        })
                    }
                    addHost(t)
                    {
                        this._addStylesToHost(this._stylesSet, t),
                        this._hostNodes.add(t)
                    }
                    removeHost(t)
                    {
                        this._hostNodes.delete(t)
                    }
                    onStylesAdded(t)
                    {
                        this._hostNodes.forEach(e => this._addStylesToHost(t, e))
                    }
                    ngOnDestroy()
                    {
                        this._styleNodes.forEach(t => Ql().remove(t))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Kl))
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
        const Wc = {
                svg: "http://www.w3.org/2000/svg",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                xml: "http://www.w3.org/XML/1998/namespace",
                xmlns: "http://www.w3.org/2000/xmlns/"
            },
            Uc = /%COMP%/g;
        function Zc(t, e, n) {
            for (let i = 0; i < e.length; i++) {
                let s = e[i];
                Array.isArray(s) ? Zc(t, s, n) : (s = s.replace(Uc, t), n.push(s))
            }
            return n
        }
        function Qc(t) {
            return e => {
                if ("__ngUnwrap__" === e)
                    return t;
                !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
            }
        }
        let Kc = (() => {
            class t {
                constructor(t, e, n)
                {
                    this.eventManager = t,
                    this.sharedStylesHost = e,
                    this.appId = n,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new Gc(t)
                }
                createRenderer(t, e)
                {
                    if (!t || !e)
                        return this.defaultRenderer;
                    switch (e.encapsulation) {
                    case Ct.Emulated:
                        {
                            let n = this.rendererByCompId.get(e.id);
                            return n || (n = new Yc(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
                        }case 1:
                    case Ct.ShadowDom:
                        return new Xc(this.eventManager, this.sharedStylesHost, t, e);
                    default:
                        if (!this.rendererByCompId.has(e.id)) {
                            const t = Zc(e.id, e.styles, []);
                            this.sharedStylesHost.addStyles(t),
                            this.rendererByCompId.set(e.id, this.defaultRenderer)
                        }
                        return this.defaultRenderer
                    }
                }
                begin() {}
                end() {}
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Hc), oi(qc), oi(il))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        class Gc {
            constructor(t)
            {
                this.eventManager = t,
                this.data = Object.create(null)
            }
            destroy() {}
            createElement(t, e)
            {
                return e ? document.createElementNS(Wc[e] || e, t) : document.createElement(t)
            }
            createComment(t)
            {
                return document.createComment(t)
            }
            createText(t)
            {
                return document.createTextNode(t)
            }
            appendChild(t, e)
            {
                t.appendChild(e)
            }
            insertBefore(t, e, n)
            {
                t && t.insertBefore(e, n)
            }
            removeChild(t, e)
            {
                t && t.removeChild(e)
            }
            selectRootElement(t, e)
            {
                let n = "string" == typeof t ? document.querySelector(t) : t;
                if (!n)
                    throw new Error(`The selector "${t}" did not match any elements`);
                return e || (n.textContent = ""), n
            }
            parentNode(t)
            {
                return t.parentNode
            }
            nextSibling(t)
            {
                return t.nextSibling
            }
            setAttribute(t, e, n, i)
            {
                if (i) {
                    e = i + ":" + e;
                    const s = Wc[i];
                    s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
                } else
                    t.setAttribute(e, n)
            }
            removeAttribute(t, e, n)
            {
                if (n) {
                    const i = Wc[n];
                    i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`)
                } else
                    t.removeAttribute(e)
            }
            addClass(t, e)
            {
                t.classList.add(e)
            }
            removeClass(t, e)
            {
                t.classList.remove(e)
            }
            setStyle(t, e, n, i)
            {
                i & (vi.DashCase | vi.Important) ? t.style.setProperty(e, n, i & vi.Important ? "important" : "") : t.style[e] = n
            }
            removeStyle(t, e, n)
            {
                n & vi.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
            }
            setProperty(t, e, n)
            {
                t[e] = n
            }
            setValue(t, e)
            {
                t.nodeValue = e
            }
            listen(t, e, n)
            {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, Qc(n)) : this.eventManager.addEventListener(t, e, Qc(n))
            }
        }
        class Yc extends Gc {
            constructor(t, e, n, i)
            {
                super(t),
                this.component = n;
                const s = Zc(i + "-" + n.id, n.styles, []);
                e.addStyles(s),
                this.contentAttr = "_ngcontent-%COMP%".replace(Uc, i + "-" + n.id),
                this.hostAttr = "_nghost-%COMP%".replace(Uc, i + "-" + n.id)
            }
            applyToHost(t)
            {
                super.setAttribute(t, this.hostAttr, "")
            }
            createElement(t, e)
            {
                const n = super.createElement(t, e);
                return super.setAttribute(n, this.contentAttr, ""), n
            }
        }
        class Xc extends Gc {
            constructor(t, e, n, i)
            {
                super(t),
                this.sharedStylesHost = e,
                this.hostEl = n,
                this.shadowRoot = n.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const s = Zc(i.id, i.styles, []);
                for (let r = 0; r < s.length; r++) {
                    const t = document.createElement("style");
                    t.textContent = s[r],
                    this.shadowRoot.appendChild(t)
                }
            }
            nodeOrShadowRoot(t)
            {
                return t === this.hostEl ? this.shadowRoot : t
            }
            destroy()
            {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(t, e)
            {
                return super.appendChild(this.nodeOrShadowRoot(t), e)
            }
            insertBefore(t, e, n)
            {
                return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
            }
            removeChild(t, e)
            {
                return super.removeChild(this.nodeOrShadowRoot(t), e)
            }
            parentNode(t)
            {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
        }
        let Jc = (() => {
            class t extends zc {
                constructor(t)
                {
                    super(t)
                }
                supports(t)
                {
                    return !0
                }
                addEventListener(t, e, n)
                {
                    return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
                }
                removeEventListener(t, e, n)
                {
                    return t.removeEventListener(e, n)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Kl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const th = ["alt", "control", "meta", "shift"],
            eh = {
                "\b": "Backspace",
                "\t": "Tab",
                "\x7f": "Delete",
                "\x1b": "Escape",
                Del: "Delete",
                Esc: "Escape",
                Left: "ArrowLeft",
                Right: "ArrowRight",
                Up: "ArrowUp",
                Down: "ArrowDown",
                Menu: "ContextMenu",
                Scroll: "ScrollLock",
                Win: "OS"
            },
            nh = {
                A: "1",
                B: "2",
                C: "3",
                D: "4",
                E: "5",
                F: "6",
                G: "7",
                H: "8",
                I: "9",
                J: "*",
                K: "+",
                M: "-",
                N: ".",
                O: "/",
                "`": "0",
                "\x90": "NumLock"
            },
            ih = {
                alt: t => t.altKey,
                control: t => t.ctrlKey,
                meta: t => t.metaKey,
                shift: t => t.shiftKey
            };
        let sh = (() => {
            class t extends zc {
                constructor(t)
                {
                    super(t)
                }
                supports(e)
                {
                    return null != t.parseEventName(e)
                }
                addEventListener(e, n, i)
                {
                    const s = t.parseEventName(n),
                        r = t.eventCallback(s.fullKey, i, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => Ql().onAndCancel(e, s.domEventName, r))
                }
                static parseEventName(e)
                {
                    const n = e.toLowerCase().split("."),
                        i = n.shift();
                    if (0 === n.length || "keydown" !== i && "keyup" !== i)
                        return null;
                    const s = t._normalizeKey(n.pop());
                    let r = "";
                    if (th.forEach(t => {
                        const e = n.indexOf(t);
                        e > -1 && (n.splice(e, 1), r += t + ".")
                    }), r += s, 0 != n.length || 0 === s.length)
                        return null;
                    const o = {};
                    return o.domEventName = i, o.fullKey = r, o
                }
                static getEventFullKey(t)
                {
                    let e = "",
                        n = function(t) {
                            let e = t.key;
                            if (null == e) {
                                if (e = t.keyIdentifier, null == e)
                                    return "Unidentified";
                                e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && nh.hasOwnProperty(e) && (e = nh[e]))
                            }
                            return eh[e] || e
                        }(t);
                    return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), th.forEach(i => {
                        i != n && (0, ih[i])(t) && (e += i + ".")
                    }), e += n, e
                }
                static eventCallback(e, n, i)
                {
                    return s => {
                        t.getEventFullKey(s) === e && i.runGuarded(() => n(s))
                    }
                }
                static _normalizeKey(t)
                {
                    switch (t) {
                    case "esc":
                        return "escape";
                    default:
                        return t
                    }
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Kl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const rh = Ll(ql, "browser", [{
                provide: al,
                useValue: "browser"
            }, {
                provide: ol,
                useValue: function() {
                    Fc.makeCurrent(),
                    jc.init()
                },
                multi: !0
            }, {
                provide: Kl,
                useFactory: function() {
                    return function(t) {
                        fe = t
                    }(document), document
                },
                deps: []
            }]),
            oh = [[], {
                provide: sr,
                useValue: "root"
            }, {
                provide: gi,
                useFactory: function() {
                    return new gi
                },
                deps: []
            }, {
                provide: Bc,
                useClass: Jc,
                multi: !0,
                deps: [Kl, Cl, al]
            }, {
                provide: Bc,
                useClass: sh,
                multi: !0,
                deps: [Kl]
            }, [], {
                provide: Kc,
                useClass: Kc,
                deps: [Hc, qc, il]
            }, {
                provide: No,
                useExisting: Kc
            }, {
                provide: $c,
                useExisting: qc
            }, {
                provide: qc,
                useClass: qc,
                deps: [Kl]
            }, {
                provide: Ol,
                useClass: Ol,
                deps: [Cl]
            }, {
                provide: Hc,
                useClass: Hc,
                deps: [Bc, Cl]
            }, []];
        let ah = (() => {
            class t {
                constructor(t)
                {
                    if (t)
                        throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                }
                static withServerTransition(e)
                {
                    return {
                        ngModule: t,
                        providers: [{
                            provide: il,
                            useValue: e.appId
                        }, {
                            provide: Mc,
                            useExisting: il
                        }, Lc]
                    }
                }
            }
            return t.\u0275mod = zt({
                type: t
            }), t.\u0275inj = lt({
                factory: function(e) {
                    return new (e || t)(oi(t, 12))
                },
                providers: oh,
                imports: [Rc, Ul]
            }), t
        })();
        "undefined" != typeof window && window;
        for (var lh = 36, ch = ""; lh--;)
            ch += lh.toString(36);
        var hh = function(t) {
                for (var e = "", n = t || 11; n--;)
                    e += ch[36 * Math.random() | 0];
                return e
            },
            uh = n("8tg8"),
            dh = n.n(uh);
        const ph = ["recipeCardSvg"],
            fh = function(t) {
                return {
                    "form-row-alt": t
                }
            };
        function mh(t, e) {
            if (1 & t) {
                const t = Hr();
                Nr(0, "div", 54),
                Nr(1, "mat-form-field", 9),
                Nr(2, "mat-label"),
                oo(3, "Name"),
                Mr(),
                Nr(4, "input", 55),
                $r("ngModelChange", function(t) {
                    return e.$implicit.name = t
                }),
                Mr(),
                Mr(),
                Nr(5, "mat-form-field", 9),
                Nr(6, "mat-label"),
                oo(7, "Weight"),
                Mr(),
                Nr(8, "input", 56),
                $r("ngModelChange", function(t) {
                    return e.$implicit.value = t
                })("change", function(n) {
                    De(t);
                    const i = e.$implicit;
                    return Ur().onFlourChange(n.target.value, i.id)
                }),
                Mr(),
                Nr(9, "span", 11),
                oo(10, "g"),
                Mr(),
                Mr(),
                Nr(11, "button", 57),
                $r("click", function() {
                    De(t);
                    const n = e.$implicit;
                    return Ur().deleteFlour(n.id)
                }),
                oo(12, "Delete"),
                Mr(),
                Mr()
            }
            if (2 & t) {
                const t = e.$implicit,
                    n = e.index,
                    i = Ur();
                Fr("ngClass", Da(4, fh, n % 2 == 1)),
                as(4),
                Fr("ngModel", t.name),
                as(4),
                Fr("ngModel", t.value),
                as(3),
                Fr("disabled", 1 === i.model.flours.length)
            }
        }
        function gh(t, e) {
            if (1 & t) {
                const t = Hr();
                Nr(0, "div", 54),
                Nr(1, "mat-form-field", 58),
                Nr(2, "mat-label"),
                oo(3, "Name"),
                Mr(),
                Nr(4, "input", 59),
                $r("ngModelChange", function(t) {
                    return e.$implicit.name = t
                }),
                Mr(),
                Mr(),
                Nr(5, "mat-form-field", 58),
                Nr(6, "mat-label"),
                oo(7, "Weight"),
                Mr(),
                Nr(8, "input", 60),
                $r("ngModelChange", function(t) {
                    return e.$implicit.value = t
                })("change", function(n) {
                    De(t);
                    const i = e.$implicit;
                    return Ur().onIngredientValueChange(n.target.value, i.id)
                }),
                Mr(),
                Nr(9, "span", 11),
                oo(10, "g"),
                Mr(),
                Mr(),
                Nr(11, "mat-form-field", 58),
                Nr(12, "mat-label"),
                oo(13, "Percentage"),
                Mr(),
                Nr(14, "input", 61),
                $r("ngModelChange", function(t) {
                    return e.$implicit.percentage = t
                })("change", function(n) {
                    De(t);
                    const i = e.$implicit;
                    return Ur().onIngredientPercentageChange(n.target.value, i.id)
                }),
                Mr(),
                Nr(15, "span", 11),
                oo(16, "%"),
                Mr(),
                Mr(),
                Nr(17, "button", 62),
                $r("click", function() {
                    De(t);
                    const n = e.$implicit;
                    return Ur().deleteIngredient(n.id)
                }),
                oo(18, "Delete"),
                Mr(),
                Mr()
            }
            if (2 & t) {
                const t = e.$implicit,
                    n = e.index,
                    i = Ur();
                Fr("ngClass", Da(5, fh, n % 2 == 1)),
                as(4),
                Fr("ngModel", t.name),
                as(4),
                Fr("ngModel", t.value),
                as(6),
                Fr("ngModel", t.percentage),
                as(3),
                Fr("disabled", 1 === i.model.ingredients.length)
            }
        }
        function _h(t, e) {
            if (1 & t && (sn(), Nr(0, "tspan", 63), oo(1), Mr()), 2 & t) {
                const t = e.$implicit;
                as(1),
                ao(t)
            }
        }
        function yh(t, e) {
            1 & t && (sn(), rn(), Nr(0, "div", 64), oo(1, "At least one ingredient name exceeds the limit of 13 characters, which means that this ingredient card may not be displaying all of your ingredient names properly."), Mr())
        }
        const bh = function(t) {
            return {
                "font-weight": t
            }
        };
        function vh(t, e) {
            if (1 & t && (sn(), Nr(0, "tspan", 65), oo(1), Mr()), 2 & t) {
                const t = e.$implicit;
                Fr("ngStyle", Da(2, bh, 0 === e.index ? "bold" : "normal")),
                as(1),
                ao(t)
            }
        }
        let wh = (() => {
            class t {
                constructor()
                {
                    this.title = "Bread Ratio Calculator",
                    this.showPrinter = !1,
                    this.showPreview = !1,
                    this.showCharLimitWarning = !1,
                    this.defaultNewFlour = {
                        name: "Flour",
                        value: 500
                    },
                    this.defaultIngredients = [{
                        name: "Water",
                        value: 360
                    }, {
                        name: "Sea Salt",
                        value: 21
                    }, {
                        name: "Instant Yeast",
                        value: 4
                    }],
                    this.defaultNewIngredient = {
                        name: "Ingredient",
                        value: 100
                    },
                    this.panelOpenState = !1
                }
                reset()
                {
                    this.model = {
                        name: "My Bread Recipe",
                        flours: [],
                        ingredients: [],
                        totalWeight: 0,
                        numberOfLoaves: 1
                    },
                    this.addNewFlour(),
                    this.addDefaultIngredients(),
                    this.updateAllPercentages(),
                    this.showPreview = !1
                }
                addNewFlour()
                {
                    const t = Object.assign(Object.assign({}, this.defaultNewFlour), {
                        id: hh()
                    });
                    this.model.flours.push(t),
                    this.updateTotalWeight(),
                    this.updateAllIngredientValues()
                }
                addDefaultIngredients()
                {
                    this.defaultIngredients.forEach(t => this.addNewIngredient(t))
                }
                addNewIngredient(t)
                {
                    const e = Object.assign(Object.assign({}, t || this.defaultNewIngredient), {
                        percentage: this.calculatePercentage(this.defaultNewIngredient),
                        id: hh()
                    });
                    this.model.ingredients.push(e),
                    this.updateTotalWeight()
                }
                get totalFlourWeight()
                {
                    let t = 0;
                    return this.model.flours.forEach(e => {
                        t += e.value
                    }), t
                }
                get gramsPerLoaf()
                {
                    return this.model.totalWeight / this.model.numberOfLoaves
                }
                calculatePercentage(t)
                {
                    return t.value / this.totalFlourWeight * 100
                }
                calculateValue(t)
                {
                    return this.totalFlourWeight * t.percentage / 100
                }
                updateTotalWeight()
                {
                    let t = 0;
                    [...this.model.flours, ...this.model.ingredients].forEach(e => {
                        t += e.value
                    }),
                    this.model.totalWeight = t
                }
                updateAllPercentages()
                {
                    this.model.ingredients.forEach(t => {
                        t.percentage = this.calculatePercentage(t)
                    })
                }
                updateAllIngredientValues()
                {
                    this.model.ingredients.forEach(t => {
                        t.value = this.calculateValue(t)
                    })
                }
                onFlourChange(t, e)
                {
                    const n = Number(t),
                        i = this.model.flours.find(t => t.id === e);
                    0 === n ? i.value = 1 : n < 0 || (i.value = Number(n)),
                    this.updateAllIngredientValues(),
                    this.updateTotalWeight()
                }
                onIngredientValueChange(t, e)
                {
                    const n = this.model.ingredients.find(t => t.id === e),
                        i = Number(t);
                    n.value = i < 0 ? -1 * i : 0 === i ? 1 : i,
                    n.percentage = this.calculatePercentage(n),
                    this.updateTotalWeight()
                }
                onIngredientPercentageChange(t, e)
                {
                    const n = this.model.ingredients.find(t => t.id === e),
                        i = Number(t);
                    n.percentage = i < 0 ? -1 * i : 0 === i ? 1 : i,
                    n.value = this.calculateValue(n),
                    this.updateTotalWeight()
                }
                adjustRecipe(t)
                {
                    this.model.flours.forEach(e => {
                        this.onFlourChange(e.value * t, e.id)
                    }),
                    this.model.numberOfLoaves = this.model.numberOfLoaves * t
                }
                deleteFlour(t)
                {
                    this.model.flours = this.model.flours.filter(e => e.id !== t),
                    this.updateAllIngredientValues(),
                    this.updateTotalWeight()
                }
                deleteIngredient(t)
                {
                    this.model.ingredients = this.model.ingredients.filter(e => e.id !== t),
                    this.updateTotalWeight()
                }
                ngOnInit()
                {
                    this.reset()
                }
                onLoafChange(t)
                {
                    Number(t.target.value) < 1 && (t.preventDefault(), this.model.numberOfLoaves = 1)
                }
                createRecipeCardPreview()
                {
                    this.showPreview = !0
                }
                get svgRows()
                {
                    let t = !1;
                    const e = [["Ingredient", "Weight(g)", "%"]];
                    [...this.model.flours, ...this.model.ingredients].forEach(n => {
                        n.name.length > 13 && (t = !0),
                        e.push([n.name.substr(0, 13), this.round(n.value), this.round(n.percentage) || ""])
                    });
                    const n = dh()(e, {
                        align: ["l", "r", "r"]
                    });
                    return this.showCharLimitWarning = t, n.split("\n")
                }
                createRecipeCard()
                {
                    const t = (new XMLSerializer).serializeToString(this.recipeCardSvg.nativeElement),
                        e = document.getElementById("canvas"),
                        n = e.getContext("2d");
                    n.clearRect(0, 0, e.width, e.height);
                    const i = window.URL || window.webkitURL,
                        s = new Image,
                        r = new Blob([t], {
                            type: "image/svg+xml"
                        }),
                        o = i.createObjectURL(r);
                    s.onload = () => {
                        n.drawImage(s, 0, 0, 2160, 2160);
                        const t = e.toDataURL("image/png", 1),
                            r = document.createElement("a");
                        r.href = t,
                        r.download = "recipe.png",
                        document.body.appendChild(r),
                        r.click(),
                        document.body.removeChild(r),
                        i.revokeObjectURL(t)
                    },
                    s.src = o
                }
                round(t, e=2)
                {
                    return Math.round((t + Number.EPSILON) * Math.pow(10, e)) / Math.pow(10, e)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275cmp = Lt({
                type: t,
                selectors: [["app-root"]],
                viewQuery: function(t, e) {
                    if (1 & t && Ka(ph, 1, Fo), 2 & t) {
                        let t;
                        Qa(t = Ya()) && (e.recipeCardSvg = t.first)
                    }
                },
                decls: 116,
                vars: 14,
                consts: [[1, "container"], [1, "form"], [1, "text-center"], [1, "description", 3, "expanded", "opened", "closed"], ["mat-button", "", "color", "primary", 3, "click"], [1, "form-section"], ["class", "form-row", 3, "ngClass", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 1, "add-item-button", 3, "click"], [1, "results-row"], [1, "form-row-item"], ["matInput", "", "placeholder", "1000", "type", "number", "disabled", "true", 3, "value"], ["matSuffix", ""], ["matInput", "", "type", "number", 3, "ngModel", "change", "ngModelChange"], [1, "command-row"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], [3, "model", "title", "showPrinter"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["id", "previewDiv", 3, "hidden"], ["id", "recipeCardSvgPreview", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "width", "100%", "height", "100%", "viewBox", "0 0 1080 1080", 1, "preview", 2, "background-color", "rgb(255,255,255)"], ["x", "60", "y", "60", "width", "960", "height", "960", 2, "fill", "rgb(255,255,255)"], ["y", "70", "font-size", "50"], [0, "xml", "space", "preserve", "font-family", "monospace", "x", "100", "dy", "60", 4, "ngFor", "ngForOf"], ["y", "1000", "x", "100", "font-size", "35"], ["id", "overflowAlert", "class", "preview-caption", 4, "ngIf"], [1, "preview-caption"], ["id", "recipeCardSvg", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "width", "1080", "height", "1080", 2, "background-color", "rgb(255,255,255)"], ["recipeCardSvg", ""], ["id", "Pattern", "x", "0", "y", "0", "width", ".25", "height", ".1", "patternTransform", "scale(0.5 0.5)"], ["transform", "matrix(0.0408843,0,0,0.036357,-3.73467,6.17167)"], ["d", "M1237.65,142.633C1228.62,72.093 1180.33,-9.544 1112.82,-47.505C1082.64,-64.472 1048.26,-71.716 1023.65,-76.518C929.457,-94.901 794.609,-64.985 706.532,47.613C666.309,-0.189 617.394,-39.289 561.268,-56.866C512.433,-72.16 445.449,-85.11 388.852,-77.053C325.209,-67.994 181.987,-39.677 166.477,150.54C158.682,227.958 177.137,300.191 217.108,367.239L217.108,1054.43C217.108,1126.57 269.19,1185.14 333.34,1185.14L1071.24,1185.14C1135.39,1185.14 1187.47,1126.57 1187.47,1054.43L1186.5,366.342C1235.68,286.731 1248.37,226.395 1237.65,142.633Z", 2, "fill", "rgb(250,234,207)", "stroke", "rgb(197,125,0)", "stroke-width", "36.19px"], ["transform", "matrix(0.138478,0,0,0.138478,37.2335,28.2645)"], ["transform", "matrix(0.813246,-0.806463,0.840123,0.847188,-330.364,211.301)"], ["d", "M336.716,369.096C423.694,369.096 500.46,373.261 539.141,390.816C556.604,398.741 566.529,416.243 567.228,425.854C567.92,435.389 567.758,440.694 564.187,445.967C563.445,447.064 561.945,450.774 559.301,453.785C556.351,457.144 552.215,459.827 550.989,461.025C535.376,476.281 428.375,481.343 336.716,481.343C268.448,481.343 197.571,480.145 155.644,468.493C120.036,458.597 104.905,436.405 104.905,422.179C104.905,410.439 111.988,390.426 137.697,381.954C179.817,368.075 258.32,369.096 336.716,369.096Z", 2, "fill", "rgb(248,170,35)"], ["transform", "matrix(0.648954,-0.643542,0.212062,0.213845,18.3333,436.438)"], ["d", "M385.588,409.852C472.567,409.852 500.46,373.261 539.141,390.816C556.604,398.741 579.755,363.98 583.229,368.707C586.165,372.701 580.459,420.091 573.792,438.201C567.408,455.541 552.215,459.827 550.989,461.025C535.376,476.281 428.375,481.343 336.716,481.343C268.448,481.343 185.937,513.566 145.4,479.05C109.195,448.222 65.321,397.062 65.321,382.837C65.321,371.096 116.088,405.803 142.075,412.375C184.296,423.052 307.192,409.852 385.588,409.852Z", 2, "fill", "rgb(221,140,0)", "fill-opacity", "0.25"], ["transform", "matrix(-0.0886972,0.996059,-1.26425,-0.112579,705.862,241.486)"], ["d", "M181.602,356.606C186.623,356.606 192.118,367.622 199.105,377.152C204.628,384.685 211.782,401.568 213.902,411.528C219.189,436.37 224.893,447.506 220.922,455.068C219.361,458.04 181.927,438.621 180.437,435.333C176.589,426.844 174.566,409.654 174.033,397.681C173.615,388.316 175.738,356.606 181.602,356.606Z", 2, "fill", "rgb(255,232,147)"], ["transform", "matrix(-0.346466,0.938062,-1.19063,-0.439752,962.436,162.13)"], ["transform", "matrix(-0.221166,0.975236,-1.23782,-0.280715,870.642,162.315)"], ["transform", "matrix(-0.225683,0.974201,-1.2365,-0.286448,787.563,246.703)"], ["transform", "matrix(0.138478,0,0,0.138478,157.455,28.4543)"], ["transform", "matrix(0.131687,0,0,0.131687,97.573,-13.6105)"], ["transform", "matrix(1.02596,0,0,1.07323,-5.15573,-11.1605)"], ["d", "M394.903,156.839C432.503,156.839 468.981,159.28 500.692,170.156C564.71,192.112 609.904,237.14 609.904,286.709C609.904,308.341 605.344,331.828 591.166,349.927C582.311,361.231 554.974,375.733 536.476,383.107C494.297,399.921 448.295,402.353 392.68,402.353C348.156,402.353 300.364,399.234 259.721,386.726C249.599,383.611 218.411,367.505 211.682,361.294C208.412,358.276 204.21,352.822 200.99,347.6C197.221,341.487 195.016,334.475 194.334,329.849C192.214,315.464 190.596,304.264 195.038,285.938C212.539,213.728 281.398,156.839 394.903,156.839Z", 2, "fill", "rgb(196,132,44)"], ["transform", "matrix(1,0,0,1,-2304,-512)"], ["transform", "matrix(7.59376,-0,-0,7.59376,1563.05,615.355)"], [0, "xlink", "href", "#_Image1", "x", "151.045", "y", "7.144", "width", "9.609px", "height", "26.697px", "transform", "matrix(0.960923,0,0,0.988793,0,0)"], ["transform", "matrix(-0.178837,0.983879,-1.43031,-0.259984,875.478,-21.7605)"], ["d", "M342.531,201.161C358.095,201.161 365.652,235.427 365.652,285.005C365.652,334.583 365.41,375.85 349.846,375.85C334.282,375.85 319.35,333.777 319.35,284.199C319.35,234.621 326.967,201.161 342.531,201.161Z", 2, "fill", "rgb(215,174,82)"], ["id", "_Image1", "width", "10px", "height", "27px", 0, "xlink", "href", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAbCAYAAABFuB6DAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABCUlEQVQ4jY3UsUoDQRDG8f8Z0YBpLeyCKLiNRUp9i7HwESx8A63yHJbaCaMvoSGFjSALRrBRC7uAAUlEbXLHZpz1buBgb/jtN8cUV2AqqhwCJ8Bs/kyBo2ULgWNg1/Q6hUnbAF6BwsCwZBoHDgKYeNCrj+p2VGkDY2DFgatpYi+D3oLoNIX7mbFPAE3gqIJRpQD2aiGwCaw3Gb2TQQCPKdzOoAkQU7iVgcMg+tUk8aY81CXeVjCqtICug36AQZrYYXHxZd0H0bGFXl2nL//BSwvXHBSD6IOF7bq0Er6b3jdw4cEX0zsPoqM/MIh+JqkzoO98SrW/s/nI0yD67MHyB9AHroLonYcAfgHlVj4vWXgoKwAAAABJRU5ErkJggg=="], ["fill", "url(#Pattern)", "width", "1080", "height", "1080"], [0, "xml", "space", "preserve", "font-family", "monospace", "x", "100", "dy", "60", 3, "ngStyle", 4, "ngFor", "ngForOf"], ["height", "2160", "width", "2160", "id", "canvas", 3, "hidden"], [1, "form-row", 3, "ngClass"], ["matInput", "", "placeholder", "Flour", "type", "text", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "1000", "type", "number", 3, "ngModel", "ngModelChange", "change"], ["mat-button", "", "color", "warn", 1, "form-row-item", 3, "disabled", "click"], [1, "base-padding", "form-row-item"], ["matInput", "", "placeholder", "Ingredient", "type", "text", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "1", "type", "number", 3, "ngModel", "ngModelChange", "change"], ["matInput", "", "placeholder", "1", "type", "number", "min", "1", 3, "ngModel", "ngModelChange", "change"], ["mat-button", "", "color", "warn", 3, "disabled", "click"], [0, "xml", "space", "preserve", "font-family", "monospace", "x", "100", "dy", "60"], ["id", "overflowAlert", 1, "preview-caption"], [0, "xml", "space", "preserve", "font-family", "monospace", "x", "100", "dy", "60", 3, "ngStyle"]],
                template: function(t, e) {
                    1 & t && (Nr(0, "div", 0), Nr(1, "div", 1), Nr(2, "h1", 2), oo(3, "Bread Baking Percentages Calculator"), Mr(), Lr(4, "mat-divider"), Nr(5, "mat-accordion"), Nr(6, "mat-expansion-panel", 3), $r("opened", function() {
                        return e.panelOpenState = !0
                    })("closed", function() {
                        return e.panelOpenState = !1
                    }), Nr(7, "mat-expansion-panel-header"), Nr(8, "mat-panel-title"), oo(9, " About this tool "), Mr(), Mr(), Nr(10, "p"), oo(11, " Bakers percentages are a common way of expressing the ratio of ingredients to flour for breads and other baked goods. They provide a helpful shorthand for expressing the proportions of a recipe that can be easily adjusted to different batch sizes. "), Mr(), Nr(12, "p"), oo(13, " To calculate the bakers percentage of any ingredient, simply divide the weight of that ingredient (in grams) by the weight of the flour (in grams). "), Mr(), Nr(14, "mat-action-row"), Nr(15, "button", 4), $r("click", function() {
                        return e.panelOpenState = !1
                    }), oo(16, "Close"), Mr(), Mr(), Mr(), Mr(), Lr(17, "mat-divider"), Nr(18, "div", 5), Dr(19, mh, 13, 6, "div", 6), Nr(20, "button", 7), $r("click", function() {
                        return e.addNewFlour()
                    }), oo(21, "Add new flour"), Mr(), Mr(), Lr(22, "mat-divider"), Nr(23, "div", 5), Dr(24, gh, 19, 7, "div", 6), Nr(25, "button", 7), $r("click", function() {
                        return e.addNewIngredient()
                    }), oo(26, "Add new ingredient"), Mr(), Mr(), Lr(27, "mat-divider"), Nr(28, "div", 5), Nr(29, "div", 8), Nr(30, "mat-form-field", 9), Nr(31, "mat-label"), oo(32, "Total Weight"), Mr(), Lr(33, "input", 10), Nr(34, "span", 11), oo(35, "g"), Mr(), Mr(), Nr(36, "span"), oo(37, "\xa0\xf7\xa0"), Mr(), Nr(38, "mat-form-field", 9), Nr(39, "mat-label"), oo(40, "Number of loaves"), Mr(), Nr(41, "input", 12), $r("change", function(t) {
                        return e.onLoafChange(t)
                    })("ngModelChange", function(t) {
                        return e.model.numberOfLoaves = t
                    }), Mr(), Mr(), Nr(42, "span"), oo(43), Mr(), Mr(), Mr(), Nr(44, "mat-action-row", 13), Nr(45, "button", 14), $r("click", function() {
                        return e.adjustRecipe(2)
                    }), oo(46, "Double"), Mr(), Nr(47, "button", 14), $r("click", function() {
                        return e.adjustRecipe(.5)
                    }), oo(48, "Halve"), Mr(), Nr(49, "button", 15), $r("click", function() {
                        return e.reset()
                    }), oo(50, "Reset"), Mr(), Mr(), Lr(51, "app-printer", 16), Nr(52, "button", 17), $r("click", function() {
                        return e.showPreview = !0
                    }), oo(53, "Generate recipe card"), Mr(), Nr(54, "div", 18), Lr(55, "mat-divider"), sn(), Nr(56, "svg", 19), Lr(57, "rect", 20), Nr(58, "text", 21), Dr(59, _h, 2, 1, "tspan", 22), Mr(), Nr(60, "text", 23), oo(61, "breadratiocalculator.com"), Mr(), Mr(), Dr(62, yh, 2, 0, "div", 24), rn(), Nr(63, "div", 25), oo(64, "Note: The above image is just a preview. The downloaded image may look slightly different."), Mr(), Nr(65, "mat-action-row", 13), Nr(66, "button", 17), $r("click", function() {
                        return e.createRecipeCard()
                    }), oo(67, "Download recipe card"), Mr(), Mr(), Mr(), sn(), Nr(68, "svg", 26, 27), Nr(70, "pattern", 28), Nr(71, "g", 29), Lr(72, "path", 30), Mr(), Nr(73, "g", 31), Nr(74, "g", 32), Lr(75, "path", 33), Mr(), Nr(76, "g", 34), Lr(77, "path", 35), Mr(), Nr(78, "g", 36), Lr(79, "path", 37), Mr(), Nr(80, "g", 38), Lr(81, "path", 37), Mr(), Nr(82, "g", 39), Lr(83, "path", 37), Mr(), Nr(84, "g", 40), Lr(85, "path", 37), Mr(), Mr(), Nr(86, "g", 41), Nr(87, "g", 32), Lr(88, "path", 33), Mr(), Nr(89, "g", 34), Lr(90, "path", 35), Mr(), Nr(91, "g", 36), Lr(92, "path", 37), Mr(), Nr(93, "g", 38), Lr(94, "path", 37), Mr(), Nr(95, "g", 39), Lr(96, "path", 37), Mr(), Nr(97, "g", 40), Lr(98, "path", 37), Mr(), Mr(), Nr(99, "g", 42), Nr(100, "g", 43), Lr(101, "path", 44), Mr(), Nr(102, "g", 45), Nr(103, "g", 46), Lr(104, "use", 47), Mr(), Mr(), Nr(105, "g", 48), Lr(106, "path", 49), Mr(), Mr(), Nr(107, "defs"), Lr(108, "image", 50), Mr(), Mr(), Lr(109, "rect", 51), Lr(110, "rect", 20), Nr(111, "text", 21), Dr(112, vh, 2, 4, "tspan", 52), Mr(), Nr(113, "text", 23), oo(114, "breadratiocalculator.com"), Mr(), Mr(), rn(), Lr(115, "canvas", 53), Mr(), Mr()),
                    2 & t && (as(6), Fr("expanded", e.panelOpenState), as(13), Fr("ngForOf", e.model.flours), as(5), Fr("ngForOf", e.model.ingredients), as(9), Fr("value", e.model.totalWeight), as(8), Fr("ngModel", e.model.numberOfLoaves), as(2), lo("\xa0=\xa0", e.gramsPerLoaf, "g\xa0per\xa0loaf"), as(8), Fr("model", e.model)("title", e.title)("showPrinter", e.showPrinter), as(3), Fr("hidden", !e.showPreview), as(5), Fr("ngForOf", e.svgRows), as(3), Fr("ngIf", e.showCharLimitWarning), as(50), Fr("ngForOf", e.svgRows), as(3), Fr("hidden", !0))
                },
                styles: [".container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding-top:2em;padding-bottom:2em}.form[_ngcontent-%COMP%]{width:80%;border-radius:10px;box-shadow:0 8px 32px 0 rgba(31,38,135,.37);padding:1em;background:hsla(0,0%,98%,.9)}.form-row[_ngcontent-%COMP%]{justify-content:space-around}.form-row[_ngcontent-%COMP%], .results-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;padding:.5em}.results-row[_ngcontent-%COMP%]{align-items:center}.command-row[_ngcontent-%COMP%], .results-row[_ngcontent-%COMP%]{justify-content:center}.form-row-alt[_ngcontent-%COMP%]{background-color:#f0f0f0}.base-margin-right[_ngcontent-%COMP%]{margin-right:0}.qtr-padding[_ngcontent-%COMP%]{padding:.25em}.form-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-bottom:1em}.add-item-button[_ngcontent-%COMP%]{align-self:center;max-width:200px;margin-top:1em}.text-center[_ngcontent-%COMP%]{text-align:center}mat-divider[_ngcontent-%COMP%]{margin-bottom:2em}@media only screen and (max-width:810px){.form-row-item[_ngcontent-%COMP%]{flex-basis:100%}}.description[_ngcontent-%COMP%]{margin-bottom:1em;margin-right:2em;margin-left:2em}.png[_ngcontent-%COMP%]{width:500px!important;height:500px!important}#recipeCardSvg[_ngcontent-%COMP%], div[hidden][_ngcontent-%COMP%]{display:none}.preview[_ngcontent-%COMP%]{background-image:url(multi-bread.b5d1c6a474a749e3c381.svg);background-size:75px;max-width:500px}#previewDiv[_ngcontent-%COMP%]{text-align:center;padding-top:1em}#previewDiv[_ngcontent-%COMP%], .preview-caption[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}.preview-caption[_ngcontent-%COMP%]{max-width:500px;margin-bottom:.5em;font-style:italic}#overflowAlert[_ngcontent-%COMP%]{color:#ff4500}tspan[_ngcontent-%COMP%]:first-child{font-weight:700}"]
            }), t
        })();
        class Ch {}
        const xh = "*";
        function Eh(t, e) {
            return {
                type: 7,
                name: t,
                definitions: e,
                options: {}
            }
        }
        function Sh(t, e=null) {
            return {
                type: 4,
                styles: e,
                timings: t
            }
        }
        function kh(t, e=null) {
            return {
                type: 2,
                steps: t,
                options: e
            }
        }
        function Ah(t) {
            return {
                type: 6,
                styles: t,
                offset: null
            }
        }
        function Th(t, e, n) {
            return {
                type: 0,
                name: t,
                styles: e,
                options: n
            }
        }
        function Oh(t, e, n=null) {
            return {
                type: 1,
                expr: t,
                animation: e,
                options: n
            }
        }
        function Ih(t) {
            Promise.resolve(null).then(t)
        }
        class Ph {
            constructor(t=0, e=0)
            {
                this._onDoneFns = [],
                this._onStartFns = [],
                this._onDestroyFns = [],
                this._started = !1,
                this._destroyed = !1,
                this._finished = !1,
                this._position = 0,
                this.parentPlayer = null,
                this.totalTime = t + e
            }
            _onFinish()
            {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }
            onStart(t)
            {
                this._onStartFns.push(t)
            }
            onDone(t)
            {
                this._onDoneFns.push(t)
            }
            onDestroy(t)
            {
                this._onDestroyFns.push(t)
            }
            hasStarted()
            {
                return this._started
            }
            init() {}
            play()
            {
                this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                this._started = !0
            }
            triggerMicrotask()
            {
                Ih(() => this._onFinish())
            }
            _onStart()
            {
                this._onStartFns.forEach(t => t()),
                this._onStartFns = []
            }
            pause() {}
            restart() {}
            finish()
            {
                this._onFinish()
            }
            destroy()
            {
                this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }
            reset() {}
            setPosition(t)
            {
                this._position = this.totalTime ? t * this.totalTime : 1
            }
            getPosition()
            {
                return this.totalTime ? this._position / this.totalTime : 1
            }
            triggerCallback(t)
            {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()),
                e.length = 0
            }
        }
        class Dh {
            constructor(t)
            {
                this._onDoneFns = [],
                this._onStartFns = [],
                this._finished = !1,
                this._started = !1,
                this._destroyed = !1,
                this._onDestroyFns = [],
                this.parentPlayer = null,
                this.totalTime = 0,
                this.players = t;
                let e = 0,
                    n = 0,
                    i = 0;
                const s = this.players.length;
                0 == s ? Ih(() => this._onFinish()) : this.players.forEach(t => {
                    t.onDone(() => {
                        ++e == s && this._onFinish()
                    }),
                    t.onDestroy(() => {
                        ++n == s && this._onDestroy()
                    }),
                    t.onStart(() => {
                        ++i == s && this._onStart()
                    })
                }),
                this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
            }
            _onFinish()
            {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }
            init()
            {
                this.players.forEach(t => t.init())
            }
            onStart(t)
            {
                this._onStartFns.push(t)
            }
            _onStart()
            {
                this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
            }
            onDone(t)
            {
                this._onDoneFns.push(t)
            }
            onDestroy(t)
            {
                this._onDestroyFns.push(t)
            }
            hasStarted()
            {
                return this._started
            }
            play()
            {
                this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach(t => t.play())
            }
            pause()
            {
                this.players.forEach(t => t.pause())
            }
            restart()
            {
                this.players.forEach(t => t.restart())
            }
            finish()
            {
                this._onFinish(),
                this.players.forEach(t => t.finish())
            }
            destroy()
            {
                this._onDestroy()
            }
            _onDestroy()
            {
                this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }
            reset()
            {
                this.players.forEach(t => t.reset()),
                this._destroyed = !1,
                this._finished = !1,
                this._started = !1
            }
            setPosition(t)
            {
                const e = t * this.totalTime;
                this.players.forEach(t => {
                    const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
                    t.setPosition(n)
                })
            }
            getPosition()
            {
                const t = this.players.reduce((t, e) => null === t || e.totalTime > t.totalTime ? e : t, null);
                return null != t ? t.getPosition() : 0
            }
            beforeDestroy()
            {
                this.players.forEach(t => {
                    t.beforeDestroy && t.beforeDestroy()
                })
            }
            triggerCallback(t)
            {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()),
                e.length = 0
            }
        }
        function Rh() {
            return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
        }
        function Fh(t) {
            switch (t.length) {
            case 0:
                return new Ph;
            case 1:
                return t[0];
            default:
                return new Dh(t)
            }
        }
        function Vh(t, e, n, i, s={}, r={}) {
            const o = [],
                a = [];
            let l = -1,
                c = null;
            if (i.forEach(t => {
                const n = t.offset,
                    i = n == l,
                    h = i && c || {};
                Object.keys(t).forEach(n => {
                    let i = n,
                        a = t[n];
                    if ("offset" !== n)
                        switch (i = e.normalizePropertyName(i, o), a) {
                        case "!":
                            a = s[n];
                            break;
                        case xh:
                            a = r[n];
                            break;
                        default:
                            a = e.normalizeStyleValue(n, i, a, o)
                        }
                    h[i] = a
                }),
                i || a.push(h),
                c = h,
                l = n
            }), o.length) {
                const t = "\n - ";
                throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`)
            }
            return a
        }
        function Nh(t, e, n, i) {
            switch (e) {
            case "start":
                t.onStart(() => i(n && Mh(n, "start", t)));
                break;
            case "done":
                t.onDone(() => i(n && Mh(n, "done", t)));
                break;
            case "destroy":
                t.onDestroy(() => i(n && Mh(n, "destroy", t)))
            }
        }
        function Mh(t, e, n) {
            const i = n.totalTime,
                s = Lh(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == i ? t.totalTime : i, !!n.disabled),
                r = t._data;
            return null != r && (s._data = r), s
        }
        function Lh(t, e, n, i, s="", r=0, o) {
            return {
                element: t,
                triggerName: e,
                fromState: n,
                toState: i,
                phaseName: s,
                totalTime: r,
                disabled: !!o
            }
        }
        function jh(t, e, n) {
            let i;
            return t instanceof Map ? (i = t.get(e), i || t.set(e, i = n)) : (i = t[e], i || (i = t[e] = n)), i
        }
        function Bh(t) {
            const e = t.indexOf(":");
            return [t.substring(1, e), t.substr(e + 1)]
        }
        let Hh = (t, e) => !1,
            zh = (t, e) => !1,
            $h = (t, e, n) => [];
        const qh = Rh();
        (qh || "undefined" != typeof Element) && (Hh = (t, e) => t.contains(e), zh = (() => {
            if (qh || Element.prototype.matches)
                return (t, e) => t.matches(e);
            {
                const t = Element.prototype,
                    e = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                return e ? (t, n) => e.apply(t, [n]) : zh
            }
        })(), $h = (t, e, n) => {
            let i = [];
            if (n) {
                const n = t.querySelectorAll(e);
                for (let t = 0; t < n.length; t++)
                    i.push(n[t])
            } else {
                const n = t.querySelector(e);
                n && i.push(n)
            }
            return i
        });
        let Wh = null,
            Uh = !1;
        function Zh(t) {
            Wh || (Wh = ("undefined" != typeof document ? document.body : null) || {}, Uh = !!Wh.style && "WebkitAppearance" in Wh.style);
            let e = !0;
            return Wh.style && !function(t) {
                return "ebkit" == t.substring(1, 6)
            }(t) && (e = t in Wh.style, !e && Uh) && (e = "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in Wh.style), e
        }
        const Qh = zh,
            Kh = Hh,
            Gh = $h;
        function Yh(t) {
            const e = {};
            return Object.keys(t).forEach(n => {
                const i = n.replace(/([a-z])([A-Z])/g, "$1-$2");
                e[i] = t[n]
            }), e
        }
        let Xh = (() => {
                class t {
                    validateStyleProperty(t)
                    {
                        return Zh(t)
                    }
                    matchesElement(t, e)
                    {
                        return Qh(t, e)
                    }
                    containsElement(t, e)
                    {
                        return Kh(t, e)
                    }
                    query(t, e, n)
                    {
                        return Gh(t, e, n)
                    }
                    computeStyle(t, e, n)
                    {
                        return n || ""
                    }
                    animate(t, e, n, i, s, r=[], o)
                    {
                        return new Ph(n, i)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            Jh = (() => {
                class t {}
                return t.NOOP = new Xh, t
            })();
        const tu = "ng-enter",
            eu = "ng-leave",
            nu = "ng-trigger",
            iu = ".ng-trigger",
            su = "ng-animating",
            ru = ".ng-animating";
        function ou(t) {
            if ("number" == typeof t)
                return t;
            const e = t.match(/^(-?[\.\d]+)(m?s)/);
            return !e || e.length < 2 ? 0 : au(parseFloat(e[1]), e[2])
        }
        function au(t, e) {
            switch (e) {
            case "s":
                return 1e3 * t;
            default:
                return t
            }
        }
        function lu(t, e, n) {
            return t.hasOwnProperty("duration") ? t : function(t, e, n) {
                let i,
                    s = 0,
                    r = "";
                if ("string" == typeof t) {
                    const n = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === n)
                        return e.push(`The provided timing value "${t}" is invalid.`), {
                            duration: 0,
                            delay: 0,
                            easing: ""
                        };
                    i = au(parseFloat(n[1]), n[2]);
                    const o = n[3];
                    null != o && (s = au(parseFloat(o), n[4]));
                    const a = n[5];
                    a && (r = a)
                } else
                    i = t;
                if (!n) {
                    let n = !1,
                        r = e.length;
                    i < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), n = !0),
                    s < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), n = !0),
                    n && e.splice(r, 0, `The provided timing value "${t}" is invalid.`)
                }
                return {
                    duration: i,
                    delay: s,
                    easing: r
                }
            }(t, e, n)
        }
        function cu(t, e={}) {
            return Object.keys(t).forEach(n => {
                e[n] = t[n]
            }), e
        }
        function hu(t, e, n={}) {
            if (e)
                for (let i in t)
                    n[i] = t[i];
            else
                cu(t, n);
            return n
        }
        function uu(t, e, n) {
            return n ? e + ":" + n + ";" : ""
        }
        function du(t) {
            let e = "";
            for (let n = 0; n < t.style.length; n++) {
                const i = t.style.item(n);
                e += uu(0, i, t.style.getPropertyValue(i))
            }
            for (const n in t.style)
                t.style.hasOwnProperty(n) && !n.startsWith("_") && (e += uu(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t.style[n]));
            t.setAttribute("style", e)
        }
        function pu(t, e, n) {
            t.style && (Object.keys(e).forEach(i => {
                const s = wu(i);
                n && !n.hasOwnProperty(i) && (n[i] = t.style[s]),
                t.style[s] = e[i]
            }), Rh() && du(t))
        }
        function fu(t, e) {
            t.style && (Object.keys(e).forEach(e => {
                const n = wu(e);
                t.style[n] = ""
            }), Rh() && du(t))
        }
        function mu(t) {
            return Array.isArray(t) ? 1 == t.length ? t[0] : kh(t) : t
        }
        const gu = new RegExp("{{\\s*(.+?)\\s*}}", "g");
        function _u(t) {
            let e = [];
            if ("string" == typeof t) {
                let n;
                for (; n = gu.exec(t);)
                    e.push(n[1]);
                gu.lastIndex = 0
            }
            return e
        }
        function yu(t, e, n) {
            const i = t.toString(),
                s = i.replace(gu, (t, i) => {
                    let s = e[i];
                    return e.hasOwnProperty(i) || (n.push(`Please provide a value for the animation param ${i}`), s = ""), s.toString()
                });
            return s == i ? t : s
        }
        function bu(t) {
            const e = [];
            let n = t.next();
            for (; !n.done;)
                e.push(n.value),
                n = t.next();
            return e
        }
        const vu = /-+([a-z0-9])/g;
        function wu(t) {
            return t.replace(vu, (...t) => t[1].toUpperCase())
        }
        function Cu(t, e) {
            return 0 === t || 0 === e
        }
        function xu(t, e, n) {
            const i = Object.keys(n);
            if (i.length && e.length) {
                let r = e[0],
                    o = [];
                if (i.forEach(t => {
                    r.hasOwnProperty(t) || o.push(t),
                    r[t] = n[t]
                }), o.length)
                    for (var s = 1; s < e.length; s++) {
                        let n = e[s];
                        o.forEach(function(e) {
                            n[e] = Su(t, e)
                        })
                    }
            }
            return e
        }
        function Eu(t, e, n) {
            switch (e.type) {
            case 7:
                return t.visitTrigger(e, n);
            case 0:
                return t.visitState(e, n);
            case 1:
                return t.visitTransition(e, n);
            case 2:
                return t.visitSequence(e, n);
            case 3:
                return t.visitGroup(e, n);
            case 4:
                return t.visitAnimate(e, n);
            case 5:
                return t.visitKeyframes(e, n);
            case 6:
                return t.visitStyle(e, n);
            case 8:
                return t.visitReference(e, n);
            case 9:
                return t.visitAnimateChild(e, n);
            case 10:
                return t.visitAnimateRef(e, n);
            case 11:
                return t.visitQuery(e, n);
            case 12:
                return t.visitStagger(e, n);
            default:
                throw new Error(`Unable to resolve animation metadata node #${e.type}`)
            }
        }
        function Su(t, e) {
            return window.getComputedStyle(t)[e]
        }
        const ku = "*";
        function Au(t, e) {
            const n = [];
            return "string" == typeof t ? t.split(/\s*,\s*/).forEach(t => function(t, e, n) {
                if (":" == t[0]) {
                    const i = function(t, e) {
                        switch (t) {
                        case ":enter":
                            return "void => *";
                        case ":leave":
                            return "* => void";
                        case ":increment":
                            return (t, e) => parseFloat(e) > parseFloat(t);
                        case ":decrement":
                            return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                            return e.push(`The transition alias value "${t}" is not supported`), "* => *"
                        }
                    }(t, n);
                    if ("function" == typeof i)
                        return void e.push(i);
                    t = i
                }
                const i = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                if (null == i || i.length < 4)
                    return n.push(`The provided transition expression "${t}" is not supported`), e;
                const s = i[1],
                    r = i[2],
                    o = i[3];
                e.push(Iu(s, o)),
                "<" != r[0] || s == ku && o == ku || e.push(Iu(o, s))
            }(t, n, e)) : n.push(t), n
        }
        const Tu = new Set(["true", "1"]),
            Ou = new Set(["false", "0"]);
        function Iu(t, e) {
            const n = Tu.has(t) || Ou.has(t),
                i = Tu.has(e) || Ou.has(e);
            return (s, r) => {
                let o = t == ku || t == s,
                    a = e == ku || e == r;
                return !o && n && "boolean" == typeof s && (o = s ? Tu.has(t) : Ou.has(t)), !a && i && "boolean" == typeof r && (a = r ? Tu.has(e) : Ou.has(e)), o && a
            }
        }
        const Pu = new RegExp("s*:selfs*,?", "g");
        function Du(t, e, n) {
            return new Ru(t).build(e, n)
        }
        class Ru {
            constructor(t)
            {
                this._driver = t
            }
            build(t, e)
            {
                const n = new Fu(e);
                return this._resetContextStyleTimingState(n), Eu(this, mu(t), n)
            }
            _resetContextStyleTimingState(t)
            {
                t.currentQuerySelector = "",
                t.collectedStyles = {},
                t.collectedStyles[""] = {},
                t.currentTime = 0
            }
            visitTrigger(t, e)
            {
                let n = e.queryCount = 0,
                    i = e.depCount = 0;
                const s = [],
                    r = [];
                return "@" == t.name.charAt(0) && e.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), t.definitions.forEach(t => {
                    if (this._resetContextStyleTimingState(e), 0 == t.type) {
                        const n = t,
                            i = n.name;
                        i.toString().split(/\s*,\s*/).forEach(t => {
                            n.name = t,
                            s.push(this.visitState(n, e))
                        }),
                        n.name = i
                    } else if (1 == t.type) {
                        const s = this.visitTransition(t, e);
                        n += s.queryCount,
                        i += s.depCount,
                        r.push(s)
                    } else
                        e.errors.push("only state() and transition() definitions can sit inside of a trigger()")
                }), {
                    type: 7,
                    name: t.name,
                    states: s,
                    transitions: r,
                    queryCount: n,
                    depCount: i,
                    options: null
                }
            }
            visitState(t, e)
            {
                const n = this.visitStyle(t.styles, e),
                    i = t.options && t.options.params || null;
                if (n.containsDynamicStyles) {
                    const s = new Set,
                        r = i || {};
                    if (n.styles.forEach(t => {
                        if (Vu(t)) {
                            const e = t;
                            Object.keys(e).forEach(t => {
                                _u(e[t]).forEach(t => {
                                    r.hasOwnProperty(t) || s.add(t)
                                })
                            })
                        }
                    }), s.size) {
                        const n = bu(s.values());
                        e.errors.push(`state("${t.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
                    }
                }
                return {
                    type: 0,
                    name: t.name,
                    style: n,
                    options: i ? {
                        params: i
                    } : null
                }
            }
            visitTransition(t, e)
            {
                e.queryCount = 0,
                e.depCount = 0;
                const n = Eu(this, mu(t.animation), e);
                return {
                    type: 1,
                    matchers: Au(t.expr, e.errors),
                    animation: n,
                    queryCount: e.queryCount,
                    depCount: e.depCount,
                    options: Nu(t.options)
                }
            }
            visitSequence(t, e)
            {
                return {
                    type: 2,
                    steps: t.steps.map(t => Eu(this, t, e)),
                    options: Nu(t.options)
                }
            }
            visitGroup(t, e)
            {
                const n = e.currentTime;
                let i = 0;
                const s = t.steps.map(t => {
                    e.currentTime = n;
                    const s = Eu(this, t, e);
                    return i = Math.max(i, e.currentTime), s
                });
                return e.currentTime = i, {
                    type: 3,
                    steps: s,
                    options: Nu(t.options)
                }
            }
            visitAnimate(t, e)
            {
                const n = function(t, e) {
                    let n = null;
                    if (t.hasOwnProperty("duration"))
                        n = t;
                    else if ("number" == typeof t)
                        return Mu(lu(t, e).duration, 0, "");
                    const i = t;
                    if (i.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))) {
                        const t = Mu(0, 0, "");
                        return t.dynamic = !0, t.strValue = i, t
                    }
                    return n = n || lu(i, e), Mu(n.duration, n.delay, n.easing)
                }(t.timings, e.errors);
                let i;
                e.currentAnimateTimings = n;
                let s = t.styles ? t.styles : Ah({});
                if (5 == s.type)
                    i = this.visitKeyframes(s, e);
                else {
                    let s = t.styles,
                        r = !1;
                    if (!s) {
                        r = !0;
                        const t = {};
                        n.easing && (t.easing = n.easing),
                        s = Ah(t)
                    }
                    e.currentTime += n.duration + n.delay;
                    const o = this.visitStyle(s, e);
                    o.isEmptyStep = r,
                    i = o
                }
                return e.currentAnimateTimings = null, {
                    type: 4,
                    timings: n,
                    style: i,
                    options: null
                }
            }
            visitStyle(t, e)
            {
                const n = this._makeStyleAst(t, e);
                return this._validateStyleAst(n, e), n
            }
            _makeStyleAst(t, e)
            {
                const n = [];
                Array.isArray(t.styles) ? t.styles.forEach(t => {
                    "string" == typeof t ? t == xh ? n.push(t) : e.errors.push(`The provided style string value ${t} is not allowed.`) : n.push(t)
                }) : n.push(t.styles);
                let i = !1,
                    s = null;
                return n.forEach(t => {
                    if (Vu(t)) {
                        const e = t,
                            n = e.easing;
                        if (n && (s = n, delete e.easing), !i)
                            for (let t in e)
                                if (e[t].toString().indexOf("{{") >= 0) {
                                    i = !0;
                                    break
                                }
                    }
                }), {
                    type: 6,
                    styles: n,
                    easing: s,
                    offset: t.offset,
                    containsDynamicStyles: i,
                    options: null
                }
            }
            _validateStyleAst(t, e)
            {
                const n = e.currentAnimateTimings;
                let i = e.currentTime,
                    s = e.currentTime;
                n && s > 0 && (s -= n.duration + n.delay),
                t.styles.forEach(t => {
                    "string" != typeof t && Object.keys(t).forEach(n => {
                        if (!this._driver.validateStyleProperty(n))
                            return void e.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
                        const r = e.collectedStyles[e.currentQuerySelector],
                            o = r[n];
                        let a = !0;
                        o && (s != i && s >= o.startTime && i <= o.endTime && (e.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${i}ms"`), a = !1), s = o.startTime),
                        a && (r[n] = {
                            startTime: s,
                            endTime: i
                        }),
                        e.options && function(t, e, n) {
                            const i = e.params || {},
                                s = _u(t);
                            s.length && s.forEach(t => {
                                i.hasOwnProperty(t) || n.push(`Unable to resolve the local animation param ${t} in the given list of values`)
                            })
                        }(t[n], e.options, e.errors)
                    })
                })
            }
            visitKeyframes(t, e)
            {
                const n = {
                    type: 5,
                    styles: [],
                    options: null
                };
                if (!e.currentAnimateTimings)
                    return e.errors.push("keyframes() must be placed inside of a call to animate()"), n;
                let i = 0;
                const s = [];
                let r = !1,
                    o = !1,
                    a = 0;
                const l = t.steps.map(t => {
                    const n = this._makeStyleAst(t, e);
                    let l = null != n.offset ? n.offset : function(t) {
                            if ("string" == typeof t)
                                return null;
                            let e = null;
                            if (Array.isArray(t))
                                t.forEach(t => {
                                    if (Vu(t) && t.hasOwnProperty("offset")) {
                                        const n = t;
                                        e = parseFloat(n.offset),
                                        delete n.offset
                                    }
                                });
                            else if (Vu(t) && t.hasOwnProperty("offset")) {
                                const n = t;
                                e = parseFloat(n.offset),
                                delete n.offset
                            }
                            return e
                        }(n.styles),
                        c = 0;
                    return null != l && (i++, c = n.offset = l), o = o || c < 0 || c > 1, r = r || c < a, a = c, s.push(c), n
                });
                o && e.errors.push("Please ensure that all keyframe offsets are between 0 and 1"),
                r && e.errors.push("Please ensure that all keyframe offsets are in order");
                const c = t.steps.length;
                let h = 0;
                i > 0 && i < c ? e.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == i && (h = 1 / (c - 1));
                const u = c - 1,
                    d = e.currentTime,
                    p = e.currentAnimateTimings,
                    f = p.duration;
                return l.forEach((t, i) => {
                    const r = h > 0 ? i == u ? 1 : h * i : s[i],
                        o = r * f;
                    e.currentTime = d + p.delay + o,
                    p.duration = o,
                    this._validateStyleAst(t, e),
                    t.offset = r,
                    n.styles.push(t)
                }), n
            }
            visitReference(t, e)
            {
                return {
                    type: 8,
                    animation: Eu(this, mu(t.animation), e),
                    options: Nu(t.options)
                }
            }
            visitAnimateChild(t, e)
            {
                return e.depCount++, {
                    type: 9,
                    options: Nu(t.options)
                }
            }
            visitAnimateRef(t, e)
            {
                return {
                    type: 10,
                    animation: this.visitReference(t.animation, e),
                    options: Nu(t.options)
                }
            }
            visitQuery(t, e)
            {
                const n = e.currentQuerySelector,
                    i = t.options || {};
                e.queryCount++,
                e.currentQuery = t;
                const [s, r] = function(t) {
                    const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
                    return e && (t = t.replace(Pu, "")), [t = t.replace(/@\*/g, iu).replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1)).replace(/:animating/g, ru), e]
                }(t.selector);
                e.currentQuerySelector = n.length ? n + " " + s : s,
                jh(e.collectedStyles, e.currentQuerySelector, {});
                const o = Eu(this, mu(t.animation), e);
                return e.currentQuery = null, e.currentQuerySelector = n, {
                    type: 11,
                    selector: s,
                    limit: i.limit || 0,
                    optional: !!i.optional,
                    includeSelf: r,
                    animation: o,
                    originalSelector: t.selector,
                    options: Nu(t.options)
                }
            }
            visitStagger(t, e)
            {
                e.currentQuery || e.errors.push("stagger() can only be used inside of query()");
                const n = "full" === t.timings ? {
                    duration: 0,
                    delay: 0,
                    easing: "full"
                } : lu(t.timings, e.errors, !0);
                return {
                    type: 12,
                    animation: Eu(this, mu(t.animation), e),
                    timings: n,
                    options: null
                }
            }
        }
        class Fu {
            constructor(t)
            {
                this.errors = t,
                this.queryCount = 0,
                this.depCount = 0,
                this.currentTransition = null,
                this.currentQuery = null,
                this.currentQuerySelector = null,
                this.currentAnimateTimings = null,
                this.currentTime = 0,
                this.collectedStyles = {},
                this.options = null
            }
        }
        function Vu(t) {
            return !Array.isArray(t) && "object" == typeof t
        }
        function Nu(t) {
            var e;
            return t ? (t = cu(t)).params && (t.params = (e = t.params) ? cu(e) : null) : t = {}, t
        }
        function Mu(t, e, n) {
            return {
                duration: t,
                delay: e,
                easing: n
            }
        }
        function Lu(t, e, n, i, s, r, o=null, a=!1) {
            return {
                type: 1,
                element: t,
                keyframes: e,
                preStyleProps: n,
                postStyleProps: i,
                duration: s,
                delay: r,
                totalTime: s + r,
                easing: o,
                subTimeline: a
            }
        }
        class ju {
            constructor()
            {
                this._map = new Map
            }
            consume(t)
            {
                let e = this._map.get(t);
                return e ? this._map.delete(t) : e = [], e
            }
            append(t, e)
            {
                let n = this._map.get(t);
                n || this._map.set(t, n = []),
                n.push(...e)
            }
            has(t)
            {
                return this._map.has(t)
            }
            clear()
            {
                this._map.clear()
            }
        }
        const Bu = new RegExp(":enter", "g"),
            Hu = new RegExp(":leave", "g");
        function zu(t, e, n, i, s, r={}, o={}, a, l, c=[]) {
            return (new $u).buildKeyframes(t, e, n, i, s, r, o, a, l, c)
        }
        class $u {
            buildKeyframes(t, e, n, i, s, r, o, a, l, c=[])
            {
                l = l || new ju;
                const h = new Wu(t, e, l, i, s, c, []);
                h.options = a,
                h.currentTimeline.setStyles([r], null, h.errors, a),
                Eu(this, n, h);
                const u = h.timelines.filter(t => t.containsAnimation());
                if (u.length && Object.keys(o).length) {
                    const t = u[u.length - 1];
                    t.allowOnlyTimelineStyles() || t.setStyles([o], null, h.errors, a)
                }
                return u.length ? u.map(t => t.buildKeyframes()) : [Lu(e, [], [], [], 0, 0, "", !1)]
            }
            visitTrigger(t, e) {}
            visitState(t, e) {}
            visitTransition(t, e) {}
            visitAnimateChild(t, e)
            {
                const n = e.subInstructions.consume(e.element);
                if (n) {
                    const i = e.createSubContext(t.options),
                        s = e.currentTimeline.currentTime,
                        r = this._visitSubInstructions(n, i, i.options);
                    s != r && e.transformIntoNewTimeline(r)
                }
                e.previousNode = t
            }
            visitAnimateRef(t, e)
            {
                const n = e.createSubContext(t.options);
                n.transformIntoNewTimeline(),
                this.visitReference(t.animation, n),
                e.transformIntoNewTimeline(n.currentTimeline.currentTime),
                e.previousNode = t
            }
            _visitSubInstructions(t, e, n)
            {
                let i = e.currentTimeline.currentTime;
                const s = null != n.duration ? ou(n.duration) : null,
                    r = null != n.delay ? ou(n.delay) : null;
                return 0 !== s && t.forEach(t => {
                    const n = e.appendInstructionToTimeline(t, s, r);
                    i = Math.max(i, n.duration + n.delay)
                }), i
            }
            visitReference(t, e)
            {
                e.updateOptions(t.options, !0),
                Eu(this, t.animation, e),
                e.previousNode = t
            }
            visitSequence(t, e)
            {
                const n = e.subContextCount;
                let i = e;
                const s = t.options;
                if (s && (s.params || s.delay) && (i = e.createSubContext(s), i.transformIntoNewTimeline(), null != s.delay)) {
                    6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), i.previousNode = qu);
                    const t = ou(s.delay);
                    i.delayNextStep(t)
                }
                t.steps.length && (t.steps.forEach(t => Eu(this, t, i)), i.currentTimeline.applyStylesToKeyframe(), i.subContextCount > n && i.transformIntoNewTimeline()),
                e.previousNode = t
            }
            visitGroup(t, e)
            {
                const n = [];
                let i = e.currentTimeline.currentTime;
                const s = t.options && t.options.delay ? ou(t.options.delay) : 0;
                t.steps.forEach(r => {
                    const o = e.createSubContext(t.options);
                    s && o.delayNextStep(s),
                    Eu(this, r, o),
                    i = Math.max(i, o.currentTimeline.currentTime),
                    n.push(o.currentTimeline)
                }),
                n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)),
                e.transformIntoNewTimeline(i),
                e.previousNode = t
            }
            _visitTiming(t, e)
            {
                if (t.dynamic) {
                    const n = t.strValue;
                    return lu(e.params ? yu(n, e.params, e.errors) : n, e.errors)
                }
                return {
                    duration: t.duration,
                    delay: t.delay,
                    easing: t.easing
                }
            }
            visitAnimate(t, e)
            {
                const n = e.currentAnimateTimings = this._visitTiming(t.timings, e),
                    i = e.currentTimeline;
                n.delay && (e.incrementTime(n.delay), i.snapshotCurrentStyles());
                const s = t.style;
                5 == s.type ? this.visitKeyframes(s, e) : (e.incrementTime(n.duration), this.visitStyle(s, e), i.applyStylesToKeyframe()),
                e.currentAnimateTimings = null,
                e.previousNode = t
            }
            visitStyle(t, e)
            {
                const n = e.currentTimeline,
                    i = e.currentAnimateTimings;
                !i && n.getCurrentStyleProperties().length && n.forwardFrame();
                const s = i && i.easing || t.easing;
                t.isEmptyStep ? n.applyEmptyStep(s) : n.setStyles(t.styles, s, e.errors, e.options),
                e.previousNode = t
            }
            visitKeyframes(t, e)
            {
                const n = e.currentAnimateTimings,
                    i = e.currentTimeline.duration,
                    s = n.duration,
                    r = e.createSubContext().currentTimeline;
                r.easing = n.easing,
                t.styles.forEach(t => {
                    r.forwardTime((t.offset || 0) * s),
                    r.setStyles(t.styles, t.easing, e.errors, e.options),
                    r.applyStylesToKeyframe()
                }),
                e.currentTimeline.mergeTimelineCollectedStyles(r),
                e.transformIntoNewTimeline(i + s),
                e.previousNode = t
            }
            visitQuery(t, e)
            {
                const n = e.currentTimeline.currentTime,
                    i = t.options || {},
                    s = i.delay ? ou(i.delay) : 0;
                s && (6 === e.previousNode.type || 0 == n && e.currentTimeline.getCurrentStyleProperties().length) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = qu);
                let r = n;
                const o = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!i.optional, e.errors);
                e.currentQueryTotal = o.length;
                let a = null;
                o.forEach((n, i) => {
                    e.currentQueryIndex = i;
                    const o = e.createSubContext(t.options, n);
                    s && o.delayNextStep(s),
                    n === e.element && (a = o.currentTimeline),
                    Eu(this, t.animation, o),
                    o.currentTimeline.applyStylesToKeyframe(),
                    r = Math.max(r, o.currentTimeline.currentTime)
                }),
                e.currentQueryIndex = 0,
                e.currentQueryTotal = 0,
                e.transformIntoNewTimeline(r),
                a && (e.currentTimeline.mergeTimelineCollectedStyles(a), e.currentTimeline.snapshotCurrentStyles()),
                e.previousNode = t
            }
            visitStagger(t, e)
            {
                const n = e.parentContext,
                    i = e.currentTimeline,
                    s = t.timings,
                    r = Math.abs(s.duration),
                    o = r * (e.currentQueryTotal - 1);
                let a = r * e.currentQueryIndex;
                switch (s.duration < 0 ? "reverse" : s.easing) {
                case "reverse":
                    a = o - a;
                    break;
                case "full":
                    a = n.currentStaggerTime
                }
                const l = e.currentTimeline;
                a && l.delayNextStep(a);
                const c = l.currentTime;
                Eu(this, t.animation, e),
                e.previousNode = t,
                n.currentStaggerTime = i.currentTime - c + (i.startTime - n.currentTimeline.startTime)
            }
        }
        const qu = {};
        class Wu {
            constructor(t, e, n, i, s, r, o, a)
            {
                this._driver = t,
                this.element = e,
                this.subInstructions = n,
                this._enterClassName = i,
                this._leaveClassName = s,
                this.errors = r,
                this.timelines = o,
                this.parentContext = null,
                this.currentAnimateTimings = null,
                this.previousNode = qu,
                this.subContextCount = 0,
                this.options = {},
                this.currentQueryIndex = 0,
                this.currentQueryTotal = 0,
                this.currentStaggerTime = 0,
                this.currentTimeline = a || new Uu(this._driver, e, 0),
                o.push(this.currentTimeline)
            }
            get params()
            {
                return this.options.params
            }
            updateOptions(t, e)
            {
                if (!t)
                    return;
                const n = t;
                let i = this.options;
                null != n.duration && (i.duration = ou(n.duration)),
                null != n.delay && (i.delay = ou(n.delay));
                const s = n.params;
                if (s) {
                    let t = i.params;
                    t || (t = this.options.params = {}),
                    Object.keys(s).forEach(n => {
                        e && t.hasOwnProperty(n) || (t[n] = yu(s[n], t, this.errors))
                    })
                }
            }
            _copyOptions()
            {
                const t = {};
                if (this.options) {
                    const e = this.options.params;
                    if (e) {
                        const n = t.params = {};
                        Object.keys(e).forEach(t => {
                            n[t] = e[t]
                        })
                    }
                }
                return t
            }
            createSubContext(t=null, e, n)
            {
                const i = e || this.element,
                    s = new Wu(this._driver, i, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(i, n || 0));
                return s.previousNode = this.previousNode, s.currentAnimateTimings = this.currentAnimateTimings, s.options = this._copyOptions(), s.updateOptions(t), s.currentQueryIndex = this.currentQueryIndex, s.currentQueryTotal = this.currentQueryTotal, s.parentContext = this, this.subContextCount++, s
            }
            transformIntoNewTimeline(t)
            {
                return this.previousNode = qu, this.currentTimeline = this.currentTimeline.fork(this.element, t), this.timelines.push(this.currentTimeline), this.currentTimeline
            }
            appendInstructionToTimeline(t, e, n)
            {
                const i = {
                        duration: null != e ? e : t.duration,
                        delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
                        easing: ""
                    },
                    s = new Zu(this._driver, t.element, t.keyframes, t.preStyleProps, t.postStyleProps, i, t.stretchStartingKeyframe);
                return this.timelines.push(s), i
            }
            incrementTime(t)
            {
                this.currentTimeline.forwardTime(this.currentTimeline.duration + t)
            }
            delayNextStep(t)
            {
                t > 0 && this.currentTimeline.delayNextStep(t)
            }
            invokeQuery(t, e, n, i, s, r)
            {
                let o = [];
                if (i && o.push(this.element), t.length > 0) {
                    t = (t = t.replace(Bu, "." + this._enterClassName)).replace(Hu, "." + this._leaveClassName);
                    let e = this._driver.query(this.element, t, 1 != n);
                    0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
                    o.push(...e)
                }
                return s || 0 != o.length || r.push(`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`), o
            }
        }
        class Uu {
            constructor(t, e, n, i)
            {
                this._driver = t,
                this.element = e,
                this.startTime = n,
                this._elementTimelineStylesLookup = i,
                this.duration = 0,
                this._previousKeyframe = {},
                this._currentKeyframe = {},
                this._keyframes = new Map,
                this._styleSummary = {},
                this._pendingStyles = {},
                this._backFill = {},
                this._currentEmptyStepKeyframe = null,
                this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map),
                this._localTimelineStyles = Object.create(this._backFill, {}),
                this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e),
                this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)),
                this._loadKeyframe()
            }
            containsAnimation()
            {
                switch (this._keyframes.size) {
                case 0:
                    return !1;
                case 1:
                    return this.getCurrentStyleProperties().length > 0;
                default:
                    return !0
                }
            }
            getCurrentStyleProperties()
            {
                return Object.keys(this._currentKeyframe)
            }
            get currentTime()
            {
                return this.startTime + this.duration
            }
            delayNextStep(t)
            {
                const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                this.duration || e ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles()) : this.startTime += t
            }
            fork(t, e)
            {
                return this.applyStylesToKeyframe(), new Uu(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
            }
            _loadKeyframe()
            {
                this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
                this._currentKeyframe = this._keyframes.get(this.duration),
                this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
            }
            forwardFrame()
            {
                this.duration += 1,
                this._loadKeyframe()
            }
            forwardTime(t)
            {
                this.applyStylesToKeyframe(),
                this.duration = t,
                this._loadKeyframe()
            }
            _updateStyle(t, e)
            {
                this._localTimelineStyles[t] = e,
                this._globalTimelineStyles[t] = e,
                this._styleSummary[t] = {
                    time: this.currentTime,
                    value: e
                }
            }
            allowOnlyTimelineStyles()
            {
                return this._currentEmptyStepKeyframe !== this._currentKeyframe
            }
            applyEmptyStep(t)
            {
                t && (this._previousKeyframe.easing = t),
                Object.keys(this._globalTimelineStyles).forEach(t => {
                    this._backFill[t] = this._globalTimelineStyles[t] || xh,
                    this._currentKeyframe[t] = xh
                }),
                this._currentEmptyStepKeyframe = this._currentKeyframe
            }
            setStyles(t, e, n, i)
            {
                e && (this._previousKeyframe.easing = e);
                const s = i && i.params || {},
                    r = function(t, e) {
                        const n = {};
                        let i;
                        return t.forEach(t => {
                            "*" === t ? (i = i || Object.keys(e), i.forEach(t => {
                                n[t] = xh
                            })) : hu(t, !1, n)
                        }), n
                    }(t, this._globalTimelineStyles);
                Object.keys(r).forEach(t => {
                    const e = yu(r[t], s, n);
                    this._pendingStyles[t] = e,
                    this._localTimelineStyles.hasOwnProperty(t) || (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t) ? this._globalTimelineStyles[t] : xh),
                    this._updateStyle(t, e)
                })
            }
            applyStylesToKeyframe()
            {
                const t = this._pendingStyles,
                    e = Object.keys(t);
                0 != e.length && (this._pendingStyles = {}, e.forEach(e => {
                    this._currentKeyframe[e] = t[e]
                }), Object.keys(this._localTimelineStyles).forEach(t => {
                    this._currentKeyframe.hasOwnProperty(t) || (this._currentKeyframe[t] = this._localTimelineStyles[t])
                }))
            }
            snapshotCurrentStyles()
            {
                Object.keys(this._localTimelineStyles).forEach(t => {
                    const e = this._localTimelineStyles[t];
                    this._pendingStyles[t] = e,
                    this._updateStyle(t, e)
                })
            }
            getFinalKeyframe()
            {
                return this._keyframes.get(this.duration)
            }
            get properties()
            {
                const t = [];
                for (let e in this._currentKeyframe)
                    t.push(e);
                return t
            }
            mergeTimelineCollectedStyles(t)
            {
                Object.keys(t._styleSummary).forEach(e => {
                    const n = this._styleSummary[e],
                        i = t._styleSummary[e];
                    (!n || i.time > n.time) && this._updateStyle(e, i.value)
                })
            }
            buildKeyframes()
            {
                this.applyStylesToKeyframe();
                const t = new Set,
                    e = new Set,
                    n = 1 === this._keyframes.size && 0 === this.duration;
                let i = [];
                this._keyframes.forEach((s, r) => {
                    const o = hu(s, !0);
                    Object.keys(o).forEach(n => {
                        const i = o[n];
                        "!" == i ? t.add(n) : i == xh && e.add(n)
                    }),
                    n || (o.offset = r / this.duration),
                    i.push(o)
                });
                const s = t.size ? bu(t.values()) : [],
                    r = e.size ? bu(e.values()) : [];
                if (n) {
                    const t = i[0],
                        e = cu(t);
                    t.offset = 0,
                    e.offset = 1,
                    i = [t, e]
                }
                return Lu(this.element, i, s, r, this.duration, this.startTime, this.easing, !1)
            }
        }
        class Zu extends Uu {
            constructor(t, e, n, i, s, r, o=!1)
            {
                super(t, e, r.delay),
                this.element = e,
                this.keyframes = n,
                this.preStyleProps = i,
                this.postStyleProps = s,
                this._stretchStartingKeyframe = o,
                this.timings = {
                    duration: r.duration,
                    delay: r.delay,
                    easing: r.easing
                }
            }
            containsAnimation()
            {
                return this.keyframes.length > 1
            }
            buildKeyframes()
            {
                let t = this.keyframes,
                    {delay: e, duration: n, easing: i} = this.timings;
                if (this._stretchStartingKeyframe && e) {
                    const s = [],
                        r = n + e,
                        o = e / r,
                        a = hu(t[0], !1);
                    a.offset = 0,
                    s.push(a);
                    const l = hu(t[0], !1);
                    l.offset = Qu(o),
                    s.push(l);
                    const c = t.length - 1;
                    for (let i = 1; i <= c; i++) {
                        let o = hu(t[i], !1);
                        o.offset = Qu((e + o.offset * n) / r),
                        s.push(o)
                    }
                    n = r,
                    e = 0,
                    i = "",
                    t = s
                }
                return Lu(this.element, t, this.preStyleProps, this.postStyleProps, n, e, i, !0)
            }
        }
        function Qu(t, e=3) {
            const n = Math.pow(10, e - 1);
            return Math.round(t * n) / n
        }
        class Ku {}
        class Gu extends Ku {
            normalizePropertyName(t, e)
            {
                return wu(t)
            }
            normalizeStyleValue(t, e, n, i)
            {
                let s = "";
                const r = n.toString().trim();
                if (Yu[e] && 0 !== n && "0" !== n)
                    if ("number" == typeof n)
                        s = "px";
                    else {
                        const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                        e && 0 == e[1].length && i.push(`Please provide a CSS unit value for ${t}:${n}`)
                    }
                return r + s
            }
        }
        const Yu = (() => function(t) {
            const e = {};
            return t.forEach(t => e[t] = !0), e
        }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();
        function Xu(t, e, n, i, s, r, o, a, l, c, h, u, d) {
            return {
                type: 0,
                element: t,
                triggerName: e,
                isRemovalTransition: s,
                fromState: n,
                fromStyles: r,
                toState: i,
                toStyles: o,
                timelines: a,
                queriedElements: l,
                preStyleProps: c,
                postStyleProps: h,
                totalTime: u,
                errors: d
            }
        }
        const Ju = {};
        class td {
            constructor(t, e, n)
            {
                this._triggerName = t,
                this.ast = e,
                this._stateStyles = n
            }
            match(t, e, n, i)
            {
                return function(t, e, n, i, s) {
                    return t.some(t => t(e, n, i, s))
                }(this.ast.matchers, t, e, n, i)
            }
            buildStyles(t, e, n)
            {
                const i = this._stateStyles["*"],
                    s = this._stateStyles[t],
                    r = i ? i.buildStyles(e, n) : {};
                return s ? s.buildStyles(e, n) : r
            }
            build(t, e, n, i, s, r, o, a, l, c)
            {
                const h = [],
                    u = this.ast.options && this.ast.options.params || Ju,
                    d = this.buildStyles(n, o && o.params || Ju, h),
                    p = a && a.params || Ju,
                    f = this.buildStyles(i, p, h),
                    m = new Set,
                    g = new Map,
                    _ = new Map,
                    y = "void" === i,
                    b = {
                        params: Object.assign(Object.assign({}, u), p)
                    },
                    v = c ? [] : zu(t, e, this.ast.animation, s, r, d, f, b, l, h);
                let w = 0;
                if (v.forEach(t => {
                    w = Math.max(t.duration + t.delay, w)
                }), h.length)
                    return Xu(e, this._triggerName, n, i, y, d, f, [], [], g, _, w, h);
                v.forEach(t => {
                    const n = t.element,
                        i = jh(g, n, {});
                    t.preStyleProps.forEach(t => i[t] = !0);
                    const s = jh(_, n, {});
                    t.postStyleProps.forEach(t => s[t] = !0),
                    n !== e && m.add(n)
                });
                const C = bu(m.values());
                return Xu(e, this._triggerName, n, i, y, d, f, v, C, g, _, w)
            }
        }
        class ed {
            constructor(t, e)
            {
                this.styles = t,
                this.defaultParams = e
            }
            buildStyles(t, e)
            {
                const n = {},
                    i = cu(this.defaultParams);
                return Object.keys(t).forEach(e => {
                    const n = t[e];
                    null != n && (i[e] = n)
                }), this.styles.styles.forEach(t => {
                    if ("string" != typeof t) {
                        const s = t;
                        Object.keys(s).forEach(t => {
                            let r = s[t];
                            r.length > 1 && (r = yu(r, i, e)),
                            n[t] = r
                        })
                    }
                }), n
            }
        }
        class nd {
            constructor(t, e)
            {
                this.name = t,
                this.ast = e,
                this.transitionFactories = [],
                this.states = {},
                e.states.forEach(t => {
                    this.states[t.name] = new ed(t.style, t.options && t.options.params || {})
                }),
                id(this.states, "true", "1"),
                id(this.states, "false", "0"),
                e.transitions.forEach(e => {
                    this.transitionFactories.push(new td(t, e, this.states))
                }),
                this.fallbackTransition = new td(t, {
                    type: 1,
                    animation: {
                        type: 2,
                        steps: [],
                        options: null
                    },
                    matchers: [(t, e) => !0],
                    options: null,
                    queryCount: 0,
                    depCount: 0
                }, this.states)
            }
            get containsQueries()
            {
                return this.ast.queryCount > 0
            }
            matchTransition(t, e, n, i)
            {
                return this.transitionFactories.find(s => s.match(t, e, n, i)) || null
            }
            matchStyles(t, e, n)
            {
                return this.fallbackTransition.buildStyles(t, e, n)
            }
        }
        function id(t, e, n) {
            t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n])
        }
        const sd = new ju;
        class rd {
            constructor(t, e, n)
            {
                this.bodyNode = t,
                this._driver = e,
                this._normalizer = n,
                this._animations = {},
                this._playersById = {},
                this.players = []
            }
            register(t, e)
            {
                const n = [],
                    i = Du(this._driver, e, n);
                if (n.length)
                    throw new Error(`Unable to build the animation due to the following errors: ${n.join("\n")}`);
                this._animations[t] = i
            }
            _buildPlayer(t, e, n)
            {
                const i = t.element,
                    s = Vh(0, this._normalizer, 0, t.keyframes, e, n);
                return this._driver.animate(i, s, t.duration, t.delay, t.easing, [], !0)
            }
            create(t, e, n={})
            {
                const i = [],
                    s = this._animations[t];
                let r;
                const o = new Map;
                if (s ? (r = zu(this._driver, e, s, tu, eu, {}, {}, n, sd, i), r.forEach(t => {
                    const e = jh(o, t.element, {});
                    t.postStyleProps.forEach(t => e[t] = null)
                })) : (i.push("The requested animation doesn't exist or has already been destroyed"), r = []), i.length)
                    throw new Error(`Unable to create the animation due to the following errors: ${i.join("\n")}`);
                o.forEach((t, e) => {
                    Object.keys(t).forEach(n => {
                        t[n] = this._driver.computeStyle(e, n, xh)
                    })
                });
                const a = Fh(r.map(t => {
                    const e = o.get(t.element);
                    return this._buildPlayer(t, {}, e)
                }));
                return this._playersById[t] = a, a.onDestroy(() => this.destroy(t)), this.players.push(a), a
            }
            destroy(t)
            {
                const e = this._getPlayer(t);
                e.destroy(),
                delete this._playersById[t];
                const n = this.players.indexOf(e);
                n >= 0 && this.players.splice(n, 1)
            }
            _getPlayer(t)
            {
                const e = this._playersById[t];
                if (!e)
                    throw new Error(`Unable to find the timeline player referenced by ${t}`);
                return e
            }
            listen(t, e, n, i)
            {
                const s = Lh(e, "", "", "");
                return Nh(this._getPlayer(t), n, s, i), () => {}
            }
            command(t, e, n, i)
            {
                if ("register" == n)
                    return void this.register(t, i[0]);
                if ("create" == n)
                    return void this.create(t, e, i[0] || {});
                const s = this._getPlayer(t);
                switch (n) {
                case "play":
                    s.play();
                    break;
                case "pause":
                    s.pause();
                    break;
                case "reset":
                    s.reset();
                    break;
                case "restart":
                    s.restart();
                    break;
                case "finish":
                    s.finish();
                    break;
                case "init":
                    s.init();
                    break;
                case "setPosition":
                    s.setPosition(parseFloat(i[0]));
                    break;
                case "destroy":
                    this.destroy(t)
                }
            }
        }
        const od = "ng-animate-queued",
            ad = "ng-animate-disabled",
            ld = ".ng-animate-disabled",
            cd = [],
            hd = {
                namespaceId: "",
                setForRemoval: !1,
                setForMove: !1,
                hasAnimation: !1,
                removedBeforeQueried: !1
            },
            ud = {
                namespaceId: "",
                setForMove: !1,
                setForRemoval: !1,
                hasAnimation: !1,
                removedBeforeQueried: !0
            };
        class dd {
            constructor(t, e="")
            {
                this.namespaceId = e;
                const n = t && t.hasOwnProperty("value");
                if (this.value = null != (i = n ? t.value : t) ? i : null, n) {
                    const e = cu(t);
                    delete e.value,
                    this.options = e
                } else
                    this.options = {};
                var i;
                this.options.params || (this.options.params = {})
            }
            get params()
            {
                return this.options.params
            }
            absorbOptions(t)
            {
                const e = t.params;
                if (e) {
                    const t = this.options.params;
                    Object.keys(e).forEach(n => {
                        null == t[n] && (t[n] = e[n])
                    })
                }
            }
        }
        const pd = "void",
            fd = new dd(pd);
        class md {
            constructor(t, e, n)
            {
                this.id = t,
                this.hostElement = e,
                this._engine = n,
                this.players = [],
                this._triggers = {},
                this._queue = [],
                this._elementListeners = new Map,
                this._hostClassName = "ng-tns-" + t,
                Cd(e, this._hostClassName)
            }
            listen(t, e, n, i)
            {
                if (!this._triggers.hasOwnProperty(e))
                    throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`);
                if (null == n || 0 == n.length)
                    throw new Error(`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`);
                if ("start" != (s = n) && "done" != s)
                    throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`);
                var s;
                const r = jh(this._elementListeners, t, []),
                    o = {
                        name: e,
                        phase: n,
                        callback: i
                    };
                r.push(o);
                const a = jh(this._engine.statesByElement, t, {});
                return a.hasOwnProperty(e) || (Cd(t, nu), Cd(t, "ng-trigger-" + e), a[e] = fd), () => {
                    this._engine.afterFlush(() => {
                        const t = r.indexOf(o);
                        t >= 0 && r.splice(t, 1),
                        this._triggers[e] || delete a[e]
                    })
                }
            }
            register(t, e)
            {
                return !this._triggers[t] && (this._triggers[t] = e, !0)
            }
            _getTrigger(t)
            {
                const e = this._triggers[t];
                if (!e)
                    throw new Error(`The provided animation trigger "${t}" has not been registered!`);
                return e
            }
            trigger(t, e, n, i=!0)
            {
                const s = this._getTrigger(e),
                    r = new _d(this.id, e, t);
                let o = this._engine.statesByElement.get(t);
                o || (Cd(t, nu), Cd(t, "ng-trigger-" + e), this._engine.statesByElement.set(t, o = {}));
                let a = o[e];
                const l = new dd(n, this.id);
                if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options), o[e] = l, a || (a = fd), l.value !== pd && a.value === l.value) {
                    if (!function(t, e) {
                        const n = Object.keys(t),
                            i = Object.keys(e);
                        if (n.length != i.length)
                            return !1;
                        for (let s = 0; s < n.length; s++) {
                            const i = n[s];
                            if (!e.hasOwnProperty(i) || t[i] !== e[i])
                                return !1
                        }
                        return !0
                    }(a.params, l.params)) {
                        const e = [],
                            n = s.matchStyles(a.value, a.params, e),
                            i = s.matchStyles(l.value, l.params, e);
                        e.length ? this._engine.reportError(e) : this._engine.afterFlush(() => {
                            fu(t, n),
                            pu(t, i)
                        })
                    }
                    return
                }
                const c = jh(this._engine.playersByElement, t, []);
                c.forEach(t => {
                    t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy()
                });
                let h = s.matchTransition(a.value, l.value, t, l.params),
                    u = !1;
                if (!h) {
                    if (!i)
                        return;
                    h = s.fallbackTransition,
                    u = !0
                }
                return this._engine.totalQueuedPlayers++, this._queue.push({
                    element: t,
                    triggerName: e,
                    transition: h,
                    fromState: a,
                    toState: l,
                    player: r,
                    isFallbackTransition: u
                }), u || (Cd(t, od), r.onStart(() => {
                    xd(t, od)
                })), r.onDone(() => {
                    let e = this.players.indexOf(r);
                    e >= 0 && this.players.splice(e, 1);
                    const n = this._engine.playersByElement.get(t);
                    if (n) {
                        let t = n.indexOf(r);
                        t >= 0 && n.splice(t, 1)
                    }
                }), this.players.push(r), c.push(r), r
            }
            deregister(t)
            {
                delete this._triggers[t],
                this._engine.statesByElement.forEach((e, n) => {
                    delete e[t]
                }),
                this._elementListeners.forEach((e, n) => {
                    this._elementListeners.set(n, e.filter(e => e.name != t))
                })
            }
            clearElementCache(t)
            {
                this._engine.statesByElement.delete(t),
                this._elementListeners.delete(t);
                const e = this._engine.playersByElement.get(t);
                e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t))
            }
            _signalRemovalForInnerTriggers(t, e)
            {
                const n = this._engine.driver.query(t, iu, !0);
                n.forEach(t => {
                    if (t.__ng_removed)
                        return;
                    const n = this._engine.fetchNamespacesByElement(t);
                    n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t)
                }),
                this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)))
            }
            triggerLeaveAnimation(t, e, n, i)
            {
                const s = this._engine.statesByElement.get(t);
                if (s) {
                    const r = [];
                    if (Object.keys(s).forEach(e => {
                        if (this._triggers[e]) {
                            const n = this.trigger(t, e, pd, i);
                            n && r.push(n)
                        }
                    }), r.length)
                        return this._engine.markElementAsRemoved(this.id, t, !0, e), n && Fh(r).onDone(() => this._engine.processLeaveNode(t)), !0
                }
                return !1
            }
            prepareLeaveAnimationListeners(t)
            {
                const e = this._elementListeners.get(t),
                    n = this._engine.statesByElement.get(t);
                if (e && n) {
                    const i = new Set;
                    e.forEach(e => {
                        const s = e.name;
                        if (i.has(s))
                            return;
                        i.add(s);
                        const r = this._triggers[s].fallbackTransition,
                            o = n[s] || fd,
                            a = new dd(pd),
                            l = new _d(this.id, s, t);
                        this._engine.totalQueuedPlayers++,
                        this._queue.push({
                            element: t,
                            triggerName: s,
                            transition: r,
                            fromState: o,
                            toState: a,
                            player: l,
                            isFallbackTransition: !0
                        })
                    })
                }
            }
            removeNode(t, e)
            {
                const n = this._engine;
                if (t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0))
                    return;
                let i = !1;
                if (n.totalAnimations) {
                    const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
                    if (e && e.length)
                        i = !0;
                    else {
                        let e = t;
                        for (; e = e.parentNode;)
                            if (n.statesByElement.get(e)) {
                                i = !0;
                                break
                            }
                    }
                }
                if (this.prepareLeaveAnimationListeners(t), i)
                    n.markElementAsRemoved(this.id, t, !1, e);
                else {
                    const i = t.__ng_removed;
                    i && i !== hd || (n.afterFlush(() => this.clearElementCache(t)), n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
                }
            }
            insertNode(t, e)
            {
                Cd(t, this._hostClassName)
            }
            drainQueuedTransitions(t)
            {
                const e = [];
                return this._queue.forEach(n => {
                    const i = n.player;
                    if (i.destroyed)
                        return;
                    const s = n.element,
                        r = this._elementListeners.get(s);
                    r && r.forEach(e => {
                        if (e.name == n.triggerName) {
                            const i = Lh(s, n.triggerName, n.fromState.value, n.toState.value);
                            i._data = t,
                            Nh(n.player, e.phase, i, e.callback)
                        }
                    }),
                    i.markedForDestroy ? this._engine.afterFlush(() => {
                        i.destroy()
                    }) : e.push(n)
                }), this._queue = [], e.sort((t, e) => {
                    const n = t.transition.ast.depCount,
                        i = e.transition.ast.depCount;
                    return 0 == n || 0 == i ? n - i : this._engine.driver.containsElement(t.element, e.element) ? 1 : -1
                })
            }
            destroy(t)
            {
                this.players.forEach(t => t.destroy()),
                this._signalRemovalForInnerTriggers(this.hostElement, t)
            }
            elementContainsData(t)
            {
                let e = !1;
                return this._elementListeners.has(t) && (e = !0), e = !!this._queue.find(e => e.element === t) || e, e
            }
        }
        class gd {
            constructor(t, e, n)
            {
                this.bodyNode = t,
                this.driver = e,
                this._normalizer = n,
                this.players = [],
                this.newHostElements = new Map,
                this.playersByElement = new Map,
                this.playersByQueriedElement = new Map,
                this.statesByElement = new Map,
                this.disabledNodes = new Set,
                this.totalAnimations = 0,
                this.totalQueuedPlayers = 0,
                this._namespaceLookup = {},
                this._namespaceList = [],
                this._flushFns = [],
                this._whenQuietFns = [],
                this.namespacesByHostElement = new Map,
                this.collectedEnterElements = [],
                this.collectedLeaveElements = [],
                this.onRemovalComplete = (t, e) => {}
            }
            _onRemovalComplete(t, e)
            {
                this.onRemovalComplete(t, e)
            }
            get queuedPlayers()
            {
                const t = [];
                return this._namespaceList.forEach(e => {
                    e.players.forEach(e => {
                        e.queued && t.push(e)
                    })
                }), t
            }
            createNamespace(t, e)
            {
                const n = new md(t, e, this);
                return e.parentNode ? this._balanceNamespaceList(n, e) : (this.newHostElements.set(e, n), this.collectEnterElement(e)), this._namespaceLookup[t] = n
            }
            _balanceNamespaceList(t, e)
            {
                const n = this._namespaceList.length - 1;
                if (n >= 0) {
                    let i = !1;
                    for (let s = n; s >= 0; s--)
                        if (this.driver.containsElement(this._namespaceList[s].hostElement, e)) {
                            this._namespaceList.splice(s + 1, 0, t),
                            i = !0;
                            break
                        }
                    i || this._namespaceList.splice(0, 0, t)
                } else
                    this._namespaceList.push(t);
                return this.namespacesByHostElement.set(e, t), t
            }
            register(t, e)
            {
                let n = this._namespaceLookup[t];
                return n || (n = this.createNamespace(t, e)), n
            }
            registerTrigger(t, e, n)
            {
                let i = this._namespaceLookup[t];
                i && i.register(e, n) && this.totalAnimations++
            }
            destroy(t, e)
            {
                if (!t)
                    return;
                const n = this._fetchNamespace(t);
                this.afterFlush(() => {
                    this.namespacesByHostElement.delete(n.hostElement),
                    delete this._namespaceLookup[t];
                    const e = this._namespaceList.indexOf(n);
                    e >= 0 && this._namespaceList.splice(e, 1)
                }),
                this.afterFlushAnimationsDone(() => n.destroy(e))
            }
            _fetchNamespace(t)
            {
                return this._namespaceLookup[t]
            }
            fetchNamespacesByElement(t)
            {
                const e = new Set,
                    n = this.statesByElement.get(t);
                if (n) {
                    const t = Object.keys(n);
                    for (let i = 0; i < t.length; i++) {
                        const s = n[t[i]].namespaceId;
                        if (s) {
                            const t = this._fetchNamespace(s);
                            t && e.add(t)
                        }
                    }
                }
                return e
            }
            trigger(t, e, n, i)
            {
                if (yd(e)) {
                    const s = this._fetchNamespace(t);
                    if (s)
                        return s.trigger(e, n, i), !0
                }
                return !1
            }
            insertNode(t, e, n, i)
            {
                if (!yd(e))
                    return;
                const s = e.__ng_removed;
                if (s && s.setForRemoval) {
                    s.setForRemoval = !1,
                    s.setForMove = !0;
                    const t = this.collectedLeaveElements.indexOf(e);
                    t >= 0 && this.collectedLeaveElements.splice(t, 1)
                }
                if (t) {
                    const i = this._fetchNamespace(t);
                    i && i.insertNode(e, n)
                }
                i && this.collectEnterElement(e)
            }
            collectEnterElement(t)
            {
                this.collectedEnterElements.push(t)
            }
            markElementAsDisabled(t, e)
            {
                e ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), Cd(t, ad)) : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), xd(t, ad))
            }
            removeNode(t, e, n, i)
            {
                if (yd(e)) {
                    const s = t ? this._fetchNamespace(t) : null;
                    if (s ? s.removeNode(e, i) : this.markElementAsRemoved(t, e, !1, i), n) {
                        const n = this.namespacesByHostElement.get(e);
                        n && n.id !== t && n.removeNode(e, i)
                    }
                } else
                    this._onRemovalComplete(e, i)
            }
            markElementAsRemoved(t, e, n, i)
            {
                this.collectedLeaveElements.push(e),
                e.__ng_removed = {
                    namespaceId: t,
                    setForRemoval: i,
                    hasAnimation: n,
                    removedBeforeQueried: !1
                }
            }
            listen(t, e, n, i, s)
            {
                return yd(e) ? this._fetchNamespace(t).listen(e, n, i, s) : () => {}
            }
            _buildInstruction(t, e, n, i, s)
            {
                return t.transition.build(this.driver, t.element, t.fromState.value, t.toState.value, n, i, t.fromState.options, t.toState.options, e, s)
            }
            destroyInnerAnimations(t)
            {
                let e = this.driver.query(t, iu, !0);
                e.forEach(t => this.destroyActiveAnimationsForElement(t)),
                0 != this.playersByQueriedElement.size && (e = this.driver.query(t, ru, !0), e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)))
            }
            destroyActiveAnimationsForElement(t)
            {
                const e = this.playersByElement.get(t);
                e && e.forEach(t => {
                    t.queued ? t.markedForDestroy = !0 : t.destroy()
                })
            }
            finishActiveQueriedAnimationOnElement(t)
            {
                const e = this.playersByQueriedElement.get(t);
                e && e.forEach(t => t.finish())
            }
            whenRenderingDone()
            {
                return new Promise(t => {
                    if (this.players.length)
                        return Fh(this.players).onDone(() => t());
                    t()
                })
            }
            processLeaveNode(t)
            {
                const e = t.__ng_removed;
                if (e && e.setForRemoval) {
                    if (t.__ng_removed = hd, e.namespaceId) {
                        this.destroyInnerAnimations(t);
                        const n = this._fetchNamespace(e.namespaceId);
                        n && n.clearElementCache(t)
                    }
                    this._onRemovalComplete(t, e.setForRemoval)
                }
                this.driver.matchesElement(t, ld) && this.markElementAsDisabled(t, !1),
                this.driver.query(t, ld, !0).forEach(t => {
                    this.markElementAsDisabled(t, !1)
                })
            }
            flush(t=-1)
            {
                let e = [];
                if (this.newHostElements.size && (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length)
                    for (let n = 0; n < this.collectedEnterElements.length; n++)
                        Cd(this.collectedEnterElements[n], "ng-star-inserted");
                if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    const n = [];
                    try {
                        e = this._flushAnimations(n, t)
                    } finally {
                        for (let t = 0; t < n.length; t++)
                            n[t]()
                    }
                } else
                    for (let n = 0; n < this.collectedLeaveElements.length; n++)
                        this.processLeaveNode(this.collectedLeaveElements[n]);
                if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(t => t()), this._flushFns = [], this._whenQuietFns.length) {
                    const t = this._whenQuietFns;
                    this._whenQuietFns = [],
                    e.length ? Fh(e).onDone(() => {
                        t.forEach(t => t())
                    }) : t.forEach(t => t())
                }
            }
            reportError(t)
            {
                throw new Error(`Unable to process animations due to the following failed trigger transitions\n ${t.join("\n")}`)
            }
            _flushAnimations(t, e)
            {
                const n = new ju,
                    i = [],
                    s = new Map,
                    r = [],
                    o = new Map,
                    a = new Map,
                    l = new Map,
                    c = new Set;
                this.disabledNodes.forEach(t => {
                    c.add(t);
                    const e = this.driver.query(t, ".ng-animate-queued", !0);
                    for (let n = 0; n < e.length; n++)
                        c.add(e[n])
                });
                const h = this.bodyNode,
                    u = Array.from(this.statesByElement.keys()),
                    d = wd(u, this.collectedEnterElements),
                    p = new Map;
                let f = 0;
                d.forEach((t, e) => {
                    const n = tu + f++;
                    p.set(e, n),
                    t.forEach(t => Cd(t, n))
                });
                const m = [],
                    g = new Set,
                    _ = new Set;
                for (let I = 0; I < this.collectedLeaveElements.length; I++) {
                    const t = this.collectedLeaveElements[I],
                        e = t.__ng_removed;
                    e && e.setForRemoval && (m.push(t), g.add(t), e.hasAnimation ? this.driver.query(t, ".ng-star-inserted", !0).forEach(t => g.add(t)) : _.add(t))
                }
                const y = new Map,
                    b = wd(u, Array.from(g));
                b.forEach((t, e) => {
                    const n = eu + f++;
                    y.set(e, n),
                    t.forEach(t => Cd(t, n))
                }),
                t.push(() => {
                    d.forEach((t, e) => {
                        const n = p.get(e);
                        t.forEach(t => xd(t, n))
                    }),
                    b.forEach((t, e) => {
                        const n = y.get(e);
                        t.forEach(t => xd(t, n))
                    }),
                    m.forEach(t => {
                        this.processLeaveNode(t)
                    })
                });
                const v = [],
                    w = [];
                for (let I = this._namespaceList.length - 1; I >= 0; I--)
                    this._namespaceList[I].drainQueuedTransitions(e).forEach(t => {
                        const e = t.player,
                            s = t.element;
                        if (v.push(e), this.collectedEnterElements.length) {
                            const t = s.__ng_removed;
                            if (t && t.setForMove)
                                return void e.destroy()
                        }
                        const c = !h || !this.driver.containsElement(h, s),
                            u = y.get(s),
                            d = p.get(s),
                            f = this._buildInstruction(t, n, d, u, c);
                        if (f.errors && f.errors.length)
                            w.push(f);
                        else {
                            if (c)
                                return e.onStart(() => fu(s, f.fromStyles)), e.onDestroy(() => pu(s, f.toStyles)), void i.push(e);
                            if (t.isFallbackTransition)
                                return e.onStart(() => fu(s, f.fromStyles)), e.onDestroy(() => pu(s, f.toStyles)), void i.push(e);
                            f.timelines.forEach(t => t.stretchStartingKeyframe = !0),
                            n.append(s, f.timelines),
                            r.push({
                                instruction: f,
                                player: e,
                                element: s
                            }),
                            f.queriedElements.forEach(t => jh(o, t, []).push(e)),
                            f.preStyleProps.forEach((t, e) => {
                                const n = Object.keys(t);
                                if (n.length) {
                                    let t = a.get(e);
                                    t || a.set(e, t = new Set),
                                    n.forEach(e => t.add(e))
                                }
                            }),
                            f.postStyleProps.forEach((t, e) => {
                                const n = Object.keys(t);
                                let i = l.get(e);
                                i || l.set(e, i = new Set),
                                n.forEach(t => i.add(t))
                            })
                        }
                    });
                if (w.length) {
                    const t = [];
                    w.forEach(e => {
                        t.push(`@${e.triggerName} has failed due to:\n`),
                        e.errors.forEach(e => t.push(`- ${e}\n`))
                    }),
                    v.forEach(t => t.destroy()),
                    this.reportError(t)
                }
                const C = new Map,
                    x = new Map;
                r.forEach(t => {
                    const e = t.element;
                    n.has(e) && (x.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, C))
                }),
                i.forEach(t => {
                    const e = t.element;
                    this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
                        jh(C, e, []).push(t),
                        t.destroy()
                    })
                });
                const E = m.filter(t => kd(t, a, l)),
                    S = new Map;
                vd(S, this.driver, _, l, xh).forEach(t => {
                    kd(t, a, l) && E.push(t)
                });
                const k = new Map;
                d.forEach((t, e) => {
                    vd(k, this.driver, new Set(t), a, "!")
                }),
                E.forEach(t => {
                    const e = S.get(t),
                        n = k.get(t);
                    S.set(t, Object.assign(Object.assign({}, e), n))
                });
                const A = [],
                    T = [],
                    O = {};
                r.forEach(t => {
                    const {element: e, player: r, instruction: o} = t;
                    if (n.has(e)) {
                        if (c.has(e))
                            return r.onDestroy(() => pu(e, o.toStyles)), r.disabled = !0, r.overrideTotalTime(o.totalTime), void i.push(r);
                        let t = O;
                        if (x.size > 1) {
                            let n = e;
                            const i = [];
                            for (; n = n.parentNode;) {
                                const e = x.get(n);
                                if (e) {
                                    t = e;
                                    break
                                }
                                i.push(n)
                            }
                            i.forEach(e => x.set(e, t))
                        }
                        const n = this._buildAnimation(r.namespaceId, o, C, s, k, S);
                        if (r.setRealPlayer(n), t === O)
                            A.push(r);
                        else {
                            const e = this.playersByElement.get(t);
                            e && e.length && (r.parentPlayer = Fh(e)),
                            i.push(r)
                        }
                    } else
                        fu(e, o.fromStyles),
                        r.onDestroy(() => pu(e, o.toStyles)),
                        T.push(r),
                        c.has(e) && i.push(r)
                }),
                T.forEach(t => {
                    const e = s.get(t.element);
                    if (e && e.length) {
                        const n = Fh(e);
                        t.setRealPlayer(n)
                    }
                }),
                i.forEach(t => {
                    t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy()
                });
                for (let I = 0; I < m.length; I++) {
                    const t = m[I],
                        e = t.__ng_removed;
                    if (xd(t, eu), e && e.hasAnimation)
                        continue;
                    let n = [];
                    if (o.size) {
                        let e = o.get(t);
                        e && e.length && n.push(...e);
                        let i = this.driver.query(t, ru, !0);
                        for (let t = 0; t < i.length; t++) {
                            let e = o.get(i[t]);
                            e && e.length && n.push(...e)
                        }
                    }
                    const i = n.filter(t => !t.destroyed);
                    i.length ? Ed(this, t, i) : this.processLeaveNode(t)
                }
                return m.length = 0, A.forEach(t => {
                    this.players.push(t),
                    t.onDone(() => {
                        t.destroy();
                        const e = this.players.indexOf(t);
                        this.players.splice(e, 1)
                    }),
                    t.play()
                }), A
            }
            elementContainsData(t, e)
            {
                let n = !1;
                const i = e.__ng_removed;
                return i && i.setForRemoval && (n = !0), this.playersByElement.has(e) && (n = !0), this.playersByQueriedElement.has(e) && (n = !0), this.statesByElement.has(e) && (n = !0), this._fetchNamespace(t).elementContainsData(e) || n
            }
            afterFlush(t)
            {
                this._flushFns.push(t)
            }
            afterFlushAnimationsDone(t)
            {
                this._whenQuietFns.push(t)
            }
            _getPreviousPlayers(t, e, n, i, s)
            {
                let r = [];
                if (e) {
                    const e = this.playersByQueriedElement.get(t);
                    e && (r = e)
                } else {
                    const e = this.playersByElement.get(t);
                    if (e) {
                        const t = !s || s == pd;
                        e.forEach(e => {
                            e.queued || (t || e.triggerName == i) && r.push(e)
                        })
                    }
                }
                return (n || i) && (r = r.filter(t => !(n && n != t.namespaceId || i && i != t.triggerName))), r
            }
            _beforeAnimationBuild(t, e, n)
            {
                const i = e.element,
                    s = e.isRemovalTransition ? void 0 : t,
                    r = e.isRemovalTransition ? void 0 : e.triggerName;
                for (const o of e.timelines) {
                    const t = o.element,
                        a = t !== i,
                        l = jh(n, t, []);
                    this._getPreviousPlayers(t, a, s, r, e.toState).forEach(t => {
                        const e = t.getRealPlayer();
                        e.beforeDestroy && e.beforeDestroy(),
                        t.destroy(),
                        l.push(t)
                    })
                }
                fu(i, e.fromStyles)
            }
            _buildAnimation(t, e, n, i, s, r)
            {
                const o = e.triggerName,
                    a = e.element,
                    l = [],
                    c = new Set,
                    h = new Set,
                    u = e.timelines.map(e => {
                        const u = e.element;
                        c.add(u);
                        const d = u.__ng_removed;
                        if (d && d.removedBeforeQueried)
                            return new Ph(e.duration, e.delay);
                        const p = u !== a,
                            f = function(t) {
                                const e = [];
                                return Sd(t, e), e
                            }((n.get(u) || cd).map(t => t.getRealPlayer())).filter(t => !!t.element && t.element === u),
                            m = s.get(u),
                            g = r.get(u),
                            _ = Vh(0, this._normalizer, 0, e.keyframes, m, g),
                            y = this._buildPlayer(e, _, f);
                        if (e.subTimeline && i && h.add(u), p) {
                            const e = new _d(t, o, u);
                            e.setRealPlayer(y),
                            l.push(e)
                        }
                        return y
                    });
                l.forEach(t => {
                    jh(this.playersByQueriedElement, t.element, []).push(t),
                    t.onDone(() => function(t, e, n) {
                        let i;
                        if (t instanceof Map) {
                            if (i = t.get(e), i) {
                                if (i.length) {
                                    const t = i.indexOf(n);
                                    i.splice(t, 1)
                                }
                                0 == i.length && t.delete(e)
                            }
                        } else if (i = t[e], i) {
                            if (i.length) {
                                const t = i.indexOf(n);
                                i.splice(t, 1)
                            }
                            0 == i.length && delete t[e]
                        }
                        return i
                    }(this.playersByQueriedElement, t.element, t))
                }),
                c.forEach(t => Cd(t, su));
                const d = Fh(u);
                return d.onDestroy(() => {
                    c.forEach(t => xd(t, su)),
                    pu(a, e.toStyles)
                }), h.forEach(t => {
                    jh(i, t, []).push(d)
                }), d
            }
            _buildPlayer(t, e, n)
            {
                return e.length > 0 ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n) : new Ph(t.duration, t.delay)
            }
        }
        class _d {
            constructor(t, e, n)
            {
                this.namespaceId = t,
                this.triggerName = e,
                this.element = n,
                this._player = new Ph,
                this._containsRealPlayer = !1,
                this._queuedCallbacks = {},
                this.destroyed = !1,
                this.markedForDestroy = !1,
                this.disabled = !1,
                this.queued = !0,
                this.totalTime = 0
            }
            setRealPlayer(t)
            {
                this._containsRealPlayer || (this._player = t, Object.keys(this._queuedCallbacks).forEach(e => {
                    this._queuedCallbacks[e].forEach(n => Nh(t, e, void 0, n))
                }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(t.totalTime), this.queued = !1)
            }
            getRealPlayer()
            {
                return this._player
            }
            overrideTotalTime(t)
            {
                this.totalTime = t
            }
            syncPlayerEvents(t)
            {
                const e = this._player;
                e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
                t.onDone(() => this.finish()),
                t.onDestroy(() => this.destroy())
            }
            _queueEvent(t, e)
            {
                jh(this._queuedCallbacks, t, []).push(e)
            }
            onDone(t)
            {
                this.queued && this._queueEvent("done", t),
                this._player.onDone(t)
            }
            onStart(t)
            {
                this.queued && this._queueEvent("start", t),
                this._player.onStart(t)
            }
            onDestroy(t)
            {
                this.queued && this._queueEvent("destroy", t),
                this._player.onDestroy(t)
            }
            init()
            {
                this._player.init()
            }
            hasStarted()
            {
                return !this.queued && this._player.hasStarted()
            }
            play()
            {
                !this.queued && this._player.play()
            }
            pause()
            {
                !this.queued && this._player.pause()
            }
            restart()
            {
                !this.queued && this._player.restart()
            }
            finish()
            {
                this._player.finish()
            }
            destroy()
            {
                this.destroyed = !0,
                this._player.destroy()
            }
            reset()
            {
                !this.queued && this._player.reset()
            }
            setPosition(t)
            {
                this.queued || this._player.setPosition(t)
            }
            getPosition()
            {
                return this.queued ? 0 : this._player.getPosition()
            }
            triggerCallback(t)
            {
                const e = this._player;
                e.triggerCallback && e.triggerCallback(t)
            }
        }
        function yd(t) {
            return t && 1 === t.nodeType
        }
        function bd(t, e) {
            const n = t.style.display;
            return t.style.display = null != e ? e : "none", n
        }
        function vd(t, e, n, i, s) {
            const r = [];
            n.forEach(t => r.push(bd(t)));
            const o = [];
            i.forEach((n, i) => {
                const r = {};
                n.forEach(t => {
                    const n = r[t] = e.computeStyle(i, t, s);
                    n && 0 != n.length || (i.__ng_removed = ud, o.push(i))
                }),
                t.set(i, r)
            });
            let a = 0;
            return n.forEach(t => bd(t, r[a++])), o
        }
        function wd(t, e) {
            const n = new Map;
            if (t.forEach(t => n.set(t, [])), 0 == e.length)
                return n;
            const i = new Set(e),
                s = new Map;
            function r(t) {
                if (!t)
                    return 1;
                let e = s.get(t);
                if (e)
                    return e;
                const o = t.parentNode;
                return e = n.has(o) ? o : i.has(o) ? 1 : r(o), s.set(t, e), e
            }
            return e.forEach(t => {
                const e = r(t);
                1 !== e && n.get(e).push(t)
            }), n
        }
        function Cd(t, e) {
            if (t.classList)
                t.classList.add(e);
            else {
                let n = t.$$classes;
                n || (n = t.$$classes = {}),
                n[e] = !0
            }
        }
        function xd(t, e) {
            if (t.classList)
                t.classList.remove(e);
            else {
                let n = t.$$classes;
                n && delete n[e]
            }
        }
        function Ed(t, e, n) {
            Fh(n).onDone(() => t.processLeaveNode(e))
        }
        function Sd(t, e) {
            for (let n = 0; n < t.length; n++) {
                const i = t[n];
                i instanceof Dh ? Sd(i.players, e) : e.push(i)
            }
        }
        function kd(t, e, n) {
            const i = n.get(t);
            if (!i)
                return !1;
            let s = e.get(t);
            return s ? i.forEach(t => s.add(t)) : e.set(t, i), n.delete(t), !0
        }
        class Ad {
            constructor(t, e, n)
            {
                this.bodyNode = t,
                this._driver = e,
                this._triggerCache = {},
                this.onRemovalComplete = (t, e) => {},
                this._transitionEngine = new gd(t, e, n),
                this._timelineEngine = new rd(t, e, n),
                this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e)
            }
            registerTrigger(t, e, n, i, s)
            {
                const r = t + "-" + i;
                let o = this._triggerCache[r];
                if (!o) {
                    const t = [],
                        e = Du(this._driver, s, t);
                    if (t.length)
                        throw new Error(`The animation trigger "${i}" has failed to build due to the following errors:\n - ${t.join("\n - ")}`);
                    o = function(t, e) {
                        return new nd(t, e)
                    }(i, e),
                    this._triggerCache[r] = o
                }
                this._transitionEngine.registerTrigger(e, i, o)
            }
            register(t, e)
            {
                this._transitionEngine.register(t, e)
            }
            destroy(t, e)
            {
                this._transitionEngine.destroy(t, e)
            }
            onInsert(t, e, n, i)
            {
                this._transitionEngine.insertNode(t, e, n, i)
            }
            onRemove(t, e, n, i)
            {
                this._transitionEngine.removeNode(t, e, i || !1, n)
            }
            disableAnimations(t, e)
            {
                this._transitionEngine.markElementAsDisabled(t, e)
            }
            process(t, e, n, i)
            {
                if ("@" == n.charAt(0)) {
                    const [t, s] = Bh(n);
                    this._timelineEngine.command(t, e, s, i)
                } else
                    this._transitionEngine.trigger(t, e, n, i)
            }
            listen(t, e, n, i, s)
            {
                if ("@" == n.charAt(0)) {
                    const [t, i] = Bh(n);
                    return this._timelineEngine.listen(t, e, i, s)
                }
                return this._transitionEngine.listen(t, e, n, i, s)
            }
            flush(t=-1)
            {
                this._transitionEngine.flush(t)
            }
            get players()
            {
                return this._transitionEngine.players.concat(this._timelineEngine.players)
            }
            whenRenderingDone()
            {
                return this._transitionEngine.whenRenderingDone()
            }
        }
        function Td(t, e) {
            let n = null,
                i = null;
            return Array.isArray(e) && e.length ? (n = Id(e[0]), e.length > 1 && (i = Id(e[e.length - 1]))) : e && (n = Id(e)), n || i ? new Od(t, n, i) : null
        }
        let Od = (() => {
            class t {
                constructor(e, n, i)
                {
                    this._element = e,
                    this._startStyles = n,
                    this._endStyles = i,
                    this._state = 0;
                    let s = t.initialStylesByElement.get(e);
                    s || t.initialStylesByElement.set(e, s = {}),
                    this._initialStyles = s
                }
                start()
                {
                    this._state < 1 && (this._startStyles && pu(this._element, this._startStyles, this._initialStyles), this._state = 1)
                }
                finish()
                {
                    this.start(),
                    this._state < 2 && (pu(this._element, this._initialStyles), this._endStyles && (pu(this._element, this._endStyles), this._endStyles = null), this._state = 1)
                }
                destroy()
                {
                    this.finish(),
                    this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (fu(this._element, this._startStyles), this._endStyles = null), this._endStyles && (fu(this._element, this._endStyles), this._endStyles = null), pu(this._element, this._initialStyles), this._state = 3)
                }
            }
            return t.initialStylesByElement = new WeakMap, t
        })();
        function Id(t) {
            let e = null;
            const n = Object.keys(t);
            for (let i = 0; i < n.length; i++) {
                const s = n[i];
                Pd(s) && (e = e || {}, e[s] = t[s])
            }
            return e
        }
        function Pd(t) {
            return "display" === t || "position" === t
        }
        const Dd = "animation",
            Rd = "animationend";
        class Fd {
            constructor(t, e, n, i, s, r, o)
            {
                this._element = t,
                this._name = e,
                this._duration = n,
                this._delay = i,
                this._easing = s,
                this._fillMode = r,
                this._onDoneFn = o,
                this._finished = !1,
                this._destroyed = !1,
                this._startTime = 0,
                this._position = 0,
                this._eventFn = t => this._handleCallback(t)
            }
            apply()
            {
                !function(t, e) {
                    const n = Bd(t, "").trim();
                    n.length && (function(t, e) {
                        let n = 0;
                        for (let i = 0; i < t.length; i++)
                            "," === t.charAt(i) && n++
                    }(n), e = `${n}, ${e}`),
                    jd(t, "", e)
                }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`),
                Ld(this._element, this._eventFn, !1),
                this._startTime = Date.now()
            }
            pause()
            {
                Vd(this._element, this._name, "paused")
            }
            resume()
            {
                Vd(this._element, this._name, "running")
            }
            setPosition(t)
            {
                const e = Nd(this._element, this._name);
                this._position = t * this._duration,
                jd(this._element, "Delay", `-${this._position}ms`, e)
            }
            getPosition()
            {
                return this._position
            }
            _handleCallback(t)
            {
                const e = t._ngTestManualTimestamp || Date.now(),
                    n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
                t.animationName == this._name && Math.max(e - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
            }
            finish()
            {
                this._finished || (this._finished = !0, this._onDoneFn(), Ld(this._element, this._eventFn, !0))
            }
            destroy()
            {
                this._destroyed || (this._destroyed = !0, this.finish(), function(t, e) {
                    const n = Bd(t, "").split(","),
                        i = Md(n, e);
                    i >= 0 && (n.splice(i, 1), jd(t, "", n.join(",")))
                }(this._element, this._name))
            }
        }
        function Vd(t, e, n) {
            jd(t, "PlayState", n, Nd(t, e))
        }
        function Nd(t, e) {
            const n = Bd(t, "");
            return n.indexOf(",") > 0 ? Md(n.split(","), e) : Md([n], e)
        }
        function Md(t, e) {
            for (let n = 0; n < t.length; n++)
                if (t[n].indexOf(e) >= 0)
                    return n;
            return -1
        }
        function Ld(t, e, n) {
            n ? t.removeEventListener(Rd, e) : t.addEventListener(Rd, e)
        }
        function jd(t, e, n, i) {
            const s = Dd + e;
            if (null != i) {
                const e = t.style[s];
                if (e.length) {
                    const t = e.split(",");
                    t[i] = n,
                    n = t.join(",")
                }
            }
            t.style[s] = n
        }
        function Bd(t, e) {
            return t.style[Dd + e] || ""
        }
        class Hd {
            constructor(t, e, n, i, s, r, o, a)
            {
                this.element = t,
                this.keyframes = e,
                this.animationName = n,
                this._duration = i,
                this._delay = s,
                this._finalStyles = o,
                this._specialStyles = a,
                this._onDoneFns = [],
                this._onStartFns = [],
                this._onDestroyFns = [],
                this._started = !1,
                this.currentSnapshot = {},
                this._state = 0,
                this.easing = r || "linear",
                this.totalTime = i + s,
                this._buildStyler()
            }
            onStart(t)
            {
                this._onStartFns.push(t)
            }
            onDone(t)
            {
                this._onDoneFns.push(t)
            }
            onDestroy(t)
            {
                this._onDestroyFns.push(t)
            }
            destroy()
            {
                this.init(),
                this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }
            _flushDoneFns()
            {
                this._onDoneFns.forEach(t => t()),
                this._onDoneFns = []
            }
            _flushStartFns()
            {
                this._onStartFns.forEach(t => t()),
                this._onStartFns = []
            }
            finish()
            {
                this.init(),
                this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
            }
            setPosition(t)
            {
                this._styler.setPosition(t)
            }
            getPosition()
            {
                return this._styler.getPosition()
            }
            hasStarted()
            {
                return this._state >= 2
            }
            init()
            {
                this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
            }
            play()
            {
                this.init(),
                this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()),
                this._styler.resume()
            }
            pause()
            {
                this.init(),
                this._styler.pause()
            }
            restart()
            {
                this.reset(),
                this.play()
            }
            reset()
            {
                this._styler.destroy(),
                this._buildStyler(),
                this._styler.apply()
            }
            _buildStyler()
            {
                this._styler = new Fd(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
            }
            triggerCallback(t)
            {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()),
                e.length = 0
            }
            beforeDestroy()
            {
                this.init();
                const t = {};
                if (this.hasStarted()) {
                    const e = this._state >= 3;
                    Object.keys(this._finalStyles).forEach(n => {
                        "offset" != n && (t[n] = e ? this._finalStyles[n] : Su(this.element, n))
                    })
                }
                this.currentSnapshot = t
            }
        }
        class zd extends Ph {
            constructor(t, e)
            {
                super(),
                this.element = t,
                this._startingStyles = {},
                this.__initialized = !1,
                this._styles = Yh(e)
            }
            init()
            {
                !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(t => {
                    this._startingStyles[t] = this.element.style[t]
                }), super.init())
            }
            play()
            {
                this._startingStyles && (this.init(), Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])), super.play())
            }
            destroy()
            {
                this._startingStyles && (Object.keys(this._startingStyles).forEach(t => {
                    const e = this._startingStyles[t];
                    e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t)
                }), this._startingStyles = null, super.destroy())
            }
        }
        class $d {
            constructor()
            {
                this._count = 0,
                this._head = document.querySelector("head")
            }
            validateStyleProperty(t)
            {
                return Zh(t)
            }
            matchesElement(t, e)
            {
                return Qh(t, e)
            }
            containsElement(t, e)
            {
                return Kh(t, e)
            }
            query(t, e, n)
            {
                return Gh(t, e, n)
            }
            computeStyle(t, e, n)
            {
                return window.getComputedStyle(t)[e]
            }
            buildKeyframeElement(t, e, n)
            {
                n = n.map(t => Yh(t));
                let i = `@keyframes ${e} {\n`,
                    s = "";
                n.forEach(t => {
                    s = " ";
                    const e = parseFloat(t.offset);
                    i += `${s}${100 * e}% {\n`,
                    s += " ",
                    Object.keys(t).forEach(e => {
                        const n = t[e];
                        switch (e) {
                        case "offset":
                            return;
                        case "easing":
                            return void (n && (i += `${s}animation-timing-function: ${n};\n`));
                        default:
                            return void (i += `${s}${e}: ${n};\n`)
                        }
                    }),
                    i += `${s}}\n`
                }),
                i += "}\n";
                const r = document.createElement("style");
                return r.textContent = i, r
            }
            animate(t, e, n, i, s, r=[], o)
            {
                const a = r.filter(t => t instanceof Hd),
                    l = {};
                Cu(n, i) && a.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                });
                const c = function(t) {
                    let e = {};
                    return t && (Array.isArray(t) ? t : [t]).forEach(t => {
                        Object.keys(t).forEach(n => {
                            "offset" != n && "easing" != n && (e[n] = t[n])
                        })
                    }), e
                }(e = xu(t, e, l));
                if (0 == n)
                    return new zd(t, c);
                const h = "gen_css_kf_" + this._count++,
                    u = this.buildKeyframeElement(t, h, e);
                document.querySelector("head").appendChild(u);
                const d = Td(t, e),
                    p = new Hd(t, e, h, n, i, s, c, d);
                return p.onDestroy(() => {
                    var t;
                    (t = u).parentNode.removeChild(t)
                }), p
            }
        }
        class qd {
            constructor(t, e, n, i)
            {
                this.element = t,
                this.keyframes = e,
                this.options = n,
                this._specialStyles = i,
                this._onDoneFns = [],
                this._onStartFns = [],
                this._onDestroyFns = [],
                this._initialized = !1,
                this._finished = !1,
                this._started = !1,
                this._destroyed = !1,
                this.time = 0,
                this.parentPlayer = null,
                this.currentSnapshot = {},
                this._duration = n.duration,
                this._delay = n.delay || 0,
                this.time = this._duration + this._delay
            }
            _onFinish()
            {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }
            init()
            {
                this._buildPlayer(),
                this._preparePlayerBeforeStart()
            }
            _buildPlayer()
            {
                if (this._initialized)
                    return;
                this._initialized = !0;
                const t = this.keyframes;
                this.domPlayer = this._triggerWebAnimation(this.element, t, this.options),
                this._finalKeyframe = t.length ? t[t.length - 1] : {},
                this.domPlayer.addEventListener("finish", () => this._onFinish())
            }
            _preparePlayerBeforeStart()
            {
                this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
            }
            _triggerWebAnimation(t, e, n)
            {
                return t.animate(e, n)
            }
            onStart(t)
            {
                this._onStartFns.push(t)
            }
            onDone(t)
            {
                this._onDoneFns.push(t)
            }
            onDestroy(t)
            {
                this._onDestroyFns.push(t)
            }
            play()
            {
                this._buildPlayer(),
                this.hasStarted() || (this._onStartFns.forEach(t => t()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play()
            }
            pause()
            {
                this.init(),
                this.domPlayer.pause()
            }
            finish()
            {
                this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish()
            }
            reset()
            {
                this._resetDomPlayerState(),
                this._destroyed = !1,
                this._finished = !1,
                this._started = !1
            }
            _resetDomPlayerState()
            {
                this.domPlayer && this.domPlayer.cancel()
            }
            restart()
            {
                this.reset(),
                this.play()
            }
            hasStarted()
            {
                return this._started
            }
            destroy()
            {
                this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }
            setPosition(t)
            {
                this.domPlayer.currentTime = t * this.time
            }
            getPosition()
            {
                return this.domPlayer.currentTime / this.time
            }
            get totalTime()
            {
                return this._delay + this._duration
            }
            beforeDestroy()
            {
                const t = {};
                this.hasStarted() && Object.keys(this._finalKeyframe).forEach(e => {
                    "offset" != e && (t[e] = this._finished ? this._finalKeyframe[e] : Su(this.element, e))
                }),
                this.currentSnapshot = t
            }
            triggerCallback(t)
            {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()),
                e.length = 0
            }
        }
        class Wd {
            constructor()
            {
                this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(Ud().toString()),
                this._cssKeyframesDriver = new $d
            }
            validateStyleProperty(t)
            {
                return Zh(t)
            }
            matchesElement(t, e)
            {
                return Qh(t, e)
            }
            containsElement(t, e)
            {
                return Kh(t, e)
            }
            query(t, e, n)
            {
                return Gh(t, e, n)
            }
            computeStyle(t, e, n)
            {
                return window.getComputedStyle(t)[e]
            }
            overrideWebAnimationsSupport(t)
            {
                this._isNativeImpl = t
            }
            animate(t, e, n, i, s, r=[], o)
            {
                if (!o && !this._isNativeImpl)
                    return this._cssKeyframesDriver.animate(t, e, n, i, s, r);
                const a = {
                    duration: n,
                    delay: i,
                    fill: 0 == i ? "both" : "forwards"
                };
                s && (a.easing = s);
                const l = {},
                    c = r.filter(t => t instanceof qd);
                Cu(n, i) && c.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                });
                const h = Td(t, e = xu(t, e = e.map(t => hu(t, !1)), l));
                return new qd(t, e, a, h)
            }
        }
        function Ud() {
            return "undefined" != typeof window && void 0 !== window.document && Element.prototype.animate || {}
        }
        let Zd = (() => {
            class t extends Ch {
                constructor(t, e)
                {
                    super(),
                    this._nextAnimationId = 0,
                    this._renderer = t.createRenderer(e.body, {
                        id: "0",
                        encapsulation: Ct.None,
                        styles: [],
                        data: {
                            animation: []
                        }
                    })
                }
                build(t)
                {
                    const e = this._nextAnimationId.toString();
                    this._nextAnimationId++;
                    const n = Array.isArray(t) ? kh(t) : t;
                    return Gd(this._renderer, null, e, "register", [n]), new Qd(e, this._renderer)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(No), oi(Kl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        class Qd extends class {}
        {
            constructor(t, e)
            {
                super(),
                this._id = t,
                this._renderer = e
            }
            create(t, e)
            {
                return new Kd(this._id, t, e || {}, this._renderer)
            }
        }
        class Kd {
            constructor(t, e, n, i)
            {
                this.id = t,
                this.element = e,
                this._renderer = i,
                this.parentPlayer = null,
                this._started = !1,
                this.totalTime = 0,
                this._command("create", n)
            }
            _listen(t, e)
            {
                return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
            }
            _command(t, ...e)
            {
                return Gd(this._renderer, this.element, this.id, t, e)
            }
            onDone(t)
            {
                this._listen("done", t)
            }
            onStart(t)
            {
                this._listen("start", t)
            }
            onDestroy(t)
            {
                this._listen("destroy", t)
            }
            init()
            {
                this._command("init")
            }
            hasStarted()
            {
                return this._started
            }
            play()
            {
                this._command("play"),
                this._started = !0
            }
            pause()
            {
                this._command("pause")
            }
            restart()
            {
                this._command("restart")
            }
            finish()
            {
                this._command("finish")
            }
            destroy()
            {
                this._command("destroy")
            }
            reset()
            {
                this._command("reset")
            }
            setPosition(t)
            {
                this._command("setPosition", t)
            }
            getPosition()
            {
                var t,
                    e;
                return null !== (e = null === (t = this._renderer.engine.players[+this.id]) || void 0 === t ? void 0 : t.getPosition()) && void 0 !== e ? e : 0
            }
        }
        function Gd(t, e, n, i, s) {
            return t.setProperty(e, `@@${n}:${i}`, s)
        }
        const Yd = "@",
            Xd = "@.disabled";
        let Jd = (() => {
            class t {
                constructor(t, e, n)
                {
                    this.delegate = t,
                    this.engine = e,
                    this._zone = n,
                    this._currentId = 0,
                    this._microtaskId = 1,
                    this._animationCallbacksBuffer = [],
                    this._rendererCache = new Map,
                    this._cdRecurDepth = 0,
                    this.promise = Promise.resolve(0),
                    e.onRemovalComplete = (t, e) => {
                        e && e.parentNode(t) && e.removeChild(t.parentNode, t)
                    }
                }
                createRenderer(t, e)
                {
                    const n = this.delegate.createRenderer(t, e);
                    if (!(t && e && e.data && e.data.animation)) {
                        let t = this._rendererCache.get(n);
                        return t || (t = new tp("", n, this.engine), this._rendererCache.set(n, t)), t
                    }
                    const i = e.id,
                        s = e.id + "-" + this._currentId;
                    this._currentId++,
                    this.engine.register(s, t);
                    const r = e => {
                        Array.isArray(e) ? e.forEach(r) : this.engine.registerTrigger(i, s, t, e.name, e)
                    };
                    return e.data.animation.forEach(r), new ep(this, s, n, this.engine)
                }
                begin()
                {
                    this._cdRecurDepth++,
                    this.delegate.begin && this.delegate.begin()
                }
                _scheduleCountTask()
                {
                    this.promise.then(() => {
                        this._microtaskId++
                    })
                }
                scheduleListenerCallback(t, e, n)
                {
                    t >= 0 && t < this._microtaskId ? this._zone.run(() => e(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
                        this._zone.run(() => {
                            this._animationCallbacksBuffer.forEach(t => {
                                const [e, n] = t;
                                e(n)
                            }),
                            this._animationCallbacksBuffer = []
                        })
                    }), this._animationCallbacksBuffer.push([e, n]))
                }
                end()
                {
                    this._cdRecurDepth--,
                    0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
                        this._scheduleCountTask(),
                        this.engine.flush(this._microtaskId)
                    }),
                    this.delegate.end && this.delegate.end()
                }
                whenRenderingDone()
                {
                    return this.engine.whenRenderingDone()
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(No), oi(Ad), oi(Cl))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        class tp {
            constructor(t, e, n)
            {
                this.namespaceId = t,
                this.delegate = e,
                this.engine = n,
                this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null
            }
            get data()
            {
                return this.delegate.data
            }
            destroy()
            {
                this.engine.destroy(this.namespaceId, this.delegate),
                this.delegate.destroy()
            }
            createElement(t, e)
            {
                return this.delegate.createElement(t, e)
            }
            createComment(t)
            {
                return this.delegate.createComment(t)
            }
            createText(t)
            {
                return this.delegate.createText(t)
            }
            appendChild(t, e)
            {
                this.delegate.appendChild(t, e),
                this.engine.onInsert(this.namespaceId, e, t, !1)
            }
            insertBefore(t, e, n, i=!0)
            {
                this.delegate.insertBefore(t, e, n),
                this.engine.onInsert(this.namespaceId, e, t, i)
            }
            removeChild(t, e, n)
            {
                this.engine.onRemove(this.namespaceId, e, this.delegate, n)
            }
            selectRootElement(t, e)
            {
                return this.delegate.selectRootElement(t, e)
            }
            parentNode(t)
            {
                return this.delegate.parentNode(t)
            }
            nextSibling(t)
            {
                return this.delegate.nextSibling(t)
            }
            setAttribute(t, e, n, i)
            {
                this.delegate.setAttribute(t, e, n, i)
            }
            removeAttribute(t, e, n)
            {
                this.delegate.removeAttribute(t, e, n)
            }
            addClass(t, e)
            {
                this.delegate.addClass(t, e)
            }
            removeClass(t, e)
            {
                this.delegate.removeClass(t, e)
            }
            setStyle(t, e, n, i)
            {
                this.delegate.setStyle(t, e, n, i)
            }
            removeStyle(t, e, n)
            {
                this.delegate.removeStyle(t, e, n)
            }
            setProperty(t, e, n)
            {
                e.charAt(0) == Yd && e == Xd ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n)
            }
            setValue(t, e)
            {
                this.delegate.setValue(t, e)
            }
            listen(t, e, n)
            {
                return this.delegate.listen(t, e, n)
            }
            disableAnimations(t, e)
            {
                this.engine.disableAnimations(t, e)
            }
        }
        class ep extends tp {
            constructor(t, e, n, i)
            {
                super(e, n, i),
                this.factory = t,
                this.namespaceId = e
            }
            setProperty(t, e, n)
            {
                e.charAt(0) == Yd ? "." == e.charAt(1) && e == Xd ? this.disableAnimations(t, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, t, e.substr(1), n) : this.delegate.setProperty(t, e, n)
            }
            listen(t, e, n)
            {
                if (e.charAt(0) == Yd) {
                    const i = function(t) {
                        switch (t) {
                        case "body":
                            return document.body;
                        case "document":
                            return document;
                        case "window":
                            return window;
                        default:
                            return t
                        }
                    }(t);
                    let s = e.substr(1),
                        r = "";
                    return s.charAt(0) != Yd && ([s, r] = function(t) {
                        const e = t.indexOf(".");
                        return [t.substring(0, e), t.substr(e + 1)]
                    }(s)), this.engine.listen(this.namespaceId, i, s, r, t => {
                        this.factory.scheduleListenerCallback(t._data || -1, n, t)
                    })
                }
                return this.delegate.listen(t, e, n)
            }
        }
        let np = (() => {
            class t extends Ad {
                constructor(t, e, n)
                {
                    super(t.body, e, n)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Kl), oi(Jh), oi(Ku))
            }, t.\u0275prov = at({
                token: t,
                factory: t.\u0275fac
            }), t
        })();
        const ip = new qn("AnimationModuleType"),
            sp = [{
                provide: Jh,
                useFactory: function() {
                    return "function" == typeof Ud() ? new Wd : new $d
                }
            }, {
                provide: ip,
                useValue: "BrowserAnimations"
            }, {
                provide: Ch,
                useClass: Zd
            }, {
                provide: Ku,
                useFactory: function() {
                    return new Gu
                }
            }, {
                provide: Ad,
                useClass: np
            }, {
                provide: No,
                useFactory: function(t, e, n) {
                    return new Jd(t, e, n)
                },
                deps: [Kc, Ad, Cl]
            }];
        let rp = (() => {
            class t {}
            return t.\u0275mod = zt({
                type: t
            }), t.\u0275inj = lt({
                factory: function(e) {
                    return new (e || t)
                },
                providers: sp,
                imports: [ah]
            }), t
        })();
        function op(...t) {
            let e = t[t.length - 1];
            return S(e) ? (t.pop(), V(t, e)) : q(t)
        }
        function ap(t, ...e) {
            return e.length ? e.some(e => t[e]) : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey
        }
        function lp() {}
        class cp {
            constructor(t, e, n)
            {
                this.nextOrObserver = t,
                this.error = e,
                this.complete = n
            }
            call(t, e)
            {
                return e.subscribe(new hp(t, this.nextOrObserver, this.error, this.complete))
            }
        }
        class hp extends f {
            constructor(t, e, n, s)
            {
                super(t),
                this._tapNext = lp,
                this._tapError = lp,
                this._tapComplete = lp,
                this._tapError = n || lp,
                this._tapComplete = s || lp,
                i(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || lp, this._tapError = e.error || lp, this._tapComplete = e.complete || lp)
            }
            _next(t)
            {
                try {
                    this._tapNext.call(this._context, t)
                } catch (e) {
                    return void this.destination.error(e)
                }
                this.destination.next(t)
            }
            _error(t)
            {
                try {
                    this._tapError.call(this._context, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.error(t)
            }
            _complete()
            {
                try {
                    this._tapComplete.call(this._context)
                } catch (t) {
                    return void this.destination.error(t)
                }
                return this.destination.complete()
            }
        }
        class up extends u {
            constructor(t, e)
            {
                super()
            }
            schedule(t, e=0)
            {
                return this
            }
        }
        class dp extends up {
            constructor(t, e)
            {
                super(t, e),
                this.scheduler = t,
                this.work = e,
                this.pending = !1
            }
            schedule(t, e=0)
            {
                if (this.closed)
                    return this;
                this.state = t;
                const n = this.id,
                    i = this.scheduler;
                return null != n && (this.id = this.recycleAsyncId(i, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(i, this.id, e), this
            }
            requestAsyncId(t, e, n=0)
            {
                return setInterval(t.flush.bind(t, this), n)
            }
            recycleAsyncId(t, e, n=0)
            {
                if (null !== n && this.delay === n && !1 === this.pending)
                    return e;
                clearInterval(e)
            }
            execute(t, e)
            {
                if (this.closed)
                    return new Error("executing a cancelled action");
                this.pending = !1;
                const n = this._execute(t, e);
                if (n)
                    return n;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }
            _execute(t, e)
            {
                let n,
                    i = !1;
                try {
                    this.work(t)
                } catch (s) {
                    i = !0,
                    n = !!s && s || new Error(s)
                }
                if (i)
                    return this.unsubscribe(), n
            }
            _unsubscribe()
            {
                const t = this.id,
                    e = this.scheduler,
                    n = e.actions,
                    i = n.indexOf(this);
                this.work = null,
                this.state = null,
                this.pending = !1,
                this.scheduler = null,
                -1 !== i && n.splice(i, 1),
                null != t && (this.id = this.recycleAsyncId(e, t, null)),
                this.delay = null
            }
        }
        let pp = (() => {
            class t {
                constructor(e, n=t.now)
                {
                    this.SchedulerAction = e,
                    this.now = n
                }
                schedule(t, e=0, n)
                {
                    return new this.SchedulerAction(this, t).schedule(n, e)
                }
            }
            return t.now = () => Date.now(), t
        })();
        class fp extends pp {
            constructor(t, e=pp.now)
            {
                super(t, () => fp.delegate && fp.delegate !== this ? fp.delegate.now() : e()),
                this.actions = [],
                this.active = !1,
                this.scheduled = void 0
            }
            schedule(t, e=0, n)
            {
                return fp.delegate && fp.delegate !== this ? fp.delegate.schedule(t, e, n) : super.schedule(t, e, n)
            }
            flush(t)
            {
                const {actions: e} = this;
                if (this.active)
                    return void e.push(t);
                let n;
                this.active = !0;
                do {
                    if (n = t.execute(t.state, t.delay))
                        break
                } while (t = e.shift());
                if (this.active = !1, n) {
                    for (; t = e.shift();)
                        t.unsubscribe();
                    throw n
                }
            }
        }
        const mp = new fp(dp);
        function gp(t, e=mp) {
            return n => n.lift(new _p(t, e))
        }
        class _p {
            constructor(t, e)
            {
                this.dueTime = t,
                this.scheduler = e
            }
            call(t, e)
            {
                return e.subscribe(new yp(t, this.dueTime, this.scheduler))
            }
        }
        class yp extends f {
            constructor(t, e, n)
            {
                super(t),
                this.dueTime = e,
                this.scheduler = n,
                this.debouncedSubscription = null,
                this.lastValue = null,
                this.hasValue = !1
            }
            _next(t)
            {
                this.clearDebounce(),
                this.lastValue = t,
                this.hasValue = !0,
                this.add(this.debouncedSubscription = this.scheduler.schedule(bp, this.dueTime, this))
            }
            _complete()
            {
                this.debouncedNext(),
                this.destination.complete()
            }
            debouncedNext()
            {
                if (this.clearDebounce(), this.hasValue) {
                    const {lastValue: t} = this;
                    this.lastValue = null,
                    this.hasValue = !1,
                    this.destination.next(t)
                }
            }
            clearDebounce()
            {
                const t = this.debouncedSubscription;
                null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
            }
        }
        function bp(t) {
            t.debouncedNext()
        }
        function vp(t, e) {
            return function(n) {
                return n.lift(new wp(t, e))
            }
        }
        class wp {
            constructor(t, e)
            {
                this.predicate = t,
                this.thisArg = e
            }
            call(t, e)
            {
                return e.subscribe(new Cp(t, this.predicate, this.thisArg))
            }
        }
        class Cp extends f {
            constructor(t, e, n)
            {
                super(t),
                this.predicate = e,
                this.thisArg = n,
                this.count = 0
            }
            _next(t)
            {
                let e;
                try {
                    e = this.predicate.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                e && this.destination.next(t)
            }
        }
        const xp = (() => {
                function t() {
                    return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
                }
                return t.prototype = Object.create(Error.prototype), t
            })(),
            Ep = new y(t => t.complete());
        function Sp(t) {
            return e => 0 === t ? Ep : e.lift(new kp(t))
        }
        class kp {
            constructor(t)
            {
                if (this.total = t, this.total < 0)
                    throw new xp
            }
            call(t, e)
            {
                return e.subscribe(new Ap(t, this.total))
            }
        }
        class Ap extends f {
            constructor(t, e)
            {
                super(t),
                this.total = e,
                this.count = 0
            }
            _next(t)
            {
                const e = this.total,
                    n = ++this.count;
                n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
            }
        }
        function Tp(t) {
            return null != t && "false" != `${t}`
        }
        function Op(t) {
            return Array.isArray(t) ? t : [t]
        }
        function Ip(t) {
            return null == t ? "" : "string" == typeof t ? t : `${t}px`
        }
        function Pp(t) {
            return t instanceof Fo ? t.nativeElement : t
        }
        let Dp;
        try {
            Dp = "undefined" != typeof Intl && Intl.v8BreakIterator
        } catch (Py) {
            Dp = !1
        }
        let Rp,
            Fp = (() => {
                class t {
                    constructor(t)
                    {
                        this._platformId = t,
                        this.isBrowser = this._platformId ? "browser" === this._platformId : "object" == typeof document && !!document,
                        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent),
                        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent),
                        this.BLINK = this.isBrowser && !(!window.chrome && !Dp) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT,
                        this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT,
                        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window),
                        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent),
                        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT,
                        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(al))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(al))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            Vp = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })();
        const Np = ["color", "button", "checkbox", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];
        function Mp() {
            if (Rp)
                return Rp;
            if ("object" != typeof document || !document)
                return Rp = new Set(Np), Rp;
            let t = document.createElement("input");
            return Rp = new Set(Np.filter(e => (t.setAttribute("type", e), t.type === e))), Rp
        }
        let Lp,
            jp,
            Bp;
        function Hp(t) {
            return function() {
                if (null == Lp && "undefined" != typeof window)
                    try {
                        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                            get: () => Lp = !0
                        }))
                    } finally {
                        Lp = Lp || !1
                    }
                return Lp
            }() ? t : !!t.capture
        }
        function zp() {
            if (null == jp) {
                if ("object" != typeof document || !document)
                    return jp = !1, jp;
                if ("scrollBehavior" in document.documentElement.style)
                    jp = !0;
                else {
                    const t = Element.prototype.scrollTo;
                    jp = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString())
                }
            }
            return jp
        }
        let $p = (() => {
                class t {
                    create(t)
                    {
                        return "undefined" == typeof MutationObserver ? null : new MutationObserver(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            qp = (() => {
                class t {
                    constructor(t)
                    {
                        this._mutationObserverFactory = t,
                        this._observedElements = new Map
                    }
                    ngOnDestroy()
                    {
                        this._observedElements.forEach((t, e) => this._cleanupObserver(e))
                    }
                    observe(t)
                    {
                        const e = Pp(t);
                        return new y(t => {
                            const n = this._observeElement(e).subscribe(t);
                            return () => {
                                n.unsubscribe(),
                                this._unobserveElement(e)
                            }
                        })
                    }
                    _observeElement(t)
                    {
                        if (this._observedElements.has(t))
                            this._observedElements.get(t).count++;
                        else {
                            const e = new x,
                                n = this._mutationObserverFactory.create(t => e.next(t));
                            n && n.observe(t, {
                                characterData: !0,
                                childList: !0,
                                subtree: !0
                            }),
                            this._observedElements.set(t, {
                                observer: n,
                                stream: e,
                                count: 1
                            })
                        }
                        return this._observedElements.get(t).stream
                    }
                    _unobserveElement(t)
                    {
                        this._observedElements.has(t) && (this._observedElements.get(t).count--, this._observedElements.get(t).count || this._cleanupObserver(t))
                    }
                    _cleanupObserver(t)
                    {
                        if (this._observedElements.has(t)) {
                            const {observer: e, stream: n} = this._observedElements.get(t);
                            e && e.disconnect(),
                            n.complete(),
                            this._observedElements.delete(t)
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi($p))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi($p))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            Wp = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this._contentObserver = t,
                        this._elementRef = e,
                        this._ngZone = n,
                        this.event = new Na,
                        this._disabled = !1,
                        this._currentSubscription = null
                    }
                    get disabled()
                    {
                        return this._disabled
                    }
                    set disabled(t)
                    {
                        this._disabled = Tp(t),
                        this._disabled ? this._unsubscribe() : this._subscribe()
                    }
                    get debounce()
                    {
                        return this._debounce
                    }
                    set debounce(t)
                    {
                        this._debounce = function(t, e=0) {
                            return function(t) {
                                return !isNaN(parseFloat(t)) && !isNaN(Number(t))
                            }(t) ? Number(t) : e
                        }(t),
                        this._subscribe()
                    }
                    ngAfterContentInit()
                    {
                        this._currentSubscription || this.disabled || this._subscribe()
                    }
                    ngOnDestroy()
                    {
                        this._unsubscribe()
                    }
                    _subscribe()
                    {
                        this._unsubscribe();
                        const t = this._contentObserver.observe(this._elementRef);
                        this._ngZone.runOutsideAngular(() => {
                            this._currentSubscription = (this.debounce ? t.pipe(gp(this.debounce)) : t).subscribe(this.event)
                        })
                    }
                    _unsubscribe()
                    {
                        var t;
                        null === (t = this._currentSubscription) || void 0 === t || t.unsubscribe()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(qp), Rr(Fo), Rr(Cl))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "cdkObserveContent", ""]],
                    inputs: {
                        disabled: ["cdkObserveContentDisabled", "disabled"],
                        debounce: "debounce"
                    },
                    outputs: {
                        event: "cdkObserveContent"
                    },
                    exportAs: ["cdkObserveContent"]
                }), t
            })(),
            Up = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [$p]
                }), t
            })();
        class Zp extends class {
            constructor(t)
            {
                this._items = t,
                this._activeItemIndex = -1,
                this._activeItem = null,
                this._wrap = !1,
                this._letterKeyStream = new x,
                this._typeaheadSubscription = u.EMPTY,
                this._vertical = !0,
                this._allowedModifierKeys = [],
                this._homeAndEnd = !1,
                this._skipPredicateFn = t => t.disabled,
                this._pressedLetters = [],
                this.tabOut = new x,
                this.change = new x,
                t instanceof La && t.changes.subscribe(t => {
                    if (this._activeItem) {
                        const e = t.toArray().indexOf(this._activeItem);
                        e > -1 && e !== this._activeItemIndex && (this._activeItemIndex = e)
                    }
                })
            }
            skipPredicate(t)
            {
                return this._skipPredicateFn = t, this
            }
            withWrap(t=!0)
            {
                return this._wrap = t, this
            }
            withVerticalOrientation(t=!0)
            {
                return this._vertical = t, this
            }
            withHorizontalOrientation(t)
            {
                return this._horizontal = t, this
            }
            withAllowedModifierKeys(t)
            {
                return this._allowedModifierKeys = t, this
            }
            withTypeAhead(t=200)
            {
                var e;
                return this._typeaheadSubscription.unsubscribe(), this._typeaheadSubscription = this._letterKeyStream.pipe((e = t => this._pressedLetters.push(t), function(t) {
                    return t.lift(new cp(e, void 0, void 0))
                }), gp(t), vp(() => this._pressedLetters.length > 0), k(() => this._pressedLetters.join(""))).subscribe(t => {
                    const e = this._getItemsArray();
                    for (let n = 1; n < e.length + 1; n++) {
                        const i = (this._activeItemIndex + n) % e.length,
                            s = e[i];
                        if (!this._skipPredicateFn(s) && 0 === s.getLabel().toUpperCase().trim().indexOf(t)) {
                            this.setActiveItem(i);
                            break
                        }
                    }
                    this._pressedLetters = []
                }), this
            }
            withHomeAndEnd(t=!0)
            {
                return this._homeAndEnd = t, this
            }
            setActiveItem(t)
            {
                const e = this._activeItem;
                this.updateActiveItem(t),
                this._activeItem !== e && this.change.next(this._activeItemIndex)
            }
            onKeydown(t)
            {
                const e = t.keyCode,
                    n = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(e => !t[e] || this._allowedModifierKeys.indexOf(e) > -1);
                switch (e) {
                case 9:
                    return void this.tabOut.next();
                case 40:
                    if (this._vertical && n) {
                        this.setNextItemActive();
                        break
                    }
                    return;
                case 38:
                    if (this._vertical && n) {
                        this.setPreviousItemActive();
                        break
                    }
                    return;
                case 39:
                    if (this._horizontal && n) {
                        "rtl" === this._horizontal ? this.setPreviousItemActive() : this.setNextItemActive();
                        break
                    }
                    return;
                case 37:
                    if (this._horizontal && n) {
                        "rtl" === this._horizontal ? this.setNextItemActive() : this.setPreviousItemActive();
                        break
                    }
                    return;
                case 36:
                    if (this._homeAndEnd && n) {
                        this.setFirstItemActive();
                        break
                    }
                    return;
                case 35:
                    if (this._homeAndEnd && n) {
                        this.setLastItemActive();
                        break
                    }
                    return;
                default:
                    return void ((n || ap(t, "shiftKey")) && (t.key && 1 === t.key.length ? this._letterKeyStream.next(t.key.toLocaleUpperCase()) : (e >= 65 && e <= 90 || e >= 48 && e <= 57) && this._letterKeyStream.next(String.fromCharCode(e))))
                }
                this._pressedLetters = [],
                t.preventDefault()
            }
            get activeItemIndex()
            {
                return this._activeItemIndex
            }
            get activeItem()
            {
                return this._activeItem
            }
            isTyping()
            {
                return this._pressedLetters.length > 0
            }
            setFirstItemActive()
            {
                this._setActiveItemByIndex(0, 1)
            }
            setLastItemActive()
            {
                this._setActiveItemByIndex(this._items.length - 1, -1)
            }
            setNextItemActive()
            {
                this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1)
            }
            setPreviousItemActive()
            {
                this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1)
            }
            updateActiveItem(t)
            {
                const e = this._getItemsArray(),
                    n = "number" == typeof t ? t : e.indexOf(t),
                    i = e[n];
                this._activeItem = null == i ? null : i,
                this._activeItemIndex = n
            }
            _setActiveItemByDelta(t)
            {
                this._wrap ? this._setActiveInWrapMode(t) : this._setActiveInDefaultMode(t)
            }
            _setActiveInWrapMode(t)
            {
                const e = this._getItemsArray();
                for (let n = 1; n <= e.length; n++) {
                    const i = (this._activeItemIndex + t * n + e.length) % e.length;
                    if (!this._skipPredicateFn(e[i]))
                        return void this.setActiveItem(i)
                }
            }
            _setActiveInDefaultMode(t)
            {
                this._setActiveItemByIndex(this._activeItemIndex + t, t)
            }
            _setActiveItemByIndex(t, e)
            {
                const n = this._getItemsArray();
                if (n[t]) {
                    for (; this._skipPredicateFn(n[t]);)
                        if (!n[t += e])
                            return;
                    this.setActiveItem(t)
                }
            }
            _getItemsArray()
            {
                return this._items instanceof La ? this._items.toArray() : this._items
            }
        }
        {
            constructor()
            {
                super(...arguments),
                this._origin = "program"
            }
            setFocusOrigin(t)
            {
                return this._origin = t, this
            }
            setActiveItem(t)
            {
                super.setActiveItem(t),
                this.activeItem && this.activeItem.focus(this._origin)
            }
        }
        function Qp(t) {
            return 0 === t.buttons
        }
        "undefined" != typeof Element && Element;
        const Kp = new qn("cdk-focus-monitor-default-options"),
            Gp = Hp({
                passive: !0,
                capture: !0
            });
        let Yp = (() => {
            class t {
                constructor(t, e, n, i)
                {
                    this._ngZone = t,
                    this._platform = e,
                    this._origin = null,
                    this._windowFocused = !1,
                    this._elementInfo = new Map,
                    this._monitoredElementCount = 0,
                    this._rootNodeFocusListenerCount = new Map,
                    this._documentKeydownListener = () => {
                        this._lastTouchTarget = null,
                        this._setOriginForCurrentEventQueue("keyboard")
                    },
                    this._documentMousedownListener = t => {
                        if (!this._lastTouchTarget) {
                            const e = Qp(t) ? "keyboard" : "mouse";
                            this._setOriginForCurrentEventQueue(e)
                        }
                    },
                    this._documentTouchstartListener = t => {
                        null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId),
                        this._lastTouchTarget = Xp(t),
                        this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, 650)
                    },
                    this._windowFocusListener = () => {
                        this._windowFocused = !0,
                        this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = !1)
                    },
                    this._rootNodeFocusAndBlurListener = t => {
                        const e = Xp(t),
                            n = "focus" === t.type ? this._onFocus : this._onBlur;
                        for (let i = e; i; i = i.parentElement)
                            n.call(this, t, i)
                    },
                    this._document = n,
                    this._detectionMode = (null == i ? void 0 : i.detectionMode) || 0
                }
                monitor(t, e=!1)
                {
                    const n = Pp(t);
                    if (!this._platform.isBrowser || 1 !== n.nodeType)
                        return op(null);
                    const i = function(t) {
                            if (function() {
                                if (null == Bp) {
                                    const t = "undefined" != typeof document ? document.head : null;
                                    Bp = !(!t || !t.createShadowRoot && !t.attachShadow)
                                }
                                return Bp
                            }()) {
                                const e = t.getRootNode ? t.getRootNode() : null;
                                if ("undefined" != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot)
                                    return e
                            }
                            return null
                        }(n) || this._getDocument(),
                        s = this._elementInfo.get(n);
                    if (s)
                        return e && (s.checkChildren = !0), s.subject;
                    const r = {
                        checkChildren: e,
                        subject: new x,
                        rootNode: i
                    };
                    return this._elementInfo.set(n, r), this._registerGlobalListeners(r), r.subject
                }
                stopMonitoring(t)
                {
                    const e = Pp(t),
                        n = this._elementInfo.get(e);
                    n && (n.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._removeGlobalListeners(n))
                }
                focusVia(t, e, n)
                {
                    const i = Pp(t);
                    i === this._getDocument().activeElement ? this._getClosestElementsInfo(i).forEach(([t, n]) => this._originChanged(t, e, n)) : (this._setOriginForCurrentEventQueue(e), "function" == typeof i.focus && i.focus(n))
                }
                ngOnDestroy()
                {
                    this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
                }
                _getDocument()
                {
                    return this._document || document
                }
                _getWindow()
                {
                    return this._getDocument().defaultView || window
                }
                _toggleClass(t, e, n)
                {
                    n ? t.classList.add(e) : t.classList.remove(e)
                }
                _getFocusOrigin(t)
                {
                    return this._origin ? this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(t) ? "touch" : "program"
                }
                _setClasses(t, e)
                {
                    this._toggleClass(t, "cdk-focused", !!e),
                    this._toggleClass(t, "cdk-touch-focused", "touch" === e),
                    this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
                    this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
                    this._toggleClass(t, "cdk-program-focused", "program" === e)
                }
                _setOriginForCurrentEventQueue(t)
                {
                    this._ngZone.runOutsideAngular(() => {
                        this._origin = t,
                        0 === this._detectionMode && (this._originTimeoutId = setTimeout(() => this._origin = null, 1))
                    })
                }
                _wasCausedByTouch(t)
                {
                    const e = Xp(t);
                    return this._lastTouchTarget instanceof Node && e instanceof Node && (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
                }
                _onFocus(t, e)
                {
                    const n = this._elementInfo.get(e);
                    n && (n.checkChildren || e === Xp(t)) && this._originChanged(e, this._getFocusOrigin(t), n)
                }
                _onBlur(t, e)
                {
                    const n = this._elementInfo.get(e);
                    !n || n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget) || (this._setClasses(e), this._emitOrigin(n.subject, null))
                }
                _emitOrigin(t, e)
                {
                    this._ngZone.run(() => t.next(e))
                }
                _registerGlobalListeners(t)
                {
                    if (!this._platform.isBrowser)
                        return;
                    const e = t.rootNode,
                        n = this._rootNodeFocusListenerCount.get(e) || 0;
                    n || this._ngZone.runOutsideAngular(() => {
                        e.addEventListener("focus", this._rootNodeFocusAndBlurListener, Gp),
                        e.addEventListener("blur", this._rootNodeFocusAndBlurListener, Gp)
                    }),
                    this._rootNodeFocusListenerCount.set(e, n + 1),
                    1 == ++this._monitoredElementCount && this._ngZone.runOutsideAngular(() => {
                        const t = this._getDocument(),
                            e = this._getWindow();
                        t.addEventListener("keydown", this._documentKeydownListener, Gp),
                        t.addEventListener("mousedown", this._documentMousedownListener, Gp),
                        t.addEventListener("touchstart", this._documentTouchstartListener, Gp),
                        e.addEventListener("focus", this._windowFocusListener)
                    })
                }
                _removeGlobalListeners(t)
                {
                    const e = t.rootNode;
                    if (this._rootNodeFocusListenerCount.has(e)) {
                        const t = this._rootNodeFocusListenerCount.get(e);
                        t > 1 ? this._rootNodeFocusListenerCount.set(e, t - 1) : (e.removeEventListener("focus", this._rootNodeFocusAndBlurListener, Gp), e.removeEventListener("blur", this._rootNodeFocusAndBlurListener, Gp), this._rootNodeFocusListenerCount.delete(e))
                    }
                    if (!--this._monitoredElementCount) {
                        const t = this._getDocument(),
                            e = this._getWindow();
                        t.removeEventListener("keydown", this._documentKeydownListener, Gp),
                        t.removeEventListener("mousedown", this._documentMousedownListener, Gp),
                        t.removeEventListener("touchstart", this._documentTouchstartListener, Gp),
                        e.removeEventListener("focus", this._windowFocusListener),
                        clearTimeout(this._windowFocusTimeoutId),
                        clearTimeout(this._touchTimeoutId),
                        clearTimeout(this._originTimeoutId)
                    }
                }
                _originChanged(t, e, n)
                {
                    this._setClasses(t, e),
                    this._emitOrigin(n.subject, e),
                    this._lastFocusOrigin = e
                }
                _getClosestElementsInfo(t)
                {
                    const e = [];
                    return this._elementInfo.forEach((n, i) => {
                        (i === t || n.checkChildren && i.contains(t)) && e.push([i, n])
                    }), e
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Cl), oi(Fp), oi(Kl, 8), oi(Kp, 8))
            }, t.\u0275prov = at({
                factory: function() {
                    return new t(oi(Cl), oi(Fp), oi(Kl, 8), oi(Kp, 8))
                },
                token: t,
                providedIn: "root"
            }), t
        })();
        function Xp(t) {
            return t.composedPath ? t.composedPath()[0] : t.target
        }
        const Jp = "cdk-high-contrast-black-on-white",
            tf = "cdk-high-contrast-white-on-black",
            ef = "cdk-high-contrast-active";
        let nf = (() => {
            class t {
                constructor(t, e)
                {
                    this._platform = t,
                    this._document = e
                }
                getHighContrastMode()
                {
                    if (!this._platform.isBrowser)
                        return 0;
                    const t = this._document.createElement("div");
                    t.style.backgroundColor = "rgb(1,2,3)",
                    t.style.position = "absolute",
                    this._document.body.appendChild(t);
                    const e = this._document.defaultView || window,
                        n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                        i = (n && n.backgroundColor || "").replace(/ /g, "");
                    switch (this._document.body.removeChild(t), i) {
                    case "rgb(0,0,0)":
                        return 2;
                    case "rgb(255,255,255)":
                        return 1
                    }
                    return 0
                }
                _applyBodyHighContrastModeCssClasses()
                {
                    if (this._platform.isBrowser && this._document.body) {
                        const t = this._document.body.classList;
                        t.remove(ef),
                        t.remove(Jp),
                        t.remove(tf);
                        const e = this.getHighContrastMode();
                        1 === e ? (t.add(ef), t.add(Jp)) : 2 === e && (t.add(ef), t.add(tf))
                    }
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Fp), oi(Kl))
            }, t.\u0275prov = at({
                factory: function() {
                    return new t(oi(Fp), oi(Kl))
                },
                token: t,
                providedIn: "root"
            }), t
        })();
        const sf = new qn("cdk-dir-doc", {
            providedIn: "root",
            factory: function() {
                return ai(Kl)
            }
        });
        let rf = (() => {
                class t {
                    constructor(t)
                    {
                        if (this.value = "ltr", this.change = new Na, t) {
                            const e = t.documentElement ? t.documentElement.dir : null,
                                n = (t.body ? t.body.dir : null) || e;
                            this.value = "ltr" === n || "rtl" === n ? n : "ltr"
                        }
                    }
                    ngOnDestroy()
                    {
                        this.change.complete()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(sf, 8))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(sf, 8))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            of = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })();
        const af = new Bo("11.2.0");
        function lf(...t) {
            return $(1)(op(...t))
        }
        function cf(...t) {
            const e = t[t.length - 1];
            return S(e) ? (t.pop(), n => lf(t, n, e)) : e => lf(t, e)
        }
        const hf = new Bo("11.2.0"),
            uf = new qn("mat-sanity-checks", {
                providedIn: "root",
                factory: function() {
                    return !0
                }
            });
        let df,
            pf = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this._hasDoneGlobalChecks = !1,
                        this._document = n,
                        t._applyBodyHighContrastModeCssClasses(),
                        this._sanityChecks = e,
                        this._hasDoneGlobalChecks || (this._checkDoctypeIsDefined(), this._checkThemeIsPresent(), this._checkCdkVersionMatch(), this._hasDoneGlobalChecks = !0)
                    }
                    _getWindow()
                    {
                        const t = this._document.defaultView || window;
                        return "object" == typeof t && t ? t : null
                    }
                    _checksAreEnabled()
                    {
                        return Nl() && !this._isTestEnv()
                    }
                    _isTestEnv()
                    {
                        const t = this._getWindow();
                        return t && (t.__karma__ || t.jasmine)
                    }
                    _checkDoctypeIsDefined()
                    {
                        this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.doctype) && !this._document.doctype && console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")
                    }
                    _checkThemeIsPresent()
                    {
                        if (!this._checksAreEnabled() || !1 === this._sanityChecks || !this._sanityChecks.theme || !this._document.body || "function" != typeof getComputedStyle)
                            return;
                        const t = this._document.createElement("div");
                        t.classList.add("mat-theme-loaded-marker"),
                        this._document.body.appendChild(t);
                        const e = getComputedStyle(t);
                        e && "none" !== e.display && console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"),
                        this._document.body.removeChild(t)
                    }
                    _checkCdkVersionMatch()
                    {
                        this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.version) && hf.full !== af.full && console.warn("The Angular Material version (" + hf.full + ") does not match the Angular CDK version (" + af.full + ").\nPlease ensure the versions of these two packages exactly match.")
                    }
                }
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)(oi(nf), oi(uf, 8), oi(Kl))
                    },
                    imports: [[of], of]
                }), t
            })();
        function ff(t) {
            return class  extends t{
                constructor(...t)
                {
                    super(...t),
                    this._disabled = !1
                }
                get disabled()
                {
                    return this._disabled
                }
                set disabled(t)
                {
                    this._disabled = Tp(t)
                }
            }
        }
        function mf(t, e) {
            return class  extends t{
                constructor(...t)
                {
                    super(...t),
                    this.defaultColor = e,
                    this.color = e
                }
                get color()
                {
                    return this._color
                }
                set color(t)
                {
                    const e = t || this.defaultColor;
                    e !== this._color && (this._color && this._elementRef.nativeElement.classList.remove(`mat-${this._color}`), e && this._elementRef.nativeElement.classList.add(`mat-${e}`), this._color = e)
                }
            }
        }
        function gf(t) {
            return class  extends t{
                constructor(...t)
                {
                    super(...t),
                    this._disableRipple = !1
                }
                get disableRipple()
                {
                    return this._disableRipple
                }
                set disableRipple(t)
                {
                    this._disableRipple = Tp(t)
                }
            }
        }
        function _f(t) {
            return class  extends t{
                constructor(...t)
                {
                    super(...t),
                    this.errorState = !1,
                    this.stateChanges = new x
                }
                updateErrorState()
                {
                    const t = this.errorState,
                        e = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
                    e !== t && (this.errorState = e, this.stateChanges.next())
                }
            }
        }
        try {
            df = "undefined" != typeof Intl
        } catch (Py) {
            df = !1
        }
        let yf = (() => {
            class t {
                isErrorState(t, e)
                {
                    return !!(t && t.invalid && (t.touched || e && e.submitted))
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275prov = at({
                factory: function() {
                    return new t
                },
                token: t,
                providedIn: "root"
            }), t
        })();
        class bf {
            constructor(t, e, n)
            {
                this._renderer = t,
                this.element = e,
                this.config = n,
                this.state = 3
            }
            fadeOut()
            {
                this._renderer.fadeOutRipple(this)
            }
        }
        const vf = {
                enterDuration: 450,
                exitDuration: 400
            },
            wf = Hp({
                passive: !0
            }),
            Cf = ["mousedown", "touchstart"],
            xf = ["mouseup", "mouseleave", "touchend", "touchcancel"];
        class Ef {
            constructor(t, e, n, i)
            {
                this._target = t,
                this._ngZone = e,
                this._isPointerDown = !1,
                this._activeRipples = new Set,
                this._pointerUpEventsRegistered = !1,
                i.isBrowser && (this._containerElement = Pp(n))
            }
            fadeInRipple(t, e, n={})
            {
                const i = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
                    s = Object.assign(Object.assign({}, vf), n.animation);
                n.centered && (t = i.left + i.width / 2, e = i.top + i.height / 2);
                const r = n.radius || function(t, e, n) {
                        const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                            s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                        return Math.sqrt(i * i + s * s)
                    }(t, e, i),
                    o = t - i.left,
                    a = e - i.top,
                    l = s.enterDuration,
                    c = document.createElement("div");
                c.classList.add("mat-ripple-element"),
                c.style.left = o - r + "px",
                c.style.top = a - r + "px",
                c.style.height = 2 * r + "px",
                c.style.width = 2 * r + "px",
                null != n.color && (c.style.backgroundColor = n.color),
                c.style.transitionDuration = `${l}ms`,
                this._containerElement.appendChild(c),
                window.getComputedStyle(c).getPropertyValue("opacity"),
                c.style.transform = "scale(1)";
                const h = new bf(this, c, n);
                return h.state = 0, this._activeRipples.add(h), n.persistent || (this._mostRecentTransientRipple = h), this._runTimeoutOutsideZone(() => {
                    const t = h === this._mostRecentTransientRipple;
                    h.state = 1,
                    n.persistent || t && this._isPointerDown || h.fadeOut()
                }, l), h
            }
            fadeOutRipple(t)
            {
                const e = this._activeRipples.delete(t);
                if (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), this._activeRipples.size || (this._containerRect = null), !e)
                    return;
                const n = t.element,
                    i = Object.assign(Object.assign({}, vf), t.config.animation);
                n.style.transitionDuration = `${i.exitDuration}ms`,
                n.style.opacity = "0",
                t.state = 2,
                this._runTimeoutOutsideZone(() => {
                    t.state = 3,
                    n.parentNode.removeChild(n)
                }, i.exitDuration)
            }
            fadeOutAll()
            {
                this._activeRipples.forEach(t => t.fadeOut())
            }
            setupTriggerEvents(t)
            {
                const e = Pp(t);
                e && e !== this._triggerElement && (this._removeTriggerEvents(), this._triggerElement = e, this._registerEvents(Cf))
            }
            handleEvent(t)
            {
                "mousedown" === t.type ? this._onMousedown(t) : "touchstart" === t.type ? this._onTouchStart(t) : this._onPointerUp(),
                this._pointerUpEventsRegistered || (this._registerEvents(xf), this._pointerUpEventsRegistered = !0)
            }
            _onMousedown(t)
            {
                const e = Qp(t),
                    n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
                this._target.rippleDisabled || e || n || (this._isPointerDown = !0, this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig))
            }
            _onTouchStart(t)
            {
                if (!this._target.rippleDisabled) {
                    this._lastTouchStartEvent = Date.now(),
                    this._isPointerDown = !0;
                    const e = t.changedTouches;
                    for (let t = 0; t < e.length; t++)
                        this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig)
                }
            }
            _onPointerUp()
            {
                this._isPointerDown && (this._isPointerDown = !1, this._activeRipples.forEach(t => {
                    !t.config.persistent && (1 === t.state || t.config.terminateOnPointerUp && 0 === t.state) && t.fadeOut()
                }))
            }
            _runTimeoutOutsideZone(t, e=0)
            {
                this._ngZone.runOutsideAngular(() => setTimeout(t, e))
            }
            _registerEvents(t)
            {
                this._ngZone.runOutsideAngular(() => {
                    t.forEach(t => {
                        this._triggerElement.addEventListener(t, this, wf)
                    })
                })
            }
            _removeTriggerEvents()
            {
                this._triggerElement && (Cf.forEach(t => {
                    this._triggerElement.removeEventListener(t, this, wf)
                }), this._pointerUpEventsRegistered && xf.forEach(t => {
                    this._triggerElement.removeEventListener(t, this, wf)
                }))
            }
        }
        const Sf = new qn("mat-ripple-global-options");
        let kf = (() => {
                class t {
                    constructor(t, e, n, i, s)
                    {
                        this._elementRef = t,
                        this._animationMode = s,
                        this.radius = 0,
                        this._disabled = !1,
                        this._isInitialized = !1,
                        this._globalOptions = i || {},
                        this._rippleRenderer = new Ef(this, e, t, n)
                    }
                    get disabled()
                    {
                        return this._disabled
                    }
                    set disabled(t)
                    {
                        this._disabled = t,
                        this._setupTriggerEventsIfEnabled()
                    }
                    get trigger()
                    {
                        return this._trigger || this._elementRef.nativeElement
                    }
                    set trigger(t)
                    {
                        this._trigger = t,
                        this._setupTriggerEventsIfEnabled()
                    }
                    ngOnInit()
                    {
                        this._isInitialized = !0,
                        this._setupTriggerEventsIfEnabled()
                    }
                    ngOnDestroy()
                    {
                        this._rippleRenderer._removeTriggerEvents()
                    }
                    fadeOutAll()
                    {
                        this._rippleRenderer.fadeOutAll()
                    }
                    get rippleConfig()
                    {
                        return {
                            centered: this.centered,
                            radius: this.radius,
                            color: this.color,
                            animation: Object.assign(Object.assign(Object.assign({}, this._globalOptions.animation), "NoopAnimations" === this._animationMode ? {
                                enterDuration: 0,
                                exitDuration: 0
                            } : {}), this.animation),
                            terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
                        }
                    }
                    get rippleDisabled()
                    {
                        return this.disabled || !!this._globalOptions.disabled
                    }
                    _setupTriggerEventsIfEnabled()
                    {
                        !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
                    }
                    launch(t, e=0, n)
                    {
                        return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, e, Object.assign(Object.assign({}, this.rippleConfig), n)) : this._rippleRenderer.fadeInRipple(0, 0, Object.assign(Object.assign({}, this.rippleConfig), t))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Fo), Rr(Cl), Rr(Fp), Rr(Sf, 8), Rr(ip, 8))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
                    hostAttrs: [1, "mat-ripple"],
                    hostVars: 2,
                    hostBindings: function(t, e) {
                        2 & t && to("mat-ripple-unbounded", e.unbounded)
                    },
                    inputs: {
                        radius: ["matRippleRadius", "radius"],
                        disabled: ["matRippleDisabled", "disabled"],
                        trigger: ["matRippleTrigger", "trigger"],
                        color: ["matRippleColor", "color"],
                        unbounded: ["matRippleUnbounded", "unbounded"],
                        centered: ["matRippleCentered", "centered"],
                        animation: ["matRippleAnimation", "animation"]
                    },
                    exportAs: ["matRipple"]
                }), t
            })(),
            Af = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[pf, Vp], pf]
                }), t
            })(),
            Tf = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[pf]]
                }), t
            })(),
            Of = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Af, Rc, pf, Tf]]
                }), t
            })();
        function If(t, e) {
            return new y(n => {
                const i = t.length;
                if (0 === i)
                    return void n.complete();
                const s = new Array(i);
                let r = 0,
                    o = 0;
                for (let a = 0; a < i; a++) {
                    const l = N(t[a]);
                    let c = !1;
                    n.add(l.subscribe({
                        next: t => {
                            c || (c = !0, o++),
                            s[a] = t
                        },
                        error: t => n.error(t),
                        complete: () => {
                            r++,
                            r !== i && c || (o === i && n.next(e ? e.reduce((t, e, n) => (t[e] = s[n], t), {}) : s), n.complete())
                        }
                    }))
                }
            })
        }
        const Pf = new qn("NgValueAccessor"),
            Df = {
                provide: Pf,
                useExisting: st(() => Rf),
                multi: !0
            };
        let Rf = (() => {
            class t {
                constructor(t, e)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this.onChange = t => {},
                    this.onTouched = () => {}
                }
                writeValue(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "checked", t)
                }
                registerOnChange(t)
                {
                    this.onChange = t
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("change", function(t) {
                        return e.onChange(t.target.checked)
                    })("blur", function() {
                        return e.onTouched()
                    })
                },
                features: [Ao([Df])]
            }), t
        })();
        const Ff = {
                provide: Pf,
                useExisting: st(() => Nf),
                multi: !0
            },
            Vf = new qn("CompositionEventMode");
        let Nf = (() => {
            class t {
                constructor(t, e, n)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this._compositionMode = n,
                    this.onChange = t => {},
                    this.onTouched = () => {},
                    this._composing = !1,
                    null == this._compositionMode && (this._compositionMode = !function() {
                        const t = Ql() ? Ql().getUserAgent() : "";
                        return /android (\d+)/.test(t.toLowerCase())
                    }())
                }
                writeValue(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "value", null == t ? "" : t)
                }
                registerOnChange(t)
                {
                    this.onChange = t
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
                _handleInput(t)
                {
                    (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                }
                _compositionStart()
                {
                    this._composing = !0
                }
                _compositionEnd(t)
                {
                    this._composing = !1,
                    this._compositionMode && this.onChange(t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo), Rr(Vf, 8))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("input", function(t) {
                        return e._handleInput(t.target.value)
                    })("blur", function() {
                        return e.onTouched()
                    })("compositionstart", function() {
                        return e._compositionStart()
                    })("compositionend", function(t) {
                        return e._compositionEnd(t.target.value)
                    })
                },
                features: [Ao([Ff])]
            }), t
        })();
        function Mf(t) {
            return null == t || 0 === t.length
        }
        function Lf(t) {
            return null != t && "number" == typeof t.length
        }
        const jf = new qn("NgValidators"),
            Bf = new qn("NgAsyncValidators"),
            Hf = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        class zf {
            static min(t)
            {
                return e => {
                    if (Mf(e.value) || Mf(t))
                        return null;
                    const n = parseFloat(e.value);
                    return !isNaN(n) && n < t ? {
                        min: {
                            min: t,
                            actual: e.value
                        }
                    } : null
                }
            }
            static max(t)
            {
                return e => {
                    if (Mf(e.value) || Mf(t))
                        return null;
                    const n = parseFloat(e.value);
                    return !isNaN(n) && n > t ? {
                        max: {
                            max: t,
                            actual: e.value
                        }
                    } : null
                }
            }
            static required(t)
            {
                return Mf(t.value) ? {
                    required: !0
                } : null
            }
            static requiredTrue(t)
            {
                return !0 === t.value ? null : {
                    required: !0
                }
            }
            static email(t)
            {
                return Mf(t.value) || Hf.test(t.value) ? null : {
                    email: !0
                }
            }
            static minLength(t)
            {
                return e => Mf(e.value) || !Lf(e.value) ? null : e.value.length < t ? {
                    minlength: {
                        requiredLength: t,
                        actualLength: e.value.length
                    }
                } : null
            }
            static maxLength(t)
            {
                return e => Lf(e.value) && e.value.length > t ? {
                    maxlength: {
                        requiredLength: t,
                        actualLength: e.value.length
                    }
                } : null
            }
            static pattern(t)
            {
                if (!t)
                    return zf.nullValidator;
                let e,
                    n;
                return "string" == typeof t ? (n = "", "^" !== t.charAt(0) && (n += "^"), n += t, "$" !== t.charAt(t.length - 1) && (n += "$"), e = new RegExp(n)) : (n = t.toString(), e = t), t => {
                    if (Mf(t.value))
                        return null;
                    const i = t.value;
                    return e.test(i) ? null : {
                        pattern: {
                            requiredPattern: n,
                            actualValue: i
                        }
                    }
                }
            }
            static nullValidator(t)
            {
                return null
            }
            static compose(t)
            {
                if (!t)
                    return null;
                const e = t.filter($f);
                return 0 == e.length ? null : function(t) {
                    return Wf(Uf(t, e))
                }
            }
            static composeAsync(t)
            {
                if (!t)
                    return null;
                const e = t.filter($f);
                return 0 == e.length ? null : function(t) {
                    return function(...t) {
                        if (1 === t.length) {
                            const e = t[0];
                            if (l(e))
                                return If(e, null);
                            if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                                const t = Object.keys(e);
                                return If(t.map(t => e[t]), t)
                            }
                        }
                        if ("function" == typeof t[t.length - 1]) {
                            const e = t.pop();
                            return If(t = 1 === t.length && l(t[0]) ? t[0] : t, null).pipe(k(t => e(...t)))
                        }
                        return If(t, null)
                    }(Uf(t, e).map(qf)).pipe(k(Wf))
                }
            }
        }
        function $f(t) {
            return null != t
        }
        function qf(t) {
            const e = zr(t) ? N(t) : t;
            return e, e
        }
        function Wf(t) {
            let e = {};
            return t.forEach(t => {
                e = null != t ? Object.assign(Object.assign({}, e), t) : e
            }), 0 === Object.keys(e).length ? null : e
        }
        function Uf(t, e) {
            return e.map(e => e(t))
        }
        function Zf(t) {
            return t.map(t => function(t) {
                return !t.validate
            }(t) ? t : e => t.validate(e))
        }
        function Qf(t) {
            return null != t ? zf.compose(Zf(t)) : null
        }
        function Kf(t) {
            return null != t ? zf.composeAsync(Zf(t)) : null
        }
        function Gf(t, e) {
            return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e]
        }
        function Yf(t) {
            return t._rawValidators
        }
        function Xf(t) {
            return t._rawAsyncValidators
        }
        let Jf = (() => {
                class t {
                    constructor()
                    {
                        this._rawValidators = [],
                        this._rawAsyncValidators = [],
                        this._onDestroyCallbacks = []
                    }
                    get value()
                    {
                        return this.control ? this.control.value : null
                    }
                    get valid()
                    {
                        return this.control ? this.control.valid : null
                    }
                    get invalid()
                    {
                        return this.control ? this.control.invalid : null
                    }
                    get pending()
                    {
                        return this.control ? this.control.pending : null
                    }
                    get disabled()
                    {
                        return this.control ? this.control.disabled : null
                    }
                    get enabled()
                    {
                        return this.control ? this.control.enabled : null
                    }
                    get errors()
                    {
                        return this.control ? this.control.errors : null
                    }
                    get pristine()
                    {
                        return this.control ? this.control.pristine : null
                    }
                    get dirty()
                    {
                        return this.control ? this.control.dirty : null
                    }
                    get touched()
                    {
                        return this.control ? this.control.touched : null
                    }
                    get status()
                    {
                        return this.control ? this.control.status : null
                    }
                    get untouched()
                    {
                        return this.control ? this.control.untouched : null
                    }
                    get statusChanges()
                    {
                        return this.control ? this.control.statusChanges : null
                    }
                    get valueChanges()
                    {
                        return this.control ? this.control.valueChanges : null
                    }
                    get path()
                    {
                        return null
                    }
                    _setValidators(t)
                    {
                        this._rawValidators = t || [],
                        this._composedValidatorFn = Qf(this._rawValidators)
                    }
                    _setAsyncValidators(t)
                    {
                        this._rawAsyncValidators = t || [],
                        this._composedAsyncValidatorFn = Kf(this._rawAsyncValidators)
                    }
                    get validator()
                    {
                        return this._composedValidatorFn || null
                    }
                    get asyncValidator()
                    {
                        return this._composedAsyncValidatorFn || null
                    }
                    _registerOnDestroy(t)
                    {
                        this._onDestroyCallbacks.push(t)
                    }
                    _invokeOnDestroyCallbacks()
                    {
                        this._onDestroyCallbacks.forEach(t => t()),
                        this._onDestroyCallbacks = []
                    }
                    reset(t)
                    {
                        this.control && this.control.reset(t)
                    }
                    hasError(t, e)
                    {
                        return !!this.control && this.control.hasError(t, e)
                    }
                    getError(t, e)
                    {
                        return this.control ? this.control.getError(t, e) : null
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t
                }), t
            })(),
            tm = (() => {
                class t extends Jf {
                    get formDirective()
                    {
                        return null
                    }
                    get path()
                    {
                        return null
                    }
                }
                return t.\u0275fac = function(e) {
                    return em(e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    features: [vr]
                }), t
            })();
        const em = Hn(tm);
        class nm extends Jf {
            constructor()
            {
                super(...arguments),
                this._parent = null,
                this.name = null,
                this.valueAccessor = null
            }
        }
        let im = (() => {
            class t extends class {
                constructor(t)
                {
                    this._cd = t
                }
                is(t)
                {
                    var e,
                        n;
                    return !!(null === (n = null === (e = this._cd) || void 0 === e ? void 0 : e.control) || void 0 === n ? void 0 : n[t])
                }
            }
            {
                constructor(t)
                {
                    super(t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(nm, 2))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
                hostVars: 14,
                hostBindings: function(t, e) {
                    2 & t && to("ng-untouched", e.is("untouched"))("ng-touched", e.is("touched"))("ng-pristine", e.is("pristine"))("ng-dirty", e.is("dirty"))("ng-valid", e.is("valid"))("ng-invalid", e.is("invalid"))("ng-pending", e.is("pending"))
                },
                features: [vr]
            }), t
        })();
        const sm = {
            provide: Pf,
            useExisting: st(() => rm),
            multi: !0
        };
        let rm = (() => {
            class t {
                constructor(t, e)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this.onChange = t => {},
                    this.onTouched = () => {}
                }
                writeValue(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "value", null == t ? "" : t)
                }
                registerOnChange(t)
                {
                    this.onChange = e => {
                        t("" == e ? null : parseFloat(e))
                    }
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("input", function(t) {
                        return e.onChange(t.target.value)
                    })("blur", function() {
                        return e.onTouched()
                    })
                },
                features: [Ao([sm])]
            }), t
        })();
        const om = {
            provide: Pf,
            useExisting: st(() => lm),
            multi: !0
        };
        let am = (() => {
                class t {
                    constructor()
                    {
                        this._accessors = []
                    }
                    add(t, e)
                    {
                        this._accessors.push([t, e])
                    }
                    remove(t)
                    {
                        for (let e = this._accessors.length - 1; e >= 0; --e)
                            if (this._accessors[e][1] === t)
                                return void this._accessors.splice(e, 1)
                    }
                    select(t)
                    {
                        this._accessors.forEach(e => {
                            this._isSameGroup(e, t) && e[1] !== t && e[1].fireUncheck(t.value)
                        })
                    }
                    _isSameGroup(t, e)
                    {
                        return !!t[0].control && t[0]._parent === e._control._parent && t[1].name === e.name
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })(),
            lm = (() => {
                class t {
                    constructor(t, e, n, i)
                    {
                        this._renderer = t,
                        this._elementRef = e,
                        this._registry = n,
                        this._injector = i,
                        this.onChange = () => {},
                        this.onTouched = () => {}
                    }
                    ngOnInit()
                    {
                        this._control = this._injector.get(nm),
                        this._checkName(),
                        this._registry.add(this._control, this)
                    }
                    ngOnDestroy()
                    {
                        this._registry.remove(this)
                    }
                    writeValue(t)
                    {
                        this._state = t === this.value,
                        this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
                    }
                    registerOnChange(t)
                    {
                        this._fn = t,
                        this.onChange = () => {
                            t(this.value),
                            this._registry.select(this)
                        }
                    }
                    fireUncheck(t)
                    {
                        this.writeValue(t)
                    }
                    registerOnTouched(t)
                    {
                        this.onTouched = t
                    }
                    setDisabledState(t)
                    {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                    }
                    _checkName()
                    {
                        !this.name && this.formControlName && (this.name = this.formControlName)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Mo), Rr(Fo), Rr(am), Rr(yr))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
                    hostBindings: function(t, e) {
                        1 & t && $r("change", function() {
                            return e.onChange()
                        })("blur", function() {
                            return e.onTouched()
                        })
                    },
                    inputs: {
                        name: "name",
                        formControlName: "formControlName",
                        value: "value"
                    },
                    features: [Ao([om])]
                }), t
            })();
        const cm = {
            provide: Pf,
            useExisting: st(() => hm),
            multi: !0
        };
        let hm = (() => {
            class t {
                constructor(t, e)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this.onChange = t => {},
                    this.onTouched = () => {}
                }
                writeValue(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(t))
                }
                registerOnChange(t)
                {
                    this.onChange = e => {
                        t("" == e ? null : parseFloat(e))
                    }
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("change", function(t) {
                        return e.onChange(t.target.value)
                    })("input", function(t) {
                        return e.onChange(t.target.value)
                    })("blur", function() {
                        return e.onTouched()
                    })
                },
                features: [Ao([cm])]
            }), t
        })();
        const um = {
            provide: Pf,
            useExisting: st(() => dm),
            multi: !0
        };
        let dm = (() => {
            class t {
                constructor(t, e)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this._optionMap = new Map,
                    this._idCounter = 0,
                    this.onChange = t => {},
                    this.onTouched = () => {},
                    this._compareWith = Object.is
                }
                set compareWith(t)
                {
                    this._compareWith = t
                }
                writeValue(t)
                {
                    this.value = t;
                    const e = this._getOptionId(t);
                    null == e && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                    const n = function(t, e) {
                        return null == t ? `${e}` : (e && "object" == typeof e && (e = "Object"), `${t}: ${e}`.slice(0, 50))
                    }(e, t);
                    this._renderer.setProperty(this._elementRef.nativeElement, "value", n)
                }
                registerOnChange(t)
                {
                    this.onChange = e => {
                        this.value = this._getOptionValue(e),
                        t(this.value)
                    }
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
                _registerOption()
                {
                    return (this._idCounter++).toString()
                }
                _getOptionId(t)
                {
                    for (const e of Array.from(this._optionMap.keys()))
                        if (this._compareWith(this._optionMap.get(e), t))
                            return e;
                    return null
                }
                _getOptionValue(t)
                {
                    const e = function(t) {
                        return t.split(":")[0]
                    }(t);
                    return this._optionMap.has(e) ? this._optionMap.get(e) : t
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("change", function(t) {
                        return e.onChange(t.target.value)
                    })("blur", function() {
                        return e.onTouched()
                    })
                },
                inputs: {
                    compareWith: "compareWith"
                },
                features: [Ao([um])]
            }), t
        })();
        const pm = {
            provide: Pf,
            useExisting: st(() => fm),
            multi: !0
        };
        let fm = (() => {
            class t {
                constructor(t, e)
                {
                    this._renderer = t,
                    this._elementRef = e,
                    this._optionMap = new Map,
                    this._idCounter = 0,
                    this.onChange = t => {},
                    this.onTouched = () => {},
                    this._compareWith = Object.is
                }
                set compareWith(t)
                {
                    this._compareWith = t
                }
                writeValue(t)
                {
                    let e;
                    if (this.value = t, Array.isArray(t)) {
                        const n = t.map(t => this._getOptionId(t));
                        e = (t, e) => {
                            t._setSelected(n.indexOf(e.toString()) > -1)
                        }
                    } else
                        e = (t, e) => {
                            t._setSelected(!1)
                        };
                    this._optionMap.forEach(e)
                }
                registerOnChange(t)
                {
                    this.onChange = e => {
                        const n = [];
                        if (void 0 !== e.selectedOptions) {
                            const t = e.selectedOptions;
                            for (let e = 0; e < t.length; e++) {
                                const i = t.item(e),
                                    s = this._getOptionValue(i.value);
                                n.push(s)
                            }
                        } else {
                            const t = e.options;
                            for (let e = 0; e < t.length; e++) {
                                const i = t.item(e);
                                if (i.selected) {
                                    const t = this._getOptionValue(i.value);
                                    n.push(t)
                                }
                            }
                        }
                        this.value = n,
                        t(n)
                    }
                }
                registerOnTouched(t)
                {
                    this.onTouched = t
                }
                setDisabledState(t)
                {
                    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", t)
                }
                _registerOption(t)
                {
                    const e = (this._idCounter++).toString();
                    return this._optionMap.set(e, t), e
                }
                _getOptionId(t)
                {
                    for (const e of Array.from(this._optionMap.keys()))
                        if (this._compareWith(this._optionMap.get(e)._value, t))
                            return e;
                    return null
                }
                _getOptionValue(t)
                {
                    const e = function(t) {
                        return t.split(":")[0]
                    }(t);
                    return this._optionMap.has(e) ? this._optionMap.get(e)._value : t
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(Mo), Rr(Fo))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("change", function(t) {
                        return e.onChange(t.target)
                    })("blur", function() {
                        return e.onTouched()
                    })
                },
                inputs: {
                    compareWith: "compareWith"
                },
                features: [Ao([pm])]
            }), t
        })();
        function mm(t, e) {
            ym(t, e, !0),
            e.valueAccessor.writeValue(t.value),
            function(t, e) {
                e.valueAccessor.registerOnChange(n => {
                    t._pendingValue = n,
                    t._pendingChange = !0,
                    t._pendingDirty = !0,
                    "change" === t.updateOn && vm(t, e)
                })
            }(t, e),
            function(t, e) {
                const n = (t, n) => {
                    e.valueAccessor.writeValue(t),
                    n && e.viewToModelUpdate(t)
                };
                t.registerOnChange(n),
                e._registerOnDestroy(() => {
                    t._unregisterOnChange(n)
                })
            }(t, e),
            function(t, e) {
                e.valueAccessor.registerOnTouched(() => {
                    t._pendingTouched = !0,
                    "blur" === t.updateOn && t._pendingChange && vm(t, e),
                    "submit" !== t.updateOn && t.markAsTouched()
                })
            }(t, e),
            function(t, e) {
                if (e.valueAccessor.setDisabledState) {
                    const n = t => {
                        e.valueAccessor.setDisabledState(t)
                    };
                    t.registerOnDisabledChange(n),
                    e._registerOnDestroy(() => {
                        t._unregisterOnDisabledChange(n)
                    })
                }
            }(t, e)
        }
        function gm(t, e, n=!0) {
            const i = () => {};
            e.valueAccessor && (e.valueAccessor.registerOnChange(i), e.valueAccessor.registerOnTouched(i)),
            bm(t, e, !0),
            t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}))
        }
        function _m(t, e) {
            t.forEach(t => {
                t.registerOnValidatorChange && t.registerOnValidatorChange(e)
            })
        }
        function ym(t, e, n) {
            const i = Yf(t);
            null !== e.validator ? t.setValidators(Gf(i, e.validator)) : "function" == typeof i && t.setValidators([i]);
            const s = Xf(t);
            if (null !== e.asyncValidator ? t.setAsyncValidators(Gf(s, e.asyncValidator)) : "function" == typeof s && t.setAsyncValidators([s]), n) {
                const n = () => t.updateValueAndValidity();
                _m(e._rawValidators, n),
                _m(e._rawAsyncValidators, n)
            }
        }
        function bm(t, e, n) {
            let i = !1;
            if (null !== t) {
                if (null !== e.validator) {
                    const n = Yf(t);
                    if (Array.isArray(n) && n.length > 0) {
                        const s = n.filter(t => t !== e.validator);
                        s.length !== n.length && (i = !0, t.setValidators(s))
                    }
                }
                if (null !== e.asyncValidator) {
                    const n = Xf(t);
                    if (Array.isArray(n) && n.length > 0) {
                        const s = n.filter(t => t !== e.asyncValidator);
                        s.length !== n.length && (i = !0, t.setAsyncValidators(s))
                    }
                }
            }
            if (n) {
                const t = () => {};
                _m(e._rawValidators, t),
                _m(e._rawAsyncValidators, t)
            }
            return i
        }
        function vm(t, e) {
            t._pendingDirty && t.markAsDirty(),
            t.setValue(t._pendingValue, {
                emitModelToViewChange: !1
            }),
            e.viewToModelUpdate(t._pendingValue),
            t._pendingChange = !1
        }
        function wm(t, e) {
            ym(t, e, !1)
        }
        const Cm = [Rf, hm, rm, dm, fm, lm];
        function xm(t, e) {
            t._syncPendingControls(),
            e.forEach(t => {
                const e = t.control;
                "submit" === e.updateOn && e._pendingChange && (t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1)
            })
        }
        function Em(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }
        const Sm = "VALID",
            km = "INVALID",
            Am = "PENDING",
            Tm = "DISABLED";
        function Om(t) {
            return (Rm(t) ? t.validators : t) || null
        }
        function Im(t) {
            return Array.isArray(t) ? Qf(t) : t || null
        }
        function Pm(t, e) {
            return (Rm(e) ? e.asyncValidators : t) || null
        }
        function Dm(t) {
            return Array.isArray(t) ? Kf(t) : t || null
        }
        function Rm(t) {
            return null != t && !Array.isArray(t) && "object" == typeof t
        }
        class Fm {
            constructor(t, e)
            {
                this._hasOwnPendingAsyncValidator = !1,
                this._onCollectionChange = () => {},
                this._parent = null,
                this.pristine = !0,
                this.touched = !1,
                this._onDisabledChange = [],
                this._rawValidators = t,
                this._rawAsyncValidators = e,
                this._composedValidatorFn = Im(this._rawValidators),
                this._composedAsyncValidatorFn = Dm(this._rawAsyncValidators)
            }
            get validator()
            {
                return this._composedValidatorFn
            }
            set validator(t)
            {
                this._rawValidators = this._composedValidatorFn = t
            }
            get asyncValidator()
            {
                return this._composedAsyncValidatorFn
            }
            set asyncValidator(t)
            {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = t
            }
            get parent()
            {
                return this._parent
            }
            get valid()
            {
                return this.status === Sm
            }
            get invalid()
            {
                return this.status === km
            }
            get pending()
            {
                return this.status == Am
            }
            get disabled()
            {
                return this.status === Tm
            }
            get enabled()
            {
                return this.status !== Tm
            }
            get dirty()
            {
                return !this.pristine
            }
            get untouched()
            {
                return !this.touched
            }
            get updateOn()
            {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }
            setValidators(t)
            {
                this._rawValidators = t,
                this._composedValidatorFn = Im(t)
            }
            setAsyncValidators(t)
            {
                this._rawAsyncValidators = t,
                this._composedAsyncValidatorFn = Dm(t)
            }
            clearValidators()
            {
                this.validator = null
            }
            clearAsyncValidators()
            {
                this.asyncValidator = null
            }
            markAsTouched(t={})
            {
                this.touched = !0,
                this._parent && !t.onlySelf && this._parent.markAsTouched(t)
            }
            markAllAsTouched()
            {
                this.markAsTouched({
                    onlySelf: !0
                }),
                this._forEachChild(t => t.markAllAsTouched())
            }
            markAsUntouched(t={})
            {
                this.touched = !1,
                this._pendingTouched = !1,
                this._forEachChild(t => {
                    t.markAsUntouched({
                        onlySelf: !0
                    })
                }),
                this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }
            markAsDirty(t={})
            {
                this.pristine = !1,
                this._parent && !t.onlySelf && this._parent.markAsDirty(t)
            }
            markAsPristine(t={})
            {
                this.pristine = !0,
                this._pendingDirty = !1,
                this._forEachChild(t => {
                    t.markAsPristine({
                        onlySelf: !0
                    })
                }),
                this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }
            markAsPending(t={})
            {
                this.status = Am,
                !1 !== t.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !t.onlySelf && this._parent.markAsPending(t)
            }
            disable(t={})
            {
                const e = this._parentMarkedDirty(t.onlySelf);
                this.status = Tm,
                this.errors = null,
                this._forEachChild(e => {
                    e.disable(Object.assign(Object.assign({}, t), {
                        onlySelf: !0
                    }))
                }),
                this._updateValue(),
                !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                this._updateAncestors(Object.assign(Object.assign({}, t), {
                    skipPristineCheck: e
                })),
                this._onDisabledChange.forEach(t => t(!0))
            }
            enable(t={})
            {
                const e = this._parentMarkedDirty(t.onlySelf);
                this.status = Sm,
                this._forEachChild(e => {
                    e.enable(Object.assign(Object.assign({}, t), {
                        onlySelf: !0
                    }))
                }),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                }),
                this._updateAncestors(Object.assign(Object.assign({}, t), {
                    skipPristineCheck: e
                })),
                this._onDisabledChange.forEach(t => t(!1))
            }
            _updateAncestors(t)
            {
                this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
            }
            setParent(t)
            {
                this._parent = t
            }
            updateValueAndValidity(t={})
            {
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), this.status !== Sm && this.status !== Am || this._runAsyncValidator(t.emitEvent)),
                !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
            }
            _updateTreeValidity(t={
                emitEvent: !0
            })
            {
                this._forEachChild(e => e._updateTreeValidity(t)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                })
            }
            _setInitialStatus()
            {
                this.status = this._allControlsDisabled() ? Tm : Sm
            }
            _runValidator()
            {
                return this.validator ? this.validator(this) : null
            }
            _runAsyncValidator(t)
            {
                if (this.asyncValidator) {
                    this.status = Am,
                    this._hasOwnPendingAsyncValidator = !0;
                    const e = qf(this.asyncValidator(this));
                    this._asyncValidationSubscription = e.subscribe(e => {
                        this._hasOwnPendingAsyncValidator = !1,
                        this.setErrors(e, {
                            emitEvent: t
                        })
                    })
                }
            }
            _cancelExistingSubscription()
            {
                this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
            }
            setErrors(t, e={})
            {
                this.errors = t,
                this._updateControlsErrors(!1 !== e.emitEvent)
            }
            get(t)
            {
                return function(t, e, n) {
                    if (null == e)
                        return null;
                    if (Array.isArray(e) || (e = e.split(".")), Array.isArray(e) && 0 === e.length)
                        return null;
                    let i = t;
                    return e.forEach(t => {
                        i = i instanceof Nm ? i.controls.hasOwnProperty(t) ? i.controls[t] : null : i instanceof Mm && i.at(t) || null
                    }), i
                }(this, t)
            }
            getError(t, e)
            {
                const n = e ? this.get(e) : this;
                return n && n.errors ? n.errors[t] : null
            }
            hasError(t, e)
            {
                return !!this.getError(t, e)
            }
            get root()
            {
                let t = this;
                for (; t._parent;)
                    t = t._parent;
                return t
            }
            _updateControlsErrors(t)
            {
                this.status = this._calculateStatus(),
                t && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(t)
            }
            _initObservables()
            {
                this.valueChanges = new Na,
                this.statusChanges = new Na
            }
            _calculateStatus()
            {
                return this._allControlsDisabled() ? Tm : this.errors ? km : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Am) ? Am : this._anyControlsHaveStatus(km) ? km : Sm
            }
            _anyControlsHaveStatus(t)
            {
                return this._anyControls(e => e.status === t)
            }
            _anyControlsDirty()
            {
                return this._anyControls(t => t.dirty)
            }
            _anyControlsTouched()
            {
                return this._anyControls(t => t.touched)
            }
            _updatePristine(t={})
            {
                this.pristine = !this._anyControlsDirty(),
                this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }
            _updateTouched(t={})
            {
                this.touched = this._anyControlsTouched(),
                this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }
            _isBoxedValue(t)
            {
                return "object" == typeof t && null !== t && 2 === Object.keys(t).length && "value" in t && "disabled" in t
            }
            _registerOnCollectionChange(t)
            {
                this._onCollectionChange = t
            }
            _setUpdateStrategy(t)
            {
                Rm(t) && null != t.updateOn && (this._updateOn = t.updateOn)
            }
            _parentMarkedDirty(t)
            {
                return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
            }
        }
        class Vm extends Fm {
            constructor(t=null, e, n)
            {
                super(Om(e), Pm(n, e)),
                this._onChange = [],
                this._applyFormState(t),
                this._setUpdateStrategy(e),
                this._initObservables(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }
            setValue(t, e={})
            {
                this.value = this._pendingValue = t,
                this._onChange.length && !1 !== e.emitModelToViewChange && this._onChange.forEach(t => t(this.value, !1 !== e.emitViewToModelChange)),
                this.updateValueAndValidity(e)
            }
            patchValue(t, e={})
            {
                this.setValue(t, e)
            }
            reset(t=null, e={})
            {
                this._applyFormState(t),
                this.markAsPristine(e),
                this.markAsUntouched(e),
                this.setValue(this.value, e),
                this._pendingChange = !1
            }
            _updateValue() {}
            _anyControls(t)
            {
                return !1
            }
            _allControlsDisabled()
            {
                return this.disabled
            }
            registerOnChange(t)
            {
                this._onChange.push(t)
            }
            _unregisterOnChange(t)
            {
                Em(this._onChange, t)
            }
            registerOnDisabledChange(t)
            {
                this._onDisabledChange.push(t)
            }
            _unregisterOnDisabledChange(t)
            {
                Em(this._onDisabledChange, t)
            }
            _forEachChild(t) {}
            _syncPendingControls()
            {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }), 0))
            }
            _applyFormState(t)
            {
                this._isBoxedValue(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({
                    onlySelf: !0,
                    emitEvent: !1
                })) : this.value = this._pendingValue = t
            }
        }
        class Nm extends Fm {
            constructor(t, e, n)
            {
                super(Om(e), Pm(n, e)),
                this.controls = t,
                this._initObservables(),
                this._setUpdateStrategy(e),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }
            registerControl(t, e)
            {
                return this.controls[t] ? this.controls[t] : (this.controls[t] = e, e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e)
            }
            addControl(t, e)
            {
                this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            removeControl(t)
            {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
                delete this.controls[t],
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            setControl(t, e)
            {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
                delete this.controls[t],
                e && this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            contains(t)
            {
                return this.controls.hasOwnProperty(t) && this.controls[t].enabled
            }
            setValue(t, e={})
            {
                this._checkAllValuesPresent(t),
                Object.keys(t).forEach(n => {
                    this._throwIfControlMissing(n),
                    this.controls[n].setValue(t[n], {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }),
                this.updateValueAndValidity(e)
            }
            patchValue(t, e={})
            {
                null != t && (Object.keys(t).forEach(n => {
                    this.controls[n] && this.controls[n].patchValue(t[n], {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }), this.updateValueAndValidity(e))
            }
            reset(t={}, e={})
            {
                this._forEachChild((n, i) => {
                    n.reset(t[i], {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e)
            }
            getRawValue()
            {
                return this._reduceChildren({}, (t, e, n) => (t[n] = e instanceof Vm ? e.value : e.getRawValue(), t))
            }
            _syncPendingControls()
            {
                let t = this._reduceChildren(!1, (t, e) => !!e._syncPendingControls() || t);
                return t && this.updateValueAndValidity({
                    onlySelf: !0
                }), t
            }
            _throwIfControlMissing(t)
            {
                if (!Object.keys(this.controls).length)
                    throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.controls[t])
                    throw new Error(`Cannot find form control with name: ${t}.`)
            }
            _forEachChild(t)
            {
                Object.keys(this.controls).forEach(e => {
                    const n = this.controls[e];
                    n && t(n, e)
                })
            }
            _setUpControls()
            {
                this._forEachChild(t => {
                    t.setParent(this),
                    t._registerOnCollectionChange(this._onCollectionChange)
                })
            }
            _updateValue()
            {
                this.value = this._reduceValue()
            }
            _anyControls(t)
            {
                for (const e of Object.keys(this.controls)) {
                    const n = this.controls[e];
                    if (this.contains(e) && t(n))
                        return !0
                }
                return !1
            }
            _reduceValue()
            {
                return this._reduceChildren({}, (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t))
            }
            _reduceChildren(t, e)
            {
                let n = t;
                return this._forEachChild((t, i) => {
                    n = e(n, t, i)
                }), n
            }
            _allControlsDisabled()
            {
                for (const t of Object.keys(this.controls))
                    if (this.controls[t].enabled)
                        return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }
            _checkAllValuesPresent(t)
            {
                this._forEachChild((e, n) => {
                    if (void 0 === t[n])
                        throw new Error(`Must supply a value for form control with name: '${n}'.`)
                })
            }
        }
        class Mm extends Fm {
            constructor(t, e, n)
            {
                super(Om(e), Pm(n, e)),
                this.controls = t,
                this._initObservables(),
                this._setUpdateStrategy(e),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }
            at(t)
            {
                return this.controls[t]
            }
            push(t)
            {
                this.controls.push(t),
                this._registerControl(t),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            insert(t, e)
            {
                this.controls.splice(t, 0, e),
                this._registerControl(e),
                this.updateValueAndValidity()
            }
            removeAt(t)
            {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
                this.controls.splice(t, 1),
                this.updateValueAndValidity()
            }
            setControl(t, e)
            {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {}),
                this.controls.splice(t, 1),
                e && (this.controls.splice(t, 0, e), this._registerControl(e)),
                this.updateValueAndValidity(),
                this._onCollectionChange()
            }
            get length()
            {
                return this.controls.length
            }
            setValue(t, e={})
            {
                this._checkAllValuesPresent(t),
                t.forEach((t, n) => {
                    this._throwIfControlMissing(n),
                    this.at(n).setValue(t, {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }),
                this.updateValueAndValidity(e)
            }
            patchValue(t, e={})
            {
                null != t && (t.forEach((t, n) => {
                    this.at(n) && this.at(n).patchValue(t, {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }), this.updateValueAndValidity(e))
            }
            reset(t=[], e={})
            {
                this._forEachChild((n, i) => {
                    n.reset(t[i], {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e)
            }
            getRawValue()
            {
                return this.controls.map(t => t instanceof Vm ? t.value : t.getRawValue())
            }
            clear()
            {
                this.controls.length < 1 || (this._forEachChild(t => t._registerOnCollectionChange(() => {})), this.controls.splice(0), this.updateValueAndValidity())
            }
            _syncPendingControls()
            {
                let t = this.controls.reduce((t, e) => !!e._syncPendingControls() || t, !1);
                return t && this.updateValueAndValidity({
                    onlySelf: !0
                }), t
            }
            _throwIfControlMissing(t)
            {
                if (!this.controls.length)
                    throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.at(t))
                    throw new Error(`Cannot find form control at index ${t}`)
            }
            _forEachChild(t)
            {
                this.controls.forEach((e, n) => {
                    t(e, n)
                })
            }
            _updateValue()
            {
                this.value = this.controls.filter(t => t.enabled || this.disabled).map(t => t.value)
            }
            _anyControls(t)
            {
                return this.controls.some(e => e.enabled && t(e))
            }
            _setUpControls()
            {
                this._forEachChild(t => this._registerControl(t))
            }
            _checkAllValuesPresent(t)
            {
                this._forEachChild((e, n) => {
                    if (void 0 === t[n])
                        throw new Error(`Must supply a value for form control at index: ${n}.`)
                })
            }
            _allControlsDisabled()
            {
                for (const t of this.controls)
                    if (t.enabled)
                        return !1;
                return this.controls.length > 0 || this.disabled
            }
            _registerControl(t)
            {
                t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange)
            }
        }
        const Lm = {
                provide: tm,
                useExisting: st(() => Bm)
            },
            jm = (() => Promise.resolve(null))();
        let Bm = (() => {
            class t extends tm {
                constructor(t, e)
                {
                    super(),
                    this.submitted = !1,
                    this._directives = [],
                    this.ngSubmit = new Na,
                    this.form = new Nm({}, Qf(t), Kf(e))
                }
                ngAfterViewInit()
                {
                    this._setUpdateStrategy()
                }
                get formDirective()
                {
                    return this
                }
                get control()
                {
                    return this.form
                }
                get path()
                {
                    return []
                }
                get controls()
                {
                    return this.form.controls
                }
                addControl(t)
                {
                    jm.then(() => {
                        const e = this._findContainer(t.path);
                        t.control = e.registerControl(t.name, t.control),
                        mm(t.control, t),
                        t.control.updateValueAndValidity({
                            emitEvent: !1
                        }),
                        this._directives.push(t)
                    })
                }
                getControl(t)
                {
                    return this.form.get(t.path)
                }
                removeControl(t)
                {
                    jm.then(() => {
                        const e = this._findContainer(t.path);
                        e && e.removeControl(t.name),
                        Em(this._directives, t)
                    })
                }
                addFormGroup(t)
                {
                    jm.then(() => {
                        const e = this._findContainer(t.path),
                            n = new Nm({});
                        wm(n, t),
                        e.registerControl(t.name, n),
                        n.updateValueAndValidity({
                            emitEvent: !1
                        })
                    })
                }
                removeFormGroup(t)
                {
                    jm.then(() => {
                        const e = this._findContainer(t.path);
                        e && e.removeControl(t.name)
                    })
                }
                getFormGroup(t)
                {
                    return this.form.get(t.path)
                }
                updateModel(t, e)
                {
                    jm.then(() => {
                        this.form.get(t.path).setValue(e)
                    })
                }
                setValue(t)
                {
                    this.control.setValue(t)
                }
                onSubmit(t)
                {
                    return this.submitted = !0, xm(this.form, this._directives), this.ngSubmit.emit(t), !1
                }
                onReset()
                {
                    this.resetForm()
                }
                resetForm(t)
                {
                    this.form.reset(t),
                    this.submitted = !1
                }
                _setUpdateStrategy()
                {
                    this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
                }
                _findContainer(t)
                {
                    return t.pop(), t.length ? this.form.get(t) : this.form
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(jf, 10), Rr(Bf, 10))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
                hostBindings: function(t, e) {
                    1 & t && $r("submit", function(t) {
                        return e.onSubmit(t)
                    })("reset", function() {
                        return e.onReset()
                    })
                },
                inputs: {
                    options: ["ngFormOptions", "options"]
                },
                outputs: {
                    ngSubmit: "ngSubmit"
                },
                exportAs: ["ngForm"],
                features: [Ao([Lm]), vr]
            }), t
        })();
        const Hm = {
                provide: nm,
                useExisting: st(() => $m)
            },
            zm = (() => Promise.resolve(null))();
        let $m = (() => {
            class t extends nm {
                constructor(t, e, n, i)
                {
                    super(),
                    this.control = new Vm,
                    this._registered = !1,
                    this.update = new Na,
                    this._parent = t,
                    this._setValidators(e),
                    this._setAsyncValidators(n),
                    this.valueAccessor = function(t, e) {
                        if (!e)
                            return null;
                        let n,
                            i,
                            s;
                        return Array.isArray(e), e.forEach(t => {
                            var e;
                            t.constructor === Nf ? n = t : (e = t, Cm.some(t => e.constructor === t) ? i = t : s = t)
                        }), s || i || n || null
                    }(0, i)
                }
                ngOnChanges(t)
                {
                    this._checkForErrors(),
                    this._registered || this._setUpControl(),
                    "isDisabled" in t && this._updateDisabled(t),
                    function(t, e) {
                        if (!t.hasOwnProperty("model"))
                            return !1;
                        const n = t.model;
                        return !!n.isFirstChange() || !Object.is(e, n.currentValue)
                    }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                }
                ngOnDestroy()
                {
                    this.formDirective && this.formDirective.removeControl(this)
                }
                get path()
                {
                    return this._parent ? [...this._parent.path, this.name] : [this.name]
                }
                get formDirective()
                {
                    return this._parent ? this._parent.formDirective : null
                }
                viewToModelUpdate(t)
                {
                    this.viewModel = t,
                    this.update.emit(t)
                }
                _setUpControl()
                {
                    this._setUpdateStrategy(),
                    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this),
                    this._registered = !0
                }
                _setUpdateStrategy()
                {
                    this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                }
                _isStandalone()
                {
                    return !this._parent || !(!this.options || !this.options.standalone)
                }
                _setUpStandalone()
                {
                    mm(this.control, this),
                    this.control.updateValueAndValidity({
                        emitEvent: !1
                    })
                }
                _checkForErrors()
                {
                    this._isStandalone() || this._checkParentType(),
                    this._checkName()
                }
                _checkParentType() {}
                _checkName()
                {
                    this.options && this.options.name && (this.name = this.options.name),
                    this._isStandalone()
                }
                _updateValue(t)
                {
                    zm.then(() => {
                        this.control.setValue(t, {
                            emitViewToModelChange: !1
                        })
                    })
                }
                _updateDisabled(t)
                {
                    const e = t.isDisabled.currentValue,
                        n = "" === e || e && "false" !== e;
                    zm.then(() => {
                        n && !this.control.disabled ? this.control.disable() : !n && this.control.disabled && this.control.enable()
                    })
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(Rr(tm, 9), Rr(jf, 10), Rr(Bf, 10), Rr(Pf, 10))
            }, t.\u0275dir = qt({
                type: t,
                selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
                inputs: {
                    name: "name",
                    isDisabled: ["disabled", "isDisabled"],
                    model: ["ngModel", "model"],
                    options: ["ngModelOptions", "options"]
                },
                outputs: {
                    update: "ngModelChange"
                },
                exportAs: ["ngModel"],
                features: [Ao([Hm]), vr, le]
            }), t
        })();
        const qm = {
            provide: tm,
            useExisting: st(() => Wm)
        };
        let Wm = (() => {
                class t extends tm {
                    constructor(t, e)
                    {
                        super(),
                        this.validators = t,
                        this.asyncValidators = e,
                        this.submitted = !1,
                        this._onCollectionChange = () => this._updateDomValue(),
                        this.directives = [],
                        this.form = null,
                        this.ngSubmit = new Na,
                        this._setValidators(t),
                        this._setAsyncValidators(e)
                    }
                    ngOnChanges(t)
                    {
                        this._checkFormPresent(),
                        t.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
                    }
                    ngOnDestroy()
                    {
                        this.form && (bm(this.form, this, !1), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {}))
                    }
                    get formDirective()
                    {
                        return this
                    }
                    get control()
                    {
                        return this.form
                    }
                    get path()
                    {
                        return []
                    }
                    addControl(t)
                    {
                        const e = this.form.get(t.path);
                        return mm(e, t), e.updateValueAndValidity({
                            emitEvent: !1
                        }), this.directives.push(t), e
                    }
                    getControl(t)
                    {
                        return this.form.get(t.path)
                    }
                    removeControl(t)
                    {
                        gm(t.control || null, t, !1),
                        Em(this.directives, t)
                    }
                    addFormGroup(t)
                    {
                        this._setUpFormContainer(t)
                    }
                    removeFormGroup(t)
                    {
                        this._cleanUpFormContainer(t)
                    }
                    getFormGroup(t)
                    {
                        return this.form.get(t.path)
                    }
                    addFormArray(t)
                    {
                        this._setUpFormContainer(t)
                    }
                    removeFormArray(t)
                    {
                        this._cleanUpFormContainer(t)
                    }
                    getFormArray(t)
                    {
                        return this.form.get(t.path)
                    }
                    updateModel(t, e)
                    {
                        this.form.get(t.path).setValue(e)
                    }
                    onSubmit(t)
                    {
                        return this.submitted = !0, xm(this.form, this.directives), this.ngSubmit.emit(t), !1
                    }
                    onReset()
                    {
                        this.resetForm()
                    }
                    resetForm(t)
                    {
                        this.form.reset(t),
                        this.submitted = !1
                    }
                    _updateDomValue()
                    {
                        this.directives.forEach(t => {
                            const e = this.form.get(t.path);
                            t.control !== e && (gm(t.control || null, t), e && mm(e, t), t.control = e)
                        }),
                        this.form._updateTreeValidity({
                            emitEvent: !1
                        })
                    }
                    _setUpFormContainer(t)
                    {
                        const e = this.form.get(t.path);
                        wm(e, t),
                        e.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    _cleanUpFormContainer(t)
                    {
                        if (this.form) {
                            const e = this.form.get(t.path);
                            e && function(t, e) {
                                return bm(t, e, !1)
                            }(e, t) && e.updateValueAndValidity({
                                emitEvent: !1
                            })
                        }
                    }
                    _updateRegistrations()
                    {
                        this.form._registerOnCollectionChange(this._onCollectionChange),
                        this._oldForm && this._oldForm._registerOnCollectionChange(() => {})
                    }
                    _updateValidators()
                    {
                        ym(this.form, this, !1),
                        this._oldForm && bm(this._oldForm, this, !1)
                    }
                    _checkFormPresent() {}
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(jf, 10), Rr(Bf, 10))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "formGroup", ""]],
                    hostBindings: function(t, e) {
                        1 & t && $r("submit", function(t) {
                            return e.onSubmit(t)
                        })("reset", function() {
                            return e.onReset()
                        })
                    },
                    inputs: {
                        form: ["formGroup", "form"]
                    },
                    outputs: {
                        ngSubmit: "ngSubmit"
                    },
                    exportAs: ["ngForm"],
                    features: [Ao([qm]), vr, le]
                }), t
            })(),
            Um = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })(),
            Zm = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [am],
                    imports: [Um]
                }), t
            })(),
            Qm = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Rc, pf], pf]
                }), t
            })();
        function Km(t, e, n, s) {
            return i(n) && (s = n, n = void 0), s ? Km(t, e, n).pipe(k(t => l(t) ? s(...t) : s(t))) : new y(i => {
                Gm(t, e, function(t) {
                    i.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t)
                }, i, n)
            })
        }
        function Gm(t, e, n, i, s) {
            let r;
            if (function(t) {
                return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
            }(t)) {
                const i = t;
                t.addEventListener(e, n, s),
                r = () => i.removeEventListener(e, n, s)
            } else if (function(t) {
                return t && "function" == typeof t.on && "function" == typeof t.off
            }(t)) {
                const i = t;
                t.on(e, n),
                r = () => i.off(e, n)
            } else if (function(t) {
                return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
            }(t)) {
                const i = t;
                t.addListener(e, n),
                r = () => i.removeListener(e, n)
            } else {
                if (!t || !t.length)
                    throw new TypeError("Invalid event target");
                for (let r = 0, o = t.length; r < o; r++)
                    Gm(t[r], e, n, i, s)
            }
            i.add(r)
        }
        class Ym {
            constructor(t)
            {
                this.durationSelector = t
            }
            call(t, e)
            {
                return e.subscribe(new Xm(t, this.durationSelector))
            }
        }
        class Xm extends L {
            constructor(t, e)
            {
                super(t),
                this.durationSelector = e,
                this.hasValue = !1
            }
            _next(t)
            {
                if (this.value = t, this.hasValue = !0, !this.throttled) {
                    let n;
                    try {
                        const {durationSelector: e} = this;
                        n = e(t)
                    } catch (e) {
                        return this.destination.error(e)
                    }
                    const i = j(n, new M(this));
                    !i || i.closed ? this.clearThrottle() : this.add(this.throttled = i)
                }
            }
            clearThrottle()
            {
                const {value: t, hasValue: e, throttled: n} = this;
                n && (this.remove(n), this.throttled = void 0, n.unsubscribe()),
                e && (this.value = void 0, this.hasValue = !1, this.destination.next(t))
            }
            notifyNext()
            {
                this.clearThrottle()
            }
            notifyComplete()
            {
                this.clearThrottle()
            }
        }
        function Jm(t) {
            return !l(t) && t - parseFloat(t) + 1 >= 0
        }
        function tg(t) {
            const {index: e, period: n, subscriber: i} = t;
            if (i.next(e), !i.closed) {
                if (-1 === n)
                    return i.complete();
                t.index = e + 1,
                this.schedule(t, n)
            }
        }
        function eg(t, e=mp) {
            return n = () => function(t=0, e, n) {
                let i = -1;
                return Jm(e) ? i = Number(e) < 1 ? 1 : Number(e) : S(e) && (n = e), S(n) || (n = mp), new y(e => {
                    const s = Jm(t) ? t : +t - n.now();
                    return n.schedule(tg, s, {
                        index: 0,
                        period: i,
                        subscriber: e
                    })
                })
            }(t, e), function(t) {
                return t.lift(new Ym(n))
            };
            var n
        }
        function ng(t) {
            return e => e.lift(new ig(t))
        }
        class ig {
            constructor(t)
            {
                this.notifier = t
            }
            call(t, e)
            {
                const n = new sg(t),
                    i = j(this.notifier, new M(n));
                return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n
            }
        }
        class sg extends L {
            constructor(t)
            {
                super(t),
                this.seenValue = !1
            }
            notifyNext()
            {
                this.seenValue = !0,
                this.complete()
            }
            notifyComplete() {}
        }
        const rg = Hp({
            passive: !0
        });
        let og = (() => {
                class t {
                    constructor(t, e)
                    {
                        this._platform = t,
                        this._ngZone = e,
                        this._monitoredElements = new Map
                    }
                    monitor(t)
                    {
                        if (!this._platform.isBrowser)
                            return Ep;
                        const e = Pp(t),
                            n = this._monitoredElements.get(e);
                        if (n)
                            return n.subject;
                        const i = new x,
                            s = "cdk-text-field-autofilled",
                            r = t => {
                                "cdk-text-field-autofill-start" !== t.animationName || e.classList.contains(s) ? "cdk-text-field-autofill-end" === t.animationName && e.classList.contains(s) && (e.classList.remove(s), this._ngZone.run(() => i.next({
                                    target: t.target,
                                    isAutofilled: !1
                                }))) : (e.classList.add(s), this._ngZone.run(() => i.next({
                                    target: t.target,
                                    isAutofilled: !0
                                })))
                            };
                        return this._ngZone.runOutsideAngular(() => {
                            e.addEventListener("animationstart", r, rg),
                            e.classList.add("cdk-text-field-autofill-monitored")
                        }), this._monitoredElements.set(e, {
                            subject: i,
                            unlisten: () => {
                                e.removeEventListener("animationstart", r, rg)
                            }
                        }), i
                    }
                    stopMonitoring(t)
                    {
                        const e = Pp(t),
                            n = this._monitoredElements.get(e);
                        n && (n.unlisten(), n.subject.complete(), e.classList.remove("cdk-text-field-autofill-monitored"), e.classList.remove("cdk-text-field-autofilled"), this._monitoredElements.delete(e))
                    }
                    ngOnDestroy()
                    {
                        this._monitoredElements.forEach((t, e) => this.stopMonitoring(e))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Fp), oi(Cl))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Fp), oi(Cl))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            ag = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Vp]]
                }), t
            })();
        const lg = ["underline"],
            cg = ["connectionContainer"],
            hg = ["inputContainer"],
            ug = ["label"];
        function dg(t, e) {
            1 & t && (jr(0), Nr(1, "div", 14), Lr(2, "div", 15), Lr(3, "div", 16), Lr(4, "div", 17), Mr(), Nr(5, "div", 18), Lr(6, "div", 15), Lr(7, "div", 16), Lr(8, "div", 17), Mr(), Br())
        }
        function pg(t, e) {
            1 & t && (Nr(0, "div", 19), Kr(1, 1), Mr())
        }
        function fg(t, e) {
            if (1 & t && (jr(0), Kr(1, 2), Nr(2, "span"), oo(3), Mr(), Br()), 2 & t) {
                const t = Ur(2);
                as(3),
                ao(t._control.placeholder)
            }
        }
        function mg(t, e) {
            1 & t && Kr(0, 3, ["*ngSwitchCase", "true"])
        }
        function gg(t, e) {
            1 & t && (Nr(0, "span", 23), oo(1, " *"), Mr())
        }
        function _g(t, e) {
            if (1 & t) {
                const t = Hr();
                Nr(0, "label", 20, 21),
                $r("cdkObserveContent", function() {
                    return De(t), Ur().updateOutlineGap()
                }),
                Dr(2, fg, 4, 1, "ng-container", 12),
                Dr(3, mg, 1, 0, "ng-content", 12),
                Dr(4, gg, 2, 0, "span", 22),
                Mr()
            }
            if (2 & t) {
                const t = Ur();
                to("mat-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-form-field-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color),
                Fr("cdkObserveContentDisabled", "outline" != t.appearance)("id", t._labelId)("ngSwitch", t._hasLabel()),
                Pr("for", t._control.id)("aria-owns", t._control.id),
                as(2),
                Fr("ngSwitchCase", !1),
                as(1),
                Fr("ngSwitchCase", !0),
                as(1),
                Fr("ngIf", !t.hideRequiredMarker && t._control.required && !t._control.disabled)
            }
        }
        function yg(t, e) {
            1 & t && (Nr(0, "div", 24), Kr(1, 4), Mr())
        }
        function bg(t, e) {
            if (1 & t && (Nr(0, "div", 25, 26), Lr(2, "span", 27), Mr()), 2 & t) {
                const t = Ur();
                as(2),
                to("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color)
            }
        }
        function vg(t, e) {
            1 & t && (Nr(0, "div"), Kr(1, 5), Mr()),
            2 & t && Fr("@transitionMessages", Ur()._subscriptAnimationState)
        }
        function wg(t, e) {
            if (1 & t && (Nr(0, "div", 31), oo(1), Mr()), 2 & t) {
                const t = Ur(2);
                Fr("id", t._hintLabelId),
                as(1),
                ao(t.hintLabel)
            }
        }
        function Cg(t, e) {
            if (1 & t && (Nr(0, "div", 28), Dr(1, wg, 2, 2, "div", 29), Kr(2, 6), Lr(3, "div", 30), Kr(4, 7), Mr()), 2 & t) {
                const t = Ur();
                Fr("@transitionMessages", t._subscriptAnimationState),
                as(1),
                Fr("ngIf", t.hintLabel)
            }
        }
        const xg = ["*", [["", "matPrefix", ""]], [["mat-placeholder"]], [["mat-label"]], [["", "matSuffix", ""]], [["mat-error"]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]],
            Eg = ["*", "[matPrefix]", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"],
            Sg = new qn("MatError"),
            kg = {
                transitionMessages: Eh("transitionMessages", [Th("enter", Ah({
                    opacity: 1,
                    transform: "translateY(0%)"
                })), Oh("void => enter", [Ah({
                    opacity: 0,
                    transform: "translateY(-5px)"
                }), Sh("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
            };
        let Ag = (() => {
            class t {}
            return t.\u0275fac = function(e) {
                return new (e || t)
            }, t.\u0275dir = qt({
                type: t
            }), t
        })();
        const Tg = new qn("MatHint");
        let Og = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["mat-label"]]
                }), t
            })(),
            Ig = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["mat-placeholder"]]
                }), t
            })();
        const Pg = new qn("MatPrefix"),
            Dg = new qn("MatSuffix");
        let Rg = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "matSuffix", ""]],
                    features: [Ao([{
                        provide: Dg,
                        useExisting: t
                    }])]
                }), t
            })(),
            Fg = 0;
        class Vg {
            constructor(t)
            {
                this._elementRef = t
            }
        }
        const Ng = mf(Vg, "primary"),
            Mg = new qn("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
            Lg = new qn("MatFormField");
        let jg = (() => {
                class t extends Ng {
                    constructor(t, e, n, i, s, r, o, a)
                    {
                        super(t),
                        this._elementRef = t,
                        this._changeDetectorRef = e,
                        this._dir = i,
                        this._defaults = s,
                        this._platform = r,
                        this._ngZone = o,
                        this._outlineGapCalculationNeededImmediately = !1,
                        this._outlineGapCalculationNeededOnStable = !1,
                        this._destroyed = new x,
                        this._showAlwaysAnimate = !1,
                        this._subscriptAnimationState = "",
                        this._hintLabel = "",
                        this._hintLabelId = "mat-hint-" + Fg++,
                        this._labelId = "mat-form-field-label-" + Fg++,
                        this.floatLabel = this._getDefaultFloatLabelState(),
                        this._animationsEnabled = "NoopAnimations" !== a,
                        this.appearance = s && s.appearance ? s.appearance : "legacy",
                        this._hideRequiredMarker = !(!s || null == s.hideRequiredMarker) && s.hideRequiredMarker
                    }
                    get appearance()
                    {
                        return this._appearance
                    }
                    set appearance(t)
                    {
                        const e = this._appearance;
                        this._appearance = t || this._defaults && this._defaults.appearance || "legacy",
                        "outline" === this._appearance && e !== t && (this._outlineGapCalculationNeededOnStable = !0)
                    }
                    get hideRequiredMarker()
                    {
                        return this._hideRequiredMarker
                    }
                    set hideRequiredMarker(t)
                    {
                        this._hideRequiredMarker = Tp(t)
                    }
                    _shouldAlwaysFloat()
                    {
                        return "always" === this.floatLabel && !this._showAlwaysAnimate
                    }
                    _canLabelFloat()
                    {
                        return "never" !== this.floatLabel
                    }
                    get hintLabel()
                    {
                        return this._hintLabel
                    }
                    set hintLabel(t)
                    {
                        this._hintLabel = t,
                        this._processHints()
                    }
                    get floatLabel()
                    {
                        return "legacy" !== this.appearance && "never" === this._floatLabel ? "auto" : this._floatLabel
                    }
                    set floatLabel(t)
                    {
                        t !== this._floatLabel && (this._floatLabel = t || this._getDefaultFloatLabelState(), this._changeDetectorRef.markForCheck())
                    }
                    get _control()
                    {
                        return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic
                    }
                    set _control(t)
                    {
                        this._explicitFormFieldControl = t
                    }
                    getLabelId()
                    {
                        return this._hasFloatingLabel() ? this._labelId : null
                    }
                    getConnectedOverlayOrigin()
                    {
                        return this._connectionContainerRef || this._elementRef
                    }
                    ngAfterContentInit()
                    {
                        this._validateControlChild();
                        const t = this._control;
                        t.controlType && this._elementRef.nativeElement.classList.add(`mat-form-field-type-${t.controlType}`),
                        t.stateChanges.pipe(cf(null)).subscribe(() => {
                            this._validatePlaceholders(),
                            this._syncDescribedByIds(),
                            this._changeDetectorRef.markForCheck()
                        }),
                        t.ngControl && t.ngControl.valueChanges && t.ngControl.valueChanges.pipe(ng(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck()),
                        this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.pipe(ng(this._destroyed)).subscribe(() => {
                                this._outlineGapCalculationNeededOnStable && this.updateOutlineGap()
                            })
                        }),
                        W(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
                            this._outlineGapCalculationNeededOnStable = !0,
                            this._changeDetectorRef.markForCheck()
                        }),
                        this._hintChildren.changes.pipe(cf(null)).subscribe(() => {
                            this._processHints(),
                            this._changeDetectorRef.markForCheck()
                        }),
                        this._errorChildren.changes.pipe(cf(null)).subscribe(() => {
                            this._syncDescribedByIds(),
                            this._changeDetectorRef.markForCheck()
                        }),
                        this._dir && this._dir.change.pipe(ng(this._destroyed)).subscribe(() => {
                            "function" == typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                                requestAnimationFrame(() => this.updateOutlineGap())
                            }) : this.updateOutlineGap()
                        })
                    }
                    ngAfterContentChecked()
                    {
                        this._validateControlChild(),
                        this._outlineGapCalculationNeededImmediately && this.updateOutlineGap()
                    }
                    ngAfterViewInit()
                    {
                        this._subscriptAnimationState = "enter",
                        this._changeDetectorRef.detectChanges()
                    }
                    ngOnDestroy()
                    {
                        this._destroyed.next(),
                        this._destroyed.complete()
                    }
                    _shouldForward(t)
                    {
                        const e = this._control ? this._control.ngControl : null;
                        return e && e[t]
                    }
                    _hasPlaceholder()
                    {
                        return !!(this._control && this._control.placeholder || this._placeholderChild)
                    }
                    _hasLabel()
                    {
                        return !(!this._labelChildNonStatic && !this._labelChildStatic)
                    }
                    _shouldLabelFloat()
                    {
                        return this._canLabelFloat() && (this._control && this._control.shouldLabelFloat || this._shouldAlwaysFloat())
                    }
                    _hideControlPlaceholder()
                    {
                        return "legacy" === this.appearance && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat()
                    }
                    _hasFloatingLabel()
                    {
                        return this._hasLabel() || "legacy" === this.appearance && this._hasPlaceholder()
                    }
                    _getDisplayedMessages()
                    {
                        return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
                    }
                    _animateAndLockLabel()
                    {
                        this._hasFloatingLabel() && this._canLabelFloat() && (this._animationsEnabled && this._label && (this._showAlwaysAnimate = !0, Km(this._label.nativeElement, "transitionend").pipe(Sp(1)).subscribe(() => {
                            this._showAlwaysAnimate = !1
                        })), this.floatLabel = "always", this._changeDetectorRef.markForCheck())
                    }
                    _validatePlaceholders() {}
                    _processHints()
                    {
                        this._validateHints(),
                        this._syncDescribedByIds()
                    }
                    _validateHints() {}
                    _getDefaultFloatLabelState()
                    {
                        return this._defaults && this._defaults.floatLabel || "auto"
                    }
                    _syncDescribedByIds()
                    {
                        if (this._control) {
                            let t = [];
                            if (this._control.userAriaDescribedBy && "string" == typeof this._control.userAriaDescribedBy && t.push(...this._control.userAriaDescribedBy.split(" ")), "hint" === this._getDisplayedMessages()) {
                                const e = this._hintChildren ? this._hintChildren.find(t => "start" === t.align) : null,
                                    n = this._hintChildren ? this._hintChildren.find(t => "end" === t.align) : null;
                                e ? t.push(e.id) : this._hintLabel && t.push(this._hintLabelId),
                                n && t.push(n.id)
                            } else
                                this._errorChildren && t.push(...this._errorChildren.map(t => t.id));
                            this._control.setDescribedByIds(t)
                        }
                    }
                    _validateControlChild() {}
                    updateOutlineGap()
                    {
                        const t = this._label ? this._label.nativeElement : null;
                        if ("outline" !== this.appearance || !t || !t.children.length || !t.textContent.trim())
                            return;
                        if (!this._platform.isBrowser)
                            return;
                        if (!this._isAttachedToDOM())
                            return void (this._outlineGapCalculationNeededImmediately = !0);
                        let e = 0,
                            n = 0;
                        const i = this._connectionContainerRef.nativeElement,
                            s = i.querySelectorAll(".mat-form-field-outline-start"),
                            r = i.querySelectorAll(".mat-form-field-outline-gap");
                        if (this._label && this._label.nativeElement.children.length) {
                            const s = i.getBoundingClientRect();
                            if (0 === s.width && 0 === s.height)
                                return this._outlineGapCalculationNeededOnStable = !0, void (this._outlineGapCalculationNeededImmediately = !1);
                            const r = this._getStartEnd(s),
                                o = t.children,
                                a = this._getStartEnd(o[0].getBoundingClientRect());
                            let l = 0;
                            for (let t = 0; t < o.length; t++)
                                l += o[t].offsetWidth;
                            e = Math.abs(a - r) - 5,
                            n = l > 0 ? .75 * l + 10 : 0
                        }
                        for (let o = 0; o < s.length; o++)
                            s[o].style.width = `${e}px`;
                        for (let o = 0; o < r.length; o++)
                            r[o].style.width = `${n}px`;
                        this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1
                    }
                    _getStartEnd(t)
                    {
                        return this._dir && "rtl" === this._dir.value ? t.right : t.left
                    }
                    _isAttachedToDOM()
                    {
                        const t = this._elementRef.nativeElement;
                        if (t.getRootNode) {
                            const e = t.getRootNode();
                            return e && e !== t
                        }
                        return document.documentElement.contains(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Fo), Rr(oa), Rr(Fo), Rr(rf, 8), Rr(Mg, 8), Rr(Fp), Rr(Cl), Rr(ip, 8))
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["mat-form-field"]],
                    contentQueries: function(t, e, n) {
                        if (1 & t && (Ga(n, Ag, 1), Ga(n, Ag, 3), Ga(n, Og, 1), Ga(n, Og, 3), Ga(n, Ig, 1), Ga(n, Sg, 1), Ga(n, Tg, 1), Ga(n, Pg, 1), Ga(n, Dg, 1)), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e._controlNonStatic = t.first),
                            Qa(t = Ya()) && (e._controlStatic = t.first),
                            Qa(t = Ya()) && (e._labelChildNonStatic = t.first),
                            Qa(t = Ya()) && (e._labelChildStatic = t.first),
                            Qa(t = Ya()) && (e._placeholderChild = t.first),
                            Qa(t = Ya()) && (e._errorChildren = t),
                            Qa(t = Ya()) && (e._hintChildren = t),
                            Qa(t = Ya()) && (e._prefixChildren = t),
                            Qa(t = Ya()) && (e._suffixChildren = t)
                        }
                    },
                    viewQuery: function(t, e) {
                        if (1 & t && (Ka(lg, 1), Ka(cg, 3), Ka(hg, 1), Ka(ug, 1)), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e.underlineRef = t.first),
                            Qa(t = Ya()) && (e._connectionContainerRef = t.first),
                            Qa(t = Ya()) && (e._inputContainerRef = t.first),
                            Qa(t = Ya()) && (e._label = t.first)
                        }
                    },
                    hostAttrs: [1, "mat-form-field"],
                    hostVars: 44,
                    hostBindings: function(t, e) {
                        2 & t && to("mat-form-field-appearance-standard", "standard" == e.appearance)("mat-form-field-appearance-fill", "fill" == e.appearance)("mat-form-field-appearance-outline", "outline" == e.appearance)("mat-form-field-appearance-legacy", "legacy" == e.appearance)("mat-form-field-invalid", e._control.errorState)("mat-form-field-can-float", e._canLabelFloat())("mat-form-field-should-float", e._shouldLabelFloat())("mat-form-field-has-label", e._hasFloatingLabel())("mat-form-field-hide-placeholder", e._hideControlPlaceholder())("mat-form-field-disabled", e._control.disabled)("mat-form-field-autofilled", e._control.autofilled)("mat-focused", e._control.focused)("mat-accent", "accent" == e.color)("mat-warn", "warn" == e.color)("ng-untouched", e._shouldForward("untouched"))("ng-touched", e._shouldForward("touched"))("ng-pristine", e._shouldForward("pristine"))("ng-dirty", e._shouldForward("dirty"))("ng-valid", e._shouldForward("valid"))("ng-invalid", e._shouldForward("invalid"))("ng-pending", e._shouldForward("pending"))("_mat-animation-noopable", !e._animationsEnabled)
                    },
                    inputs: {
                        color: "color",
                        floatLabel: "floatLabel",
                        appearance: "appearance",
                        hideRequiredMarker: "hideRequiredMarker",
                        hintLabel: "hintLabel"
                    },
                    exportAs: ["matFormField"],
                    features: [Ao([{
                        provide: Lg,
                        useExisting: t
                    }]), vr],
                    ngContentSelectors: Eg,
                    decls: 15,
                    vars: 8,
                    consts: [[1, "mat-form-field-wrapper"], [1, "mat-form-field-flex", 3, "click"], ["connectionContainer", ""], [4, "ngIf"], ["class", "mat-form-field-prefix", 4, "ngIf"], [1, "mat-form-field-infix"], ["inputContainer", ""], [1, "mat-form-field-label-wrapper"], ["class", "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "mat-empty", "mat-form-field-empty", "mat-accent", "mat-warn", "ngSwitch", "cdkObserveContent", 4, "ngIf"], ["class", "mat-form-field-suffix", 4, "ngIf"], ["class", "mat-form-field-underline", 4, "ngIf"], [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"], [1, "mat-form-field-outline"], [1, "mat-form-field-outline-start"], [1, "mat-form-field-outline-gap"], [1, "mat-form-field-outline-end"], [1, "mat-form-field-outline", "mat-form-field-outline-thick"], [1, "mat-form-field-prefix"], [1, "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "ngSwitch", "cdkObserveContent"], ["label", ""], ["class", "mat-placeholder-required mat-form-field-required-marker", "aria-hidden", "true", 4, "ngIf"], ["aria-hidden", "true", 1, "mat-placeholder-required", "mat-form-field-required-marker"], [1, "mat-form-field-suffix"], [1, "mat-form-field-underline"], ["underline", ""], [1, "mat-form-field-ripple"], [1, "mat-form-field-hint-wrapper"], ["class", "mat-hint", 3, "id", 4, "ngIf"], [1, "mat-form-field-hint-spacer"], [1, "mat-hint", 3, "id"]],
                    template: function(t, e) {
                        1 & t && (Qr(xg), Nr(0, "div", 0), Nr(1, "div", 1, 2), $r("click", function(t) {
                            return e._control.onContainerClick && e._control.onContainerClick(t)
                        }), Dr(3, dg, 9, 0, "ng-container", 3), Dr(4, pg, 2, 0, "div", 4), Nr(5, "div", 5, 6), Kr(7), Nr(8, "span", 7), Dr(9, _g, 5, 16, "label", 8), Mr(), Mr(), Dr(10, yg, 2, 0, "div", 9), Mr(), Dr(11, bg, 3, 4, "div", 10), Nr(12, "div", 11), Dr(13, vg, 2, 1, "div", 12), Dr(14, Cg, 5, 2, "div", 13), Mr(), Mr()),
                        2 & t && (as(3), Fr("ngIf", "outline" == e.appearance), as(1), Fr("ngIf", e._prefixChildren.length), as(5), Fr("ngIf", e._hasFloatingLabel()), as(1), Fr("ngIf", e._suffixChildren.length), as(1), Fr("ngIf", "outline" != e.appearance), as(1), Fr("ngSwitch", e._getDisplayedMessages()), as(1), Fr("ngSwitchCase", "error"), as(1), Fr("ngSwitchCase", "hint"))
                    },
                    directives: [Sc, Oc, Ic, Wp],
                    styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n", '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n', '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n', ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n"],
                    encapsulation: 2,
                    data: {
                        animation: [kg.transitionMessages]
                    },
                    changeDetection: 0
                }), t
            })(),
            Bg = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Rc, pf, Up], pf]
                }), t
            })();
        const Hg = new qn("MAT_INPUT_VALUE_ACCESSOR"),
            zg = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
        let $g = 0;
        class qg {
            constructor(t, e, n, i)
            {
                this._defaultErrorStateMatcher = t,
                this._parentForm = e,
                this._parentFormGroup = n,
                this.ngControl = i
            }
        }
        const Wg = _f(qg);
        let Ug = (() => {
                class t extends Wg {
                    constructor(t, e, n, i, s, r, o, a, l, c)
                    {
                        super(r, i, s, n),
                        this._elementRef = t,
                        this._platform = e,
                        this.ngControl = n,
                        this._autofillMonitor = a,
                        this._formField = c,
                        this._uid = "mat-input-" + $g++,
                        this.focused = !1,
                        this.stateChanges = new x,
                        this.controlType = "mat-input",
                        this.autofilled = !1,
                        this._disabled = !1,
                        this._required = !1,
                        this._type = "text",
                        this._readonly = !1,
                        this._neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter(t => Mp().has(t));
                        const h = this._elementRef.nativeElement,
                            u = h.nodeName.toLowerCase();
                        this._inputValueAccessor = o || h,
                        this._previousNativeValue = this.value,
                        this.id = this.id,
                        e.IOS && l.runOutsideAngular(() => {
                            t.nativeElement.addEventListener("keyup", t => {
                                let e = t.target;
                                e.value || e.selectionStart || e.selectionEnd || (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0))
                            })
                        }),
                        this._isServer = !this._platform.isBrowser,
                        this._isNativeSelect = "select" === u,
                        this._isTextarea = "textarea" === u,
                        this._isNativeSelect && (this.controlType = h.multiple ? "mat-native-select-multiple" : "mat-native-select")
                    }
                    get disabled()
                    {
                        return this.ngControl && null !== this.ngControl.disabled ? this.ngControl.disabled : this._disabled
                    }
                    set disabled(t)
                    {
                        this._disabled = Tp(t),
                        this.focused && (this.focused = !1, this.stateChanges.next())
                    }
                    get id()
                    {
                        return this._id
                    }
                    set id(t)
                    {
                        this._id = t || this._uid
                    }
                    get required()
                    {
                        return this._required
                    }
                    set required(t)
                    {
                        this._required = Tp(t)
                    }
                    get type()
                    {
                        return this._type
                    }
                    set type(t)
                    {
                        this._type = t || "text",
                        this._validateType(),
                        !this._isTextarea && Mp().has(this._type) && (this._elementRef.nativeElement.type = this._type)
                    }
                    get value()
                    {
                        return this._inputValueAccessor.value
                    }
                    set value(t)
                    {
                        t !== this.value && (this._inputValueAccessor.value = t, this.stateChanges.next())
                    }
                    get readonly()
                    {
                        return this._readonly
                    }
                    set readonly(t)
                    {
                        this._readonly = Tp(t)
                    }
                    ngAfterViewInit()
                    {
                        this._platform.isBrowser && this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t => {
                            this.autofilled = t.isAutofilled,
                            this.stateChanges.next()
                        })
                    }
                    ngOnChanges()
                    {
                        this.stateChanges.next()
                    }
                    ngOnDestroy()
                    {
                        this.stateChanges.complete(),
                        this._platform.isBrowser && this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement)
                    }
                    ngDoCheck()
                    {
                        this.ngControl && this.updateErrorState(),
                        this._dirtyCheckNativeValue(),
                        this._dirtyCheckPlaceholder()
                    }
                    focus(t)
                    {
                        this._elementRef.nativeElement.focus(t)
                    }
                    _focusChanged(t)
                    {
                        t === this.focused || this.readonly && t || (this.focused = t, this.stateChanges.next())
                    }
                    _onInput() {}
                    _dirtyCheckPlaceholder()
                    {
                        var t,
                            e;
                        const n = (null === (e = null === (t = this._formField) || void 0 === t ? void 0 : t._hideControlPlaceholder) || void 0 === e ? void 0 : e.call(t)) ? null : this.placeholder;
                        if (n !== this._previousPlaceholder) {
                            const t = this._elementRef.nativeElement;
                            this._previousPlaceholder = n,
                            n ? t.setAttribute("placeholder", n) : t.removeAttribute("placeholder")
                        }
                    }
                    _dirtyCheckNativeValue()
                    {
                        const t = this._elementRef.nativeElement.value;
                        this._previousNativeValue !== t && (this._previousNativeValue = t, this.stateChanges.next())
                    }
                    _validateType()
                    {
                        zg.indexOf(this._type)
                    }
                    _isNeverEmpty()
                    {
                        return this._neverEmptyInputTypes.indexOf(this._type) > -1
                    }
                    _isBadInput()
                    {
                        let t = this._elementRef.nativeElement.validity;
                        return t && t.badInput
                    }
                    get empty()
                    {
                        return !(this._isNeverEmpty() || this._elementRef.nativeElement.value || this._isBadInput() || this.autofilled)
                    }
                    get shouldLabelFloat()
                    {
                        if (this._isNativeSelect) {
                            const t = this._elementRef.nativeElement,
                                e = t.options[0];
                            return this.focused || t.multiple || !this.empty || !!(t.selectedIndex > -1 && e && e.label)
                        }
                        return this.focused || !this.empty
                    }
                    setDescribedByIds(t)
                    {
                        t.length ? this._elementRef.nativeElement.setAttribute("aria-describedby", t.join(" ")) : this._elementRef.nativeElement.removeAttribute("aria-describedby")
                    }
                    onContainerClick()
                    {
                        this.focused || this.focus()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Fo), Rr(Fp), Rr(nm, 10), Rr(Bm, 8), Rr(Wm, 8), Rr(yf), Rr(Hg, 10), Rr(og), Rr(Cl), Rr(Lg, 8))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["input", "matInput", ""], ["textarea", "matInput", ""], ["select", "matNativeControl", ""], ["input", "matNativeControl", ""], ["textarea", "matNativeControl", ""]],
                    hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"],
                    hostVars: 9,
                    hostBindings: function(t, e) {
                        1 & t && $r("focus", function() {
                            return e._focusChanged(!0)
                        })("blur", function() {
                            return e._focusChanged(!1)
                        })("input", function() {
                            return e._onInput()
                        }),
                        2 & t && (co("disabled", e.disabled)("required", e.required), Pr("id", e.id)("data-placeholder", e.placeholder)("readonly", e.readonly && !e._isNativeSelect || null)("aria-invalid", e.errorState)("aria-required", e.required.toString()), to("mat-input-server", e._isServer))
                    },
                    inputs: {
                        id: "id",
                        disabled: "disabled",
                        required: "required",
                        type: "type",
                        value: "value",
                        readonly: "readonly",
                        placeholder: "placeholder",
                        errorStateMatcher: "errorStateMatcher",
                        userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"]
                    },
                    exportAs: ["matInput"],
                    features: [Ao([{
                        provide: Ag,
                        useExisting: t
                    }]), vr, le]
                }), t
            })(),
            Zg = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [yf],
                    imports: [[ag, Bg, pf], ag, Bg]
                }), t
            })();
        class Qg {
            constructor(t, e)
            {
                this.compare = t,
                this.keySelector = e
            }
            call(t, e)
            {
                return e.subscribe(new Kg(t, this.compare, this.keySelector))
            }
        }
        class Kg extends f {
            constructor(t, e, n)
            {
                super(t),
                this.keySelector = n,
                this.hasKey = !1,
                "function" == typeof e && (this.compare = e)
            }
            compare(t, e)
            {
                return t === e
            }
            _next(t)
            {
                let e;
                try {
                    const {keySelector: n} = this;
                    e = n ? n(t) : t
                } catch (i) {
                    return this.destination.error(i)
                }
                let n = !1;
                if (this.hasKey)
                    try {
                        const {compare: t} = this;
                        n = t(this.key, e)
                    } catch (i) {
                        return this.destination.error(i)
                    }
                else
                    this.hasKey = !0;
                n || (this.key = e, this.destination.next(t))
            }
        }
        let Gg = (() => {
                class t {
                    constructor()
                    {
                        this._listeners = []
                    }
                    notify(t, e)
                    {
                        for (let n of this._listeners)
                            n(t, e)
                    }
                    listen(t)
                    {
                        return this._listeners.push(t), () => {
                            this._listeners = this._listeners.filter(e => t !== e)
                        }
                    }
                    ngOnDestroy()
                    {
                        this._listeners = []
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            Yg = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this._ngZone = t,
                        this._platform = e,
                        this._scrolled = new x,
                        this._globalSubscription = null,
                        this._scrolledCount = 0,
                        this.scrollContainers = new Map,
                        this._document = n
                    }
                    register(t)
                    {
                        this.scrollContainers.has(t) || this.scrollContainers.set(t, t.elementScrolled().subscribe(() => this._scrolled.next(t)))
                    }
                    deregister(t)
                    {
                        const e = this.scrollContainers.get(t);
                        e && (e.unsubscribe(), this.scrollContainers.delete(t))
                    }
                    scrolled(t=20)
                    {
                        return this._platform.isBrowser ? new y(e => {
                            this._globalSubscription || this._addGlobalListener();
                            const n = t > 0 ? this._scrolled.pipe(eg(t)).subscribe(e) : this._scrolled.subscribe(e);
                            return this._scrolledCount++, () => {
                                n.unsubscribe(),
                                this._scrolledCount--,
                                this._scrolledCount || this._removeGlobalListener()
                            }
                        }) : op()
                    }
                    ngOnDestroy()
                    {
                        this._removeGlobalListener(),
                        this.scrollContainers.forEach((t, e) => this.deregister(e)),
                        this._scrolled.complete()
                    }
                    ancestorScrolled(t, e)
                    {
                        const n = this.getAncestorScrollContainers(t);
                        return this.scrolled(e).pipe(vp(t => !t || n.indexOf(t) > -1))
                    }
                    getAncestorScrollContainers(t)
                    {
                        const e = [];
                        return this.scrollContainers.forEach((n, i) => {
                            this._scrollableContainsElement(i, t) && e.push(i)
                        }), e
                    }
                    _getWindow()
                    {
                        return this._document.defaultView || window
                    }
                    _scrollableContainsElement(t, e)
                    {
                        let n = Pp(e),
                            i = t.getElementRef().nativeElement;
                        do {
                            if (n == i)
                                return !0
                        } while (n = n.parentElement);
                        return !1
                    }
                    _addGlobalListener()
                    {
                        this._globalSubscription = this._ngZone.runOutsideAngular(() => Km(this._getWindow().document, "scroll").subscribe(() => this._scrolled.next()))
                    }
                    _removeGlobalListener()
                    {
                        this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Cl), oi(Fp), oi(Kl, 8))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Cl), oi(Fp), oi(Kl, 8))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            Xg = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this._platform = t,
                        this._change = new x,
                        this._changeListener = t => {
                            this._change.next(t)
                        },
                        this._document = n,
                        e.runOutsideAngular(() => {
                            if (t.isBrowser) {
                                const t = this._getWindow();
                                t.addEventListener("resize", this._changeListener),
                                t.addEventListener("orientationchange", this._changeListener)
                            }
                            this.change().subscribe(() => this._updateViewportSize())
                        })
                    }
                    ngOnDestroy()
                    {
                        if (this._platform.isBrowser) {
                            const t = this._getWindow();
                            t.removeEventListener("resize", this._changeListener),
                            t.removeEventListener("orientationchange", this._changeListener)
                        }
                        this._change.complete()
                    }
                    getViewportSize()
                    {
                        this._viewportSize || this._updateViewportSize();
                        const t = {
                            width: this._viewportSize.width,
                            height: this._viewportSize.height
                        };
                        return this._platform.isBrowser || (this._viewportSize = null), t
                    }
                    getViewportRect()
                    {
                        const t = this.getViewportScrollPosition(),
                            {width: e, height: n} = this.getViewportSize();
                        return {
                            top: t.top,
                            left: t.left,
                            bottom: t.top + n,
                            right: t.left + e,
                            height: n,
                            width: e
                        }
                    }
                    getViewportScrollPosition()
                    {
                        if (!this._platform.isBrowser)
                            return {
                                top: 0,
                                left: 0
                            };
                        const t = this._document,
                            e = this._getWindow(),
                            n = t.documentElement,
                            i = n.getBoundingClientRect();
                        return {
                            top: -i.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                            left: -i.left || t.body.scrollLeft || e.scrollX || n.scrollLeft || 0
                        }
                    }
                    change(t=20)
                    {
                        return t > 0 ? this._change.pipe(eg(t)) : this._change
                    }
                    _getWindow()
                    {
                        return this._document.defaultView || window
                    }
                    _updateViewportSize()
                    {
                        const t = this._getWindow();
                        this._viewportSize = this._platform.isBrowser ? {
                            width: t.innerWidth,
                            height: t.innerHeight
                        } : {
                            width: 0,
                            height: 0
                        }
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Fp), oi(Cl), oi(Kl, 8))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Fp), oi(Cl), oi(Kl, 8))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            Jg = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })(),
            t_ = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[of, Vp, Jg], of, Jg]
                }), t
            })();
        class e_ {
            attach(t)
            {
                return this._attachedHost = t, t.attach(this)
            }
            detach()
            {
                let t = this._attachedHost;
                null != t && (this._attachedHost = null, t.detach())
            }
            get isAttached()
            {
                return null != this._attachedHost
            }
            setAttachedHost(t)
            {
                this._attachedHost = t
            }
        }
        class n_ extends e_ {
            constructor(t, e, n, i)
            {
                super(),
                this.component = t,
                this.viewContainerRef = e,
                this.injector = n,
                this.componentFactoryResolver = i
            }
        }
        class i_ extends e_ {
            constructor(t, e, n)
            {
                super(),
                this.templateRef = t,
                this.viewContainerRef = e,
                this.context = n
            }
            get origin()
            {
                return this.templateRef.elementRef
            }
            attach(t, e=this.context)
            {
                return this.context = e, super.attach(t)
            }
            detach()
            {
                return this.context = void 0, super.detach()
            }
        }
        class s_ extends e_ {
            constructor(t)
            {
                super(),
                this.element = t instanceof Fo ? t.nativeElement : t
            }
        }
        class r_ {
            constructor()
            {
                this._isDisposed = !1,
                this.attachDomPortal = null
            }
            hasAttached()
            {
                return !!this._attachedPortal
            }
            attach(t)
            {
                return t instanceof n_ ? (this._attachedPortal = t, this.attachComponentPortal(t)) : t instanceof i_ ? (this._attachedPortal = t, this.attachTemplatePortal(t)) : this.attachDomPortal && t instanceof s_ ? (this._attachedPortal = t, this.attachDomPortal(t)) : void 0
            }
            detach()
            {
                this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null),
                this._invokeDisposeFn()
            }
            dispose()
            {
                this.hasAttached() && this.detach(),
                this._invokeDisposeFn(),
                this._isDisposed = !0
            }
            setDisposeFn(t)
            {
                this._disposeFn = t
            }
            _invokeDisposeFn()
            {
                this._disposeFn && (this._disposeFn(), this._disposeFn = null)
            }
        }
        class o_ extends r_ {
            constructor(t, e, n, i, s)
            {
                super(),
                this.outletElement = t,
                this._componentFactoryResolver = e,
                this._appRef = n,
                this._defaultInjector = i,
                this.attachDomPortal = t => {
                    const e = t.element,
                        n = this._document.createComment("dom-portal");
                    e.parentNode.insertBefore(n, e),
                    this.outletElement.appendChild(e),
                    super.setDisposeFn(() => {
                        n.parentNode && n.parentNode.replaceChild(e, n)
                    })
                },
                this._document = s
            }
            attachComponentPortal(t)
            {
                const e = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component);
                let n;
                return t.viewContainerRef ? (n = t.viewContainerRef.createComponent(e, t.viewContainerRef.length, t.injector || t.viewContainerRef.injector), this.setDisposeFn(() => n.destroy())) : (n = e.create(t.injector || this._defaultInjector), this._appRef.attachView(n.hostView), this.setDisposeFn(() => {
                    this._appRef.detachView(n.hostView),
                    n.destroy()
                })), this.outletElement.appendChild(this._getComponentRootNode(n)), n
            }
            attachTemplatePortal(t)
            {
                let e = t.viewContainerRef,
                    n = e.createEmbeddedView(t.templateRef, t.context);
                return n.rootNodes.forEach(t => this.outletElement.appendChild(t)), n.detectChanges(), this.setDisposeFn(() => {
                    let t = e.indexOf(n);
                    -1 !== t && e.remove(t)
                }), n
            }
            dispose()
            {
                super.dispose(),
                null != this.outletElement.parentNode && this.outletElement.parentNode.removeChild(this.outletElement)
            }
            _getComponentRootNode(t)
            {
                return t.hostView.rootNodes[0]
            }
        }
        let a_ = (() => {
                class t extends r_ {
                    constructor(t, e, n)
                    {
                        super(),
                        this._componentFactoryResolver = t,
                        this._viewContainerRef = e,
                        this._isInitialized = !1,
                        this.attached = new Na,
                        this.attachDomPortal = t => {
                            const e = t.element,
                                n = this._document.createComment("dom-portal");
                            t.setAttachedHost(this),
                            e.parentNode.insertBefore(n, e),
                            this._getRootNode().appendChild(e),
                            super.setDisposeFn(() => {
                                n.parentNode && n.parentNode.replaceChild(e, n)
                            })
                        },
                        this._document = n
                    }
                    get portal()
                    {
                        return this._attachedPortal
                    }
                    set portal(t)
                    {
                        (!this.hasAttached() || t || this._isInitialized) && (this.hasAttached() && super.detach(), t && super.attach(t), this._attachedPortal = t)
                    }
                    get attachedRef()
                    {
                        return this._attachedRef
                    }
                    ngOnInit()
                    {
                        this._isInitialized = !0
                    }
                    ngOnDestroy()
                    {
                        super.dispose(),
                        this._attachedPortal = null,
                        this._attachedRef = null
                    }
                    attachComponentPortal(t)
                    {
                        t.setAttachedHost(this);
                        const e = null != t.viewContainerRef ? t.viewContainerRef : this._viewContainerRef,
                            n = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component),
                            i = e.createComponent(n, e.length, t.injector || e.injector);
                        return e !== this._viewContainerRef && this._getRootNode().appendChild(i.hostView.rootNodes[0]), super.setDisposeFn(() => i.destroy()), this._attachedPortal = t, this._attachedRef = i, this.attached.emit(i), i
                    }
                    attachTemplatePortal(t)
                    {
                        t.setAttachedHost(this);
                        const e = this._viewContainerRef.createEmbeddedView(t.templateRef, t.context);
                        return super.setDisposeFn(() => this._viewContainerRef.clear()), this._attachedPortal = t, this._attachedRef = e, this.attached.emit(e), e
                    }
                    _getRootNode()
                    {
                        const t = this._viewContainerRef.element.nativeElement;
                        return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Io), Rr(_a), Rr(Kl))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["", "cdkPortalOutlet", ""]],
                    inputs: {
                        portal: ["cdkPortalOutlet", "portal"]
                    },
                    outputs: {
                        attached: "attached"
                    },
                    exportAs: ["cdkPortalOutlet"],
                    features: [vr]
                }), t
            })(),
            l_ = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })();
        const c_ = zp();
        class h_ {
            constructor(t, e)
            {
                this._viewportRuler = t,
                this._previousHTMLStyles = {
                    top: "",
                    left: ""
                },
                this._isEnabled = !1,
                this._document = e
            }
            attach() {}
            enable()
            {
                if (this._canBeEnabled()) {
                    const t = this._document.documentElement;
                    this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(),
                    this._previousHTMLStyles.left = t.style.left || "",
                    this._previousHTMLStyles.top = t.style.top || "",
                    t.style.left = Ip(-this._previousScrollPosition.left),
                    t.style.top = Ip(-this._previousScrollPosition.top),
                    t.classList.add("cdk-global-scrollblock"),
                    this._isEnabled = !0
                }
            }
            disable()
            {
                if (this._isEnabled) {
                    const t = this._document.documentElement,
                        e = t.style,
                        n = this._document.body.style,
                        i = e.scrollBehavior || "",
                        s = n.scrollBehavior || "";
                    this._isEnabled = !1,
                    e.left = this._previousHTMLStyles.left,
                    e.top = this._previousHTMLStyles.top,
                    t.classList.remove("cdk-global-scrollblock"),
                    c_ && (e.scrollBehavior = n.scrollBehavior = "auto"),
                    window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top),
                    c_ && (e.scrollBehavior = i, n.scrollBehavior = s)
                }
            }
            _canBeEnabled()
            {
                if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled)
                    return !1;
                const t = this._document.body,
                    e = this._viewportRuler.getViewportSize();
                return t.scrollHeight > e.height || t.scrollWidth > e.width
            }
        }
        class u_ {
            constructor(t, e, n, i)
            {
                this._scrollDispatcher = t,
                this._ngZone = e,
                this._viewportRuler = n,
                this._config = i,
                this._scrollSubscription = null,
                this._detach = () => {
                    this.disable(),
                    this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach())
                }
            }
            attach(t)
            {
                this._overlayRef = t
            }
            enable()
            {
                if (this._scrollSubscription)
                    return;
                const t = this._scrollDispatcher.scrolled(0);
                this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = t.subscribe(() => {
                    const t = this._viewportRuler.getViewportScrollPosition().top;
                    Math.abs(t - this._initialScrollPosition) > this._config.threshold ? this._detach() : this._overlayRef.updatePosition()
                })) : this._scrollSubscription = t.subscribe(this._detach)
            }
            disable()
            {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
            }
            detach()
            {
                this.disable(),
                this._overlayRef = null
            }
        }
        class d_ {
            enable() {}
            disable() {}
            attach() {}
        }
        function p_(t, e) {
            return e.some(e => t.bottom < e.top || t.top > e.bottom || t.right < e.left || t.left > e.right)
        }
        function f_(t, e) {
            return e.some(e => t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right)
        }
        class m_ {
            constructor(t, e, n, i)
            {
                this._scrollDispatcher = t,
                this._viewportRuler = e,
                this._ngZone = n,
                this._config = i,
                this._scrollSubscription = null
            }
            attach(t)
            {
                this._overlayRef = t
            }
            enable()
            {
                this._scrollSubscription || (this._scrollSubscription = this._scrollDispatcher.scrolled(this._config ? this._config.scrollThrottle : 0).subscribe(() => {
                    if (this._overlayRef.updatePosition(), this._config && this._config.autoClose) {
                        const t = this._overlayRef.overlayElement.getBoundingClientRect(),
                            {width: e, height: n} = this._viewportRuler.getViewportSize();
                        p_(t, [{
                            width: e,
                            height: n,
                            bottom: n,
                            right: e,
                            top: 0,
                            left: 0
                        }]) && (this.disable(), this._ngZone.run(() => this._overlayRef.detach()))
                    }
                }))
            }
            disable()
            {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
            }
            detach()
            {
                this.disable(),
                this._overlayRef = null
            }
        }
        let g_ = (() => {
            class t {
                constructor(t, e, n, i)
                {
                    this._scrollDispatcher = t,
                    this._viewportRuler = e,
                    this._ngZone = n,
                    this.noop = () => new d_,
                    this.close = t => new u_(this._scrollDispatcher, this._ngZone, this._viewportRuler, t),
                    this.block = () => new h_(this._viewportRuler, this._document),
                    this.reposition = t => new m_(this._scrollDispatcher, this._viewportRuler, this._ngZone, t),
                    this._document = i
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Yg), oi(Xg), oi(Cl), oi(Kl))
            }, t.\u0275prov = at({
                factory: function() {
                    return new t(oi(Yg), oi(Xg), oi(Cl), oi(Kl))
                },
                token: t,
                providedIn: "root"
            }), t
        })();
        class __ {
            constructor(t)
            {
                if (this.scrollStrategy = new d_, this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, t) {
                    const e = Object.keys(t);
                    for (const n of e)
                        void 0 !== t[n] && (this[n] = t[n])
                }
            }
        }
        class y_ {
            constructor(t, e, n, i, s)
            {
                this.offsetX = n,
                this.offsetY = i,
                this.panelClass = s,
                this.originX = t.originX,
                this.originY = t.originY,
                this.overlayX = e.overlayX,
                this.overlayY = e.overlayY
            }
        }
        class b_ {
            constructor(t, e)
            {
                this.connectionPair = t,
                this.scrollableViewProperties = e
            }
        }
        let v_ = (() => {
                class t {
                    constructor(t)
                    {
                        this._attachedOverlays = [],
                        this._document = t
                    }
                    ngOnDestroy()
                    {
                        this.detach()
                    }
                    add(t)
                    {
                        this.remove(t),
                        this._attachedOverlays.push(t)
                    }
                    remove(t)
                    {
                        const e = this._attachedOverlays.indexOf(t);
                        e > -1 && this._attachedOverlays.splice(e, 1),
                        0 === this._attachedOverlays.length && this.detach()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Kl))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Kl))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            w_ = (() => {
                class t extends v_ {
                    constructor(t)
                    {
                        super(t),
                        this._keydownListener = t => {
                            const e = this._attachedOverlays;
                            for (let n = e.length - 1; n > -1; n--)
                                if (e[n]._keydownEvents.observers.length > 0) {
                                    e[n]._keydownEvents.next(t);
                                    break
                                }
                        }
                    }
                    add(t)
                    {
                        super.add(t),
                        this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener), this._isAttached = !0)
                    }
                    detach()
                    {
                        this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener), this._isAttached = !1)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Kl))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Kl))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            C_ = (() => {
                class t extends v_ {
                    constructor(t, e)
                    {
                        super(t),
                        this._platform = e,
                        this._cursorStyleIsSet = !1,
                        this._clickListener = t => {
                            const e = t.composedPath ? t.composedPath()[0] : t.target,
                                n = this._attachedOverlays.slice();
                            for (let i = n.length - 1; i > -1; i--) {
                                const s = n[i];
                                if (!(s._outsidePointerEvents.observers.length < 1) && s.hasAttached()) {
                                    if (s.overlayElement.contains(e))
                                        break;
                                    s._outsidePointerEvents.next(t)
                                }
                            }
                        }
                    }
                    add(t)
                    {
                        super.add(t),
                        this._isAttached || (this._document.body.addEventListener("click", this._clickListener, !0), this._document.body.addEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && !this._cursorStyleIsSet && (this._cursorOriginalValue = this._document.body.style.cursor, this._document.body.style.cursor = "pointer", this._cursorStyleIsSet = !0), this._isAttached = !0)
                    }
                    detach()
                    {
                        this._isAttached && (this._document.body.removeEventListener("click", this._clickListener, !0), this._document.body.removeEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && this._cursorStyleIsSet && (this._document.body.style.cursor = this._cursorOriginalValue, this._cursorStyleIsSet = !1), this._isAttached = !1)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Kl), oi(Fp))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Kl), oi(Fp))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })();
        const x_ = !("undefined" == typeof window || !window || !window.__karma__ && !window.jasmine);
        let E_ = (() => {
            class t {
                constructor(t, e)
                {
                    this._platform = e,
                    this._document = t
                }
                ngOnDestroy()
                {
                    const t = this._containerElement;
                    t && t.parentNode && t.parentNode.removeChild(t)
                }
                getContainerElement()
                {
                    return this._containerElement || this._createContainer(), this._containerElement
                }
                _createContainer()
                {
                    const t = "cdk-overlay-container";
                    if (this._platform.isBrowser || x_) {
                        const e = this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);
                        for (let t = 0; t < e.length; t++)
                            e[t].parentNode.removeChild(e[t])
                    }
                    const e = this._document.createElement("div");
                    e.classList.add(t),
                    x_ ? e.setAttribute("platform", "test") : this._platform.isBrowser || e.setAttribute("platform", "server"),
                    this._document.body.appendChild(e),
                    this._containerElement = e
                }
            }
            return t.\u0275fac = function(e) {
                return new (e || t)(oi(Kl), oi(Fp))
            }, t.\u0275prov = at({
                factory: function() {
                    return new t(oi(Kl), oi(Fp))
                },
                token: t,
                providedIn: "root"
            }), t
        })();
        class S_ {
            constructor(t, e, n, i, s, r, o, a, l)
            {
                this._portalOutlet = t,
                this._host = e,
                this._pane = n,
                this._config = i,
                this._ngZone = s,
                this._keyboardDispatcher = r,
                this._document = o,
                this._location = a,
                this._outsideClickDispatcher = l,
                this._backdropElement = null,
                this._backdropClick = new x,
                this._attachments = new x,
                this._detachments = new x,
                this._locationChanges = u.EMPTY,
                this._backdropClickHandler = t => this._backdropClick.next(t),
                this._keydownEvents = new x,
                this._outsidePointerEvents = new x,
                i.scrollStrategy && (this._scrollStrategy = i.scrollStrategy, this._scrollStrategy.attach(this)),
                this._positionStrategy = i.positionStrategy
            }
            get overlayElement()
            {
                return this._pane
            }
            get backdropElement()
            {
                return this._backdropElement
            }
            get hostElement()
            {
                return this._host
            }
            attach(t)
            {
                let e = this._portalOutlet.attach(t);
                return !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host), this._positionStrategy && this._positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._scrollStrategy && this._scrollStrategy.enable(), this._ngZone.onStable.pipe(Sp(1)).subscribe(() => {
                    this.hasAttached() && this.updatePosition()
                }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && (this._locationChanges = this._location.subscribe(() => this.dispose())), this._outsideClickDispatcher.add(this), e
            }
            detach()
            {
                if (!this.hasAttached())
                    return;
                this.detachBackdrop(),
                this._togglePointerEvents(!1),
                this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(),
                this._scrollStrategy && this._scrollStrategy.disable();
                const t = this._portalOutlet.detach();
                return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), this._locationChanges.unsubscribe(), this._outsideClickDispatcher.remove(this), t
            }
            dispose()
            {
                const t = this.hasAttached();
                this._positionStrategy && this._positionStrategy.dispose(),
                this._disposeScrollStrategy(),
                this.detachBackdrop(),
                this._locationChanges.unsubscribe(),
                this._keyboardDispatcher.remove(this),
                this._portalOutlet.dispose(),
                this._attachments.complete(),
                this._backdropClick.complete(),
                this._keydownEvents.complete(),
                this._outsidePointerEvents.complete(),
                this._outsideClickDispatcher.remove(this),
                this._host && this._host.parentNode && (this._host.parentNode.removeChild(this._host), this._host = null),
                this._previousHostParent = this._pane = null,
                t && this._detachments.next(),
                this._detachments.complete()
            }
            hasAttached()
            {
                return this._portalOutlet.hasAttached()
            }
            backdropClick()
            {
                return this._backdropClick
            }
            attachments()
            {
                return this._attachments
            }
            detachments()
            {
                return this._detachments
            }
            keydownEvents()
            {
                return this._keydownEvents
            }
            outsidePointerEvents()
            {
                return this._outsidePointerEvents
            }
            getConfig()
            {
                return this._config
            }
            updatePosition()
            {
                this._positionStrategy && this._positionStrategy.apply()
            }
            updatePositionStrategy(t)
            {
                t !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), this._positionStrategy = t, this.hasAttached() && (t.attach(this), this.updatePosition()))
            }
            updateSize(t)
            {
                this._config = Object.assign(Object.assign({}, this._config), t),
                this._updateElementSize()
            }
            setDirection(t)
            {
                this._config = Object.assign(Object.assign({}, this._config), {
                    direction: t
                }),
                this._updateElementDirection()
            }
            addPanelClass(t)
            {
                this._pane && this._toggleClasses(this._pane, t, !0)
            }
            removePanelClass(t)
            {
                this._pane && this._toggleClasses(this._pane, t, !1)
            }
            getDirection()
            {
                const t = this._config.direction;
                return t ? "string" == typeof t ? t : t.value : "ltr"
            }
            updateScrollStrategy(t)
            {
                t !== this._scrollStrategy && (this._disposeScrollStrategy(), this._scrollStrategy = t, this.hasAttached() && (t.attach(this), t.enable()))
            }
            _updateElementDirection()
            {
                this._host.setAttribute("dir", this.getDirection())
            }
            _updateElementSize()
            {
                if (!this._pane)
                    return;
                const t = this._pane.style;
                t.width = Ip(this._config.width),
                t.height = Ip(this._config.height),
                t.minWidth = Ip(this._config.minWidth),
                t.minHeight = Ip(this._config.minHeight),
                t.maxWidth = Ip(this._config.maxWidth),
                t.maxHeight = Ip(this._config.maxHeight)
            }
            _togglePointerEvents(t)
            {
                this._pane.style.pointerEvents = t ? "" : "none"
            }
            _attachBackdrop()
            {
                const t = "cdk-overlay-backdrop-showing";
                this._backdropElement = this._document.createElement("div"),
                this._backdropElement.classList.add("cdk-overlay-backdrop"),
                this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0),
                this._host.parentElement.insertBefore(this._backdropElement, this._host),
                this._backdropElement.addEventListener("click", this._backdropClickHandler),
                "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(() => {
                        this._backdropElement && this._backdropElement.classList.add(t)
                    })
                }) : this._backdropElement.classList.add(t)
            }
            _updateStackingOrder()
            {
                this._host.nextSibling && this._host.parentNode.appendChild(this._host)
            }
            detachBackdrop()
            {
                let t,
                    e = this._backdropElement;
                if (!e)
                    return;
                let n = () => {
                    e && (e.removeEventListener("click", this._backdropClickHandler), e.removeEventListener("transitionend", n), e.parentNode && e.parentNode.removeChild(e)),
                    this._backdropElement == e && (this._backdropElement = null),
                    this._config.backdropClass && this._toggleClasses(e, this._config.backdropClass, !1),
                    clearTimeout(t)
                };
                e.classList.remove("cdk-overlay-backdrop-showing"),
                this._ngZone.runOutsideAngular(() => {
                    e.addEventListener("transitionend", n)
                }),
                e.style.pointerEvents = "none",
                t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500))
            }
            _toggleClasses(t, e, n)
            {
                const i = t.classList;
                Op(e).forEach(t => {
                    t && (n ? i.add(t) : i.remove(t))
                })
            }
            _detachContentWhenStable()
            {
                this._ngZone.runOutsideAngular(() => {
                    const t = this._ngZone.onStable.pipe(ng(W(this._attachments, this._detachments))).subscribe(() => {
                        this._pane && this._host && 0 !== this._pane.children.length || (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1), this._host && this._host.parentElement && (this._previousHostParent = this._host.parentElement, this._previousHostParent.removeChild(this._host)), t.unsubscribe())
                    })
                })
            }
            _disposeScrollStrategy()
            {
                const t = this._scrollStrategy;
                t && (t.disable(), t.detach && t.detach())
            }
        }
        const k_ = "cdk-overlay-connected-position-bounding-box",
            A_ = /([A-Za-z%]+)$/;
        class T_ {
            constructor(t, e, n, i, s)
            {
                this._viewportRuler = e,
                this._document = n,
                this._platform = i,
                this._overlayContainer = s,
                this._lastBoundingBoxSize = {
                    width: 0,
                    height: 0
                },
                this._isPushed = !1,
                this._canPush = !0,
                this._growAfterOpen = !1,
                this._hasFlexibleDimensions = !0,
                this._positionLocked = !1,
                this._viewportMargin = 0,
                this._scrollables = [],
                this._preferredPositions = [],
                this._positionChanges = new x,
                this._resizeSubscription = u.EMPTY,
                this._offsetX = 0,
                this._offsetY = 0,
                this._appliedPanelClasses = [],
                this.positionChanges = this._positionChanges,
                this.setOrigin(t)
            }
            get positions()
            {
                return this._preferredPositions
            }
            attach(t)
            {
                this._validatePositions(),
                t.hostElement.classList.add(k_),
                this._overlayRef = t,
                this._boundingBox = t.hostElement,
                this._pane = t.overlayElement,
                this._isDisposed = !1,
                this._isInitialRender = !0,
                this._lastPosition = null,
                this._resizeSubscription.unsubscribe(),
                this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
                    this._isInitialRender = !0,
                    this.apply()
                })
            }
            apply()
            {
                if (this._isDisposed || !this._platform.isBrowser)
                    return;
                if (!this._isInitialRender && this._positionLocked && this._lastPosition)
                    return void this.reapplyLastPosition();
                this._clearPanelClasses(),
                this._resetOverlayElementStyles(),
                this._resetBoundingBoxStyles(),
                this._viewportRect = this._getNarrowedViewportRect(),
                this._originRect = this._getOriginRect(),
                this._overlayRect = this._pane.getBoundingClientRect();
                const t = this._originRect,
                    e = this._overlayRect,
                    n = this._viewportRect,
                    i = [];
                let s;
                for (let r of this._preferredPositions) {
                    let o = this._getOriginPoint(t, r),
                        a = this._getOverlayPoint(o, e, r),
                        l = this._getOverlayFit(a, e, n, r);
                    if (l.isCompletelyWithinViewport)
                        return this._isPushed = !1, void this._applyPosition(r, o);
                    this._canFitWithFlexibleDimensions(l, a, n) ? i.push({
                        position: r,
                        origin: o,
                        overlayRect: e,
                        boundingBoxRect: this._calculateBoundingBoxRect(o, r)
                    }) : (!s || s.overlayFit.visibleArea < l.visibleArea) && (s = {
                        overlayFit: l,
                        overlayPoint: a,
                        originPoint: o,
                        position: r,
                        overlayRect: e
                    })
                }
                if (i.length) {
                    let t = null,
                        e = -1;
                    for (const n of i) {
                        const i = n.boundingBoxRect.width * n.boundingBoxRect.height * (n.position.weight || 1);
                        i > e && (e = i, t = n)
                    }
                    return this._isPushed = !1, void this._applyPosition(t.position, t.origin)
                }
                if (this._canPush)
                    return this._isPushed = !0, void this._applyPosition(s.position, s.originPoint);
                this._applyPosition(s.position, s.originPoint)
            }
            detach()
            {
                this._clearPanelClasses(),
                this._lastPosition = null,
                this._previousPushAmount = null,
                this._resizeSubscription.unsubscribe()
            }
            dispose()
            {
                this._isDisposed || (this._boundingBox && O_(this._boundingBox.style, {
                    top: "",
                    left: "",
                    right: "",
                    bottom: "",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove(k_), this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, this._isDisposed = !0)
            }
            reapplyLastPosition()
            {
                if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
                    this._originRect = this._getOriginRect(),
                    this._overlayRect = this._pane.getBoundingClientRect(),
                    this._viewportRect = this._getNarrowedViewportRect();
                    const t = this._lastPosition || this._preferredPositions[0],
                        e = this._getOriginPoint(this._originRect, t);
                    this._applyPosition(t, e)
                }
            }
            withScrollableContainers(t)
            {
                return this._scrollables = t, this
            }
            withPositions(t)
            {
                return this._preferredPositions = t, -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null), this._validatePositions(), this
            }
            withViewportMargin(t)
            {
                return this._viewportMargin = t, this
            }
            withFlexibleDimensions(t=!0)
            {
                return this._hasFlexibleDimensions = t, this
            }
            withGrowAfterOpen(t=!0)
            {
                return this._growAfterOpen = t, this
            }
            withPush(t=!0)
            {
                return this._canPush = t, this
            }
            withLockedPosition(t=!0)
            {
                return this._positionLocked = t, this
            }
            setOrigin(t)
            {
                return this._origin = t, this
            }
            withDefaultOffsetX(t)
            {
                return this._offsetX = t, this
            }
            withDefaultOffsetY(t)
            {
                return this._offsetY = t, this
            }
            withTransformOriginOn(t)
            {
                return this._transformOriginSelector = t, this
            }
            _getOriginPoint(t, e)
            {
                let n,
                    i;
                if ("center" == e.originX)
                    n = t.left + t.width / 2;
                else {
                    const i = this._isRtl() ? t.right : t.left,
                        s = this._isRtl() ? t.left : t.right;
                    n = "start" == e.originX ? i : s
                }
                return i = "center" == e.originY ? t.top + t.height / 2 : "top" == e.originY ? t.top : t.bottom, {
                    x: n,
                    y: i
                }
            }
            _getOverlayPoint(t, e, n)
            {
                let i,
                    s;
                return i = "center" == n.overlayX ? -e.width / 2 : "start" === n.overlayX ? this._isRtl() ? -e.width : 0 : this._isRtl() ? 0 : -e.width, s = "center" == n.overlayY ? -e.height / 2 : "top" == n.overlayY ? 0 : -e.height, {
                    x: t.x + i,
                    y: t.y + s
                }
            }
            _getOverlayFit(t, e, n, i)
            {
                const s = P_(e);
                let {x: r, y: o} = t,
                    a = this._getOffset(i, "x"),
                    l = this._getOffset(i, "y");
                a && (r += a),
                l && (o += l);
                let c = 0 - o,
                    h = o + s.height - n.height,
                    u = this._subtractOverflows(s.width, 0 - r, r + s.width - n.width),
                    d = this._subtractOverflows(s.height, c, h),
                    p = u * d;
                return {
                    visibleArea: p,
                    isCompletelyWithinViewport: s.width * s.height === p,
                    fitsInViewportVertically: d === s.height,
                    fitsInViewportHorizontally: u == s.width
                }
            }
            _canFitWithFlexibleDimensions(t, e, n)
            {
                if (this._hasFlexibleDimensions) {
                    const i = n.bottom - e.y,
                        s = n.right - e.x,
                        r = I_(this._overlayRef.getConfig().minHeight),
                        o = I_(this._overlayRef.getConfig().minWidth),
                        a = t.fitsInViewportHorizontally || null != o && o <= s;
                    return (t.fitsInViewportVertically || null != r && r <= i) && a
                }
                return !1
            }
            _pushOverlayOnScreen(t, e, n)
            {
                if (this._previousPushAmount && this._positionLocked)
                    return {
                        x: t.x + this._previousPushAmount.x,
                        y: t.y + this._previousPushAmount.y
                    };
                const i = P_(e),
                    s = this._viewportRect,
                    r = Math.max(t.x + i.width - s.width, 0),
                    o = Math.max(t.y + i.height - s.height, 0),
                    a = Math.max(s.top - n.top - t.y, 0),
                    l = Math.max(s.left - n.left - t.x, 0);
                let c = 0,
                    h = 0;
                return c = i.width <= s.width ? l || -r : t.x < this._viewportMargin ? s.left - n.left - t.x : 0, h = i.height <= s.height ? a || -o : t.y < this._viewportMargin ? s.top - n.top - t.y : 0, this._previousPushAmount = {
                    x: c,
                    y: h
                }, {
                    x: t.x + c,
                    y: t.y + h
                }
            }
            _applyPosition(t, e)
            {
                if (this._setTransformOrigin(t), this._setOverlayElementStyles(e, t), this._setBoundingBoxStyles(e, t), t.panelClass && this._addPanelClasses(t.panelClass), this._lastPosition = t, this._positionChanges.observers.length) {
                    const e = this._getScrollVisibility(),
                        n = new b_(t, e);
                    this._positionChanges.next(n)
                }
                this._isInitialRender = !1
            }
            _setTransformOrigin(t)
            {
                if (!this._transformOriginSelector)
                    return;
                const e = this._boundingBox.querySelectorAll(this._transformOriginSelector);
                let n,
                    i = t.overlayY;
                n = "center" === t.overlayX ? "center" : this._isRtl() ? "start" === t.overlayX ? "right" : "left" : "start" === t.overlayX ? "left" : "right";
                for (let s = 0; s < e.length; s++)
                    e[s].style.transformOrigin = `${n} ${i}`
            }
            _calculateBoundingBoxRect(t, e)
            {
                const n = this._viewportRect,
                    i = this._isRtl();
                let s,
                    r,
                    o,
                    a,
                    l,
                    c;
                if ("top" === e.overlayY)
                    r = t.y,
                    s = n.height - r + this._viewportMargin;
                else if ("bottom" === e.overlayY)
                    o = n.height - t.y + 2 * this._viewportMargin,
                    s = n.height - o + this._viewportMargin;
                else {
                    const e = Math.min(n.bottom - t.y + n.top, t.y),
                        i = this._lastBoundingBoxSize.height;
                    s = 2 * e,
                    r = t.y - e,
                    s > i && !this._isInitialRender && !this._growAfterOpen && (r = t.y - i / 2)
                }
                if ("end" === e.overlayX && !i || "start" === e.overlayX && i)
                    c = n.width - t.x + this._viewportMargin,
                    a = t.x - this._viewportMargin;
                else if ("start" === e.overlayX && !i || "end" === e.overlayX && i)
                    l = t.x,
                    a = n.right - t.x;
                else {
                    const e = Math.min(n.right - t.x + n.left, t.x),
                        i = this._lastBoundingBoxSize.width;
                    a = 2 * e,
                    l = t.x - e,
                    a > i && !this._isInitialRender && !this._growAfterOpen && (l = t.x - i / 2)
                }
                return {
                    top: r,
                    left: l,
                    bottom: o,
                    right: c,
                    width: a,
                    height: s
                }
            }
            _setBoundingBoxStyles(t, e)
            {
                const n = this._calculateBoundingBoxRect(t, e);
                this._isInitialRender || this._growAfterOpen || (n.height = Math.min(n.height, this._lastBoundingBoxSize.height), n.width = Math.min(n.width, this._lastBoundingBoxSize.width));
                const i = {};
                if (this._hasExactPosition())
                    i.top = i.left = "0",
                    i.bottom = i.right = i.maxHeight = i.maxWidth = "",
                    i.width = i.height = "100%";
                else {
                    const t = this._overlayRef.getConfig().maxHeight,
                        s = this._overlayRef.getConfig().maxWidth;
                    i.height = Ip(n.height),
                    i.top = Ip(n.top),
                    i.bottom = Ip(n.bottom),
                    i.width = Ip(n.width),
                    i.left = Ip(n.left),
                    i.right = Ip(n.right),
                    i.alignItems = "center" === e.overlayX ? "center" : "end" === e.overlayX ? "flex-end" : "flex-start",
                    i.justifyContent = "center" === e.overlayY ? "center" : "bottom" === e.overlayY ? "flex-end" : "flex-start",
                    t && (i.maxHeight = Ip(t)),
                    s && (i.maxWidth = Ip(s))
                }
                this._lastBoundingBoxSize = n,
                O_(this._boundingBox.style, i)
            }
            _resetBoundingBoxStyles()
            {
                O_(this._boundingBox.style, {
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                })
            }
            _resetOverlayElementStyles()
            {
                O_(this._pane.style, {
                    top: "",
                    left: "",
                    bottom: "",
                    right: "",
                    position: "",
                    transform: ""
                })
            }
            _setOverlayElementStyles(t, e)
            {
                const n = {},
                    i = this._hasExactPosition(),
                    s = this._hasFlexibleDimensions,
                    r = this._overlayRef.getConfig();
                if (i) {
                    const i = this._viewportRuler.getViewportScrollPosition();
                    O_(n, this._getExactOverlayY(e, t, i)),
                    O_(n, this._getExactOverlayX(e, t, i))
                } else
                    n.position = "static";
                let o = "",
                    a = this._getOffset(e, "x"),
                    l = this._getOffset(e, "y");
                a && (o += `translateX(${a}px) `),
                l && (o += `translateY(${l}px)`),
                n.transform = o.trim(),
                r.maxHeight && (i ? n.maxHeight = Ip(r.maxHeight) : s && (n.maxHeight = "")),
                r.maxWidth && (i ? n.maxWidth = Ip(r.maxWidth) : s && (n.maxWidth = "")),
                O_(this._pane.style, n)
            }
            _getExactOverlayY(t, e, n)
            {
                let i = {
                        top: "",
                        bottom: ""
                    },
                    s = this._getOverlayPoint(e, this._overlayRect, t);
                this._isPushed && (s = this._pushOverlayOnScreen(s, this._overlayRect, n));
                let r = this._overlayContainer.getContainerElement().getBoundingClientRect().top;
                return s.y -= r, "bottom" === t.overlayY ? i.bottom = this._document.documentElement.clientHeight - (s.y + this._overlayRect.height) + "px" : i.top = Ip(s.y), i
            }
            _getExactOverlayX(t, e, n)
            {
                let i,
                    s = {
                        left: "",
                        right: ""
                    },
                    r = this._getOverlayPoint(e, this._overlayRect, t);
                return this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, n)), i = this._isRtl() ? "end" === t.overlayX ? "left" : "right" : "end" === t.overlayX ? "right" : "left", "right" === i ? s.right = this._document.documentElement.clientWidth - (r.x + this._overlayRect.width) + "px" : s.left = Ip(r.x), s
            }
            _getScrollVisibility()
            {
                const t = this._getOriginRect(),
                    e = this._pane.getBoundingClientRect(),
                    n = this._scrollables.map(t => t.getElementRef().nativeElement.getBoundingClientRect());
                return {
                    isOriginClipped: f_(t, n),
                    isOriginOutsideView: p_(t, n),
                    isOverlayClipped: f_(e, n),
                    isOverlayOutsideView: p_(e, n)
                }
            }
            _subtractOverflows(t, ...e)
            {
                return e.reduce((t, e) => t - Math.max(e, 0), t)
            }
            _getNarrowedViewportRect()
            {
                const t = this._document.documentElement.clientWidth,
                    e = this._document.documentElement.clientHeight,
                    n = this._viewportRuler.getViewportScrollPosition();
                return {
                    top: n.top + this._viewportMargin,
                    left: n.left + this._viewportMargin,
                    right: n.left + t - this._viewportMargin,
                    bottom: n.top + e - this._viewportMargin,
                    width: t - 2 * this._viewportMargin,
                    height: e - 2 * this._viewportMargin
                }
            }
            _isRtl()
            {
                return "rtl" === this._overlayRef.getDirection()
            }
            _hasExactPosition()
            {
                return !this._hasFlexibleDimensions || this._isPushed
            }
            _getOffset(t, e)
            {
                return "x" === e ? null == t.offsetX ? this._offsetX : t.offsetX : null == t.offsetY ? this._offsetY : t.offsetY
            }
            _validatePositions() {}
            _addPanelClasses(t)
            {
                this._pane && Op(t).forEach(t => {
                    "" !== t && -1 === this._appliedPanelClasses.indexOf(t) && (this._appliedPanelClasses.push(t), this._pane.classList.add(t))
                })
            }
            _clearPanelClasses()
            {
                this._pane && (this._appliedPanelClasses.forEach(t => {
                    this._pane.classList.remove(t)
                }), this._appliedPanelClasses = [])
            }
            _getOriginRect()
            {
                const t = this._origin;
                if (t instanceof Fo)
                    return t.nativeElement.getBoundingClientRect();
                if (t instanceof Element)
                    return t.getBoundingClientRect();
                const e = t.width || 0,
                    n = t.height || 0;
                return {
                    top: t.y,
                    bottom: t.y + n,
                    left: t.x,
                    right: t.x + e,
                    height: n,
                    width: e
                }
            }
        }
        function O_(t, e) {
            for (let n in e)
                e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }
        function I_(t) {
            if ("number" != typeof t && null != t) {
                const [e, n] = t.split(A_);
                return n && "px" !== n ? null : parseFloat(e)
            }
            return t || null
        }
        function P_(t) {
            return {
                top: Math.floor(t.top),
                right: Math.floor(t.right),
                bottom: Math.floor(t.bottom),
                left: Math.floor(t.left),
                width: Math.floor(t.width),
                height: Math.floor(t.height)
            }
        }
        class D_ {
            constructor(t, e, n, i, s, r, o)
            {
                this._preferredPositions = [],
                this._positionStrategy = new T_(n, i, s, r, o).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0),
                this.withFallbackPosition(t, e),
                this.onPositionChange = this._positionStrategy.positionChanges
            }
            get positions()
            {
                return this._preferredPositions
            }
            attach(t)
            {
                this._overlayRef = t,
                this._positionStrategy.attach(t),
                this._direction && (t.setDirection(this._direction), this._direction = null)
            }
            dispose()
            {
                this._positionStrategy.dispose()
            }
            detach()
            {
                this._positionStrategy.detach()
            }
            apply()
            {
                this._positionStrategy.apply()
            }
            recalculateLastPosition()
            {
                this._positionStrategy.reapplyLastPosition()
            }
            withScrollableContainers(t)
            {
                this._positionStrategy.withScrollableContainers(t)
            }
            withFallbackPosition(t, e, n, i)
            {
                const s = new y_(t, e, n, i);
                return this._preferredPositions.push(s), this._positionStrategy.withPositions(this._preferredPositions), this
            }
            withDirection(t)
            {
                return this._overlayRef ? this._overlayRef.setDirection(t) : this._direction = t, this
            }
            withOffsetX(t)
            {
                return this._positionStrategy.withDefaultOffsetX(t), this
            }
            withOffsetY(t)
            {
                return this._positionStrategy.withDefaultOffsetY(t), this
            }
            withLockedPosition(t)
            {
                return this._positionStrategy.withLockedPosition(t), this
            }
            withPositions(t)
            {
                return this._preferredPositions = t.slice(), this._positionStrategy.withPositions(this._preferredPositions), this
            }
            setOrigin(t)
            {
                return this._positionStrategy.setOrigin(t), this
            }
        }
        const R_ = "cdk-global-overlay-wrapper";
        class F_ {
            constructor()
            {
                this._cssPosition = "static",
                this._topOffset = "",
                this._bottomOffset = "",
                this._leftOffset = "",
                this._rightOffset = "",
                this._alignItems = "",
                this._justifyContent = "",
                this._width = "",
                this._height = ""
            }
            attach(t)
            {
                const e = t.getConfig();
                this._overlayRef = t,
                this._width && !e.width && t.updateSize({
                    width: this._width
                }),
                this._height && !e.height && t.updateSize({
                    height: this._height
                }),
                t.hostElement.classList.add(R_),
                this._isDisposed = !1
            }
            top(t="")
            {
                return this._bottomOffset = "", this._topOffset = t, this._alignItems = "flex-start", this
            }
            left(t="")
            {
                return this._rightOffset = "", this._leftOffset = t, this._justifyContent = "flex-start", this
            }
            bottom(t="")
            {
                return this._topOffset = "", this._bottomOffset = t, this._alignItems = "flex-end", this
            }
            right(t="")
            {
                return this._leftOffset = "", this._rightOffset = t, this._justifyContent = "flex-end", this
            }
            width(t="")
            {
                return this._overlayRef ? this._overlayRef.updateSize({
                    width: t
                }) : this._width = t, this
            }
            height(t="")
            {
                return this._overlayRef ? this._overlayRef.updateSize({
                    height: t
                }) : this._height = t, this
            }
            centerHorizontally(t="")
            {
                return this.left(t), this._justifyContent = "center", this
            }
            centerVertically(t="")
            {
                return this.top(t), this._alignItems = "center", this
            }
            apply()
            {
                if (!this._overlayRef || !this._overlayRef.hasAttached())
                    return;
                const t = this._overlayRef.overlayElement.style,
                    e = this._overlayRef.hostElement.style,
                    n = this._overlayRef.getConfig(),
                    {width: i, height: s, maxWidth: r, maxHeight: o} = n,
                    a = !("100%" !== i && "100vw" !== i || r && "100%" !== r && "100vw" !== r),
                    l = !("100%" !== s && "100vh" !== s || o && "100%" !== o && "100vh" !== o);
                t.position = this._cssPosition,
                t.marginLeft = a ? "0" : this._leftOffset,
                t.marginTop = l ? "0" : this._topOffset,
                t.marginBottom = this._bottomOffset,
                t.marginRight = this._rightOffset,
                a ? e.justifyContent = "flex-start" : "center" === this._justifyContent ? e.justifyContent = "center" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? e.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (e.justifyContent = "flex-start") : e.justifyContent = this._justifyContent,
                e.alignItems = l ? "flex-start" : this._alignItems
            }
            dispose()
            {
                if (this._isDisposed || !this._overlayRef)
                    return;
                const t = this._overlayRef.overlayElement.style,
                    e = this._overlayRef.hostElement,
                    n = e.style;
                e.classList.remove(R_),
                n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position = "",
                this._overlayRef = null,
                this._isDisposed = !0
            }
        }
        let V_ = (() => {
                class t {
                    constructor(t, e, n, i)
                    {
                        this._viewportRuler = t,
                        this._document = e,
                        this._platform = n,
                        this._overlayContainer = i
                    }
                    global()
                    {
                        return new F_
                    }
                    connectedTo(t, e, n)
                    {
                        return new D_(e, n, t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                    }
                    flexibleConnectedTo(t)
                    {
                        return new T_(t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(Xg), oi(Kl), oi(Fp), oi(E_))
                }, t.\u0275prov = at({
                    factory: function() {
                        return new t(oi(Xg), oi(Kl), oi(Fp), oi(E_))
                    },
                    token: t,
                    providedIn: "root"
                }), t
            })(),
            N_ = 0,
            M_ = (() => {
                class t {
                    constructor(t, e, n, i, s, r, o, a, l, c, h)
                    {
                        this.scrollStrategies = t,
                        this._overlayContainer = e,
                        this._componentFactoryResolver = n,
                        this._positionBuilder = i,
                        this._keyboardDispatcher = s,
                        this._injector = r,
                        this._ngZone = o,
                        this._document = a,
                        this._directionality = l,
                        this._location = c,
                        this._outsideClickDispatcher = h
                    }
                    create(t)
                    {
                        const e = this._createHostElement(),
                            n = this._createPaneElement(e),
                            i = this._createPortalOutlet(n),
                            s = new __(t);
                        return s.direction = s.direction || this._directionality.value, new S_(i, e, n, s, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher)
                    }
                    position()
                    {
                        return this._positionBuilder
                    }
                    _createPaneElement(t)
                    {
                        const e = this._document.createElement("div");
                        return e.id = "cdk-overlay-" + N_++, e.classList.add("cdk-overlay-pane"), t.appendChild(e), e
                    }
                    _createHostElement()
                    {
                        const t = this._document.createElement("div");
                        return this._overlayContainer.getContainerElement().appendChild(t), t
                    }
                    _createPortalOutlet(t)
                    {
                        return this._appRef || (this._appRef = this._injector.get(zl)), new o_(t, this._componentFactoryResolver, this._appRef, this._injector, this._document)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(oi(g_), oi(E_), oi(Io), oi(V_), oi(w_), oi(yr), oi(Cl), oi(Kl), oi(rf), oi(lc), oi(C_))
                }, t.\u0275prov = at({
                    token: t,
                    factory: t.\u0275fac
                }), t
            })();
        const L_ = {
            provide: new qn("cdk-connected-overlay-scroll-strategy"),
            deps: [M_],
            useFactory: function(t) {
                return () => t.scrollStrategies.reposition()
            }
        };
        let j_ = (() => {
            class t {}
            return t.\u0275mod = zt({
                type: t
            }), t.\u0275inj = lt({
                factory: function(e) {
                    return new (e || t)
                },
                providers: [M_, L_],
                imports: [[of, l_, t_], t_]
            }), t
        })();
        const B_ = {
            provide: new qn("mat-select-scroll-strategy"),
            deps: [M_],
            useFactory: function(t) {
                return () => t.scrollStrategies.reposition()
            }
        };
        let H_ = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [B_],
                    imports: [[Rc, j_, Of, pf], Jg, Bg, Of, pf]
                }), t
            })(),
            z_ = (() => {
                class t {
                    constructor()
                    {
                        this._vertical = !1,
                        this._inset = !1
                    }
                    get vertical()
                    {
                        return this._vertical
                    }
                    set vertical(t)
                    {
                        this._vertical = Tp(t)
                    }
                    get inset()
                    {
                        return this._inset
                    }
                    set inset(t)
                    {
                        this._inset = Tp(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["mat-divider"]],
                    hostAttrs: ["role", "separator", 1, "mat-divider"],
                    hostVars: 7,
                    hostBindings: function(t, e) {
                        2 & t && (Pr("aria-orientation", e.vertical ? "vertical" : "horizontal"), to("mat-divider-vertical", e.vertical)("mat-divider-horizontal", !e.vertical)("mat-divider-inset", e.inset))
                    },
                    inputs: {
                        vertical: "vertical",
                        inset: "inset"
                    },
                    decls: 0,
                    vars: 0,
                    template: function(t, e) {},
                    styles: [".mat-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mat-divider.mat-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n"],
                    encapsulation: 2,
                    changeDetection: 0
                }), t
            })(),
            $_ = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[pf], pf]
                }), t
            })();
        const q_ = ["mat-button", ""],
            W_ = ["*"],
            U_ = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"];
        class Z_ {
            constructor(t)
            {
                this._elementRef = t
            }
        }
        const Q_ = mf(ff(gf(Z_)));
        let K_ = (() => {
                class t extends Q_ {
                    constructor(t, e, n)
                    {
                        super(t),
                        this._focusMonitor = e,
                        this._animationMode = n,
                        this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"),
                        this.isIconButton = this._hasHostAttributes("mat-icon-button");
                        for (const i of U_)
                            this._hasHostAttributes(i) && this._getHostElement().classList.add(i);
                        t.nativeElement.classList.add("mat-button-base"),
                        this.isRoundButton && (this.color = "accent")
                    }
                    ngAfterViewInit()
                    {
                        this._focusMonitor.monitor(this._elementRef, !0)
                    }
                    ngOnDestroy()
                    {
                        this._focusMonitor.stopMonitoring(this._elementRef)
                    }
                    focus(t, e)
                    {
                        t ? this._focusMonitor.focusVia(this._getHostElement(), t, e) : this._getHostElement().focus(e)
                    }
                    _getHostElement()
                    {
                        return this._elementRef.nativeElement
                    }
                    _isRippleDisabled()
                    {
                        return this.disableRipple || this.disabled
                    }
                    _hasHostAttributes(...t)
                    {
                        return t.some(t => this._getHostElement().hasAttribute(t))
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(Fo), Rr(Yp), Rr(ip, 8))
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-icon-button", ""], ["button", "mat-fab", ""], ["button", "mat-mini-fab", ""], ["button", "mat-stroked-button", ""], ["button", "mat-flat-button", ""]],
                    viewQuery: function(t, e) {
                        if (1 & t && Ka(kf, 1), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e.ripple = t.first)
                        }
                    },
                    hostAttrs: [1, "mat-focus-indicator"],
                    hostVars: 5,
                    hostBindings: function(t, e) {
                        2 & t && (Pr("disabled", e.disabled || null), to("_mat-animation-noopable", "NoopAnimations" === e._animationMode)("mat-button-disabled", e.disabled))
                    },
                    inputs: {
                        disabled: "disabled",
                        disableRipple: "disableRipple",
                        color: "color"
                    },
                    exportAs: ["matButton"],
                    features: [vr],
                    attrs: q_,
                    ngContentSelectors: W_,
                    decls: 4,
                    vars: 5,
                    consts: [[1, "mat-button-wrapper"], ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-button-focus-overlay"]],
                    template: function(t, e) {
                        1 & t && (Qr(), Nr(0, "span", 0), Kr(1), Mr(), Lr(2, "span", 1), Lr(3, "span", 2)),
                        2 & t && (as(2), to("mat-button-ripple-round", e.isRoundButton || e.isIconButton), Fr("matRippleDisabled", e._isRippleDisabled())("matRippleCentered", e.isIconButton)("matRippleTrigger", e._getHostElement()))
                    },
                    directives: [kf],
                    styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],
                    encapsulation: 2,
                    changeDetection: 0
                }), t
            })(),
            G_ = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Af, pf], pf]
                }), t
            })(),
            Y_ = 0;
        const X_ = new qn("CdkAccordion");
        let J_ = (() => {
                class t {
                    constructor()
                    {
                        this._stateChanges = new x,
                        this._openCloseAllActions = new x,
                        this.id = "cdk-accordion-" + Y_++,
                        this._multi = !1
                    }
                    get multi()
                    {
                        return this._multi
                    }
                    set multi(t)
                    {
                        this._multi = Tp(t)
                    }
                    openAll()
                    {
                        this._openCloseAll(!0)
                    }
                    closeAll()
                    {
                        this._openCloseAll(!1)
                    }
                    ngOnChanges(t)
                    {
                        this._stateChanges.next(t)
                    }
                    ngOnDestroy()
                    {
                        this._stateChanges.complete()
                    }
                    _openCloseAll(t)
                    {
                        this.multi && this._openCloseAllActions.next(t)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
                    inputs: {
                        multi: "multi"
                    },
                    exportAs: ["cdkAccordion"],
                    features: [Ao([{
                        provide: X_,
                        useExisting: t
                    }]), le]
                }), t
            })(),
            ty = 0,
            ey = (() => {
                class t {
                    constructor(t, e, n)
                    {
                        this.accordion = t,
                        this._changeDetectorRef = e,
                        this._expansionDispatcher = n,
                        this._openCloseAllSubscription = u.EMPTY,
                        this.closed = new Na,
                        this.opened = new Na,
                        this.destroyed = new Na,
                        this.expandedChange = new Na,
                        this.id = "cdk-accordion-child-" + ty++,
                        this._expanded = !1,
                        this._disabled = !1,
                        this._removeUniqueSelectionListener = () => {},
                        this._removeUniqueSelectionListener = n.listen((t, e) => {
                            this.accordion && !this.accordion.multi && this.accordion.id === e && this.id !== t && (this.expanded = !1)
                        }),
                        this.accordion && (this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions())
                    }
                    get expanded()
                    {
                        return this._expanded
                    }
                    set expanded(t)
                    {
                        t = Tp(t),
                        this._expanded !== t && (this._expanded = t, this.expandedChange.emit(t), t ? (this.opened.emit(), this._expansionDispatcher.notify(this.id, this.accordion ? this.accordion.id : this.id)) : this.closed.emit(), this._changeDetectorRef.markForCheck())
                    }
                    get disabled()
                    {
                        return this._disabled
                    }
                    set disabled(t)
                    {
                        this._disabled = Tp(t)
                    }
                    ngOnDestroy()
                    {
                        this.opened.complete(),
                        this.closed.complete(),
                        this.destroyed.emit(),
                        this.destroyed.complete(),
                        this._removeUniqueSelectionListener(),
                        this._openCloseAllSubscription.unsubscribe()
                    }
                    toggle()
                    {
                        this.disabled || (this.expanded = !this.expanded)
                    }
                    close()
                    {
                        this.disabled || (this.expanded = !1)
                    }
                    open()
                    {
                        this.disabled || (this.expanded = !0)
                    }
                    _subscribeToOpenCloseAllActions()
                    {
                        return this.accordion._openCloseAllActions.subscribe(t => {
                            this.disabled || (this.expanded = t)
                        })
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(X_, 12), Rr(oa), Rr(Gg))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
                    inputs: {
                        expanded: "expanded",
                        disabled: "disabled"
                    },
                    outputs: {
                        closed: "closed",
                        opened: "opened",
                        destroyed: "destroyed",
                        expandedChange: "expandedChange"
                    },
                    exportAs: ["cdkAccordionItem"],
                    features: [Ao([{
                        provide: X_,
                        useValue: void 0
                    }])]
                }), t
            })(),
            ny = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    }
                }), t
            })();
        const iy = ["body"];
        function sy(t, e) {}
        const ry = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]],
            oy = ["mat-expansion-panel-header", "*", "mat-action-row"];
        function ay(t, e) {
            1 & t && Lr(0, "span", 2),
            2 & t && Fr("@indicatorRotate", Ur()._getExpandedState())
        }
        const ly = [[["mat-panel-title"]], [["mat-panel-description"]], "*"],
            cy = ["mat-panel-title", "mat-panel-description", "*"],
            hy = new qn("MAT_ACCORDION"),
            uy = "225ms cubic-bezier(0.4,0.0,0.2,1)",
            dy = {
                indicatorRotate: Eh("indicatorRotate", [Th("collapsed, void", Ah({
                    transform: "rotate(0deg)"
                })), Th("expanded", Ah({
                    transform: "rotate(180deg)"
                })), Oh("expanded <=> collapsed, void => collapsed", Sh(uy))]),
                bodyExpansion: Eh("bodyExpansion", [Th("collapsed, void", Ah({
                    height: "0px",
                    visibility: "hidden"
                })), Th("expanded", Ah({
                    height: "*",
                    visibility: "visible"
                })), Oh("expanded <=> collapsed, void => collapsed", Sh(uy))])
            };
        let py = (() => {
                class t {
                    constructor(t)
                    {
                        this._template = t
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(ua))
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["ng-template", "matExpansionPanelContent", ""]]
                }), t
            })(),
            fy = 0;
        const my = new qn("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
        let gy = (() => {
                class t extends ey {
                    constructor(t, e, n, i, s, r, o)
                    {
                        var a;
                        super(t, e, n),
                        this._viewContainerRef = i,
                        this._animationMode = r,
                        this._hideToggle = !1,
                        this.afterExpand = new Na,
                        this.afterCollapse = new Na,
                        this._inputChanges = new x,
                        this._headerId = "mat-expansion-panel-header-" + fy++,
                        this._bodyAnimationDone = new x,
                        this.accordion = t,
                        this._document = s,
                        this._bodyAnimationDone.pipe((a = (t, e) => t.fromState === e.fromState && t.toState === e.toState, t => t.lift(new Qg(a, undefined)))).subscribe(t => {
                            "void" !== t.fromState && ("expanded" === t.toState ? this.afterExpand.emit() : "collapsed" === t.toState && this.afterCollapse.emit())
                        }),
                        o && (this.hideToggle = o.hideToggle)
                    }
                    get hideToggle()
                    {
                        return this._hideToggle || this.accordion && this.accordion.hideToggle
                    }
                    set hideToggle(t)
                    {
                        this._hideToggle = Tp(t)
                    }
                    get togglePosition()
                    {
                        return this._togglePosition || this.accordion && this.accordion.togglePosition
                    }
                    set togglePosition(t)
                    {
                        this._togglePosition = t
                    }
                    _hasSpacing()
                    {
                        return !!this.accordion && this.expanded && "default" === this.accordion.displayMode
                    }
                    _getExpandedState()
                    {
                        return this.expanded ? "expanded" : "collapsed"
                    }
                    toggle()
                    {
                        this.expanded = !this.expanded
                    }
                    close()
                    {
                        this.expanded = !1
                    }
                    open()
                    {
                        this.expanded = !0
                    }
                    ngAfterContentInit()
                    {
                        this._lazyContent && this.opened.pipe(cf(null), vp(() => this.expanded && !this._portal), Sp(1)).subscribe(() => {
                            this._portal = new i_(this._lazyContent._template, this._viewContainerRef)
                        })
                    }
                    ngOnChanges(t)
                    {
                        this._inputChanges.next(t)
                    }
                    ngOnDestroy()
                    {
                        super.ngOnDestroy(),
                        this._bodyAnimationDone.complete(),
                        this._inputChanges.complete()
                    }
                    _containsFocus()
                    {
                        if (this._body) {
                            const t = this._document.activeElement,
                                e = this._body.nativeElement;
                            return t === e || e.contains(t)
                        }
                        return !1
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(hy, 12), Rr(oa), Rr(Gg), Rr(_a), Rr(Kl), Rr(ip, 8), Rr(my, 8))
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["mat-expansion-panel"]],
                    contentQueries: function(t, e, n) {
                        if (1 & t && Ga(n, py, 1), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e._lazyContent = t.first)
                        }
                    },
                    viewQuery: function(t, e) {
                        if (1 & t && Ka(iy, 1), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e._body = t.first)
                        }
                    },
                    hostAttrs: [1, "mat-expansion-panel"],
                    hostVars: 6,
                    hostBindings: function(t, e) {
                        2 & t && to("mat-expanded", e.expanded)("_mat-animation-noopable", "NoopAnimations" === e._animationMode)("mat-expansion-panel-spacing", e._hasSpacing())
                    },
                    inputs: {
                        disabled: "disabled",
                        expanded: "expanded",
                        hideToggle: "hideToggle",
                        togglePosition: "togglePosition"
                    },
                    outputs: {
                        opened: "opened",
                        closed: "closed",
                        expandedChange: "expandedChange",
                        afterExpand: "afterExpand",
                        afterCollapse: "afterCollapse"
                    },
                    exportAs: ["matExpansionPanel"],
                    features: [Ao([{
                        provide: hy,
                        useValue: void 0
                    }]), vr, le],
                    ngContentSelectors: oy,
                    decls: 7,
                    vars: 4,
                    consts: [["role", "region", 1, "mat-expansion-panel-content", 3, "id"], ["body", ""], [1, "mat-expansion-panel-body"], [3, "cdkPortalOutlet"]],
                    template: function(t, e) {
                        1 & t && (Qr(ry), Kr(0), Nr(1, "div", 0, 1), $r("@bodyExpansion.done", function(t) {
                            return e._bodyAnimationDone.next(t)
                        }), Nr(3, "div", 2), Kr(4, 1), Dr(5, sy, 0, 0, "ng-template", 3), Mr(), Kr(6, 2), Mr()),
                        2 & t && (as(1), Fr("@bodyExpansion", e._getExpandedState())("id", e.id), Pr("aria-labelledby", e._headerId), as(4), Fr("cdkPortalOutlet", e._portal))
                    },
                    directives: [a_],
                    styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button-base,.mat-action-row button.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button-base,[dir=rtl] .mat-action-row button.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
                    encapsulation: 2,
                    data: {
                        animation: [dy.bodyExpansion]
                    },
                    changeDetection: 0
                }), t
            })(),
            _y = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["mat-action-row"]],
                    hostAttrs: [1, "mat-action-row"]
                }), t
            })(),
            yy = (() => {
                class t {
                    constructor(t, e, n, i, s, r)
                    {
                        this.panel = t,
                        this._element = e,
                        this._focusMonitor = n,
                        this._changeDetectorRef = i,
                        this._animationMode = r,
                        this._parentChangeSubscription = u.EMPTY;
                        const o = t.accordion ? t.accordion._stateChanges.pipe(vp(t => !(!t.hideToggle && !t.togglePosition))) : Ep;
                        this._parentChangeSubscription = W(t.opened, t.closed, o, t._inputChanges.pipe(vp(t => !!(t.hideToggle || t.disabled || t.togglePosition)))).subscribe(() => this._changeDetectorRef.markForCheck()),
                        t.closed.pipe(vp(() => t._containsFocus())).subscribe(() => n.focusVia(e, "program")),
                        s && (this.expandedHeight = s.expandedHeight, this.collapsedHeight = s.collapsedHeight)
                    }
                    get disabled()
                    {
                        return this.panel.disabled
                    }
                    _toggle()
                    {
                        this.disabled || this.panel.toggle()
                    }
                    _isExpanded()
                    {
                        return this.panel.expanded
                    }
                    _getExpandedState()
                    {
                        return this.panel._getExpandedState()
                    }
                    _getPanelId()
                    {
                        return this.panel.id
                    }
                    _getTogglePosition()
                    {
                        return this.panel.togglePosition
                    }
                    _showToggle()
                    {
                        return !this.panel.hideToggle && !this.panel.disabled
                    }
                    _getHeaderHeight()
                    {
                        const t = this._isExpanded();
                        return t && this.expandedHeight ? this.expandedHeight : !t && this.collapsedHeight ? this.collapsedHeight : null
                    }
                    _keydown(t)
                    {
                        switch (t.keyCode) {
                        case 32:
                        case 13:
                            ap(t) || (t.preventDefault(), this._toggle());
                            break;
                        default:
                            return void (this.panel.accordion && this.panel.accordion._handleHeaderKeydown(t))
                        }
                    }
                    focus(t, e)
                    {
                        t ? this._focusMonitor.focusVia(this._element, t, e) : this._element.nativeElement.focus(e)
                    }
                    ngAfterViewInit()
                    {
                        this._focusMonitor.monitor(this._element).subscribe(t => {
                            t && this.panel.accordion && this.panel.accordion._handleHeaderFocus(this)
                        })
                    }
                    ngOnDestroy()
                    {
                        this._parentChangeSubscription.unsubscribe(),
                        this._focusMonitor.stopMonitoring(this._element)
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)(Rr(gy, 1), Rr(Fo), Rr(Yp), Rr(oa), Rr(my, 8), Rr(ip, 8))
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["mat-expansion-panel-header"]],
                    hostAttrs: ["role", "button", 1, "mat-expansion-panel-header", "mat-focus-indicator"],
                    hostVars: 15,
                    hostBindings: function(t, e) {
                        1 & t && $r("click", function() {
                            return e._toggle()
                        })("keydown", function(t) {
                            return e._keydown(t)
                        }),
                        2 & t && (Pr("id", e.panel._headerId)("tabindex", e.disabled ? -1 : 0)("aria-controls", e._getPanelId())("aria-expanded", e._isExpanded())("aria-disabled", e.panel.disabled), Jr("height", e._getHeaderHeight()), to("mat-expanded", e._isExpanded())("mat-expansion-toggle-indicator-after", "after" === e._getTogglePosition())("mat-expansion-toggle-indicator-before", "before" === e._getTogglePosition())("_mat-animation-noopable", "NoopAnimations" === e._animationMode))
                    },
                    inputs: {
                        expandedHeight: "expandedHeight",
                        collapsedHeight: "collapsedHeight"
                    },
                    ngContentSelectors: cy,
                    decls: 5,
                    vars: 1,
                    consts: [[1, "mat-content"], ["class", "mat-expansion-indicator", 4, "ngIf"], [1, "mat-expansion-indicator"]],
                    template: function(t, e) {
                        1 & t && (Qr(ly), Nr(0, "span", 0), Kr(1), Kr(2, 1), Kr(3, 2), Mr(), Dr(4, ay, 1, 1, "span", 1)),
                        2 & t && (as(4), Fr("ngIf", e._showToggle()))
                    },
                    directives: [Sc],
                    styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true])::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;border:3px solid;border-radius:4px;content:""}\n'],
                    encapsulation: 2,
                    data: {
                        animation: [dy.indicatorRotate]
                    },
                    changeDetection: 0
                }), t
            })(),
            by = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["mat-panel-title"]],
                    hostAttrs: [1, "mat-expansion-panel-header-title"]
                }), t
            })(),
            vy = (() => {
                class t extends J_ {
                    constructor()
                    {
                        super(...arguments),
                        this._ownHeaders = new La,
                        this._hideToggle = !1,
                        this.displayMode = "default",
                        this.togglePosition = "after"
                    }
                    get hideToggle()
                    {
                        return this._hideToggle
                    }
                    set hideToggle(t)
                    {
                        this._hideToggle = Tp(t)
                    }
                    ngAfterContentInit()
                    {
                        this._headers.changes.pipe(cf(this._headers)).subscribe(t => {
                            this._ownHeaders.reset(t.filter(t => t.panel.accordion === this)),
                            this._ownHeaders.notifyOnChanges()
                        }),
                        this._keyManager = new Zp(this._ownHeaders).withWrap().withHomeAndEnd()
                    }
                    _handleHeaderKeydown(t)
                    {
                        this._keyManager.onKeydown(t)
                    }
                    _handleHeaderFocus(t)
                    {
                        this._keyManager.updateActiveItem(t)
                    }
                    ngOnDestroy()
                    {
                        super.ngOnDestroy(),
                        this._ownHeaders.destroy()
                    }
                }
                return t.\u0275fac = function(e) {
                    return wy(e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["mat-accordion"]],
                    contentQueries: function(t, e, n) {
                        if (1 & t && Ga(n, yy, 1), 2 & t) {
                            let t;
                            Qa(t = Ya()) && (e._headers = t)
                        }
                    },
                    hostAttrs: [1, "mat-accordion"],
                    hostVars: 2,
                    hostBindings: function(t, e) {
                        2 & t && to("mat-accordion-multi", e.multi)
                    },
                    inputs: {
                        multi: "multi",
                        displayMode: "displayMode",
                        togglePosition: "togglePosition",
                        hideToggle: "hideToggle"
                    },
                    exportAs: ["matAccordion"],
                    features: [Ao([{
                        provide: hy,
                        useExisting: t
                    }]), vr]
                }), t
            })();
        const wy = Hn(vy);
        let Cy = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[Rc, pf, ny, l_]]
                }), t
            })(),
            xy = (() => {
                class t {
                    constructor()
                    {
                        this._printStyle = [],
                        this.useExistingCss = !1,
                        this.printDelay = 0,
                        this._styleSheetFile = ""
                    }
                    set printStyle(t)
                    {
                        for (let e in t)
                            t.hasOwnProperty(e) && this._printStyle.push((e + JSON.stringify(t[e])).replace(/['"]+/g, ""));
                        this.returnStyleValues()
                    }
                    returnStyleValues()
                    {
                        return `<style> ${this._printStyle.join(" ").replace(/,/g, ";")} </style>`
                    }
                    set styleSheetFile(t)
                    {
                        let e = function(t) {
                            return `<link rel="stylesheet" type="text/css" href="${t}">`
                        };
                        if (-1 !== t.indexOf(",")) {
                            const n = t.split(",");
                            for (let t of n)
                                this._styleSheetFile = this._styleSheetFile + e(t)
                        } else
                            this._styleSheetFile = e(t)
                    }
                    returnStyleSheetLinkTags()
                    {
                        return this._styleSheetFile
                    }
                    getElementTag(t)
                    {
                        const e = [],
                            n = document.getElementsByTagName(t);
                        for (let i = 0; i < n.length; i++)
                            e.push(n[i].outerHTML);
                        return e.join("\r\n")
                    }
                    getHtmlContents()
                    {
                        let t = document.getElementById(this.printSectionId),
                            e = t.getElementsByTagName("input");
                        for (var n = 0; n < e.length; n++)
                            e[n].defaultValue = e[n].value;
                        return t.innerHTML
                    }
                    print()
                    {
                        let t,
                            e,
                            n = "",
                            i = "";
                        this.useExistingCss && (n = this.getElementTag("style"), i = this.getElementTag("link")),
                        t = this.getHtmlContents(),
                        e = window.open("", "_blank", "top=0,left=0,height=auto,width=auto"),
                        e.document.open(),
                        e.document.write(`\n      <html>\n        <head>\n          <title>${this.printTitle ? this.printTitle : ""}</title>\n          ${this.returnStyleValues()}\n          ${this.returnStyleSheetLinkTags()}\n          ${n}\n          ${i}\n        </head>\n        <body>\n          ${t}\n          <script defer>\n            function triggerPrint(event) {\n              window.removeEventListener('load', triggerPrint, false);\n              setTimeout(function() {\n                window.print();\n                setTimeout(function() { window.close(); }, 0);\n              }, ${this.printDelay});\n            }\n            window.addEventListener('load', triggerPrint, false);\n          <\/script>\n        </body>\n      </html>`),
                        e.document.close()
                    }
                }
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275dir = qt({
                    type: t,
                    selectors: [["button", "ngxPrint", ""]],
                    hostBindings: function(t, e) {
                        1 & t && $r("click", function() {
                            return e.print()
                        })
                    },
                    inputs: {
                        useExistingCss: "useExistingCss",
                        printDelay: "printDelay",
                        printStyle: "printStyle",
                        styleSheetFile: "styleSheetFile",
                        printSectionId: "printSectionId",
                        printTitle: "printTitle"
                    }
                }), t
            })(),
            Ey = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    imports: [[]]
                }), t
            })();
        function Sy(t, e) {
            if (1 & t && (Nr(0, "tr"), Nr(1, "td"), oo(2), Mr(), Nr(3, "td"), oo(4), Fa(5, "number"), Mr(), Nr(6, "td"), oo(7), Fa(8, "number"), Mr(), Mr()), 2 & t) {
                const t = e.$implicit;
                as(2),
                ao(t.name),
                as(2),
                ao(Va(5, 3, t.value)),
                as(3),
                ao(Va(8, 5, t.percentage))
            }
        }
        function ky(t, e) {
            if (1 & t && (Nr(0, "tr"), Nr(1, "td"), oo(2), Mr(), Nr(3, "td"), oo(4), Mr(), Nr(5, "td"), oo(6), Mr(), Mr()), 2 & t) {
                const t = e.$implicit;
                as(2),
                ao(t.name),
                as(2),
                lo("", t.value, "g"),
                as(2),
                lo("", t.percentage, "%")
            }
        }
        function Ay(t, e) {
            if (1 & t && (Nr(0, "span"), oo(1), Mr()), 2 & t) {
                const t = Ur();
                as(1),
                lo("loaf (", t.model.totalWeight, ")")
            }
        }
        function Ty(t, e) {
            if (1 & t && (Nr(0, "span"), oo(1), Fa(2, "number"), Mr()), 2 & t) {
                const t = Ur();
                as(1),
                lo("loaves (", Va(2, 1, t.model.totalWeight / t.model.numberOfLoaves), "g each)")
            }
        }
        let Oy = (() => {
                class t {}
                return t.\u0275fac = function(e) {
                    return new (e || t)
                }, t.\u0275cmp = Lt({
                    type: t,
                    selectors: [["app-printer"]],
                    inputs: {
                        model: "model",
                        title: "title",
                        showPrinter: "showPrinter"
                    },
                    decls: 21,
                    vars: 8,
                    consts: [["id", "print-section", 3, "hidden"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["mat-raised-button", "", "color", "accent", "styleSheetFile", "../assets/printer.css", "printSectionId", "print-section", "ngxPrint", "", 3, "printTitle"]],
                    template: function(t, e) {
                        1 & t && (Nr(0, "div", 0), Nr(1, "h1"), oo(2), Mr(), Nr(3, "table"), Nr(4, "thead"), Nr(5, "tr"), Nr(6, "th"), oo(7, "Ingredient"), Mr(), Nr(8, "th"), oo(9, "Weight"), Mr(), Nr(10, "th"), oo(11, "Percentage"), Mr(), Mr(), Mr(), Nr(12, "tbody"), Dr(13, Sy, 9, 7, "tr", 1), Dr(14, ky, 7, 3, "tr", 1), Mr(), Mr(), Nr(15, "p"), oo(16), Dr(17, Ay, 2, 1, "span", 2), Dr(18, Ty, 3, 3, "span", 2), Mr(), Mr(), Nr(19, "button", 3), oo(20, "Print recipe"), Mr()),
                        2 & t && (Fr("hidden", !e.showPrinter), as(2), ao(e.model.name), as(11), Fr("ngForOf", e.model.flours), as(1), Fr("ngForOf", e.model.ingredients), as(2), lo("Makes ", e.model.numberOfLoaves, " "), as(1), Fr("ngIf", 1 === e.model.numberOfLoaves), as(1), Fr("ngIf", 1 !== e.model.numberOfLoaves), as(1), Fr("printTitle", e.title))
                    },
                    directives: [xc, Sc, K_, xy],
                    pipes: [Dc],
                    styles: ["button[_ngcontent-%COMP%]{float:right}#print-section[_ngcontent-%COMP%]{font-family:Verdana;font-size:14px}table[_ngcontent-%COMP%]{border-collapse:collapse;width:600px}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:10px;text-align:left;margin:0}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n){background-color:#eee}th[_ngcontent-%COMP%]{position:sticky;top:0;background-color:#333;color:#fff}"]
                }), t
            })(),
            Iy = (() => {
                class t {}
                return t.\u0275mod = zt({
                    type: t,
                    bootstrap: [wh]
                }), t.\u0275inj = lt({
                    factory: function(e) {
                        return new (e || t)
                    },
                    providers: [],
                    imports: [[ah, rp, Qm, Zg, H_, $_, G_, Zg, Bg, Zm, Cy, Ey]]
                }), t
            })();
        !function(t, e, n) {
            const i = t.\u0275cmp;
            i.directiveDefs = () => e.map(jt),
            i.pipeDefs = () => n.map(Bt)
        }(wh, [z_, vy, gy, yy, by, _y, K_, xc, wc, jg, Og, Ug, Nf, im, $m, rm, Rg, Oy, Sc, Pc], []),
        function() {
            if (Vl)
                throw new Error("Cannot enable prod mode after platform setup.");
            Fl = !1
        }(),
        rh().bootstrapModule(Iy).catch(t => console.error(t))
    },
    zn8P: function(t, e) {
        function n(t) {
            return Promise.resolve().then(function() {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            })
        }
        n.keys = function() {
            return []
        },
        n.resolve = n,
        t.exports = n,
        n.id = "zn8P"
    }
}, [[0, 0]]]);

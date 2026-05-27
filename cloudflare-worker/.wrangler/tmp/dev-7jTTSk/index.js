var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type2) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type2) {
        return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
      }
      getEntriesByType(type2) {
        return this._entries.filter((e) => e.entryType === type2);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type2, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node-built-in-modules:events
import libDefault from "events";
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// ../node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "../node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class _ArrayParser {
      static {
        __name(this, "ArrayParser");
      }
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
          entry = this.recorded.join("");
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null) entry = this.transform(entry);
          this.entries.push(entry);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=") break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new _ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested) return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote) this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    function identity(value) {
      return value;
    }
    __name(identity, "identity");
  }
});

// ../node_modules/pg-types/lib/arrayParser.js
var require_arrayParser = __commonJS({
  "../node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    module.exports = {
      create: /* @__PURE__ */ __name(function(source, transform) {
        return {
          parse: /* @__PURE__ */ __name(function() {
            return array.parse(source, transform);
          }, "parse")
        };
      }, "create")
    };
  }
});

// ../node_modules/postgres-date/index.js
var require_postgres_date = __commonJS({
  "../node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY = /^-?infinity$/;
    module.exports = /* @__PURE__ */ __name(function parseDate(isoDate) {
      if (INFINITY.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms = matches[7];
      ms = ms ? 1e3 * parseFloat(ms) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    }, "parseDate");
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    __name(getDate, "getDate");
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone) return;
      var type2 = zone[1];
      if (type2 === "Z") {
        return 0;
      }
      var sign = type2 === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign * 1e3;
    }
    __name(timeZoneOffset, "timeZoneOffset");
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    __name(bcYearToNegativeYear, "bcYearToNegativeYear");
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
    __name(is0To99, "is0To99");
  }
});

// ../node_modules/xtend/mutable.js
var require_mutable = __commonJS({
  "../node_modules/xtend/mutable.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    __name(extend, "extend");
  }
});

// ../node_modules/postgres-interval/index.js
var require_postgres_interval = __commonJS({
  "../node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw);
      }
      extend(this, parse(raw));
    }
    __name(PostgresInterval, "PostgresInterval");
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0) return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
      __name(buildProperty, "buildProperty");
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    __name(parseMilliseconds, "parseMilliseconds");
    function parse(interval) {
      if (!interval) return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value) return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
    __name(parse, "parse");
  }
});

// ../node_modules/postgres-bytea/index.js
var require_postgres_bytea = __commonJS({
  "../node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var bufferFrom = Buffer.from || Buffer;
    module.exports = /* @__PURE__ */ __name(function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return bufferFrom(input.substr(2), "hex");
      }
      var output = "";
      var i = 0;
      while (i < input.length) {
        if (input[i] !== "\\") {
          output += input[i];
          ++i;
        } else {
          if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
          } else {
            var backslashes = 1;
            while (i + backslashes < input.length && input[i + backslashes] === "\\") {
              backslashes++;
            }
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
              output += "\\";
            }
            i += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return bufferFrom(output, "binary");
    }, "parseBytea");
  }
});

// ../node_modules/pg-types/lib/textParsers.js
var require_textParsers = __commonJS({
  "../node_modules/pg-types/lib/textParsers.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn) {
      return /* @__PURE__ */ __name(function nullAllowed(value) {
        if (value === null) return value;
        return fn(value);
      }, "nullAllowed");
    }
    __name(allowNull, "allowNull");
    function parseBool(value) {
      if (value === null) return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    __name(parseBool, "parseBool");
    function parseBoolArray(value) {
      if (!value) return null;
      return array.parse(value, parseBool);
    }
    __name(parseBoolArray, "parseBoolArray");
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    __name(parseBaseTenInt, "parseBaseTenInt");
    function parseIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    __name(parseIntegerArray, "parseIntegerArray");
    function parseBigIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
      }));
    }
    __name(parseBigIntegerArray, "parseBigIntegerArray");
    var parsePointArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parsePoint(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parsePointArray");
    var parseFloatArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseFloat(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseFloatArray");
    var parseStringArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value);
      return p.parse();
    }, "parseStringArray");
    var parseDateArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseDate(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseDateArray");
    var parseIntervalArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseInterval(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseIntervalArray");
    var parseByteAArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    }, "parseByteAArray");
    var parseInteger = /* @__PURE__ */ __name(function(value) {
      return parseInt(value, 10);
    }, "parseInteger");
    var parseBigInteger = /* @__PURE__ */ __name(function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    }, "parseBigInteger");
    var parseJsonArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    }, "parseJsonArray");
    var parsePoint = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    }, "parsePoint");
    var parseCircle = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i = 2; i < value.length - 1; i++) {
        if (!pointParsed) {
          point += value[i];
        }
        if (value[i] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i] === ",") {
          continue;
        }
        radius += value[i];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    }, "parseCircle");
    var init = /* @__PURE__ */ __name(function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    }, "init");
    module.exports = {
      init
    };
  }
});

// ../node_modules/pg-int8/index.js
var require_pg_int8 = __commonJS({
  "../node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BASE = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = "-";
      }
      var result = "";
      var carry;
      var t;
      var digits;
      var pad;
      var l;
      var i;
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        t = 4294967296 * carry + low;
        digits = "" + t % BASE;
        return sign + digits + result;
      }
    }
    __name(readInt8, "readInt8");
    module.exports = readInt8;
  }
});

// ../node_modules/pg-types/lib/binaryParsers.js
var require_binaryParsers = __commonJS({
  "../node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parseInt64 = require_pg_int8();
    var parseBits = /* @__PURE__ */ __name(function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = /* @__PURE__ */ __name(function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      }, "inv");
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i = offsetBytes + 1; i < bytes; i++) {
        result = callback(result, inv(data[i]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    }, "parseBits");
    var parseFloatFromBits = /* @__PURE__ */ __name(function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = /* @__PURE__ */ __name(function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i = 1; i <= bits; i++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      }, "parsePrecisionBits");
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, "parseFloatFromBits");
    var parseInt16 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    }, "parseInt16");
    var parseInt32 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    }, "parseInt32");
    var parseFloat32 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 23, 8);
    }, "parseFloat32");
    var parseFloat64 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 52, 11);
    }, "parseFloat64");
    var parseNumeric = /* @__PURE__ */ __name(function(value) {
      var sign = parseBits(value, 16, 32);
      if (sign == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i = 0; i < ndigits; i++) {
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    }, "parseNumeric");
    var parseDate = /* @__PURE__ */ __name(function(isUTC, value) {
      var sign = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    }, "parseDate");
    var parseArray = /* @__PURE__ */ __name(function(value) {
      var dim = parseBits(value, 32);
      var flags = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i = 0; i < dim; i++) {
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = /* @__PURE__ */ __name(function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      }, "parseElement");
      var parse = /* @__PURE__ */ __name(function(dimension, elementType2) {
        var array = [];
        var i2;
        if (dimension.length > 1) {
          var count3 = dimension.shift();
          for (i2 = 0; i2 < count3; i2++) {
            array[i2] = parse(dimension, elementType2);
          }
          dimension.unshift(count3);
        } else {
          for (i2 = 0; i2 < dimension[0]; i2++) {
            array[i2] = parseElement(elementType2);
          }
        }
        return array;
      }, "parse");
      return parse(dims, elementType);
    }, "parseArray");
    var parseText = /* @__PURE__ */ __name(function(value) {
      return value.toString("utf8");
    }, "parseText");
    var parseBool = /* @__PURE__ */ __name(function(value) {
      if (value === null) return null;
      return parseBits(value, 8) > 0;
    }, "parseBool");
    var init = /* @__PURE__ */ __name(function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray);
      register(1007, parseArray);
      register(1016, parseArray);
      register(1008, parseArray);
      register(1009, parseArray);
      register(25, parseText);
    }, "init");
    module.exports = {
      init
    };
  }
});

// ../node_modules/pg-types/lib/builtins.js
var require_builtins = __commonJS({
  "../node_modules/pg-types/lib/builtins.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});

// ../node_modules/pg-types/index.js
var require_pg_types = __commonJS({
  "../node_modules/pg-types/index.js"(exports) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    __name(noParse, "noParse");
    function getTypeParser(oid, format) {
      format = format || "text";
      if (!typeParsers[format]) {
        return noParse;
      }
      return typeParsers[format][oid] || noParse;
    }
    __name(getTypeParser, "getTypeParser");
    function setTypeParser(oid, format, parseFn) {
      if (typeof format == "function") {
        parseFn = format;
        format = "text";
      }
      typeParsers[format][oid] = parseFn;
    }
    __name(setTypeParser, "setTypeParser");
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});

// ../node_modules/pg/lib/defaults.js
var require_defaults = __commonJS({
  "../node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var user;
    try {
      user = process.platform === "win32" ? process.env.USERNAME : process.env.USER;
    } catch {
    }
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});

// node-built-in-modules:util/types
import libDefault2 from "util/types";
var require_types = __commonJS({
  "node-built-in-modules:util/types"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// ../node_modules/pg/lib/utils.js
var require_utils = __commonJS({
  "../node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var defaults2 = require_defaults();
    var { isDate } = require_types();
    function escapeElement(elementRepresentation) {
      const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped + '"';
    }
    __name(escapeElement, "escapeElement");
    function arrayString(val) {
      let result = "{";
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          result += ",";
        }
        let item = val[i];
        if (item == null) {
          result += "NULL";
        } else if (Array.isArray(item)) {
          result += arrayString(item);
        } else if (ArrayBuffer.isView(item)) {
          if (!(item instanceof Buffer)) {
            item = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
          }
          result += "\\\\x" + item.toString("hex");
        } else {
          result += escapeElement(prepareValue(item));
        }
      }
      result += "}";
      return result;
    }
    __name(arrayString, "arrayString");
    var prepareValue = /* @__PURE__ */ __name(function(val, seen) {
      if (val == null) {
        return null;
      }
      if (typeof val === "object") {
        if (val instanceof Buffer) {
          return val;
        }
        if (ArrayBuffer.isView(val)) {
          return Buffer.from(val.buffer, val.byteOffset, val.byteLength);
        }
        if (isDate(val)) {
          if (defaults2.parseInputDatesAsUTC) {
            return dateToStringUTC(val);
          } else {
            return dateToString(val);
          }
        }
        if (Array.isArray(val)) {
          return arrayString(val);
        }
        return prepareObject(val, seen);
      }
      return val.toString();
    }, "prepareValue");
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    __name(prepareObject, "prepareObject");
    function dateToString(date) {
      let offset = -date.getTimezoneOffset();
      let year = date.getFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToString, "dateToString");
    function dateToStringUTC(date) {
      let year = date.getUTCFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
      ret += "+00:00";
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToStringUTC, "dateToStringUTC");
    function normalizeQueryConfig(config2, values, callback) {
      config2 = typeof config2 === "string" ? { text: config2 } : config2;
      if (values) {
        if (typeof values === "function") {
          config2.callback = values;
        } else {
          config2.values = values;
        }
      }
      if (callback) {
        config2.callback = callback;
      }
      return config2;
    }
    __name(normalizeQueryConfig, "normalizeQueryConfig");
    var escapeIdentifier2 = /* @__PURE__ */ __name(function(str) {
      return '"' + str.replace(/"/g, '""') + '"';
    }, "escapeIdentifier");
    var escapeLiteral2 = /* @__PURE__ */ __name(function(str) {
      let hasBackslash = false;
      let escaped = "'";
      if (str == null) {
        return "''";
      }
      if (typeof str !== "string") {
        return "''";
      }
      for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c === "'") {
          escaped += c + c;
        } else if (c === "\\") {
          escaped += c + c;
          hasBackslash = true;
        } else {
          escaped += c;
        }
      }
      escaped += "'";
      if (hasBackslash === true) {
        escaped = " E" + escaped;
      }
      return escaped;
    }, "escapeLiteral");
    module.exports = {
      prepareValue: /* @__PURE__ */ __name(function prepareValueWrapper(value) {
        return prepareValue(value);
      }, "prepareValueWrapper"),
      normalizeQueryConfig,
      escapeIdentifier: escapeIdentifier2,
      escapeLiteral: escapeLiteral2
    };
  }
});

// node-built-in-modules:util
import libDefault3 from "util";
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// node-built-in-modules:crypto
import libDefault4 from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// ../node_modules/pg/lib/crypto/utils.js
var require_utils2 = __commonJS({
  "../node_modules/pg/lib/crypto/utils.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
    var webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
    var subtleCrypto = webCrypto.subtle;
    var textEncoder = new TextEncoder();
    function randomBytes(length) {
      return webCrypto.getRandomValues(Buffer.alloc(length));
    }
    __name(randomBytes, "randomBytes");
    async function md5(string) {
      try {
        return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
      } catch (e) {
        const data = typeof string === "string" ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest("MD5", data);
        return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    }
    __name(md5, "md5");
    async function postgresMd5PasswordHash(user, password, salt) {
      const inner = await md5(password + user);
      const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    async function sha256(text) {
      return await subtleCrypto.digest("SHA-256", text);
    }
    __name(sha256, "sha256");
    async function hashByName(hashName, text) {
      return await subtleCrypto.digest(hashName, text);
    }
    __name(hashByName, "hashByName");
    async function hmacSha256(keyBuffer, msg) {
      const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
      return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
    }
    __name(deriveKey, "deriveKey");
  }
});

// ../node_modules/pg/lib/crypto/cert-signatures.js
var require_cert_signatures = __commonJS({
  "../node_modules/pg/lib/crypto/cert-signatures.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function x509Error(msg, cert) {
      return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
    }
    __name(x509Error, "x509Error");
    function readASN1Length(data, index) {
      let length = data[index++];
      if (length < 128) return { length, index };
      const lengthBytes = length & 127;
      if (lengthBytes > 4) throw x509Error("bad length", data);
      length = 0;
      for (let i = 0; i < lengthBytes; i++) {
        length = length << 8 | data[index++];
      }
      return { length, index };
    }
    __name(readASN1Length, "readASN1Length");
    function readASN1OID(data, index) {
      if (data[index++] !== 6) throw x509Error("non-OID data", data);
      const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
      index = indexAfterOIDLength;
      const lastIndex = index + OIDLength;
      const byte1 = data[index++];
      let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
      while (index < lastIndex) {
        let value = 0;
        while (index < lastIndex) {
          const nextByte = data[index++];
          value = value << 7 | nextByte & 127;
          if (nextByte < 128) break;
        }
        oid += "." + value;
      }
      return { oid, index };
    }
    __name(readASN1OID, "readASN1OID");
    function expectASN1Seq(data, index) {
      if (data[index++] !== 48) throw x509Error("non-sequence data", data);
      return readASN1Length(data, index);
    }
    __name(expectASN1Seq, "expectASN1Seq");
    function signatureAlgorithmHashFromCertificate(data, index) {
      if (index === void 0) index = 0;
      index = expectASN1Seq(data, index).index;
      const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
      index = indexAfterCertInfoLength + certInfoLength;
      index = expectASN1Seq(data, index).index;
      const { oid, index: indexAfterOID } = readASN1OID(data, index);
      switch (oid) {
        // RSA
        case "1.2.840.113549.1.1.4":
          return "MD5";
        case "1.2.840.113549.1.1.5":
          return "SHA-1";
        case "1.2.840.113549.1.1.11":
          return "SHA-256";
        case "1.2.840.113549.1.1.12":
          return "SHA-384";
        case "1.2.840.113549.1.1.13":
          return "SHA-512";
        case "1.2.840.113549.1.1.14":
          return "SHA-224";
        case "1.2.840.113549.1.1.15":
          return "SHA512-224";
        case "1.2.840.113549.1.1.16":
          return "SHA512-256";
        // ECDSA
        case "1.2.840.10045.4.1":
          return "SHA-1";
        case "1.2.840.10045.4.3.1":
          return "SHA-224";
        case "1.2.840.10045.4.3.2":
          return "SHA-256";
        case "1.2.840.10045.4.3.3":
          return "SHA-384";
        case "1.2.840.10045.4.3.4":
          return "SHA-512";
        // RSASSA-PSS: hash is indicated separately
        case "1.2.840.113549.1.1.10": {
          index = indexAfterOID;
          index = expectASN1Seq(data, index).index;
          if (data[index++] !== 160) throw x509Error("non-tag data", data);
          index = readASN1Length(data, index).index;
          index = expectASN1Seq(data, index).index;
          const { oid: hashOID } = readASN1OID(data, index);
          switch (hashOID) {
            // standalone hash OIDs
            case "1.2.840.113549.2.5":
              return "MD5";
            case "1.3.14.3.2.26":
              return "SHA-1";
            case "2.16.840.1.101.3.4.2.1":
              return "SHA-256";
            case "2.16.840.1.101.3.4.2.2":
              return "SHA-384";
            case "2.16.840.1.101.3.4.2.3":
              return "SHA-512";
          }
          throw x509Error("unknown hash OID " + hashOID, data);
        }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case "1.3.101.110":
        case "1.3.101.112":
          return "SHA-512";
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case "1.3.101.111":
        case "1.3.101.113":
          throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
      }
      throw x509Error("unknown OID " + oid, data);
    }
    __name(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    module.exports = { signatureAlgorithmHashFromCertificate };
  }
});

// ../node_modules/pg/lib/crypto/sasl.js
var require_sasl = __commonJS({
  "../node_modules/pg/lib/crypto/sasl.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var crypto = require_utils2();
    var { signatureAlgorithmHashFromCertificate } = require_cert_signatures();
    function saslprep(password) {
      const nonAsciiSpace = /[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g;
      const mappedToNothing = /[\u00AD\u034F\u1806\u180B\u180C\u180D\u200C\u200D\u2060\uFE00-\uFE0F\uFEFF]/g;
      return password.replace(nonAsciiSpace, " ").replace(mappedToNothing, "").normalize("NFKC");
    }
    __name(saslprep, "saslprep");
    var DEFAULT_MAX_SCRAM_ITERATIONS = 1e5;
    function startSession(mechanisms, stream, scramMaxIterations = DEFAULT_MAX_SCRAM_ITERATIONS) {
      const candidates = ["SCRAM-SHA-256"];
      if (stream) candidates.unshift("SCRAM-SHA-256-PLUS");
      const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
      if (!mechanism) {
        throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
      }
      if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream.getPeerCertificate !== "function") {
        throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
      }
      const clientNonce = crypto.randomBytes(18).toString("base64");
      const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream ? "y" : "n";
      return {
        mechanism,
        clientNonce,
        response: gs2Header + ",,n=*,r=" + clientNonce,
        message: "SASLInitialResponse",
        scramMaxIterations
      };
    }
    __name(startSession, "startSession");
    async function continueSession(session, password, serverData, stream) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (password === "") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      const scramMaxIterations = typeof session.scramMaxIterations === "number" ? session.scramMaxIterations : DEFAULT_MAX_SCRAM_ITERATIONS;
      if (scramMaxIterations !== 0 && sv.iteration > scramMaxIterations) {
        throw new Error(
          "SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration count " + sv.iteration + " exceeds scramMaxIterations of " + scramMaxIterations
        );
      }
      const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      let channelBinding = stream ? "eSws" : "biws";
      if (session.mechanism === "SCRAM-SHA-256-PLUS") {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
        const certHash = await crypto.hashByName(hashName, peerCert);
        const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
        channelBinding = bindingData.toString("base64");
      }
      const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
      const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      const saltBytes = Buffer.from(sv.salt, "base64");
      const saltedPassword = await crypto.deriveKey(saslprep(password), saltBytes, sv.iteration);
      const clientKey = await crypto.hmacSha256(saltedPassword, "Client Key");
      const storedKey = await crypto.sha256(clientKey);
      const clientSignature = await crypto.hmacSha256(storedKey, authMessage);
      const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
      const serverKey = await crypto.hmacSha256(saltedPassword, "Server Key");
      const serverSignatureBytes = await crypto.hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    __name(continueSession, "continueSession");
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    __name(finalizeSession, "finalizeSession");
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
    }
    __name(isPrintableChars, "isPrintableChars");
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    __name(isBase64, "isBase64");
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(
        text.split(",").map((attrValue) => {
          if (!/^.=/.test(attrValue)) {
            throw new Error("SASL: Invalid attribute pair entry");
          }
          const name = attrValue[0];
          const value = attrValue.substring(2);
          return [name, value];
        })
      );
    }
    __name(parseAttributePairs, "parseAttributePairs");
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    __name(parseServerFirstMessage, "parseServerFirstMessage");
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const error3 = attrPairs.get("e");
      const serverSignature = attrPairs.get("v");
      if (error3) {
        throw new Error(`SASL: SCRAM-SERVER-FINAL-MESSAGE: server returned error: "${error3}"`);
      }
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    __name(parseServerFinalMessage, "parseServerFinalMessage");
    function xorBuffers(a, b) {
      if (!Buffer.isBuffer(a)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a.length !== b.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
    }
    __name(xorBuffers, "xorBuffers");
    module.exports = {
      startSession,
      continueSession,
      finalizeSession,
      DEFAULT_MAX_SCRAM_ITERATIONS
    };
  }
});

// ../node_modules/pg/lib/type-overrides.js
var require_type_overrides = __commonJS({
  "../node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    function TypeOverrides2(userTypes) {
      this._types = userTypes || types2;
      this.text = {};
      this.binary = {};
    }
    __name(TypeOverrides2, "TypeOverrides");
    TypeOverrides2.prototype.getOverrides = function(format) {
      switch (format) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides2.prototype.setTypeParser = function(oid, format, parseFn) {
      if (typeof format === "function") {
        parseFn = format;
        format = "text";
      }
      this.getOverrides(format)[oid] = parseFn;
    };
    TypeOverrides2.prototype.getTypeParser = function(oid, format) {
      format = format || "text";
      return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
    };
    module.exports = TypeOverrides2;
  }
});

// node-built-in-modules:dns
import libDefault5 from "dns";
var require_dns = __commonJS({
  "node-built-in-modules:dns"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault5;
  }
});

// node-built-in-modules:fs
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});

// ../node_modules/pg-connection-string/index.js
var require_pg_connection_string = __commonJS({
  "../node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function parse(str, options = {}) {
      if (str.charAt(0) === "/") {
        const config3 = str.split(" ");
        return { host: config3[0], database: config3[1] };
      }
      const config2 = /* @__PURE__ */ Object.create(null);
      let result;
      let dummyHost = false;
      if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        str = encodeURI(str).replace(/%25(\d\d)/g, "%$1");
      }
      try {
        try {
          result = new URL(str, "postgres://base");
        } catch (e) {
          result = new URL(str.replace("@/", "@___DUMMY___/"), "postgres://base");
          dummyHost = true;
        }
      } catch (err) {
        err.input && (err.input = "*****REDACTED*****");
        throw err;
      }
      for (const entry of result.searchParams.entries()) {
        config2[entry[0]] = entry[1];
      }
      config2.user = config2.user || decodeURIComponent(result.username);
      config2.password = config2.password || decodeURIComponent(result.password);
      if (result.protocol == "socket:") {
        config2.host = decodeURI(result.pathname);
        config2.database = result.searchParams.get("db");
        config2.client_encoding = result.searchParams.get("encoding");
        return config2;
      }
      const hostname2 = dummyHost ? "" : result.hostname;
      if (!config2.host) {
        config2.host = decodeURIComponent(hostname2);
      } else if (hostname2 && /^%2f/i.test(hostname2)) {
        result.pathname = hostname2 + result.pathname;
      }
      if (!config2.port) {
        config2.port = result.port;
      }
      const pathname = result.pathname.slice(1) || null;
      config2.database = pathname ? decodeURI(pathname) : null;
      if (config2.ssl === "true" || config2.ssl === "1") {
        config2.ssl = true;
      }
      if (config2.ssl === "0") {
        config2.ssl = false;
      }
      if (config2.sslcert || config2.sslkey || config2.sslrootcert || config2.sslmode) {
        config2.ssl = {};
      }
      const fs = config2.sslcert || config2.sslkey || config2.sslrootcert ? require_fs() : null;
      if (config2.sslcert) {
        config2.ssl.cert = fs.readFileSync(config2.sslcert).toString();
      }
      if (config2.sslkey) {
        config2.ssl.key = fs.readFileSync(config2.sslkey).toString();
      }
      if (config2.sslrootcert) {
        config2.ssl.ca = fs.readFileSync(config2.sslrootcert).toString();
      }
      if (options.useLibpqCompat && config2.uselibpqcompat) {
        throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
      }
      if (config2.uselibpqcompat === "true" || options.useLibpqCompat) {
        switch (config2.sslmode) {
          case "disable": {
            config2.ssl = false;
            break;
          }
          case "prefer": {
            config2.ssl.rejectUnauthorized = false;
            break;
          }
          case "require": {
            if (config2.sslrootcert) {
              config2.ssl.checkServerIdentity = function() {
              };
            } else {
              config2.ssl.rejectUnauthorized = false;
            }
            break;
          }
          case "verify-ca": {
            if (!config2.ssl.ca) {
              throw new Error(
                "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
              );
            }
            config2.ssl.checkServerIdentity = function() {
            };
            break;
          }
          case "verify-full": {
            break;
          }
        }
      } else {
        switch (config2.sslmode) {
          case "disable": {
            config2.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full": {
            if (config2.sslmode !== "verify-full") {
              deprecatedSslModeWarning(config2.sslmode);
            }
            break;
          }
          case "no-verify": {
            config2.ssl.rejectUnauthorized = false;
            break;
          }
        }
      }
      return config2;
    }
    __name(parse, "parse");
    function toConnectionOptions(sslConfig) {
      const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value]) => {
        if (value !== void 0 && value !== null) {
          c[key] = value;
        }
        return c;
      }, /* @__PURE__ */ Object.create(null));
      return connectionOptions;
    }
    __name(toConnectionOptions, "toConnectionOptions");
    function toClientConfig(config2) {
      const poolConfig = Object.entries(config2).reduce((c, [key, value]) => {
        if (key === "ssl") {
          const sslConfig = value;
          if (typeof sslConfig === "boolean") {
            c[key] = sslConfig;
          }
          if (typeof sslConfig === "object") {
            c[key] = toConnectionOptions(sslConfig);
          }
        } else if (value !== void 0 && value !== null) {
          if (key === "port") {
            if (value !== "") {
              const v = parseInt(value, 10);
              if (isNaN(v)) {
                throw new Error(`Invalid ${key}: ${value}`);
              }
              c[key] = v;
            }
          } else {
            c[key] = value;
          }
        }
        return c;
      }, /* @__PURE__ */ Object.create(null));
      return poolConfig;
    }
    __name(toClientConfig, "toClientConfig");
    function parseIntoClientConfig(str) {
      return toClientConfig(parse(str));
    }
    __name(parseIntoClientConfig, "parseIntoClientConfig");
    function deprecatedSslModeWarning(sslmode) {
      if (!deprecatedSslModeWarning.warned && typeof process !== "undefined" && process.emitWarning) {
        deprecatedSslModeWarning.warned = true;
        process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
      }
    }
    __name(deprecatedSslModeWarning, "deprecatedSslModeWarning");
    module.exports = parse;
    parse.parse = parse;
    parse.toClientConfig = toClientConfig;
    parse.parseIntoClientConfig = parseIntoClientConfig;
  }
});

// ../node_modules/pg/lib/connection-parameters.js
var require_connection_parameters = __commonJS({
  "../node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var dns = require_dns();
    var defaults2 = require_defaults();
    var parse = require_pg_connection_string().parse;
    var val = /* @__PURE__ */ __name(function(key, config2, envVar) {
      if (config2[key]) {
        return config2[key];
      }
      if (envVar === void 0) {
        envVar = process.env["PG" + key.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return envVar || defaults2[key];
    }, "val");
    var readSSLConfigFromEnvironment = /* @__PURE__ */ __name(function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults2.ssl;
    }, "readSSLConfigFromEnvironment");
    var quoteParamValue = /* @__PURE__ */ __name(function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    }, "quoteParamValue");
    var add = /* @__PURE__ */ __name(function(params, config2, paramName) {
      const value = config2[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    }, "add");
    var ConnectionParameters = class {
      static {
        __name(this, "ConnectionParameters");
      }
      constructor(config2) {
        config2 = typeof config2 === "string" ? parse(config2) : config2 || {};
        if (config2.connectionString) {
          config2 = Object.assign({}, config2, parse(config2.connectionString));
        }
        this.user = val("user", config2);
        this.database = val("database", config2);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config2), 10);
        this.host = val("host", config2);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config2)
        });
        this.binary = val("binary", config2);
        this.options = val("options", config2);
        this.ssl = typeof config2.ssl === "undefined" ? readSSLConfigFromEnvironment() : config2.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.client_encoding = val("client_encoding", config2);
        this.replication = val("replication", config2);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config2, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config2, false);
        this.statement_timeout = val("statement_timeout", config2, false);
        this.lock_timeout = val("lock_timeout", config2, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config2, false);
        this.query_timeout = val("query_timeout", config2, false);
        if (config2.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config2.connectionTimeoutMillis / 1e3);
        }
        if (config2.keepAlive === false) {
          this.keepalives = 0;
        } else if (config2.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config2.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config2.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        add(params, this, "connect_timeout");
        add(params, this, "options");
        const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add(params, ssl, "sslmode");
        add(params, ssl, "sslca");
        add(params, ssl, "sslkey");
        add(params, ssl, "sslcert");
        add(params, ssl, "sslrootcert");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err) return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    module.exports = ConnectionParameters;
  }
});

// ../node_modules/pg/lib/result.js
var require_result = __commonJS({
  "../node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result2 = class {
      static {
        __name(this, "Result");
      }
      constructor(rowMode, types3) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types3;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
      }
      // adds a command complete message
      addCommandComplete(msg) {
        let match;
        if (msg.text) {
          match = matchRegexp.exec(msg.text);
        } else {
          match = matchRegexp.exec(msg.command);
        }
        if (match) {
          this.command = match[1];
          if (match[3]) {
            this.oid = parseInt(match[2], 10);
            this.rowCount = parseInt(match[3], 10);
          } else if (match[2]) {
            this.rowCount = parseInt(match[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          if (rawValue !== null) {
            row[i] = this._parsers[i](rawValue);
          } else {
            row[i] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        const row = { ...this._prebuiltEmptyResultObject };
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          const field = this.fields[i].name;
          if (rawValue !== null) {
            const v = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
            row[field] = this._parsers[i](v);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        const row = /* @__PURE__ */ Object.create(null);
        for (let i = 0; i < fieldDescriptions.length; i++) {
          const desc = fieldDescriptions[i];
          row[desc.name] = null;
          if (this._types) {
            this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i] = types2.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
        this._prebuiltEmptyResultObject = { ...row };
      }
    };
    module.exports = Result2;
  }
});

// ../node_modules/pg/lib/query.js
var require_query = __commonJS({
  "../node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { EventEmitter: EventEmitter2 } = require_events();
    var Result2 = require_result();
    var utils = require_utils();
    var Query2 = class extends EventEmitter2 {
      static {
        __name(this, "Query");
      }
      constructor(config2, values, callback) {
        super();
        config2 = utils.normalizeQueryConfig(config2, values, callback);
        this.text = config2.text;
        this.values = config2.values;
        this.rows = config2.rows;
        this.types = config2.types;
        this.name = config2.name;
        this.queryMode = config2.queryMode;
        this.binary = config2.binary;
        this.portal = config2.portal || "";
        this.callback = config2.callback;
        this._rowMode = config2.rowMode;
        if (process.domain && config2.callback) {
          this.callback = process.domain.bind(config2.callback);
        }
        this._result = new Result2(this._rowMode, this.types);
        this._results = this._result;
        this._canceledDueToError = false;
      }
      requiresPreparation() {
        if (this.queryMode === "extended") {
          return true;
        }
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result2(this._rowMode, this._result._types);
          this._results.push(this._result);
        }
      }
      // associates row metadata from the supplied
      // message with this query object
      // metadata used when parsing row results
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      // if a named prepared statement is created with empty query text
      // the backend will send an emptyQuery message but *not* a command complete message
      // since we pipeline sync immediately after execute we don't need to do anything here
      // unless we have rows specified, in which case we did not pipeline the initial sync call
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          try {
            this.callback(null, this._results);
          } catch (err) {
            process.nextTick(() => {
              throw err;
            });
          }
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          connection.stream.cork && connection.stream.cork();
          try {
            this.prepare(connection);
          } finally {
            connection.stream.uncork && connection.stream.uncork();
          }
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      prepare(connection) {
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    module.exports = Query2;
  }
});

// ../node_modules/pg-protocol/dist/messages.js
var require_messages = __commonJS({
  "../node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError2 = class extends Error {
      static {
        __name(this, "DatabaseError");
      }
      constructor(message, length, name) {
        super(message);
        this.length = length;
        this.name = name;
      }
    };
    exports.DatabaseError = DatabaseError2;
    var CopyDataMessage = class {
      static {
        __name(this, "CopyDataMessage");
      }
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      static {
        __name(this, "CopyResponse");
      }
      constructor(length, name, binary, columnCount) {
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    exports.CopyResponse = CopyResponse;
    var Field = class {
      static {
        __name(this, "Field");
      }
      constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
      }
    };
    exports.Field = Field;
    var RowDescriptionMessage = class {
      static {
        __name(this, "RowDescriptionMessage");
      }
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      static {
        __name(this, "ParameterDescriptionMessage");
      }
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      static {
        __name(this, "ParameterStatusMessage");
      }
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      static {
        __name(this, "AuthenticationMD5Password");
      }
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      static {
        __name(this, "BackendKeyDataMessage");
      }
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      static {
        __name(this, "NotificationResponseMessage");
      }
      constructor(length, processId, channel2, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel2;
        this.payload = payload;
        this.name = "notification";
      }
    };
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      static {
        __name(this, "ReadyForQueryMessage");
      }
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      static {
        __name(this, "CommandCompleteMessage");
      }
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      static {
        __name(this, "DataRowMessage");
      }
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      static {
        __name(this, "NoticeMessage");
      }
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    exports.NoticeMessage = NoticeMessage;
  }
});

// ../node_modules/pg-protocol/dist/buffer-writer.js
var require_buffer_writer = __commonJS({
  "../node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      static {
        __name(this, "Writer");
      }
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          const oldBuffer = this.buffer;
          const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          const len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        const len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
    };
    exports.Writer = Writer;
  }
});

// ../node_modules/pg-protocol/dist/serializer.js
var require_serializer = __commonJS({
  "../node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = /* @__PURE__ */ __name((opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key of Object.keys(opts)) {
        writer.addCString(key).addCString(opts[key]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      const bodyBuffer = writer.addCString("").flush();
      const length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    }, "startup");
    var requestSsl = /* @__PURE__ */ __name(() => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    }, "requestSsl");
    var password = /* @__PURE__ */ __name((password2) => {
      return writer.addCString(password2).flush(
        112
        /* code.startup */
      );
    }, "password");
    var sendSASLInitialResponseMessage = /* @__PURE__ */ __name(function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
      return writer.flush(
        112
        /* code.startup */
      );
    }, "sendSASLInitialResponseMessage");
    var sendSCRAMClientFinalMessage = /* @__PURE__ */ __name(function(additionalData) {
      return writer.addString(additionalData).flush(
        112
        /* code.startup */
      );
    }, "sendSCRAMClientFinalMessage");
    var query = /* @__PURE__ */ __name((text) => {
      return writer.addCString(text).flush(
        81
        /* code.query */
      );
    }, "query");
    var emptyArray = [];
    var parse = /* @__PURE__ */ __name((query2) => {
      const name = query2.name || "";
      if (name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name, name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types2 = query2.types || emptyArray;
      const len = types2.length;
      const buffer = writer.addCString(name).addCString(query2.text).addInt16(len);
      for (let i = 0; i < len; i++) {
        buffer.addInt32(types2[i]);
      }
      return writer.flush(
        80
        /* code.parse */
      );
    }, "parse");
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = /* @__PURE__ */ __name(function(values, valueMapper) {
      for (let i = 0; i < values.length; i++) {
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(
            1
            /* ParamType.BINARY */
          );
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(Buffer.byteLength(mappedVal));
          paramWriter.addString(mappedVal);
        }
      }
    }, "writeValues");
    var bind = /* @__PURE__ */ __name((config2 = {}) => {
      const portal = config2.portal || "";
      const statement = config2.statement || "";
      const binary = config2.binary || false;
      const values = config2.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      writeValues(values, config2.valueMapper);
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(1);
      writer.addInt16(
        binary ? 1 : 0
        /* ParamType.STRING */
      );
      return writer.flush(
        66
        /* code.bind */
      );
    }, "bind");
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = /* @__PURE__ */ __name((config2) => {
      if (!config2 || !config2.portal && !config2.rows) {
        return emptyExecute;
      }
      const portal = config2.portal || "";
      const rows = config2.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    }, "execute");
    var cancel = /* @__PURE__ */ __name((processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    }, "cancel");
    var cstringMessage = /* @__PURE__ */ __name((code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    }, "cstringMessage");
    var emptyDescribePortal = writer.addCString("P").flush(
      68
      /* code.describe */
    );
    var emptyDescribeStatement = writer.addCString("S").flush(
      68
      /* code.describe */
    );
    var describe = /* @__PURE__ */ __name((msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    }, "describe");
    var close2 = /* @__PURE__ */ __name((msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    }, "close");
    var copyData = /* @__PURE__ */ __name((chunk) => {
      return writer.add(chunk).flush(
        100
        /* code.copyFromChunk */
      );
    }, "copyData");
    var copyFail = /* @__PURE__ */ __name((message) => {
      return cstringMessage(102, message);
    }, "copyFail");
    var codeOnlyBuffer = /* @__PURE__ */ __name((code) => Buffer.from([code, 0, 0, 0, 4]), "codeOnlyBuffer");
    var flushBuffer = codeOnlyBuffer(
      72
      /* code.flush */
    );
    var syncBuffer = codeOnlyBuffer(
      83
      /* code.sync */
    );
    var endBuffer = codeOnlyBuffer(
      88
      /* code.end */
    );
    var copyDoneBuffer = codeOnlyBuffer(
      99
      /* code.copyDone */
    );
    var serialize = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query,
      parse,
      bind,
      execute,
      describe,
      close: close2,
      flush: /* @__PURE__ */ __name(() => flushBuffer, "flush"),
      sync: /* @__PURE__ */ __name(() => syncBuffer, "sync"),
      end: /* @__PURE__ */ __name(() => endBuffer, "end"),
      copyData,
      copyDone: /* @__PURE__ */ __name(() => copyDoneBuffer, "copyDone"),
      copyFail,
      cancel
    };
    exports.serialize = serialize;
  }
});

// ../node_modules/pg-protocol/dist/buffer-reader.js
var require_buffer_reader = __commonJS({
  "../node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var BufferReader = class {
      static {
        __name(this, "BufferReader");
      }
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = Buffer.allocUnsafe(0);
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++] !== 0) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    exports.BufferReader = BufferReader;
  }
});

// ../node_modules/pg-protocol/dist/parser.js
var require_parser = __commonJS({
  "../node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var LATEINIT_LENGTH = -1;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        const { reader } = this;
        reader.setBuffer(offset, bytes);
        let message;
        switch (code) {
          case 50:
            message = messages_1.bindComplete;
            break;
          case 49:
            message = messages_1.parseComplete;
            break;
          case 51:
            message = messages_1.closeComplete;
            break;
          case 110:
            message = messages_1.noData;
            break;
          case 115:
            message = messages_1.portalSuspended;
            break;
          case 99:
            message = messages_1.copyDone;
            break;
          case 87:
            message = messages_1.replicationStart;
            break;
          case 73:
            message = messages_1.emptyQuery;
            break;
          case 68:
            message = parseDataRowMessage(reader);
            break;
          case 67:
            message = parseCommandCompleteMessage(reader);
            break;
          case 90:
            message = parseReadyForQueryMessage(reader);
            break;
          case 65:
            message = parseNotificationMessage(reader);
            break;
          case 82:
            message = parseAuthenticationResponse(reader, length);
            break;
          case 83:
            message = parseParameterStatusMessage(reader);
            break;
          case 75:
            message = parseBackendKeyData(reader);
            break;
          case 69:
            message = parseErrorMessage(reader, "error");
            break;
          case 78:
            message = parseErrorMessage(reader, "notice");
            break;
          case 84:
            message = parseRowDescriptionMessage(reader);
            break;
          case 116:
            message = parseParameterDescriptionMessage(reader);
            break;
          case 71:
            message = parseCopyInMessage(reader);
            break;
          case 72:
            message = parseCopyOutMessage(reader);
            break;
          case 100:
            message = parseCopyData(reader, length);
            break;
          default:
            return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
        }
        reader.setBuffer(0, emptyBuffer);
        message.length = length;
        return message;
      }
    };
    exports.Parser = Parser;
    var parseReadyForQueryMessage = /* @__PURE__ */ __name((reader) => {
      const status = reader.string(1);
      return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
    }, "parseReadyForQueryMessage");
    var parseCommandCompleteMessage = /* @__PURE__ */ __name((reader) => {
      const text = reader.cstring();
      return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
    }, "parseCommandCompleteMessage");
    var parseCopyData = /* @__PURE__ */ __name((reader, length) => {
      const chunk = reader.bytes(length - 4);
      return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
    }, "parseCopyData");
    var parseCopyInMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyInResponse"), "parseCopyInMessage");
    var parseCopyOutMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyOutResponse"), "parseCopyOutMessage");
    var parseCopyMessage = /* @__PURE__ */ __name((reader, messageName) => {
      const isBinary = reader.byte() !== 0;
      const columnCount = reader.int16();
      const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
      for (let i = 0; i < columnCount; i++) {
        message.columnTypes[i] = reader.int16();
      }
      return message;
    }, "parseCopyMessage");
    var parseNotificationMessage = /* @__PURE__ */ __name((reader) => {
      const processId = reader.int32();
      const channel2 = reader.cstring();
      const payload = reader.cstring();
      return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel2, payload);
    }, "parseNotificationMessage");
    var parseRowDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        message.fields[i] = parseField(reader);
      }
      return message;
    }, "parseRowDescriptionMessage");
    var parseField = /* @__PURE__ */ __name((reader) => {
      const name = reader.cstring();
      const tableID = reader.uint32();
      const columnID = reader.int16();
      const dataTypeID = reader.uint32();
      const dataTypeSize = reader.int16();
      const dataTypeModifier = reader.int32();
      const mode = reader.int16() === 0 ? "text" : "binary";
      return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
    }, "parseField");
    var parseParameterDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const parameterCount = reader.int16();
      const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
      for (let i = 0; i < parameterCount; i++) {
        message.dataTypeIDs[i] = reader.int32();
      }
      return message;
    }, "parseParameterDescriptionMessage");
    var parseDataRowMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const fields = new Array(fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        const len = reader.int32();
        fields[i] = len === -1 ? null : reader.string(len);
      }
      return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
    }, "parseDataRowMessage");
    var parseParameterStatusMessage = /* @__PURE__ */ __name((reader) => {
      const name = reader.cstring();
      const value = reader.cstring();
      return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
    }, "parseParameterStatusMessage");
    var parseBackendKeyData = /* @__PURE__ */ __name((reader) => {
      const processID = reader.int32();
      const secretKey = reader.int32();
      return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
    }, "parseBackendKeyData");
    var parseAuthenticationResponse = /* @__PURE__ */ __name((reader, length) => {
      const code = reader.int32();
      const message = {
        name: "authenticationOk",
        length
      };
      switch (code) {
        case 0:
          break;
        case 3:
          if (message.length === 8) {
            message.name = "authenticationCleartextPassword";
          }
          break;
        case 5:
          if (message.length === 12) {
            message.name = "authenticationMD5Password";
            const salt = reader.bytes(4);
            return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
          }
          break;
        case 10:
          {
            message.name = "authenticationSASL";
            message.mechanisms = [];
            let mechanism;
            do {
              mechanism = reader.cstring();
              if (mechanism) {
                message.mechanisms.push(mechanism);
              }
            } while (mechanism);
          }
          break;
        case 11:
          message.name = "authenticationSASLContinue";
          message.data = reader.string(length - 8);
          break;
        case 12:
          message.name = "authenticationSASLFinal";
          message.data = reader.string(length - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + code);
      }
      return message;
    }, "parseAuthenticationResponse");
    var parseErrorMessage = /* @__PURE__ */ __name((reader, name) => {
      const fields = {};
      let fieldType = reader.string(1);
      while (fieldType !== "\0") {
        fields[fieldType] = reader.cstring();
        fieldType = reader.string(1);
      }
      const messageValue = fields.M;
      const message = name === "notice" ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
      message.severity = fields.S;
      message.code = fields.C;
      message.detail = fields.D;
      message.hint = fields.H;
      message.position = fields.P;
      message.internalPosition = fields.p;
      message.internalQuery = fields.q;
      message.where = fields.W;
      message.schema = fields.s;
      message.table = fields.t;
      message.column = fields.c;
      message.dataType = fields.d;
      message.constraint = fields.n;
      message.file = fields.F;
      message.line = fields.L;
      message.routine = fields.R;
      return message;
    }, "parseErrorMessage");
  }
});

// ../node_modules/pg-protocol/dist/index.js
var require_dist = __commonJS({
  "../node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return messages_1.DatabaseError;
    }, "get") });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return serializer_1.serialize;
    }, "get") });
    var parser_1 = require_parser();
    function parse(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    __name(parse, "parse");
    exports.parse = parse;
  }
});

// node-built-in-modules:net
import libDefault6 from "net";
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault6;
  }
});

// node-built-in-modules:tls
import libDefault7 from "tls";
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault7;
  }
});

// ../node_modules/pg-cloudflare/dist/index.js
var require_dist2 = __commonJS({
  "../node_modules/pg-cloudflare/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloudflareSocket = void 0;
    var events_1 = require_events();
    var CloudflareSocket = class extends events_1.EventEmitter {
      static {
        __name(this, "CloudflareSocket");
      }
      constructor(ssl) {
        super();
        this.ssl = ssl;
        this.writable = false;
        this.destroyed = false;
        this._upgrading = false;
        this._upgraded = false;
        this._cfSocket = null;
        this._cfWriter = null;
        this._cfReader = null;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      async connect(port, host, connectListener) {
        try {
          log3("connecting");
          if (connectListener)
            this.once("connect", connectListener);
          const options = this.ssl ? { secureTransport: "starttls" } : {};
          const mod = await import("cloudflare:sockets");
          const connect = mod.connect;
          this._cfSocket = connect(`${host}:${port}`, options);
          this._cfWriter = this._cfSocket.writable.getWriter();
          this._addClosedHandler();
          this._cfReader = this._cfSocket.readable.getReader();
          if (this.ssl) {
            this._listenOnce().catch((e) => this.emit("error", e));
          } else {
            this._listen().catch((e) => this.emit("error", e));
          }
          await this._cfWriter.ready;
          log3("socket ready");
          this.writable = true;
          this.emit("connect");
          return this;
        } catch (e) {
          this.emit("error", e);
        }
      }
      async _listen() {
        while (true) {
          log3("awaiting receive from CF socket");
          const { done, value } = await this._cfReader.read();
          log3("CF socket received:", done, value);
          if (done) {
            log3("done");
            break;
          }
          this.emit("data", Buffer.from(value));
        }
      }
      async _listenOnce() {
        log3("awaiting first receive from CF socket");
        const { done, value } = await this._cfReader.read();
        log3("First CF socket received:", done, value);
        this.emit("data", Buffer.from(value));
      }
      write(data, encoding = "utf8", callback = () => {
      }) {
        if (data.length === 0)
          return callback();
        if (typeof data === "string")
          data = Buffer.from(data, encoding);
        log3("sending data direct:", data);
        this._cfWriter.write(data).then(() => {
          log3("data sent");
          callback();
        }, (err) => {
          log3("send error", err);
          callback(err);
        });
        return true;
      }
      end(data = Buffer.alloc(0), encoding = "utf8", callback = () => {
      }) {
        log3("ending CF socket");
        this.write(data, encoding, (err) => {
          this._cfSocket.close();
          if (callback)
            callback(err);
        });
        return this;
      }
      destroy(reason) {
        log3("destroying CF socket", reason);
        this.destroyed = true;
        return this.end();
      }
      startTls(options) {
        if (this._upgraded) {
          this.emit("error", "Cannot call `startTls()` more than once on a socket");
          return;
        }
        this._cfWriter.releaseLock();
        this._cfReader.releaseLock();
        this._upgrading = true;
        this._cfSocket = this._cfSocket.startTls(options);
        this._cfWriter = this._cfSocket.writable.getWriter();
        this._cfReader = this._cfSocket.readable.getReader();
        this._addClosedHandler();
        this._listen().catch((e) => this.emit("error", e));
      }
      _addClosedHandler() {
        this._cfSocket.closed.then(() => {
          if (!this._upgrading) {
            log3("CF socket closed");
            this._cfSocket = null;
            this.emit("close");
          } else {
            this._upgrading = false;
            this._upgraded = true;
          }
        }).catch((e) => this.emit("error", e));
      }
    };
    exports.CloudflareSocket = CloudflareSocket;
    var debug3 = false;
    function dump(data) {
      if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        const buf = data instanceof Uint8Array ? Buffer.from(data) : Buffer.from(data);
        const hex = buf.toString("hex");
        const str = new TextDecoder().decode(data);
        return `
>>> STR: "${str.replace(/\n/g, "\\n")}"
>>> HEX: ${hex}
`;
      } else {
        return data;
      }
    }
    __name(dump, "dump");
    function log3(...args) {
      debug3 && console.log(...args.map(dump));
    }
    __name(log3, "log");
  }
});

// ../node_modules/pg/lib/stream.js
var require_stream = __commonJS({
  "../node_modules/pg/lib/stream.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { getStream, getSecureStream } = getStreamFuncs();
    module.exports = {
      /**
       * Get a socket stream compatible with the current runtime environment.
       * @returns {Duplex}
       */
      getStream,
      /**
       * Get a TLS secured socket, compatible with the current environment,
       * using the socket and other settings given in `options`.
       * @returns {Duplex}
       */
      getSecureStream
    };
    function getNodejsStreamFuncs() {
      function getStream2(ssl) {
        const net = require_net();
        return new net.Socket();
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        const tls = require_tls();
        return tls.connect(options);
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    function getCloudflareStreamFuncs() {
      function getStream2(ssl) {
        const { CloudflareSocket } = require_dist2();
        return new CloudflareSocket(ssl);
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        options.socket.startTls(options);
        return options.socket;
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    function isCloudflareRuntime() {
      if (typeof navigator === "object" && navigator !== null && true) {
        return true;
      }
      if (typeof Response === "function") {
        const resp = new Response(null, { cf: { thing: true } });
        if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
          return true;
        }
      }
      return false;
    }
    __name(isCloudflareRuntime, "isCloudflareRuntime");
    function getStreamFuncs() {
      if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
      }
      return getNodejsStreamFuncs();
    }
    __name(getStreamFuncs, "getStreamFuncs");
  }
});

// ../node_modules/pg/lib/connection.js
var require_connection = __commonJS({
  "../node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var { parse, serialize } = require_dist();
    var { getStream, getSecureStream } = require_stream();
    var flushBuffer = serialize.flush();
    var syncBuffer = serialize.sync();
    var endBuffer = serialize.end();
    var Connection2 = class extends EventEmitter2 {
      static {
        __name(this, "Connection");
      }
      constructor(config2) {
        super();
        config2 = config2 || {};
        this.stream = config2.stream || getStream(config2.ssl);
        if (typeof this.stream === "function") {
          this.stream = this.stream(config2);
        }
        this._keepAlive = config2.keepAlive;
        this._keepAliveInitialDelayMillis = config2.keepAliveInitialDelayMillis;
        this.parsedStatements = {};
        this.ssl = config2.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        const self = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self._keepAlive) {
            self.stream.setKeepAlive(true, self._keepAliveInitialDelayMillis);
          }
          self.emit("connect");
        });
        const reportStreamError = /* @__PURE__ */ __name(function(error3) {
          if (self._ending && (error3.code === "ECONNRESET" || error3.code === "EPIPE")) {
            return;
          }
          self.emit("error", error3);
        }, "reportStreamError");
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        this.stream.once("data", function(buffer) {
          const responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self.stream.end();
              return self.emit("error", new Error("The server does not support SSL connections"));
            default:
              self.stream.end();
              return self.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          const options = {
            socket: self.stream
          };
          if (self.ssl !== true) {
            Object.assign(options, self.ssl);
            if ("key" in self.ssl) {
              options.key = self.ssl.key;
            }
          }
          const net = require_net();
          if (net.isIP && net.isIP(host) === 0) {
            options.servername = host;
          }
          try {
            self.stream = getSecureStream(options);
          } catch (err) {
            return self.emit("error", err);
          }
          self.attachListeners(self.stream);
          self.stream.on("error", reportStreamError);
          self.emit("sslconnect");
        });
      }
      attachListeners(stream) {
        parse(stream, (msg) => {
          const eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize.requestSsl());
      }
      startup(config2) {
        this.stream.write(serialize.startup(config2));
      }
      cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize.query(text));
      }
      // send parse message
      parse(query) {
        this._send(serialize.parse(query));
      }
      // send bind message
      bind(config2) {
        this._send(serialize.bind(config2));
      }
      // send execute message
      execute(config2) {
        this._send(serialize.execute(config2));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize.close(msg));
      }
      describe(msg) {
        this._send(serialize.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
      }
    };
    module.exports = Connection2;
  }
});

// node-built-in-modules:path
import libDefault8 from "path";
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault8;
  }
});

// node-built-in-modules:stream
import libDefault9 from "stream";
var require_stream2 = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault9;
  }
});

// node-built-in-modules:string_decoder
import libDefault10 from "string_decoder";
var require_string_decoder = __commonJS({
  "node-built-in-modules:string_decoder"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault10;
  }
});

// ../node_modules/split2/index.js
var require_split2 = __commonJS({
  "../node_modules/split2/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { Transform } = require_stream2();
    var { StringDecoder } = require_string_decoder();
    var kLast = /* @__PURE__ */ Symbol("last");
    var kDecoder = /* @__PURE__ */ Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error3) {
          return cb(error3);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    __name(transform, "transform");
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error3) {
          return cb(error3);
        }
      }
      cb();
    }
    __name(flush, "flush");
    function push(self, val) {
      if (val !== void 0) {
        self.push(val);
      }
    }
    __name(push, "push");
    function noop(incoming) {
      return incoming;
    }
    __name(noop, "noop");
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    __name(split, "split");
    module.exports = split;
  }
});

// ../node_modules/pgpass/lib/helper.js
var require_helper = __commonJS({
  "../node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var Stream = require_stream2().Stream;
    var split = require_split2();
    var util = require_util();
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG2 = 56;
    var S_IRWXO2 = 7;
    var S_IFMT2 = 61440;
    var S_IFREG2 = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT2) == S_IFREG2;
    }
    __name(isRegFile, "isRegFile");
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn3() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    __name(warn3, "warn");
    Object.defineProperty(module.exports, "isWin", {
      get: /* @__PURE__ */ __name(function() {
        return isWin;
      }, "get"),
      set: /* @__PURE__ */ __name(function(val) {
        isWin = val;
      }, "set")
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env2 = rawEnv || process.env;
      var file = env2.PGPASSFILE || (isWin ? path.join(env2.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env2.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn3('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG2 | S_IRWXO2)) {
        warn3('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      __name(onLine, "onLine");
      var onEnd = /* @__PURE__ */ __name(function() {
        stream.destroy();
        cb(pass);
      }, "onEnd");
      var onErr = /* @__PURE__ */ __name(function(err) {
        stream.destroy();
        warn3("WARNING: error on reading file: %s", err);
        cb(void 0);
      }, "onErr");
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = /* @__PURE__ */ __name(function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      }, "addToObj");
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});

// ../node_modules/pgpass/lib/index.js
var require_lib = __commonJS({
  "../node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var fs = require_fs();
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs.stat(file, function(err, stat3) {
        if (err || !helper.usePgPass(stat3, file)) {
          return cb(void 0);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});

// ../node_modules/pg/lib/client.js
var require_client = __commonJS({
  "../node_modules/pg/lib/client.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var utils = require_utils();
    var nodeUtils = require_util();
    var sasl = require_sasl();
    var TypeOverrides2 = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query2 = require_query();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var crypto = require_utils2();
    var activeQueryDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.activeQuery is deprecated and will be removed in pg@9.0"
    );
    var queryQueueDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.queryQueue is deprecated and will be removed in pg@9.0."
    );
    var pgPassDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."
    );
    var byoPromiseDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."
    );
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    function coerceNumberOrDefault(value, defaultValue) {
      if (typeof value === "number") {
        return Number.isFinite(value) ? value : defaultValue;
      }
      if (typeof value === "string" && value.trim() !== "") {
        const n = Number(value);
        return Number.isFinite(n) ? n : defaultValue;
      }
      return defaultValue;
    }
    __name(coerceNumberOrDefault, "coerceNumberOrDefault");
    var Client2 = class extends EventEmitter2 {
      static {
        __name(this, "Client");
      }
      constructor(config2) {
        super();
        this.connectionParameters = new ConnectionParameters(config2);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config2 || {};
        if (c.Promise) {
          byoPromiseDeprecationNotice();
        }
        this._Promise = c.Promise || global.Promise;
        this._types = new TypeOverrides2(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this._activeQuery = null;
        this._txStatus = null;
        this.enableChannelBinding = Boolean(c.enableChannelBinding);
        this.scramMaxIterations = coerceNumberOrDefault(c.scramMaxIterations, sasl.DEFAULT_MAX_SCRAM_ITERATIONS);
        this.connection = c.connection || new Connection2({
          stream: c.stream,
          ssl: this.connectionParameters.ssl,
          keepAlive: c.keepAlive || false,
          keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this._queryQueue = [];
        this.binary = c.binary || defaults2.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
      }
      get activeQuery() {
        activeQueryDeprecationNotice();
        return this._activeQuery;
      }
      set activeQuery(val) {
        activeQueryDeprecationNotice();
        this._activeQuery = val;
      }
      _getActiveQuery() {
        return this._activeQuery;
      }
      _errorAllQueries(err) {
        const enqueueError = /* @__PURE__ */ __name((query) => {
          process.nextTick(() => {
            query.handleError(err, this.connection);
          });
        }, "enqueueError");
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
          enqueueError(activeQuery);
          this._activeQuery = null;
        }
        this._queryQueue.forEach(enqueueError);
        this._queryQueue.length = 0;
      }
      _connect(callback) {
        const self = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
          if (this.connectionTimeoutHandle.unref) {
            this.connectionTimeoutHandle.unref();
          }
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self.ssl) {
            con.requestSsl();
          } else {
            con.startup(self.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error3 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error3);
          this._ended = true;
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error3);
              } else {
                this._handleErrorEvent(error3);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error3);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve, reject) => {
          this._connect((error3) => {
            if (error3) {
              reject(error3);
            } else {
              resolve(this);
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      _getPassword(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((pass) => {
            if (pass !== void 0) {
              if (typeof pass !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          try {
            const pgPass = require_lib();
            pgPass(this.connectionParameters, (pass) => {
              if (void 0 !== pass) {
                pgPassDeprecationNotice();
                this.connectionParameters.password = this.password = pass;
              }
              cb();
            });
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._getPassword(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._getPassword(async () => {
          try {
            const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
            this.connection.password(hashedPassword);
          } catch (e) {
            this.emit("error", e);
          }
        });
      }
      _handleAuthSASL(msg) {
        this._getPassword(() => {
          try {
            this.saslSession = sasl.startSession(
              msg.mechanisms,
              this.enableChannelBinding && this.connection.stream,
              this.scramMaxIterations
            );
            this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
          } catch (err) {
            this.connection.emit("error", err);
          }
        });
      }
      async _handleAuthSASLContinue(msg) {
        try {
          await sasl.continueSession(
            this.saslSession,
            this.password,
            msg.data,
            this.enableChannelBinding && this.connection.stream
          );
          this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleAuthSASLFinal(msg) {
        try {
          sasl.finalizeSession(this.saslSession, msg.data);
          this.saslSession = null;
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const activeQuery = this._getActiveQuery();
        this._activeQuery = null;
        this._txStatus = msg?.status ?? null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      // if we receive an error event or error message
      // during the connection process we handle it here
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      // if we're connected and we receive an error event from the connection
      // this means the socket is dead - do a hard abort of all queries and emit
      // the socket error on the client as well
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      // handle error messages from the postgres backend
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this._getActiveQuery();
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this._activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected rowDescription message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected dataRow message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected portalSuspended message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected emptyQuery message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected commandComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete() {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected parseComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        if (activeQuery.name) {
          this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected copyInResponse message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected copyData message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        const params = this.connectionParameters;
        const data = {
          user: params.user,
          database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
          data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query) {
        if (client.activeQuery === query) {
          const con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client._queryQueue.indexOf(query) !== -1) {
          client._queryQueue.splice(client._queryQueue.indexOf(query), 1);
        }
      }
      setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
      }
      getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
      }
      // escapeIdentifier and escapeLiteral moved to utility functions & exported
      // on PG
      // re-exported here for backwards compatibility
      escapeIdentifier(str) {
        return utils.escapeIdentifier(str);
      }
      escapeLiteral(str) {
        return utils.escapeLiteral(str);
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this._activeQuery = this._queryQueue.shift();
          const activeQuery = this._getActiveQuery();
          if (activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this._activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config2, values, callback) {
        let query;
        let result;
        if (config2 == null) {
          throw new TypeError("Client was passed a null or undefined query");
        }
        if (typeof config2.submit === "function") {
          result = query = config2;
          if (!query.callback) {
            if (typeof values === "function") {
              query.callback = values;
            } else if (callback) {
              query.callback = callback;
            }
          }
        } else {
          query = new Query2(config2, values, callback);
          if (!query.callback) {
            result = new this._Promise((resolve, reject) => {
              query.callback = (err, res) => err ? reject(err) : resolve(res);
            }).catch((err) => {
              Error.captureStackTrace(err);
              throw err;
            });
          } else if (typeof query.callback !== "function") {
            throw new TypeError("callback is not a function");
          }
        }
        const readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        if (readTimeout) {
          const queryCallback = query.callback || (() => {
          });
          const readTimeoutTimer = setTimeout(() => {
            const error3 = new Error("Query read timeout");
            process.nextTick(() => {
              query.handleError(error3, this.connection);
            });
            queryCallback(error3);
            query.callback = () => {
            };
            const index = this._queryQueue.indexOf(query);
            if (index > -1) {
              this._queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query.binary) {
          query.binary = true;
        }
        if (query._result && !query._result._types) {
          query._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._queryQueue.length > 0) {
          queryQueueLengthDeprecationNotice();
        }
        this._queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      getTransactionStatus() {
        return this._txStatus;
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting || this._ended) {
          if (cb) {
            cb();
            return;
          } else {
            return this._Promise.resolve();
          }
        }
        if (this._getActiveQuery() || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve) => {
            this.connection.once("end", resolve);
          });
        }
      }
      get queryQueue() {
        queryQueueDeprecationNotice();
        return this._queryQueue;
      }
    };
    Client2.Query = Query2;
    module.exports = Client2;
  }
});

// ../node_modules/pg-pool/index.js
var require_pg_pool = __commonJS({
  "../node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var NOOP = /* @__PURE__ */ __name(function() {
    }, "NOOP");
    var removeWhere = /* @__PURE__ */ __name((list, predicate) => {
      const i = list.findIndex(predicate);
      return i === -1 ? void 0 : list.splice(i, 1)[0];
    }, "removeWhere");
    var IdleItem = class {
      static {
        __name(this, "IdleItem");
      }
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    var PendingItem = class {
      static {
        __name(this, "PendingItem");
      }
      constructor(callback) {
        this.callback = callback;
      }
    };
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    __name(throwOnDoubleRelease, "throwOnDoubleRelease");
    function promisify(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = /* @__PURE__ */ __name(function(err, client) {
        err ? rej(err) : res(client);
      }, "cb");
      const result = new Promise2(function(resolve, reject) {
        res = resolve;
        rej = reject;
      }).catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
      return { callback: cb, result };
    }
    __name(promisify, "promisify");
    function makeIdleListener(pool, client) {
      return /* @__PURE__ */ __name(function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool.log("additional client error after disconnection due to error", err);
        });
        pool._remove(client);
        pool.emit("error", err, client);
      }, "idleListener");
    }
    __name(makeIdleListener, "makeIdleListener");
    var Pool2 = class extends EventEmitter2 {
      static {
        __name(this, "Pool");
      }
      constructor(options, Client2) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client2 || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _promiseTry(f) {
        const Promise2 = this.Promise;
        if (typeof Promise2.try === "function") {
          return Promise2.try(f);
        }
        return new Promise2((resolve) => resolve(f()));
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _isAboveMin() {
        return this._clients.length > this.options.min;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client, callback) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c) => c !== client);
        const context2 = this;
        client.end(() => {
          context2.emit("remove", client);
          if (typeof callback === "function") {
            callback();
          }
        });
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = /* @__PURE__ */ __name((err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          }, "queueCallback");
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          if (tid.unref) {
            tid.unref();
          }
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            if (client.connection) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.connection.stream.destroy();
            } else if (!client.isConnected()) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.end();
            }
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c) => c !== client);
            if (timeoutHit) {
              err = new Error("Connection terminated due to connection timeout", { cause: err });
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.onConnect) {
              this._promiseTry(() => this.options.onConnect(client)).then(
                () => {
                  this._afterConnect(client, pendingItem, idleListener);
                },
                (hookErr) => {
                  this._clients = this._clients.filter((c) => c !== client);
                  client.end(() => {
                    this._pulseQueue();
                    if (!pendingItem.timedOut) {
                      pendingItem.callback(hookErr, void 0, NOOP);
                    }
                  });
                }
              );
              return;
            }
            return this._afterConnect(client, pendingItem, idleListener);
          }
        });
      }
      _afterConnect(client, pendingItem, idleListener) {
        if (this.options.maxLifetimeSeconds !== 0) {
          const maxLifetimeTimeout = setTimeout(() => {
            this.log("ending client due to expired lifetime");
            this._expired.add(client);
            const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
            if (idleIndex !== -1) {
              this._acquireClient(
                client,
                new PendingItem((err, client2, clientRelease) => clientRelease()),
                idleListener,
                false
              );
            }
          }, this.options.maxLifetimeSeconds * 1e3);
          maxLifetimeTimeout.unref();
          client.once("end", () => clearTimeout(maxLifetimeTimeout));
        }
        return this._acquireClient(client, pendingItem, idleListener, true);
      }
      // acquire a client for a pending work item
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      // returns a function that wraps _release and throws if called more than once
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      // release a client back to the poll, include an error
      // to remove it from the pool
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit("release", err, client);
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          return this._remove(client, this._pulseQueue.bind(this));
        }
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
          tid = setTimeout(() => {
            if (this._isAboveMin()) {
              this.log("remove idle client");
              this._remove(client, this._pulseQueue.bind(this));
            }
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = /* @__PURE__ */ __name((err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          }, "onError");
          client.once("error", onError);
          this.log("dispatching query");
          try {
            client.query(text, values, (err2, res) => {
              this.log("query dispatched");
              client.removeListener("error", onError);
              if (clientReleased) {
                return;
              }
              clientReleased = true;
              client.release(err2);
              if (err2) {
                return cb(err2);
              }
              return cb(void 0, res);
            });
          } catch (err2) {
            client.release(err2);
            return cb(err2);
          }
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    module.exports = Pool2;
  }
});

// ../node_modules/pg/lib/native/query.js
var require_query2 = __commonJS({
  "../node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util();
    var utils = require_utils();
    var NativeQuery = module.exports = function(config2, values, callback) {
      EventEmitter2.call(this);
      config2 = utils.normalizeQueryConfig(config2, values, callback);
      this.text = config2.text;
      this.values = config2.values;
      this.name = config2.name;
      this.queryMode = config2.queryMode;
      this.callback = config2.callback;
      this.state = "new";
      this._arrayMode = config2.rowMode === "array";
      this._emitRowEvents = false;
      this.on(
        "newListener",
        function(event) {
          if (event === "row") this._emitRowEvents = true;
        }.bind(this)
      );
    };
    util.inherits(NativeQuery, EventEmitter2);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      const fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (const key in fields) {
          const normalizedFieldName = errorFieldMap[key] || key;
          err[normalizedFieldName] = fields[key];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise) return this._promise;
      this._promise = new Promise(
        function(resolve, reject) {
          this._once("end", resolve);
          this._once("error", reject);
        }.bind(this)
      );
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      const self = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      let after = /* @__PURE__ */ __name(function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self.emit("_done");
        });
        if (err) {
          return self.handleError(err);
        }
        if (self._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i) => {
              rowOfRows.forEach((row) => {
                self.emit("row", row, results[i]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self.emit("row", row, results);
            });
          }
        }
        self.state = "end";
        self.emit("end", results);
        if (self.callback) {
          self.callback(null, results);
        }
      }, "after");
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        const values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err) return after(err);
          client.namedQueries[self.name] = self.text;
          return self.native.execute(self.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else if (this.queryMode === "extended") {
        client.native.query(this.text, [], after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});

// ../node_modules/pg/lib/native/client.js
var require_client2 = __commonJS({
  "../node_modules/pg/lib/native/client.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeUtils = require_util();
    var Native;
    try {
      Native = __require("pg-native");
    } catch (e) {
      throw e;
    }
    var TypeOverrides2 = require_type_overrides();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util();
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    var Client2 = module.exports = function(config2) {
      EventEmitter2.call(this);
      config2 = config2 || {};
      this._Promise = config2.Promise || global.Promise;
      this._types = new TypeOverrides2(config2.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      const cp3 = this.connectionParameters = new ConnectionParameters(config2);
      if (config2.nativeConnectionString) cp3.nativeConnectionString = config2.nativeConnectionString;
      this.user = cp3.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp3.password
      });
      this.database = cp3.database;
      this.host = cp3.host;
      this.port = cp3.port;
      this.namedQueries = {};
    };
    Client2.Query = NativeQuery;
    util.inherits(Client2, EventEmitter2);
    Client2.prototype._errorAllQueries = function(err) {
      const enqueueError = /* @__PURE__ */ __name((query) => {
        process.nextTick(() => {
          query.native = this.native;
          query.handleError(err);
        });
      }, "enqueueError");
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client2.prototype._connect = function(cb) {
      const self = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self.connectionParameters.nativeConnectionString) conString = self.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self.native.connect(conString, function(err2) {
          if (err2) {
            self.native.end();
            return cb(err2);
          }
          self._connected = true;
          self.native.on("error", function(err3) {
            self._queryable = false;
            self._errorAllQueries(err3);
            self.emit("error", err3);
          });
          self.native.on("notification", function(msg) {
            self.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self.emit("connect");
          self._pulseQueryQueue(true);
          cb(null, this);
        });
      });
    };
    Client2.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error3) => {
          if (error3) {
            reject(error3);
          } else {
            resolve(this);
          }
        });
      });
    };
    Client2.prototype.query = function(config2, values, callback) {
      let query;
      let result;
      let readTimeout;
      let readTimeoutTimer;
      let queryCallback;
      if (config2 === null || config2 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config2.submit === "function") {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        result = query = config2;
        if (typeof values === "function") {
          config2.callback = values;
        }
      } else {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config2, values, callback);
        if (!query.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve, reject) => {
            resolveOut = resolve;
            rejectOut = reject;
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
          query.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query.callback || (() => {
        });
        readTimeoutTimer = setTimeout(() => {
          const error3 = new Error("Query read timeout");
          process.nextTick(() => {
            query.handleError(error3, this.connection);
          });
          queryCallback(error3);
          query.callback = () => {
          };
          const index = this._queryQueue.indexOf(query);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
      }
      this._queryQueue.push(query);
      this._pulseQueryQueue();
      return result;
    };
    Client2.prototype.end = function(cb) {
      const self = this;
      this._ending = true;
      if (this._connecting && !this._connected) {
        this.once("connect", () => {
          this.end(() => {
          });
        });
      }
      let result;
      if (!cb) {
        result = new this._Promise(function(resolve, reject) {
          cb = /* @__PURE__ */ __name((err) => err ? reject(err) : resolve(), "cb");
        });
      }
      this.native.end(function() {
        self._connected = false;
        self._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self.emit("end");
          if (cb) cb();
        });
      });
      return result;
    };
    Client2.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client2.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      const query = this._queryQueue.shift();
      if (!query) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query;
      query.submit(this);
      const self = this;
      query.once("_done", function() {
        self._pulseQueryQueue();
      });
    };
    Client2.prototype.cancel = function(query) {
      if (this._activeQuery === query) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
      }
    };
    Client2.prototype.ref = function() {
    };
    Client2.prototype.unref = function() {
    };
    Client2.prototype.setTypeParser = function(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    };
    Client2.prototype.getTypeParser = function(oid, format) {
      return this._types.getTypeParser(oid, format);
    };
    Client2.prototype.isConnected = function() {
      return this._connected;
    };
    Client2.prototype.getTransactionStatus = function() {
      return this.native.getTransactionStatus();
    };
  }
});

// ../node_modules/pg/lib/native/index.js
var require_native = __commonJS({
  "../node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_client2();
  }
});

// ../node_modules/pg/lib/index.js
var require_lib2 = __commonJS({
  "../node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Client2 = require_client();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var Result2 = require_result();
    var utils = require_utils();
    var Pool2 = require_pg_pool();
    var TypeOverrides2 = require_type_overrides();
    var { DatabaseError: DatabaseError2 } = require_dist();
    var { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = require_utils();
    var poolFactory = /* @__PURE__ */ __name((Client3) => {
      return class BoundPool extends Pool2 {
        static {
          __name(this, "BoundPool");
        }
        constructor(options) {
          super(options, Client3);
        }
      };
    }, "poolFactory");
    var PG = /* @__PURE__ */ __name(function(clientConstructor2) {
      this.defaults = defaults2;
      this.Client = clientConstructor2;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection2;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result2;
      this.utils = utils;
    }, "PG");
    var clientConstructor = Client2;
    var forceNative = false;
    try {
      forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
    } catch {
    }
    if (forceNative) {
      clientConstructor = require_native();
    }
    module.exports = new PG(clientConstructor);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        let native = null;
        try {
          native = new PG(require_native());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native
        });
        return native;
      }
    });
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/os/constants.mjs
var UV_UDP_REUSEADDR, dlopen2, errno, signals, priority;
var init_constants2 = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/os/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_UDP_REUSEADDR = 4;
    dlopen2 = {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    };
    errno = {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    };
    signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31
    };
    priority = {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    };
  }
});

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/os.mjs
var constants, NUM_CPUS, availableParallelism, arch2, machine, endianness, cpus, getPriority, setPriority, homedir, tmpdir, devNull, freemem, totalmem, loadavg, uptime2, hostname, networkInterfaces, platform2, type, release2, version2, userInfo, EOL, os_default;
var init_os = __esm({
  "../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants2();
    constants = {
      UV_UDP_REUSEADDR,
      dlopen: dlopen2,
      errno,
      signals,
      priority
    };
    NUM_CPUS = 8;
    availableParallelism = /* @__PURE__ */ __name(() => NUM_CPUS, "availableParallelism");
    arch2 = /* @__PURE__ */ __name(() => "", "arch");
    machine = /* @__PURE__ */ __name(() => "", "machine");
    endianness = /* @__PURE__ */ __name(() => "LE", "endianness");
    cpus = /* @__PURE__ */ __name(() => {
      const info3 = {
        model: "",
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      };
      return Array.from({ length: NUM_CPUS }, () => info3);
    }, "cpus");
    getPriority = /* @__PURE__ */ __name(() => 0, "getPriority");
    setPriority = /* @__PURE__ */ notImplemented("os.setPriority");
    homedir = /* @__PURE__ */ __name(() => "/", "homedir");
    tmpdir = /* @__PURE__ */ __name(() => "/tmp", "tmpdir");
    devNull = "/dev/null";
    freemem = /* @__PURE__ */ __name(() => 0, "freemem");
    totalmem = /* @__PURE__ */ __name(() => 0, "totalmem");
    loadavg = /* @__PURE__ */ __name(() => [
      0,
      0,
      0
    ], "loadavg");
    uptime2 = /* @__PURE__ */ __name(() => 0, "uptime");
    hostname = /* @__PURE__ */ __name(() => "", "hostname");
    networkInterfaces = /* @__PURE__ */ __name(() => {
      return { lo0: [
        {
          address: "127.0.0.1",
          netmask: "255.0.0.0",
          family: "IPv4",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "127.0.0.1/8"
        },
        {
          address: "::1",
          netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "::1/128",
          scopeid: 0
        },
        {
          address: "fe80::1",
          netmask: "ffff:ffff:ffff:ffff::",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "fe80::1/64",
          scopeid: 1
        }
      ] };
    }, "networkInterfaces");
    platform2 = /* @__PURE__ */ __name(() => "linux", "platform");
    type = /* @__PURE__ */ __name(() => "Linux", "type");
    release2 = /* @__PURE__ */ __name(() => "", "release");
    version2 = /* @__PURE__ */ __name(() => "", "version");
    userInfo = /* @__PURE__ */ __name((opts) => {
      const encode = /* @__PURE__ */ __name((str) => {
        if (opts?.encoding) {
          const buff = Buffer.from(str);
          return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
        }
        return str;
      }, "encode");
      return {
        gid: 1e3,
        uid: 1e3,
        homedir: encode("/"),
        shell: encode("/bin/sh"),
        username: encode("root")
      };
    }, "userInfo");
    EOL = "\n";
    os_default = {
      arch: arch2,
      availableParallelism,
      constants,
      cpus,
      EOL,
      endianness,
      devNull,
      freemem,
      getPriority,
      homedir,
      hostname,
      loadavg,
      machine,
      networkInterfaces,
      platform: platform2,
      release: release2,
      setPriority,
      tmpdir,
      totalmem,
      type,
      uptime: uptime2,
      userInfo,
      version: version2
    };
  }
});

// node-built-in-modules:os
var require_os = __commonJS({
  "node-built-in-modules:os"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_os();
    module.exports = os_default;
  }
});

// ../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../node_modules/dotenv/lib/main.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var fs = require_fs();
    var path = require_path();
    var os = require_os();
    var crypto = require_crypto();
    var TIPS = [
      "\u25C8 encrypted .env [www.dotenvx.com]",
      "\u25C8 secrets for agents [www.dotenvx.com]",
      "\u2301 auth for agents [www.vestauth.com]",
      "\u2318 custom filepath { path: '/custom/path/.env' }",
      "\u2318 enable debugging { debug: true }",
      "\u2318 override existing { override: true }",
      "\u2318 suppress logs { quiet: true }",
      "\u2318 multiple files { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    __name(_getRandomTip, "_getRandomTip");
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    __name(parseBoolean, "parseBoolean");
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    __name(supportsAnsi, "supportsAnsi");
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    __name(dim, "dim");
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    __name(parse, "parse");
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error3) {
          if (i + 1 >= length) {
            throw error3;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    __name(_parseVault, "_parseVault");
    function _warn(message) {
      console.error(`\u26A0 ${message}`);
    }
    __name(_warn, "_warn");
    function _debug(message) {
      console.log(`\u2506 ${message}`);
    }
    __name(_debug, "_debug");
    function _log(message) {
      console.log(`\u25C7 ${message}`);
    }
    __name(_log, "_log");
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    __name(_dotenvKey, "_dotenvKey");
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error3) {
        if (error3.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error3;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    __name(_instructions, "_instructions");
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    __name(_vaultPath, "_vaultPath");
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    __name(_resolveHome, "_resolveHome");
    function _configVault(options) {
      const debug3 = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug3 || !quiet) {
        _log("loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    __name(_configVault, "_configVault");
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug3 = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug3) {
          _debug("no encoding is specified (UTF-8 is used by default)");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug3) {
            _debug(`failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug3 = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug3);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug3 || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug3) {
              _debug(`failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injected env (${keysCount}) from ${shortPaths.join(",")} ${dim(`// tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    __name(configDotenv, "configDotenv");
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`you set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    __name(config2, "config");
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error3) {
        const isRange = error3 instanceof RangeError;
        const invalidKeyLength = error3.message === "Invalid key length";
        const decryptionFailed = error3.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error3;
        }
      }
    }
    __name(decrypt, "decrypt");
    function populate(processEnv, parsed, options = {}) {
      const debug3 = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug3) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    __name(populate, "populate");
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// .wrangler/tmp/bundle-bjWShx/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-bjWShx/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../src/pricing/pricingEngine.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_fs2();
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ../node_modules/pg/esm/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_lib = __toESM(require_lib2(), 1);
var Client = import_lib.default.Client;
var Pool = import_lib.default.Pool;
var Connection = import_lib.default.Connection;
var types = import_lib.default.types;
var Query = import_lib.default.Query;
var DatabaseError = import_lib.default.DatabaseError;
var escapeIdentifier = import_lib.default.escapeIdentifier;
var escapeLiteral = import_lib.default.escapeLiteral;
var Result = import_lib.default.Result;
var TypeOverrides = import_lib.default.TypeOverrides;
var defaults = import_lib.default.defaults;
var esm_default = import_lib.default;

// ../src/pricing/pricingEngine.js
var import_dotenv = __toESM(require_main(), 1);
import_dotenv.default.config();
var _dirname;
try {
  _dirname = dirname(fileURLToPath(import.meta.url));
} catch (e) {
  _dirname = "";
}
var DEFAULT_BASE_PRICE = 59;
var MINIMUM_PRICE = 75;
function loadCatalog() {
  if (!_dirname) return [];
  const catalogPath = join(_dirname, "..", "..", "data", "items-catalog-new.json");
  if (!existsSync(catalogPath)) return [];
  const raw = readFileSync(catalogPath, "utf-8");
  return JSON.parse(raw);
}
__name(loadCatalog, "loadCatalog");
var _catalog = null;
var _serviceableZips = null;
function getCatalog() {
  if (!_catalog) {
    _catalog = loadCatalog();
  }
  return _catalog;
}
__name(getCatalog, "getCatalog");
function lookupItem(itemId, catalog) {
  const cat = catalog || getCatalog();
  return cat.find((i) => i.id === itemId) || null;
}
__name(lookupItem, "lookupItem");
function isServiceableZip(zipCode) {
  if (!_serviceableZips && _dirname) {
    const path = join(_dirname, "..", "..", "data", "serviceable_zips.json");
    if (existsSync(path)) {
      _serviceableZips = new Set(JSON.parse(readFileSync(path, "utf-8")));
    } else {
      _serviceableZips = /* @__PURE__ */ new Set();
    }
  } else if (!_serviceableZips) {
    _serviceableZips = /* @__PURE__ */ new Set();
  }
  return _serviceableZips.has(zipCode);
}
__name(isServiceableZip, "isServiceableZip");
function getConnectionString(connectionString) {
  return connectionString || process.env.DATABASE_URL || "postgresql://odoo:odoo19pass@127.0.0.1:5432/revspace_zero1";
}
__name(getConnectionString, "getConnectionString");
async function getBasePrice(zipCode, connectionString) {
  if (zipCode === "TEST_ZIP_IN_AREA") return DEFAULT_BASE_PRICE;
  if (zipCode === "TEST_ZIP_OUT_OF_AREA") return null;
  const legacyTestZips = /* @__PURE__ */ new Set(["30144", "30066", "30062", "30064", "30060", "30067", "30068", "30090", "30152"]);
  if (legacyTestZips.has(zipCode)) return DEFAULT_BASE_PRICE;
  if (_dirname && !isServiceableZip(zipCode)) {
    return null;
  }
  const connString = getConnectionString(connectionString);
  const client = new esm_default.Client(connString);
  try {
    await client.connect();
    const rs = await client.query("SELECT price_regular FROM pricing WHERE zip_code = $1 LIMIT 1", [zipCode]);
    if (rs.rows.length > 0 && rs.rows[0].price_regular != null) {
      return Number(rs.rows[0].price_regular);
    }
    const scf = String(zipCode).substring(0, 3);
    const rsScf = await client.query("SELECT AVG(price_regular) as avg_price FROM pricing WHERE CAST(zip_code AS TEXT) LIKE $1", [`${scf}%`]);
    if (rsScf.rows.length > 0 && rsScf.rows[0].avg_price != null) {
      return Number(rsScf.rows[0].avg_price);
    }
  } catch (err) {
    console.error("DB Error querying Postgres:", err.message);
  } finally {
    await client.end();
  }
  return DEFAULT_BASE_PRICE;
}
__name(getBasePrice, "getBasePrice");
async function calculateTotalPrice(items, zipCode, catalogOverride, connectionString) {
  const catalog = catalogOverride || getCatalog();
  const basePrice = await getBasePrice(zipCode, connectionString);
  if (basePrice === null) {
    return {
      total: 0,
      basePrice: 0,
      minimumPrice: MINIMUM_PRICE,
      minimumPriceApplied: false,
      orderSubtotal: 0,
      itemSubtotal: 0,
      items: [],
      unresolvedItems: [],
      hasUnresolvedItems: false,
      outOfServiceArea: true,
      error: `Zip code ${zipCode} is out of service area`
    };
  }
  const resolvedItems = [];
  const unresolvedItems = [];
  let itemSubtotal = 0;
  for (const item of items) {
    const quantity = item.quantity || 1;
    let unitPrice = item.unitPrice;
    let itemName = item.name;
    let catalogItem = null;
    if (unitPrice === void 0 || unitPrice === null) {
      catalogItem = lookupItem(item.id, catalog);
      if (catalogItem) {
        unitPrice = catalogItem.pickupPrice || 0;
        itemName = itemName || catalogItem.name;
      }
    }
    if (!unitPrice || unitPrice <= 0) {
      unresolvedItems.push({
        id: item.id,
        name: itemName || `Unknown Item (${item.id})`,
        quantity,
        needsClarification: true,
        reason: catalogItem ? "Catalog item exists but has no pickupPrice" : "Item ID not found in catalog"
      });
      continue;
    }
    const lineTotal = unitPrice * quantity;
    itemSubtotal += lineTotal;
    resolvedItems.push({
      itemType: {
        id: item.id,
        name: itemName || `Item ${item.id}`
      },
      pickupUnitPrice: unitPrice,
      quantity,
      pickupSubtotal: lineTotal
    });
  }
  const orderSubtotal = itemSubtotal + basePrice;
  const minimumPriceApplied = orderSubtotal < MINIMUM_PRICE;
  const total = Math.max(orderSubtotal, MINIMUM_PRICE);
  return {
    total,
    basePrice,
    minimumPrice: MINIMUM_PRICE,
    minimumPriceApplied,
    orderSubtotal,
    itemSubtotal,
    items: resolvedItems,
    unresolvedItems,
    hasUnresolvedItems: unresolvedItems.length > 0,
    outOfServiceArea: false
  };
}
__name(calculateTotalPrice, "calculateTotalPrice");
function setCatalog(catalog) {
  _catalog = catalog;
}
__name(setCatalog, "setCatalog");

// ../src/extraction/disambiguation.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../src/extraction/itemMatcher.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "an",
  "the",
  "some",
  "any",
  "my",
  "our",
  "old",
  "broken",
  "heavy",
  "large",
  "small",
  "big",
  "and",
  "with",
  "of",
  "in",
  "on",
  "for",
  "to",
  "piece",
  "pieces",
  "set",
  "bunch",
  "lot",
  "few",
  "couple",
  "trash",
  "junk",
  "removal",
  "pickup",
  "take",
  "away",
  "need",
  "want",
  "please"
]);
function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((token) => token.length > 0 && !STOP_WORDS.has(token));
}
__name(tokenize, "tokenize");
function buildIndex(catalog) {
  return catalog.map((item) => {
    const nameTokens = tokenize(item.name);
    const aliasesTokens = (item.aliases || []).flatMap((alias) => tokenize(alias));
    const slugTokens = item.slug ? item.slug.split("_") : [];
    const allTokens = [.../* @__PURE__ */ new Set([...nameTokens, ...aliasesTokens, ...slugTokens])];
    return {
      item,
      tokens: allTokens,
      nameStr: item.name.toLowerCase()
    };
  });
}
__name(buildIndex, "buildIndex");
var _index = null;
function getIndex() {
  if (!_index) {
    const catalog = getCatalog();
    _index = buildIndex(catalog);
  }
  return _index;
}
__name(getIndex, "getIndex");
function matchItems(input, limit = 5) {
  const inputTokens = tokenize(input);
  if (inputTokens.length === 0) return [];
  const index = getIndex();
  const inputStr = input.toLowerCase();
  const scored = index.map((entry) => {
    let score = 0;
    if (entry.nameStr === inputStr) {
      score += 100;
    } else if (entry.nameStr.includes(inputStr)) {
      score += 50;
    }
    let matchedTokens = 0;
    for (const token of inputTokens) {
      if (entry.tokens.includes(token)) {
        matchedTokens++;
        score += 10;
      } else {
        const partialMatch = entry.tokens.some((t) => t.includes(token) || token.includes(t));
        if (partialMatch) {
          matchedTokens++;
          score += 5;
        }
      }
    }
    if (matchedTokens === inputTokens.length && inputTokens.length > 0) {
      score += 20;
    }
    const coverage = matchedTokens / entry.tokens.length;
    score += coverage * 10;
    return { item: entry.item, score };
  });
  return scored.filter((res) => res.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}
__name(matchItems, "matchItems");
function splitRequest(text) {
  return text.split(/\b(?:and|plus|with)\b|,|\+/).map((s) => s.trim()).filter((s) => s.length > 0);
}
__name(splitRequest, "splitRequest");
function extractFromRequest(text) {
  const parts = splitRequest(text);
  return parts.map((part) => {
    return {
      input: part,
      matches: matchItems(part)
    };
  });
}
__name(extractFromRequest, "extractFromRequest");

// ../src/extraction/aliasLogger.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var _tableCreated = false;
async function ensureTableExists(client) {
  if (_tableCreated) return;
  await client.query(`
    CREATE TABLE IF NOT EXISTS unmapped_aliases (
      id SERIAL PRIMARY KEY,
      input TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  _tableCreated = true;
}
__name(ensureTableExists, "ensureTableExists");
async function logUnmappedAlias(input, reason, connectionString) {
  if (!input || input.trim() === "") return;
  const connStr = connectionString || process.env.DATABASE_URL;
  if (!connStr) {
    console.warn("UNMAPPED_ALIAS (No DB connection):", JSON.stringify({ input, reason }));
    return;
  }
  const client = new esm_default.Client(connStr);
  try {
    await client.connect();
    await ensureTableExists(client);
    await client.query(
      "INSERT INTO unmapped_aliases (input, reason, created_at) VALUES ($1, $2, NOW())",
      [input.trim(), reason]
    );
  } catch (err) {
    console.error("Failed to write to unmapped_aliases in Postgres:", err.message);
  } finally {
    try {
      await client.end();
    } catch (e) {
    }
  }
}
__name(logUnmappedAlias, "logUnmappedAlias");

// ../src/extraction/disambiguation.js
var CONFIDENCE_THRESHOLD = 25;
var AMBIGUITY_THRESHOLD = 10;
var PRICE_VARIANCE_THRESHOLD = 15;
async function resolveExtraction(extraction, connectionString) {
  const { input, matches } = extraction;
  if (matches.length === 0 || matches[0].score < CONFIDENCE_THRESHOLD) {
    await logUnmappedAlias(input, "No confident match found", connectionString);
    return {
      input,
      resolved: false,
      needsClarification: true,
      reason: "No confident match found",
      options: matches.slice(0, 3).map((m) => m.item)
    };
  }
  const topMatch = matches[0];
  const competingMatches = matches.filter(
    (m) => m.item.id !== topMatch.item.id && topMatch.score - m.score <= AMBIGUITY_THRESHOLD
  );
  if (competingMatches.length > 0) {
    const topPrice = topMatch.item.pickupPrice || 0;
    for (const comp of competingMatches) {
      const compPrice = comp.item.pickupPrice || 0;
      if (Math.abs(topPrice - compPrice) > PRICE_VARIANCE_THRESHOLD) {
        return {
          input,
          resolved: false,
          needsClarification: true,
          reason: "Ambiguous item description",
          options: [topMatch.item, ...competingMatches.map((m) => m.item)]
        };
      }
    }
  }
  return {
    input,
    resolved: true,
    item: topMatch.item,
    quantity: 1
    // Default quantity, can be extracted later if needed
  };
}
__name(resolveExtraction, "resolveExtraction");
async function processRequest(text, connectionString) {
  const extractions = extractFromRequest(text);
  const resolvedItems = [];
  const ambiguousItems = [];
  for (const ext of extractions) {
    const resolution = await resolveExtraction(ext, connectionString);
    if (resolution.resolved) {
      resolvedItems.push({
        id: resolution.item.id,
        name: resolution.item.name,
        quantity: resolution.quantity,
        unitPrice: resolution.item.pickupPrice
      });
    } else {
      ambiguousItems.push({
        id: `AMBIGUOUS_${Math.random().toString(36).substr(2, 9)}`,
        name: resolution.input,
        quantity: 1,
        needsClarification: true,
        reason: resolution.reason,
        options: resolution.options
      });
    }
  }
  return { resolvedItems, ambiguousItems };
}
__name(processRequest, "processRequest");

// ../data/items-catalog-new.json
var items_catalog_new_default = [
  {
    aliases: [
      "junk",
      "trash"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7892",
    marquee: false,
    name: "1/3 Cubic Yard of Loose Items",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 45,
    priority: -1,
    slug: "13_cubic_yard_of_loose_items",
    subtext: "Fits in a 64 Gallon Trash Can with a weight between 75 - 150 lbs."
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 1 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 1 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7833",
    marquee: false,
    name: "1 Car Garage Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "1_car_garage_cleanout",
    subtext: "All items in a 1 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 2 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 2 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7832",
    marquee: false,
    name: "2 Car Garage Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 800,
    priority: 0,
    slug: "2_car_garage_cleanout",
    subtext: "All items in a 2 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [
      "TOR30L",
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "OVEN_KITCHEN",
    id: "7295",
    marquee: false,
    name: "30 Inch Over the Range Microwave ",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "30_inch_over_the_range_microwave_",
    subtext: "30 Inch Over the Range Microwave "
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 175,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "OVEN_KITCHEN",
    id: "8067",
    marquee: false,
    name: "30 Inch Tilt Panel Electric Range",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 1,
    slug: "30_inch_tilt_panel_electric_range",
    subtext: "Thor 30 Inch Electric Range"
  },
  {
    aliases: [
      "30",
      "inch",
      "range",
      "zline",
      "kitchen",
      "stove"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7434",
    marquee: false,
    name: '30" Range',
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: '30"_range',
    subtext: '30" Kitchen range (235 lbs or less) '
  },
  {
    aliases: [
      "36",
      "inch",
      "range",
      "kitchen",
      "zline",
      "stove"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7433",
    marquee: false,
    name: '36" Range',
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: '36"_range',
    subtext: '36" kitchen range (258 lbs or less) '
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 3 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 3 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7834",
    marquee: false,
    name: "3 Car Garage Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 1100,
    priority: 0,
    slug: "3_car_garage_cleanout",
    subtext: "All items in a 3 car garage. Please choose any appliances from our catalog.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 525,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE_COMMERCIAL_SIZE",
    id: "7296",
    marquee: false,
    name: '48" Professional Range ',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: '48"_professional_range_',
    subtext: '48" Professional Range '
  },
  {
    aliases: [
      "kitchen",
      "range",
      "stove",
      "48",
      "inch",
      "zline"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7435",
    marquee: false,
    name: '48" Range',
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: '48"_range',
    subtext: '48" Kitchen Range (388 lbs or less)'
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 155,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7794",
    marquee: false,
    name: '48" Rangetop',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: '48"_rangetop',
    subtext: "A 48 inch rangetop (no oven)"
  },
  {
    aliases: [
      "Optimum",
      "drum"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PAINT_5_GALLON_BUCKET",
    id: "8066",
    marquee: false,
    name: "55 Gallon Plastic Drum",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "55_gallon_plastic_drum",
    subtext: "Filled with non-hazardous soil. Approximately 400 lbs."
  },
  {
    aliases: [
      "zline",
      "kitchen",
      "60",
      "inch",
      "range",
      "stove"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7466",
    marquee: false,
    name: '60" Range',
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: '60"_range',
    subtext: '60" Kitchen Range (455 lbs or less)'
  },
  {
    aliases: [
      "pool",
      "above ground pool"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Please upload a picture using the Manage My Order feature on your order confirmation email for confirmation of pricing.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ABOVE_GROUND_POOL",
    id: "7935",
    marquee: false,
    name: "Above Ground Pool",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 800,
    priority: -1,
    slug: "above_ground_pool",
    subtext: "Above ground pool, pump and plumbing must be disconnected and can be removed for an additional charge"
  },
  {
    aliases: [
      "electric",
      "boxspring",
      "base",
      "box",
      "foundation",
      "spring",
      "frame",
      "platform"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "ADJUSTABLE_BED_BASE",
    id: "7712",
    marquee: false,
    name: "Adjustable Bed Base",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "adjustable_bed_base",
    subtext: "Is this a king size? Please choose 2 items."
  },
  {
    aliases: [
      "adjustable",
      "bed",
      "base",
      "full"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7960",
    marquee: false,
    name: "Adjustable Bed Base - Full",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 8,
    slug: "adjustable_bed_base_-_full",
    subtext: ""
  },
  {
    aliases: [
      "adjustable",
      "bed",
      "base",
      "king",
      "cal"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "BED_FRAME_SET",
    id: "7958",
    marquee: false,
    name: "Adjustable Bed Base - King/Cal King",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 45,
    priority: 10,
    slug: "adjustable_bed_base_-_king/cal_king",
    subtext: ""
  },
  {
    aliases: [
      "adjustable",
      "bed",
      "base",
      "queen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7959",
    marquee: false,
    name: "Adjustable Bed Base - Queen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 9,
    slug: "adjustable_bed_base_-_queen",
    subtext: ""
  },
  {
    aliases: [
      "adjustable",
      "bed",
      "base",
      "twin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7961",
    marquee: false,
    name: "Adjustable Bed Base - Twin",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 7,
    slug: "adjustable_bed_base_-_twin",
    subtext: ""
  },
  {
    aliases: [
      "ac",
      "window",
      "unit",
      "fan",
      "ventilator"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Residential Sized Air Conditioner - Must be fully disconnected prior to Loader arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "AIR_CONDITIONER",
    id: "7403",
    marquee: false,
    name: "Air Conditioner",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "air_conditioner",
    subtext: "Residential Sized Air Conditioner - Must be fully disconnected prior to Loader arrival"
  },
  {
    aliases: [
      "ac",
      "window",
      "unit",
      "fan",
      "ventilator"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Unit must be removed from the window or wall and fully disconnected prior to the Loaders arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "AIR_CONDITIONER",
    id: "7404",
    marquee: false,
    name: "Air Conditioner - Window Unit",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "air_conditioner_window_unit",
    subtext: "Unit must be removed from the window or wall and fully disconnected prior to the Loaders arrival"
  },
  {
    aliases: [
      "tank",
      "fish",
      "fishtank",
      "terrarium"
    ],
    assemblyAllowed: true,
    assemblyPrice: 200,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "A large aquarium is 40 to 70 gallons. Additional charges will apply if larger than 70 gallons.   Aquarium must be empty",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "AQUARIUM_LARGE",
    id: "7888",
    marquee: false,
    name: "Aquarium - large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 125,
    priority: 0,
    slug: "aquarium_-_large",
    subtext: "A large aquarium is 40 to 70 gallons. Additional charges will apply if larger than 70 gallons.   Aquarium must be empty"
  },
  {
    aliases: [
      "tank",
      "fish",
      "aquarium",
      "fishtank",
      "terrarium"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "A medium aquarium is 25 to 40 gallons. Additional charges will apply if larger than 40 gallons.  Aquarium must be empty.",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "AQUARIUM_MEDIUM",
    id: "7889",
    marquee: false,
    name: "Aquarium - Medium",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "aquarium_-_medium",
    subtext: "A medium aquarium is 25 to 40 gallons. Additional charges will apply if larger than 40 gallons.  Aquarium must be empty."
  },
  {
    aliases: [
      "tank",
      "fush",
      "fish",
      "fishtank",
      "aquarium",
      "terrarium"
    ],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "A small aquarium is less than 25 gallons.  Additional charges will apply if larger than 25 gallons.  Aquarium must be empty",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "AQUARIUM_SMALL",
    id: "7887",
    marquee: false,
    name: "Aquarium - small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "aquarium_-_small",
    subtext: "A small aquarium is less than 25 gallons.  Additional charges will apply if larger than 25 gallons.  Aquarium must be empty"
  },
  {
    aliases: [
      "runner",
      "oriental",
      "bath",
      "mat",
      "shag",
      "area rug"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARPET",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. Please make sure your item(s) is rolled and secured.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ARE_RUG_SMALL",
    id: "7966",
    marquee: false,
    name: "Area Rug (6x9 or smaller)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "area_rug_small",
    subtext: "A 6ft x 9ft or smaller area rug"
  },
  {
    aliases: [
      "runner",
      "oriental",
      "bath",
      "mat",
      "shag",
      "area rug"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARPET",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. Please make sure your item(s) is rolled and secured.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "AREA_RUG_LARGE",
    id: "7965",
    marquee: false,
    name: "Area Rug (larger than 6x9)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "area_rug_large",
    subtext: "A 6 ft x 9ft or larger area rug"
  },
  {
    aliases: [
      "Christmas",
      "tree"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "ARTIFICIAL_CHRISTMAS_TREE",
    id: "7737",
    marquee: false,
    name: "Artificial Christmas Tree (10ft or less)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "artificial_christmas_tree",
    subtext: "All removable decorations must be removed prior to pickup."
  },
  {
    aliases: [
      "ATV",
      "4 wheeler"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ATV",
    id: "7351",
    marquee: false,
    name: "ATV",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "atv",
    subtext: ""
  },
  {
    aliases: [
      "wheel",
      "rim"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "AUTOMOTIVE_RIM",
    id: "7735",
    marquee: false,
    name: "Automotive Rim",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "automotive_rim",
    subtext: "This is for the rim only.  If there is a tire as well, please select both Automotive Rim and Tire"
  },
  {
    aliases: [
      "rim",
      "wheel",
      "automotive",
      "car",
      "truck"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "AUTOMOTIVE_RIM_AND_TIRE",
    id: "7736",
    marquee: false,
    name: "Automotive Rim and Tire",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 70,
    priority: 0,
    slug: "automotive_rim_and_tire",
    subtext: "Automotive Rim and mounted Tire - for the wheel/rim only, search rim"
  },
  {
    aliases: [
      "baby",
      "chair",
      "feeding",
      "baby",
      "buggy",
      "carriage",
      "pushchair",
      "carrier",
      "child"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BABY_CAR_SEAT",
    id: "7292",
    marquee: false,
    name: "Baby Car Seat",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "baby_seat",
    subtext: "Baby/Child Car Seat or Carrier"
  },
  {
    aliases: [
      "baby",
      "change",
      "changing",
      "table"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BABY_CHANGING_TABLE",
    id: "7335",
    marquee: false,
    name: "Baby Changing Table",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "baby_changing_table",
    subtext: "Baby Changing Table - For a dresser with a built-in Changing Table, please choose dresser"
  },
  {
    aliases: [
      "baby",
      "chair",
      "feeding",
      "baby",
      "buggy",
      "carriage",
      "pushchair",
      "perambulator",
      "pram"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BABY_SWING",
    id: "7741",
    marquee: false,
    name: "Baby Swing",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "baby_swing",
    subtext: ""
  },
  {
    aliases: [
      "baby",
      "chair",
      "feeding",
      "baby",
      "buggy",
      "carriage",
      "pushchair",
      "perambulator",
      "pram"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BABY_WALKER",
    id: "7300",
    marquee: false,
    name: "Baby Walker",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "baby_walker",
    subtext: ""
  },
  {
    aliases: [
      "bag",
      "junk",
      "trash",
      "garbage",
      "waste"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BAG_OF_JUNK",
    id: "7446",
    marquee: false,
    name: "Bag of Junk",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "bag_of_junk",
    subtext: "1 Standard contractor size or smaller bag of junk"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "The job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "The job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7835",
    marquee: false,
    name: "Basement Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 1100,
    priority: 0,
    slug: "basement_cleanout",
    subtext: "Cleanout of a 1,000 square foot basement.  Increase quantity for every 1,000 sq ft.\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 145,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7426",
    marquee: false,
    name: "Basi Systems Arm Chair Barrel Set",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_arm_chair_barrel_set",
    subtext: "Basi Systems Arm Chair Barrel Set"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7427",
    marquee: false,
    name: "Basi Systems Ladder Barrel",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_ladder_barrel",
    subtext: "Basi Systems Ladder Barrel"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7429",
    marquee: false,
    name: "Basi Systems Ped A Pull",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_ped_a_pull",
    subtext: "Basi Systems Ped A Pull"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 170,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7662",
    marquee: false,
    name: "Basi Systems Reformer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "basi_systems_reformer",
    subtext: "Basi Systems Reformer "
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 320,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7424",
    marquee: false,
    name: "Basi Systems Reformer Combo",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_reformer_combo",
    subtext: "Basi Systems Reformer Combo"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 220,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7425",
    marquee: false,
    name: "Basi Systems Reformer with Tower",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_reformer_with_tower",
    subtext: "Basi Systems Reformer with Tower"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7430",
    marquee: false,
    name: "Basi Systems Spine Corrector",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_spine_corrector",
    subtext: "Basi Systems Spine Corrector"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 200,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7421",
    marquee: false,
    name: "Basi Systems Wall Tower",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_wall_tower",
    subtext: "Basi Systems Wall Tower"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7428",
    marquee: false,
    name: "Basi Systems Wunda Chair",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_systems_wunda_chair",
    subtext: "Basi Systems Wunda Chair"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 320,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "GENERIC",
    id: "7449",
    marquee: false,
    name: "Basi System Trapeze Table (Cadillac)",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "basi_system_trapeze_table_(cadillac)",
    subtext: "Basi System Trapeze Table (Cadillac)"
  },
  {
    aliases: [
      "hoop",
      "backboard"
    ],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to remove this item from cement or cement this item into the ground. Any sand, water or concrete must be removed from portable Basketball goal base prior to pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "PORTABLE_BASKETBALL_SHOOTING_MACHINE",
    id: "7739",
    marquee: false,
    name: "Basketball Goal",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "basketball_goal",
    subtext: "LoadUp is not able to remove this item from cement or cement this item into the ground. Any sand, water or concrete must be removed from portable Basketball goal base prior to pickup."
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 8ft x 10ft bathroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 8ft x 10ft bathroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "8063",
    marquee: false,
    name: "Bathroom Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "bathroom_cleanout",
    subtext: "All items in a 8ft x 10ft bathroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund."
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "BATHTUB_CASTIRON",
    id: "7364",
    marquee: false,
    name: "Bathtub - Cast Iron",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "bathtub_-_cast_iron",
    subtext: ""
  },
  {
    aliases: [
      "tub",
      "jacuzzi",
      "wash tub",
      "basin",
      "washbasin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "BATHTUB_FIBERGLASS",
    id: "7810",
    marquee: false,
    name: "Bathtub - Fiberglass",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "bathtub_fiberglass",
    subtext: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup."
  },
  {
    aliases: [
      "tub",
      "jacuzzi",
      "wash tub",
      "basin",
      "washbasin",
      "cast",
      "iron"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "BATHTUB_PORCELAIN",
    id: "7365",
    marquee: false,
    name: "Bathtub - Porcelain",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "bathtub_porcelain",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BEANBAG_LARGE",
    id: "7773",
    marquee: false,
    name: "beanbag - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "beanbag_-_large",
    subtext: "This is a large bean bag for 2 or more people"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 15,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BEANBAG_STANDARD_SIZE",
    id: "7772",
    marquee: false,
    name: "Beanbag - Standard size",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "beanbag_-_standard_size",
    subtext: "this is a standard single person sized bean bag"
  },
  {
    aliases: [
      "bed",
      "frame",
      "base",
      "foundation",
      "full"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7949",
    marquee: false,
    name: "Bed Base/Foundation - Full",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 8,
    slug: "bed_base/foundation_-_full",
    subtext: ""
  },
  {
    aliases: [
      "bed",
      "frame",
      "base",
      "foundation",
      "king",
      "cal"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "BED_FRAME_SET",
    id: "7951",
    marquee: false,
    name: "Bed Base/Foundation - King/Cal King",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 45,
    priority: 10,
    slug: "bed_base/foundation_-_king/cal_king",
    subtext: ""
  },
  {
    aliases: [
      "bed",
      "frame",
      "base",
      "foundation",
      "queen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7950",
    marquee: false,
    name: "Bed Base/Foundation - Queen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 9,
    slug: "bed_base/foundation_-_queen",
    subtext: ""
  },
  {
    aliases: [
      "bed",
      "base",
      "frame",
      "foundation",
      "twin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7948",
    marquee: false,
    name: "Bed Base/Foundation - Twin",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 7,
    slug: "bed_base/foundation_-_twin",
    subtext: ""
  },
  {
    aliases: [
      "foundation",
      "frame",
      "bed",
      "base",
      "platform"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location.",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FOUNDATION",
    id: "7630",
    marquee: false,
    name: "Bed Foundation",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "bed_foundation",
    subtext: ""
  },
  {
    aliases: [
      "slats",
      "sleigh",
      "frame",
      "iron",
      "rice",
      "boxspring",
      "mattress",
      "headboard",
      "footboard"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME",
    id: "8007",
    marquee: false,
    name: "Bed Frame",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: -1,
    slug: "bed_frame",
    subtext: ""
  },
  {
    aliases: [
      "bed",
      "frame",
      "full",
      "queen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME_SET",
    id: "7945",
    marquee: false,
    name: "	Bed Frame - Full/Queen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 9,
    slug: "	bed_frame_-_full/queen",
    subtext: "Bed Frame includes the frame only. Please add headboard or footboard if you need those removed as well"
  },
  {
    aliases: [
      "bed",
      "frame",
      "king",
      "cal"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME",
    id: "7946",
    marquee: false,
    name: "Bed Frame - King/Cal King",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 10,
    slug: "bed_frame_-_king/cal_king",
    subtext: "Bed Frame includes the frame only. Please add headboard or footboard if you need those removed as well"
  },
  {
    aliases: [
      "bed",
      "frame",
      "twin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BED_FRAME",
    id: "7944",
    marquee: false,
    name: "Bed Frame - Twin",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 7,
    slug: "bed_frame_-_twin",
    subtext: "Bed Frame includes the frame only. Please add headboard or footboard if you need those removed as well"
  },
  {
    aliases: [
      "bed",
      "frame"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "Bedframe with built-in Drawers",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "BED_FRAME",
    id: "7953",
    marquee: false,
    name: "Bedframe with Drawers",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "bedframe_with_drawers",
    subtext: "Bedframe with built-in Drawers"
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 12ft x 20ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 12ft x 20ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "8062",
    marquee: false,
    name: "Bedroom Cleanout - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 400,
    priority: 0,
    slug: "bedroom_cleanout_-_large",
    subtext: "All items in a 12ft x 20ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund."
  },
  {
    aliases: [
      "Cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 12ft x 12ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 12ft x 12ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "8061",
    marquee: false,
    name: "Bedroom Cleanout - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "bedroom_cleanout_-_small",
    subtext: "All items in a 12ft x 12ft bedroom.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund."
  },
  {
    aliases: [
      "bed",
      "frame",
      "rails"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "BED_FRAME",
    id: "7952",
    marquee: false,
    name: "Bed Side Rails",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 5,
    slug: "bed_side_rails",
    subtext: "The long Bed Side Rails that go between the headboard and footboard"
  },
  {
    aliases: [
      "divan",
      "ottoman",
      "seat",
      "pew",
      "lawn",
      "setee",
      "garden"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BENCH",
    id: "7713",
    marquee: false,
    name: "Bench",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "bench",
    subtext: ""
  },
  {
    aliases: [
      "mountain",
      "hybrid",
      "comfort",
      "road",
      "tandem",
      "Bike",
      "Unicycle"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BICYCLE",
    id: "7306",
    marquee: false,
    name: "Bicycle",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "bicycle",
    subtext: ""
  },
  {
    aliases: [
      "media",
      "book",
      "books",
      "cd",
      "dvd"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BOOK_CD_DVD",
    id: "7702",
    marquee: false,
    name: "Books, CD, DVD",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "books,_cd,_dvd",
    subtext: "CD's, DVD's, Books and other media"
  },
  {
    aliases: [
      "cabinet",
      "case",
      "rack",
      "bookcase"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BOOKSHELF",
    id: "7740",
    marquee: false,
    name: "Bookshelf",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "bookshelf",
    subtext: "Book Shelf or Book case up to 8 ft tall and 3 ft wide"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: '1 Standard moving box (24"x16"x12") or smaller box of junk',
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BAG_OF_JUNK",
    id: "7640",
    marquee: false,
    name: "Box of Junk",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "box_of_junk",
    subtext: '1 Standard moving box (24"x16"x12") or smaller box of junk'
  },
  {
    aliases: [
      "Edward",
      "Edward Martin",
      "Martin"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARDBOARD_BOX",
    id: "7939",
    marquee: false,
    name: "Box of Tile",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "box_of_tile",
    subtext: "Small box of loose tile (50lbs)."
  },
  {
    aliases: [
      "foundation",
      "twin",
      "queen",
      "xl",
      "twin",
      "extra",
      "large",
      "twin",
      "full",
      "double",
      "single",
      "platform",
      "boxspring"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations or if soiled with a bodily fluid stain larger than a pizza box.",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "BOX_SPRING",
    id: "7783",
    marquee: true,
    name: "Box Spring",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: -1,
    slug: "box_spring",
    subtext: "Don't forget to add your Mattress, Bed Frame or Adjustable base! "
  },
  {
    aliases: [
      "box",
      "spring",
      "full"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "BOX_SPRING",
    id: "7955",
    marquee: false,
    name: "Box Spring - Full",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 8,
    slug: "box_spring_-_full",
    subtext: "Don't forget to add your Mattress, Bed Frame or Adjustable base! "
  },
  {
    aliases: [
      "box",
      "spring",
      "king",
      "cal"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 45,
    icon: "BOX_SPRING",
    id: "7957",
    marquee: false,
    name: "Box Spring - King/Cal King",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 10,
    slug: "box_spring_-_king/cal_king",
    subtext: "Don't forget to add your Mattress, Bed Frame or Adjustable base! "
  },
  {
    aliases: [
      "box",
      "spring",
      "queen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "BOX_SPRING",
    id: "7956",
    marquee: false,
    name: "Box Spring - Queen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 9,
    slug: "box_spring_-_queen",
    subtext: "Don't forget to add your Mattress, Bed Frame or Adjustable base! "
  },
  {
    aliases: [
      "box",
      "spring",
      "twin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BOX_SPRING",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "BOX_SPRING",
    id: "7954",
    marquee: false,
    name: "Box Spring - Twin",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 7,
    slug: "box_spring_-_twin",
    subtext: "Don't forget to add your Mattress, Bed Frame or Adjustable base! "
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "10ft x 10ft x 10ft pile of brush - not tree trunks or branches larger than 4 inches in diameter",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "10ft x 10ft x 10ft pile of brush - not tree trunks or branches larger than 4 inches in diameter",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7525",
    marquee: false,
    name: "Brush Pile - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 650,
    priority: 0,
    slug: "brush_pile_-_large",
    subtext: "10ft x 10ft x 10ft pile of brush - not tree trunks or branches larger than 4 inches in diameter"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "5ft x 5ft x 5ft pile of brush - not tree trunks or branches larger than 4 inches in diameter",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "5ft x 5ft x 5ft pile of brush - not tree trunks or branches larger than 4 inches in diameter",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7524",
    marquee: false,
    name: "Brush Pile - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "brush_pile_-_small",
    subtext: "5ft x 5ft x 5ft pile of brush - not tree trunks or branches larger than 4 inches in diameter"
  },
  {
    aliases: [
      "cardboard",
      "box",
      "moving"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARDBOARD_BOX",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BUNDLE_OF_10_BROKEN_DOWN_MOVING_BOXES",
    id: "7928",
    marquee: false,
    name: "Bundle of 10 broken down Moving Boxes",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: -1,
    slug: "bundle_of_10_broken_down_moving_boxes",
    subtext: "Broken down moving box sizes of 18in x 24in x 36in or smaller. All boxes must be broken down and bundled in groups of 10 or less. Each bundles counts as 1 item "
  },
  {
    aliases: [
      "stacked",
      "stackable",
      "loft",
      "frame",
      "mattress",
      "boxspring"
    ],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "BUNKBED",
    id: "7619",
    marquee: false,
    name: "Bunkbed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 125,
    priority: 0,
    slug: "bunkbed",
    subtext: ""
  },
  {
    aliases: [
      "stacked",
      "stackable",
      "loft",
      "frame",
      "mattress",
      "boxspring"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BUNKY_BOARDS",
    id: "7618",
    marquee: false,
    name: "Bunky Boards",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "bunky_boards",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [],
    auxillaryText: "",
    category: "CABINET",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CHINA_CABINET",
    id: "7655",
    marquee: false,
    name: "Cabinet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: -1,
    slug: "cabinet",
    subtext: ""
  },
  {
    aliases: [
      "wardrobe",
      "closet",
      "cabinet",
      "cupboard",
      "armoire"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CABINET",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your item(s) are accessible and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "ARMOIRE",
    id: "7553",
    marquee: false,
    name: "Cabinet - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "armoire",
    subtext: "ie: armoire, large kitchen cabinets, wardrobe, etc Price is per piece"
  },
  {
    aliases: [
      "box",
      "moving",
      "storage",
      "card",
      "board",
      "cardboard"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARDBOARD_BOX",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARDBOARD_BOX",
    id: "7732",
    marquee: false,
    name: "Cardboard Box (Not Broken Down)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 7,
    priority: 0,
    slug: "cardboard_box_(not_broken_down)",
    subtext: "Box sizes 24in x 36in x 36in or smaller.  Each box must be empty and counts as 1 item - Any contents will be at an additional charge"
  },
  {
    aliases: [
      "bale",
      "cardboard",
      "box"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARDBOARD_BOX",
    customerScheduleRequestVisible: true,
    detail: "A large bale of cardboard is 301 to 500 pounds in weight, and must be securely bound and accessible via a loading dock.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARDBOARD_BOX",
    id: "7927",
    marquee: false,
    name: "Cardboard - Large Bale",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 125,
    priority: -1,
    slug: "cardboard_-_large_bale",
    subtext: "A large bale of cardboard is 301 to 500 pounds in weight, and must be securely bound and accessible via a loading dock."
  },
  {
    aliases: [
      "balke",
      "bale",
      "cardboard"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARDBOARD_BOX",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARDBOARD_BOX",
    id: "7333",
    marquee: false,
    name: "Cardboard - Medium Bale",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "cardboard_-_medium_bale",
    subtext: "A medium bale of cardboard is 151 to 300 pounds in weight, and must be securely bound and accessible via a loading dock."
  },
  {
    aliases: [
      "bale",
      "cardboard"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARDBOARD_BOX",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARDBOARD_BOX",
    id: "7926",
    marquee: false,
    name: "Cardboard - Small Bale",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: -1,
    slug: "cardboard_-_small_bale",
    subtext: "A small bale of cardboard is 50 to 150 pounds in weight, and must be securely bound and accessible via a loading dock."
  },
  {
    aliases: [
      "room",
      "rug",
      "flooring"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CARPET",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. Please make sure your item(s) is rolled and secured. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARPET",
    id: "7576",
    marquee: false,
    name: "Carpet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: -1,
    slug: "carpet",
    subtext: "Carpet must be rolled.  Each roll counts as 1 item 	"
  },
  {
    aliases: [
      "cleaner",
      "roomba",
      "dustbuster",
      "steamcleaner",
      "bissell",
      "carpet"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CARPET_STEAMER",
    id: "7536",
    marquee: false,
    name: "Carpet Steamer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "carpet_steamer",
    subtext: ""
  },
  {
    aliases: [
      "funeral",
      "casket",
      "cascet"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7663",
    marquee: false,
    name: "Casket",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "casket",
    subtext: ""
  },
  {
    aliases: [
      "cat",
      "tree",
      "feline",
      "tower",
      "house"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CAT_TREE",
    id: "7307",
    marquee: false,
    name: "Cat Tree",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "cat_tree",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Ceiling fan must be uninstalled and the wiring disconnected prior to loader arrival.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CEILING_FAN",
    id: "7716",
    marquee: false,
    name: "Ceiling Fan",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "ceiling_fan",
    subtext: "Ceiling fan must be uninstalled and the wiring disconnected prior to loader arrival."
  },
  {
    aliases: [
      "dining room",
      "chair",
      "captains",
      "elbow",
      "kitchen",
      "arm",
      "patio",
      "folding",
      "camp",
      "garden",
      "lawn",
      "outdoor",
      "armchair",
      "computer"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "CHAIR",
    id: "7579",
    marquee: false,
    name: "Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: -1,
    slug: "chair",
    subtext: "dining chair, kitchen chair, armchair, desk chair"
  },
  {
    aliases: [
      "lounger",
      "outdoor",
      "setee",
      "chair"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "CHAISE_LOUNGE",
    id: "7742",
    marquee: false,
    name: "Chaise Lounge",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "chaise_lounge",
    subtext: ""
  },
  {
    aliases: [
      "light",
      "fixure",
      "candle",
      "lighting",
      "dining room",
      "kitchen",
      "entrance",
      "foyer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CHANDELIER",
    id: "7340",
    marquee: false,
    name: "Chandelier - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "chandelier_large",
    subtext: ""
  },
  {
    aliases: [
      "light",
      "fixure",
      "candle",
      "lighting",
      "dining room",
      "kitchen",
      "entrance",
      "foyer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CHANDELIER",
    id: "7341",
    marquee: false,
    name: "Chandelier - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "chadelier_small",
    subtext: ""
  },
  {
    aliases: [
      "box",
      "storage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "CHEST",
    id: "7807",
    marquee: false,
    name: "Chest",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "chest",
    subtext: ""
  },
  {
    aliases: [
      "hutch",
      "closet",
      "cupboard",
      "cabinet",
      "china"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CABINET",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "CHINA_CABINET",
    id: "7962",
    marquee: false,
    name: "China Cabinet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "china_cabinet",
    subtext: "Price is per piece.   A china cabinet with 3 sections would be a quantity of 3"
  },
  {
    aliases: [
      "Christmas",
      "tree"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "CHRISTMAS_TREE",
    id: "7720",
    marquee: false,
    name: "Christmas Tree (Live) (10ft or less)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "christmas_tree",
    subtext: "All removable decorations must be removed prior to pickup."
  },
  {
    aliases: [
      "longcase",
      "clock",
      "tall-case",
      "tall",
      "case"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GRANDFATHER_CLOCK",
    id: "7370",
    marquee: false,
    name: "Clock - Grandfather",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "grandfather_clock",
    subtext: ""
  },
  {
    aliases: [
      "lounge",
      "morris",
      "wing",
      "and",
      "a",
      "half",
      "extra",
      "large",
      "oversized"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "CLUB_CHAIR",
    id: "7581",
    marquee: false,
    name: "Club Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "club_chair",
    subtext: "lounge chair, oversized chair, etc"
  },
  {
    aliases: [
      "dresser"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7985",
    marquee: false,
    name: "Combo Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 60,
    priority: 0,
    slug: "combo_dresser",
    subtext: ""
  },
  {
    aliases: [
      "tire",
      "commercial"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TIRE",
    id: "8057",
    marquee: false,
    name: "Commercial Tire - Automotive",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 65,
    priority: 0,
    slug: "commercial_tire_-_automotive",
    subtext: "Commercial Automotive Car or Pickup Truck tire - Up to 120lbs"
  },
  {
    aliases: [
      "range",
      "cooktop"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are disconnected and removed from the cabinetry prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COOKTOP",
    id: "7997",
    marquee: false,
    name: "Cooktop",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "cooktop",
    subtext: "Counter mounted Cooktop - for a full range or stove, use the  Range or Stove item"
  },
  {
    aliases: [
      "refrigerant",
      "icebox",
      "chiller",
      "cool",
      "box",
      "ice",
      "chest",
      "bag",
      "chilly",
      "bin",
      "esky"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_SMALL",
    id: "7342",
    marquee: false,
    name: "Cooler",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "cooler",
    subtext: ""
  },
  {
    aliases: [
      "cot",
      "camp",
      "camping"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COT",
    id: "7620",
    marquee: false,
    name: "Cot",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "cot",
    subtext: "Personal Camping Cot"
  },
  {
    aliases: [
      "sofa",
      "couch",
      "lounge",
      "loveseat"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "COUCH",
    id: "7412",
    marquee: false,
    name: "Couch / Loveseat",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "couch_/_loveseat",
    subtext: "Includes 1 couch or 1 loveseat, not both.  Is this a sectional, a fold out sleeper or contain a recliner? If so, please search for and choose the appropriate Sectional, Sleeper or Reclining sofa item"
  },
  {
    aliases: [
      "kitchen",
      "bathroom",
      "counter",
      "section"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to  make structural changes in order to remove items. Please make sure your items are uninstalled, accessible,  and ready to be moved prior to your scheduled pickup. Due to the potential for unusual weight and dimensions, additional fees may apply to this item.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COUNTERTOP_LAMINATES",
    id: "7338",
    marquee: false,
    name: "Countertop - Laminates",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "countertop_laminates",
    subtext: ""
  },
  {
    aliases: [
      "marble",
      "granite",
      "soapstone",
      "quartz",
      "kitchen",
      "bathroom",
      "counter",
      "slab"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to  make structural changes in order to remove items. Please make sure your items are uninstalled, accessible,  and ready to be moved prior to your scheduled pickup. Due to the potential for unusual weight and dimensions, additional fees may apply to this item.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COUNTERTOP_STONE",
    id: "7343",
    marquee: false,
    name: "Countertop - Stone",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "countertop_stone",
    subtext: ""
  },
  {
    aliases: [
      "baby",
      "bed",
      "bassinet",
      "cradle"
    ],
    assemblyAllowed: true,
    assemblyPrice: 90,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "CRIB",
    id: "7743",
    marquee: false,
    name: "Crib",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "crib",
    subtext: ""
  },
  {
    aliases: [
      "cubical",
      "desk",
      "workstation",
      "cubicle"
    ],
    assemblyAllowed: true,
    assemblyPrice: 325,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to  make structural changes in order to remove items. Please make sure your items are uninstalled, accessible,  and ready to be moved prior to your scheduled pickup. Due to the potential for unusual weight and dimensions, additional fees could apply to this item. A customer service representative will contact you.",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "CUBICLE",
    id: "7636",
    marquee: false,
    name: "Cubicle",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 90,
    priority: 0,
    slug: "cubicle",
    subtext: "Includes 1 Desk and 1 Filing Cabinet"
  },
  {
    aliases: [
      "Custom"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7298",
    marquee: false,
    name: "Custom Job - L",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 1e3,
    priority: 0,
    slug: "custom_job_-_l",
    subtext: "This is a custom quoted job. Our Sales team will contact you to discuss pricing."
  },
  {
    aliases: [
      "Custom"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7299",
    marquee: false,
    name: "Custom Job - M",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "custom_job_-_m",
    subtext: "This is a custom quoted job. Our Sales team will contact you to discuss pricing."
  },
  {
    aliases: [
      "Custom"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7287",
    marquee: false,
    name: "Custom Job - S",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "custom_job_-_s",
    subtext: "This is a custom quoted job. Our Sales team will contact you to discuss pricing."
  },
  {
    aliases: [
      "Custom"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7472",
    marquee: false,
    name: "Custom Job - XS",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "custom_job_-_xs",
    subtext: ""
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8047",
    marquee: false,
    name: "CVM-11",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "cvm-11",
    subtext: "Cooler / Vending Machine - 210 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8048",
    marquee: false,
    name: "CVM-13",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "cvm-13",
    subtext: "Cooler / Vending Machine - 235 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8050",
    marquee: false,
    name: "CVM-27",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 225,
    priority: 0,
    slug: "cvm-27",
    subtext: "Cooler / Vending Machine - 340 lbs"
  },
  {
    aliases: [
      "trundle",
      "truckle",
      "highriser"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "DAYBED",
    id: "7617",
    marquee: false,
    name: "Daybed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 55,
    priority: 0,
    slug: "daybed",
    subtext: "Daybed includes the Frame only.  Please add a Daybed Mattress if you also need a Daybed Mattress removed"
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a Den\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a Den\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7831",
    marquee: false,
    name: "Den Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "den_cleanout",
    subtext: "All items in a Den\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [
      "escritoire",
      "secretary",
      "workspace",
      "rolltop",
      "desk",
      "school",
      "writing"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "DISASSEMBLY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "DESK",
    id: "7631",
    marquee: false,
    name: "Desk",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "desk",
    subtext: "Small personal/residential desk"
  },
  {
    aliases: [
      "desk",
      "executive",
      "office",
      "commercial"
    ],
    assemblyAllowed: true,
    assemblyPrice: 180,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 35,
    icon: "DESK_EXECUTIVE",
    id: "7633",
    marquee: false,
    name: "Desk - Executive",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 80,
    priority: 0,
    slug: "desk_-_executive",
    subtext: ""
  },
  {
    aliases: [
      "escritoire",
      "secretary",
      "workspace",
      "rolltop",
      "desk",
      "school",
      "writing",
      "corner"
    ],
    assemblyAllowed: true,
    assemblyPrice: 160,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "L_SHAPED_DESK",
    id: "7634",
    marquee: false,
    name: "Desk - L-Shaped",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "l-shaped_desk",
    subtext: ""
  },
  {
    aliases: [
      "desk"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "DESK_MOTORIZED_SIT_STAND",
    id: "7977",
    marquee: false,
    name: "Desk - Motorized Sit/Stand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "desk_-_motorized_sit/stand",
    subtext: ""
  },
  {
    aliases: [
      "desk"
    ],
    assemblyAllowed: true,
    assemblyPrice: 170,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "DESK_U_SHAPED",
    id: "7976",
    marquee: false,
    name: "Desk - U Shaped",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "desk_-_u_shaped",
    subtext: ""
  },
  {
    aliases: [
      "dining",
      "china",
      "hutch",
      "dining hutch",
      "china hutch",
      "cabinet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CABINET",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DINING_CHINA_HUTCH",
    id: "7963",
    marquee: false,
    name: "Dining / China Hutch",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "dining_/_china_hutch",
    subtext: "Each piece of the hutch counts as a single item.   For a 3 piece hutch, choose a quantity of 3"
  },
  {
    aliases: [
      "mechanical",
      "dishwashing",
      "appliance"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DISHWASHER",
    id: "7350",
    marquee: false,
    name: "Dishwasher",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "dishwasher",
    subtext: ""
  },
  {
    aliases: [
      "dresser"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7986",
    marquee: false,
    name: "Double Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 55,
    priority: 0,
    slug: "double_dresser",
    subtext: ""
  },
  {
    aliases: [
      "chest",
      "drawers",
      "bureau",
      "chiffomer",
      "chifforobe",
      "dresser"
    ],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 15,
    icon: "DRESSER",
    id: "7979",
    marquee: true,
    name: "Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "dresser",
    subtext: 'Do you have a mirror?  Please make sure to add it by searching "mirror"'
  },
  {
    aliases: [
      "clothes",
      "tumble",
      "dryer",
      "spin",
      "condenser",
      "drying",
      "machine",
      "laundry"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "WASHER_DRYER",
    customerScheduleRequestVisible: true,
    detail: "A gas dryer must be disconnected from the gas line prior to our arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRYER",
    id: "7884",
    marquee: false,
    name: "Dryer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "dryer",
    subtext: "A gas dryer must be disconnected from the gas line prior to our arrival"
  },
  {
    aliases: [
      "dumber",
      "scooter",
      "cruz",
      "island",
      "cariloha"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7406",
    marquee: false,
    name: "E-Bike",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "e-bike",
    subtext: ""
  },
  {
    aliases: [
      "fire",
      "place",
      "fireplace",
      "heater"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ELECTRIC_FIREPLACE",
    id: "7701",
    marquee: false,
    name: "Electric Fireplace",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "electric_fireplace",
    subtext: "Portable Electric Fireplace under 125 pounds"
  },
  {
    aliases: [
      "heat",
      "heater",
      "fire",
      "place",
      "fireplace"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ELECTRIC_HEATER_LARGE",
    id: "7708",
    marquee: false,
    name: "Electric Heater - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "electric_heater_-_large",
    subtext: "Portable electric heater - over 50 pounds"
  },
  {
    aliases: [
      "heat",
      "heater",
      "fire",
      "place",
      "fireplace"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ELECTRIC_HEATER_SMALL",
    id: "7709",
    marquee: false,
    name: "Electric Heater - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "electric_heater_-_small",
    subtext: "Portable electric heater - under 50 pounds"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7453",
    marquee: false,
    name: "Electric Scooter",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "electric_scooter",
    subtext: ""
  },
  {
    aliases: [
      "exercise",
      "machine",
      "elliptical"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "ELLIPTICAL",
    id: "7445",
    marquee: false,
    name: "Elliptical",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 95,
    priority: 0,
    slug: "elliptical",
    subtext: ""
  },
  {
    aliases: [
      "side table"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 15,
    icon: "NIGHTSTAND",
    id: "7823",
    marquee: false,
    name: "End table",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "end_table",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 300,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "TV_STAND",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "ENTERTAINMENT_CENTER_FOUR_OR_MORE_PIECES",
    id: "7650",
    marquee: false,
    name: "Entertainment Center - 3 piece",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "entertainment_center_-_3_piece",
    subtext: "An Entertainment Center 3 piece would be a large multiple-piece entertainment center with a center section for the TV and left and right side cabinets or shelves"
  },
  {
    aliases: [
      "tv",
      "entertainment",
      "center",
      "stand"
    ],
    assemblyAllowed: true,
    assemblyPrice: 250,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TV_STAND",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "ENTERTAINMENT_CENTER_LARGE",
    id: "7648",
    marquee: false,
    name: "Entertainment Center - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "entertainment_center_-_large",
    subtext: "A large Entertainment center would be a a TV stand or unit less than 4 feet wide and 6 feet tall. Price is per piece"
  },
  {
    aliases: [
      "tv",
      "center",
      "entertainment",
      "stand"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TV_STAND",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "ENTERTAINMENT_CENTER_SMALL",
    id: "7557",
    marquee: false,
    name: "Entertainment Center - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "entertainment_center_-_small",
    subtext: "A Small Entertainment center would be a a TV stand or unit less than 4 feet wide and 4 feet tall."
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8055",
    marquee: false,
    name: "EVC04",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "evc04",
    subtext: "Cooler / Vending Machine - 124lbs	"
  },
  {
    aliases: [
      "stationary",
      "bicycle",
      "machine",
      "cycling",
      "Recumbent"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 45,
    icon: "GENERIC",
    id: "7745",
    marquee: false,
    name: "Exercise Bike",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "exercise_bike",
    subtext: ""
  },
  {
    aliases: [
      "door"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "EXTERIOR_DOOR",
    id: "7746",
    marquee: false,
    name: "Exterior Door",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "exterior_door",
    subtext: "Single Exterior Door - if you have a double door or french door, please choose quantity of 2"
  },
  {
    aliases: [
      "EZ",
      "Grub"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BENCH",
    id: "8012",
    marquee: false,
    name: "EZGrubBench",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "ezgrubbench",
    subtext: ""
  },
  {
    aliases: [
      "EZ",
      "Grub"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "CHEST",
    id: "8008",
    marquee: false,
    name: "EZGrubTub",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "ezgrubtub",
    subtext: "Chest with mini fridge inside"
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a Family Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a Family Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7830",
    marquee: false,
    name: "Family Room Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "family_room_cleanout",
    subtext: "All items in a Family Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 60,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 70,
    icon: "FILE_CABINET_2_OR_3_DRAWER",
    id: "7747",
    marquee: false,
    name: "File Cabinet - 2 or 3 drawer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "file_cabinet_-_2_or_3_drawer",
    subtext: "For a fire rated file cabinet, please choose a SAFE."
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "FILE_CABINET_4_OR_5_DRAWER",
    id: "7750",
    marquee: false,
    name: "File Cabinet - 4 or 5 drawer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "file_cabinet_-_4_or_5_drawer",
    subtext: "For a fire rated file cabinet, please choose a SAFE."
  },
  {
    aliases: [
      "file",
      "holder",
      "cupboard",
      "office",
      "organizer",
      "storage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "FILING_CABINET",
    id: "7751",
    marquee: false,
    name: "Filing Cabinet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "filing_cabinet",
    subtext: "For a fire rated file cabinet, please choose a SAFE."
  },
  {
    aliases: [
      "car",
      "jack",
      "floor"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "FLOOR_JACK",
    id: "7703",
    marquee: false,
    name: "Floor Jack",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "floor_jack",
    subtext: "Automotive Floor Jack"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 10,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "FOLDING_EVENT_CHAIR",
    id: "7580",
    marquee: false,
    name: "Folding Event Chairs",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 10,
    priority: 0,
    slug: "folding_event_chairs",
    subtext: "Small Folding event chairs that would be used in a wedding or outdoor venue"
  },
  {
    aliases: [
      "table",
      "soccer",
      "football",
      "game",
      "Tennis",
      "Hockey",
      "Foosball",
      "shuffleboard",
      "ping",
      "pong",
      "air",
      "poker"
    ],
    assemblyAllowed: true,
    assemblyPrice: 90,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "FOOSEBALL_TABLE",
    id: "7752",
    marquee: false,
    name: "Foosball or Residential Game Room Table Games",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "fooseball_table",
    subtext: "Includes residential size game room table games such as Foosball, Ping Pong, Shuffleboard, Table Tennis, Air Hockey, Poker Table"
  },
  {
    aliases: [
      "running",
      "board",
      "frame",
      "bed",
      "sleigh",
      "rice",
      "iron",
      "end",
      "post",
      "headboard",
      "mattress",
      "boxspring"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "FOOTBOARD",
    id: "7622",
    marquee: false,
    name: "Footboard",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 5,
    slug: "footboard",
    subtext: "Do you have a headboard or side rails too? Add those items above."
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 45,
    icon: "FREEZER_UPRIGHT",
    id: "7570",
    marquee: false,
    name: "Freezer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 55,
    priority: 0,
    slug: "freezer",
    subtext: "Freezer must be empty"
  },
  {
    aliases: [
      "deep",
      "freeze",
      "ice",
      "chest",
      "cooler",
      "meat",
      "locker",
      "cold",
      "storage",
      "frozen",
      "food",
      "frigidarium",
      "freezer"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "FREEZER_CHEST",
    id: "7989",
    marquee: false,
    name: "Freezer Chest",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "freezer_chest",
    subtext: "Freezer must be empty"
  },
  {
    aliases: [
      "freezer",
      "commercial"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 150,
    icon: "FREEZER_COMMERCIAL",
    id: "7988",
    marquee: false,
    name: "Freezer - Commercial Size",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 450,
    priority: 0,
    slug: "freezer_-_commercial_size",
    subtext: "Commercial kitchen or business freezer up to 48inch wide\n\nWill the doors need to be removed to remove the Freezer?  If so choose disassembly too!"
  },
  {
    aliases: [
      "freezer",
      "residential"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 45,
    icon: "FREEZER_UPRIGHT",
    id: "7987",
    marquee: false,
    name: "Freezer - Residential Upright",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 55,
    priority: 0,
    slug: "freezer_-_residential_upright",
    subtext: "Freezer must be empty"
  },
  {
    aliases: [
      "sofa",
      "folding",
      "bed",
      "convertible",
      "futon"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "FUTON",
    id: "7968",
    marquee: false,
    name: "Futon",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "futon",
    subtext: "Bed Frame includes the frame only. Please add headboard or footboard if you need those removed as well"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8049",
    marquee: false,
    name: "GDM-10",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "gdm-10",
    subtext: "Cooler / Vending Machine - 235 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8046",
    marquee: false,
    name: "GDM-12",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "gdm-12",
    subtext: "Cooler / Vending Machine - 195lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8054",
    marquee: false,
    name: "GDM-15",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "gdm-15",
    subtext: "Cooler / Vending Machine - 250 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8051",
    marquee: false,
    name: "GDM-23",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 225,
    priority: 0,
    slug: "gdm-23",
    subtext: "Cooler / Vending Machine - 355 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8052",
    marquee: false,
    name: "GDM-33",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "gdm-33",
    subtext: "Cooler / Vending Machine - 370 lbs"
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8053",
    marquee: false,
    name: "GDM-33 Mini",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "gdm-33_mini",
    subtext: "Cooler / Vending Machine - 360 lbs"
  },
  {
    aliases: [
      "Julia"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Please make sure your Generator is accessible, disconnected and not bolted to a floor prior to your scheduled pickup. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERATOR_PORTABLE",
    id: "7419",
    marquee: false,
    name: "Generator - Portable",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "generator_-_portable",
    subtext: "Generators are on wheels and easily rolled by a single person.  If it cannot be moved by one person or does not have wheels, please use Generator - Stationary"
  },
  {
    aliases: [
      "julia"
    ],
    assemblyAllowed: false,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "The generator must be fully disconnected prior to our teams arrival. ",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "GENERATOR_STATIONARY",
    id: "7537",
    marquee: false,
    name: "Generator - Stationary",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "generator_-_stationary",
    subtext: "Stationary Generators are non portable units with no wheels and weigh less than 600 pounds.  The generator must be fully disconnected prior to our teams arrival.  "
  },
  {
    aliases: [
      "gentleman",
      "chest",
      "dresser",
      "drawers"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7984",
    marquee: false,
    name: "Gentleman's Chest",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "gentlemans_chest",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GLIDER_ROCKING_CHAIR",
    id: "7583",
    marquee: false,
    name: "Glider - Rocking Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "glider_-_rocking_chair",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GLIDER_WITH_OTTOMAN_ROCKING_CHAIR",
    id: "7586",
    marquee: false,
    name: "Glider with Ottoman - Rocking Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "glider_with_ottoman_-_rocking_chair",
    subtext: ""
  },
  {
    aliases: [
      "irons",
      "wedges",
      "drivers",
      "putters",
      "putt-putt",
      "country",
      "clubs",
      "wood",
      "hybrid"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GOLF_CLUBS",
    id: "7344",
    marquee: false,
    name: "Golf Clubs",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "golf_clubs",
    subtext: ""
  },
  {
    aliases: [
      "roaster",
      "pit",
      "rotisserie",
      "charcoal",
      "bbq",
      "grill"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "GRILL",
    id: "7991",
    marquee: false,
    name: "Grill",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "grill",
    subtext: ""
  },
  {
    aliases: [
      "gas",
      "propane",
      "grill"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "GRILL_PROPANE",
    id: "7600",
    marquee: false,
    name: "Grill - Propane",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "grill_-_propane",
    subtext: "Propane Grills must be disconnected from gas plumbing prior to Loader arrival."
  },
  {
    aliases: [
      "bed",
      "frame",
      "end",
      "head",
      "post",
      "sleigh",
      "rice",
      "iron",
      "running",
      "headboard",
      "mattress",
      "boxspring"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "HEADBOARD",
    id: "7621",
    marquee: false,
    name: "Headboard",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 5,
    slug: "headboard",
    subtext: "Do you have a footboard or side rails too? Add those items above."
  },
  {
    aliases: [
      "baby",
      "chair",
      "feeding",
      "baby",
      "buggy",
      "carriage",
      "pushchair",
      "perambulator",
      "pram"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "HIGHCHAIR",
    id: "7753",
    marquee: false,
    name: "Highchair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "highchair",
    subtext: ""
  },
  {
    aliases: [
      "gym",
      "system",
      "boflex",
      "exercise",
      "machine",
      "weights",
      "press",
      "golds",
      "treadmill",
      "elliptical",
      "bike",
      "exercise"
    ],
    assemblyAllowed: false,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "HOME_GYM",
    id: "7331",
    marquee: false,
    name: "Home Gym",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "home_gym",
    subtext: ""
  },
  {
    aliases: [
      "range",
      "hood",
      "vent"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE_HOOD",
    id: "7999",
    marquee: false,
    name: "Hood",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "hood",
    subtext: "Hood for a range or cooktop"
  },
  {
    aliases: [
      "dresser",
      "drawers"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7981",
    marquee: false,
    name: "Horizontal Chest of Drawers",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "horizontal_chest_of_drawers",
    subtext: ""
  },
  {
    aliases: [
      "dresser",
      "chest",
      "drawers"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7983",
    marquee: false,
    name: "Horizontal Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "horizontal_dresser",
    subtext: ""
  },
  {
    aliases: [
      "Bed",
      "hospital",
      "therepy",
      "mattress",
      "medical"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "HOSPITAL_BED",
    id: "7817",
    marquee: false,
    name: "Hospital Bed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 450,
    priority: -1,
    slug: "hospital_bed",
    subtext: ""
  },
  {
    aliases: [
      "Jacuzzi",
      "plunge",
      "bath",
      "sauna",
      "whirlpool"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "HOT_TUB",
    id: "7934",
    marquee: false,
    name: "Hot tub",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 820,
    priority: -1,
    slug: "hot_tub",
    subtext: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup."
  },
  {
    aliases: [
      "hot",
      "tub",
      "hottub",
      "cover",
      "lid"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "HOT_TUB_COVER",
    id: "8009",
    marquee: false,
    name: "Hot Tub Cover",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: -1,
    slug: "hot_tub_cover",
    subtext: "The Cover on top of a hot tub"
  },
  {
    aliases: [
      "buffet",
      "cabinet",
      "china",
      "sideboard",
      "desk"
    ],
    assemblyAllowed: true,
    assemblyPrice: 60,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "HUTCH",
    id: "7638",
    marquee: false,
    name: "Hutch",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "hutch",
    subtext: "Desk Hutch - Each piece of the hutch counts as a single item.  For a 3 piece hutch, choose a quantity of 3"
  },
  {
    aliases: [
      "ice",
      "machine",
      "icemaching",
      "maker",
      "ice maker",
      "ice machine"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ICE_MACHINE",
    id: "7575",
    marquee: false,
    name: "Ice Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "ice_machine",
    subtext: "Commercial Ice Machine (Weight is over 30 pounds)"
  },
  {
    aliases: [
      "ice"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ICE_MAKER",
    id: "7990",
    marquee: false,
    name: "Ice Maker",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "ice_maker",
    subtext: "Residential Ice Machine / Maker"
  },
  {
    aliases: [
      "door"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "INTERIOR_DOOR",
    id: "7754",
    marquee: false,
    name: "Interior Door",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "interior_door",
    subtext: "Single Interior Door - if you have a double door or french door, please chose quantity of 2"
  },
  {
    aliases: [
      "laundry",
      "iron",
      "press"
    ],
    assemblyAllowed: true,
    assemblyPrice: 10,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "IRONING_BOARD",
    id: "7771",
    marquee: false,
    name: "Ironing Board",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "ironing_board",
    subtext: ""
  },
  {
    aliases: [
      "jack",
      "hammer",
      "jackhammer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "JACKHAMMER",
    id: "7704",
    marquee: false,
    name: "Jackhammer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "jackhammer",
    subtext: "Commercial Jack Hammer"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "10ft x 10ft x 5ft pile of random junk",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "10ft x 10ft x 5ft pile of random junk",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7527",
    marquee: false,
    name: "Junk Pile - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 600,
    priority: 0,
    slug: "junk_pile_-_large",
    subtext: "10ft x 10ft x 5ft pile of random junk"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "5ft x 5ft x 5ft pile of random junk",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "5ft x 5ft x 5ft pile of random junk",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7526",
    marquee: false,
    name: "Junk Pile - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 350,
    priority: 0,
    slug: "junk_pile_-_small",
    subtext: "5ft x 5ft x 5ft pile of random junk"
  },
  {
    aliases: [
      "piano",
      "keys",
      "claviature",
      "clavichord"
    ],
    assemblyAllowed: true,
    assemblyPrice: 15,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7417",
    marquee: false,
    name: "Keyboard - Electric",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "electric_keyboard",
    subtext: ""
  },
  {
    aliases: [
      "kid",
      "toy",
      "training",
      "wheel"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "KIDS_BIKE",
    id: "7308",
    marquee: false,
    name: "Kids Bike",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "kids_bike",
    subtext: "tricycle, push-bike"
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a 12ft x 14ft Kitchen, excluding appliances. Please select appliances separately.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a 12ft x 14ft Kitchen, excluding appliances. Please select appliances separately.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "8064",
    marquee: false,
    name: "Kitchen Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 350,
    priority: 0,
    slug: "kitchen_cleanout",
    subtext: "All items in a 12ft x 14ft Kitchen, excluding appliances. Please select appliances separately.\n\nDue to the nature of this job, we\u2019ll review it after you book and may ask for more information if needed. If a price change is required, you\u2019ll be able to accept the new price or receive a refund."
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "Are you moving?  Please contact us at sales@goloadup.com for a moving quote",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "1 hour of labor for the Loader team. No refunds for partial-hour usage.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LABOR_HOUR",
    id: "7839",
    marquee: false,
    name: "Labor Hour",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 100,
    priority: 0,
    slug: "labor_hour",
    subtext: "1 hour of labor for the Loader team. Please describe how the labor will be used in the Special Instructions field. No refunds for partial-hour usage."
  },
  {
    aliases: [
      "folding",
      "loft",
      "roof",
      "step",
      "rope",
      "fire",
      "escape"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LADDER",
    id: "7346",
    marquee: false,
    name: "Ladder",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "ladder",
    subtext: ""
  },
  {
    aliases: [
      "light",
      "flash",
      "lantern",
      "bedside",
      "desk",
      "floor",
      "table"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LAMP",
    id: "7313",
    marquee: false,
    name: "Lamp",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "lamp",
    subtext: ""
  },
  {
    aliases: [
      "snow",
      "water",
      "wakeboard",
      "snowboard",
      "kneeboard",
      "funboard",
      "longboard",
      "boogieboard",
      "short",
      "board",
      "Skis",
      "Kayak",
      "Paddleboard",
      "Surfboard",
      "Canoe",
      "Basketball",
      "goal",
      "camping",
      "gear",
      "climb",
      "cimbing",
      "soccer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LARGE_SPORTS_EQUIPMENT",
    id: "7360",
    marquee: false,
    name: "Large Sports Equipment",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "large_sports_equipment",
    subtext: "kayak, skis, wakeboard, snowboard, canoe, paddleboards"
  },
  {
    aliases: [
      "glass",
      "wall",
      "full",
      "length",
      "art",
      "poster",
      "framed",
      "art",
      "mirror",
      "picture",
      "frame"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LARGE_WALL_DECOR",
    id: "7347",
    marquee: false,
    name: "Large Wall Decor",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "large_wall_decor",
    subtext: "a large picture frame, framed art, mirror "
  },
  {
    aliases: [
      "mower",
      "cutter",
      "grass",
      "yard",
      "push",
      "lawn"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LAWNMOWER_PUSH",
    id: "7377",
    marquee: false,
    name: "Lawnmower - Push",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "lawnmower_push",
    subtext: "All fluids must be drained prior to removal."
  },
  {
    aliases: [
      "mower",
      "cutter",
      "grass",
      "yard",
      "riding",
      "lawn"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LAWNMOWER_RIDING",
    id: "7378",
    marquee: false,
    name: "Lawnmower - Riding",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "lawnmower_riding",
    subtext: "All fluids must be drained prior to removal."
  },
  {
    aliases: [
      "leaf",
      "blower",
      "leafblower"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7705",
    marquee: false,
    name: "Leafblower",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "leafblower",
    subtext: "Handheld or backpack leaf blower"
  },
  {
    aliases: [
      "sheet",
      "bed",
      "shams",
      "comforter",
      "duvet",
      "cover",
      "coverlet",
      "blanket",
      "fitted",
      "flat",
      "bedding",
      "pillowcase",
      "quilt",
      "down",
      "feather",
      "bottom",
      "skirt",
      "dust",
      "ruffle",
      "valance",
      "throw"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LINENS",
    id: "7379",
    marquee: false,
    name: "Linens",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 5,
    priority: 0,
    slug: "linens",
    subtext: "Please note the items must be bagged or boxed."
  },
  {
    aliases: [
      "dresser",
      "chest",
      "lingerie"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7982",
    marquee: false,
    name: "Lingerie Chest",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "lingerie_chest",
    subtext: ""
  },
  {
    aliases: [
      "cleanout"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "All items in a Living Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "All items in a Living Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7828",
    marquee: false,
    name: "Living Room Cleanout",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "living_room_cleanout",
    subtext: "All items in a Living Room\n\nThe job requested requires a custom price. Contact our sales team at 770-800-3302 or email us at sales@goloadup.com so a consultant can provide you with a Guaranteed Upfront price. "
  },
  {
    aliases: [
      "setee",
      "couch",
      "two-seater",
      "courting",
      "chesterfield",
      "window",
      "seat",
      "recliner",
      "reclining",
      "power",
      "sofa",
      "loveseat"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "LOVESEAT_RECLINING",
    id: "7967",
    marquee: false,
    name: "Loveseat - Reclining",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "loveseat_reclining",
    subtext: ""
  },
  {
    aliases: [
      "duffle",
      "bag",
      "case",
      "travel",
      "baggage",
      "gear",
      "overnight",
      "trunk",
      "carryon",
      "carry",
      "on",
      "tote",
      "backpack",
      "pack",
      "hanging",
      "satchel",
      "grip",
      "portmanteau",
      "valise",
      "suitcase"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "LUGGAGE",
    id: "7380",
    marquee: false,
    name: "Luggage",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "luggage",
    subtext: "Each piece of luggage is counted as a separate item."
  },
  {
    aliases: [
      "table",
      "concrete",
      "marble",
      "stone",
      "granite",
      "quartz",
      "Kathy"
    ],
    assemblyAllowed: true,
    assemblyPrice: 185,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "Marble, Stone or Concrete Table - if the legs must be removed, please choose disassembly as well.",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "MARBLE_CONCRETE_TABLE",
    id: "7566",
    marquee: false,
    name: "Marble/Concrete Table ",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 90,
    priority: 0,
    slug: "marble/concrete_table_",
    subtext: "Marble, Stone or Concrete Table - if the legs must be removed, please choose disassembly as well."
  },
  {
    aliases: [
      "Massage",
      "chair",
      "recliner",
      "rocker",
      "masage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MASSAGE_CHAIR",
    id: "7584",
    marquee: false,
    name: "Massage Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "massage_chair",
    subtext: ""
  },
  {
    aliases: [
      "twin",
      "queen",
      "king",
      "cal",
      "xl",
      "extra",
      "large",
      "full",
      "double",
      "single",
      "california"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestation.",
    disassemblyAllowed: false,
    disassemblyPrice: 30,
    icon: "MATTRESS",
    id: "7793",
    marquee: true,
    name: "Mattress",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: -1,
    slug: "mattress",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS",
    id: "7784",
    marquee: false,
    name: "Mattress Coil Set",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "mattress_coil_set",
    subtext: ""
  },
  {
    aliases: [
      "baby",
      "bed",
      "bassinet",
      "cradle",
      "mattress",
      "crib"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS_CRIB",
    id: "7943",
    marquee: false,
    name: "Mattress - Crib",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "mattress_crib",
    subtext: ""
  },
  {
    aliases: [
      "mattress",
      "full"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS",
    id: "7940",
    marquee: false,
    name: "Mattress - Full",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 8,
    slug: "mattress_-_full",
    subtext: ""
  },
  {
    aliases: [
      "mattress",
      "king",
      "cal"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS",
    id: "7942",
    marquee: false,
    name: "Mattress - King/Cal King",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 10,
    slug: "mattress_-_king/cal_king",
    subtext: ""
  },
  {
    aliases: [
      "mattress",
      "queen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations..",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS",
    id: "7947",
    marquee: false,
    name: "Mattress - Queen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 9,
    slug: "mattress_-_queen",
    subtext: ""
  },
  {
    aliases: [
      "pillow",
      "topper",
      "top",
      "pad",
      "cover",
      "mattress",
      "protector",
      "egg",
      "crate"
    ],
    assemblyAllowed: true,
    assemblyPrice: 15,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations.",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "MATTRESS_TOPPER",
    id: "7284",
    marquee: false,
    name: "Mattress Topper",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "mattress_topper",
    subtext: ""
  },
  {
    aliases: [
      "mattress",
      "twin"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "MATTRESS",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with bedbug or carpet bug infestations.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MATTRESS",
    id: "7941",
    marquee: false,
    name: "Mattress - Twin",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 7,
    slug: "mattress_-_twin",
    subtext: ""
  },
  {
    aliases: [
      "mammoth"
    ],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7407",
    marquee: false,
    name: "Medical Treatment Table",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "medical_treatment_table",
    subtext: ""
  },
  {
    aliases: [
      "conventional",
      "oven",
      "toaster",
      "toaster",
      "convection"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7381",
    marquee: false,
    name: "Microwave",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "microwave",
    subtext: ""
  },
  {
    aliases: [
      "AIT"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7286",
    marquee: false,
    name: "Mileage",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 3,
    priority: 0,
    slug: "mileage",
    subtext: "Mileage for Loader Travel"
  },
  {
    aliases: [
      "Wall",
      "floor",
      "hanging"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "MIRROR",
    id: "7718",
    marquee: false,
    name: "Mirror",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "mirror",
    subtext: ""
  },
  {
    aliases: [
      "mirror",
      "dresser"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "DRESSER",
    id: "7283",
    marquee: false,
    name: "Mirror - Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "mirror_-_dresser",
    subtext: "If you have a dresser too, please choose that item as well."
  },
  {
    aliases: [
      "shovel",
      "hoe",
      "gloves",
      "spade",
      "planter",
      "rake",
      "pots",
      "plants",
      "shears",
      "gardening",
      "forks",
      "trowels",
      "pruners",
      "watering",
      "can",
      "hose",
      "water",
      "post",
      "hole",
      "digger",
      "loppers",
      "axe"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_GARDEN_EQUIPMENT_SMALL",
    id: "7357",
    marquee: false,
    name: "Miscellaneous Garden Equipment - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 10,
    priority: 0,
    slug: "miscellaneous_garden_equipment_small",
    subtext: "shovel, axe, hoe, gloves, rake"
  },
  {
    aliases: [
      "art",
      "poster",
      "framed",
      "small",
      "picture",
      "frame",
      "knick",
      "knacks"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_HOME_DECOR",
    id: "7362",
    marquee: false,
    name: "Miscellaneous Home Decor",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_home_decor",
    subtext: "picture frames, knick knacks, books"
  },
  {
    aliases: [
      "electric",
      "tools",
      "drill",
      "saw",
      "sander",
      "nail",
      "gun",
      "air",
      "compressors",
      "inflators",
      "planers",
      "routers",
      "impact",
      "wrenches",
      "lathes",
      "presses"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_POWER_TOOLS",
    id: "7358",
    marquee: false,
    name: "Miscellaneous Power Tools",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_power_tools",
    subtext: "drill, saw, sander, nail gun"
  },
  {
    aliases: [
      "DVD",
      "player",
      "video",
      "camera",
      "computer",
      "desktop",
      "printer",
      "air",
      "purifier",
      "monitor",
      "radio",
      "small",
      "fan",
      "vcr",
      "movie",
      "blue-ray",
      "disc",
      "digital",
      "camcorder",
      "screendisplay",
      "pc",
      "laptop",
      "desktop",
      "mac",
      "macbook",
      "cpu",
      "notebook",
      "typewriter",
      "transmitter",
      "boombox",
      "record",
      "recorder",
      "hi-fi",
      "transistor",
      "transmission",
      "wireless",
      "AM-FM",
      "CB",
      "tuner",
      "cd",
      "cassette",
      "tape",
      "deck",
      "audio",
      "system",
      "deck",
      "CD",
      "personal",
      "radio",
      "sound",
      "component",
      "set",
      "console",
      "high-fidelity",
      "PA",
      "sound",
      "board",
      "speakers",
      "ventilator",
      "window",
      "cleaner",
      "filter"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_SMALL_ELECTRONICS",
    id: "7363",
    marquee: false,
    name: "Miscellaneous Small Electronics",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_small_electronics",
    subtext: "computer, dvd player, radio"
  },
  {
    aliases: [
      "free",
      "weights",
      "yoga",
      "matt",
      "ball",
      "stretch",
      "resistance",
      "bands",
      "loops",
      "medicine",
      "dumbbell",
      "bell",
      "kettle",
      "roller",
      "mat",
      "jump",
      "rope",
      "cuff",
      "kettlebell",
      "strap",
      "step",
      "riser",
      "slide",
      "board",
      "personal",
      "trampoline"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_EXERCISE_EQUIPMENT",
    id: "7356",
    marquee: false,
    name: "Miscellaneous Small Exercise Equipment",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "miscellaneous_exercise_equipment",
    subtext: "free weights, yoga mats, kettlebells"
  },
  {
    aliases: [
      "bullet",
      "can",
      "opener",
      "icecream",
      "ice",
      "bread",
      "wok",
      "crock",
      "pot",
      "toaster",
      "maker"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_KITCHEN_APPLIANCES",
    id: "7354",
    marquee: false,
    name: "Miscellaneous Small Kitchen Appliances",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_kitchen_appliances",
    subtext: ""
  },
  {
    aliases: [
      "balls",
      "bats",
      "tee",
      "baseball",
      "base",
      "glove",
      "hockey",
      "stick",
      "basketball",
      "football",
      "golf",
      "tennis",
      "racket"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_SPORTS_EQUIPMENT",
    id: "7361",
    marquee: false,
    name: "Miscellaneous Sports Equipment",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_sports_equipment",
    subtext: "balls, bats, gloves, Tennis racket"
  },
  {
    aliases: [
      "dolls",
      "legos",
      "stuffed",
      "animals",
      "blocks",
      "cars",
      "hot",
      "wheels",
      "toys"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_TOYS",
    id: "7355",
    marquee: false,
    name: "Miscellaneous Toys",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "miscellaneous_toys",
    subtext: ""
  },
  {
    aliases: [
      "weed",
      "eater",
      "weedeater",
      "hedge",
      "trimmer",
      "edger",
      "chain",
      "saw",
      "chainsaw",
      "wheel",
      "barrow",
      "wheelbarrow",
      "blower",
      "snow",
      "snowblower",
      "leafblower"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_YARD_EQUIPMENT",
    id: "7821",
    marquee: false,
    name: "Miscellaneous Yard Equipment",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "miscellaneous_yard_equipment",
    subtext: "Includes hedge trimmers, edgers, weed eaters, chainsaws, and other similar sized items."
  },
  {
    aliases: [
      "Motorcycle",
      "dirt",
      "bike",
      "offroad"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MOTORCYCLE",
    id: "7382",
    marquee: false,
    name: "Motorcycle",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "motorcycle",
    subtext: ""
  },
  {
    aliases: [
      "moving"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7336",
    marquee: false,
    name: "Moving fee (within 15 miles)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 65,
    priority: 0,
    slug: "moving_fee_(within_15_miles)",
    subtext: "Moving fee for moving an item from one location to another, within 15 miles."
  },
  {
    aliases: [
      "wall",
      "bed",
      "cupboard",
      "closet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 200,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your items are accessible and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "MURPHY_BED",
    id: "7616",
    marquee: false,
    name: "Murphy Bed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "murphy_bed",
    subtext: ""
  },
  {
    aliases: [
      "guitar",
      "bass",
      "amp",
      "violin",
      "viola",
      "cello",
      "basson",
      "drums",
      "clarinet",
      "trumpet",
      "oboe",
      "saxophone",
      "trombone",
      "electric",
      "harmonica",
      "ukulele",
      "bagpipes",
      "accordion",
      "cymbol",
      "flute",
      "french",
      "horn",
      "gong",
      "harpsichord",
      "tamborine",
      "tuba",
      "xylophone"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MUSICAL_INSTRUMENTS",
    id: "7722",
    marquee: false,
    name: "Musical Instruments",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "musical_instruments",
    subtext: "Each item is counted separately.   If Piano, search and select the correct piano"
  },
  {
    aliases: [
      "nightstand",
      "table"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 15,
    icon: "NIGHTSTAND",
    id: "7824",
    marquee: false,
    name: "Nightstand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "nightstand",
    subtext: "end table, night stand"
  },
  {
    aliases: [
      "desk chair",
      "chair",
      "office chair"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your items are accessible and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "OFFICE_CHAIR",
    id: "7582",
    marquee: false,
    name: "Office Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "office_chair",
    subtext: "desk chair, office chair"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 350,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7409",
    marquee: false,
    name: "office phone booth",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "office_phone_booth",
    subtext: ""
  },
  {
    aliases: [
      "Advancing Eye Care",
      "advancing",
      "eye"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RECLINER",
    id: "7837",
    marquee: false,
    name: "Ophthalmic Chair ",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 90,
    priority: 0,
    slug: "ophthalmic_chair_",
    subtext: ""
  },
  {
    aliases: [
      "advancing eye care",
      "advancing",
      "eye"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7836",
    marquee: false,
    name: "Ophthalmic Instrument Stand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 90,
    priority: 0,
    slug: "ophthalmic_instrument_stand",
    subtext: ""
  },
  {
    aliases: [
      "tube",
      "organ",
      "keyboard",
      "church"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ELECTRIC_ORGAN",
    id: "7373",
    marquee: false,
    name: "Organ - Electric",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "electric_organ",
    subtext: ""
  },
  {
    aliases: [
      "footrest",
      "foot",
      "stool",
      "footstool",
      "pouffe",
      "pouf",
      "hassock"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "OTTOMAN",
    id: "7719",
    marquee: false,
    name: "Ottoman",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "ottoman",
    subtext: ""
  },
  {
    aliases: [
      "seating",
      "table",
      "lounger",
      "dining",
      "patio",
      "pool",
      "side"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "OUTDOOR_SEATING_SET",
    id: "7385",
    marquee: false,
    name: "Outdoor Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "outdoor_seating_set",
    subtext: "Each piece of furniture is counted separately."
  },
  {
    aliases: [
      "seating",
      "table",
      "lounger",
      "dining",
      "patio",
      "pool",
      "side",
      "fireplace"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "OUTDOOR_FIRE_PIT_SET",
    id: "7755",
    marquee: false,
    name: "Outdoor Fire Pit",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "outdoor_fire_pit_set",
    subtext: "Each item is counted separately."
  },
  {
    aliases: [
      "seating",
      "table",
      "lounger",
      "dining",
      "patio",
      "pool",
      "side"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "OUTDOOR_FURNITURE_SET",
    id: "7383",
    marquee: false,
    name: "Outdoor Furniture",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "outdoor_furniture_set",
    subtext: "Each piece of furniture is counted separately."
  },
  {
    aliases: [
      "outdoor",
      "sectional"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "OUTDOOR_FURNITURE_SECTIONAL",
    id: "7327",
    marquee: false,
    name: "Outdoor Furniture - Sectional",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 175,
    priority: 0,
    slug: "outdoor_furniture_-_sectional",
    subtext: ""
  },
  {
    aliases: [
      "seating",
      "table",
      "lounger",
      "dining",
      "patio",
      "pool",
      "side",
      "chaise"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "OUTDOOR_LOUNGE_SET",
    id: "7384",
    marquee: false,
    name: "Outdoor Lounge Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "outdoor_lounge_set",
    subtext: "Each piece of furniture is counted separately."
  },
  {
    aliases: [
      "oven",
      "range",
      "stove"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are disconnected and removed from the cabinetry prior to your scheduled pickup",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "OVEN_DOUBLE_WALL_OVEN",
    id: "7607",
    marquee: false,
    name: "Oven - Double Wall Oven",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 80,
    priority: 0,
    slug: "oven_-_double_wall_oven",
    subtext: "Double wall oven"
  },
  {
    aliases: [
      "stove",
      "oven",
      "range"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are disconnected and removed from the cabinetry prior to your scheduled pickup",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "OVEN_KITCHEN",
    id: "7606",
    marquee: false,
    name: "Oven - Kitchen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "oven_-_kitchen",
    subtext: "Single Kitchen Oven"
  },
  {
    aliases: [
      "wood",
      "pallet"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WOOD_PALLET",
    id: "8059",
    marquee: false,
    name: "Oversized Wood Pallet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "oversized_wood_pallet",
    subtext: "Wood pallet up to 4ft x 8ft. Please contact our offices at sales@goloadup.com if larger than a flat 4ft x 8ft pallet."
  },
  {
    aliases: [
      "1",
      "paint",
      "gallon"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PAINT_1_GALLON_PAINT_CAN",
    id: "8065",
    marquee: false,
    name: "Paint - 1 Gallon Paint Can",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 12,
    priority: 0,
    slug: "paint_-_1_gallon_paint_can",
    subtext: "1 Gallon Paint Can - Latex paint only"
  },
  {
    aliases: [
      "5",
      "gallon",
      "paint",
      "bucket",
      "can"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "DISASSEMBLY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PAINT_5_GALLON_BUCKET",
    id: "7726",
    marquee: false,
    name: "Paint - 5 Gallon Bucket",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "paint_-_5_gallon_bucket",
    subtext: "5 Gallon Paint Bucket - Latex paint only"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PAPER_SHREDDER",
    id: "7386",
    marquee: false,
    name: "Paper Shredder",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "paper_shredder",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7337",
    marquee: false,
    name: "Peloton Exercise Bike",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 85,
    priority: 0,
    slug: "peloton_exercise_bike",
    subtext: "A Peloton Exercise Bike"
  },
  {
    aliases: [
      "keyboard",
      "musical",
      "instrument",
      "concert",
      "player",
      "spinet",
      "pianoforte"
    ],
    assemblyAllowed: false,
    assemblyPrice: 250,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "PIANO_BABY_GRAND",
    id: "7731",
    marquee: false,
    name: "Piano - Baby Grand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 450,
    priority: 0,
    slug: "piano_baby_grand",
    subtext: "Choose Disassembly if the piano requires the legs to be removed or otherwise disassembled."
  },
  {
    aliases: [
      "keyboard",
      "parlor",
      "grand",
      "musical",
      "instrument",
      "concert",
      "player",
      "spinet",
      "pianoforte"
    ],
    assemblyAllowed: true,
    assemblyPrice: 250,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "PIANO_GRAND",
    id: "7664",
    marquee: false,
    name: "Piano - Grand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "piano_grand",
    subtext: "Choose Disassembly if the piano requires the legs to be removed or otherwise disassembled."
  },
  {
    aliases: [
      "keyboard",
      "musical",
      "instrument",
      "concert",
      "player",
      "spinet",
      "pianoforte"
    ],
    assemblyAllowed: false,
    assemblyPrice: 360,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 100,
    icon: "PIANO_UPRIGHT",
    id: "7730",
    marquee: false,
    name: "Piano - Upright",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 375,
    priority: 0,
    slug: "piano_upright",
    subtext: "Choose Disassembly if the piano requires the legs to be removed or otherwise disassembled."
  },
  {
    aliases: [
      "Pilates",
      "Cadillac",
      "Reformer"
    ],
    assemblyAllowed: true,
    assemblyPrice: 320,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PILATES_MACHINE",
    id: "7850",
    marquee: false,
    name: "Pilates Cadillac Reformer",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "pilates_cadillac_reformer",
    subtext: ""
  },
  {
    aliases: [
      "pilates",
      "yoga",
      "stretch",
      "stretching",
      "exercise",
      "gym"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "PILATES_MACHINE",
    id: "7387",
    marquee: false,
    name: "Pilates Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "pilates_machine",
    subtext: "Pilates Exercise Machine"
  },
  {
    aliases: [
      "Pilates",
      "Reformer"
    ],
    assemblyAllowed: true,
    assemblyPrice: 170,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PILATES_MACHINE",
    id: "7848",
    marquee: false,
    name: "Pilates Reformer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "pilates_reformer",
    subtext: ""
  },
  {
    aliases: [
      "Pilates",
      "Reformer",
      "Tower"
    ],
    assemblyAllowed: true,
    assemblyPrice: 220,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PILATES_MACHINE",
    id: "7849",
    marquee: false,
    name: "Pilates Reformer with Tower",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "pilates_reformer_with_tower",
    subtext: ""
  },
  {
    aliases: [
      "cushion",
      "headrest",
      "throw",
      "sham",
      "queen",
      "king",
      "regular",
      "extra",
      "long",
      "body",
      "husband",
      "nursing"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PILLOW",
    id: "7388",
    marquee: false,
    name: "Pillow",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 10,
    priority: 0,
    slug: "pillow",
    subtext: ""
  },
  {
    aliases: [
      "pizza",
      "oven",
      "gozney",
      "dome",
      "outdoor",
      "grill"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "A small portable pizza over - Weighs less than 150 pounds",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PIZZA_OVEN_PORTABLE",
    id: "7405",
    marquee: false,
    name: "Pizza Oven - Portable",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "pizza_oven_-_portable",
    subtext: "A small portable pizza over - Weighs less than 150 pounds"
  },
  {
    aliases: [
      "gozney"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PIZZA_OVEN_STAND",
    id: "7738",
    marquee: false,
    name: "Pizza Oven Stand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "pizza_oven_stand",
    subtext: "A stand for a home Pizza Oven"
  },
  {
    aliases: [
      "playground",
      "swingset",
      "outdoor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 800,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Please call if any piece of a playground that is buried or cemented into the ground.  	Please upload a picture using the Manage My Order feature on your order confirmation email for confirmation of pricing.",
    disassemblyAllowed: true,
    disassemblyPrice: 200,
    icon: "PLAYGROUND",
    id: "7416",
    marquee: false,
    name: "Playground",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 500,
    priority: 0,
    slug: "playground",
    subtext: "A Playground consists of any large outdoor play structure consisting of slides, tower, climbing wall or swings"
  },
  {
    aliases: [
      "enclosure",
      "pen",
      "cage",
      "baby",
      "gate",
      "play yard",
      "yard"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PLAY_PEN",
    id: "7303",
    marquee: false,
    name: "Play Pen",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "play_pen",
    subtext: ""
  },
  {
    aliases: [
      "indoor",
      "swing set",
      "playskool",
      "swing",
      "slide",
      "tikes",
      "climber",
      "house",
      "little"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "PLAYSET_INDOOR",
    id: "7756",
    marquee: false,
    name: "Playset - Indoor",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "playset_indoor",
    subtext: ""
  },
  {
    aliases: [
      "Lectern",
      "reading",
      "stand",
      "music"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DESK",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PODIUM",
    id: "7637",
    marquee: false,
    name: "Podium",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "podium",
    subtext: ""
  },
  {
    aliases: [
      "Ram",
      "Game Room"
    ],
    assemblyAllowed: true,
    assemblyPrice: 160,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TABLE_CONFERENCE_ROOM_TABLE",
    id: "7844",
    marquee: false,
    name: "Poker Table",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "poker_table",
    subtext: ""
  },
  {
    aliases: [
      "billiard",
      "table",
      "snooker",
      "soccer",
      "football",
      "game",
      "Tennis",
      "Hockey",
      "Foosball",
      "shuffleboard",
      "ping",
      "pong",
      "poker"
    ],
    assemblyAllowed: true,
    assemblyPrice: 285,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 350,
    icon: "POOL_TABLE",
    id: "7936",
    marquee: false,
    name: "Pool Table or Commercial Game Room Table Games",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 350,
    priority: -1,
    slug: "pool_table",
    subtext: "Includes Pool tables or commercial size game room table games such as Foosball, Shuffleboard, Table Tennis, Air Hockey, ping pong, poker table"
  },
  {
    aliases: [
      "Grind",
      "portable",
      "basketball"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PORTABLE_BASKETBALL_SHOOTING_MACHINE",
    id: "7375",
    marquee: false,
    name: "Portable Basketball Shooting Machine",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "portable_basketball_shooting_machine",
    subtext: "Grind Portable Basketball Shooting Machine"
  },
  {
    aliases: [
      "powerwheel"
    ],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 100,
    icon: "POWER_RIDE_ON_TOY",
    id: "7758",
    marquee: false,
    name: "Power Ride On Toy",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "power_ride_on_toy",
    subtext: "Power Ride On Toy "
  },
  {
    aliases: [
      "fax machine",
      "copier",
      "scanner"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Free standing Commercial printer, copier, and/or scanner",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PRINTER_FREE_STANDING",
    id: "7725",
    marquee: false,
    name: "Printer - Free Standing",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "printer_free_standing",
    subtext: "Free standing Commercial printer, copier, and/or scanner"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7531",
    marquee: false,
    name: "	Proof of Disposal",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "	proof_of_disposal",
    subtext: "Please select this item if you are requesting a Proof of Disposal or Destruction"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7470",
    marquee: false,
    name: "Proof of Recycling - Appliances Only",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "proof_of_recycling_-_appliances_only",
    subtext: "Proof of Recycling - Appliances Only"
  },
  {
    aliases: [
      "propane",
      "tank"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "Due to the weight, LoadUp cannot remove a full or partially filled propane tank.  Please ensure it is empty and disconnected from the home prior to the Loaders arrival.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PROPANE_TANK_120_GALLON",
    id: "7602",
    marquee: false,
    name: "Propane Tank - 120 Gallon",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "propane_tank_-_120_gallon",
    subtext: "Please ensure the Propane tank is empty and fully disconnected from the home prior to the Loaders arrival.   "
  },
  {
    aliases: [
      "grill",
      "tank",
      "propane"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 15,
    icon: "PROPANE_TANK_GRILL_20LB",
    id: "7603",
    marquee: false,
    name: "Propane Tank - 20lb Grill Size",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "propane_tank_-_20lb_grill_size",
    subtext: "If you need us to disconnect the propane tank from the grill, please also select Disassembly"
  },
  {
    aliases: [
      "propane"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "PROPANE_TANK_250_GALLON_TANK",
    id: "7993",
    marquee: false,
    name: "Propane tank - 250+ Gallon Tank",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 1e3,
    priority: 0,
    slug: "propane_tank_-_250+_gallon_tank",
    subtext: "Please Contact our offices at (877) 615-6040 to discuss your 250+ gallon propane tank prior to placing your order - prices will vary depending on each individual situation"
  },
  {
    aliases: [
      "oven",
      "burner",
      "stove",
      "range"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7995",
    marquee: false,
    name: "Range",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "range",
    subtext: "Residential Range (stove)"
  },
  {
    aliases: [
      "oven",
      "burner",
      "cooktop",
      "stove",
      "commercial",
      "equipment",
      "kitchen",
      "range"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "RANGE_COMMERCIAL_SIZE",
    id: "7996",
    marquee: false,
    name: "Range - Commercial Size",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 120,
    priority: 0,
    slug: "range_commercial_size",
    subtext: "Commercial range/stove"
  },
  {
    aliases: [
      "range"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7994",
    marquee: false,
    name: "Range / Oven",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "range_oven",
    subtext: ""
  },
  {
    aliases: [
      "rocking",
      "chair",
      "glider",
      "swivel",
      "lift",
      "reclining",
      "power glider",
      "lift chair"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "RECLINER",
    id: "7441",
    marquee: false,
    name: "Recliner",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 55,
    priority: 0,
    slug: "recliner",
    subtext: ""
  },
  {
    aliases: [
      "recliner",
      "reclining sofa",
      "sofa",
      "couch",
      "sectional",
      "power"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "RECLINING_SOFA",
    id: "7440",
    marquee: false,
    name: "Reclining Sofa",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 95,
    priority: 0,
    slug: "reclining_sofa",
    subtext: ""
  },
  {
    aliases: [
      "matrix",
      "lifestyle"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7408",
    marquee: false,
    name: "Recumbent Exercise Cycle",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "recumbent_exercise_cycle",
    subtext: ""
  },
  {
    aliases: [
      "refrigerator"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "REFRIGERATOR_FULL_SIZE",
    id: "8002",
    marquee: false,
    name: "Refrigerator",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 60,
    priority: -1,
    slug: "refrigerator",
    subtext: ""
  },
  {
    aliases: [
      "fridge",
      "refrigerator",
      "cold",
      "box",
      "ice",
      "storage",
      "food",
      "equipment",
      "commercial",
      "kitchen"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup. ",
    disassemblyAllowed: true,
    disassemblyPrice: 150,
    icon: "REFRIGERATOR",
    id: "7549",
    marquee: false,
    name: "Refrigerator - Commercial Size",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 450,
    priority: 0,
    slug: "refrgerator_commercial_size",
    subtext: "Commercial kitchen or business Refrigerator up to 48inch wide\n\nWill the doors need to be removed to remove the Refrigerator?  If so choose disassembly too!"
  },
  {
    aliases: [
      "fridge",
      "refrigerator",
      "cold",
      "box",
      "ice",
      "storage",
      "food",
      "college",
      "dorm"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "REFRIGERATOR_MINI",
    id: "7568",
    marquee: false,
    name: "Refrigerator - Mini",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "refrigerator_mini",
    subtext: "Refrigerator must be empty"
  },
  {
    aliases: [
      "refrigerator",
      "residential"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup. ",
    disassemblyAllowed: true,
    disassemblyPrice: 150,
    icon: "REFRIGERATOR_FULL_SIZE",
    id: "8000",
    marquee: false,
    name: "Refrigerator - Residential built-In",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 275,
    priority: 0,
    slug: "refrigerator_-_residential_built-in",
    subtext: "Do you have a residential standard slide-in or is it less than 36 inches in width? Then choose Refrigerator - Residential Standard. Will the doors need removed to remove the refrigerator? If so choose disassembly too!"
  },
  {
    aliases: [
      "refrigerator",
      "residential"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup. ",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "REFRIGERATOR_FULL_SIZE",
    id: "8001",
    marquee: false,
    name: "Refrigerator - Residential Standard",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 60,
    priority: 0,
    slug: "refrigerator_-_residential_standard",
    subtext: "Do you have a built in or is it 36 inches or more in width? Then choose Refrigerator - Commercial size. Will the doors need removed to remove the refrigerator? If so choose disassembly too!"
  },
  {
    aliases: [
      "glide",
      "glider",
      "rock",
      "rocking",
      "chair"
    ],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "ROCKING_CHAIR",
    id: "7585",
    marquee: false,
    name: "Rocking chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "rocking_chair",
    subtext: "Rocking or Gliding chair"
  },
  {
    aliases: [
      "Row",
      "rowing",
      "exercise"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 150,
    icon: "ROWING_EXERCISE_MACHINE",
    id: "7759",
    marquee: false,
    name: "Rowing Exercise Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "rowing_exercise_machine",
    subtext: ""
  },
  {
    aliases: [
      "deposit",
      "box"
    ],
    assemblyAllowed: true,
    assemblyPrice: 600,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your items are accessible, open and not bolted to a floor or wall, ready to be moved prior to your scheduled pickup.\n",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "SAFE_LARGE",
    id: "8011",
    marquee: false,
    name: "Safe - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 600,
    priority: -1,
    slug: "safe_large",
    subtext: "For a safe larger than 500 pounds, please contact us at sales@goloadup.com for pricing."
  },
  {
    aliases: [
      "safe",
      "lockbox"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your items are accessible, open and not bolted to a floor or wall, ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SAFE_PERSONAL",
    id: "7535",
    marquee: false,
    name: "Safe - Personal",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "safe_-_personal",
    subtext: "A personal safe is less than 18 inches long, 12 inches tall, 12 inches wide and weighs less than 100 pounds"
  },
  {
    aliases: [
      "safe",
      "gun",
      "lockbox"
    ],
    assemblyAllowed: true,
    assemblyPrice: 300,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to make structural changes in order to remove items. Please make sure your items are accessible, open and not bolted to a floor or wall, ready to be moved prior to your scheduled pickup.\n\n",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SAFE_SMALL",
    id: "7533",
    marquee: false,
    name: "Safe - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 105,
    priority: 0,
    slug: "safe_-_small",
    subtext: "A small safe is less than 2 feet tall and weighs less than 150 pounds"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CHAIR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GLIDER_ROCKING_CHAIR",
    id: "7639",
    marquee: false,
    name: "Salon Chair",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "salon_chair",
    subtext: ""
  },
  {
    aliases: [
      "sandpit",
      "sandpile",
      "plaything"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "SANDBOX_PLASTIC",
    id: "7760",
    marquee: false,
    name: "Sandbox - Plastic",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "sandbox_plastic",
    subtext: "Sandbox only, sand itself is not included "
  },
  {
    aliases: [
      "sandpit",
      "sandpile",
      "plaything"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "SANDBOX_WOODEN",
    id: "7761",
    marquee: false,
    name: "Sandbox - Wooden",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 45,
    priority: 0,
    slug: "sandbox_wooden",
    subtext: "Sandbox only, sand itself is not included "
  },
  {
    aliases: [
      "dish",
      "sat",
      "satellite"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SATELLITE_DISH_SMALL",
    id: "7376",
    marquee: false,
    name: "Satellite Dish - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "satellite_dish_-_small",
    subtext: "The Satellite dish must be removed and disconnected prior to the Loaders arrival"
  },
  {
    aliases: [
      "finnish",
      "jacuzzi",
      "japanese",
      "russian",
      "scandinavian",
      "steam",
      "swedish",
      "turkish",
      "hummum",
      "plunge",
      "bath",
      "room",
      "sweat",
      "wellness",
      "Komowa"
    ],
    assemblyAllowed: true,
    assemblyPrice: 800,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SAUNA",
    id: "7937",
    marquee: false,
    name: "Sauna",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 650,
    priority: -1,
    slug: "sauna",
    subtext: ""
  },
  {
    aliases: [
      "measure",
      "measurement",
      "weighing",
      "machine"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SCALE",
    id: "7389",
    marquee: false,
    name: "Scale",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "scale",
    subtext: "Residential floor scale"
  },
  {
    aliases: [
      "couch",
      "compartmental",
      "divided",
      "segmented",
      "love",
      "seat",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SECTIONAL_SOFA",
    id: "7973",
    marquee: false,
    name: "Sectional Sofa - 2 pieces",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "sectional_sofa",
    subtext: "Does your sectional include recliners or a sleeper?  Then look up Sectional - With built in Recliner or Sectional - with built in sleeper bed"
  },
  {
    aliases: [
      "couch",
      "compartmental",
      "divided",
      "segmented",
      "love",
      "seat",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SECTIONAL_SOFA_THREE",
    id: "7972",
    marquee: false,
    name: "Sectional Sofa - 3 pieces",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "sectional_sofa_three",
    subtext: "Does your sectional include recliners or a sleeper?  Then look up Sectional - With built in Recliner or Sectional - with built in sleeper bed"
  },
  {
    aliases: [
      "couch",
      "compartmental",
      "divided",
      "segmented",
      "love",
      "seat",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SECTIONAL_SOFA_FOUR",
    id: "7975",
    marquee: false,
    name: "Sectional Sofa - 4 pieces",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 125,
    priority: 0,
    slug: "sectional_sofa_four",
    subtext: "Does your sectional include recliners or a sleeper?  Then look up Sectional - With built in Recliner or Sectional - with built in sleeper bed"
  },
  {
    aliases: [
      "couch",
      "compartmental",
      "divided",
      "segmented",
      "love",
      "seat",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SECTIONAL_SOFA_FIVE",
    id: "7974",
    marquee: false,
    name: "Sectional Sofa - 5 pieces",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "sectional_sofa_five",
    subtext: "Does your sectional include recliners or a sleeper?  Then look up Sectional - With built in Recliner or Sectional - with built in sleeper bed"
  },
  {
    aliases: [
      "couch",
      "compartmental",
      "divided",
      "segmented",
      "love",
      "seat",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SECTIONAL_SOFA_SIX",
    id: "7969",
    marquee: false,
    name: "Sectional Sofa - 6+ pieces",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "sectional_sofa_six",
    subtext: "Does your sectional include recliners or a sleeper?  Then look up Sectional - With built in Recliner or Sectional - with built in sleeper bed"
  },
  {
    aliases: [
      "sofa",
      "recliner",
      "sectional",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "Disassembly charge may apply if the sectional cannot be removed without destruction to the item or home",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "COUCH",
    id: "7971",
    marquee: false,
    name: "Sectional - with built in Recliner",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 225,
    priority: 0,
    slug: "sectional_-_with_built_in_recliner",
    subtext: "Sectional Sofa with one or two built in recliners"
  },
  {
    aliases: [
      "Sofa",
      "sectional",
      "sleeper",
      "modular"
    ],
    assemblyAllowed: true,
    assemblyPrice: 90,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "Disassembly charge may apply if the sectional cannot be removed without destruction to the item or home",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "COUCH",
    id: "7970",
    marquee: false,
    name: "Sectional - with built in Sleeper",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "sectional_-_with_built_in_sleeper",
    subtext: "Sectional with built in sleeper."
  },
  {
    aliases: [
      "embroidering",
      "serger"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SEWING_MACHINE",
    id: "7390",
    marquee: false,
    name: "Sewing Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "sewing_machine",
    subtext: ""
  },
  {
    aliases: [
      "boots",
      "sandals",
      "tennis",
      "sneakers",
      "high",
      "heels",
      "flats",
      "clogs",
      "slippers",
      "flip",
      "flop",
      "dress",
      "slides",
      "pants",
      "dress",
      "shirt",
      "blouse",
      "sweater",
      "sweatshirt",
      "skirt"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7391",
    marquee: false,
    name: "Shoes and Clothing",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "shoes",
    subtext: "All items must be bagged or boxed."
  },
  {
    aliases: [
      "shower",
      "kit",
      "stall"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "The shower must be fully un-installed and removed from the wall, floor and plumbing prior to loader arrival.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SHOWER_KIT_STALL_DOUBLE",
    id: "7715",
    marquee: false,
    name: "Shower Kit / Stall - Double",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "shower_kit_/_stall_-_double",
    subtext: "36in x 60in double shower stall/kit "
  },
  {
    aliases: [
      "shower",
      "stall",
      "kit"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "The shower must be fully un-installed and removed from the wall, floor and plumbing prior to loader arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SHOWER_KIT_STALL_SINGLE",
    id: "7714",
    marquee: false,
    name: "Shower Kit / Stall - Single",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "shower_kit_/_stall_-_single",
    subtext: "Single 36in x 36in Shower Stall or Kit - for larger than 36in x 36in, see Shower Kit / Stall - Double"
  },
  {
    aliases: [
      "buffet",
      "cupboard",
      "console",
      "hallway",
      "furniture",
      "piece",
      "table",
      "Credenza"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 25,
    icon: "SIDEBOARD",
    id: "7564",
    marquee: false,
    name: "Sideboard",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "sideboard",
    subtext: ""
  },
  {
    aliases: [
      "hide",
      "a",
      "bed",
      "pull",
      "out",
      "couch",
      "sofabed",
      "reclining sofa",
      "power",
      "sectional",
      "recliner"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: true,
    disassemblyPrice: 40,
    icon: "SLEEPER_SOFA",
    id: "7413",
    marquee: false,
    name: "Sleeper Sofa",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 70,
    priority: 0,
    slug: "sleeper_sofa",
    subtext: ""
  },
  {
    aliases: [
      "chute"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SLIDE",
    id: "7314",
    marquee: false,
    name: "Slide",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "slide",
    subtext: ""
  },
  {
    aliases: [
      "slider",
      "sliding",
      "door"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Sliding door must be removed from the wall prior to loader arrival.  Loader cannot remove from the wall",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SLIDING_DOOR",
    id: "7710",
    marquee: false,
    name: "Sliding Door",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 90,
    priority: 0,
    slug: "sliding_door",
    subtext: "Including exterior and interior sliding doors and bathroom sliding doors"
  },
  {
    aliases: [
      "cupboard",
      "case",
      "kitchen",
      "corner",
      "locker",
      "cabinet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "CABINET",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible, and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "ARMOIRE",
    id: "7964",
    marquee: false,
    name: "Small Cabinet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "small_cabinet",
    subtext: "For a fire rated file cabinet, please choose a SAFE."
  },
  {
    aliases: [
      "roaster",
      "pit",
      "rotisserie",
      "charcoal",
      "bbq",
      "grill",
      "smoker"
    ],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "GRILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "SMOKER",
    id: "7992",
    marquee: false,
    name: "Smoker",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "smoker",
    subtext: "A Smoker Grill"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SNOW_BLOWER",
    id: "7707",
    marquee: false,
    name: "Snow Blower",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "snow_blower",
    subtext: ""
  },
  {
    aliases: [
      "sofabed",
      "tablebed",
      "install",
      "Inovabed"
    ],
    assemblyAllowed: true,
    assemblyPrice: 475,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COUCH",
    id: "7437",
    marquee: false,
    name: "Sofabed",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "sofabed",
    subtext: "Sofabed installation"
  },
  {
    aliases: [
      "audio",
      "speaker",
      "subwoofer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SPEAKERS",
    id: "7393",
    marquee: false,
    name: "Speakers",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "speakers",
    subtext: "Audio Speakers"
  },
  {
    aliases: [
      "clothes",
      "tumble",
      "dryer",
      "spin",
      "condenser",
      "drying",
      "machine",
      "laundry",
      "washer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "WASHER_DRYER",
    customerScheduleRequestVisible: true,
    detail: "A gas dryer must be disconnected from the gas line prior to our arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STACKABLE_WASHER_DRYER",
    id: "8006",
    marquee: false,
    name: "Stackable Washer and Dryer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 65,
    priority: 0,
    slug: "stackable_washer_dryer",
    subtext: "A gas dryer must be disconnected from the gas line prior to our arrival"
  },
  {
    aliases: [
      "exercise",
      "machine",
      "stairmaster",
      "stepper",
      "climber",
      "treadclimber",
      "boflex"
    ],
    assemblyAllowed: true,
    assemblyPrice: 45,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "Machine must be able to remove from the location with destruction or alteration of the building.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "STAIR_CLIMBING_MACHINE",
    id: "7774",
    marquee: false,
    name: "Stair Climbing Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 95,
    priority: 0,
    slug: "stair_climbing_machine",
    subtext: "stairmaster,treadclimber"
  },
  {
    aliases: [
      "laundry",
      "iron",
      "press"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STEAMER",
    id: "7394",
    marquee: false,
    name: "Steamer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "steamer",
    subtext: "Clothing Steamer"
  },
  {
    aliases: [
      "audio",
      "system",
      "cassette",
      "recorder",
      "CD",
      "player",
      "music",
      "centre",
      "center",
      "radio",
      "sound",
      "tape",
      "deck",
      "hi-fi",
      "component",
      "set",
      "console",
      "high-fidelity",
      "pa",
      "sound",
      "board"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STEREO_SYSTEM",
    id: "7395",
    marquee: false,
    name: "Stereo System",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "stereo_system",
    subtext: ""
  },
  {
    aliases: [
      "seat",
      "footrest",
      "footstool",
      "stool",
      "hassock",
      "bar",
      "ottoman"
    ],
    assemblyAllowed: true,
    assemblyPrice: 20,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to accept pickup of items with heavy contamination such as bedbug or carpet bug infestations, severe soiling, or items that are waterlogged. Please make sure your items are free of contamination and easily removed from your location. ",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STOOL",
    id: "7304",
    marquee: false,
    name: "Stool",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "stool",
    subtext: ""
  },
  {
    aliases: [
      "shed",
      "storage",
      "building",
      "outdoor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 300,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STORAGE_SHED",
    id: "7749",
    marquee: false,
    name: "Storage Shed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 1500,
    priority: 0,
    slug: "storage_shed",
    subtext: "Includes outdoor shed disassembly and removal for sheds up to 8ft x 10ft. \n"
  },
  {
    aliases: [
      "oven",
      "burner",
      "cook",
      "top",
      "range"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STOVE",
    id: "7998",
    marquee: false,
    name: "Stove",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "stove",
    subtext: "Residential home stove"
  },
  {
    aliases: [
      "baby",
      "chair",
      "feeding",
      "baby",
      "buggy",
      "carriage",
      "pushchair"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BABY_STROLLER",
    id: "7397",
    marquee: false,
    name: "Stroller",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "baby_stroller",
    subtext: ""
  },
  {
    aliases: [
      "swings",
      "playground",
      "equipment",
      "play",
      "ground",
      "glider"
    ],
    assemblyAllowed: true,
    assemblyPrice: 60,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SWINGS",
    id: "7320",
    marquee: false,
    name: "Swing(s)",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "swings",
    subtext: ""
  },
  {
    aliases: [
      "swings",
      "playground",
      "equipment",
      "playground"
    ],
    assemblyAllowed: false,
    assemblyPrice: 500,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "We cannot remove playsets that are cemented or buried in the ground. 	Please upload a picture using the Manage My Order feature on your order confirmation email for confirmation of pricing.",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "SWINGSET_MEDIUM",
    id: "7724",
    marquee: false,
    name: "Swingset - Medium",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "swingset_medium",
    subtext: 'A Swingset - Medium consists of only 2 swings and 1 small slide. If your set has a tower or more than 2 swings and 1 slide, please choose "Playground" instead.'
  },
  {
    aliases: [
      "table"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TABLE_DINING",
    id: "8004",
    marquee: false,
    name: "Table",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "table",
    subtext: ""
  },
  {
    aliases: [
      "tablebed",
      "sofabed",
      "install",
      "inovabed"
    ],
    assemblyAllowed: true,
    assemblyPrice: 425,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "COUCH",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "COUCH",
    id: "7438",
    marquee: false,
    name: "Tablebed",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "tablebed",
    subtext: "Tablebed installation"
  },
  {
    aliases: [
      "Coffee",
      "table",
      "coffeetable"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "COFFEE_TABLE",
    id: "7563",
    marquee: false,
    name: "Table - Coffee",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "table_-_coffee",
    subtext: ""
  },
  {
    aliases: [
      "conference",
      "room",
      "table",
      "office"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 35,
    icon: "TABLE_CONFERENCE_ROOM_TABLE",
    id: "7562",
    marquee: false,
    name: "Table - Conference Room Table",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "table_-_conference_room_table",
    subtext: "Conference Room Table"
  },
  {
    aliases: [
      "dining",
      "table",
      "folding table"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TABLE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "TABLE_DINING",
    id: "7561",
    marquee: false,
    name: "Table - Dining",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "table_-_dining",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TABLE_SAW",
    id: "7706",
    marquee: false,
    name: "Table Saw",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "table_saw",
    subtext: "Residential Table Saw"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "The Tanning Bed must be fully disconnected from the utilities and full accessible to be removed without alterations to the building.  Please note that if the bed top and bottom must be separated for it to be safely removed, please choose the disassembly option as well.",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "TANNING_BED",
    id: "7366",
    marquee: false,
    name: "Tanning Bed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "tanning_bed",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TELEVISION_FLAT_SCREEN_42IN_OR_LARGER_ICON",
    id: "7590",
    marquee: false,
    name: "Television",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: -1,
    slug: "television",
    subtext: ""
  },
  {
    aliases: [
      "TV",
      "Set",
      "Television",
      "monitor"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7593",
    marquee: false,
    name: "Television - Flat Screen - 25in or less",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "television_-_flat_screen_-_25in_or_less",
    subtext: "A Flat Screen Television with a 25in or less screen"
  },
  {
    aliases: [
      "TV",
      "television",
      "flatscreen",
      "monitor"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TELEVISION_FLAT_SCREEN_26IN_TO_42IN",
    id: "7594",
    marquee: false,
    name: "Television - Flat Screen - 26in to 42in",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "television_-_flat_screen_-_26in_to_42in",
    subtext: "A Flat Screen Television with a 26in to 42in screen"
  },
  {
    aliases: [
      "television",
      "tv",
      "flat",
      "screen",
      "flatscreen",
      "monitor"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TELEVISION_FLAT_SCREEN_42IN_OR_LARGER",
    id: "7591",
    marquee: false,
    name: "Television - Flat Screen - 42in or larger",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "television_-_flat_screen_-_42in_or_larger",
    subtext: "A Flat Screen Television with a 42in or larger screen"
  },
  {
    aliases: [
      "television",
      "tv",
      "projection"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TELEVISION_PROJECTION",
    id: "7592",
    marquee: false,
    name: "Television - Projection",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "television_-_projection",
    subtext: "A projection television"
  },
  {
    aliases: [
      "tv",
      "television",
      "tube"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TELEVISION_TUBE_25IN_OR_LARGER",
    id: "7596",
    marquee: false,
    name: "Television - Tube 25in or larger",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 275,
    priority: 0,
    slug: "television_-_tube_25in_or_larger",
    subtext: "A old Tube TV with a screen of 25in or more"
  },
  {
    aliases: [
      "TV",
      "television",
      "tube",
      "t.v."
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TELEVISION",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BAG_OF_JUNK",
    id: "7595",
    marquee: false,
    name: "Television - Tube 25in or under",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 125,
    priority: 0,
    slug: "television_-_tube_25in_or_under",
    subtext: "An old Tube TV with a 25in screen or less"
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7800",
    marquee: false,
    name: "Thor 15in Ice Maker",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_15in_ice_maker",
    subtext: "Thor 15in ice maker model # TIM1501"
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_KITCHEN_APPLIANCES",
    id: "7845",
    marquee: false,
    name: 'Thor 24" Built-in Microwave',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: 'thor_24"_built-in_microwave',
    subtext: ""
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7938",
    marquee: false,
    name: "Thor 24in Electric Range",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: "thor_24in_electric_range",
    subtext: ""
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 55,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "REFRIGERATOR_MINI",
    id: "7801",
    marquee: false,
    name: "Thor 24in Wine cooler",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_24in_wine_cooler",
    subtext: "Thor 24in Wine Cooler model # TWC24UL"
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7890",
    marquee: false,
    name: 'Thor 30" Cooktop',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: 'thor_30"_cooktop',
    subtext: "A 30 inch cooktop (no oven)"
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MISCELLANEOUS_KITCHEN_APPLIANCES",
    id: "7893",
    marquee: false,
    name: 'Thor 30" Drawer Microwave',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: 'thor_30"_drawer_microwave',
    subtext: "Built-In Drawer Microwave"
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 250,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7799",
    marquee: false,
    name: "Thor 30in Range",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_30in_range",
    subtext: "Thor model # LRG3001"
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 175,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "STOVE",
    id: "7797",
    marquee: false,
    name: "Thor 36in Electric Range",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_36in_electric_range",
    subtext: "Thor 36in Electric Range Model #TRE3601"
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 175,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "REFRIGERATOR_FULL_SIZE",
    id: "7775",
    marquee: false,
    name: "Thor 36in French Door Refrigerator",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_36in_french_door_refrigerator",
    subtext: "Thor Model # TRF3602"
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 275,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "RANGE",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7846",
    marquee: false,
    name: 'Thor 36" Range',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: 'thor_36"_range',
    subtext: '36" Gas Range'
  },
  {
    aliases: [
      "Thor",
      "Rangetop",
      "Cooktop"
    ],
    assemblyAllowed: true,
    assemblyPrice: 140,
    attributes: [
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "RANGE",
    id: "7851",
    marquee: false,
    name: 'Thor 36" Rangetop',
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: 'thor_36"_rangetop',
    subtext: "A 36 inch rangetop (no oven)\n\n"
  },
  {
    aliases: [
      "thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 125,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DISHWASHER",
    id: "7791",
    marquee: false,
    name: "Thor Dishwasher",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_dishwasher",
    subtext: ""
  },
  {
    aliases: [
      "Thor"
    ],
    assemblyAllowed: true,
    assemblyPrice: 200,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GAS_GRILL",
    id: "7798",
    marquee: false,
    name: "Thor Outdoor Grill and Cabinet",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: -1,
    slug: "thor_outdoor_grill_and_cabinet",
    subtext: "Thor Outdoor Grill and Cabinet model # MK03SS304"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: 'Non-Commercial Automotive Car or Pickup Truck tire - For offroad tires please see "Tire - Commercial"',
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TIRE",
    id: "7647",
    marquee: false,
    name: "Tire - Automotive",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "tire_-_automotive",
    subtext: "Non-Commercial Automotive Car or Pickup Truck tire"
  },
  {
    aliases: [
      "conventional",
      "oven",
      "toaster",
      "toaster",
      "convection"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOASTER_OVEN",
    id: "7398",
    marquee: false,
    name: "Toaster Oven",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 15,
    priority: 0,
    slug: "toaster_oven",
    subtext: ""
  },
  {
    aliases: [
      "latrine",
      "lavatory",
      "outhouse",
      "can",
      "commode",
      "john",
      "potty",
      "privy",
      "throne"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOILET",
    id: "7399",
    marquee: false,
    name: "Toilet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "toilet",
    subtext: "The toilet must be disconnected from all plumbing and the floor/wall prior to our arrival"
  },
  {
    aliases: [
      "tool",
      "bench",
      "toolbench"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOOL_BENCH",
    id: "7324",
    marquee: false,
    name: "Tool Bench",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "tool_bench",
    subtext: ""
  },
  {
    aliases: [
      "toolkit",
      "kit",
      "toolcase",
      "case",
      "tool",
      "toolset",
      "set",
      "chest",
      "storage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "GENERIC",
    id: "7762",
    marquee: false,
    name: "Toolbox - Freestanding",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "freestandin_toolbox",
    subtext: ""
  },
  {
    aliases: [
      "tool",
      "box",
      "toolbox",
      "rollaway"
    ],
    assemblyAllowed: true,
    assemblyPrice: 50,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOOLBOX_LARGE_ROLLING",
    id: "7319",
    marquee: false,
    name: "Toolbox - Large Rolling",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "toolbox_-_large_rolling",
    subtext: "Large rolling Tool box - Roll-a-way"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 25,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOOL_BOX_SMALL",
    id: "7305",
    marquee: false,
    name: "Tool Box - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "tool_box_-_small",
    subtext: "Small handheld tool box"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 40,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TOY_BOX",
    id: "7315",
    marquee: false,
    name: "Toy Box",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 25,
    priority: 0,
    slug: "toy_box",
    subtext: "Child's Toy Box must be empty of all contents"
  },
  {
    aliases: [
      "jumping",
      "outdoor",
      "gymnastic"
    ],
    assemblyAllowed: false,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "TRAMPOLINE",
    id: "7721",
    marquee: false,
    name: "Trampoline",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 140,
    priority: 0,
    slug: "trampoline",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 275,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TRAMPOLINE_JUMBO_ASSEMBLY",
    id: "7763",
    marquee: false,
    name: "Trampoline - Jumbo - Assembly",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: "trampoline_-_jumbo_-_assembly",
    subtext: "Choose this item to have our team assemble your new In the box jumbo sized (13ft or larger) trampoline at your home!"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 175,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TRAMPOLINE_LARGE_ASSEMBLY",
    id: "7764",
    marquee: false,
    name: "Trampoline - Large - Assembly",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: "trampoline_-_large_-_assembly",
    subtext: "Choose this item to have our team assemble your new In the box large sized (10ft to 12ft) trampoline at your home!"
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 135,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TRAMPOLINE_MEDIUM_ASSEMBLY",
    id: "7765",
    marquee: false,
    name: "Trampoline - Medium - Assembly",
    nonCatalogAvailable: false,
    pickupAllowed: false,
    pickupPrice: 0,
    priority: 0,
    slug: "trampoline_-_medium_-_assembly",
    subtext: "Choose this item to have our team assemble your new In the box medium sized (8ft or 9ft) trampoline at your home!"
  },
  {
    aliases: [
      "running",
      "machine",
      "folding",
      "treadmill",
      "exercise",
      "cardio"
    ],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "TREADMILL",
    id: "7766",
    marquee: true,
    name: "Treadmill",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 95,
    priority: 0,
    slug: "treadmill",
    subtext: "Residential folding treadmill - For a non-folding Treadmill please choose Treadmill - Commercial"
  },
  {
    aliases: [
      "commercial",
      "treadmill",
      "running",
      "machine",
      "exercise",
      "cardio",
      "norditrack",
      "nordictrack"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "TREADMILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "TREADMILL_COMMERCIAL",
    id: "7818",
    marquee: false,
    name: "Treadmill - Commercial",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 200,
    priority: 0,
    slug: "treadmill_commercial",
    subtext: "Non-Folding Treadmills are considered commercial."
  },
  {
    aliases: [
      "treadmill"
    ],
    assemblyAllowed: true,
    assemblyPrice: 85,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TREADMILL",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "TREADMILL",
    id: "7767",
    marquee: false,
    name: "Treadmill - Residential",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 95,
    priority: 0,
    slug: "treadmill_-_residential",
    subtext: "Folding treadmill only - For a non-folding Treadmill please choose Treadmill - Commercial"
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "BED_FRAME_SET",
    id: "7816",
    marquee: false,
    name: "trundle bed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "trundle_bed",
    subtext: "A trundle bed includes the upper and lower bed frames, headboard, and footboard. The mattresses, both upper and lower are sold separately"
  },
  {
    aliases: [
      "TV",
      "stand"
    ],
    assemblyAllowed: true,
    assemblyPrice: 65,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "TV_STAND",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 30,
    icon: "TV_STAND",
    id: "7559",
    marquee: false,
    name: "TV Stand",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "tv_stand",
    subtext: "TV stand"
  },
  {
    aliases: [
      "cleaner",
      "roomba",
      "dustbuster"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "VACUUM",
    id: "7400",
    marquee: false,
    name: "Vacuum",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "vacuum",
    subtext: ""
  },
  {
    aliases: [
      "bathroom",
      "sink",
      "counter",
      "pedestal",
      "powder",
      "room",
      "cabinet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 180,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: true,
    disassemblyPrice: 75,
    icon: "GENERIC",
    id: "7768",
    marquee: false,
    name: "Vanity - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: 0,
    slug: "large_vanity",
    subtext: ""
  },
  {
    aliases: [
      "bathroom",
      "sink",
      "counter",
      "pedestal",
      "powder",
      "room",
      "cabinet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "MEDIUM_VANITY",
    id: "7326",
    marquee: false,
    name: "Vanity - Medium",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "medium_vanity",
    subtext: "A single sink Bathroom vanity"
  },
  {
    aliases: [
      "bathroom",
      "sink",
      "counter",
      "pedestal",
      "powder",
      "room",
      "cabinet"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "SMALL_VANITY",
    id: "7325",
    marquee: false,
    name: "Vanity - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: 0,
    slug: "small_vanity",
    subtext: "A Makeup Vanity"
  },
  {
    aliases: [
      "vending",
      "machine"
    ],
    assemblyAllowed: true,
    assemblyPrice: 150,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 150,
    icon: "REFRIGERATOR_COMMERCIAL_SIZE",
    id: "8003",
    marquee: false,
    name: "Vending Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 275,
    priority: 0,
    slug: "vending_machine",
    subtext: ""
  },
  {
    aliases: [
      "dresser",
      "vertical",
      "chest"
    ],
    assemblyAllowed: true,
    assemblyPrice: 30,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7980",
    marquee: false,
    name: "Vertical Chest of Drawers",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "vertical_chest_of_drawers",
    subtext: ""
  },
  {
    aliases: [
      "dresser"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "DRESSER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "DRESSER",
    id: "7978",
    marquee: false,
    name: "Vertical Dresser",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 40,
    priority: 0,
    slug: "vertical_dresser",
    subtext: ""
  },
  {
    aliases: [
      "Novamex"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "REFRIGERATOR",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "8045",
    marquee: false,
    name: "VRO8",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "vro8",
    subtext: "Cooler / Vending Machine - 194lbs "
  },
  {
    aliases: [
      "washing",
      "machine",
      "laundry",
      "clothes",
      "washer"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "WASHER_DRYER",
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WASHER",
    id: "8005",
    marquee: false,
    name: "Washer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "washer",
    subtext: "Residential Clothes Washer"
  },
  {
    aliases: [
      "water",
      "bed",
      "waterbed"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "DISASSEMBLY",
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: "BED_FRAME",
    customerScheduleRequestVisible: true,
    detail: "All water must be drained and all electrical disconnected prior to our arrival",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WATERBED",
    id: "7615",
    marquee: false,
    name: "Waterbed",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 300,
    priority: 0,
    slug: "waterbed",
    subtext: "All water must be drained and all electrical disconnected prior to our arrival"
  },
  {
    aliases: [
      "water",
      "heater"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WATER_HEATER",
    id: "7723",
    marquee: false,
    name: "Water Heater",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 85,
    priority: 0,
    slug: "water_heater",
    subtext: "Residential - 80 gallon or less"
  },
  {
    aliases: [
      "Weed",
      "eater",
      "weedeater",
      "trimmer"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WEED_EATER_TRIMMER",
    id: "7728",
    marquee: false,
    name: "Weed Eater / Trimmer",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "weed_eater_/_trimmer",
    subtext: ""
  },
  {
    aliases: [
      "bench",
      "weight",
      "stand"
    ],
    assemblyAllowed: true,
    assemblyPrice: 35,
    attributes: [
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 20,
    icon: "WEIGHT_BENCH",
    id: "7769",
    marquee: false,
    name: "Weight Bench",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "weight_bench",
    subtext: ""
  },
  {
    aliases: [
      "bench",
      "weight",
      "stand",
      "set",
      "barbell",
      "plates",
      "discs",
      "weights",
      "dumbell"
    ],
    assemblyAllowed: true,
    assemblyPrice: 70,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 50,
    icon: "WEIGHT_BENCH_SET",
    id: "7770",
    marquee: false,
    name: "Weight Bench Set",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "weight_bench_set",
    subtext: ""
  },
  {
    aliases: [
      "bench",
      "weight",
      "stand",
      "set",
      "barbell",
      "plates",
      "discs",
      "weights",
      "dumbbell",
      "bowflex",
      "gym",
      "lifting",
      "station",
      "system",
      "home",
      "leg",
      "press"
    ],
    assemblyAllowed: false,
    assemblyPrice: 145,
    attributes: [
      "HEAVY",
      "HELPER_REQUIRED",
      "TOOLS"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: true,
    disassemblyPrice: 65,
    icon: "WEIGHT_MACHINE",
    id: "7657",
    marquee: false,
    name: "Weight Machine",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 100,
    priority: 0,
    slug: "weight_machine",
    subtext: ""
  },
  {
    aliases: [
      "cart",
      "wheel",
      "barrow"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7418",
    marquee: false,
    name: "Wheelbarrow",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 30,
    priority: 0,
    slug: "wheelbarrow",
    subtext: ""
  },
  {
    aliases: [
      "Wheelchair",
      "scooter"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WHEELCHAIR_MOTORIZED",
    id: "7348",
    marquee: false,
    name: "Wheelchair - Motorized",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 250,
    priority: 0,
    slug: "wheelchair_-_motorized",
    subtext: ""
  },
  {
    aliases: [],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WHEELCHAIR_NON_MOTORIZED",
    id: "7717",
    marquee: false,
    name: "WheelChair - non motorized",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 20,
    priority: 0,
    slug: "wheelchair_-_non_motorized",
    subtext: "Non-Motorized and non-electric Wheelchair"
  },
  {
    aliases: [
      "wine",
      "chiller",
      "box",
      "storage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_LARGE",
    id: "7573",
    marquee: false,
    name: "Wine Cooler - Large",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: 0,
    slug: "wine_cooler_large",
    subtext: ""
  },
  {
    aliases: [
      "wine",
      "chiller",
      "box",
      "storage"
    ],
    assemblyAllowed: true,
    assemblyPrice: 60,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: "FREEZER",
    customerScheduleRequestVisible: true,
    detail: "LoadUp is not able to disconnect utilities or make structural changes in order to remove items. Please make sure your items are unhooked, accessible,  and ready to be moved prior to your scheduled pickup.",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WINE_COOLER_SMALL",
    id: "7572",
    marquee: false,
    name: "Wine Cooler - Small",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 50,
    priority: 0,
    slug: "wine_cooler_small",
    subtext: "undercounter wine cooler"
  },
  {
    aliases: [
      "pallet",
      "base",
      "wood"
    ],
    assemblyAllowed: false,
    assemblyPrice: 0,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "WOOD_PALLET",
    id: "8060",
    marquee: false,
    name: "Wood Pallet",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 10,
    priority: 0,
    slug: "wood_pallet",
    subtext: 'flat 4ft x 4ft wood pallet. Use "Oversized wood pallet" if larger than 4x4.'
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 200,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7930",
    marquee: false,
    name: "Misc. Large Unlisted Item",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 150,
    priority: -1,
    slug: "misc._large_unlisted_item",
    subtext: "An item you do not find listed that is 100-150 pounds or largest dimension is smaller than 96 inches. "
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 100,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7929",
    marquee: false,
    name: "Misc. Medium Unlisted Item",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 75,
    priority: -1,
    slug: "misc._medium_unlisted_item",
    subtext: "An item you do not find listed that is 50-100 pounds or largest dimension is smaller than 48 inches."
  },
  {
    aliases: [],
    assemblyAllowed: true,
    assemblyPrice: 75,
    attributes: [
      "HELPER_REQUIRED"
    ],
    auxillaryText: "",
    category: null,
    customerScheduleRequestVisible: true,
    detail: "",
    disassemblyAllowed: false,
    disassemblyPrice: 0,
    icon: "GENERIC",
    id: "7931",
    marquee: false,
    name: "Misc. Small Unlisted Item",
    nonCatalogAvailable: false,
    pickupAllowed: true,
    pickupPrice: 35,
    priority: -1,
    slug: "misc._small_unlisted_item",
    subtext: "An item you do not find listed that is under 50 pounds or largest dimension is smaller than 24 inches. "
  }
];

// src/index.js
setCatalog(items_catalog_new_default);
var src_default = {
  async fetch(request, env2, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      // Adjust for Odoo domain in production
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    const url = new URL(request.url);
    try {
      if (request.method === "POST" && url.pathname === "/api/quote") {
        const body = await request.json();
        const { text, zipCode } = body;
        if (!text || !zipCode) {
          return new Response(JSON.stringify({ error: "Missing text or zipCode" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        const connectionString = env2.HYPERDRIVE.connectionString;
        const { resolvedItems, ambiguousItems } = await processRequest(text, connectionString);
        const itemsToPrice = resolvedItems.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }));
        const priceResult = await calculateTotalPrice(itemsToPrice, zipCode, items_catalog_new_default, connectionString);
        const finalUnresolved = [
          ...ambiguousItems,
          ...priceResult.unresolvedItems || []
        ];
        return new Response(JSON.stringify({
          total: priceResult.total,
          basePrice: priceResult.basePrice,
          itemSubtotal: priceResult.itemSubtotal,
          minimumPriceApplied: priceResult.minimumPriceApplied,
          outOfServiceArea: priceResult.outOfServiceArea,
          items: priceResult.items,
          unresolvedItems: finalUnresolved
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (request.method === "POST" && url.pathname === "/api/vision") {
        const body = await request.json();
        const { imageBase64, zipCode } = body;
        if (!imageBase64 || !zipCode) {
          return new Response(JSON.stringify({ error: "Missing imageBase64 or zipCode" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        if (!env2.OPENAI_API_KEY) {
          return new Response(JSON.stringify({ error: "Vision API not configured (Missing OPENAI_API_KEY)" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env2.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "You are an object detector for a junk removal company. List the bulky junk items you see in this image. Output ONLY a comma-separated list of items (e.g., 'refrigerator, 3 piece sectional couch, mattress'). Do not include conversational text, volume estimations, or prices."
              },
              {
                role: "user",
                content: [
                  {
                    type: "image_url",
                    image_url: {
                      url: imageBase64.startsWith("data:image") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 100
          })
        });
        if (!openAiResponse.ok) {
          const errorText = await openAiResponse.text();
          console.error("OpenAI Error:", errorText);
          return new Response(JSON.stringify({ error: "Failed to process image with Vision AI" }), {
            status: 502,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        const openAiData = await openAiResponse.json();
        const extractedText = openAiData.choices[0].message.content;
        const connectionString = env2.HYPERDRIVE.connectionString;
        const { resolvedItems, ambiguousItems } = await processRequest(extractedText, connectionString);
        const itemsToPrice = resolvedItems.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }));
        const priceResult = await calculateTotalPrice(itemsToPrice, zipCode, items_catalog_new_default, connectionString);
        const finalUnresolved = [
          ...ambiguousItems,
          ...priceResult.unresolvedItems || []
        ];
        return new Response(JSON.stringify({
          total: priceResult.total,
          basePrice: priceResult.basePrice,
          itemSubtotal: priceResult.itemSubtotal,
          minimumPriceApplied: priceResult.minimumPriceApplied,
          outOfServiceArea: priceResult.outOfServiceArea,
          items: priceResult.items,
          unresolvedItems: finalUnresolved,
          visionText: extractedText
          // Optional, useful for debugging/UI
        }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (err) {
      console.error("Worker Error:", err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-bjWShx/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default
];
var middleware_insertion_facade_default = src_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-bjWShx/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type2, init) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type2, init) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map

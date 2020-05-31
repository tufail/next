"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var next=_interopRequireWildcard(require("./"));var _eventSourcePolyfill=_interopRequireDefault(require("./dev/event-source-polyfill"));var _onDemandEntriesClient=_interopRequireDefault(require("./dev/on-demand-entries-client"));var _webpackHotMiddlewareClient=_interopRequireDefault(require("./dev/webpack-hot-middleware-client"));var _devBuildWatcher=_interopRequireDefault(require("./dev/dev-build-watcher"));var _prerenderIndicator=_interopRequireDefault(require("./dev/prerender-indicator"));var _fouc=require("./dev/fouc");/* globals import('./dev/noop'); */ // Temporary workaround for the issue described here:
// https://github.com/vercel/next.js/issues/3775#issuecomment-407438123
// The runtimeChunk doesn't have dynamic import handling code when there hasn't been a dynamic import
// The runtimeChunk can't hot reload itself currently to correct it when adding pages using on-demand-entries
// eslint-disable-next-line no-unused-expressions
import('./dev/noop');;// Support EventSource on Internet Explorer 11
if(!window.EventSource){window.EventSource=_eventSourcePolyfill.default;}const{__NEXT_DATA__:{assetPrefix}}=window;const prefix=assetPrefix||'';const webpackHMR=(0,_webpackHotMiddlewareClient.default)({assetPrefix:prefix});window.next=next;(0,next.default)({webpackHMR}).then(({emitter,renderCtx,render})=>{(0,_onDemandEntriesClient.default)({assetPrefix:prefix});if(process.env.__NEXT_BUILD_INDICATOR)(0,_devBuildWatcher.default)();if(process.env.__NEXT_PRERENDER_INDICATOR&&// disable by default in electron
!(typeof process!=='undefined'&&'electron'in process.versions)){(0,_prerenderIndicator.default)();}// delay rendering until after styles have been applied in development
(0,_fouc.displayContent)(()=>{render(renderCtx);});}).catch(err=>{console.error('Error was not caught',err);});
//# sourceMappingURL=next-dev.js.map
"use strict";exports.__esModule=true;exports.addBasePath=addBasePath;exports.delBasePath=delBasePath;exports.default=void 0;var _url2=require("url");var _mitt=_interopRequireDefault(require("../mitt"));var _utils=require("../utils");var _isDynamic=require("./utils/is-dynamic");var _routeMatcher=require("./utils/route-matcher");var _routeRegex=require("./utils/route-regex");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/* global __NEXT_DATA__ */ // tslint:disable:no-console
const basePath=process.env.__NEXT_ROUTER_BASEPATH||'';function addBasePath(path){return path.indexOf(basePath)!==0?basePath+path:path;}function delBasePath(path){return path.indexOf(basePath)===0?path.substr(basePath.length)||'/':path;}function toRoute(path){return path.replace(/\/$/,'')||'/';}const prepareRoute=path=>toRoute(!path||path==='/'?'/index':path);function fetchNextData(pathname,query,isServerRender,cb){let attempts=isServerRender?3:1;function getResponse(){return fetch((0,_utils.formatWithValidation)({pathname:addBasePath(// @ts-ignore __NEXT_DATA__
`/_next/data/${__NEXT_DATA__.buildId}${delBasePath(pathname)}.json`),query}),{// Cookies are required to be present for Next.js' SSG "Preview Mode".
// Cookies may also be required for `getServerSideProps`.
//
// > `fetch` won’t send cookies, unless you set the credentials init
// > option.
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//
// > For maximum browser compatibility when it comes to sending &
// > receiving cookies, always supply the `credentials: 'same-origin'`
// > option instead of relying on the default.
// https://github.com/github/fetch#caveats
credentials:'same-origin'}).then(res=>{if(!res.ok){if(--attempts>0&&res.status>=500){return getResponse();}throw new Error(`Failed to load static props`);}return res.json();});}return getResponse().then(data=>{return cb?cb(data):data;}).catch(err=>{// We should only trigger a server-side transition if this was caused
// on a client-side transition. Otherwise, we'd get into an infinite
// loop.
if(!isServerRender){;err.code='PAGE_LOAD_ERROR';}throw err;});}class Router{/**
   * Map of all components loaded in `Router`
   */ // Static Data Cache
constructor(_pathname,_query,_as2,{initialProps,pageLoader,App,wrapApp,Component,err,subscription,isFallback}){this.route=void 0;this.pathname=void 0;this.query=void 0;this.asPath=void 0;this.basePath=void 0;this.components=void 0;this.sdc={};this.sub=void 0;this.clc=void 0;this.pageLoader=void 0;this._bps=void 0;this.events=void 0;this._wrapApp=void 0;this.isSsr=void 0;this.isFallback=void 0;this.onPopState=e=>{if(!e.state){// We get state as undefined for two reasons.
//  1. With older safari (< 8) and older chrome (< 34)
//  2. When the URL changed with #
//
// In the both cases, we don't need to proceed and change the route.
// (as it's already changed)
// But we can simply replace the state with the new changes.
// Actually, for (1) we don't need to nothing. But it's hard to detect that event.
// So, doing the following for (1) does no harm.
const{pathname,query}=this;this.changeState('replaceState',(0,_utils.formatWithValidation)({pathname,query}),(0,_utils.getURL)());return;}// Make sure we don't re-render on initial load,
// can be caused by navigating back from an external site
if(e.state&&this.isSsr&&e.state.as===this.asPath&&(0,_url2.parse)(e.state.url).pathname===this.pathname){return;}// If the downstream application returns falsy, return.
// They will then be responsible for handling the event.
if(this._bps&&!this._bps(e.state)){return;}const{url,as,options}=e.state;if(process.env.NODE_ENV!=='production'){if(typeof url==='undefined'||typeof as==='undefined'){console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/vercel/next.js/popstate-state-empty');}}this.replace(url,as,options);};this._getStaticData=asPath=>{const pathname=prepareRoute((0,_url2.parse)(asPath).pathname);return process.env.NODE_ENV==='production'&&this.sdc[pathname]?Promise.resolve(this.sdc[pathname]):fetchNextData(pathname,null,this.isSsr,data=>this.sdc[pathname]=data);};this._getServerData=asPath=>{let{pathname,query}=(0,_url2.parse)(asPath,true);pathname=prepareRoute(pathname);return fetchNextData(pathname,query,this.isSsr);};// represents the current component key
this.route=toRoute(_pathname);// set up the component cache (by route keys)
this.components={};// We should not keep the cache, if there's an error
// Otherwise, this cause issues when when going back and
// come again to the errored page.
if(_pathname!=='/_error'){this.components[this.route]={Component,props:initialProps,err,__N_SSG:initialProps&&initialProps.__N_SSG,__N_SSP:initialProps&&initialProps.__N_SSP};}this.components['/_app']={Component:App};// Backwards compat for Router.router.events
// TODO: Should be remove the following major version as it was never documented
this.events=Router.events;this.pageLoader=pageLoader;this.pathname=_pathname;this.query=_query;// if auto prerendered and dynamic route wait to update asPath
// until after mount to prevent hydration mismatch
this.asPath=// @ts-ignore this is temporarily global (attached to window)
(0,_isDynamic.isDynamicRoute)(_pathname)&&__NEXT_DATA__.autoExport?_pathname:_as2;this.basePath=basePath;this.sub=subscription;this.clc=null;this._wrapApp=wrapApp;// make sure to ignore extra popState in safari on navigating
// back from external site
this.isSsr=true;this.isFallback=isFallback;if(typeof window!=='undefined'){// make sure "as" doesn't start with double slashes or else it can
// throw an error as it's considered invalid
if(_as2.substr(0,2)!=='//'){// in order for `e.state` to work on the `onpopstate` event
// we have to register the initial route upon initialization
this.changeState('replaceState',(0,_utils.formatWithValidation)({pathname:_pathname,query:_query}),_as2);}window.addEventListener('popstate',this.onPopState);}}// @deprecated backwards compatibility even though it's a private method.
static _rewriteUrlForNextExport(url){if(process.env.__NEXT_EXPORT_TRAILING_SLASH){const rewriteUrlForNextExport=require('./rewrite-url-for-export').rewriteUrlForNextExport;return rewriteUrlForNextExport(url);}else{return url;}}update(route,mod){const Component=mod.default||mod;const data=this.components[route];if(!data){throw new Error(`Cannot update unavailable route: ${route}`);}const newData=Object.assign({},data,{Component,__N_SSG:mod.__N_SSG,__N_SSP:mod.__N_SSP});this.components[route]=newData;// pages/_app.js updated
if(route==='/_app'){this.notify(this.components[this.route]);return;}if(route===this.route){this.notify(newData);}}reload(){window.location.reload();}/**
   * Go back in history
   */back(){window.history.back();}/**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */push(url,as=url,options={}){return this.change('pushState',url,as,options);}/**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */replace(url,as=url,options={}){return this.change('replaceState',url,as,options);}change(method,_url,_as,options){return new Promise((resolve,reject)=>{if(!options._h){this.isSsr=false;}// marking route changes as a navigation start entry
if(_utils.ST){performance.mark('routeChange');}// If url and as provided as an object representation,
// we'll format them into the string version here.
let url=typeof _url==='object'?(0,_utils.formatWithValidation)(_url):_url;let as=typeof _as==='object'?(0,_utils.formatWithValidation)(_as):_as;url=addBasePath(url);as=addBasePath(as);// Add the ending slash to the paths. So, we can serve the
// "<page>/index.html" directly for the SSR page.
if(process.env.__NEXT_EXPORT_TRAILING_SLASH){const rewriteUrlForNextExport=require('./rewrite-url-for-export').rewriteUrlForNextExport;// @ts-ignore this is temporarily global (attached to window)
if(__NEXT_DATA__.nextExport){as=rewriteUrlForNextExport(as);}}this.abortComponentLoad(as);// If the url change is only related to a hash change
// We should not proceed. We should only change the state.
// WARNING: `_h` is an internal option for handing Next.js client-side
// hydration. Your app should _never_ use this property. It may change at
// any time without notice.
if(!options._h&&this.onlyAHashChange(as)){this.asPath=as;Router.events.emit('hashChangeStart',as);this.changeState(method,url,as,options);this.scrollToHash(as);Router.events.emit('hashChangeComplete',as);return resolve(true);}const{pathname,query,protocol}=(0,_url2.parse)(url,true);if(!pathname||protocol){if(process.env.NODE_ENV!=='production'){throw new Error(`Invalid href passed to router: ${url} https://err.sh/vercel/next.js/invalid-href-passed`);}return resolve(false);}// If asked to change the current URL we should reload the current page
// (not location.reload() but reload getInitialProps and other Next.js stuffs)
// We also need to set the method = replaceState always
// as this should not go into the history (That's how browsers work)
// We should compare the new asPath to the current asPath, not the url
if(!this.urlIsNew(as)){method='replaceState';}const route=toRoute(pathname);const{shallow=false}=options;if((0,_isDynamic.isDynamicRoute)(route)){const{pathname:asPathname}=(0,_url2.parse)(as);const routeRegex=(0,_routeRegex.getRouteRegex)(route);const routeMatch=(0,_routeMatcher.getRouteMatcher)(routeRegex)(asPathname);if(!routeMatch){const missingParams=Object.keys(routeRegex.groups).filter(param=>!query[param]);if(missingParams.length>0){if(process.env.NODE_ENV!=='production'){console.warn(`Mismatching \`as\` and \`href\` failed to manually provide `+`the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);}return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `+`Read more: https://err.sh/vercel/next.js/incompatible-href-as`));}}else{// Merge params into `query`, overwriting any specified in search
Object.assign(query,routeMatch);}}Router.events.emit('routeChangeStart',as);// If shallow is true and the route exists in the router cache we reuse the previous result
this.getRouteInfo(route,pathname,query,as,shallow).then(routeInfo=>{const{error}=routeInfo;if(error&&error.cancelled){return resolve(false);}Router.events.emit('beforeHistoryChange',as);this.changeState(method,url,as,options);if(process.env.NODE_ENV!=='production'){const appComp=this.components['/_app'].Component;window.next.isPrerendered=appComp.getInitialProps===appComp.origGetInitialProps&&!routeInfo.Component.getInitialProps;}this.set(route,pathname,query,as,routeInfo).then(()=>{if(error){Router.events.emit('routeChangeError',error,as);throw error;}Router.events.emit('routeChangeComplete',as);return resolve(true);});},reject);});}changeState(method,url,as,options={}){if(process.env.NODE_ENV!=='production'){if(typeof window.history==='undefined'){console.error(`Warning: window.history is not available.`);return;}if(typeof window.history[method]==='undefined'){console.error(`Warning: window.history.${method} is not available`);return;}}if(method!=='pushState'||(0,_utils.getURL)()!==as){window.history[method]({url,as,options},// Most browsers currently ignores this parameter, although they may use it in the future.
// Passing the empty string here should be safe against future changes to the method.
// https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
'',as);}}getRouteInfo(route,pathname,query,as,shallow=false){const cachedRouteInfo=this.components[route];// If there is a shallow route transition possible
// If the route is already rendered on the screen.
if(shallow&&cachedRouteInfo&&this.route===route){return Promise.resolve(cachedRouteInfo);}const handleError=(err,loadErrorFail)=>{return new Promise(resolve=>{if(err.code==='PAGE_LOAD_ERROR'||loadErrorFail){// If we can't load the page it could be one of following reasons
//  1. Page doesn't exists
//  2. Page does exist in a different zone
//  3. Internal error while loading the page
// So, doing a hard reload is the proper way to deal with this.
window.location.href=as;// Changing the URL doesn't block executing the current code path.
// So, we need to mark it as a cancelled error and stop the routing logic.
err.cancelled=true;// @ts-ignore TODO: fix the control flow here
return resolve({error:err});}if(err.cancelled){// @ts-ignore TODO: fix the control flow here
return resolve({error:err});}resolve(this.fetchComponent('/_error').then(res=>{const{page:Component}=res;const routeInfo={Component,err};return new Promise(resolve=>{this.getInitialProps(Component,{err,pathname,query}).then(props=>{routeInfo.props=props;routeInfo.error=err;resolve(routeInfo);},gipErr=>{console.error('Error in error page `getInitialProps`: ',gipErr);routeInfo.error=err;routeInfo.props={};resolve(routeInfo);});});}).catch(err=>handleError(err,true)));});};return new Promise((resolve,reject)=>{if(cachedRouteInfo){return resolve(cachedRouteInfo);}this.fetchComponent(route).then(res=>resolve({Component:res.page,__N_SSG:res.mod.__N_SSG,__N_SSP:res.mod.__N_SSP}),reject);}).then(routeInfo=>{const{Component,__N_SSG,__N_SSP}=routeInfo;if(process.env.NODE_ENV!=='production'){const{isValidElementType}=require('react-is');if(!isValidElementType(Component)){throw new Error(`The default export is not a React Component in page: "${pathname}"`);}}return this._getData(()=>__N_SSG?this._getStaticData(as):__N_SSP?this._getServerData(as):this.getInitialProps(Component,// we provide AppTree later so this needs to be `any`
{pathname,query,asPath:as})).then(props=>{routeInfo.props=props;this.components[route]=routeInfo;return routeInfo;});}).catch(handleError);}set(route,pathname,query,as,data){this.isFallback=false;this.route=route;this.pathname=pathname;this.query=query;this.asPath=as;return this.notify(data);}/**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */beforePopState(cb){this._bps=cb;}onlyAHashChange(as){if(!this.asPath)return false;const[oldUrlNoHash,oldHash]=this.asPath.split('#');const[newUrlNoHash,newHash]=as.split('#');// Makes sure we scroll to the provided hash if the url/hash are the same
if(newHash&&oldUrlNoHash===newUrlNoHash&&oldHash===newHash){return true;}// If the urls are change, there's more than a hash change
if(oldUrlNoHash!==newUrlNoHash){return false;}// If the hash has changed, then it's a hash only change.
// This check is necessary to handle both the enter and
// leave hash === '' cases. The identity case falls through
// and is treated as a next reload.
return oldHash!==newHash;}scrollToHash(as){const[,hash]=as.split('#');// Scroll to top if the hash is just `#` with no value
if(hash===''){window.scrollTo(0,0);return;}// First we check if the element by id is found
const idEl=document.getElementById(hash);if(idEl){idEl.scrollIntoView();return;}// If there's no element with the id, we check the `name` property
// To mirror browsers
const nameEl=document.getElementsByName(hash)[0];if(nameEl){nameEl.scrollIntoView();}}urlIsNew(asPath){return this.asPath!==asPath;}/**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */prefetch(url,asPath=url,options={}){return new Promise((resolve,reject)=>{const{pathname,protocol}=(0,_url2.parse)(url);if(!pathname||protocol){if(process.env.NODE_ENV!=='production'){throw new Error(`Invalid href passed to router: ${url} https://err.sh/vercel/next.js/invalid-href-passed`);}return;}// Prefetch is not supported in development mode because it would trigger on-demand-entries
if(process.env.NODE_ENV!=='production'){return;}const route=delBasePath(toRoute(pathname));Promise.all([this.pageLoader.prefetchData(url,delBasePath(asPath)),this.pageLoader[options.priority?'loadPage':'prefetch'](route)]).then(()=>resolve(),reject);});}async fetchComponent(route){let cancelled=false;const cancel=this.clc=()=>{cancelled=true;};route=delBasePath(route);const componentResult=await this.pageLoader.loadPage(route);if(cancelled){const error=new Error(`Abort fetching component for route: "${route}"`);error.cancelled=true;throw error;}if(cancel===this.clc){this.clc=null;}return componentResult;}_getData(fn){let cancelled=false;const cancel=()=>{cancelled=true;};this.clc=cancel;return fn().then(data=>{if(cancel===this.clc){this.clc=null;}if(cancelled){const err=new Error('Loading initial props cancelled');err.cancelled=true;throw err;}return data;});}getInitialProps(Component,ctx){const{Component:App}=this.components['/_app'];const AppTree=this._wrapApp(App);ctx.AppTree=AppTree;return(0,_utils.loadGetInitialProps)(App,{AppTree,Component,router:this,ctx});}abortComponentLoad(as){if(this.clc){const e=new Error('Route Cancelled');e.cancelled=true;Router.events.emit('routeChangeError',e,as);this.clc();this.clc=null;}}notify(data){return this.sub(data,this.components['/_app'].Component);}}exports.default=Router;Router.events=(0,_mitt.default)();
//# sourceMappingURL=router.js.map
"use strict";exports.__esModule=true;exports.renderToHTML=renderToHTML;var _react=_interopRequireDefault(require("react"));var _server=require("react-dom/server");var _constants=require("../../lib/constants");var _isSerializableProps=require("../../lib/is-serializable-props");var _amp=require("../lib/amp");var _ampContext=require("../lib/amp-context");var _constants2=require("../lib/constants");var _head=_interopRequireWildcard(require("../lib/head"));var _loadable=_interopRequireDefault(require("../lib/loadable"));var _loadableContext=require("../lib/loadable-context");var _mitt=_interopRequireDefault(require("../lib/mitt"));var _routerContext=require("../lib/router-context");var _isDynamic=require("../lib/router/utils/is-dynamic");var _utils=require("../lib/utils");var _apiUtils=require("./api-utils");var _getPageFiles=require("./get-page-files");var _optimizeAmp=_interopRequireDefault(require("./optimize-amp"));function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function noRouter(){const message='No router instance found. you should only use "next/router" inside the client side of your app. https://err.sh/vercel/next.js/no-router-instance';throw new Error(message);}class ServerRouter{// TODO: Remove in the next major version, as this would mean the user is adding event listeners in server-side `render` method
constructor(pathname,query,as,{isFallback},basePath){this.route=void 0;this.pathname=void 0;this.query=void 0;this.asPath=void 0;this.basePath=void 0;this.events=void 0;this.isFallback=void 0;this.route=pathname.replace(/\/$/,'')||'/';this.pathname=pathname;this.query=query;this.asPath=as;this.isFallback=isFallback;this.basePath=basePath;}push(){noRouter();}replace(){noRouter();}reload(){noRouter();}back(){noRouter();}prefetch(){noRouter();}beforePopState(){noRouter();}}ServerRouter.events=(0,_mitt.default)();function enhanceComponents(options,App,Component){// For backwards compatibility
if(typeof options==='function'){return{App,Component:options(Component)};}return{App:options.enhanceApp?options.enhanceApp(App):App,Component:options.enhanceComponent?options.enhanceComponent(Component):Component};}function render(renderElementToString,element,ampMode){let html;let head;try{html=renderElementToString(element);}finally{head=_head.default.rewind()||(0,_head.defaultHead)((0,_amp.isInAmpMode)(ampMode));}return{html,head};}function renderDocument(Document,{props,docProps,pathname,query,buildId,canonicalBase,assetPrefix,runtimeConfig,nextExport,autoExport,isFallback,dynamicImportsIds,dangerousAsPath,err,dev,ampPath,ampState,inAmpMode,hybridAmp,staticMarkup,devFiles,files,lowPriorityFiles,polyfillFiles,dynamicImports,htmlProps,bodyTags,headTags,gsp,gssp,customServer,gip,appGip,unstable_runtimeJS}){return'<!DOCTYPE html>'+(0,_server.renderToStaticMarkup)(/*#__PURE__*/_react.default.createElement(_ampContext.AmpStateContext.Provider,{value:ampState},Document.renderDocument(Document,{__NEXT_DATA__:{props,// The result of getInitialProps
page:pathname,// The rendered page
query,// querystring parsed / passed by the user
buildId,// buildId is used to facilitate caching of page bundles, we send it to the client so that pageloader knows where to load bundles
assetPrefix:assetPrefix===''?undefined:assetPrefix,// send assetPrefix to the client side when configured, otherwise don't sent in the resulting HTML
runtimeConfig,// runtimeConfig if provided, otherwise don't sent in the resulting HTML
nextExport,// If this is a page exported by `next export`
autoExport,// If this is an auto exported page
isFallback,dynamicIds:dynamicImportsIds.length===0?undefined:dynamicImportsIds,err:err?serializeError(dev,err):undefined,// Error if one happened, otherwise don't sent in the resulting HTML
gsp,// whether the page is getStaticProps
gssp,// whether the page is getServerSideProps
customServer,// whether the user is using a custom server
gip,// whether the page has getInitialProps
appGip// whether the _app has getInitialProps
},dangerousAsPath,canonicalBase,ampPath,inAmpMode,isDevelopment:!!dev,hybridAmp,staticMarkup,devFiles,files,lowPriorityFiles,polyfillFiles,dynamicImports,assetPrefix,htmlProps,bodyTags,headTags,unstable_runtimeJS,...docProps})));}const invalidKeysMsg=(methodName,invalidKeys)=>{return`Additional keys were returned from \`${methodName}\`. Properties intended for your component must be nested under the \`props\` key, e.g.:`+`\n\n\treturn { props: { title: 'My Title', content: '...' } }`+`\n\nKeys that need to be moved: ${invalidKeys.join(', ')}.`+`\nRead more: https://err.sh/next.js/invalid-getstaticprops-value`;};async function renderToHTML(req,res,pathname,query,renderOpts){var _props;pathname=pathname==='/index'?'/':pathname;const{err,dev=false,staticMarkup=false,ampPath='',App,Document,pageConfig={},Component,buildManifest,reactLoadableManifest,ErrorDebug,getStaticProps,getStaticPaths,getServerSideProps,isDataReq,params,previewProps,basePath}=renderOpts;const callMiddleware=async(method,args,props=false)=>{let results=props?{}:[];if(Document[`${method}Middleware`]){let middlewareFunc=await Document[`${method}Middleware`];middlewareFunc=middlewareFunc.default||middlewareFunc;const curResults=await middlewareFunc(...args);if(props){for(const result of curResults){results={...results,...result};}}else{results=curResults;}}return results;};const headTags=(...args)=>callMiddleware('headTags',args);const bodyTags=(...args)=>callMiddleware('bodyTags',args);const htmlProps=(...args)=>callMiddleware('htmlProps',args,true);const didRewrite=req._nextDidRewrite;const isFallback=!!query.__nextFallback;delete query.__nextFallback;const isSSG=!!getStaticProps;const isBuildTimeSSG=isSSG&&renderOpts.nextExport;const defaultAppGetInitialProps=App.getInitialProps===App.origGetInitialProps;const hasPageGetInitialProps=!!Component.getInitialProps;const pageIsDynamic=(0,_isDynamic.isDynamicRoute)(pathname);const isAutoExport=!hasPageGetInitialProps&&defaultAppGetInitialProps&&!isSSG&&!getServerSideProps;for(const methodName of['getStaticProps','getServerSideProps','getStaticPaths']){if(Component[methodName]){throw new Error(`page ${pathname} ${methodName} ${_constants.GSSP_COMPONENT_MEMBER_ERROR}`);}}if(process.env.NODE_ENV!=='production'&&(isAutoExport||isFallback)&&pageIsDynamic&&didRewrite){// TODO: add err.sh when rewrites go stable
// Behavior might change before then (prefer SSR in this case).
// If we decide to ship rewrites to the client we could solve this
// by running over the rewrites and getting the params.
throw new Error(`Rewrites don't support${isFallback?' ':' auto-exported '}dynamic pages${isFallback?' with getStaticProps ':' '}yet. `+`Using this will cause the page to fail to parse the params on the client${isFallback?' for the fallback page ':''}`);}if(hasPageGetInitialProps&&isSSG){throw new Error(_constants.SSG_GET_INITIAL_PROPS_CONFLICT+` ${pathname}`);}if(hasPageGetInitialProps&&getServerSideProps){throw new Error(_constants.SERVER_PROPS_GET_INIT_PROPS_CONFLICT+` ${pathname}`);}if(getServerSideProps&&isSSG){throw new Error(_constants.SERVER_PROPS_SSG_CONFLICT+` ${pathname}`);}if(!!getStaticPaths&&!isSSG){throw new Error(`getStaticPaths was added without a getStaticProps in ${pathname}. Without getStaticProps, getStaticPaths does nothing`);}if(isSSG&&pageIsDynamic&&!getStaticPaths){throw new Error(`getStaticPaths is required for dynamic SSG pages and is missing for '${pathname}'.`+`\nRead more: https://err.sh/next.js/invalid-getstaticpaths-value`);}if(dev){const{isValidElementType}=require('react-is');if(!isValidElementType(Component)){throw new Error(`The default export is not a React Component in page: "${pathname}"`);}if(!isValidElementType(App)){throw new Error(`The default export is not a React Component in page: "/_app"`);}if(!isValidElementType(Document)){throw new Error(`The default export is not a React Component in page: "/_document"`);}if(isAutoExport){// remove query values except ones that will be set during export
query={amp:query.amp};req.url=pathname;renderOpts.nextExport=true;}if(pathname==='/404'&&(hasPageGetInitialProps||getServerSideProps)){throw new Error(_constants.PAGES_404_GET_INITIAL_PROPS_ERROR);}}if(isAutoExport)renderOpts.autoExport=true;if(isSSG)renderOpts.nextExport=false;await _loadable.default.preloadAll();// Make sure all dynamic imports are loaded
// url will always be set
const asPath=req.url;const router=new ServerRouter(pathname,query,asPath,{isFallback:isFallback},basePath);const ctx={err,req:isAutoExport?undefined:req,res:isAutoExport?undefined:res,pathname,query,asPath,AppTree:props=>{return/*#__PURE__*/_react.default.createElement(AppContainer,null,/*#__PURE__*/_react.default.createElement(App,Object.assign({},props,{Component:Component,router:router})));}};let props;const ampState={ampFirst:pageConfig.amp===true,hasQuery:Boolean(query.amp),hybrid:pageConfig.amp==='hybrid'};const reactLoadableModules=[];const AppContainer=({children})=>/*#__PURE__*/_react.default.createElement(_routerContext.RouterContext.Provider,{value:router},/*#__PURE__*/_react.default.createElement(_ampContext.AmpStateContext.Provider,{value:ampState},/*#__PURE__*/_react.default.createElement(_loadableContext.LoadableContext.Provider,{value:moduleName=>reactLoadableModules.push(moduleName)},children)));try{props=await(0,_utils.loadGetInitialProps)(App,{AppTree:ctx.AppTree,Component,router,ctx});if(isSSG){props[_constants2.STATIC_PROPS_ID]=true;}let previewData;if((isSSG||getServerSideProps)&&!isFallback){// Reads of this are cached on the `req` object, so this should resolve
// instantly. There's no need to pass this data down from a previous
// invoke, where we'd have to consider server & serverless.
previewData=(0,_apiUtils.tryGetPreviewData)(req,res,previewProps);}if(isSSG&&!isFallback){let data;try{data=await getStaticProps({...(pageIsDynamic?{params:query}:undefined),...(previewData!==false?{preview:true,previewData:previewData}:undefined)});}catch(err){// remove not found error code to prevent triggering legacy
// 404 rendering
if(err.code==='ENOENT'){delete err.code;}throw err;}const invalidKeys=Object.keys(data).filter(key=>key!=='unstable_revalidate'&&key!=='props');if(invalidKeys.includes('revalidate')){throw new Error(_constants.UNSTABLE_REVALIDATE_RENAME_ERROR);}if(invalidKeys.length){throw new Error(invalidKeysMsg('getStaticProps',invalidKeys));}if((dev||isBuildTimeSSG)&&!(0,_isSerializableProps.isSerializableProps)(pathname,'getStaticProps',data.props)){// this fn should throw an error instead of ever returning `false`
throw new Error('invariant: getStaticProps did not return valid props. Please report this.');}if(typeof data.unstable_revalidate==='number'){if(!Number.isInteger(data.unstable_revalidate)){throw new Error(`A page's revalidate option must be seconds expressed as a natural number. Mixed numbers, such as '${data.unstable_revalidate}', cannot be used.`+`\nTry changing the value to '${Math.ceil(data.unstable_revalidate)}' or using \`Math.ceil()\` if you're computing the value.`);}else if(data.unstable_revalidate<=0){throw new Error(`A page's revalidate option can not be less than or equal to zero. A revalidate option of zero means to revalidate after _every_ request, and implies stale data cannot be tolerated.`+`\n\nTo never revalidate, you can set revalidate to \`false\` (only ran once at build-time).`+`\nTo revalidate as soon as possible, you can set the value to \`1\`.`);}else if(data.unstable_revalidate>31536000){// if it's greater than a year for some reason error
console.warn(`Warning: A page's revalidate option was set to more than a year. This may have been done in error.`+`\nTo only run getStaticProps at build-time and not revalidate at runtime, you can set \`revalidate\` to \`false\`!`);}}else if(data.unstable_revalidate===true){// When enabled, revalidate after 1 second. This value is optimal for
// the most up-to-date page possible, but without a 1-to-1
// request-refresh ratio.
data.unstable_revalidate=1;}else{// By default, we never revalidate.
data.unstable_revalidate=false;}props.pageProps=Object.assign({},props.pageProps,data.props)// pass up revalidate and props for export
// TODO: change this to a different passing mechanism
;renderOpts.revalidate=data.unstable_revalidate;renderOpts.pageData=props;}if(getServerSideProps){props[_constants2.SERVER_PROPS_ID]=true;}if(getServerSideProps&&!isFallback){let data;try{data=await getServerSideProps({req,res,query,...(pageIsDynamic?{params:params}:undefined),...(previewData!==false?{preview:true,previewData:previewData}:undefined)});}catch(err){// remove not found error code to prevent triggering legacy
// 404 rendering
if(err.code==='ENOENT'){delete err.code;}throw err;}const invalidKeys=Object.keys(data).filter(key=>key!=='props');if(invalidKeys.length){throw new Error(invalidKeysMsg('getServerSideProps',invalidKeys));}if((dev||isBuildTimeSSG)&&!(0,_isSerializableProps.isSerializableProps)(pathname,'getServerSideProps',data.props)){// this fn should throw an error instead of ever returning `false`
throw new Error('invariant: getServerSideProps did not return valid props. Please report this.');}props.pageProps=Object.assign({},props.pageProps,data.props);renderOpts.pageData=props;}}catch(err){if(isDataReq||!dev||!err)throw err;ctx.err=err;renderOpts.err=err;console.error(err);}if(!isSSG&&// we only show this warning for legacy pages
!getServerSideProps&&process.env.NODE_ENV!=='production'&&Object.keys(((_props=props)===null||_props===void 0?void 0:_props.pageProps)||{}).includes('url')){console.warn(`The prop \`url\` is a reserved prop in Next.js for legacy reasons and will be overridden on page ${pathname}\n`+`See more info here: https://err.sh/vercel/next.js/reserved-page-prop`);}// We only need to do this if we want to support calling
// _app's getInitialProps for getServerSideProps if not this can be removed
if(isDataReq&&!isSSG)return props;// We don't call getStaticProps or getServerSideProps while generating
// the fallback so make sure to set pageProps to an empty object
if(isFallback){props.pageProps={};}// the response might be finished on the getInitialProps call
if((0,_utils.isResSent)(res)&&!isSSG)return null;const devFiles=buildManifest.devFiles;const files=[...new Set([...(0,_getPageFiles.getPageFiles)(buildManifest,'/_app'),...(0,_getPageFiles.getPageFiles)(buildManifest,pathname)])];const lowPriorityFiles=buildManifest.lowPriorityFiles;const polyfillFiles=(0,_getPageFiles.getPageFiles)(buildManifest,'/_polyfills');const renderElementToString=staticMarkup?_server.renderToStaticMarkup:_server.renderToString;const renderPageError=()=>{if(ctx.err&&ErrorDebug){return render(renderElementToString,/*#__PURE__*/_react.default.createElement(ErrorDebug,{error:ctx.err}),ampState);}if(dev&&(props.router||props.Component)){throw new Error(`'router' and 'Component' can not be returned in getInitialProps from _app.js https://err.sh/vercel/next.js/cant-override-next-props`);}};let renderPage=(options={})=>{const renderError=renderPageError();if(renderError)return renderError;const{App:EnhancedApp,Component:EnhancedComponent}=enhanceComponents(options,App,Component);return render(renderElementToString,/*#__PURE__*/_react.default.createElement(AppContainer,null,/*#__PURE__*/_react.default.createElement(EnhancedApp,Object.assign({Component:EnhancedComponent,router:router},props))),ampState);};const documentCtx={...ctx,renderPage};const docProps=await(0,_utils.loadGetInitialProps)(Document,documentCtx);// the response might be finished on the getInitialProps call
if((0,_utils.isResSent)(res)&&!isSSG)return null;if(!docProps||typeof docProps.html!=='string'){const message=`"${(0,_utils.getDisplayName)(Document)}.getInitialProps()" should resolve to an object with a "html" prop set with a valid html string`;throw new Error(message);}const dynamicImportIdsSet=new Set();const dynamicImports=[];for(const mod of reactLoadableModules){const manifestItem=reactLoadableManifest[mod];if(manifestItem){manifestItem.forEach(item=>{dynamicImports.push(item);dynamicImportIdsSet.add(item.id);});}}const dynamicImportsIds=[...dynamicImportIdsSet];const inAmpMode=(0,_amp.isInAmpMode)(ampState);const hybridAmp=ampState.hybrid;// update renderOpts so export knows current state
renderOpts.inAmpMode=inAmpMode;renderOpts.hybridAmp=hybridAmp;let html=renderDocument(Document,{...renderOpts,// Only enabled in production as development mode has features relying on HMR (style injection for example)
unstable_runtimeJS:process.env.NODE_ENV==='production'?pageConfig.unstable_runtimeJS:undefined,dangerousAsPath:router.asPath,ampState,props,headTags:await headTags(documentCtx),bodyTags:await bodyTags(documentCtx),htmlProps:await htmlProps(documentCtx),isFallback,docProps,pathname,ampPath,query,inAmpMode,hybridAmp,dynamicImportsIds,dynamicImports,devFiles,files,lowPriorityFiles,polyfillFiles,gsp:!!getStaticProps?true:undefined,gssp:!!getServerSideProps?true:undefined,gip:hasPageGetInitialProps?true:undefined,appGip:!defaultAppGetInitialProps?true:undefined});if(inAmpMode&&html){// inject HTML to AMP_RENDER_TARGET to allow rendering
// directly to body in AMP mode
const ampRenderIndex=html.indexOf(_constants2.AMP_RENDER_TARGET);html=html.substring(0,ampRenderIndex)+`<!-- __NEXT_DATA__ -->${docProps.html}`+html.substring(ampRenderIndex+_constants2.AMP_RENDER_TARGET.length);html=await(0,_optimizeAmp.default)(html,renderOpts.ampOptimizerConfig);if(!renderOpts.ampSkipValidation&&renderOpts.ampValidator){await renderOpts.ampValidator(html,pathname);}}if(inAmpMode||hybridAmp){// fix &amp being escaped for amphtml rel link
html=html.replace(/&amp;amp=1/g,'&amp=1');}return html;}function errorToJSON(err){const{name,message,stack}=err;return{name,message,stack};}function serializeError(dev,err){if(dev){return errorToJSON(err);}return{name:'Internal Server Error.',message:'500 - Internal Server Error.',statusCode:500};}
//# sourceMappingURL=render.js.map
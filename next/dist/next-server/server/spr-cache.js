"use strict";exports.__esModule=true;exports.initializeSprCache=initializeSprCache;exports.getFallback=getFallback;exports.getSprCache=getSprCache;exports.setSprCache=setSprCache;exports.calculateRevalidate=void 0;var _fs=require("fs");var _lruCache=_interopRequireDefault(require("next/dist/compiled/lru-cache"));var _path=_interopRequireDefault(require("path"));var _constants=require("../lib/constants");var _normalizePagePath=require("./normalize-page-path");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function toRoute(pathname){return pathname.replace(/\/$/,'').replace(/\/index$/,'')||'/';}let cache;let prerenderManifest;let sprOptions={};const getSeedPath=(pathname,ext)=>{return _path.default.join(sprOptions.pagesDir,`${pathname}.${ext}`);};const calculateRevalidate=pathname=>{pathname=toRoute(pathname);// in development we don't have a prerender-manifest
// and default to always revalidating to allow easier debugging
const curTime=new Date().getTime();if(sprOptions.dev)return curTime-1000;const{initialRevalidateSeconds}=prerenderManifest.routes[pathname]||{initialRevalidateSeconds:1};const revalidateAfter=typeof initialRevalidateSeconds==='number'?initialRevalidateSeconds*1000+curTime:initialRevalidateSeconds;return revalidateAfter;};// initialize the SPR cache
exports.calculateRevalidate=calculateRevalidate;function initializeSprCache({max,dev,distDir,pagesDir,flushToDisk}){sprOptions={dev,distDir,pagesDir,flushToDisk:!dev&&(typeof flushToDisk!=='undefined'?flushToDisk:true)};if(dev){prerenderManifest={version:-1,// letting us know this doesn't conform to spec
routes:{},dynamicRoutes:{},preview:null// `preview` is special case read in next-dev-server
};}else{prerenderManifest=JSON.parse((0,_fs.readFileSync)(_path.default.join(distDir,_constants.PRERENDER_MANIFEST),'utf8'));}cache=new _lruCache.default({// default to 50MB limit
max:max||50*1024*1024,length(val){// rough estimate of size of cache value
return val.html.length+JSON.stringify(val.pageData).length;}});}async function getFallback(page){page=(0,_normalizePagePath.normalizePagePath)(page);return _fs.promises.readFile(getSeedPath(page,'html'),'utf8');}// get data from SPR cache if available
async function getSprCache(pathname){if(sprOptions.dev)return;pathname=(0,_normalizePagePath.normalizePagePath)(pathname);let data=cache.get(pathname);// let's check the disk for seed data
if(!data){try{const html=await _fs.promises.readFile(getSeedPath(pathname,'html'),'utf8');const pageData=JSON.parse(await _fs.promises.readFile(getSeedPath(pathname,'json'),'utf8'));data={html,pageData,revalidateAfter:calculateRevalidate(pathname)};cache.set(pathname,data);}catch(_){// unable to get data from disk
}}if(data&&data.revalidateAfter!==false&&data.revalidateAfter<new Date().getTime()){data.isStale=true;}const manifestEntry=prerenderManifest.routes[pathname];if(data&&manifestEntry){data.curRevalidate=manifestEntry.initialRevalidateSeconds;}return data;}// populate the SPR cache with new data
async function setSprCache(pathname,data,revalidateSeconds){if(sprOptions.dev)return;if(typeof revalidateSeconds!=='undefined'){// TODO: Update this to not mutate the manifest from the
// build.
prerenderManifest.routes[pathname]={dataRoute:_path.default.posix.join('/_next/data',`${(0,_normalizePagePath.normalizePagePath)(pathname)}.json`),srcRoute:null,// FIXME: provide actual source route, however, when dynamically appending it doesn't really matter
initialRevalidateSeconds:revalidateSeconds};}pathname=(0,_normalizePagePath.normalizePagePath)(pathname);cache.set(pathname,{...data,revalidateAfter:calculateRevalidate(pathname)});// TODO: This option needs to cease to exist unless it stops mutating the
// `next build` output's manifest.
if(sprOptions.flushToDisk){try{const seedPath=getSeedPath(pathname,'html');await _fs.promises.mkdir(_path.default.dirname(seedPath),{recursive:true});await _fs.promises.writeFile(seedPath,data.html,'utf8');await _fs.promises.writeFile(getSeedPath(pathname,'json'),JSON.stringify(data.pageData),'utf8');}catch(error){// failed to flush to disk
console.warn('Failed to update prerender files for',pathname,error);}}}
//# sourceMappingURL=spr-cache.js.map
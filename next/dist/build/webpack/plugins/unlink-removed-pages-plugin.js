"use strict";exports.__esModule=true;exports.UnlinkRemovedPagesPlugin=void 0;var _path=require("path");var _fs=require("fs");var _constants=require("../../../next-server/lib/constants");// Makes sure removed pages are removed from `.next` in development
class UnlinkRemovedPagesPlugin{constructor(){this.prevAssets=void 0;this.prevAssets={};}apply(compiler){compiler.hooks.afterEmit.tapAsync('NextJsUnlinkRemovedPages',(compilation,callback)=>{const removed=Object.keys(this.prevAssets).filter(a=>_constants.IS_BUNDLED_PAGE_REGEX.test(a)&&!compilation.assets[a]);this.prevAssets=compilation.assets;Promise.all(removed.map(async f=>{const path=(0,_path.join)(compiler.outputPath,f);try{await _fs.promises.unlink(path);}catch(err){if(err.code==='ENOENT')return;throw err;}})).then(()=>callback(),callback);});}}exports.UnlinkRemovedPagesPlugin=UnlinkRemovedPagesPlugin;
//# sourceMappingURL=unlink-removed-pages-plugin.js.map
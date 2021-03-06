"use strict";exports.__esModule=true;exports.getCssModuleLoader=getCssModuleLoader;var _client=require("./client");var _getCssModuleLocalIdent=require("./getCssModuleLocalIdent");function getCssModuleLoader(ctx,postCssPlugins,preProcessors=[]){const loaders=[];if(ctx.isClient){// Add appropriate development more or production mode style
// loader
loaders.push((0,_client.getClientStyleLoader)({isDevelopment:ctx.isDevelopment,assetPrefix:ctx.assetPrefix}));}// Resolve CSS `@import`s and `url()`s
loaders.push({loader:require.resolve('css-loader'),options:{importLoaders:1+preProcessors.length,sourceMap:true,onlyLocals:ctx.isServer,modules:{// Disallow global style exports so we can code-split CSS and
// not worry about loading order.
mode:'pure',// Generate a friendly production-ready name so it's
// reasonably understandable. The same name is used for
// development.
// TODO: Consider making production reduce this to a single
// character?
getLocalIdent:_getCssModuleLocalIdent.getCssModuleLocalIdent}}});// Compile CSS
loaders.push({loader:require.resolve('next/dist/compiled/postcss-loader'),options:{ident:'__nextjs_postcss',plugins:postCssPlugins,sourceMap:true}});loaders.push(// Webpack loaders run like a stack, so we need to reverse the natural
// order of preprocessors.
...preProcessors.slice().reverse());return loaders;}
//# sourceMappingURL=modules.js.map
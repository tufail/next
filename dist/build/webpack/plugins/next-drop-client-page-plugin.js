"use strict";exports.__esModule=true;exports.DropClientPage=void 0;var _path=require("path");// Prevents outputting client pages when they are not needed
class DropClientPage{constructor(){this.ampPages=new Set();}apply(compiler){compiler.hooks.emit.tap('DropClientPage',compilation=>{Object.keys(compilation.assets).forEach(assetKey=>{var _asset$_value,_asset$_value$include;const asset=compilation.assets[assetKey];if(asset===null||asset===void 0?void 0:(_asset$_value=asset._value)===null||_asset$_value===void 0?void 0:(_asset$_value$include=_asset$_value.includes)===null||_asset$_value$include===void 0?void 0:_asset$_value$include.call(_asset$_value,'__NEXT_DROP_CLIENT_FILE__')){const cleanAssetKey=assetKey.replace(/\\/g,'/');const page='/'+cleanAssetKey.split('pages/')[1];const pageNoExt=page.split((0,_path.extname)(page))[0];delete compilation.assets[assetKey];// Detect being re-ran through a child compiler and don't re-mark the
// page as AMP
if(!pageNoExt.endsWith('.module')){this.ampPages.add(pageNoExt.replace(/\/index$/,'')||'/');}}});});}}exports.DropClientPage=DropClientPage;
//# sourceMappingURL=next-drop-client-page-plugin.js.map
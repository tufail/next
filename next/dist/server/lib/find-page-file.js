"use strict";exports.__esModule=true;exports.findPageFile=findPageFile;var _path=require("path");var _chalk=_interopRequireDefault(require("next/dist/compiled/chalk"));var _isWriteable=require("../../build/is-writeable");var _log=require("../../build/output/log");var _fs=_interopRequireDefault(require("fs"));var _util=require("util");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const readdir=(0,_util.promisify)(_fs.default.readdir);async function isTrueCasePagePath(pagePath,pagesDir){const pageSegments=(0,_path.normalize)(pagePath).split(_path.sep).filter(Boolean);const segmentExistsPromises=pageSegments.map(async(segment,i)=>{const segmentParentDir=(0,_path.join)(pagesDir,...pageSegments.slice(0,i));const parentDirEntries=await readdir(segmentParentDir);return parentDirEntries.includes(segment);});return(await Promise.all(segmentExistsPromises)).every(Boolean);}async function findPageFile(rootDir,normalizedPagePath,pageExtensions){let foundPagePaths=[];for(const extension of pageExtensions){const relativePagePath=`${normalizedPagePath}.${extension}`;const pagePath=(0,_path.join)(rootDir,relativePagePath);// only /index and /sub/index when /sub/index/index.js is allowed
// see test/integration/route-indexes for expected index handling
if(normalizedPagePath.startsWith('/index')||!normalizedPagePath.endsWith('/index')){if(await(0,_isWriteable.isWriteable)(pagePath)){foundPagePaths.push(relativePagePath);}}const relativePagePathWithIndex=(0,_path.join)(normalizedPagePath,`index.${extension}`);const pagePathWithIndex=(0,_path.join)(rootDir,relativePagePathWithIndex);if(await(0,_isWriteable.isWriteable)(pagePathWithIndex)){foundPagePaths.push(relativePagePathWithIndex);}}if(foundPagePaths.length<1){return null;}if(!(await isTrueCasePagePath(foundPagePaths[0],rootDir))){return null;}if(foundPagePaths.length>1){(0,_log.warn)(`Duplicate page detected. ${_chalk.default.cyan((0,_path.join)('pages',foundPagePaths[0]))} and ${_chalk.default.cyan((0,_path.join)('pages',foundPagePaths[1]))} both resolve to ${_chalk.default.cyan(normalizedPagePath)}.`);}return foundPagePaths[0];}
//# sourceMappingURL=find-page-file.js.map
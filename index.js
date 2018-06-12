/**
 * @file: index.js
 * @author: l5oo00
 */

'use strict';

// 在这里收集  babel  helper， 并写入依赖
module.exports = function (content, file, options) {

    if (file.useBabel === false) {
        return content;
    }

    let helperNameList = [];
    let helperFileId = options.helperFileId || 'widget/babel_helpers.js';
    let ns = options.namespace || fis.config.get('namespace');
    if (ns) {
        helperFileId = ns + ':' + helperFileId;
    }

    // 理论只会出现在 babel 编译后的代码里， 这里就直接使用简单的正则匹配
    let reg = /\bbabelHelpers\.([^(]+)\(/g;
    let m = reg.exec(content);
    let count = 0;
    while (m) {
        let name = m[1];
        count++;
        if (helperNameList.indexOf(name) === -1) {
            helperNameList.push(name);
        }
        m = reg.exec(content);
    }

    if (count > 0) {
        // 删除换行， 修复导致 babel 产出的 sourceMap 调试时错一行的问题
        content = 'var babelHelpers = require(\'' + helperFileId + '\');' + content;
    }
    file.helperNameList = helperNameList;

    return content;
};

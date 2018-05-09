# fis3-preprocessor-babel-helper

A preprocessor plugin for fis3 when using babel-plugin-external-helpers plugin.

---

使用 [babel-plugin-external-helpers](https://www.npmjs.com/package/babel-plugin-external-helpers) 时， 可以使用此插件自动提取依赖的 `helper`, 并自动注入`require`语句， 然后配合 [fis3-prepackager-babel-helper](https://github.com/l5oo00/fis3-prepackager-babel-helper) 插件自动生成 `babel_helper.js` 文件。

### Install

```shell
npm install fis3-preprocessor-babel-helper --save-dev
```

### Add configure to fis-conf.js

```javascript
fis.match('a.js', {
    preprocessor: fis.plugin('babel-helper', {
        helperFileId: 'widget/babel_helpers.js',  // 生成的 babel_helper.js 文件 id， namespace 通过下面的 namespace 字段单独配置
        namespace: fis.config.get('namespace')
    })
});

// 编译后， 会自动在 a.js 文件头注入   var babelHelpers = require('namespace:widget/babel_helpers.js');
```


Thanks [fisx-preprocessor-babel](https://github.com/fisx-suite/fisx-preprocessor-babel)。

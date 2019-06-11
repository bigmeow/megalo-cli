module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration (path) {
        // 找出 import Vue from 'vue' 所在的path
        if (path.node.source.value !== 'vue') {
          return
        }
        let vueVarName = 'Vue'
        if (t.isImportDefaultSpecifier(path.node.specifiers[0])) {
          vueVarName = path.node.specifiers[0].local.name
        }
        if (path.inList) {
          const template = require('@babel/template').default
          // 找出同级别的所有import数组，数组长度－1 就是最后一个import path 的索引
          const importDeclarationArr = path.container.filter(pathItem => pathItem.type === 'ImportDeclaration')
          const willInsertPath = path.getSibling(importDeclarationArr.length - 1)
          path.insertAfter(template(`import DevtoolPlugin from '@megalo/devtool/vue-plugin'`)())
          willInsertPath.insertAfter(template(`${vueVarName}.use(DevtoolPlugin)`)())
        }
      }
    }
  }
}

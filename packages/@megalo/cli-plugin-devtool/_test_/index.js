const babel = require('@babel/core')
const babelPluginInjection = require('../babel-plugin-injection')
const txt = `import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'
import routers from './routers'

Vue.use(VHtmlPlugin)
Vue.use(Vuex)`

const babelOptions = {
  plugins: [
    babelPluginInjection
  ]
}
const result = babel.transform(txt, babelOptions)
console.log('结果：', result.code)

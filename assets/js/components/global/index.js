import Vue from 'vue'
const bulk = require('bulk-require');

const components = bulk(__dirname, ['./**/*.js']);

Object.keys(components).forEach((name) => {
    Vue.component(name, components[name].default)
})
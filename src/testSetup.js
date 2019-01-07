// from: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16')
const { JSDOM } = require('jsdom');

enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

// https://github.com/palantir/blueprint/issues/397#issuecomment-275632153
const keys = [
  'DocumentFragment',
  'Event',
  'KeyboardEvent',
  'MouseEvent'
]
keys.forEach((key) => {
  global[key] = document.defaultView[key]
})
global.self = document.defaultView

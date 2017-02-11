'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    getPropsValues: function getPropsValues() {
      var _this = this;

      return (0, _lodash2.default)(this.$options.props, function (v, k) {
        return _this[k];
      });
    }
  }
};
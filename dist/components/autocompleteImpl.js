'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.clone');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.pickby');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.omit');

var _lodash8 = _interopRequireDefault(_lodash7);

var _propsBinder = require('../utils/propsBinder.js');

var _propsBinder2 = _interopRequireDefault(_propsBinder);

var _simulateArrowDown = require('../utils/simulateArrowDown.js');

var _simulateArrowDown2 = _interopRequireDefault(_simulateArrowDown);

var _getPropsValuesMixin = require('../utils/getPropsValuesMixin.js');

var _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin);

var _manager = require('../manager.js');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object
  },
  types: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  placeholder: {
    required: false,
    type: String
  },
  selectFirstOnEnter: {
    require: false,
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  options: {
    type: Object
  }
};

exports.default = {
  mixins: [_getPropsValuesMixin2.default],

  mounted: function mounted() {
    var _this = this;

    var input = this.$refs.input;

    _manager.loaded.then(function () {
      var options = (0, _lodash2.default)(_this.getPropsValues());
      if (_this.selectFirstOnEnter) {
        (0, _simulateArrowDown2.default)(_this.$refs.input);
      }

      (0, _assert2.default)(typeof google.maps.places.Autocomplete === 'function', "google.maps.places.Autocomplete is undefined. Did you add 'places' to libraries when loading Google Maps?");

      var finalOptions = (0, _lodash6.default)((0, _lodash4.default)({}, options.options, (0, _lodash8.default)(options, ['options', 'selectFirstOnEnter', 'value', 'place', 'placeholder'])), function (v, k) {
        return v !== undefined;
      });

      // Component restrictions is rather particular. Undefined not allowed
      _this.$watch('componentRestrictions', function (v) {
        if (v !== undefined) {
          _this.$autocomplete.setComponentRestrictions(v);
        }
      });

      _this.$autocomplete = new google.maps.places.Autocomplete(_this.$refs.input, finalOptions);
      (0, _propsBinder2.default)(_this, _this.$autocomplete, (0, _lodash8.default)(props, ['placeholder', 'place', 'selectFirstOnEnter', 'value', 'componentRestrictions']));

      _this.$autocomplete.addListener('place_changed', function () {
        _this.$emit('place_changed', _this.$autocomplete.getPlace());
      });
    });
  },

  props: props
};
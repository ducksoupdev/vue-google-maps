import mapValues from 'lodash.mapvalues'

export default {
  methods: {
    getPropsValues () {
      return mapValues(this.$options.props, (v, k) => this[k]);
    }
  }
}

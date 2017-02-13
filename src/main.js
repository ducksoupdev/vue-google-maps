import {load, loaded} from './manager.js';
import Marker from './components/marker';
import Cluster from './components/cluster';
import Polyline from './components/polyline';
import Polygon from './components/polygon';
import Circle from './components/circle';
import Rectangle from './components/rectangle';

import forEach from 'lodash.foreach';
import defaults from 'lodash.defaults';
import pick from 'utils/pick';

// Vue component imports
import InfoWindow from './components/infoWindow.vue';
import Map from './components/map.vue';
import StreetViewPanorama from './components/streetViewPanorama.vue';
import PlaceInput from './components/placeInput.vue';
import Autocomplete from './components/autocomplete.vue';

import MapElementMixin from './components/mapElementMixin';
import MountableMixin from './utils/mountableMixin';
import {DeferredReady} from './utils/deferredReady';

// export everything
export {load, loaded, Marker, Cluster, Polyline, Polygon, Circle, Rectangle,
  InfoWindow, Map, PlaceInput, MapElementMixin, Autocomplete,
  MountableMixin};

const allComponents = {
  'GmapMap': Map,
  'GmapMarker': Marker,
  'GmapCluster': Cluster,
  'GmapInfoWindow': InfoWindow,
  'GmapPolyline': Polyline,
  'GmapPolygon': Polygon,
  'GmapCircle': Circle,
  'GmapRectangle': Rectangle,
  'GmapAutocomplete': Autocomplete,
  'GmapPlaceInput': PlaceInput,
  'GmapStreetViewPanorama': StreetViewPanorama
};

export function install(Vue, options) {
  options = defaults(options, {
    installComponents: true,
  });

  Vue.use(DeferredReady);

  const defaultResizeBus = new Vue();
  Vue.$gmapDefaultResizeBus = defaultResizeBus;
  Vue.mixin({
    created() {
      this.$gmapDefaultResizeBus = defaultResizeBus;
    }
  });

  if (options.load) {
    load(options.load);
  }

  if (options.installComponents) {
    let componentsToLoad = allComponents;
    if (Array.isArray(options.installComponents)) {
      componentsToLoad = pick(allComponents, options.installComponents);
    }
    forEach(componentsToLoad, (v, k) => Vue.component(k, v));
  }
}

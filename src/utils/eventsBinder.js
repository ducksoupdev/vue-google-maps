import forEach from 'lodash.foreach'

export default (vueElement, googleMapObject, events) => {
  forEach(events, (eventName) => {
    const exposedName = eventName;
    googleMapObject.addListener(eventName, (ev) => {
      vueElement.$emit(exposedName, ev);
    });
  });
}

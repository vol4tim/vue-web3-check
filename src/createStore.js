import EventEmitter from "events";

export default function create(state, reducer) {
  return {
    state: state,
    _event: new EventEmitter(),
    _reducer: reducer,
    on(topic, listener) {
      return this._event.on(topic, listener);
    },
    dispatch(action, data, emit = true) {
      const old = { ...this.state };
      const newState = this._reducer(this.state, action, data);
      Object.keys(newState).forEach(k => {
        this.state[k] = newState[k];
      });
      if (emit) {
        this._event.emit("update", { action, state: { old, new: this.state } });
      }
    }
  };
}

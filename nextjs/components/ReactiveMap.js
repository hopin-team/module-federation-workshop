export class ReactiveMap {
  constructor({ context } = {}) {
    this.values = new Map();
    this.initialisedValues = new Set();
    this.items = new Map();
    this.listeners = new Map();
    this.keyValidators = [];
    this.context = context || {};
  }

  // make _setValue private with TS
  _setValue = (key, value, isEqual) => {
    isEqual = typeof isEqual === "function" ? isEqual : (a, b) => a === b;
    console.log("test1 🥁 trying to set ", key, value);
    if (!isEqual(this.values.get(key), value)) {
      console.log("test1 🎯 set", key);
      this.values.set(key, value);
      this.listeners
        .get(key)
        ?.map((listener) => listener(this.values.get(key)));
    }
  };

  // make _initItem private with TS
  _initItem = (key) => {
    if (this.items.has(key)) return;

    this.keyValidators.forEach((validator) => validator(key));

    const set = (newValue, isEqual) => {
      this._setValue(key, newValue, isEqual);
    };

    const listen = (callback) => {
      if (this.listeners.has(key)) {
        this.listeners.get(key).push(callback);
      } else {
        this.listeners.set(key, [callback]);
      }

      return () => {
        this.listeners.set(
          key,
          this.listeners.get(key).filter((c) => c !== callback)
        );
      };
    };

    const get = () => this.values.get(key);

    const connect = (connector) => connector(set, this.context);

    this.items.set(key, { set, listen, get, connect });
  };

  item = (key, { initialiser } = {}) => {
    if (!key) {
      throw new Error("Key is required");
    }

    this._initItem(key);

    if (typeof initialiser === "function" && !this.initialisedValues.has(key)) {
      this.initialisedValues.add(key);
      initialiser().then((value) => this._setValue(key, value));
    }

    return this.items.get(key);
  };
}

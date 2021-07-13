export class ReactiveMap {
  constructor() {
    this.values = new Map();
    this.fetchedInitialValues = new Set();
    this.items = new Map();
    this.listeners = new Map();
    this.keyValidators = [];
  }

  // make _validateKey private with TS
  _validateKey = (key) =>
    this.keyValidators.forEach((validator) => validator(key));

  // make _setValue private with TS
  _setValue = (key, value) => {
    // this._validateKey(key);
    if (this.values.get(key) !== value) {
      this.values.set(key, value);
      this.listeners
        .get(key)
        ?.map((listener) => listener(this.values.get(key)));
    }
  };

  // make _initItem private with TS
  _initItem = (key) => {
    if (this.items.has(key)) {
      return;
    }

    this._validateKey(key);

    const set = (newValue) => {
      this._setValue(key, newValue);
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

    this.items.set(key, { set, listen, get });
  };

  item = (key, { fetchInitialValue } = {}) => {
    if (!key) {
      throw new Error("Key is required");
    }

    this._initItem(key);

    // If there is an init function execute and setValue on resolution
    if (
      typeof fetchInitialValue === "function" &&
      !this.fetchedInitialValues.has(key)
    ) {
      this.fetchedInitialValues.add(key);
      fetchInitialValue().then((value) => this._setValue(key, value));
    }

    return this.items.get(key);
  };
}

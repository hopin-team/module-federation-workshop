export class ReactiveMap {
  constructor() {
    this.values = new Map();
    this.reactiveValues = new Map();
    this.listeners = new Map();
    this.keyValidators = [];
  }

  // make _validateKey private with TS
  _validateKey = (key) =>
    this.keyValidators.forEach((validator) => validator(key));

  // make _getValue private with TS
  _getValue = (key) => {
    this._validateKey(key);
    // return Promise.resolve(this.values.get(key));
    return this.values.get(key);
  };

  // make _setValue private with TS
  _setValue = (key, value) => {
    this._validateKey(key);
    this.values.set(key, value);
    this.listeners.get(key)?.map((listener) => listener(this._getValue(key)));
  };

  set = (key, value) => {
    if (!key) {
      throw new Error("Key is required");
    }

    this._setValue(key, value);

    if (!this.reactiveValues.has(key)) {
      const reactiveValue = (newValue) => {
        if (newValue !== undefined) {
          this._setValue(key, newValue);
        }

        return this._getValue(key);
      };

      reactiveValue.listen = (callback) => {
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

      this.reactiveValues.set(key, reactiveValue);
    }

    return this.reactiveValues.get(key);
  };

  get = async (key, { fetchInitialValue } = {}) => {
    if (!this.reactiveValues.has(key)) {
      // Setting the defined that it has been initialized by some party
      this.set(key, undefined);
    }

    // If there is an init function execute and setValue on resolution
    if (
      typeof fetchInitialValue === "function" &&
      this.values.get(key) === undefined
    ) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          resolve(await fetchInitialValue());
        } catch (error) {
          reject(error);
        }
      });
      this.values.set(key, promise);
      this._setValue(key, await promise);
    }

    return this.reactiveValues.get(key);
  };
}

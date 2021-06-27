export class ReactiveMap {
  constructor() {
    this.values = new Map();
    this.reactiveValues = new Map();
    this.listeners = new Map();
  }

  // make _getValue private with TS
  _getValue = (key) => Promise.resolve(this.values.get(key));

  // make _setValue private with TS
  _setValue = (key, value) => {
    this.values.set(key, value);
    this.listeners.get(key)?.map((listener) => listener(this._getValue(key)));
  };

  set = (key, value) => {
    if (!key) {
      throw new Error("Key is required");
    }

    this._setValue(key, value);

    if (!this.reactiveValues.has(key)) {
      const reactiveValue = async (newValue) => {
        const currentValue = this.values.get(key);
        if (Promise.resolve(currentValue) === currentValue) {
          // current value is a promise
          return currentValue;
        }

        if (typeof newValue === "function" && currentValue === undefined) {
          const promise = new Promise(async (resolve, reject) => {
            try {
              resolve(await newValue());
            } catch (error) {
              reject(error);
            }
          });
          this.values.set(key, promise);
          newValue = await promise;
          this._setValue(key, newValue);
        } else if (newValue !== undefined && typeof newValue !== "function") {
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

  get = (key) => {
    if (!this.reactiveValues.has(key)) {
      this.set(key, undefined);
    }

    return this.reactiveValues.get(key);
  };
}

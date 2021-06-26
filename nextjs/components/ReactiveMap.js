export class ReactiveMap {
  constructor() {
    this.values = new Map();
    this.reactiveValues = new Map();
    this.listeners = new Map();
  }

  set = (key, value) => {
    if (!key) {
      throw new Error("Key is required");
    }

    this.values.set(key, Promise.resolve(value));

    if (!this.reactiveValues.has(key)) {
      const reactiveValue = async (newValue) => {
        if (typeof newValue === "function") {
          newValue = await newValue();
        }

        if (newValue !== undefined) {
          const promiseNewValue = Promise.resolve(newValue);
          this.values.set(key, promiseNewValue);
          this.listeners.get(key)?.map((listener) => listener(promiseNewValue));
        }

        return this.values.get(key);
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
            this.listeners.get(key).filter((c) => c === callback)
          );
        };
      };

      this.reactiveValues.set(key, reactiveValue);
    }

    this.listeners.get(key)?.map((listener) => listener(value));

    return this.reactiveValues.get(key);
  };

  get = (key) => {
    if (!this.reactiveValues.has(key)) {
      this.set(key, undefined);
    }

    return this.reactiveValues.get(key);
  };
}

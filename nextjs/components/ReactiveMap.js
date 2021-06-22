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

    this.values.set(key, value);

    if (!this.reactiveValues.has(key)) {
      const reactiveValue = (newValue) => {
        if (newValue) {
          this.values.set(key, newValue);
          this.listeners.get(key)?.map((listener) => listener(newValue));
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

import { ReactiveMap } from "./ReactiveMap";

function whitelistKeys(key) {
  const keys = ["username"]; // TODO this key should be typed and used in `reactiveMapGet(key👈)`
  const whitelist = new Set(keys);
  if (!whitelist.has(key)) {
    throw new Error(`You can't use key ${key} because it's not whitelisted`);
  }
}
export class MyProjectReactiveMap extends ReactiveMap {
  constructor(...args) {
    super(...args);
    this.keyValidators = [whitelistKeys];
  }
}

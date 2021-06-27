import { ReactiveMap } from "./ReactiveMap";

function whitelistKeys(key) {
  const whitelist = new Set(["username"]);
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

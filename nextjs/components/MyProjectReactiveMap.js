import Pusher from "pusher-js";
import * as Ably from "ably";
import { ReactiveMap } from "./ReactiveMap";

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
const ABLY_APP_KEY = process.env.NEXT_PUBLIC_ABLY_APP_KEY;

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
    this.context = {
      pusher: new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
      }),
      ably: new Ably.Realtime(ABLY_APP_KEY),
    };
  }
}

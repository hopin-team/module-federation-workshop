export function createPusherConnector({ channelId, eventId, pusher, set }) {
  const channel = pusher.subscribe(channelId);
  channel.bind(eventId, set);

  return () => {
    pusher.unsubscribe(channelId);
    channel.unbind(eventId, set);
  };
}

export function createAblyConnector({ channelId, eventId, ably, set }) {
  const channel = ably.channels.get(channelId);
  const handler = ({ data }) => set(data);
  channel.subscribe(eventId, handler);

  return () => {
    channel.unsubscribe(eventId, handler);
  };
}

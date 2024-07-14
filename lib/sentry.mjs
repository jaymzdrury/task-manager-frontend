export const sentryExtensions = {
  __SENTRY_DEBUG__: false,
  __SENTRY_TRACING__: false,
  __RRWEB_EXCLUDE_IFRAME__: true,
  __RRWEB_EXCLUDE_SHADOW_DOM__: true,
  __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
};

export const tunnel = (components = "") => `/monitoring${components}`;

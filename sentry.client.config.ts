import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://98eed62758c072cb9544457586bb8040@o4507556578656256.ingest.us.sentry.io/4507556580229120",
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

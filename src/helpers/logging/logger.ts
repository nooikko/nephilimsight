// @ts-nocheck
import * as appInsights from 'applicationinsights';
import { Envelope } from 'applicationinsights/out/Declarations/Contracts';
import cache from 'memory-cache';
import { defaults } from '..';


const APP_NAME = 'nephilim-sight';

const instrumentationKeyNoDashes = () => {
  return defaults.INSTRUMENTATION_KEY.replace(
    'InstrumentationKey=',
    '',
  ).replace(/-/g, '');
};
const appInsightsDependencyProcessor = (
  envelope: Envelope,
  context: {
    'http.ServerRequest': any;
    correlationContext: any;
  },
): boolean => {
  if (
    envelope.name ===
      `Microsoft.ApplicationInsights.${instrumentationKeyNoDashes()}.Request`
  ) {
    envelope.data['baseData']['properties'] = {
      query: context?.['http.ServerRequest']?.body?.query,
      operationName: context?.['http.ServerRequest']?.body?.operationName,
    };
  }
  return true;
};

/**
 * Logger object used for Azure Application Insights
 */
class Logger {
  traces: number;
  client: appInsights.TelemetryClient;

  constructor() {
    this.traces = 0;
    this.client = null as any;
  }
  // Must be run after configuration/secret values are loaded and before any log messages are executed
  init() {
      appInsights
        .setup(defaults.INSTRUMENTATION_KEY)
        .setInternalLogging(defaults.DEBUG, defaults.DEBUG);
      appInsights.defaultClient.context.tags[
        appInsights.defaultClient.context.keys.cloudRole
      ] = APP_NAME;

      appInsights.defaultClient.addTelemetryProcessor(
        appInsightsDependencyProcessor,
      );

    this.client = appInsights.defaultClient;
    this.traces = 0;
  }

  makePrefix(type: string, service: string) {
    return `[${APP_NAME}][${type}][${service.toUpperCase()}][${cache.get('SESSION_ID')}]`;
  }

  /** Sends error log message to Application Insights */
  // TODO: Extend this so that it calls .event to track meta data
  error(service: string, log: string) {
    const exception = new Error(`${makePrefix('ERROR', service)} ${log}`);
    console.log(exception); // eslint-disable-line no-console

    if (!defaults.DISABLE_LOGGING) {
      this.event(service, {
        log,
        type: 'ERROR',
      });
      this.client.trackException({ exception });
    }

  }
  /** Sends event log message to Application Insights */
  event(service: string, properties: string | { [key: string]: string | string[] | number | boolean }) {
    const trackable = {
      userId: cache.get('USER_ID'),
      sessionId: cache.get('SESSION_ID'),
    };
    if (typeof properties === 'string') {
      trackable.type = 'EVENT';
      trackable.message = properties;
    } else {
      Object.keys(properties).forEach((key) => {
        if (!Array.isArray(properties[key])) {
          trackable[key] = String(properties[key]);
        } else {
          trackable[key] = properties[key].map((value) => String(value));
        }
      });
    }

    if (!defaults.DISABLE_LOGGING) {
      this.client.trackEvent({ name: service, properties: trackable });
    }

  }
}

export const logger = new Logger();

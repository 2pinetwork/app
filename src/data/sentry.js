import { Integrations } from '@sentry/tracing'

const key       = '99b5379d8beb43bbaddcaff0f8185b22'
const projectId = '5768139'

export const dsn          = `https://${key}@o673411.ingest.sentry.io/${projectId}`
export const integrations = [new Integrations.BrowserTracing()]

export const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string

export const existsGaId = gaId !== ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (path: string) => {
  if (!existsGaId) {
    return
  }
  window.gtag('config', gaId, {
    page_path: path,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GaEventProps = {
  action: string
  category: string
  label: string
  value?: number
}

export const event = ({ action, category, label, value }: GaEventProps) => {
  if (!existsGaId) {
    return
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}


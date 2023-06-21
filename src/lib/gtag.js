import { useRouter } from "next/router"
import { useEffect } from "react"

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}

// route가 변경될 때 gtag에서
export const useGtag = () => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return

    const handleRouteChange = (url) => {
      pageView(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)
    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router.events])
}

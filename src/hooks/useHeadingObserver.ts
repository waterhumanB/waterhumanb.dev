import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

export const useHeadingsObserver = (query: string) => {
  const observer = useRef<IntersectionObserver>()
  const [activeIdList, setActiveIdList] = useState<string[]>([])
  const [lastVisibleId, setLastVisibleId] = useState<string | null>(null) // 마지막으로 활성화된 헤더를 추적

  const router = useRouter() // Next.js 라우터 사용

  useEffect(() => {
    const scrollMarginOption = { rootMargin: "-32px 0px -80px 0px" }

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`

        // 헤더가 화면에 보일 때
        if (entry.isIntersecting) {
          setActiveIdList((prev) => [...prev, targetId])
          setLastVisibleId(targetId) // 마지막으로 보인 헤더로 설정
        } else {
          // 헤더가 보이지 않을 때에도 마지막으로 활성화된 헤더는 유지
          setActiveIdList((prev) => {
            return prev.filter((elem) => elem !== targetId)
          })
        }
      })
    }

    // IntersectionObserver 초기화 및 등록
    const initializeObserver = () => {
      observer.current = new IntersectionObserver(
        handleObserver,
        scrollMarginOption,
      )

      const elements = document.querySelectorAll(query)
      elements.forEach((elem) => observer.current?.observe(elem))
    }

    initializeObserver()

    // 페이지가 바뀌면 IntersectionObserver 재설정
    const handleRouteChange = () => {
      observer.current?.disconnect() // 기존 옵저버 해제
      initializeObserver() // 새로운 옵저버 등록
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      observer.current?.disconnect() // 컴포넌트 언마운트 시 옵저버 해제
    }
  }, [query, router.events])

  // 마지막으로 활성화된 헤더가 비어있지 않으면 activeIdList에 유지
  return [...activeIdList, lastVisibleId || ""]
}

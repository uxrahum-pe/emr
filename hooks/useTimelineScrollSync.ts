"use client";

import { useEffect, useRef } from "react";
import { ScrollableContainerRef } from "@/components/ScrollableContainer";
import { TimelineScrollSyncConfig } from "@/types/timeline";

type ScrollableContainerRefType = ScrollableContainerRef | null;

/**
 * C106과 C107 간의 스크롤 동기화를 관리하는 커스텀 훅
 */
export function useTimelineScrollSync(
  sidebarRef: React.RefObject<ScrollableContainerRefType>,
  contentRef: React.RefObject<ScrollableContainerRefType>,
  config: TimelineScrollSyncConfig
) {
  const { viewMode, title, hideFutureSchedule, onDateSelect, onPackageSelect } =
    config;

  // CSS 변수 값을 안전하게 가져오는 헬퍼 함수
  const getCSSVariableValue = (
    variableName: string,
    fallback: number = 0
  ): number => {
    try {
      const tempElement = document.createElement("div");
      tempElement.style.width = `var(${variableName})`;
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      document.body.appendChild(tempElement);
      const value = tempElement.offsetWidth || fallback;
      document.body.removeChild(tempElement);
      return value;
    } catch {
      return fallback;
    }
  };

  // C107 스크롤에 따라 현재 보이는 항목 감지
  // 패키지 모드에서는 스크롤 동기화 비활성화 (깜빡임 방지)
  useEffect(() => {
    // 패키지 모드이고 title이 '패키지'인 경우 스크롤 동기화 비활성화
    if (viewMode === "package" && title === "패키지") {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const rafIdRef = { current: null as number | null };
    let scrollContainer: HTMLDivElement | null = null;
    let handleScroll: (() => void) | null = null;
    let cachedThreshold: number | null = null;
    let lastWindowWidth: number = window.innerWidth;

    const getThreshold = () => {
      if (window.innerWidth !== lastWindowWidth) {
        cachedThreshold = null;
        lastWindowWidth = window.innerWidth;
      }

      if (cachedThreshold !== null) {
        return cachedThreshold;
      }

      const tempElement = document.createElement("div");
      tempElement.style.width = "var(--size-100)";
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      document.body.appendChild(tempElement);
      cachedThreshold = tempElement.offsetWidth || 100;
      document.body.removeChild(tempElement);
      return cachedThreshold;
    };

    const checkVisibleItem = () => {
      const currentScrollContainer = contentRef.current?.getElement();
      if (!currentScrollContainer) return;

      const containerRect = currentScrollContainer.getBoundingClientRect();
      const threshold = getThreshold();

      // 패키지 뷰 모드
      if (viewMode === "package") {
        // 예약의 경우에만 C138이 있음
        if (title === "예약") {
          const c138Element = currentScrollContainer.querySelector(".C138");
          if (c138Element) {
            const c138Rect = c138Element.getBoundingClientRect();
            if (
              c138Rect.top <= containerRect.top + threshold &&
              c138Rect.bottom > containerRect.top
            ) {
              onDateSelect("");
              onPackageSelect("");
              return;
            }
          }

          // T061에서 기수 정보 추출하여 선택
          const t061Elements = currentScrollContainer.querySelectorAll(".T061");
          let visiblePackage = "";
          let minDistance = Infinity;

          t061Elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top - containerRect.top);

            if (
              rect.top <= containerRect.top + threshold &&
              distance < minDistance
            ) {
              minDistance = distance;
              const text = element.textContent || "";
              const packageMatch = text.match(/(\d+)기/);
              if (packageMatch) {
                visiblePackage = `package-${packageMatch[1]}`;
              }
            }
          });

          if (visiblePackage) {
            onPackageSelect(visiblePackage);
            onDateSelect("package-selected");
          }
        } else {
          // 예약이 아닌 경우: C107이 비어있으므로 스크롤이 최상단이면 향후일정 선택
          if (currentScrollContainer.scrollTop === 0) {
            onDateSelect("");
            onPackageSelect("");
          }
        }
        return;
      }

      // 날짜 뷰 모드 (내원일지/상세로그)
      if (!hideFutureSchedule) {
        const c138Element = currentScrollContainer.querySelector(".C138");
        if (c138Element) {
          const c138Rect = c138Element.getBoundingClientRect();
          if (
            c138Rect.top <= containerRect.top + threshold &&
            c138Rect.bottom > containerRect.top
          ) {
            onDateSelect("");
            return;
          }
        }
      }

      const t061Elements = currentScrollContainer.querySelectorAll(".T061");
      let visibleDate = "";
      let minDistance = Infinity;

      t061Elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);

        if (
          rect.top <= containerRect.top + threshold &&
          distance < minDistance
        ) {
          minDistance = distance;
          const dateText = element.textContent || "";
          const dateMatch = dateText.match(/(\d{4})\.(\d{2})\.(\d{2})/);
          if (dateMatch) {
            visibleDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
          }
        }
      });

      if (visibleDate) {
        onDateSelect(visibleDate);
      }
    };

    const setupScrollListener = () => {
      scrollContainer = contentRef.current?.getElement() || null;
      if (!scrollContainer) {
        timeoutId = setTimeout(setupScrollListener, 100);
        return;
      }

      handleScroll = () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          checkVisibleItem();
        });
      };

      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      setTimeout(() => {
        checkVisibleItem();
      }, 100);
    };

    setupScrollListener();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (scrollContainer && handleScroll) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    viewMode,
    title,
    hideFutureSchedule,
    onDateSelect,
    onPackageSelect,
    contentRef,
  ]);

  // 스크롤 헬퍼 함수들
  const scrollToItem = (
    targetId: string,
    isFutureSchedule: boolean = false
  ) => {
    if (isFutureSchedule) {
      setTimeout(() => {
        const scrollContainer = contentRef.current?.getElement();
        if (scrollContainer) {
          if (viewMode === "package") {
            const c138Element = scrollContainer.querySelector(".C138");
            if (c138Element) {
              const containerRect = scrollContainer.getBoundingClientRect();
              const elementRect = c138Element.getBoundingClientRect();
              const size5 = getCSSVariableValue("--size-5", 5);
              const scrollTop =
                scrollContainer.scrollTop +
                (elementRect.top - containerRect.top) -
                size5;
              scrollContainer.scrollTo({
                top: Math.max(0, scrollTop),
                behavior: "smooth",
              });
            } else {
              scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
            }
          } else {
            scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }, 100);
      return;
    }

    // 날짜로 스크롤
    if (viewMode === "date") {
      setTimeout(() => {
        const scrollContainer = contentRef.current?.getElement();
        if (scrollContainer) {
          const t061Elements = scrollContainer.querySelectorAll(".T061");
          t061Elements.forEach((element) => {
            const dateText = element.textContent || "";
            const dateMatch = dateText.match(/(\d{4})\.(\d{2})\.(\d{2})/);
            if (dateMatch) {
              const elementDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
              if (elementDate === targetId) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const size5 = getCSSVariableValue("--size-5", 5);
                const scrollTop =
                  scrollContainer.scrollTop +
                  (elementRect.top - containerRect.top) -
                  size5;
                scrollContainer.scrollTo({
                  top: Math.max(0, scrollTop),
                  behavior: "smooth",
                });
              }
            }
          });
        }
      }, 150);
    }

    // 패키지로 스크롤
    if (viewMode === "package") {
      setTimeout(() => {
        const scrollContainer = contentRef.current?.getElement();
        if (scrollContainer) {
          const packageNumber = targetId.replace("package-", "");
          const t061Elements = scrollContainer.querySelectorAll(".T061");
          t061Elements.forEach((element) => {
            const text = element.textContent || "";
            if (text.includes(`${packageNumber}기`)) {
              const containerRect = scrollContainer.getBoundingClientRect();
              const elementRect = element.getBoundingClientRect();
              const size5 = getCSSVariableValue("--size-5", 5);
              const scrollTop =
                scrollContainer.scrollTop +
                (elementRect.top - containerRect.top) -
                size5;
              scrollContainer.scrollTo({
                top: Math.max(0, scrollTop),
                behavior: "smooth",
              });
            }
          });
        }
      }, 150);
    }
  };

  const scrollSidebarToItem = (element: HTMLElement) => {
    setTimeout(() => {
      const scrollContainer = sidebarRef.current?.getElement();
      if (scrollContainer && element) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const size5 = getCSSVariableValue("--size-5", 5);
        const scrollTop =
          scrollContainer.scrollTop +
          (elementRect.top - containerRect.top) -
          size5;
        scrollContainer.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return {
    scrollToItem,
    scrollSidebarToItem,
    getCSSVariableValue,
  };
}

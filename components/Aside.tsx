/**
 * Aside Component
 *
 * @description 우측 사이드바 영역에서 슬라이드 페이지를 관리하는 컴포넌트입니다.
 * 페이지 스택을 관리하고, 동일한 pageId의 페이지가 이미 열려있으면 누적하지 않고
 * 해당 페이지로 이동합니다.
 *
 * @component
 * @example
 * ```tsx
 * <Aside mainContent={<MainContent />}>
 *   <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
 * </Aside>
 * ```
 *
 * @remarks
 * - 함수형 업데이트를 사용하여 항상 최신 상태를 보장합니다.
 * - 동일한 pageId의 페이지는 누적되지 않고 기존 페이지로 이동합니다.
 * - 애니메이션 중에는 새로운 네비게이션을 무시합니다.
 */

"use client";

import { useEffect, useLayoutEffect, memo, useRef, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import WeeklyCalendar from "./WeeklyCalendar";
import { usePageHeaderStore } from "@/stores/usePageHeaderStore";
import { AsideProvider } from "./AsideContext";
import SlidePage from "./SlidePage";
import { useAsideStore } from "@/stores/useAsideStore";
import PartReferencePopup from "./popups/PartReferencePopup";
import type {
  AsideProps,
  AsideInnerProps,
  AsideSlidePageProps,
} from "@/types/layout";
import { PRE_WRAPPED_SLIDE_PAGE_IDS } from "@/types/layout";

function Aside({ mainContent, onNavigate, children }: AsideProps) {
  const currentIndex = useAsideStore((state) => state.currentIndex);
  const goBack = useAsideStore((state) => state.goBack);

  useEffect(() => {
    if (!onNavigate) return;

    let prevPageId: string | null = null;
    const unsubscribe = useAsideStore.subscribe((state) => {
      const currentPageId = state.currentPageId;
      if (currentPageId !== prevPageId) {
        prevPageId = currentPageId;
        onNavigate(currentPageId || "main");
      }
    });

    return unsubscribe;
  }, [onNavigate]);

  return (
    <AsideProvider>
      <AsideInner
        mainContent={mainContent}
        currentIndex={currentIndex}
        goBack={goBack}
      />
      {children}
    </AsideProvider>
  );
}

/**
 * AsideInner Component
 *
 * @description Aside의 내부 렌더링을 담당하는 컴포넌트입니다.
 * 메인 페이지를 초기화하고 페이지 스택을 렌더링합니다.
 * pathname 변경을 감지하여 Aside를 메인 페이지로 초기화합니다.
 *
 * @component
 * @internal
 *
 * @remarks
 * - `useLayoutEffect`를 사용하여 pathname 변경을 먼저 감지합니다.
 * - pathname이 변경되면 pages를 빈 배열로 초기화하고, mainPageContent useEffect에서 main 페이지를 생성합니다.
 * - main 페이지 생성 후 `currentIndex`를 0으로 설정하여 메인 페이지로 이동합니다.
 */
const AsideInner = memo(function AsideInner({
  mainContent,
  currentIndex,
  goBack,
}: AsideInnerProps) {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const storePages = useAsideStore((state) => state.pages);
  const setPages = useAsideStore((state) => state.setPages);
  const setIsAnimating = useAsideStore((state) => state.setIsAnimating);
  const lastPathname = useAsideStore((state) => state.lastPathname);
  const setLastPathname = useAsideStore((state) => state.setLastPathname);
  const resetHandlers = usePageHeaderStore((state) => state.resetHandlers);

  // 렌더링에는 storePages를 직접 사용
  const pages = storePages;
  const pathname = usePathname();
  const pathnameChangedRef = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted || !pathname) return;

    if (lastPathname === null) {
      setLastPathname(pathname);
      return;
    }

    if (lastPathname !== pathname) {
      setLastPathname(pathname);
      pathnameChangedRef.current = true;
      setIsAnimating(true);
      setPages([]);
      resetHandlers();
    } else {
      pathnameChangedRef.current = false;
    }
  }, [
    pathname,
    lastPathname,
    setPages,
    setIsAnimating,
    resetHandlers,
    setLastPathname,
    isMounted,
  ]);
  // 페이지 경로별 플래그
  const pagePathFlags = {
    isDashboard: pathname === "/",
    isCounseling: pathname === "/counseling",
    isReception: pathname === "/reception",
    isPreCare: pathname === "/pre-care",
    isClinic: pathname === "/clinic",
    isSurgery: pathname === "/surgery",
    isProcedure: pathname === "/procedure",
    isPostCare: pathname === "/post-care",
    isStatistics: pathname === "/statistics",
  };

  // C070 클릭 시 팝업 상태
  const [isPartReferencePopupOpen, setIsPartReferencePopupOpen] =
    useState(false);

  const mainPageContent = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;

    if (pagePathFlags.isDashboard) {
      return <div className="C073">{content}</div>;
    }

    if (content === null) {
      return <div className="C073"></div>;
    }

    if (pagePathFlags.isCounseling) {
      return (
        <>
          <WeeklyCalendar />
          <div
            className="C070 isCounseling"
            onClick={() => setIsPartReferencePopupOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <p className="T035">
              상담파트 <span className="isUnit">전체 전달사항 입력</span>
            </p>
            <div className="C071">
              <div className="C072 styleSheet isIcon isWrite"></div>
            </div>
          </div>
          <div className="C074"></div>
          <div className="C075">{content}</div>
        </>
      );
    }

    return (
      <>
        <WeeklyCalendar />
        <div
          className="C070 isReception"
          onClick={() => setIsPartReferencePopupOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <p className="T035">
            원무파트 <span className="isUnit">전체 전달사항 입력</span>
          </p>
          <div className="C071">
            <div className="C072 styleSheet isIcon isWrite"></div>
          </div>
        </div>
        <div className="C074"></div>
        <div className="C075">{content}</div>
      </>
    );
  }, [mainContent, pagePathFlags.isDashboard, pagePathFlags.isCounseling]);

  const isDashboardC073 = React.useMemo(() => {
    const content =
      typeof mainContent === "function" ? mainContent() : mainContent;
    return pagePathFlags.isDashboard || content === null;
  }, [mainContent, pagePathFlags.isDashboard]);

  // pathname 변경 추적을 위한 ref
  const prevPathnameRef = useRef<string | null>(null);

  React.useEffect(() => {
    if (!isMounted || !mainPageContent) return;

    const currentState = useAsideStore.getState();
    const wasEmpty = currentState.pages.length === 0;
    const mainPageIndex = currentState.pages.findIndex(
      (page) => page.id === "main"
    );

    // pathname이 변경되었는지 확인
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // main 페이지가 없거나, pathname이 변경된 경우에만 실행
    const shouldUpdate = mainPageIndex === -1 || pathnameChanged;

    // main 페이지가 이미 있고, pathname도 변경되지 않았다면 스킵
    if (!shouldUpdate && mainPageIndex !== -1) return;

    // main 페이지가 이미 있는 경우
    if (mainPageIndex !== -1) {
      // pathname이 변경된 경우에만 업데이트
      if (pathnameChanged) {
        const newPages = [...currentState.pages];
        newPages[mainPageIndex] = {
          ...newPages[mainPageIndex],
          content: mainPageContent,
        };
        setPages(newPages);
      }
      return;
    }

    // main 페이지가 없을 때만 생성
    const newPages = [
      {
        id: "main",
        content: mainPageContent,
        timestamp: Date.now(),
      },
      ...currentState.pages,
    ];

    if (wasEmpty) {
      if (pathnameChangedRef.current) {
        pathnameChangedRef.current = false;
        const mainPage = newPages.find((page) => page.id === "main");
        if (mainPage) {
          setTimeout(() => {
            useAsideStore.setState({
              pages: [mainPage],
              currentIndex: 0,
              currentPageId: null,
            });
            setTimeout(() => {
              useAsideStore.setState({ isAnimating: false });
            }, 300);
          }, 0);
        }
      } else {
        useAsideStore.setState({
          pages: newPages,
          currentIndex: 0,
          currentPageId: null,
          isAnimating: false,
        });
      }
    } else {
      setPages(newPages);
    }
  }, [mainContent, mainPageContent, setPages, pathname, isMounted]);

  // pathname 변경 후 pages가 main 페이지만 있을 때 currentIndex를 0으로 설정
  // goBack처럼 pages와 currentIndex를 동시에 설정해야 작동함
  React.useEffect(() => {
    // 마운트 전에는 실행하지 않음
    if (!isMounted) return;

    if (pathnameChangedRef.current) {
      // pages가 main 페이지만 있는지 확인
      const hasOnlyMainPage = pages.length === 1 && pages[0]?.id === "main";
      if (hasOnlyMainPage) {
        pathnameChangedRef.current = false; // 플래그 리셋
        // main 페이지가 생성된 직후 무조건 currentIndex를 0으로 설정
        // currentIndex가 이미 0이어도 다시 설정하여 렌더링을 보장
        useAsideStore.setState({
          currentIndex: 0,
          currentPageId: null,
        });
      }
    }
  }, [pages, isMounted]);

  /**
   * 페이지 렌더링 함수
   * 페이지 타입에 따라 적절한 컴포넌트로 렌더링
   */
  const renderPage = React.useCallback(
    (page: (typeof pages)[0], index: number) => {
      const offset = index - currentIndex;
      const contentType =
        page.content && React.isValidElement(page.content)
          ? (page.content as React.ReactElement<unknown>).type
          : null;
      const contentDisplayName =
        contentType &&
        typeof contentType === "object" &&
        "displayName" in contentType
          ? (contentType as { displayName?: string }).displayName
          : contentType && typeof contentType === "function"
          ? contentType.name
          : null;

      // pageId 기반으로 이미 SlidePage로 감싸진 컴포넌트 확인
      const isPreWrappedSlidePage = PRE_WRAPPED_SLIDE_PAGE_IDS.some((id) =>
        page.id.startsWith(id)
      );

      const isSlidePageComponent =
        React.isValidElement(page.content) &&
        (contentType === SlidePage ||
          isPreWrappedSlidePage ||
          (typeof contentType === "function" &&
            (contentDisplayName === "DoctorSlidePage" ||
              contentDisplayName === "EmployeeSlidePage" ||
              contentDisplayName === "CounselorSlidePage" ||
              contentDisplayName === "CustomerReferenceSlide" ||
              contentDisplayName === "MyNotesSlide" ||
              contentDisplayName === "MyAlarmsSlide")));

      if (isSlidePageComponent) {
        const slidePageProps: AsideSlidePageProps = {
          transform: `translateX(${offset * 100}%)`,
          zIndex: pages.length - index,
          onGoBack: goBack,
          showBackButton: index > 0,
        };
        return React.cloneElement(
          page.content as React.ReactElement<AsideSlidePageProps>,
          {
            key: page.id,
            ...slidePageProps,
          }
        );
      }

      if (page.id === "main" && isDashboardC073) {
        return (
          <div
            key={page.id}
            className="C073"
            style={{
              transform: `translateX(${offset * 100}%)`,
              zIndex: pages.length - index,
            }}
          >
            {page.content}
          </div>
        );
      }

      return (
        <SlidePage
          key={page.id}
          transform={`translateX(${offset * 100}%)`}
          zIndex={pages.length - index}
          onGoBack={goBack}
          showBackButton={index > 0}
        >
          {page.content}
        </SlidePage>
      );
    },
    [currentIndex, pages.length, goBack, isDashboardC073]
  );

  // 초기 마운트 시 pages가 비어있고 mainPageContent가 있으면 fallback 렌더링
  const shouldShowFallback = pages.length === 0 && !!mainPageContent;

  // ✅ isMounted가 false일 때(서버 사이드 or 첫 렌더링)는 fallback UI 반환
  // 이렇게 하면 Hydration 단계까지는 서버 HTML과 똑같은 구조를 유지합니다.
  if (!isMounted) {
    return (
      <aside className="C013">
        <div className="C089" />
      </aside>
    );
  }

  return (
    <aside className="C013">
      <div className="C089">
        {shouldShowFallback ? (
          <div
            className="C073"
            style={{ transform: "translateX(0%)", zIndex: 1 }}
          >
            {mainPageContent}
          </div>
        ) : pages.length > 0 ? (
          pages.map(renderPage)
        ) : null}
      </div>

      {(pagePathFlags.isReception ||
        pagePathFlags.isCounseling ||
        pagePathFlags.isPreCare ||
        pagePathFlags.isClinic ||
        pagePathFlags.isSurgery ||
        pagePathFlags.isProcedure ||
        pagePathFlags.isPostCare ||
        pagePathFlags.isStatistics) && (
        <PartReferencePopup
          isOpen={isPartReferencePopupOpen}
          onClose={() => setIsPartReferencePopupOpen(false)}
        />
      )}
    </aside>
  );
});

export default memo(Aside);
